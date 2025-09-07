import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tweetService } from "../service/tweet.service";

export const apiGetChannelTweets = createAsyncThunk(
    "channelTweets/fetchChannelTweets",
    async (channelId, { rejectWithValue }) => {
        try {
            const resp = await tweetService.getUserTweets(channelId);
            return resp.payload;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const apiPostTweet = createAsyncThunk(
    "channelTweets/postTweet",
    async (tweetData, { rejectWithValue }) => {
        try {
            const resp = await tweetService.postTweet(tweetData);
            return resp.payload;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const apiDeleteTweet = createAsyncThunk(
    "channelTweets/deleteTweet",
    async (tweetId, { rejectWithValue }) => {
        try {
            const resp = await tweetService.deleteTweet(tweetId);
            return resp.payload;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const channelTweetSlice = createSlice({
    name: "channelTweets",
    initialState: {
        channelTweets: [],
        loading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(apiGetChannelTweets.pending, (state) => {
                state.loading = true;
            })
            .addCase(apiGetChannelTweets.fulfilled, (state, action) => {
                state.loading = false;
                state.channelTweets = action.payload;
            })
            .addCase(apiGetChannelTweets.rejected, (state) => {
                state.loading = false;
                state.channelTweets = [];
            });

        builder.addCase(apiPostTweet.fulfilled, (state, action) => {
            state.channelTweets.unshift(action.payload);
        });

        builder.addCase(apiDeleteTweet.fulfilled, (state, action) => {
            state.channelTweets = state.channelTweets.filter(
                (tweet) => tweet._id !== action.payload._id
            );
        });
    }
});

export default channelTweetSlice.reducer;
