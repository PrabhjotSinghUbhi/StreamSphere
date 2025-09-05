import { api } from "../api/api";
import { makeRequest } from "../api/makeRequest";

export const likeService = {
    likeVideo: (videoOwnerId, videoId) => {
        return makeRequest(
            () => api.post(`/likes/video/${videoOwnerId}/${videoId}`),
            {
                successMessage: "Video liked!"
            }
        );
    },

    likeTweet: (tweetOwnerId, tweetId) => {
        return makeRequest(
            () => api.post(`/likes/tweet/${tweetOwnerId}/${tweetId}`),
            {
                successMessage: "Tweet liked!"
            }
        );
    },

    likeComment: (commentOwnerId, commentId) => {
        return makeRequest(
            () => api.post(`/likes/comment/${commentOwnerId}/${commentId}`),
            {
                successMessage: "Comment liked!"
            }
        );
    },

    getLikedVideos: () => {
        return makeRequest(() => api.get(`/likes/get-liked-videos`), {
            successMessage: "Liked videos retrieved successfully!"
        });
    }
};
