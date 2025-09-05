import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "../service/user.service";
import { subscriptionService } from "../service/subscription.service";
import { useDispatch } from "react-redux";

const initialState = {
    channelInfo: null
};

export const fetchChannelInfo = createAsyncThunk(
    "channel/fetchInfo",
    async (username, { rejectWithValue }) => {
        try {
            const response = await userService.getUserChannel(username);
            return response.payload;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const toggleSubscription = createAsyncThunk(
    "channel/toggleSubscription",
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

const channelSlice = createSlice({
    name: "channel",
    initialState,
    reducers: {
        toggleIsSubscribed(state) {
            if (state.channelInfo) {
                const isSubscribed = state.channelInfo.isSubscribed;
                state.channelInfo.isSubscribed = !isSubscribed;
                if (isSubscribed) {
                    state.channelInfo.subscriberCount -= 1;
                } else {
                    state.channelInfo.subscriberCount += 1;
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChannelInfo.fulfilled, (state, action) => {
                state.channelInfo = action.payload;
            })
            .addCase(fetchChannelInfo.rejected, (state, action) => {
                state.channelInfo = null;
                console.error("Failed to fetch channel info:", action.payload);
            });
    }
});

export const { toggleIsSubscribed } = channelSlice.actions;

export default channelSlice.reducer;
