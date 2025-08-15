import mongoose, { model, Schema, Types } from "mongoose";

const playListSchema = new Schema(
    {
        name: {
            type: string,
            required: true
        },
        videos: {
            type: [
                {
                    type: Types.ObjectId,
                    ref: "Video"
                }
            ]
        }
    },
    {
        timestamps: true
    }
);

export const PlayList = model("PlayList", playListSchema);
