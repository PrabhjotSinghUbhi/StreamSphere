import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { createPlaylist } from "../../../slice/channelPlaylistSlice";

export default function CreatePlaylistDialog({ open, onClose }) {
    const [playlistName, setPlaylistName] = useState("");
    const [description, setDescription] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!playlistName.trim()) return;
        // Call your API or state function
        const playlistData = new FormData(e.target);
        dispatch(createPlaylist(playlistData));

        setPlaylistName("");
        setDescription("");
        onClose();
    };

    return (
        <Dialog modal open={open} onOpenChange={onClose} className="z-50">
            <DialogContent className="fixed top-1/2 left-1/2 z-50 p-6 bg-[#121212] text-white rounded-lg border border-neutral-800 transform -translate-x-1/2 -translate-y-1/2 w-[400px] max-w-full">
                <DialogHeader>
                    <DialogTitle>Create Playlist</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-4 mt-4">
                    {/* Playlist Name */}
                    <div className="grid gap-1">
                        <label htmlFor="playlist-name" className="text-sm">
                            Playlist name
                        </label>
                        <input
                            id="playlist-name"
                            placeholder="Enter playlist name"
                            value={playlistName}
                            onChange={(e) => setPlaylistName(e.target.value)}
                            name="name"
                            required
                        />
                    </div>
                    {/* Playlist Description */}
                    <div className="grid gap-1">
                        <label
                            htmlFor="playlist-description"
                            className="text-sm"
                        >
                            Description
                        </label>
                        <textarea
                            id="playlist-description"
                            placeholder="Enter playlist description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={
                                "w-full h-24 p-2 rounded bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                            }
                            name="description"
                        />
                    </div>
                    {/* Footer Buttons */}
                    <DialogFooter className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">Create</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
