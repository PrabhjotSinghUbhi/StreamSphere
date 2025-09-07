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
import {
    apiDeletePlaylist,
    deletePlaylist,
    fetchChannelPlaylists
} from "../../slice/channelPlaylistSlice";
import { Link, useNavigate } from "react-router";
import EmptyPlayList from "../ChannelEmptyPlayList/EmptyPlayList";
import ChannelPlayListLoader from "../ChannelPlaylistLoader/ChannelPlaylistLoader";

function ChannelPlayList({ isMyPlaylist = false }) {
    const dispatch = useDispatch();

    const { _id } = useSelector((state) => state.loginUser.login_user.user);

    const { channelInfo } = useSelector((state) => state.channelInfo);

    useEffect(() => {
        if (isMyPlaylist) {
            if (_id) dispatch(fetchChannelPlaylists(_id));
        } else {
            channelInfo && dispatch(fetchChannelPlaylists(channelInfo?._id));
        }
    }, [dispatch, _id, isMyPlaylist]);

    const { channelPlaylists, loading } = useSelector(
        (state) => state.channelPlaylists
    );
    const navigator = useNavigate();

    if (loading) {
        return <ChannelPlayListLoader />;
    }

    return (
        <div className="h-screen overflow-y-auto bg-[#121212] text-white scrollbar-hide">
            <section className="w-full px-4 py-6 sm:ml-[70px] lg:ml-0">
                {/* Grid layout for responsiveness */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {channelPlaylists?.map((playlist) => (
                        <Card
                            key={playlist?._id}
                            className="group bg-transparent border-0 rounded-lg overflow-hidden transition"
                        >
                            {/* Thumbnail */}
                            <Link
                                to={`/playlist/${playlist?._id}`}
                                key={playlist?._id}
                            >
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
                                            <Play /> <span>Play all</span>
                                        </button>
                                    </div>

                                    {/* Video count tag */}
                                    <div className="absolute right-2 bottom-2 text-xs bg-black/70 px-2 py-0.5 rounded">
                                        {playlist?.videos?.length || 0} videos
                                    </div>
                                </div>
                            </Link>
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
                                                    playlist?.owner?.avatar?.url
                                                }
                                                alt={playlist?.owner?.fullName}
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
                                        <DropdownMenuItem
                                            onClick={() => {
                                                navigator(
                                                    `/playlist/${playlist?._id}`
                                                );
                                            }}
                                        >
                                            Play all
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => {
                                                dispatch(
                                                    deletePlaylist(
                                                        playlist?._id
                                                    )
                                                );
                                                dispatch(
                                                    apiDeletePlaylist(
                                                        playlist?._id
                                                    )
                                                );
                                            }}
                                            variant="destructive"
                                        >
                                            Delete playlist
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Empty state */}
                {channelPlaylists?.length === 0 && <EmptyPlayList />}
            </section>
        </div>
    );
}

export default ChannelPlayList;
