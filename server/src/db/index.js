import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import { app } from "../app.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`
        );

        console.log(
            "Here is the connectionInstance :: ",
            connectionInstance.connection.host
        );

        app.on("error", (err) => {
            console.error("ERROR :: APP :: DB Connection:: ", err);
        });

        console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("ERROR :: DB Connection :: ", error);
        process.exit(1);
    }
};

export default connectDB;
