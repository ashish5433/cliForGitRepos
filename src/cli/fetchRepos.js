#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { Repos } from "../db/models/repoModel.model.js";
import fetchIssues from "./fetchIssues.js";
import axios from "axios";
import fetchWithRetry from "./fetchWithRetry.js";
const checkpointFile = path.resolve('./checkpoint.json')

const saveCheckPoints = (org, page) => {

    let data = {}
    if (fs.existsSync(checkpointFile)) {
        data = JSON.parse(fs.readFileSync(checkpointFile, 'utf-8'))
    }
    data[org] = { page };
    fs.writeFileSync(checkpointFile, JSON.stringify(data));
}

const getCheckPoints = (org) => {
    if (fs.existsSync(checkpointFile)) {
        const data = JSON.parse(fs.readFileSync(checkpointFile, 'utf-8'))
        return data[org]?.page || 1
    }
    return 1
}
const fetchRepos = async (org, options) => {

    console.log("Fetching : ", org)
    let page = getCheckPoints(org);
    // console.log(page)
    const perPage = 90
    while (true) {
        const url = `https://api.github.com/orgs/${org}/repos?page=${page}&per_page=${perPage}`;
        const res = await fetchWithRetry(url)
        // console.log(res.data)
        if (!Array.isArray(res.data) || res.data.length === 0) {
            break;
        }
        let sinceDate = null;
        if (options.since) {
            sinceDate = new Date(options.since);
            if (isNaN(sinceDate)) {
                console.error(`Invalid --since date: ${options.since}`);
                process.exit(1);
            }
        }

        for (const data of res.data) {

            if (sinceDate && new Date(data.pushed_at) < sinceDate) {
                continue;
            }
            try {
                // console.log("Testing...")
                await Repos.updateOne(
                    { org, name: data.name },
                    {
                        org,
                        name: data.name,
                        description: data.description,
                        topics: data.topics || [],
                        forks: data.forks_count,
                        stars: data.stargazers_count,
                        openIssues: data.open_issues_count,
                        license: data.license?.spdx_id || null,
                        pushedAt: data.pushed_at,
                    },
                    { upsert: true }
                )

            } catch (err) {
                console.error(`Error Occcured while Storing data : ${err}`)
            }
        }
        saveCheckPoints(org, page)
        ++page;
    }
    console.log("Repos Fetched Successfully and now Fetching Issues per Repo.")
    await fetchIssues(org)
    process.exit(0)
}


export default fetchRepos;