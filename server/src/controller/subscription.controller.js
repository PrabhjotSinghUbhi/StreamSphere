import { Subscription } from "../models/subscription.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createSubscription = asyncHandler(async (req, res) => {
    try {
        //remember these are _id's of User.
        const { subscriber, channel } = req.body;
        const createdSubscriptionDocument = await Subscription.create({
            subscriber,
            channel
        });
        console.log(createdSubscriptionDocument);

        return res
            .status(201)
            .json(
                new ApiResponse(
                    createdSubscriptionDocument,
                    201,
                    "Subscribed Successfully"
                )
            );
    } catch (error) {
        console.error("Error occurred in while subscribing :: ", error.message);
        return res
            .status(500)
            .json(
                new ApiResponse(
                    null,
                    500,
                    error.message || "something went wrong."
                )
            );
    }
});

const getUserSubscriptionDetails = asyncHandler(async (req, res) => {
    console.log("getUserChannelProfile got called");
    try {
        const { username } = req.params;
        if (!username?.trim()) throw new ApiErrors(401, "Username is missing.");

        console.log("USername is :: ", username);

        const channel = await User.aggregate([
            {
                $match: {
                    username: username?.toLowerCase()
                }
            },
            {
                $lookup: {
                    from: "subscriptions",
                    localField: "_id",
                    foreignField: "channel",
                    as: "subscribers"
                }
            },
            {
                $lookup: {
                    from: "subscriptions",
                    localField: "_id",
                    foreignField: "subscriber",
                    as: "subscribedTo"
                }
            },
            {
                $addFields: {
                    subscriberCount: {
                        $size: "$subscribers"
                    },
                    channelsSubscribedTo: {
                        $size: "$subscribedTo"
                    },
                    isSubscribed: {
                        $in: [
                            req?.user?._id,
                            {
                                $map: {
                                    input: "$subscribers",
                                    as: "sub",
                                    in: "$$sub.subscriber"
                                }
                            }
                        ]
                    }
                }
            },
            {
                $project: {
                    fullName: 1,
                    username: 1,
                    subscriberCount: 1,
                    channelsSubscribedTo: 1,
                    isSubscribed: 1,
                    avatar: 1,
                    coverImage: 1,
                    subscribers: 1,
                    subscribedTo: 1
                }
            }
        ]);

        console.log(channel);

        if (!channel?.length)
            throw new ApiErrors(501, "Channel Does not exists.");

        return res
            .status(200)
            .json(
                new ApiResponse(
                    channel[0],
                    200,
                    "User Channel Fetched Successfully."
                )
            );
    } catch (error) {
        console.log("ERROR in GETTING CHANNEL :: ", error.message);
        return res.status(404).json(new ApiResponse(null, 404, error.message));
    }
});

export { createSubscription, getUserSubscriptionDetails };
