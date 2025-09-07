import React from "react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuGroup,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { Settings } from "lucide-react";
import { useDispatch } from "react-redux";
import {
    clearAllWatchHistory,
    clearWatchHistory
} from "../../slice/watchHistorySlice";

function WatchLaterSettingDropDown() {
    const dispatch = useDispatch();

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Settings />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Settings</DropdownMenuLabel>
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            className="cursor-pointer"
                            variant="destructive"
                            onClick={() => {
                                dispatch(clearAllWatchHistory());
                                dispatch(clearWatchHistory());
                            }}
                        >
                            Clear All Watch History.
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default WatchLaterSettingDropDown;
