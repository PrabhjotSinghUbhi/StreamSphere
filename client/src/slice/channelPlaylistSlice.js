import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { playlistService } from "../service/playlist.service";

export const fetchChannelPlaylists = createAsyncThunk(
    "channelPlaylists/fetchChannelPlaylists",
    async (userId, { rejectWithValue }) => {
        try {
            const resp = await playlistService.getUserPlaylists(userId);
            return resp.payload;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createPlaylist = createAsyncThunk(
    "channelPlaylists/createPlaylist",
    async (playlistData, { rejectWithValue }) => {
        try {
            const resp = await playlistService.createPlaylist(playlistData);
            return resp.payload;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const apiDeletePlaylist = createAsyncThunk(
    "channelPlaylists/deletePlaylist",
    async (playlistId, { rejectWithValue }) => {
        try {
            const resp = await playlistService.deletePlaylist(playlistId);
            return resp.payload;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addVideoToPlaylist = createAsyncThunk(
    "channelPlaylists/addVideoToPlaylist",
    async ({ playlistId, videoId }, { rejectWithValue }) => {
        try {
            const resp = await playlistService.addVideoToPlaylist(
                playlistId,
                videoId
            );
            return resp.payload;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const channelPlaylistSlice = createSlice({
    name: "channelPlaylists",
    initialState: {
        channelPlaylists: [],
        loading: false
    },
    reducers: {
        deletePlaylist: (state, action) => {
            state.channelPlaylists = state.channelPlaylists.filter(
                (playlist) => playlist._id !== action.payload
            );
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChannelPlaylists.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchChannelPlaylists.fulfilled, (state, action) => {
                state.channelPlaylists = action.payload;
                state.loading = false;
            })
            .addCase(fetchChannelPlaylists.rejected, (state) => {
                state.channelPlaylists = [];
                state.loading = false;
            });

        builder.addCase(createPlaylist.fulfilled, (state, action) => {
            state.channelPlaylists.push(action.payload);
        });
    }
});

export const { deletePlaylist } = channelPlaylistSlice.actions;

export default channelPlaylistSlice.reducer;
