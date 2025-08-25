import { api } from "../api/api";
import { makeRequest } from "../api/makeRequest";

export const videoService = {
    publishVideo: (formData) => {
        return makeRequest(() => api.post("/videos/publish-video", formData), {
            successMessage: "Published Successfully!"
        });
    },
    getChannelVideo: (username) => {
        return makeRequest(
            () => api.get(`/videos/get-channel-videos/${username}`),
            {
                successMessage: "Fetched Channel."
            }
        );
    },
    getVideoDetails: (video_id) => {
        return makeRequest(() => api.get(`/videos/v/${video_id}`), {
            successMessage: "Got the Video."
        });
    },
    getHomeVideos: () => {
        return makeRequest(() => api.get("/videos/get-all-videos"));
    },
    incrementVideoCount: (video_id) => {
        return makeRequest(
            () => api.post(`/videos/v/${video_id}/increment-views`),
            {
                successMessage: "Video view count incremented."
            }
        );
    }
};
