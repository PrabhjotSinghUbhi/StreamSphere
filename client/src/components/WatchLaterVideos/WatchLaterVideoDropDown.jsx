import React from "react";
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
import { clearAVideoFromWatchLater, removeFromWatchLater } from "../../slice/watchLaterSlice";
import { useDispatch } from "react-redux";
import { clearAVideoFromHistory } from "../../slice/watchHistorySlice";
import { MoreVerticalIcon } from "lucide-react";

function WatchLaterVideoDropDown({ videoId }) {
    const dispatch = useDispatch();

    return (
        <div>
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
                                dispatch(clearAVideoFromWatchLater(videoId));
                                dispatch(removeFromWatchLater(videoId));
                            }}
                        >
                            Remove from Watch Later
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default WatchLaterVideoDropDown;
