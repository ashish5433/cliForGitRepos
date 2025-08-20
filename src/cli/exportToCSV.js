import fs from 'fs'
import { Repos } from "../db/models/repoModel.model.js";
import { Parser } from "json2csv";

const exportToCSV = async (options) => {
    try {
        const { org, out } = options

        const repos = await Repos.find({ org })
        // console.log(repos)

        const data = repos.map(r => ({
            name: r.name,
            stars: r.stargazers_count,
            forks: r.forks,
            openIssues: r.openIssues,
            pushedAt: r.pushedAt,
            language: r.topics
        }));

        const parser = new Parser({
            feild: ["name", "stars", "forks", "openIssues", "pushedAt", "languages"]
        })

        const csv = parser.parse(data)
        fs.writeFileSync(out, csv)
        console.log("Successfully Exported to CSV")
        process.exit(0);
    }
    catch (err) {
        console.error(`Error while Exporting data to CSV ${err}`)
        process.exit(1)
    }
}

export default exportToCSV