#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { Repos } from "../db/models/repoModel.model.js";

import axios from "axios";


const fetchRepos=async (org,options)=>{
    console.log("Fetching : ",org)
    let page=1;
    const perPage=90
    while(true){
        const url=`https://api.github.com/orgs/${org}/repos?page=${page}&per_page=${perPage}`;
        const res=await axios.get(url,{
            Authorization: `Bearer ${process.env.GIT_TOKEN}`,
            Accept: "application/vnd.github+json"
        })
        // console.log(res.data)
        if (!Array.isArray(res.data) || res.data.length === 0) {
                console.log("No Repos Found.");
                break;
            }


        for(const data of res.data){
            try{
                console.log("Testing...")
            await Repos.updateOne(
                {org,name:data.name},
                {
                    org,
                    name:data.name,
                    description:data.description,
                    topics: data.topics || [],
                    forks: data.forks_count,
                    stars: data.stargazers_count,
                    openIssues: data.open_issues_count,
                    license: data.license?.spdx_id || null,
                    pushedAt: data.pushed_at,
                },
                {upsert:true}
            )}catch(err){
                console.error(`Error Occcured while Storing data : ${err}`)
            }
        }
        ++page;
    }
    console.log("Repos Fetched Successfully")
}


export default fetchRepos;