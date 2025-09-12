import fs from "fs";

// safe unlink function
export const safeUnlink = (filePath) => {
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    } catch (error) {
        console.warn("Error deleting temp file:", error.message);
    }
};
