import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiErrors } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getVideoComments = asyncHandler(async (req, res) => {
    try {
        const { videoId } = req.params;
        const { page = 1, limit = 10 } = req.query;

        const comments = await Comment.find({ video: videoId }).populate(
            "owner",
            "username avatar"
        );

        return res.status(200).json(new ApiResponse(comments, 200, "Success"));
    } catch (error) {
        return res
            .status(500)
            .json(
                new ApiResponse(
                    null,
                    500,
                    error.message ||
                        "Something went wrong in getting video comments"
                )
            );
    }
});

const addComment = asyncHandler(async (req, res) => {
    try {
        const { videoId } = req.params;
        const { content } = req.body;
        const user = req.user._id;

        if (!content || !videoId)
            throw new ApiErrors(400, "Content and Video ID are required");

        const newComment = await Comment.create({
            owner: user,
            content,
            video: videoId
        });

        await newComment.populate("owner", "username avatar");

        return res
            .status(201)
            .json(
                new ApiResponse(newComment, 201, "Comment added successfully")
            );
    } catch (error) {
        return res
            .status(500)
            .json(
                new ApiResponse(
                    null,
                    error.statusCode || 500,
                    error.message || "Something went wrong in adding comment"
                )
            );
    }
});

const updateComment = asyncHandler(async (req, res) => {
    try {
        const { commentId } = req.params;
        const { content } = req.body;

        if (!content || !commentId)
            throw new ApiErrors(400, "Content and Comment ID are required");

        const updatedComment = await Comment.findOneAndUpdate(
            { _id: commentId },
            { content },
            { new: true }
        );

        if (!updatedComment) {
            throw new ApiErrors(404, "Comment not found or not authorized");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    updatedComment,
                    200,
                    "Comment updated successfully"
                )
            );
    } catch (error) {
        return res
            .status(500)
            .json(
                new ApiResponse(
                    null,
                    error.statusCode || 500,
                    error.message || "Something went wrong in updating comment"
                )
            );
    }
});

const deleteComment = asyncHandler(async (req, res) => {
    try {
        const { commentId } = req.params;

        const deletedComment = await Comment.findOneAndDelete({
            _id: commentId
        });

        if (!deletedComment) {
            throw new ApiErrors(404, "Comment not found or not authorized");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    deletedComment,
                    200,
                    "Comment deleted successfully"
                )
            );
    } catch (error) {
        return res
            .status(500)
            .json(
                new ApiResponse(
                    null,
                    error.statusCode || 500,
                    error.message || "Something went wrong in deleting comment"
                )
            );
    }
});

export { getVideoComments, addComment, updateComment, deleteComment };
