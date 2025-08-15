import mongoose, { Schema } from "mongoose";

const tweetSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        video: {
            type: Schema.Types.ObjectId,
            ref: "Video"
        },
        content: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

export const Tweet = mongoose.model("Tweet", tweetSchema);
