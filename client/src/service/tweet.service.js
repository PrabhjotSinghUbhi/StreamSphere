import { api } from "../api/api";
import { makeRequest } from "../api/makeRequest";

export const tweetService = {
    postTweet: (tweetData) => {
        return makeRequest(() => api.post("/tweets/add-tweet", tweetData), {
            successMessage: "Tweet posted successfully!"
        });
    },

    updateTweet: (tweetId, updatedData) => {
        return (
            makeRequest(() =>
                api.patch(`/tweets/update-tweet/${tweetId}`, updatedData)
            ),
            {
                successMessage: "Tweet updated successfully!"
            }
        );
    },

    deleteTweet: (tweetId) => {
        return makeRequest(
            () => api.delete(`/tweets/delete-tweet/${tweetId}`),
            {
                successMessage: "Tweet deleted successfully!"
            }
        );
    },

    getUserTweets: (userId) => {
        return makeRequest(() => api.get(`/tweets/user-tweets/${userId}`), {
            successMessage: "User tweets retrieved successfully!"
        });
    }
};