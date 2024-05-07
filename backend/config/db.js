import { mongoose } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected...");
    }catch(err){
        console.log("MongoDB connection error: ", err);
    }
}

export  default connectDB; 