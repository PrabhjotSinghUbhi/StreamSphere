import { model, Schema, Types } from "mongoose";

const likeSchema = new Schema(
    {
        owner: {
            type: Types.ObjectId,
            ref: "User"
        },
        comment: {
            type: Types.ObjectId,
            ref: "Comment"
        },
        video: {
            type: Types.ObjectId,
            ref: "Video"
        },
        likedBy: {
            type: Types.ObjectId,
            ref: "User"
        },
        tweets: {
            type: Types.ObjectId,
            ref: "Tweet"
        }
    },
    {
        timestamps: true
    }
);

export const Like = model("Like", likeSchema);
