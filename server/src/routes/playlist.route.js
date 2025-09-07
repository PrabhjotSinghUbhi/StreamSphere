import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    addVideoToPlaylist,
    createPlaylist,
    deletePlaylist,
    getPlaylistById,
    getUserPlaylists,
    removeVideoFromPlaylist,
    updatePlaylist
} from "../controller/playlist.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/create-playlist").post(upload.none(), verifyJWT, createPlaylist);
router.route("/get-user-playlist/:userID").get(verifyJWT, getUserPlaylists);
router.route("/get-playlist/:playlistId").get(verifyJWT, getPlaylistById);
router
    .route("/add-video/:playlistId/:videoId")
    .post(verifyJWT, addVideoToPlaylist);
router
    .route("/remove-video/:playlistId/:videoId")
    .delete(verifyJWT, removeVideoFromPlaylist);
router.route("/delete-playlist/:playlistId").delete(verifyJWT, deletePlaylist);
router
    .route("/update-playlist/:playlistId")
    .put(upload.none(), verifyJWT, updatePlaylist);

export default router;
