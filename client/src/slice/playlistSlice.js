import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { playlistService } from "../service/playlist.service";

export const fetchPlayList = createAsyncThunk(
    "playlists/fetchPlayList",
    async (playlistId, { rejectWithValue }) => {
        try {
            const response = await playlistService.getPlaylistById(playlistId);
            return response.payload;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const playlistSlice = createSlice({
    name: "playlists",
    initialState: {
        playlist: [],
        loading: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlayList.fulfilled, (state, action) => {
                console.log("Fetched playlist:", action.payload);
                state.loading = false;
                state.playlist = action.payload;
            })
            .addCase(fetchPlayList.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPlayList.rejected, (state) => {
                state.loading = false;
            });
    }
});

export default playlistSlice.reducer;
// Note: The above code is a Redux slice for managing playlists, including an async thunk for fetching playlist data by ID.
