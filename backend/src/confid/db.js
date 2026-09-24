import { config } from "dotenv";
import mongoose from "mongoose";


config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGO DATABASE CONNECTED SUCCESSFULLY");                                   
    } catch (error) {
        console.error("ERROR CONNECTING MONGO DATABASE", error);
        process.exit(1);
    }
}
export default connectDB;