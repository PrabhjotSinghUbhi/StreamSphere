import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    channel: null
};

const channelSlice = createSlice({
    name: "channel",
    initialState,
    reducers: {
        setChannel(state, action) {
            console.log(
                "Set Channel Reducer called :: payload :: ",
                action.payload
            );
            state.channel = action.payload;
        },
        removeChannel(state) {
            state.channel = null;
        }
    }
});

export const { setChannel,removeChannel } = channelSlice.actions;

export default channelSlice.reducer;
