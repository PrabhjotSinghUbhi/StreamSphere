import { api } from "../api/api";
import { makeRequest } from "../api/makeRequest";

export const commentService = {
    postComment: (videoId, commentData) => {
        return makeRequest(
            () => api.post(`/comments/${videoId}`, commentData),
            {
                successMessage: "Comment posted successfully!"
            }
        );
    },

    getVideoComments: (videoId) => {
        return makeRequest(() => api.get(`/comments/${videoId}`), {
            successMessage: "Comments fetched successfully!"
        });
    },

    deleteComment: (commentId) => {
        return makeRequest(() => api.delete(`/comments/${commentId}`), {
            successMessage: "Comment deleted successfully!"
        });
    },

    updateComment: (commentId, updatedData) => {
        return makeRequest(
            () => api.put(`/comments/${commentId}`, updatedData),
            {
                successMessage: "Comment updated successfully!"
            }
        );
    }
};
