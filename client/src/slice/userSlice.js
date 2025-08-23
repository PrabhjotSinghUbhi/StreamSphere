import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    userChannelDetails: null,
    userVideos: null
};

const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        updateAvatar: (state, action) => {
            if (state.user && state.user.avatar) {
                state.user.avatar.url = action.payload;
            }
        },
        updateCover: (state, action) => {
            if (state.user && state.user.coverImage) {
                state.user.coverImage.url = action.payload;
            }
        },
        removeUser: (state) => {
            state.user = null;
        },
        setUserChannelDetails: (state, action) => {
            state.userChannelDetails = action.payload;
        },
        updateUserChannelDetails: (state, action) => {
            state.userChannelDetails = action.payload;
        },
        removeUserChannelDetails: (state) => {
            state.userChannelDetails = null;
        },
        updateFullName: (state, action) => {
            console.log("update fullName got called", action.payload);

            state.user.fullName = action.payload;
        },
        addSubscription: (state, action) => {
            state.userChannelDetails?.subscribedTo?.push(action.payload);
        },
        removeSubscription: (state, action) => {
            if (state.userChannelDetails?.subscribedTo) {
                state.userChannelDetails.subscribedTo =
                    state.userChannelDetails.subscribedTo.filter(
                        (subs) => subs?.channel !== action.payload
                    );
            }
        },
        incrementUserSubscriberCount: (state) => {
            if (state.userChannelDetails.subscriberCount) {
                state.userChannelDetails.subscriberCount += 1;
            }
        },
        decrementUserSubscriberCount: (state) => {
            if (state.userChannelDetails.subscriberCount) {
                state.userChannelDetails.subscriberCount -= 1;
            }
        },
        incrementUserSubscribedToCount: (state) => {
            if (state.userChannelDetails.channelsSubscribedTo)
                state.userChannelDetails.channelsSubscribedTo += 1;
        },
        decrementUserSubscribedToCount: (state) => {
            if (state.userChannelDetails.channelsSubscribedTo)
                state.userChannelDetails.channelsSubscribedTo -= 1;
        }
    }
});

export const {
    setUser,
    updateAvatar,
    updateCover,
    removeUser,
    setUserChannelDetails,
    updateUserChannelDetails,
    removeUserChannelDetails,
    updateFullName,
    addSubscription,
    removeSubscription,
    decrementUserSubscribedToCount,
    decrementUserSubscriberCount,
    incrementUserSubscribedToCount,
    incrementUserSubscriberCount
} = userSlice.actions;

export default userSlice.reducer;
