import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    channelInfo: {
        videos: [],
        tweets: [],
        playlist: [],
        subscriberCount: 0,
        subscribedToCount: 0,
        subscribers: [],
        channelsSubscribedTo: []
    }
};

const channelInfoSlice = createSlice({
    name: "channelInfo",
    initialState,
    reducers: {
        setChannelAvatar: ""
    }
});
