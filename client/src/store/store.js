import { combineReducers, configureStore } from "@reduxjs/toolkit";
import editReducer from "../slice/editSlice";
import {
    FLUSH,
    PAUSE,
    PURGE,
    REGISTER,
    REHYDRATE,
    PERSIST
} from "redux-persist";
import userReducer from "../slice/userSlice";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import channelReducer from "../slice/channelSlice.js";
import videoReducer from "../slice/videoSlice.js";
import commentReducer from "../slice/commentSlice.js";
import likeVideosReducer from "../slice/likeVideosSlice.js";
import homeVideosReducer from "../slice/homeVideosSlice.js";
import subscriberListReducer from "../slice/subscriberListSlice.js";
import watchHistoryReducer from "../slice/watchHistorySlice.js";
import channelPlaylistReducer from "../slice/channelPlaylistSlice.js";
import subscriptionListReducer from "../slice/subscriptionListSlice.js";
import playlistReducer from "../slice/playlistSlice.js";

//1. configure reducer.
const persistConfig = {
    key: "my_login_user",
    storage,
    whitelist: ["login_user", "edit"] // which user to persist.
};

//2. combine reducers.
const rootReducer = combineReducers({
    login_user: userReducer,
    edit: editReducer
});

//3. create a persisted reducer.
const persistedUser = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: {
        edit: editReducer,
        loginUser: persistedUser,
        channelInfo: channelReducer,
        currentVideo: videoReducer,
        comments: commentReducer,
        likedVideos: likeVideosReducer,
        homeVideos: homeVideosReducer,
        subscriberList: subscriberListReducer,
        watchHistory: watchHistoryReducer,
        channelPlaylists: channelPlaylistReducer,
        subscriptionList: subscriptionListReducer,
        playlist: playlistReducer
    },
    devTools: {
        name: "my shadcn stream sphere."
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [
                    FLUSH,
                    PERSIST,
                    REHYDRATE,
                    PURGE,
                    REGISTER,
                    PAUSE
                ]
            }
        })
});

export const persistor = persistStore(store);
export default store;
