import { Subscription } from "../models/subscription.model.js";
import { ApiErrors } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
    try {
        const { channelId } = req.params;
        const subscriber = req.user._id;

        const existingSubscription = await Subscription.findOne({
            subscriber,
            channel: channelId
        });

        if (existingSubscription) {
            // If subscription exists, delete it (unsubscribe)
            await Subscription.findOneAndDelete({
                subscriber,
                channel: channelId
            });
            return res
                .status(200)
                .json(new ApiResponse(null, 200, "Unsubscribed Successfully"));
        } else {
            // If subscription does not exist, create it (subscribe)
            const newSubscription = await Subscription.create({
                subscriber,
                channel: channelId
            });
            return res
                .status(201)
                .json(
                    new ApiResponse(
                        newSubscription,
                        201,
                        "Subscribed Successfully"
                    )
                );
        }
    } catch (error) {
        console.error("Error occurred while toggling subscription:", error);
        return res
            .status(500)
            .json(
                new ApiResponse(
                    null,
                    500,
                    error.message || "Something went wrong."
                )
            );
    }
});

const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    try {
        const { channelId } = req.params;

        const channelSubscribers = await Subscription.find({
            channel: channelId
        }).populate("subscriber", "username avatar fullName");

        return res
            .status(200)
            .json(
                new ApiResponse(
                    channelSubscribers,
                    200,
                    "Channel Subscribers fetched successfully."
                )
            );
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json(
                new ApiResponse(
                    null,
                    error.statusCode || 500,
                    error.message || "Something went wrong."
                )
            );
    }
});

const getSubscribedChannels = asyncHandler(async (req, res) => {
    try {
        const { subscriberId } = req.params;

        const subscribedChannels = await Subscription.find({
            subscriber: subscriberId
        }).populate("channel", "name");

        return res
            .status(200)
            .json(
                new ApiResponse(
                    subscribedChannels,
                    200,
                    "Subscribed Channels fetched successfully."
                )
            );
    } catch (error) {
        console.error(
            "Error occurred while fetching subscribed channels:",
            error.message
        );
        return res
            .status(error.statusCode || 500)
            .json(
                new ApiResponse(
                    null,
                    error.statusCode || 500,
                    error.message || "Something went wrong."
                )
            );
    }
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
