import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
    addComment,
    deleteComment,
    getVideoComments,
    updateComment
} from "../controller/comment.controller.js";

const router = Router();

router.route("/:videoId").get(getVideoComments);
router.route("/:videoId").post(upload.none(), verifyJWT, addComment);
router.route("/:commentId").patch(upload.none(), verifyJWT, updateComment);
router.route("/:commentId").delete(upload.none(), verifyJWT, deleteComment);

export default router;
