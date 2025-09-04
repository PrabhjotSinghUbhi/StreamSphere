import { PlayList } from "../models/playlist.model.js";
import { ApiErrors } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPlaylist = asyncHandler(async (req, res) => {
    try {
        const { name, description } = req.body;
        const user = req.user._id;

        if (!name?.trim())
            throw new ApiErrors(400, "Playlist name is required");

        const createdPlaylist = await PlayList.create({
            name,
            description,
            videos: [],
            owner: user
        });

        console.log("Created the playlist :: ", createdPlaylist);

        return res
            .status(201)
            .json(
                new ApiResponse(
                    createdPlaylist,
                    201,
                    "Playlist created successfully"
                )
            );
    } catch (error) {
        return res
            .status(500)
            .json(
                new ApiResponse(
                    null,
                    error.statusCode || 500,
                    error.message || "Something went wrong in creating Playlist"
                )
            );
    }
});

const getUserPlaylists = asyncHandler(async (req, res) => {
    try {
        const { userID } = req.params;

        if (!userID) throw new ApiErrors(400, "User ID is required");

        const userPlaylists = await PlayList.find({ owner: userID });

        console.log("User playlists :: ", userPlaylists);

        return res
            .status(200)
            .json(new ApiResponse(userPlaylists, 200, "Success"));
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json(
                new ApiResponse(
                    null,
                    error.statusCode || 500,
                    error.message ||
                        "Something went wrong in getting user playlists"
                )
            );
    }
});

const getPlaylistById = asyncHandler(async (req, res) => {
    try {
        const { playlistId } = req.params;
        if (!playlistId) throw new ApiErrors(400, "Playlist ID is required");

        const playlist = await PlayList.findById(playlistId).populate("videos");

        if (!playlist) throw new ApiErrors(404, "Playlist not found");

        return res.status(200).json(new ApiResponse(playlist, 200, "Success"));
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json(
                new ApiResponse(
                    null,
                    error.statusCode || 500,
                    error.message || "Something went wrong in getting playlist"
                )
            );
    }
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    try {
        const { playlistId, videoId } = req.params;

        if (!playlistId || !videoId)
            throw new ApiErrors(400, "Playlist ID and Video ID are required");

        const playlist = await PlayList.findById(playlistId);
        if (!playlist) throw new ApiErrors(404, "Playlist not found");

        if (playlist.videos.includes(videoId)) {
            throw new ApiErrors(400, "Video already in playlist");
        }

        playlist.videos.push(videoId);
        await playlist.save();

        return res
            .status(200)
            .json(new ApiResponse(playlist, 200, "Video added to playlist"));
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json(
                new ApiResponse(
                    null,
                    error.statusCode || 500,
                    error.message ||
                        "Something went wrong in adding video to playlist"
                )
            );
    }
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    try {
        const { playlistId, videoId } = req.params;

        if (!playlistId || !videoId)
            throw new ApiErrors(400, "Playlist ID and Video ID are required");

        const playlist = await PlayList.findById(playlistId);
        if (!playlist) throw new ApiErrors(404, "Playlist not found");

        if (!playlist.videos.includes(videoId)) {
            throw new ApiErrors(400, "Video not found in playlist");
        }

        playlist.videos.pull(videoId);
        await playlist.save();

        return res
            .status(200)
            .json(
                new ApiResponse(playlist, 200, "Video removed from playlist")
            );
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json(
                new ApiResponse(
                    null,
                    error.statusCode || 500,
                    error.message ||
                        "Something went wrong in removing video from playlist"
                )
            );
    }
});

const deletePlaylist = asyncHandler(async (req, res) => {
    try {
        const { playlistId } = req.params;
        if (!playlistId) throw new ApiErrors(400, "Playlist ID is required");

        const deletePlaylist = await PlayList.findByIdAndDelete(playlistId);

        if (!deletePlaylist) throw new ApiErrors(404, "Playlist not found");

        return res
            .status(204)
            .json(
                new ApiResponse(
                    deletePlaylist,
                    204,
                    "Playlist deleted successfully."
                )
            );
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json(
                new ApiResponse(
                    null,
                    error.statusCode || 500,
                    error.message || "Something went wrong in deleting playlist"
                )
            );
    }
});

const updatePlaylist = asyncHandler(async (req, res) => {
    try {
        const { playlistId } = req.params;
        const { name, description } = req.body;

        if (!playlistId) throw new ApiErrors(400, "Playlist ID is required");

        const updatePlaylist = await PlayList.findByIdAndUpdate(
            playlistId,
            {
                name,
                description
            },
            { new: true }
        );

        if (!updatePlaylist) throw new ApiErrors(404, "Playlist not found");

        return res
            .status(200)
            .json(
                new ApiResponse(
                    updatePlaylist,
                    200,
                    "Playlist updated successfully"
                )
            );
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json(
                new ApiResponse(
                    null,
                    error.statusCode || 500,
                    error.message || "Something went wrong in updating playlist"
                )
            );
    }
});

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
};
