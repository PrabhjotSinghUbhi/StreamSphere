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
import { MoreVerticalIcon } from "lucide-react";

function TweetChannelDropDown({ OnDeleteClick }) {
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
                            onClick={OnDeleteClick}
                        >
                            delete tweet
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default TweetChannelDropDown;
