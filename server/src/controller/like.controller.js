import { Like } from "../models/like.model.js";
import { ApiErrors } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
    try {
        console.log("Request Params:", req.params);
        const { videoId } = req.params;
        const { videoOwnerId } = req.params;
        const user = req.user._id;
        if (!videoId) throw new ApiErrors(400, "Video ID is required");

        const existingLike = await Like.findOne({
            video: videoId,
            likedBy: user,
            owner: videoOwnerId
        });

        if (existingLike) {
            await Like.deleteOne({ _id: existingLike._id });
            return res
                .status(200)
                .json(new ApiResponse(null, 200, "Video unliked successfully"));
        }

        const createVideoLike = await Like.create({
            owner: videoOwnerId,
            likedBy: user,
            video: videoId
        });
        console.log(createVideoLike);
        if (!createVideoLike) {
            throw new ApiErrors(500, "Failed to create video like");
        }
        return res
            .status(201)
            .json(
                new ApiResponse(
                    createVideoLike,
                    201,
                    "Video liked successfully"
                )
            );
    } catch (error) {
        return res
            .status(500)
            .json(
                new ApiResponse(
                    null,
                    error.statusCode || 500,
                    error.message || "Something went wrong in Like Controller"
                )
            );
    }
});

const toggleTweetLike = asyncHandler(async (req, res) => {
    try {
        const { tweetId, tweetOwnerId } = req.params;
        const user = req.user._id;

        if (!tweetId) throw new ApiErrors(400, "Tweet ID is required");

        if (!tweetOwnerId)
            throw new ApiErrors(400, "Tweet Owner ID is required");

        console.log("Tweet ID:", tweetId);
        console.log("Tweet Owner ID:", tweetOwnerId);

        const existingLike = await Like.findOne({
            tweets: tweetId,
            likedBy: user,
            owner: tweetOwnerId
        });

        console.log("____________________", existingLike);

        if (existingLike) {
            await Like.deleteOne({ _id: existingLike._id });
            return res
                .status(200)
                .json(new ApiResponse(null, 200, "Tweet unliked successfully"));
        }

        const createTweetLike = await Like.create({
            likedBy: user,
            tweets: tweetId,
            owner: tweetOwnerId
        });

        console.log(createTweetLike);

        if (!createTweetLike) {
            throw new ApiErrors(500, "Failed to create tweet like");
        }

        return res
            .status(201)
            .json(
                new ApiResponse(
                    createTweetLike,
                    201,
                    "Tweet liked successfully"
                )
            );
    } catch (error) {
        return res
            .status(500)
            .json(
                new ApiResponse(
                    null,
                    error.statusCode || 500,
                    error.message || "Something went wrong in liking Tweet"
                )
            );
    }
});

const toggleCommentLike = asyncHandler(async (req, res) => {
    try {
        const { commentId, commentOwnerId } = req.params;
        const user = req.user._id;

        if (!commentId) throw new ApiErrors(400, "Comment ID is required");

        const existingLike = await Like.findOne({
            comment: commentId,
            likedBy: user,
            owner: commentOwnerId
        });

        if (existingLike) {
            await Like.deleteOne({ _id: existingLike._id });
            return res
                .status(200)
                .json(
                    new ApiResponse(null, 200, "Comment unliked successfully")
                );
        }

        const createCommentLike = await Like.create({
            likedBy: user,
            comment: commentId,
            owner: commentOwnerId
        });

        console.log(createCommentLike);

        if (!createCommentLike) {
            throw new ApiErrors(500, "Failed to create comment like");
        }

        return res
            .status(201)
            .json(
                new ApiResponse(
                    createCommentLike,
                    201,
                    "Comment liked successfully"
                )
            );
    } catch (error) {
        return res
            .status(500)
            .json(
                new ApiResponse(
                    null,
                    error.statusCode || 500,
                    error.message || "Something went wrong in liking Comment"
                )
            );
    }
});

const getLikedVideos = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;

        const likedVideos = await Like.find({
            likedBy: userId,
            video: {
                $exists: true,
                $ne: null
            }
        }).populate("video");

        if (!likedVideos) {
            throw new ApiErrors(404, "No liked videos found for this user");
        }

        return res
            .status(200)
            .json(new ApiResponse(likedVideos, 200, "Success"));
    } catch (error) {
        return res
            .status(500)
            .json(
                new ApiResponse(
                    null,
                    error.statusCode || 500,
                    error.message ||
                        "Something went wrong in getting liked videos"
                )
            );
    }
});

export { toggleVideoLike, toggleTweetLike, toggleCommentLike, getLikedVideos };
