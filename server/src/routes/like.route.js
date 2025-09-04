import { Router } from "express";
import {
    getLikedVideos,
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike
} from "../controller/like.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/video/:videoOwnerId/:videoId").post(verifyJWT, toggleVideoLike);
router.route("/tweet/:tweetOwnerId/:tweetId").post(verifyJWT, toggleTweetLike);
router
    .route("/comment/:commentOwnerId/:commentId")
    .post(verifyJWT, toggleCommentLike);
router.route("/get-liked-videos").get(verifyJWT, getLikedVideos);

export default router;
