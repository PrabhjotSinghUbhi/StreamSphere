import React, { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { Link } from "react-router";
import { useFormatDuration } from "../../hooks/useFormatDuration.hook";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeVideos } from "../../slice/homeVideosSlice";

function Home() {
    const { formatDuration } = useFormatDuration();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                dispatch(fetchHomeVideos());
                setTimeout(() => setLoading(false), 1500); // Simulate loading
            } catch (error) {
                console.log(
                    "Error Occurred in Fetching the home videos :: ",
                    error
                );
            }
        })();
    }, []);

    const { homeVideos } = useSelector((state) => state.homeVideos);
    const { formatTime } = useFormatDuration();

    return (
        <div className="">
            <div className="h-screen overflow-y-scroll scrollbar-hide bg-[#121212] text-white">
                <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
                    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
                        <div className="grid grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] gap-4 p-4">
                            {loading
                                ? Array.from({ length: 6 }).map((_, idx) => (
                                    <div key={idx} className="w-full">
                                        <div className="relative mb-2 w-full pt-[56%]">
                                            <Skeleton className="absolute inset-0 h-full w-full rounded-lg bg-[#232323]" />
                                            <Skeleton className="absolute bottom-1 right-1 h-6 w-16 rounded bg-[#232323]" />
                                        </div>
                                        <div className="flex gap-x-2">
                                            <Skeleton className="h-10 w-10 rounded-full bg-[#232323]" />
                                            <div className="w-full">
                                                <Skeleton className="mb-2 h-5 w-3/4 rounded bg-[#232323]" />
                                                <Skeleton className="h-4 w-1/2 rounded bg-[#232323]" />
                                                <Skeleton className="h-4 w-1/3 rounded bg-[#232323]" />
                                            </div>
                                        </div>
                                    </div>
                                ))
                                : homeVideos?.map((video) => (
                                    <div key={video?._id} className="w-full">
                                        <Link
                                            to={`/video/${video?._id}`}
                                            className="w-full"
                                        >
                                            <div className="relative mb-2 w-full pt-[56%]">
                                                <div className="absolute inset-0">
                                                    <img
                                                        src={video?.thumbnail?.url}
                                                        alt={video?.title}
                                                        className="h-full w-full"
                                                    />
                                                </div>
                                                <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                                                    {formatDuration(
                                                        video?.duration
                                                    )}
                                                </span>
                                            </div>
                                        </Link>

                                        <div className="flex gap-x-2">
                                            <div className="h-10 w-10 shrink-0">
                                                <img
                                                    src={
                                                        video?.Owner?.avatar?.url ||
                                                        "/user.png"
                                                    }
                                                    alt={video?.Owner?.fullName}
                                                    className="h-full w-full rounded-full"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <h6 className="mb-1 font-semibold">
                                                    {video?.title?.length > 40
                                                        ? video?.title?.substring(
                                                              0,
                                                              40
                                                          ) + "..."
                                                        : video?.title}
                                                </h6>
                                                <p className="flex text-sm text-gray-200">
                                                    {video?.view} Views ·{" "}
                                                    {formatTime(video?.createdAt)}
                                                </p>
                                                <p className="text-sm text-gray-200">
                                                    {video?.Owner?.fullName}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Home;
