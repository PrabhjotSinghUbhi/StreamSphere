import { Router } from "express";
import {
    createSubscription,
    deleteSubscription
} from "../controller/subscription.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router
    .route("/add-subscriber/:channel")
    .post(upload.none(), verifyJWT, createSubscription);

router
    .route("/delete-subscriber/:channel")
    .delete(upload.none(), verifyJWT, deleteSubscription);

export default router;
