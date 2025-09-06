import { api } from "../api/api";
import { makeRequest } from "../api/makeRequest";

export const userService = {
    changePassword: (formData) => {
        return makeRequest(() => api.post("users/change-password", formData), {
            successMessage: "Updated Successfully!"
        });
    },

    updateAccountDetails: (formData) => {
        return makeRequest(
            () => api.patch("users/update-account-details", formData),
            {
                successMessage: "Updated Successfully!"
            }
        );
    },

    updateUserAvatar: (formData) => {
        return makeRequest(() => api.patch("users/update-avatar", formData));
    },

    updateCoverImage: (formData) => {
        return makeRequest(() =>
            api.patch("users/update-cover-image", formData)
        );
    },

    getUserChannel: (username) => {
        return makeRequest(() => api.get(`users/c/${username}`));
    },

    getUserHistory: () => {
        return makeRequest(() => api.get("/users/watch-history"), {
            errorMessage: "Failed to fetch watch history",
            successMessage: "Watch history fetched successfully"
        });
    },

    addVideoToHistory: (videoId) => {
        return makeRequest(() =>
            api.post(`/users/add-to-watch-history/${videoId}`)
        );
    }
};
