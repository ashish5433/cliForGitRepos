import mongoose from 'mongoose'

const repoSchema=new mongoose.Schema({
    org:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:String,
    topics:[String],
    forks:Number,
    stars: Number,
    openIssues: Number,

    license: String,
    pushedAt: { type: Date }, 


},{timestamps:true})

repoSchema.index({ org: 1, stars: -1 }); 
repoSchema.index({ org: 1, name: 1 }, { unique: true });
export const Repos=mongoose.model("Repos",repoSchema)