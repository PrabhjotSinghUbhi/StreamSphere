import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null
};

const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        setUser: (state, action) => {
            console.log("here is the payload in setUser :: ", action.payload);
            state.user = action.payload;
        },
        updateAvatar: (state, action) => {
            console.log(
                "Here is the payload of update avatar :: ",
                action.payload
            );
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
