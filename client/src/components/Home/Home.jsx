import React, { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { Link } from "react-router";
import { useFormatDuration } from "../../hooks/useFormatDuration.hook";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeVideos } from "../../slice/homeVideosSlice";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Plus, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { DialogFooter, DialogHeader } from "../ui/dialog";
import CreatePlaylistDialog from "../Dialogs/CreatePlaylistDialog/CreatePlaylist";
import {
    addVideoToPlaylist,
    fetchChannelPlaylists
} from "../../slice/channelPlaylistSlice";
import { addVideoToWatchLater } from "../../slice/watchLaterSlice";
import { LoginDialog } from "../Dialogs/LoginAlertDialog/LoginAlertDialog";

function Home() {
    const { formatDuration, formatTime } = useFormatDuration();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const _id = useSelector(
        (state) => state.loginUser?.login_user?.user?._id || null
    );

    useEffect(() => {
        (async () => {
            try {
                dispatch(fetchHomeVideos());
                setTimeout(() => setLoading(false), 1500); // Simulate loading
            } catch (error) {
                console.error(
                    "Error Occurred in Fetching the home videos :: ",
                    error
                );
            }
        })();
    }, []);

    const { homeVideos } = useSelector((state) => state.homeVideos);
    const [addToPlaylistOpen, setAddToPlaylistOpen] = useState(false);
    const [loginDialogOpen, setLoginDialogOpen] = useState(false);

    const openAddToPlayList = () => {
        setAddToPlaylistOpen(true);
    };
    const closeAddToPlaylist = () => {
        setAddToPlaylistOpen(false);
    };

    const [createPlaylistOpen, setCreatePlaylistOpen] = useState(false);

    const openCreatePlaylist = () => {
        setCreatePlaylistOpen(true);
    };
    const closeCreatePlaylist = () => {
        setCreatePlaylistOpen(false);
    };

    const { channelPlaylists } = useSelector((state) => state.channelPlaylists);
    const channelPlaylistsLoading = useSelector(
        (state) => state.channelPlaylists.channelPlaylists.loading
    );

    const [selectedPlaylists, setSelectedPlaylists] = useState([]);

    const handleCheckboxChange = (playlistId) => {
        setSelectedPlaylists((prev) =>
            prev.includes(playlistId)
                ? prev.filter((id) => id !== playlistId)
                : [...prev, playlistId]
        );
    };

    const [selectedVideoId, setSelectedVideoId] = useState(null);

    const handleAddVideoToPlaylist = (playlistIds) => {
        if (!selectedVideoId) return;
        playlistIds.forEach((playlistId) => {
            dispatch(
                addVideoToPlaylist({ playlistId, videoId: selectedVideoId })
            );
        });
    };

    const { formatViews } = useFormatDuration();

    return (
        <div className="">
            <LoginDialog
                open={loginDialogOpen}
                onClose={() => setLoginDialogOpen(false)}
            />

            <Dialog
                modal
                open={addToPlaylistOpen}
                onOpenChange={closeAddToPlaylist}
            >
                <DialogContent className="fixed top-1/2 left-1/2 z-50 p-6 bg-[#121212] text-white rounded-lg border border-neutral-800 transform -translate-x-1/2 -translate-y-1/2">
                    <DialogHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <DialogTitle>Save Video to..</DialogTitle>
                            </div>
                            <div>
                                <Button
                                    onClick={closeAddToPlaylist}
                                    variant={"outline"}
                                >
                                    <X />
                                </Button>
                            </div>
                        </div>
                    </DialogHeader>

                    {channelPlaylistsLoading ? (
                        <p>Loading Playlists...</p>
                    ) : (
                        <div className="flex flex-col justify-start items-start gap-4 mt-4 max-h-60 overflow-y-auto">
                            {/* Example Playlist Items */}
                            {channelPlaylists.map((playlist) => (
                                <div
                                    key={playlist._id}
                                    className="flex items-center justify-between rounded gap-2"
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
                                      <div
                                          key={video?._id}
                                          className="group w-full"
                                      >
                                          <Link
                                              to={`/video/${video?._id}`}
                                              className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-neutral-900 rounded-lg transition-all duration-200"
                                              aria-label={`Watch ${video?.title}`}
                                          >
                                              {/* Thumbnail Container */}
                                              <div className="relative mb-3 w-full pt-[56%] overflow-hidden rounded-lg bg-neutral-800">
                                                  <img
                                                      src={
                                                          video?.thumbnail?.url
                                                      }
                                                      alt={video?.title}
                                                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                      loading="lazy"
                                                  />

                                                  {/* Duration Badge */}
                                                  <span className="absolute bottom-2 right-2 inline-flex items-center justify-center rounded-md bg-black/80 backdrop-blur-sm px-2 py-1 text-xs sm:text-sm font-medium text-white">
                                                      {formatDuration(
                                                          video?.duration
                                                      )}
                                                  </span>

                                                  {/* Hover Play Overlay */}
                                                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                                                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 sm:p-4 transform scale-90 group-hover:scale-100 transition-transform duration-200">
                                                          <svg
                                                              className="w-5 h-5 sm:w-6 sm:h-6 text-black ml-0.5"
                                                              fill="currentColor"
                                                              viewBox="0 0 24 24"
                                                          >
                                                              <path d="M8 5v14l11-7z" />
                                                          </svg>
                                                      </div>
                                                  </div>
                                              </div>
                                          </Link>

                                          {/* Video Info Section */}
                                          <div className="flex gap-3">
                                              {/* Avatar */}
                                              <Link
                                                  to={`/channel/${video?.Owner?._id}`}
                                                  className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-neutral-900 rounded-full"
                                                  aria-label={`Go to ${video?.Owner?.fullName}'s channel`}
                                              >
                                                  <div className="h-9 w-9 sm:h-10 sm:w-10 overflow-hidden rounded-full bg-neutral-700 transition-transform duration-200 hover:scale-105">
                                                      <img
                                                          src={
                                                              video?.Owner
                                                                  ?.avatar
                                                                  ?.url ||
                                                              "/user.png"
                                                          }
                                                          alt={
                                                              video?.Owner
                                                                  ?.fullName
                                                          }
                                                          className="h-full w-full object-cover"
                                                          loading="lazy"
                                                      />
                                                  </div>
                                              </Link>

                                              {/* Content Area */}
                                              <div className="flex-1 min-w-0">
                                                  <div className="flex items-start justify-between gap-2">
                                                      {/* Title */}
                                                      <div className="flex-1 min-w-0">
                                                          <Link
                                                              to={`/video/${video?._id}`}
                                                              className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-neutral-900 rounded"
                                                          >
                                                              <h3 className="text-sm sm:text-base font-semibold text-white line-clamp-2 leading-tight hover:text-neutral-200 transition-colors duration-200">
                                                                  {video?.title}
                                                              </h3>
                                                          </Link>

                                                          {/* Channel Name - Mobile */}
                                                          <Link
                                                              to={`/channel/${video?.Owner?._id}`}
                                                              className="block sm:hidden mt-1 text-xs text-neutral-400 hover:text-neutral-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-neutral-900 rounded"
                                                          >
                                                              {
                                                                  video?.Owner
                                                                      ?.fullName
                                                              }
                                                          </Link>
                                                      </div>

                                                      {/* Dropdown Menu */}
                                                      <DropdownMenu
                                                          onOpenChange={(
                                                              open
                                                          ) => {
                                                              if (open) {
                                                                  setSelectedVideoId(
                                                                      video?._id
                                                                  );
                                                              }
                                                          }}
                                                      >
                                                          <DropdownMenuTrigger
                                                              className="flex-shrink-0 p-1.5 rounded-full hover:bg-neutral-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
                                                              aria-label="Video options"
                                                          >
                                                              <MoreVertical className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-400 hover:text-neutral-200 transition-colors duration-200" />
                                                          </DropdownMenuTrigger>

                                                          <DropdownMenuContent
                                                              align="end"
                                                              className="w-48 sm:w-52 bg-neutral-800 border-neutral-700"
                                                          >
                                                              <DropdownMenuItem
                                                                  className="cursor-pointer text-sm py-2.5 px-3 hover:bg-neutral-700 focus:bg-neutral-700 text-white"
                                                                  onClick={() => {
                                                                      if (
                                                                          _id ===
                                                                              null ||
                                                                          _id ===
                                                                              undefined
                                                                      ) {
                                                                          setLoginDialogOpen(
                                                                              true
                                                                          );
                                                                          return;
                                                                      }
                                                                      dispatch(
                                                                          addVideoToWatchLater(
                                                                              video?._id
                                                                          )
                                                                      );
                                                                  }}
                                                              >
                                                                  <svg
                                                                      className="w-4 h-4 mr-3"
                                                                      fill="none"
                                                                      stroke="currentColor"
                                                                      viewBox="0 0 24 24"
                                                                  >
                                                                      <path
                                                                          strokeLinecap="round"
                                                                          strokeLinejoin="round"
                                                                          strokeWidth={
                                                                              2
                                                                          }
                                                                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                      />
                                                                  </svg>
                                                                  Save to Watch
                                                                  Later
                                                              </DropdownMenuItem>

                                                              <DropdownMenuItem
                                                                  className="cursor-pointer text-sm py-2.5 px-3 hover:bg-neutral-700 focus:bg-neutral-700 text-white"
                                                                  onClick={() => {
                                                                      if (
                                                                          !_id
                                                                      ) {
                                                                          setLoginDialogOpen(
                                                                              true
                                                                          );
                                                                          return;
                                                                      }
                                                                      openAddToPlayList();
                                                                      if (
                                                                          channelPlaylists.length ===
                                                                          0
                                                                      ) {
                                                                          dispatch(
                                                                              fetchChannelPlaylists(
                                                                                  _id
                                                                              )
                                                                          );
                                                                      }
                                                                  }}
                                                              >
                                                                  <svg
                                                                      className="w-4 h-4 mr-3"
                                                                      fill="none"
                                                                      stroke="currentColor"
                                                                      viewBox="0 0 24 24"
                                                                  >
                                                                      <path
                                                                          strokeLinecap="round"
                                                                          strokeLinejoin="round"
                                                                          strokeWidth={
                                                                              2
                                                                          }
                                                                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                                                      />
                                                                  </svg>
                                                                  Add to
                                                                  Playlist
                                                              </DropdownMenuItem>

                                                              <DropdownMenuItem
                                                                  className="cursor-pointer text-sm py-2.5 px-3 hover:bg-neutral-700 focus:bg-neutral-700 text-white"
                                                                  onClick={() => {
                                                                      navigator.clipboard.writeText(
                                                                          `${window.location.origin}/video/${video?._id}`
                                                                      );
                                                                      // You could add a toast notification here
                                                                  }}
                                                              >
                                                                  <svg
                                                                      className="w-4 h-4 mr-3"
                                                                      fill="none"
                                                                      stroke="currentColor"
                                                                      viewBox="0 0 24 24"
                                                                  >
                                                                      <path
                                                                          strokeLinecap="round"
                                                                          strokeLinejoin="round"
                                                                          strokeWidth={
                                                                              2
                                                                          }
                                                                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                                                                      />
                                                                  </svg>
                                                                  Share Video
                                                              </DropdownMenuItem>
                                                          </DropdownMenuContent>
                                                      </DropdownMenu>
                                                  </div>

                                                  {/* Channel Name - Desktop */}
                                                  <Link
                                                      to={`/channel/${video?.Owner?._id}`}
                                                      className="hidden sm:block mt-1 text-sm text-neutral-400 hover:text-neutral-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 focus:ring-offset-neutral-900 rounded truncate"
                                                  >
                                                      {video?.Owner?.fullName}
                                                  </Link>

                                                  {/* Video Stats */}
                                                  <div className="mt-1 flex items-center text-xs sm:text-sm text-neutral-400 space-x-1 overflow-hidden">
                                                      <span className="truncate">
                                                          {formatViews(
                                                              video?.view
                                                          )}{" "}
                                                          views
                                                      </span>
                                                      <span className="flex-shrink-0">
                                                          •
                                                      </span>
                                                      <time
                                                          dateTime={
                                                              video?.createdAt
                                                          }
                                                          className="hover:text-neutral-300 transition-colors duration-200 truncate"
                                                      >
                                                          {formatTime(
                                                              video?.createdAt
                                                          )}
                                                      </time>
                                                  </div>

                                                  {/* Progress Bar (if video has been watched) */}
                                                  {video?.watchProgress && (
                                                      <div className="mt-2 w-full bg-neutral-700 rounded-full h-1">
                                                          <div
                                                              className="bg-primary h-1 rounded-full transition-all duration-300"
                                                              style={{
                                                                  width: `${Math.min(
                                                                      video.watchProgress,
                                                                      100
                                                                  )}%`
                                                              }}
                                                          />
                                                      </div>
                                                  )}
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
