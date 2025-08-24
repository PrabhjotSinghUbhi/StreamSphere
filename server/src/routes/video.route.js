import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    getAllVideos,
    getChannelVideos,
    getVideo,
    publishVideo
} from "../controller/video.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/publish-video").post(
    verifyJWT,
    upload.fields([
        {
            name: "videoFile",
            maxCount: 1
        },
        {
            name: "thumbnail",
            maxCount: 1
        }
    ]),
    publishVideo
);

router.route("/get-channel-videos/:username").get(verifyJWT, getChannelVideos);
router.route("/v/:video_id").get(verifyJWT, getVideo);
router.route("/get-all-videos").get(verifyJWT, getAllVideos);

export default router;
