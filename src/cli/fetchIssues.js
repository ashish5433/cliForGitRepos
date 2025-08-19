import axios from 'axios'
import { Issues } from '../db/models/issues.model.js'
import { Repos } from '../db/models/repoModel.model.js'

const fetchIssues=async (org)=>{

    try{
        const repos= await Repos.find({org});
        // console.log(repos);
        for(const repo of repos){
            const url=`https://api.github.com/repos/${org}/${repo.name}/issues?state=all&sort=created&direction=desc&per_page=30`

            const res=await axios.get(url,{
                headers:{
                    Authorization: `token ${process.env.GITHUB_TOKEN}`,
                    Accept: "application/vnd.github+json"
                }
            })
            if (!Array.isArray(res.data) || res.data.length === 0) {
                 console.log(`No issues found for ${repo.name}`);
                 continue;
            }
            // console.log(res.data)
           for(const data of res.data){
            if(data.pull_request)continue;

            await Issues.updateOne(
                {repo:repo.name,number:data.number},
                {
                    repo:repo.name,
                    number:data.number,
                    title:data.title,
                    state:data.state
                },
                {upsert:true}
            )
           }
        }
    }catch(err){
        console.error(`Error While fetching Issues : ${err}`)
    }finally{
        console.log("Fetching completed.")
    }
}


export default fetchIssues