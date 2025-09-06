import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "../service/user.service";

export const fetchWatchHistory = createAsyncThunk(
    "watchHistory/fetchWatchHistory",
    async (_, { rejectWithValue }) => {
        try {
            const resp = await userService.getUserHistory();
            return resp.payload;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addVideoToHistory = createAsyncThunk(
    "watchHistory/addVideoToHistory",
    async (videoId, { rejectWithValue }) => {
        try {
            const resp = await userService.addVideoToHistory(videoId);
            return resp.payload;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const watchHistorySlice = createSlice({
    name: "watchHistory",
    initialState: {
        watchHistory: [],
        loading: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWatchHistory.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchWatchHistory.fulfilled, (state, action) => {
                state.watchHistory = action.payload;
                state.loading = false;
            })
            .addCase(fetchWatchHistory.rejected, (state) => {
                state.watchHistory = [];
                state.loading = false;
            });
    }
});

export default watchHistorySlice.reducer;
