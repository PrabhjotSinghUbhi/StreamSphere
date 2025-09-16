import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import React from "react";
import { DialogFooter, DialogHeader } from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";

function SelectPlaylistDialog({ addToPlaylistOpen, closeAddToPlaylist }) {
    return (
        <div>
            <Dialog modal open={addToPlaylistOpen}> 
                <DialogContent className="fixed top-1/2 left-1/2 z-50 p-6 bg-[#121212] text-white rounded-lg border border-neutral-800 transform -translate-x-1/2 -translate-y-1/2">
                    <DialogHeader>
                        <DialogTitle>Save Video to..</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4 mt-4 max-h-60 overflow-y-auto">
                        {/* Example Playlist Items */}
                        {["Favorites", "Watch Later", "React Tutorials"].map(
                            (playlist) => (
                                <div
                                    key={playlist}
                                    className="flex items-center justify-between rounded "
                                >
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <Input
                                            type="checkbox"
                                            className="h-4 w-4 accent-purple-500"
                                        />
                                        <span>{playlist}</span>
                                    </label>
                                </div>
                            )
                        )}
                    </div>

                    <DialogFooter className="mt-4 flex justify-end gap-2">
                        <div className="flex flex-col gap-2 mr-auto">
                            <Button className="w-full" variant={"outline"} >
                                <span>
                                    <Plus />
                                </span>{" "}
                                New Playlist    
                            </Button>
                            <Button
                                onClick={closeAddToPlaylist}
                                className="w-full"
                                variant={"default"}
                            >
                                Cancel
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default SelectPlaylistDialog;
