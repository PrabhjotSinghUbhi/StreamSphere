import React, { useEffect } from "react";
import { Link, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
    apiIncrementVideoViewCount,
    fetchVideoById,
    incrementVideoViewCount
} from "../../slice/videoSlice";
import Video from "../VideoComponent/Video";
import VideoDetailComp from "../VideoDetailComp/VideoDetailComp";
import ListComments from "../VideoComments/ListComments";
import { useFormatDuration } from "../../hooks/useFormatDuration.hook";
import { addVideoToHistory } from "../../slice/watchHistorySlice";
import { Skeleton } from "@/components/ui/skeleton";
import VideoSmall from "../Video/VideoSmall";

function VideoDetailPage() {
    const { video_id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (video_id) {
            dispatch(fetchVideoById(video_id));
            dispatch(apiIncrementVideoViewCount(video_id));
            dispatch(incrementVideoViewCount());
            dispatch(addVideoToHistory(video_id));
        }
    }, [video_id]);

    const video = useSelector((state) => state.currentVideo.currentVideo);
    const { user } = useSelector((state) => state.loginUser.login_user);
    const { homeVideos } = useSelector((state) => state.homeVideos);

    const { formatDuration } = useFormatDuration();
    const suggestedVideos = homeVideos?.filter((vid) => vid?._id !== video_id);

    const isLoading = !video?._id;

    return (
        <div className="flex h-full w-full bg-[#0f0f0f] text-white">
            {/* Main + Sidebar container */}
            <div className="flex flex-col lg:flex-row w-full px-4 py-3 gap-6 overflow-y-auto">
                {/* Main Content */}
                <div className="flex flex-col w-full lg:w-[70%] xl:w-[72%]">
                    {/* Video Player + Loader */}
                    {isLoading ? (
                        <div className="space-y-4">
                            <Skeleton className="h-[240px] sm:h-[320px] lg:h-[480px] w-full rounded-xl" />
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    ) : (
                        <>
                            <Video video={video} />
                            <VideoDetailComp
                                video_id={video_id}
                                video={video}
                                user={user}
                            />
                        </>
                    )}

                    {/* Suggested Videos (mobile & tablet → directly below description) */}
                    <div className="mt-6 lg:hidden">
                        {isLoading ? (
                            <div className="space-y-4">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <div key={i} className="flex gap-2">
                                        <Skeleton className="h-[90px] w-40 rounded-md" />
                                        <div className="flex flex-col space-y-2">
                                            <Skeleton className="h-4 w-32" />
                                            <Skeleton className="h-3 w-20" />
                                            <Skeleton className="h-3 w-16" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {suggestedVideos?.map((vid) => (
                                    <Link
                                        key={vid._id}
                                        to={`/video/${vid?._id}`}
                                        className="flex gap-2 rounded-lg transition hover:bg-white/10 p-1"
                                    >
                                        <div className="relative w-5/12">
                                            <img
                                                src={
                                                    vid?.thumbnail?.url ||
                                                    "https://placehold.co/600x400"
                                                }
                                                alt={
                                                    vid?.title ||
                                                    "Video thumbnail"
                                                }
                                                className="h-full w-full rounded-md object-cover"
                                            />
                                            <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1.5 text-xs">
                                                {typeof vid?.duration ===
                                                "number"
                                                    ? formatDuration(
                                                          vid?.duration
                                                      )
                                                    : "0:00"}
                                            </span>
                                        </div>
                                        <div className="flex flex-col w-7/12">
                                            <h6 className="line-clamp-2 text-sm font-semibold">
                                                {vid?.title}
                                            </h6>
                                            <p className="text-xs text-gray-400">
                                                {vid?.Owner?.fullName ||
                                                    "Unknown"}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {vid?.view ?? 0} views ·{" "}
                                                {vid?.uploadedAt ||
                                                    "1 hour ago"}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Comments (after suggested videos on mobile) */}
                    <div className="mt-6">
                        {isLoading ? (
                            <div className="space-y-4">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <div key={i} className="flex gap-3">
                                        <Skeleton className="h-10 w-10 rounded-full" />
                                        <div className="flex flex-col gap-2 w-full">
                                            <Skeleton className="h-4 w-1/2" />
                                            <Skeleton className="h-4 w-3/4" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <ListComments />
                        )}
                    </div>
                </div>

                {/* Sidebar Suggested Videos (desktop only) */}
                <aside className="hidden lg:block lg:w-[30%] xl:w-[28%] pr-4 pt-3 overflow-y-auto">
                    {isLoading ? (
                        <div className="space-y-4">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="flex gap-2">
                                    <Skeleton className="h-[90px] w-40 rounded-md" />
                                    <div className="flex flex-col space-y-2">
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-3 w-20" />
                                        <Skeleton className="h-3 w-16" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {suggestedVideos?.map((vid) => (
                                <Link
                                    key={vid._id}
                                    to={`/video/${vid?._id}`}
                                    className="flex gap-2 rounded-lg transition hover:bg-white/10 p-1"
                                >
                                    <div className="relative w-5/12">
                                        <img
                                            src={
                                                vid?.thumbnail?.url ||
                                                "https://placehold.co/600x400"
                                            }
                                            alt={
                                                vid?.title || "Video thumbnail"
                                            }
                                            className="h-full w-full rounded-md object-cover"
                                        />
                                        <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1.5 text-xs">
                                            {typeof vid?.duration === "number"
                                                ? formatDuration(vid?.duration)
                                                : "0:00"}
                                        </span>
                                    </div>
                                    <div className="flex flex-col w-7/12">
                                        <h6 className="line-clamp-2 text-sm font-semibold">
                                            {vid?.title}
                                        </h6>
                                        <p className="text-xs text-gray-400">
                                            {vid?.Owner?.fullName || "Unknown"}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {vid?.view ?? 0} views ·{" "}
                                            {vid?.uploadedAt || "1 hour ago"}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </aside>
            </div>
        </div>
    );
}

export default VideoDetailPage;
