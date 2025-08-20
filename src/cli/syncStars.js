import { Repos } from "../db/models/repoModel.model.js";
import axios from "axios";
const syncStars = async ({ org }) => {

    try {
        const repos = await Repos.find({ org });

        for (const repo of repos) {


            const url = `https://api.github.com/repos/${org}/${repo.name}`
            const res = await axios.get(url, {
                headers: {
                    Authorization: `token ${process.env.GITHUB_TOKEN}`,
                }
            })
            // console.log(res.data);
            const data = res.data
            repo.stars = data.stargazers_count;
            repo.forks = data.forks_count;

            await repo.save()
        }
        console.log("Stars and forks Synced")
        process.exit(0)
    } catch (err) {
        console.error(`Error while Syncing Stars ${err}`)
        process.exit(1)
    }
}

export default syncStars