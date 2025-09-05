import React, { useEffect, useState } from "react";
import { videoService } from "../../service/video.service";
import { Link } from "react-router";
import { useFormatDuration } from "../../hooks/useFormatDuration.hook";

function Home() {
    const [homeVideos, setHomeVideos] = useState([]);

    const { formatDuration } = useFormatDuration();

    useEffect(() => {
        (async () => {
            try {
                const resp = await videoService.getHomeVideos();
                setHomeVideos(resp.payload);
                console.log("Home Videos :: ", resp);
            } catch (error) {
                console.log(
                    "Error Occurred in Fetching the home videos :: ",
                    error
                );
            }
        })();
    }, []);

    return (
        <div className="">
            <div className="h-screen overflow-y-scroll scrollbar-hide bg-[#121212] text-white">
                <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
                    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
                        <div className="grid grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] gap-4 p-4">
                            {homeVideos?.map((video) => (
                                <Link
                                    key={video._id}
                                    to={`/video/${video?._id}`}
                                >
                                    <div className="w-full">
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
                                        <div className="flex gap-x-2">
                                            <div className="h-10 w-10 shrink-0">
                                                <img
                                                    src={
                                                        video?.Owner?.avatar
                                                            ?.url || "/user.png"
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
                                                    {video?.view} Views · 44
                                                    minutes ago
                                                </p>
                                                <p className="text-sm text-gray-200">
                                                    {video?.Owner?.fullName}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Home;
