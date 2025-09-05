import { api } from "../api/api";
import { makeRequest } from "../api/makeRequest";

export const playlistService = {
    createPlaylist: (playlistData) => {
        return makeRequest(
            () => api.post(`/playlists/create-playlist`, playlistData),
            {
                successMessage: "Playlist created successfully!"
            }
        );
    },

    getUserPlaylists: (userId) => {
        return makeRequest(
            () => api.get(`/playlists/get-user-playlist/${userId}`),
            {
                successMessage: "User playlists retrieved successfully!"
            }
        );
    },

    getPlaylistById: (playlistId) => {
        return makeRequest(
            () => api.get(`/playlists/get-playlist/${playlistId}`),
            {
                successMessage: "Playlist details retrieved successfully!"
            }
        );
    },

    addVideoToPlaylist: (playlistId, videoId) => {
        return (
            makeRequest(() =>
                api.post(`/playlists/add-video/${playlistId}/${videoId}`)
            ),
            {
                successMessage: "Video added to playlist successfully!"
            }
        );
    },

    removeVideoFromPlaylist: (playlistId, videoId) => {
        return makeRequest(() =>
            api.delete(`/playlists/remove-video/${playlistId}/${videoId}`)
        );
    },

    deletePlaylist: (playlistId) => {
        return makeRequest(() =>
            api.delete(`/playlists/delete-playlist/${playlistId}`)
        );
    },

    updatePlaylist: (playlistId, updatedData) => {
        return makeRequest(() =>
            api.put(`/playlists/update-playlist/${playlistId}`, updatedData)
        );
    }
};
