/* eslint-disable no-irregular-whitespace */
import React from "react";
import { Link } from "react-router";
import { useFormatDuration } from "../../hooks/useFormatDuration.hook";

function VideoSmall({ duration, thumbnail, alt, title, views, videoId, createdAt }) {
    const { formatTime } = useFormatDuration();
    return (
        <Link to={`/video/${videoId}`} className="w-full">
            <div className="relative mb-2 w-full pt-[56%]">
                <div className="absolute inset-0">
                    <img src={thumbnail} alt={alt} className="h-full w-full" />
                </div>
                <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                    {duration}
                </span>
            </div>
            <h6 className="mb-1 font-semibold">{title}</h6>
            <p className="flex text-sm text-gray-200">
                {views} Views · {formatTime(createdAt)}
            </p>
        </Link>
    );
}

export default VideoSmall;
