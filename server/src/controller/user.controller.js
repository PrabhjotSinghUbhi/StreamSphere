import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiErrors } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import uploadFileOnCloudinary from "../utils/uploadOnCloudinary.js";
import mongoose from "mongoose";
import deleteImageFromCloudinary from "../utils/deleteFromCloudinary.js";

const generateAccessRefreshTokens = async function (userId) {
    try {
        const foundUser = await User.findById(userId);
        const accessToken = foundUser.generateAccessTokens();
        const refreshToken = foundUser.generateRefreshTokens();

        foundUser.refreshToken = refreshToken;
        await foundUser.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (err) {
        throw new ApiErrors(
            500,
            `Something went wrong while generating Tokens: ${err.message}`
        );
    }
};

const registerUser = asyncHandler(async (req, res) => {
    try {
        console.log("Register User Function Called.");

        const { username, email, fullName, password, confirmPassword } =
            req.body;

        // check for empty fields.
        if (
            [username, email, fullName, password, confirmPassword].some(
                (field) => field?.trim() === "" || field === undefined
            )
        ) {
            throw new ApiErrors(400, "All fields are compulsory.");
        }

        // check if passwords match
        if (password !== confirmPassword) {
            throw new ApiErrors(400, "Passwords do not match.");
        }

        //check if the username already exists.
        const existedUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existedUser) {
            throw new ApiErrors(
                409,
                "User with this username or email already exists."
            );
        }

        const avatarLocalPath = req?.files?.avatar?.[0]?.path;
        const coverImageLocalPath = req?.files?.coverImage?.[0]?.path;

        console.log(
            "hey prince here is the avatar local path",
            avatarLocalPath
        );
        console.log(
            "hey prince here is the cover local path",
            coverImageLocalPath
        );

        if (!avatarLocalPath)
            throw new ApiErrors(400, "Avatar image not uploaded correctly.");

        // uploading thing will definitely take time, so use await.
        const avatar = await uploadFileOnCloudinary(avatarLocalPath);
        if (!avatar) throw new ApiErrors(400, "Avatar field is required.");

        const coverImage = await uploadFileOnCloudinary(coverImageLocalPath);

        const userCreated = await User.create({
            fullName,
            avatar: {
                url: avatar.url,
                public_id: avatar.public_id
            },
            coverImage: {
                url: coverImage.url,
                public_id: coverImage.public_id || ""
            },
            email,
            username: username.toLowerCase(),
            password
        });

        // check for the user in the database.
        const isCreated = await User.findById(userCreated._id).select(
            "-password -refreshToken"
        );
        console.log(req.files);

        // throw error if user not found.
        if (!isCreated)
            throw new ApiErrors(
                500,
                "Something went wrong in uploading the data."
            );

        return res
            .status(201)
            .json(
                new ApiResponse(isCreated, 201, "User registered successfully.")
            );
    } catch (error) {
        console.error("Registration error:", error);
        return res
            .status(error.statusCode || 500)
            .json(
                new ApiResponse(null, error.statusCode || 500, error.message)
            );
    }
});

