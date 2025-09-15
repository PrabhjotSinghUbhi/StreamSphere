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

export const clearWatchHistory = createAsyncThunk(
    "watchHistory/clearHistory",
    async (_, { rejectWithValue }) => {
        try {
            const resp = await userService.clearAllWatchHistory();
            return resp.payload;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const removeVideoFromHistory = createAsyncThunk(
    "watchHistory/removeVideo",
    async (videoId, { rejectWithValue }) => {
        try {
            const resp = await userService.removeFromWatchHistory(videoId);
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
    reducers: {
        clearAllWatchHistory: (state) => {
            state.watchHistory = [];
        },
        clearAVideoFromHistory: (state, action) => {
            state.watchHistory = state.watchHistory.filter(
                (video) => video._id !== action.payload
            );  
        }
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

export const { clearAllWatchHistory, clearAVideoFromHistory } =
    watchHistorySlice.actions;

export default watchHistorySlice.reducer;
