import React from "react";
import { ListVideo } from "lucide-react"; // icon library (lucide-react)
import ChannelPlayList from "../ChannelPlayList/ChannelPlayList";

function MyPlaylistPage() {
    // later you can fetch playlists here and pass to ChannelPlayList
    const hasPlaylists = true; // demo state, replace with actual logic

    return (
        <div className="min-h-screen bg-[#121212] text-white">
            <div className="w-full max-w-6xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-red-600 rounded-full shadow-md">
                        <ListVideo size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold">
                            My Playlists
                        </h1>
                        <p className="text-sm text-gray-400">
                            All the playlists you’ve created or saved.
                        </p>
                    </div>
                </div>

                {/* Content */}
                {hasPlaylists ? (
                    <ChannelPlayList />
                ) : (
                    <div className="flex flex-col items-center justify-center py-20">
                        <img
                            src="https://www.gstatic.com/youtube/img/promos/growth/playlist_placeholder_dark.svg"
                            alt="No playlists"
                            className="w-40 mb-6 opacity-80"
                        />
                        <p className="text-lg font-medium mb-2">
                            No playlists yet
                        </p>
                        <p className="text-sm text-gray-400 mb-4">
                            Create your first playlist to organize your videos.
                        </p>
                        <button className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition">
                            Create Playlist
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyPlaylistPage;
