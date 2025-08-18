import connectDB from "../db/connectDb.js";
import { Repos } from "../db/models/repoModel.model.js";
import { Issues } from "../db/models/issues.model.js";

const init=async ()=>{
    try{
        await connectDB()
        await Repos.createIndexes()
        await Issues.createIndexes()

        console.log("Indexes Ready")
    }catch(err){
        console.error(`Error while Initilizing ${err}`)
    }
}

export default init