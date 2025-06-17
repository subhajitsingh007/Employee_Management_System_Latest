import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "../constants.js";

dotenv.config()




const connectDB = async() =>{
    try{
        const uri  =`${process.env.MONGODB_URI}/${DB_NAME}`
        //console.log("MongoDB URI used:", uri);
        const connectionInstance = await mongoose.connect(uri)
      
        
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host} \n`);

    }
    catch(error)
    {
        console.log("MongoDB connection failed !!")
        console.log(error.message)
        process.exit(1);

    }

}
export default connectDB

