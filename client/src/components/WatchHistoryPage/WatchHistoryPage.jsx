import React, { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useFormatDuration } from "../../hooks/useFormatDuration.hook";
import { useDispatch, useSelector } from "react-redux";
import { fetchWatchHistory } from "../../slice/watchHistorySlice";
import EmptyWatchHistory from "./EmptyWatchHistoryComp";
import { MoreVerticalIcon, Settings } from "lucide-react";
import WatchLaterVideoDropDown from "../WatchLaterVideos/WatchLaterVideoDropDown";
import WatchLaterSettingDropDown from "../WatchHistorySettingDropDown/WatchHistorySettingDropDown";
import { Link } from "react-router";

function WatchHistoryPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchWatchHistory());
        setTimeout(() => {}, 1200);
    }, [dispatch]);

    const { formatDuration, formatTime, formatViews } = useFormatDuration();
    const { watchHistory, loading } = useSelector(
        (state) => state.watchHistory
    );

    let content;
    if (loading) {
        content = Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-4">
                {/* Thumbnail Skeleton */}
                <Skeleton className="w-full sm:w-64 aspect-video rounded-lg bg-neutral-700/50" />
                {/* Info Skeleton */}
                <div className="flex-1 space-y-3">
                    <Skeleton className="h-5 w-3/4 bg-neutral-700/50" />
                    <Skeleton className="h-4 w-5/6 bg-neutral-700/50" />
                    <Skeleton className="h-4 w-1/2 bg-neutral-700/50" />
                    <div className="flex items-center gap-2 mt-3">
                        <Skeleton className="h-8 w-8 rounded-full bg-neutral-700/50" />
                        <Skeleton className="h-4 w-24 bg-neutral-700/50" />
                    </div>
                </div>
            </div>
        ));
    } else if (watchHistory.length === 0) {
        content = <EmptyWatchHistory />;
    } else {
        content = watchHistory.map((video) => (
            <Link key={video?._id} to={`/video/${video?._id}`}>
                <div
                    key={video?._id}
                    className="flex flex-col sm:flex-row gap-4 cursor-pointer group"
                >
                    {/* Thumbnail */}
                    <div className="relative w-full sm:w-64 flex-shrink-0 aspect-video overflow-hidden rounded-lg">
                        <img
                            src={video?.thumbnail?.url}
                            alt={video?.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                            {formatDuration(video?.duration)}
                        </span>
                    </div>
                    {/* Video Info */}
                    <div className="flex flex-col w-full justify-between ">
                        <div>
                            <div className="flex justify-between items-start">
                                <h3 className="font-medium text-base line-clamp-2 mb-1">
                                    {video?.title}
                                </h3>
                                <div className="mx-15  rounded-full p-1 hover:bg-neutral-800">
                                    <WatchLaterVideoDropDown
                                        videoId={video?._id}
                                    />
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {formatViews(video?.view)} views •{" "}
                                {formatTime(video?.createdAt)}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                            <img
                                src={video?.owner?.avatar?.url}
                                alt={video?.owner?.username}
                                className="h-8 w-8 rounded-full object-cover border"
                            />
                            <span className="text-sm font-medium">
                                {video?.owner?.fullName}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        ));
    }

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-6 relative mb-20">
            <div className="flex items-center mb-4 justify-between">
                <div className="">
                    <h2 className="text-2xl font-bold mb-1">Watch History</h2>
                </div>
                <div className="">
                    <WatchLaterSettingDropDown />
                </div>
            </div>
            <hr className="border-neutral-700 mb-6" />
            <div className="flex flex-col gap-6">{content}</div>
        </div>
    );
}

export default WatchHistoryPage;
