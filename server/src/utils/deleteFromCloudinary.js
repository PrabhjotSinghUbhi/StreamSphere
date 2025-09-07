import { v2 as cloudinary } from "cloudinary";

const deleteImageFromCloudinary = async (public_id) => {
    try {
        const resp = await cloudinary.uploader.destroy(public_id);
        return resp;
    } catch (error) {
        console.error(
            "Error Occurred in Deleting the file on Cloudinary :: ",
            error.message
        );
        throw error;
    }
};

export default deleteImageFromCloudinary;
