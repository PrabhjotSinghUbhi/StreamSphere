/* eslint-disable no-irregular-whitespace */
import React, { useEffect } from "react";
import { Link, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
    apiIncrementVideoViewCount,
    decrementLikeCount,
    fetchVideoById,
    incrementLikeCount,
    incrementVideoViewCount,
    likeAVideo,
    toggleSubscriptionInVideo,
    toggleVideoIsSubscribed
} from "../../slice/videoSlice";
import Video from "../VideoComponent/Video";
import VideoDetailComp from "../VideoDetailComp/VideoDetailComp";
import ListComments from "../VideoComments/ListComments";

function VideoDetailPage() {
    const { video_id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            if (video_id) {
                dispatch(fetchVideoById(video_id));
                dispatch(apiIncrementVideoViewCount(video_id));
                dispatch(incrementVideoViewCount());
            }
        })();
    }, [video_id]);

    const video = useSelector((state) => state.currentVideo.currentVideo);
    const { user } = useSelector((state) => state.loginUser.login_user);

    return (
        <div className="h-screen overflow-y-auto bg-[#121212] text-white">
            <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
                <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0">
                    <div className="flex w-full flex-wrap gap-4 p-4 lg:flex-nowrap">
                        <div className="col-span-12 w-full">
                            <Video video={video} />
                            <VideoDetailComp
                                video_id={video_id}
                                video={video}
                                user={user}
                            />
                            <ListComments />
                        </div>
                        <div className="col-span-12 flex w-full shrink-0 flex-col gap-3 lg:w-[350px] xl:w-[400px]">
                            {/* {allVideos?.map((vid) => (
                                <Link
                                    key={vid._id}
                                    to={`/video/${vid?._id}`}
                                    className="w-full gap-x-2 border pr-2 md:flex"
                                >
                                    <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
                                        <div className="w-full pt-[56%]">
                                            <div className="absolute inset-0">
                                                <img
                                                    src={vid?.thumbnail?.url}
                                                    alt={
                                                        vid?.title ||
                                                        "Video thumbnail"
                                                    }
                                                    className="h-full w-full"
                                                />
                                            </div>
                                            <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                                                {typeof vid?.duration ===
                                                "number"
                                                    ? htmlFormatDuration(
                                                          vid.duration.toFixed(
                                                              2
                                                          )
                                                      )
                                                    : "0.00"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
                                        <div className="h-12 w-12 shrink-0 md:hidden">
                                            <img
                                                src={
                                                    vid?.Owner?.avatar?.url ||
                                                    "/user.png"
                                                }
                                                alt={
                                                    vid?.Owner?.fullName ||
                                                    "User"
                                                }
                                                className="h-full w-full rounded-full"
                                            />
                                        </div>
                                        <div className="w-full pt-1 md:pt-0">
                                            <h6 className="mb-1 text-sm font-semibold">
                                                {vid?.title}
                                            </h6>
                                            <p className="mb-0.5 mt-2 text-sm text-gray-200">
                                                {vid?.Owner?.fullName ||
                                                    "Unknown"}
                                            </p>
                                            <p className="flex text-sm text-gray-200">
                                                {vid?.view ?? 0} · views
                                                {vid?.uploadedAt ||
                                                    " 1 hour ago"}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))} */}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default VideoDetailPage;
