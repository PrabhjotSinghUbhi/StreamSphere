/* eslint-disable no-irregular-whitespace */
import React from "react";
import { Link } from "react-router";
import { useFormatDuration } from "../../hooks/useFormatDuration.hook";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react"; // shadcn uses lucide icons

function VideoSmall({
    duration,
    thumbnail,
    alt,
    title,
    views,
    videoId,
    createdAt
}) {
    const { formatTime } = useFormatDuration();

    return (
        <div className="w-full relative">
            <Link to={`/video/${videoId}`} className="block">
                <div className="relative mb-2 w-full pt-[56%]">
                    <img
                        src={thumbnail}
                        alt={alt}
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                        {duration}
                    </span>
                </div>
                <h6 className="mb-1 font-semibold">{title}</h6>
                <p className="flex text-sm text-gray-200">
                    {views} Views · {formatTime(createdAt)}
                </p>
            </Link>

            {/* Dropdown Menu */}
            <div className="absolute top-2 right-2">
                <DropdownMenu>
                    <DropdownMenuTrigger className="p-1">
                        <MoreVertical className="h-5 w-5 text-gray-400 hover:text-white" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Save to Watch Later</DropdownMenuItem>
                        <DropdownMenuItem>Add to Playlist</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}

export default VideoSmall;
