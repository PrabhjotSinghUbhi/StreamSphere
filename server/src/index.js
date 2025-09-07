import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db/index.js";
import { app } from "./app.js";

connectDB()
    .then(() => {
        const PORT = process.env.PORT || 8000;

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

        // Handle server errors
        app.on("error", (err) => {
            console.error("Server error:", err);
            process.exit(1); // exit process if error occurs
        });
    })
    .catch((err) => {
        console.error("ERROR :: MongoDB :: Connection Failed !!!", err);
        process.exit(1); // exit process if DB connection fails
    });
