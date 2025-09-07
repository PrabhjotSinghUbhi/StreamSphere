import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createTweet,
    deleteTweet,
    getUserTweets,
    updateTweet
} from "../controller/tweet.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/add-tweet").post(upload.none(), verifyJWT, createTweet);
router.route("/update-tweet/:tweetId").patch(verifyJWT, updateTweet);
router.route("/delete-tweet/:tweetId").delete(verifyJWT, deleteTweet);
router.route("/user-tweets/:userId").get(verifyJWT, getUserTweets);

export default router;
