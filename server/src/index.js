import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db/index.js";
import { app } from "./app.js";

connectDB()
    .then(() => {
        const PORT = process.env.PORT || 8000;

        app.on("error", (err) => {
            throw err;
        });

    })
    .catch((err) => {
        console.error("ERROR :: MongoDB :: Connection Failed !!!", err);
    });
