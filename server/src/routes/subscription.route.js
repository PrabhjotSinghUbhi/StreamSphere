import { Router } from "express";
import {
    toggleSubscription,
    getSubscribedChannels,
    getUserChannelSubscribers
} from "../controller/subscription.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/:channelId", verifyJWT, toggleSubscription);
router.get("/:subscriberId/subscriptions", verifyJWT, getSubscribedChannels);
router.get("/:channelId/subscribers", verifyJWT, getUserChannelSubscribers);

export default router;
