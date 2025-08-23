import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    channelInfo: null
};

const channelSlice = createSlice({
    name: "channel",
    initialState,
    reducers: {
        setChannelInfo(state, action) {
            console.log(
                "Set Channel Reducer called :: payload :: ",
                action.payload
            );
            state.channelInfo = action.payload;
        },

        updateChannelInfo(state, action) {
            state.channelInfo = action.payload;
        },

        removeChannelInfo(state) {
            state.channelInfo = null;
        },
        updateIsSubscribed(state, action) {
            state.channelInfo.isSubscribed = action.payload;
        },
        incrementSubscriberCount(state) {
            state.channelInfo.subscriberCount += 1;
        },
        decrementSubscriberCount(state) {
            state.channelInfo.subscriberCount -= 1;
        },
        addSubscriberToChannel(state, action) {
            if (state.channelInfo.subscribers) {
                state.channelInfo.subscribers.push(action.payload);
            }
        },
        removeSubscriberFromChannel(state, action) {
            if (state.channelInfo.subscribers) {
                state.channelInfo.subscribers =
                    state.channelInfo.subscribers.filter(
                        (subs) => subs.subscribers !== action.payload
                    );
            }
        }
    }
});

export const {
    setChannelInfo,
    updateChannelInfo,
    removeChannelInfo,
    updateIsSubscribed,
    incrementSubscriberCount,
    decrementSubscriberCount,
    addSubscriberToChannel,
    removeSubscriberFromChannel
} = channelSlice.actions;

export default channelSlice.reducer;
