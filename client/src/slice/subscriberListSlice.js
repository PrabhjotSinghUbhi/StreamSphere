import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { subscriptionService } from "../service/subscription.service";

export const fetchSubscribers = createAsyncThunk(
    "subscriberList/fetchSubscribers",
    async (channelId, { rejectWithValue }) => {
        try {
            const response = await subscriptionService.getSubscribers(channelId);
            return response.payload;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const subscriberListSlice = createSlice({
    name: "subscriberList",
    initialState: {
        subscriberList: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubscribers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSubscribers.fulfilled, (state, action) => {
                state.loading = false;
                state.subscriberList = action.payload;
            })
            .addCase(fetchSubscribers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default subscriberListSlice.reducer;
