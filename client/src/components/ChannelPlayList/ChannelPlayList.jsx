/* eslint-disable no-irregular-whitespace */
import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MoreVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannelPlaylists } from "../../slice/channelPlaylistSlice";
import { Dialog } from "@headlessui/react";
import { useFormatDuration } from "../../hooks/useFormatDuration.hook";
import { Link } from "react-router";

function ChannelPlayList() {
    const dispatch = useDispatch();
    const { _id } = useSelector((state) => state.loginUser.login_user.user);

    useEffect(() => {
        if (_id) dispatch(fetchChannelPlaylists(_id));
    }, [dispatch, _id]);

    const { channelPlaylists } = useSelector((state) => state.channelPlaylists);

    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

    const { formatTime } = useFormatDuration();

    return (
        <div className="h-screen overflow-y-auto bg-[#121212] text-white scrollbar-hide">
            <section className="w-full px-4 py-6 sm:ml-[70px] lg:ml-0">
                {/* Grid layout for responsiveness */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {channelPlaylists?.map((playlist) => (
                        <Link
                            to={`/playlist/${playlist?._id}`}
                            key={playlist?._id}
                        >
                            <Card className="bg-neutral-900 border border-neutral-800 overflow-hidden hover:shadow-lg transition">
                                {/* Thumbnail */}
                                <div className="relative aspect-video">
                                    <img
                                        src={
                                            playlist?.videos?.length === 0
                                                ? "/empty-playlist.png"
                                                : playlist?.videos?.[0]
                                                      ?.thumbnail?.url
                                        }
                                        alt={playlist?.name}
                                        className="absolute inset-0 h-full w-full object-cover"
                                    />
                                    <div className="absolute right-2 bottom-2 text-xs bg-black/70 px-2 py-0.5 rounded">
                                        {playlist?.videos?.length || 0} videos
                                    </div>
                                </div>

                                {/* Content */}
                                <CardContent className="p-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h6 className="font-semibold text-sm line-clamp-1">
                                                {playlist?.name}
                                            </h6>
                                            <p className="text-xs text-neutral-400 line-clamp-2 mt-1">
                                                {playlist?.description}
                                            </p>
                                            <p className="text-xs text-neutral-500 mt-2">
                                                {formatTime(
                                                    playlist?.createdAt
                                                )}
                                            </p>
                                        </div>

                                        {/* Dropdown Menu */}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="p-1 rounded-full hover:bg-neutral-800">
                                                    <MoreVertical className="h-4 w-4 text-neutral-400 hover:text-neutral-200" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                align="end"
                                                className="w-40"
                                            >
                                                <DropdownMenuItem>
                                                    Play all
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    Add to Watch Later
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    Share
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <button
                                                        onClick={() =>
                                                            setIsDialogOpen(
                                                                true
                                                            )
                                                        }
                                                        className="w-full text-left"
                                                    >
                                                        Add to Playlist
                                                    </button>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        {/* Dialog for Add to Playlist */}
                                        <Dialog
                                            open={isDialogOpen}
                                            onClose={() =>
                                                setIsDialogOpen(false)
                                            }
                                        >
                                            <form>
                                                <div className="sm:max-w-[425px] p-6 bg-neutral-900 rounded-lg shadow-lg">
                                                    <div className="flex flex-col gap-2 text-center sm:text-left mb-4">
                                                        <h2 className="text-lg leading-none font-semibold">
                                                            Edit profile
                                                        </h2>
                                                        <p className="text-muted-foreground text-sm">
                                                            Make changes to your
                                                            profile here. Click
                                                            save when
                                                            you&apos;re done.
                                                        </p>
                                                    </div>
                                                    <div className="grid gap-4">
                                                        <div className="grid gap-3">
                                                            <label
                                                                htmlFor="name-1"
                                                                className="text-sm font-medium"
                                                            >
                                                                Name
                                                            </label>
                                                            <input
                                                                id="name-1"
                                                                name="name"
                                                                defaultValue="Pedro Duarte"
                                                                className="w-full border rounded p-2 bg-neutral-800 text-white"
                                                            />
                                                        </div>
                                                        <div className="grid gap-3">
                                                            <label
                                                                htmlFor="username-1"
                                                                className="text-sm font-medium"
                                                            >
                                                                Username
                                                            </label>
                                                            <input
                                                                id="username-1"
                                                                name="username"
                                                                defaultValue="@peduarte"
                                                                className="w-full border rounded p-2 bg-neutral-800 text-white"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-end gap-2 mt-6">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setIsDialogOpen(
                                                                    false
                                                                )
                                                            }
                                                            className="px-4 py-2 rounded border"
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            className="px-4 py-2 rounded bg-neutral-800 text-white"
                                                        >
                                                            Save changes
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </Dialog>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Empty state */}
                {channelPlaylists?.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-64 text-neutral-400">
                        <img
                            src="/empty-playlist.png"
                            alt="No playlists"
                            className="w-32 mb-4 opacity-70"
                        />
                        <p>No playlists found</p>
                    </div>
                )}
            </section>
        </div>
    );
}

export default ChannelPlayList;
