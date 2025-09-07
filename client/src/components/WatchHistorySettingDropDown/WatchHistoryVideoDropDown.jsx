import React from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon } from "lucide-react";
import {
    clearAVideoFromHistory,
    removeVideoFromHistory
} from "../../slice/watchHistorySlice.js";
import { useDispatch } from "react-redux";

function WatchLaterVideoDropDown({ videoId }) {
    const dispatch = useDispatch();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <MoreVerticalIcon className="cursor-pointer text-neutral-300" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        variant="destructive"
                        onClick={() => {
                            // Dispatch the action to remove the video from watch history
                            dispatch(clearAVideoFromHistory(videoId));
                            dispatch(removeVideoFromHistory(videoId));
                        }}
                    >
                        Remove from Watch History
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default WatchLaterVideoDropDown;
