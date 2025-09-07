import { User } from "../models/user.model.js";
import { ApiErrors } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) throw new ApiErrors(401, "Unauthorized request.");

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken"
        );

        if (!user) throw new ApiErrors(401, "Invalid Access Token.");

        req.user = user;
        next();
    } catch (error) {
        console.error(
            "Error Occurred in Generating or Validating Refresh Tokens",
            error.message
        );
        return res.status(401).json(new ApiResponse(null, 401, error.message));
    }
});