const loginUser = asyncHandler(async (req, res) => {
    try {
        const { username, password, email } = req.body;

        if (!username && !email)
            throw new ApiErrors(400, "Username or Email is required.");

        const foundUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (!foundUser) throw new ApiErrors(404, "No user found.");

        //!imp: do not use the User to access the methods made by you using userSchema.methods.yourMethod. User not have access to methods made by you.

        const isPasswordValid = await foundUser.isPasswordCorrect(password);

        if (!isPasswordValid)
            throw new ApiErrors(404, "Invalid User credentials.");

        const { accessToken, refreshToken } = await generateAccessRefreshTokens(
            foundUser._id
        );

        //options for sending secure cookies.
        const options = {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, {
                ...options,
                maxAge: 5 * 60 * 60 * 1000
            })
            .cookie("refreshToken", refreshToken, {
                ...options,
                maxAge: 2 * 24 * 60 * 60 * 1000 // 1 min
            })
            .json(
                new ApiResponse(
                    {
                        foundUser,
                        accessToken,
                        refreshToken
                    },
                    200,
                    "User Logged in Successfully."
                )
            );
    } catch (error) {
        console.log("Error Occurred in Login User: ", error.message);
        return res
            .status(error.statusCode || 500)
            .json(
                new ApiResponse(null, error.statusCode || 500, error.message)
            );
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    try {
        const resLogOut = await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset: {
                    refreshToken: 1
                }
            },
            {
                new: true
            }
        ).select("-password -refreshToken");

        console.log(resLogOut);

        const options = {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        };

        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json(
                new ApiResponse(
                    { resLogOut },
                    200,
                    "User Logged Out successfully."
                )
            );
    } catch (error) {
        console.log("Error :: Logging out the user :: ", error.message);
        return res.status(500).json(new ApiResponse(null, 500, error.message));
    }
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    console.log("refresh access token was called.");

    try {
        const incomingRefreshToken =
            req.cookies.refreshToken || req.body.refreshToken;

        console.log("Got the refresh Token :: ", incomingRefreshToken);

        if (!incomingRefreshToken)
            throw new ApiErrors(401, "Unauthorized request.");

        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken?._id);

        if (!user) throw new ApiErrors(401, "Invalid Refresh Token.");

        if (user?.refreshToken !== incomingRefreshToken)
            throw new ApiErrors(401, "Invalid Incoming Refresh Token.");

        const options = {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        };

        const { accessToken, refreshToken } = await generateAccessRefreshTokens(
            user._id
        );

        return res
            .status(200)
            .cookie("accessToken", accessToken, {
                ...options,
                maxAge: 5 * 60 * 60 * 1000 // 5 hrs
            })
            .cookie("refreshToken", refreshToken, {
                ...options,
                maxAge: 2 * 24 * 60 * 60 * 1000 // 2 days
            })
            .json(
                new ApiResponse(
                    {
                        user,
                        refreshToken,
                        accessToken
                    },
                    200,
                    "Access token refreshed successfully."
                )
            );
    } catch (error) {
        console.log(
            "Error Occurred in Refreshing the access token :: ",
            error.message
        );
        return res
            .status(403)
            .json(
                new ApiResponse(
                    null,
                    403,
                    error.message || "Something went wrong in refreshing access"
                )
            );
    }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;

        //since this will be a secure route so req.user will have access to the user and its id.
        const userId = req.user._id;

        const user = await User.findById(userId);

        if (!user)
            throw new ApiErrors(401, "Unauthorized request. User not found.");

        if (!oldPassword || !newPassword || !confirmPassword)
            throw new ApiErrors(401, "All fields are required.");

        if (!(await user.isPasswordCorrect(oldPassword)))
            throw new ApiErrors(401, "Old password is incorrect.");

        if (newPassword !== confirmPassword)
            throw new ApiErrors(401, "Passwords do not match.");

        user.password = newPassword;
        await user.save({ validateBeforeSave: false });

        return res
            .status(200)
            .json(new ApiResponse({}, 200, "Password changed successfully."));
    } catch (error) {
        console.error(
            "Error Occurred :: Changing the password :: ",
            error.message
        );
        return res.status(501).json(new ApiResponse(null, 501, error.message));
    }
});

const getCurrentUser = asyncHandler(async (req, res) => {
    try {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    { user: req.user },
                    200,
                    "Current User Fetched."
                )
            );
    } catch (error) {
        console.log("Error Occurred in Fetching the user", error.message);
        throw new ApiErrors(
            501,
            `Something went wrong in Fetching the current user ${error.message}.`
        );
    }
});

const updateUserDetails = asyncHandler(async (req, res) => {
    try {
        const { fullName, email } = req.body;

        if (!fullName && !email) {
            throw new ApiErrors(401, "Full Name or Email is required.");
        }

        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    email,
                    fullName
                }
            },
            {
                new: true
            }
        ).select("-password -refreshToken");

        return res
            .status(200)
            .json(
                new ApiResponse(
                    { user },
                    200,
                    "User Details updated successfully."
                )
            );
    } catch (error) {
        console.log("Error Occurred in updating user details.", error.message);
        throw new ApiErrors(
            {},
            500,
            `Something went wrong while updating user details: ${error.message}`
        );
    }
});

const updateUserAvatar = asyncHandler(async (req, res) => {
    try {
        const avatarLocalPath = req?.file?.path;
        if (!avatarLocalPath) throw new ApiErrors(401, "Invalid Request.");

        console.log("User Sent by the verifyJWT Middleware :: ", req.user);

        //delete previous avatar.
        const deleteAvatarResponse = await deleteImageFromCloudinary(
            req?.user?.avatar?.public_id
        );

        console.log(
            "Previous Avatar Deleted Successfully :: ",
            deleteAvatarResponse
        );

        const avatarUploaded = await uploadFileOnCloudinary(avatarLocalPath);

        if (!avatarUploaded)
            throw new ApiErrors(400, "Error While Uploading the avatar.");

        console.log("avatar changed successfully: ", avatarUploaded.url);

        const userId = req.user?._id;

        const user = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    avatar: {
                        url: avatarUploaded.url,
                        public_id: avatarUploaded.public_id
                    }
                }
            },
            { new: true }
        ).select("-password -refreshToken");

        return res
            .status(200)
            .json(
                new ApiResponse({ user }, 200, "Avatar Updated Successfully.")
            );
    } catch (error) {
        console.log("Error while Updating the avatar: ", error.message);
        throw new ApiErrors(
            500,
            `Something went wrong while updating the avatar: ${error.message}`
        );
    }
});

