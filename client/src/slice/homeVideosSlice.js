import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { videoService } from "../service/video.service";

export const fetchHomeVideos = createAsyncThunk(
    "homeVideos/fetchHomeVideos",
    async (_, { rejectWithValue }) => {
        try {
            const response = await videoService.getHomeVideos();
            return response.payload;
        } catch (error) {
            console.error("Error fetching home videos:", error);
            return rejectWithValue("Error fetching home videos");
        }
    }
);

const homeVideosSlice = createSlice({
    name: "homeVideos",
    initialState: {
        homeVideos: []
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHomeVideos.fulfilled, (state, action) => {
                state.homeVideos = action.payload;
            })
            .addCase(fetchHomeVideos.rejected, (state, action) => {
                console.error("Failed to fetch home videos:", action.payload);
                state.homeVideos = [];
            });
    }
});

export default homeVideosSlice.reducer;
