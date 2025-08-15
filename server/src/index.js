import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db/index.js";
import { app } from "./app.js";

connectDB()
    .then(() => {
        const PORT = process.env.PORT || 8000;

        app.on("error", (err) => {
            console.log("ERR!!!: ", err);
            throw err;
        });

        app.listen(PORT, () => {
            console.log("Port currently running at: ", PORT);
        });
    })
    .catch((err) => {
        console.log("ERROR :: MongoDB :: Connection Failed !!!", err);
    });