const updateUserCoverImage = asyncHandler(async (req, res) => {
    try {
        const coverImageLocalPath = req.file?.path;

        if (!coverImageLocalPath) throw new ApiErrors(401, "Invalid Request.");

        const deleteCoverImageResponse = await deleteImageFromCloudinary(
            req?.user?.coverImage?.public_id
        );

        console.log(
            "Cover Image deleted successfully :: ",
            deleteCoverImageResponse
        );

        const coverImageUploaded =
            await uploadFileOnCloudinary(coverImageLocalPath);

        if (!coverImageUploaded)
            throw new ApiErrors(400, "Error While Uploading the coverImage.");

        console.log(
            "coverImage changed successfully: ",
            coverImageUploaded.url
        );

        const userId = req.user?._id;

        const user = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    coverImage: {
                        url: coverImageUploaded.url,
                        public_id: coverImageUploaded.public_id
                    }
                }
            },
            { new: true }
        ).select("-password -refreshToken");

        return res
            .status(200)
            .json(
                new ApiResponse(
                    { user },
                    200,
                    "CoverImage Updated Successfully."
                )
            );
    } catch (error) {
        console.log("Error while Updating the Cover Image: ", error.message);
    }
});

const getUserChannelProfile = asyncHandler(async (req, res) => {
    console.log("getUserChannelProfile got called")
    try {
        const { username } = req.params;
        if (!username?.trim()) throw new ApiErrors(401, "Username is missing.");

        console.log("USername is :: ",username)

        const channel = await User.aggregate([
            {
                $match: {
                    username: username?.toLowerCase()
                }
            },
            {
                $lookup: {
                    from: "subscriptions",
                    localField: "_id",
                    foreignField: "channel",
                    as: "subscribers"
                }
            },
            {
                $lookup: {
                    from: "subscriptions",
                    localField: "_id",
                    foreignField: "subscriber",
                    as: "subscribedTo"
                }
            },
            {
                $addFields: {
                    subscriberCount: {
                        $size: "$subscribers"
                    },
                    channelsSubscribedTo: {
                        $size: "$subscribedTo"
                    },
                    isSubscribed: {
                        $in: [
                            req?.user?._id,
                            {
                                $map: {
                                    input: "$subscribers",
                                    as: "sub",
                                    in: "$sub.subscriber"
                                }
                            }
                        ]
                    }
                }
            },
            {
                $project: {
                    fullName: 1,
                    username: 1,
                    subscriberCount: 1,
                    channelsSubscribedTo: 1,
                    isSubscribed: 1,
                    avatar: 1,
                    email: 1,
                    coverImage: 1
                }
            }
        ]);

        console.log(channel);

        if (!channel?.length)
            throw new ApiErrors(501, "Channel Does not exists.");

        return res
            .status(200)
            .json(
                new ApiResponse(
                    channel[0],
                    200,
                    "User Channel Fetched Successfully."
                )
            );
    } catch (error) {
        console.log("ERROR in GETTING CHANNEL :: ", error.message);
        return res.status(404).json(new ApiResponse(null, 404, error.message));
    }
});

const getWatchHistory = asyncHandler(async (req, res) => {
    const user = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId.createFromHexString(
                    req?.user?._id
                )
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "watchHistory",
                foreignField: "watchHistory",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "Owner",
                            foreignField: "_id",
                            as: "Owner",
                            pipeline: [
                                {
                                    $project: {
                                        fullName: 1,
                                        avatar: 1,
                                        username: 1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields: {
                            owner: {
                                $first: "$owner"
                            }
                        }
                    }
                ]
            }
        }
    ]);

    return res
        .status(200)
        .json(
            new ApiResponse(
                user[0].watchHistory,
                200,
                "Fetched Watched History Successfully."
            )
        );
});

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateUserDetails,
    updateUserAvatar,
    getUserChannelProfile,
    getWatchHistory,
    updateUserCoverImage
};
