import React from "react";
import VideoSmall from "../Video/VideoSmall";
import { useSelector } from "react-redux";
import { useFormatDuration } from "../../hooks/useFormatDuration.hook";

function VideoGrid() {
    const { userVideos } = useSelector((state) => state.loginUser.login_user);
    const { formatDuration } = useFormatDuration();

    return (
        <div>
            <div className="h-screen overflow-y-auto bg-[#121212] text-white">
                <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
                    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
                        <div className="px-4 pb-4">
                            <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] sm:grid-cols-3 gap-4 pt-2">
                                {userVideos?.map((video) => (
                                    <VideoSmall
                                        title={video.title}
                                        duration={formatDuration(
                                            video.duration
                                        )}
                                        thumbnail={video.thumbnail.url}
                                        alt={video.title}
                                        views={video.view}
                                        videoId={video._id}
                                        key={video._id}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default VideoGrid;
