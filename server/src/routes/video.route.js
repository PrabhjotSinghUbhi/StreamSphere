import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    deleteVideo,
    getAllVideos,
    getChannelVideos,
    getVideo,
    publishVideo,
    updateViewCount
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
router.route("/get-all-videos").get(getAllVideos);
router.route("/v/:video_id/increment-views").post(verifyJWT, updateViewCount);
router.route("/v/delete/:video_id").delete(verifyJWT, deleteVideo);

export default router;
