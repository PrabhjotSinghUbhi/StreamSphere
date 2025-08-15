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
            state.user.avatar = action.payload;
        },
        updateCover: (state, action) => {
            state.user.coverImage = action.payload;
        }
    }
});

export const { setUser, updateAvatar, updateCover } = userSlice.actions;

export default userSlice.reducer;
