import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "../service/user.service";

export const fetchWatchLaterVideos = createAsyncThunk(
    "watchLater/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const resp = await userService.getWatchLater();
            return resp.payload;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addVideoToWatchLater = createAsyncThunk(
    "watchLater/add",
    async (videoId, { rejectWithValue }) => {
        try {
            const resp = await userService.addToWatchLater(videoId);
            return resp.payload;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const watchLaterSlice = createSlice({
    name: "watchLater",
    initialState: {
        watchLaterVideos: [],
        loading: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWatchLaterVideos.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchWatchLaterVideos.fulfilled, (state, action) => {
                state.loading = false;
                state.watchLaterVideos = action.payload;
            })
            .addCase(fetchWatchLaterVideos.rejected, (state) => {
                state.loading = false;
                state.watchLaterVideos = [];
            });
    }
});

export default watchLaterSlice.reducer;
