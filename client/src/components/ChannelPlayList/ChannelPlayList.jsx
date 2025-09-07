/* eslint-disable no-irregular-whitespace */
import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MoreVertical, Play } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannelPlaylists } from "../../slice/channelPlaylistSlice";
import { Dialog } from "@headlessui/react";
import { useFormatDuration } from "../../hooks/useFormatDuration.hook";
import { Link } from "react-router";

function ChannelPlayList() {
    const dispatch = useDispatch();
    const { _id } = useSelector((state) => state.loginUser.login_user.user);

    useEffect(() => {
        if (_id) dispatch(fetchChannelPlaylists(_id));
    }, [dispatch, _id]);

    const { channelPlaylists } = useSelector((state) => state.channelPlaylists);

    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

    const { formatTime } = useFormatDuration();

    return (
        <div className="h-screen overflow-y-auto bg-[#121212] text-white scrollbar-hide">
            <section className="w-full px-4 py-6 sm:ml-[70px] lg:ml-0">
                {/* Grid layout for responsiveness */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {channelPlaylists?.map((playlist) => (
                        <Link
                            to={`/playlist/${playlist?._id}`}
                            key={playlist?._id}
                        >
                            <Card className="group bg-transparent border-0 rounded-lg overflow-hidden transition">
                                {/* Thumbnail */}
                                <div className="relative aspect-video rounded-md overflow-hidden">
                                    <img
                                        src={
                                            playlist?.videos?.length === 0
                                                ? "/empty-playlist.png"
                                                : playlist?.videos?.[0]
                                                      ?.thumbnail?.url
                                        }
                                        alt={playlist?.name}
                                        className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                                    />

                                    {/* Thumbnail stack effect */}
                                    <div className="absolute top-1 right-1 h-3 w-5 bg-black/40 rounded-sm -rotate-1" />
                                    <div className="absolute top-2 right-2 h-3 w-5 bg-black/60 rounded-sm rotate-2" />

                                    {/* Hover overlay Play button */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                                        <button className="bg-purple-600 flex text-white px-3 py-1.5 text-sm rounded-md font-medium shadow hover:bg-purple-700">
                                            <Play /> <span>
                                                Play all
                                            </span>
                                        </button>
                                    </div>

                                    {/* Video count tag */}
                                    <div className="absolute right-2 bottom-2 text-xs bg-black/70 px-2 py-0.5 rounded">
                                        {playlist?.videos?.length || 0} videos
                                    </div>
                                </div>

                                {/* Content */}
                                <CardContent className="p-3 flex items-start justify-between">
                                    <div className="flex-1 min-w-0">
                                        <h6 className="font-semibold text-sm line-clamp-1 text-white group-hover:text-purple-500 transition">
                                            {playlist?.name}
                                        </h6>
                                        <div className="flex items-center gap-2 mt-1 text-xs text-neutral-400">
                                            {playlist?.owner?.avatar?.url && (
                                                <img
                                                    src={
                                                        playlist?.owner?.avatar
                                                            ?.url
                                                    }
                                                    alt={
                                                        playlist?.owner
                                                            ?.fullName
                                                    }
                                                    className="h-5 w-5 rounded-full"
                                                />
                                            )}
                                            <span>
                                                {playlist?.owner?.fullName ||
                                                    "Unknown"}
                                            </span>
                                            <span>•</span>
                                            <span>
                                                {playlist?.videos?.length || 0}{" "}
                                                videos
                                            </span>
                                        </div>
                                    </div>

                                    {/* Dropdown Menu (⋮) */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className="p-1 rounded-full hover:bg-neutral-800">
                                                <MoreVertical className="h-5 w-5 text-neutral-400 hover:text-neutral-200" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            align="end"
                                            className="w-44"
                                        >
                                            <DropdownMenuItem>
                                                Play all
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Add to Watch Later
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Share
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <button
                                                    onClick={() =>
                                                        setIsDialogOpen(true)
                                                    }
                                                    className="w-full text-left"
                                                >
                                                    Save to playlist
                                                </button>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Empty state */}
                {channelPlaylists?.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-64 text-neutral-400">
                        <img
                            src="/empty-playlist.png"
                            alt="No playlists"
                            className="w-32 mb-4 opacity-70"
                        />
                        <p>No playlists found</p>
                    </div>
                )}
            </section>
        </div>
    );
}

export default ChannelPlayList;
