import mongoose from "mongoose";

const connectDB = () =>{
    try {
        const connection = mongoose.connect(process.env.MONGO_URI);
        console.log("Connect to MongoDB success");
        return connection;
    } catch (error) {
        throw new Error(error.toString());
    }
}

export default connectDB;