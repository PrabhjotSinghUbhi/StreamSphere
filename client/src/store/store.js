import { configureStore } from "@reduxjs/toolkit";
import editReducer from "../slice/editSlice";

const store = configureStore({
    reducer: {
        edit: editReducer
    }
});

export default store;