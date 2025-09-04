import express from "express";
import cookies from "cookie-parser";
import cors from "cors";

const app = express();

app.get("/", (req, res) => res.send("Root working"));

// allowing the cross-origin-resource-sharing (cors).
app.use(
    cors({
        credentials: true,
        origin: process.env.CORS_ORIGIN
    })
);
// use to parse the cookies.
app.use(cookies());
// configure our app to accept json() data.
app.use(
    express.json({
        limit: "16kb"
    })
);
// to configure our app
app.use(
    express.urlencoded({
        // allows extended objects.
        extended: true
    })
);
//  to store apps.
app.use(express.static("public/temp"));

//import routers
import userRoute from "./routes/user.route.js";
import subs from "./routes/subs.route.js";
import videoRoute from "./routes/video.route.js";
import commentRoute from "./routes/comment.route.js";
import tweetRoute from "./routes/tweet.route.js";
import likeRoute from "./routes/like.route.js";
//router declaration.
app.use("/api/v1/users", userRoute);
app.use("/api/v1/subscribe", subs);
app.use("/api/v1/videos", videoRoute);
app.use("/api/v1/comments", commentRoute);
app.use("/api/v1/tweets", tweetRoute);
app.use("/api/v1/likes", likeRoute);

export { app };
