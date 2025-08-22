import { Router } from "express";
import {
    createSubscription,
    getUserSubscriptionDetails
} from "../controller/subscription.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router
    .route("/add-subscriber")
    .post(upload.none(), verifyJWT, createSubscription);

router
    .route("/subscriptions/c/:username")
    .post(upload.none(), verifyJWT, getUserSubscriptionDetails);

export default router;
