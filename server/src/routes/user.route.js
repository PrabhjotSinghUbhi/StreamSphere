import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
    changeCurrentPassword,
    getCurrentUser,
    getUserChannelProfile,
    getWatchHistory,
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser,
    updateUserAvatar,
    updateUserCoverImage,
    updateUserDetails
} from "../controller/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
);

router.route("/login").post(upload.none(), loginUser, async (_, res) => {
    res.send("Logged In successFully.");
});

//secure route.
router.route("/logout").post(upload.none(), verifyJWT, logoutUser);
router.route("/refresh-token").post(upload.none(), refreshAccessToken);

router
    .route("/change-password")
    .post(upload.none(), verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);

router
    .route("/update-account-details")
    .patch(upload.none(), verifyJWT, updateUserDetails);

router
    .route("/update-avatar")
    .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

router
    .route("/update-cover-image")
    .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);

router
    .route("/c/:username")
    .get(upload.none(), verifyJWT, getUserChannelProfile);
router.route("/watch-history").get(verifyJWT, getWatchHistory);

export default router;
