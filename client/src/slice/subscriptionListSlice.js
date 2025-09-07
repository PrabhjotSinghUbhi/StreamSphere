import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { subscriptionService } from "../service/subscription.service";

export const fetchSubscriptions = createAsyncThunk(
    "subscriptionList/fetchSubscriptions",
    async (userId, { rejectWithValue }) => {
        try {
            const resp = await subscriptionService.getSubscriptions(userId);
            return resp.payload;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const subscriptionListSlice = createSlice({
    name: "subscriptionList",
    initialState: {
        subscriptions: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubscriptions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSubscriptions.fulfilled, (state, action) => {
                state.loading = false;
                state.subscriptions = action.payload;
            })
            .addCase(fetchSubscriptions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default subscriptionListSlice.reducer;
