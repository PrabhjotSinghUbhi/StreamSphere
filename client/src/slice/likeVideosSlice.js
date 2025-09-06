import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { likeService } from "../service/like.service";

export const fetchLikedVideos = createAsyncThunk(
    "likeVideos/fetchLikedVideos",
    async (_, { rejectWithValue }) => {
        try {
            const response = await likeService.getLikedVideos();
            return response.payload;
        } catch (error) {
            console.error("Error fetching liked videos:", error);
            return rejectWithValue(
                error.response.data || "Error fetching liked videos"
            );
        }
    }
);

const likeVideosSlice = createSlice({
    name: "likeVideos",
    initialState: {
        likedVideos: []
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLikedVideos.fulfilled, (state, action) => {
                console.log(
                    "ACTION PAYLOAD __ Fetched liked videos:",
                    action.payload
                );
                state.likedVideos = action.payload;
            })
            .addCase(fetchLikedVideos.pending, () => {
                console.log("Fetching liked videos...");
            })
            .addCase(fetchLikedVideos.rejected, (state, action) => {
                console.error("Failed to fetch liked videos:", action.payload);
                state.likedVideos = [];
            });
    }
});

export default likeVideosSlice.reducer;
