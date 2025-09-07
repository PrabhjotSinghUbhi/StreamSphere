import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
    decrementLikeCount,
    incrementLikeCount,
    likeAVideo,
    toggleSubscriptionInVideo,
    toggleVideoIsSubscribed
} from "../../slice/videoSlice";
import { Link } from "react-router";
import { useFormatDuration } from "../../hooks/useFormatDuration.hook";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import CreatePlaylistDialog from "../Dialogs/CreatePlaylistDialog/CreatePlaylist";
import {
    addVideoToPlaylist,
    fetchChannelPlaylists
} from "../../slice/channelPlaylistSlice";
import { useSelector } from "react-redux";

function VideoDetailComp({ video_id, video, user }) {
    const dispatch = useDispatch();
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [isLiking, setIsLiking] = useState(false);
    const [isSubscribing, setIsSubscribing] = useState(false);

    const handleLike = async () => {
        if (isLiking) return;
        setIsLiking(true);
        try {
            await dispatch(
                likeAVideo({
                    videoOwnerId: video?.Owner?._id,
                    videoId: video_id
                })
            );
            if (video?.isLiked) {
                dispatch(decrementLikeCount());
            } else {
                dispatch(incrementLikeCount());
            }
        } catch (error) {
            console.error("Error liking video:", error);
        } finally {
            setIsLiking(false);
        }
    };

    const handleSubscribe = async () => {
        if (isSubscribing) return;
        setIsSubscribing(true);
        try {
            await dispatch(toggleSubscriptionInVideo(video?.Owner?._id));
            dispatch(toggleVideoIsSubscribed());
        } catch (error) {
            console.error("Error toggling subscription:", error);
        } finally {
            setIsSubscribing(false);
        }
    };

    const { formatViews, formatSubscribers, formatTime } = useFormatDuration();

    const handleAddVideoToPlaylist = (playlistIds) => {
        if (!video_id) return;
        console.log(playlistIds, video_id);
        playlistIds.forEach((playlistId) => {
            dispatch(addVideoToPlaylist({ playlistId, videoId: video_id }));
        });
    };

    const [addToPlaylistOpen, setAddToPlaylistOpen] = useState(false);
    const closeAddToPlaylist = () => setAddToPlaylistOpen(false);

    const { channelPlaylists } = useSelector((state) => state.channelPlaylists);
    const channelPlaylistsLoading = useSelector(
        (state) => state.channelPlaylists.loading
    );

    const [selectedPlaylists, setSelectedPlaylists] = useState([]);
    const [createPlaylistOpen, setCreatePlaylistOpen] = useState(false);

    const handleCheckboxChange = (playlistId) => {
        setSelectedPlaylists((prev) =>
            prev.includes(playlistId)
                ? prev.filter((id) => id !== playlistId)
                : [...prev, playlistId]
        );
    };

    const openCreatePlaylist = () => {
        setCreatePlaylistOpen(true);
    };

    const closeCreatePlaylist = () => {
        setCreatePlaylistOpen(false);
    };

    return (
        <div>
            <Dialog
                modal
                open={addToPlaylistOpen}
                onOpenChange={closeAddToPlaylist}
            >
                <DialogContent className="fixed w-fit">
                    <DialogHeader>
                        <DialogTitle>Save Video to..</DialogTitle>
                    </DialogHeader>

                    {channelPlaylistsLoading ? (
                        <p>Loading Playlists...</p>
                    ) : (
                        <div className="grid gap-4 mt-4 max-h-60 overflow-y-auto">
                            {/* Example Playlist Items */}
                            {channelPlaylists.map((playlist) => (
                                <div
                                    key={playlist._id}
                                    className="flex items-center  rounded gap-2"
                                >
                                    <label
                                        key={playlist._id}
                                        className=""
                                    ></label>
                                    <input
                                        type="checkbox"
                                        checked={selectedPlaylists.includes(
                                            playlist._id
                                        )}
                                        onChange={() =>
                                            handleCheckboxChange(playlist._id)
                                        }
                                    />
                                    {playlist?.name?.substring(0, 25) + "..."}
                                </div>
                            ))}
                        </div>
                    )}

                    <DialogFooter className="mt-4 flex justify-end gap-2">
                        <div className="flex flex-col gap-2 mr-auto">
                            <Button
                                onClick={openCreatePlaylist}
                                className="w-full"
                                variant={"outline"}
                            >
                                <span>
                                    <Plus />
                                </span>{" "}
                                New Playlist
                            </Button>
                            <Button
                                className="w-full"
                                variant={"default"}
                                onClick={() => {
                                    handleAddVideoToPlaylist(selectedPlaylists);
                                }}
                            >
                                Save Changes
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <CreatePlaylistDialog
                open={createPlaylistOpen}
                onClose={closeCreatePlaylist}
            />

            <div
                className="group mb-4 w-full rounded-lg border p-4 duration-200 hover:bg-white/5 focus:bg-white/5"
                role="button"
                tabIndex="0"
            >
                <div className="flex flex-wrap gap-y-2">
                    <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
                        <h1 className="text-lg font-bold text-white">
                            {video?.title || "Untitled Video"}
                        </h1>
                        <p className="flex text-sm text-gray-200">
                            {formatViews(video?.view || 0)} Views ·{" "}
                            {video?.createdAt
                                ? formatTime(video?.createdAt)
                                : "Unknown date"}
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
                        <div className="flex items-center justify-between gap-x-4 md:justify-end lg:justify-between xl:justify-end">
                            <div className="flex overflow-hidden rounded-lg border">
                                <button
                                    className={`group/like flex items-center gap-x-2 border-r border-gray-700 px-4 py-1.5 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                                        video?.isLiked
                                            ? "bg-[#ae7aff]/20 text-[#ae7aff] shadow-[0px_0px_10px_rgba(174,122,255,0.3)]"
                                            : "hover:bg-white/10 text-gray-300 hover:text-white"
                                    }`}
                                    onClick={handleLike}
                                    disabled={isLiking}
                                    aria-label={
                                        video?.isLiked
                                            ? "Unlike video"
                                            : "Like video"
                                    }
                                >
                                    <span
                                        className={`inline-block w-5 transition-all duration-300 ${
                                            video?.isLiked
                                                ? "text-[#ae7aff] scale-110"
                                                : "group-hover/like:text-[#ae7aff] group-hover/like:scale-105"
                                        }`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill={
                                                video?.isLiked
                                                    ? "currentColor"
                                                    : "none"
                                            }
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                            className="transition-all duration-300"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                                            />
                                        </svg>
                                    </span>
                                    <span
                                        className={`font-medium transition-all duration-300 ${
                                            video?.isLiked
                                                ? "text-[#ae7aff]"
                                                : ""
                                        }`}
                                    >
                                        {video?.likeCount || 0}
                                    </span>
                                </button>
                            </div>
                            <div className="relative block">
                                <button
                                    onClick={() => {
                                        setAddToPlaylistOpen(true);
                                        dispatch(
                                            fetchChannelPlaylists(user._id)
                                        );
                                    }}
                                    className="peer flex items-center gap-x-2 rounded-lg bg-white px-4 py-1.5 text-black hover:bg-gray-100 transition-colors"
                                >
                                    <span className="inline-block w-5">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                                            />
                                        </svg>
                                    </span>
                                    Save
                                </button>
                                {/* <div className="absolute right-0 top-full z-10 hidden w-64 overflow-hidden rounded-lg bg-[#121212] p-4 shadow shadow-slate-50/30 hover:block peer-focus:block border border-gray-700">
                                    <h3 className="mb-4 text-center text-lg font-semibold text-white">
                                        Save to playlist
                                    </h3>
                                    <div className="mb-4 max-h-48 overflow-y-auto">
                                        <ul>
                                            <li className="mb-2 last:mb-0">
                                                <label
                                                    className="group/label inline-flex cursor-pointer items-center gap-x-3"
                                                    htmlFor="Collections-checkbox"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="peer hidden"
                                                        id="Collections-checkbox"
                                                    />
                                                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="3"
                                                            stroke="currentColor"
                                                            aria-hidden="true"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M4.5 12.75l6 6 9-13.5"
                                                            />
                                                        </svg>
                                                    </span>
                                                    Collections
                                                </label>
                                            </li>
                                            <li className="mb-2 last:mb-0">
                                                <label
                                                    className="group/label inline-flex cursor-pointer items-center gap-x-3"
                                                    htmlFor="JavaScript Basics-checkbox"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="peer hidden"
                                                        id="JavaScript Basics-checkbox"
                                                    />
                                                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="3"
                                                            stroke="currentColor"
                                                            aria-hidden="true"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M4.5 12.75l6 6 9-13.5"
                                                            />
                                                        </svg>
                                                    </span>
                                                    JavaScript Basics
                                                </label>
                                            </li>
                                            <li className="mb-2 last:mb-0">
                                                <label
                                                    className="group/label inline-flex cursor-pointer items-center gap-x-3"
                                                    htmlFor="C++ Tuts-checkbox"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="peer hidden"
                                                        id="C++ Tuts-checkbox"
                                                    />
                                                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="3"
                                                            stroke="currentColor"
                                                            aria-hidden="true"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M4.5 12.75l6 6 9-13.5"
                                                            />
                                                        </svg>
                                                    </span>
                                                    C++ Tuts
                                                </label>
                                            </li>
                                            <li className="mb-2 last:mb-0">
                                                <label
                                                    className="group/label inline-flex cursor-pointer items-center gap-x-3"
                                                    htmlFor="Feel Good Music-checkbox"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="peer hidden"
                                                        id="Feel Good Music-checkbox"
                                                    />
                                                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="3"
                                                            stroke="currentColor"
                                                            aria-hidden="true"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M4.5 12.75l6 6 9-13.5"
                                                            />
                                                        </svg>
                                                    </span>
                                                    Feel Good Music
                                                </label>
                                            </li>
                                            <li className="mb-2 last:mb-0">
                                                <label
                                                    className="group/label inline-flex cursor-pointer items-center gap-x-3"
                                                    htmlFor="Ed Sheeran-checkbox"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="peer hidden"
                                                        id="Ed Sheeran-checkbox"
                                                    />
                                                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="3"
                                                            stroke="currentColor"
                                                            aria-hidden="true"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M4.5 12.75l6 6 9-13.5"
                                                            />
                                                        </svg>
                                                    </span>
                                                    Ed Sheeran
                                                </label>
                                            </li>
                                            <li className="mb-2 last:mb-0">
                                                <label
                                                    className="group/label inline-flex cursor-pointer items-center gap-x-3"
                                                    htmlFor="Python-checkbox"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="peer hidden"
                                                        id="Python-checkbox"
                                                    />
                                                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="3"
                                                            stroke="currentColor"
                                                            aria-hidden="true"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M4.5 12.75l6 6 9-13.5"
                                                            />
                                                        </svg>
                                                    </span>
                                                    Python
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="flex flex-col">
                                        <label
                                            htmlFor="playlist-name"
                                            className="mb-1 inline-block cursor-pointer text-white"
                                        >
                                            Name
                                        </label>
                                        <input
                                            className="w-full rounded-lg border border-transparent bg-white px-3 py-2 text-black outline-none focus:border-[#ae7aff]"
                                            id="playlist-name"
                                            placeholder="Enter playlist name"
                                        />
                                        <button className="mx-auto mt-4 rounded-lg bg-[#ae7aff] px-4 py-2 text-black hover:bg-[#9c5de5] transition-colors">
                                            Create new playlist
                                        </button>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <Link
                        to={`/channel/${video?.Owner?.username}/videos`}
                        className="flex items-center gap-x-4 hover:opacity-80 transition-opacity"
                    >
                        <div className="mt-2 h-12 w-12 shrink-0">
                            <img
                                src={video?.Owner?.avatar?.url || "/user.png"}
                                alt={`${video?.Owner?.username}'s avatar`}
                                className="h-full w-full rounded-full object-cover"
                                onError={(e) => (e.target.src = "/user.png")}
                            />
                        </div>
                        <div className="block">
                            <p className="text-gray-200 font-medium">
                                {video?.Owner?.fullName || "Unknown User"}
                            </p>
                            <p className="text-sm text-gray-400">
                                {formatSubscribers(
                                    video?.Owner?.subscriberCount || 0
                                )}{" "}
                                Subscribers
                            </p>
                        </div>
                    </Link>
                    <div className="block">
                        <button
                            className={`group/btn mr-1 flex w-full items-center gap-x-2 px-3 py-2 text-center font-bold shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed ${
                                video?.Owner?._id === user?._id
                                    ? "bg-gray-600 text-white cursor-not-allowed"
                                    : video?.Owner?.isSubscribed
                                    ? "bg-gray-600 text-white hover:bg-gray-500"
                                    : "bg-[#ae7aff] text-black hover:bg-[#9c5de5]"
                            }`}
                            disabled={
                                isSubscribing || video?.Owner?._id === user?._id
                            }
                            onClick={
                                video?.Owner?._id === user?._id
                                    ? undefined
                                    : handleSubscribe
                            }
                        >
                            <span className="inline-block w-5">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                                    />
                                </svg>
                            </span>
                            {video?.Owner?._id === user?._id ? (
                                <Link
                                    to={`/channel/${user?.username}/videos`}
                                    className="text-inherit no-underline"
                                >
                                    View Channel
                                </Link>
                            ) : isSubscribing ? (
                                "Processing..."
                            ) : video?.Owner?.isSubscribed ? (
                                "Unsubscribe"
                            ) : (
                                "Subscribe"
                            )}
                        </button>
                    </div>
                </div>
                <hr className="my-4 border-gray-700" />
                <div
                    className={`overflow-hidden transition-all duration-300 ${
                        isDescriptionExpanded ? "h-auto" : "h-5"
                    }`}
                >
                    <p className="text-sm text-gray-300">
                        {video?.description
                            ? `🚀 ${video.description}`
                            : "No description available."}
                    </p>
                    {video?.description && video.description.length > 100 && (
                        <button
                            onClick={() =>
                                setIsDescriptionExpanded(!isDescriptionExpanded)
                            }
                            className="mt-2 text-[#ae7aff] hover:text-[#9c5de5] transition-colors text-sm font-medium"
                        >
                            {isDescriptionExpanded ? "Show less" : "Show more"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default VideoDetailComp;
