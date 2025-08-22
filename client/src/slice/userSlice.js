import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null
};

const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        updateAvatar: (state, action) => {
            state.user.avatar.url = action.payload;
        },
        updateCover: (state, action) => {
            state.user.coverImage.url = action.payload;
        },
        removeUser: (state) => {
            state.user = null;
        }
    }
});

export const { setUser, updateAvatar, updateCover, removeUser } =
    userSlice.actions;

export default userSlice.reducer;
