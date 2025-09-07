import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import { fetchPlayList } from "../../slice/playlistSlice";
import { useFormatDuration } from "../../hooks/useFormatDuration.hook";

function PlayListPage() {
    const dispatch = useDispatch();
    const { playlistId } = useParams();
    useEffect(() => {
        dispatch(fetchPlayList(playlistId));
    }, [dispatch, playlistId]);

    const { playlist, loading } = useSelector((state) => state.playlist);
    const { formatDuration, formatViews, formatTime } = useFormatDuration();

    return (
        <div className="h-screen overflow-y-scroll scrollbar-hide bg-[#121212] text-white">
            <div className="min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
                <div className="h-screen overflow-y-auto scrollbar-hide bg-[#121212] text-white">
                    <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
                        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
                            <div className="flex flex-wrap gap-x-4 gap-y-10 p-4 xl:flex-nowrap">
                                <div className="w-full shrink-0 sm:max-w-md xl:max-w-sm">
                                    <div className="relative mb-2 w-full pt-[56%]">
                                        <div className="absolute inset-0">
                                            <img
                                                src={
                                                    playlist?.videos?.[0]
                                                        ?.thumbnail?.url
                                                }
                                                alt="React Mastery"
                                                className="h-full w-full"
                                            />
                                            <div className="absolute inset-x-0 bottom-0">
                                                <div className="relative border-t bg-white/30 p-4 text-white backdrop-blur-sm before:absolute before:inset-0 before:bg-black/40">
                                                    <div className="relative z-[1]">
                                                        <p className="flex justify-between">
                                                            <span className="inline-block">
                                                                Playlist
                                                            </span>
                                                            <span className="inline-block">
                                                                {playlist
                                                                    ?.videos
                                                                    ?.length ||
                                                                    0}{" "}
                                                                videos
                                                            </span>
                                                        </p>
                                                        <p className="text-sm text-gray-200">
                                                            100K Views · 2 hours
                                                            ago
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h6 className="mb-1 font-semibold">
                                        {playlist?.name}
                                    </h6>
                                    <p className="flex text-sm text-gray-200">
                                        {playlist?.description ||
                                            "No description available."}
                                    </p>
                                    <div className="mt-6 flex items-center gap-x-3">
                                        <div className="h-16 w-16 shrink-0">
                                            <img
                                                src={
                                                    playlist?.owner?.avatar?.url
                                                }
                                                alt={playlist?.owner?.username}
                                                className="h-full w-full rounded-full"
                                            />
                                        </div>
                                        <div className="w-full">
                                            <h6 className="font-semibold">
                                                {playlist?.owner?.fullName}
                                            </h6>
                                            <p className="text-sm text-gray-300">
                                                757K Subscribers
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-full flex-col gap-y-4">
                                    {/* {Video List} */}
                                    {playlist?.videos?.map((video) => (
                                        <Link
                                            key={video?._id}
                                            to={`/video/${video?._id}`}
                                        >
                                            <div className="border">
                                                <div className="w-full max-w-3xl gap-x-4 sm:flex">
                                                    <div className="relative mb-2 w-full sm:mb-0 sm:w-5/12">
                                                        <div className="w-full pt-[56%]">
                                                            <div className="absolute inset-0">
                                                                <img
                                                                    src={
                                                                        video
                                                                            ?.thumbnail
                                                                            ?.url
                                                                    }
                                                                    alt={
                                                                        video?.title
                                                                    }
                                                                    className="h-full w-full"
                                                                />
                                                            </div>
                                                            <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                                                                {formatDuration(
                                                                    video?.duration
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-x-2 px-2 sm:w-7/12 sm:px-0">
                                                        <div className="h-10 w-10 shrink-0 sm:hidden">
                                                            <img
                                                                src="https://images.pexels.com/photos/3532545/pexels-photo-3532545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                                                alt="codemaster"
                                                                className="h-full w-full rounded-full"
                                                            />
                                                        </div>
                                                        <div className="w-full">
                                                            <h6 className="mb-1 font-semibold sm:max-w-[75%]">
                                                                {video?.title}
                                                            </h6>
                                                            <p className="flex text-sm text-gray-200 sm:mt-3">
                                                                {formatViews(
                                                                    video?.view
                                                                )}
                                                                 Views ·{" "}
                                                                {formatTime(
                                                                    video?.createdAt
                                                                )}
                                                            </p>
                                                            <div className="flex items-center gap-x-4">
                                                                <div className="mt-2 hidden h-10 w-10 shrink-0 sm:block">
                                                                    <img
                                                                        src={
                                                                            video
                                                                                ?.owner
                                                                                ?.avatar
                                                                                ?.url
                                                                        }
                                                                        alt={
                                                                            video
                                                                                ?.owner
                                                                                ?.username
                                                                        }
                                                                        className="h-full w-full rounded-full"
                                                                    />
                                                                </div>
                                                                <p className="text-sm text-gray-200">
                                                                    {
                                                                        video
                                                                            ?.owner
                                                                            ?.fullName
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlayListPage;
