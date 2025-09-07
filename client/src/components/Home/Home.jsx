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

function Home() {
    const { formatDuration, formatTime } = useFormatDuration();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const { _id } = useSelector((state) => state.loginUser.login_user.user);

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
                                      <div key={video?._id} className="w-full">
                                          <Link
                                              to={`/video/${video?._id}`}
                                              className="block"
                                          >
                                              <div className="relative mb-2 w-full pt-[56%]">
                                                  <img
                                                      src={
                                                          video?.thumbnail?.url
                                                      }
                                                      alt={video?.title}
                                                      className="absolute inset-0 h-full w-full object-cover"
                                                  />
                                                  <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                                                      {formatDuration(
                                                          video?.duration
                                                      )}
                                                  </span>
                                              </div>
                                          </Link>

                                          <div className="flex gap-x-2">
                                              {/* Avatar */}
                                              <div className="h-10 w-10 shrink-0">
                                                  <img
                                                      src={
                                                          video?.Owner?.avatar
                                                              ?.url ||
                                                          "/user.png"
                                                      }
                                                      alt={
                                                          video?.Owner?.fullName
                                                      }
                                                      className="h-full w-full rounded-full"
                                                  />
                                              </div>

                                              {/* Title + Channel + Stats + Dropdown */}
                                              <div className="flex w-full flex-col">
                                                  <div className="flex items-start justify-between gap-2">
                                                      <h6 className="mb-1 font-semibold">
                                                          {video?.title
                                                              ?.length > 40
                                                              ? video?.title.substring(
                                                                    0,
                                                                    40
                                                                ) + "..."
                                                              : video?.title}
                                                      </h6>

                                                      {/* Dropdown menu next to title */}
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
                                                          <DropdownMenuTrigger className="p-1">
                                                              <MoreVertical className="h-5 w-5 text-neutral-400 hover:text-neutral-200" />
                                                          </DropdownMenuTrigger>
                                                          <DropdownMenuContent align="end">
                                                              <DropdownMenuItem
                                                                  onClick={() => {
                                                                      dispatch(
                                                                          addVideoToWatchLater(
                                                                              video?._id
                                                                          )
                                                                      );
                                                                  }}
                                                              >
                                                                  Save to Watch
                                                                  Later
                                                              </DropdownMenuItem>
                                                              <DropdownMenuItem
                                                                  onClick={() => {
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
                                                                  Add to
                                                                  Playlist
                                                              </DropdownMenuItem>
                                                          </DropdownMenuContent>
                                                      </DropdownMenu>
                                                  </div>

                                                  <p className="flex text-sm text-gray-200">
                                                      {formatViews(video?.view)}{" "}
                                                      Views ·{" "}
                                                      {formatTime(
                                                          video?.createdAt
                                                      )}
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
