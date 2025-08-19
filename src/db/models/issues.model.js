import mongoose from 'mongoose'

const issueSchema=new mongoose.Schema({
     repo: { 
         type: String,
         required: true
     },
    number: { 
         type: Number,
         required: true
     },
     title: String,
     state: { 
        type: String, 
        enum: ["open", "closed"]
     },
    
  },
  { timestamps: true }
)

issueSchema.index({repo:1,state:1});
issueSchema.index({repo:1,number:1},{unique:true})
export const Issues=mongoose.model("Issues",issueSchema)