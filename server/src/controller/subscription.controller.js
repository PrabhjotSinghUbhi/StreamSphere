import { Subscription } from "../models/subscription.model.js";
import { ApiErrors } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createSubscription = asyncHandler(async (req, res) => {
    try {
        //remember these are _id's of User.
        //i don't think i need the subscriber from the req.body because the obviously the user will be the one subscribing, as i am only handling the user subscription so i don't think i need it anymore.

        const { channel } = req.params;
        const subscriber = req?.user._id;

        //we also need to check this subscription exists or not.
        const existedRelation = await Subscription.findOne({
            subscriber,
            channel
        });

        if (existedRelation) {
            throw new ApiErrors(400, "Already Subscribed.");
        }

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

const deleteSubscription = asyncHandler(async (req, res) => {
    try {
        const { channel } = req.params;
        if (!channel) throw new ApiErrors(400, "No Channel Found.");

        const subscriber = req?.user._id;

        const findAndDeleteSubscription = await Subscription.findOneAndDelete({
            subscriber,
            channel
        });

        if (!findAndDeleteSubscription) {
            throw new ApiErrors(404, "Subscription not found.");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    findAndDeleteSubscription,
                    200,
                    "Unsubscribed Successfully"
                )
            );
    } catch (error) {
        console.log("Error Occurred in Subscription :: ", error.message);
        return res
            .status(error.statusCode || 500)
            .json(
                new ApiResponse(
                    null,
                    error.statusError || 500,
                    "Error Occurred in Unsubscribing"
                )
            );
    }
});

export { createSubscription, deleteSubscription };
