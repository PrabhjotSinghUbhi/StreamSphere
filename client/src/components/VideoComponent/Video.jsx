import React from "react";

function Video({ video }) {
    return (
        <div>
            <div className="relative mb-4 w-full pt-[56%]">
                {video ? (
                    <div className="absolute inset-0">
                        <video
                            className="h-full w-full"
                            key={video?._id}
                            controls
                            muted
                        >
                            <source
                                src={video?.videoFile?.url}
                                type="video/mp4"
                            />
                        </video>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="w-10 h-10 border-4 border-[#ae7aff] border-t-transparent rounded-full animate-spin mb-3"></div>
                        <span className="text-gray-300 text-lg font-semibold">
                            Loading video...
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Video;
