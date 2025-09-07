/* eslint-disable no-irregular-whitespace */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import { fetchPlayList } from "../../slice/playlistSlice";
import { useFormatDuration } from "../../hooks/useFormatDuration.hook";
import PlayListLoader from "../PlaylistLoader/PlaylistLoader";

function PlayListPage() {
    const dispatch = useDispatch();
    const { playlistId } = useParams();
    const { playlist } = useSelector((state) => state.playlist);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            dispatch(fetchPlayList(playlistId));
            setLoading(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, [dispatch, playlistId]);

    const { formatDuration, formatViews, formatTime } = useFormatDuration();

    if (loading) return <PlayListLoader />;

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white">
            <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto px-4 py-6 gap-8">
                {/* Playlist Info (Left Column) */}
                <aside className="w-full lg:w-1/3">
                    {/* Playlist Thumbnail */}
                    <div className="relative mb-4 w-full pt-[56%] rounded-lg overflow-hidden">
                        <img
                            src={playlist?.videos?.[0]?.thumbnail?.url}
                            alt={playlist?.name}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <p className="flex justify-between text-sm text-gray-200">
                                <span>Playlist</span>
                                <span>
                                    {playlist?.videos?.length || 0} videos
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Playlist Details */}
                    <h2 className="text-xl font-bold mb-2">{playlist?.name}</h2>
                    <p className="text-sm text-gray-300 mb-4">
                        {playlist?.description || "No description available."}
                    </p>

                    {/* Owner Info */}
                    <Link
                        to={`/channel/${playlist?.owner?.username}/videos`}
                        className="block"
                    >
                        <div className="flex items-center gap-3 mt-4">
                            <img
                                src={playlist?.owner?.avatar?.url}
                                alt={playlist?.owner?.username}
                                className="w-14 h-14 rounded-full"
                            />
                            <div>
                                <h6 className="font-semibold">
                                    {playlist?.owner?.fullName}
                                </h6>
                                <p className="text-sm text-gray-400">
                                    757K subscribers
                                </p>
                            </div>
                        </div>
                    </Link>
                </aside>

                {/* Playlist Videos (Right Column) */}
                <section className="flex-1 flex flex-col gap-4">
                    {playlist?.videos?.map((video, index) => (
                        <Link
                            key={video?._id}
                            to={`/video/${video?._id}`}
                            className="flex gap-4 w-full group"
                        >
                            {/* Thumbnail */}
                            <div className="relative w-48 shrink-0 rounded-lg overflow-hidden">
                                <img
                                    src={video?.thumbnail?.url}
                                    alt={video?.title}
                                    className="w-full h-full object-cover group-hover:brightness-90 transition"
                                />
                                <span className="absolute bottom-1 right-1 text-xs bg-black/70 px-1.5 rounded">
                                    {formatDuration(video?.duration)}
                                </span>
                            </div>

                            {/* Video Info */}
                            <div className="flex-1">
                                <h3 className="font-semibold line-clamp-2 group-hover:text-gray-200">
                                    {video?.title}
                                </h3>
                                <p className="text-sm text-gray-400 mt-1">
                                    {formatViews(video?.view)} views •{" "}
                                    {formatTime(video?.createdAt)}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                    <img
                                        src={video?.owner?.avatar?.url}
                                        alt={video?.owner?.username}
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <p className="text-sm text-gray-300">
                                        {video?.owner?.fullName}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </section>
            </div>
        </div>
    );
}

export default PlayListPage;
