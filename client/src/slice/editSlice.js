import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    edit: false
};

const editSlice = createSlice({
    name: "edit_button",
    initialState,
    reducers: {
        setEdit: (state, action) => {
            state.edit = action.payload;
            // You can add more logic here if needed
            console.log("Edit state changed to:", state.edit);
            
        }
    }
});

export const { setEdit } = editSlice.actions;
export default editSlice.reducer;
