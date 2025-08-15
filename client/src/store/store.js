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

//1. configure reducer.
const persistConfig = {
    key: "my_login_user",
    storage,
    whitelist: ["userReducer"] // which user to persist.
};

//2. combine reducers.
const rootReducer = combineReducers({
    login_user: userReducer
});

//3. create a persisted reducer.
const persistedUser = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: {
        edit: editReducer,
        loginUser: persistedUser
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
