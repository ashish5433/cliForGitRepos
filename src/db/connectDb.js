import mongoose from 'mongoose'


const connectDB = async()=>{
    try{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB Connected")
}catch(err){
    console.error(`Connection Error : ${err}`)
}
}
export default connectDB