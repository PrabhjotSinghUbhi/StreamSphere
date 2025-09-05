import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { videoService } from "../service/video.service";
import { subscriptionService } from "../service/subscription.service";
import { likeService } from "../service/like.service";

export const fetchVideoById = createAsyncThunk(
    "video/fetchById",
    async (videoId, { rejectWithValue }) => {
        try {
            const response = await videoService.getVideoDetails(videoId);
            return response.payload;
        } catch (error) {
            return rejectWithValue(
                error?.response?.data || error.message || "Unknown error"
            );
        }
    }
);

export const toggleSubscriptionInVideo = createAsyncThunk(
    "video/toggleSubscriptionInVideo",
    async (channelId, { rejectWithValue }) => {
        try {
            const response = await subscriptionService.toggleSubscription(
                channelId
            );
            return response.payload;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const apiIncrementVideoViewCount = createAsyncThunk(
    "video/incrementViewCount",
    async (videoId, { rejectWithValue }) => {
        try {
            const response = await videoService.incrementVideoCount(videoId);
            return response.payload;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const likeAVideo = createAsyncThunk(
    "video/likeVideo",
    async ({ videoOwnerId, videoId }, { rejectWithValue }) => {
        try {
            const response = await likeService.likeVideo(videoOwnerId, videoId);
            console.log("Like Video Response:", response);
            return response.payload;
        } catch (error) {
            console.error("Failed to like video:", error);
            console.error("Here are the fields:", videoOwnerId, videoId);
            return rejectWithValue(error.response.data || "Error liking video");
        } finally {
            console.log("Like video thunk completed.", videoOwnerId, videoId);
        }
    }
);

const videoSlice = createSlice({
    name: "video",
    initialState: {
        currentVideo: null
    },
    reducers: {
        toggleVideoIsSubscribed(state) {
            if (state.currentVideo && state.currentVideo.Owner) {
                const isSubscribed = state.currentVideo.Owner.isSubscribed;
                state.currentVideo.Owner.isSubscribed = !isSubscribed;
                if (isSubscribed) {
                    state.currentVideo.Owner.subscriberCount -= 1;
                } else {
                    state.currentVideo.Owner.subscriberCount += 1;
                }
            }
        },

        incrementVideoViewCount(state) {
            if (state.currentVideo) {
                state.currentVideo.view += 1;
            }
        },

        incrementLikeCount(state) {
            if (state.currentVideo) {
                state.currentVideo.likeCount += 1;
                state.currentVideo.isLiked = true;
            }
        },

        decrementLikeCount(state) {
            if (state.currentVideo && state.currentVideo.likeCount > 0) {
                state.currentVideo.likeCount -= 1;
                state.currentVideo.isLiked = false;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVideoById.fulfilled, (state, action) => {
                state.currentVideo = action.payload;
            })
            .addCase(fetchVideoById.rejected, (state, action) => {
                state.currentVideo = null;
                console.error("Failed to fetch video:", action.payload);
            });

        builder
            .addCase(likeAVideo.fulfilled, (state, action) => {
                console.log("Like Video Fulfilled:", action.payload);
            })
            .addCase(likeAVideo.pending, (state, action) => {
                console.log("Like Video Pending:", action.payload);
            })
            .addCase(likeAVideo.rejected, (state, action) => {
                console.log("Like Video Rejected:", state.currentVideo);
                console.error("Failed to like video:", action.payload);
            });
    }
});

export const {
    toggleVideoIsSubscribed,
    incrementVideoViewCount,
    incrementLikeCount,
    decrementLikeCount
} = videoSlice.actions;

export default videoSlice.reducer;
