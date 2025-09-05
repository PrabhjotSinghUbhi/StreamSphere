import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { commentService } from "../service/comment.service";

export const fetchCurrentVideoComments = createAsyncThunk(
    "comments/fetchByVideoId",
    async (videoId, { rejectWithValue }) => {
        try {
            const response = await commentService.getVideoComments(videoId);
            console.log("Fetched comments:", response);
            return response.payload;
        } catch (error) {
            console.error("Error fetching comments:", error);
            return rejectWithValue(error.response.data);
        } finally {
            console.log("Fetch comments thunk completed.", videoId);
        }
    }
);

export const publishComment = createAsyncThunk(
    "comments/publishComment",
    async ({ videoId, commentData }, { rejectWithValue }) => {
        try {
            const response = await commentService.postComment(
                videoId,
                commentData
            );
            return response.payload;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const commentSlice = createSlice({
    name: "comments",
    initialState: {
        comments: []
    },
    reducers: {
        addComment: (state, action) => {
            state.comments.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        //!fetchCurrentVideoComments
        builder
            .addCase(fetchCurrentVideoComments.fulfilled, (state, action) => {
                console.log("Fetched comments:", action.payload);
                state.comments = action.payload;
            })
            .addCase(fetchCurrentVideoComments.pending, () => {
                console.log("Fetching comments...");
            })
            .addCase(fetchCurrentVideoComments.rejected, (state, action) => {
                console.error("Failed to fetch comments:", action.payload);
                state.comments = [];
            });

        //!publishComment
        builder
            .addCase(publishComment.fulfilled, (state, action) => {
                state.comments.push(action.payload);
            })
            .addCase(publishComment.rejected, (state, action) => {
                console.error("Failed to publish comment:", action.payload);
            });
    }
});

export const { addComment } = commentSlice.actions;

export default commentSlice.reducer;
