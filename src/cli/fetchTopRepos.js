import { Repos } from "../db/models/repoModel.model.js";
import Table from 'cli-table3'

const fetchTopRepos = async (options) => {
    try {
        const { org, metric, limit } = options
        const total = parseInt(limit, 10)

        const validMetrices = ["stars", "issues"];
        if (!validMetrices.includes(metric)) {
            console.log("Wrong Metrices");
            process.exit(1);
        }
        let sortField = metric === "stars" ? "stars" : "openIssues"

        const repos = await Repos.find({ org }).sort({ [sortField]: -1 }).limit(total)

        if (repos.length === 0) {
            console.log("No Repos Found.")
            process.exit(1)

        }
        const table = new Table({
            head: ["Repo", "Stars", "Issues"],
            colWidths: [40, 15, 15],

        })
        // console.log(repos);
        repos.forEach((r) => {
            table.push([r.name, r.stars, r.openIssues]);
        });

        console.log(table.toString())
        process.exit(1);
    } catch (err) {
        console.error(`Error running top command ${err}`)
    }
}

export default fetchTopRepos