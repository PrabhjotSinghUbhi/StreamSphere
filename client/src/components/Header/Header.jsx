import React from "react";
import { Link, useNavigate } from "react-router";
import SearchIcon from "../SearchIcon";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { useState } from "react";
import { LoginDialog } from "../Dialogs/LoginAlertDialog/LoginAlertDialog";
import SidebarMobile from "../SideBarMobile/SidebarMobile";
import {
    Clock,
    FolderOpen,
    HelpCircle,
    History,
    Home,
    Settings,
    ThumbsUp,
    Users,
    Menu
} from "lucide-react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetDescription
} from "@/components/ui/sheet";

const navigationItems = [
    {
        id: "home",
        label: "Home",
        icon: Home,
        route: "/",
        requiresAuth: false,
        showOnMobile: true
    },
    {
        id: "liked",
        label: "Liked Videos",
        icon: ThumbsUp,
        route: "/liked-videos",
        requiresAuth: true,
        showOnMobile: false
    },
    {
        id: "history",
        label: "History",
        icon: History,
        route: "/watch-history",
        requiresAuth: true,
        showOnMobile: true
    },
    {
        id: "watchLater",
        label: "Watch Later",
        icon: Clock,
        route: "/watch-later",
        requiresAuth: true,
        showOnMobile: false
    },
    {
        id: "playlists",
        label: "My Playlists",
        icon: FolderOpen,
        route: "/my-playlists",
        requiresAuth: true,
        showOnMobile: true
    },
    {
        id: "subscribers",
        label: "Subscribers",
        icon: Users,
        route: "/subscribers",
        requiresAuth: true,
        showOnMobile: true
    }
];

const bottomNavigationItems = [
    {
        id: "support",
        label: "Support",
        icon: HelpCircle,
        route: "/support",
        requiresAuth: false
    },
    {
        id: "settings",
        label: "Settings",
        icon: Settings,
        route: "/settings",
        requiresAuth: false
    }
];

function Header() {
    const isLoggedIn = useSelector((state) => state.loginUser.login_user.user);
    // const logout = useLogout();
    const [loginDialogOpen, setLoginDialogOpen] = useState(false);
    const navigate = useNavigate();
    const [sheetOpen, setSheetOpen] = useState(false);

    const handleNavigation = (item) => {
        if (!isLoggedIn) {
            setLoginDialogOpen(true);
            setSheetOpen(false);
            return;
        }
        navigate(item.route);
        setSheetOpen(false);
    };

    const NavItem = ({ item, isMobile = false }) => {
        const IconComponent = item.icon;

        return (
            <button
                onClick={() => handleNavigation(item)}
                className={`
                        flex items-center w-full px-4 py-3 text-left transition-all duration-200
                        ${
                            isMobile
                                ? "hover:bg-neutral-800 rounded-lg text-white hover:text-primary"
                                : "flex-col sm:flex-row sm:px-3 sm:py-2 border border-transparent hover:bg-primary hover:text-black focus:bg-primary focus:text-black rounded-lg"
                        }
                    `}
                aria-label={item.label}
            >
                <IconComponent
                    className={`
                            w-5 h-5 flex-shrink-0
                            ${isMobile ? "mr-3" : "sm:mr-3 lg:mr-3"}
                        `}
                />
                <span
                    className={`
                        text-sm font-medium
                        ${isMobile ? "block" : "hidden sm:block"}
                    `}
                >
                    {item.label}
                </span>
            </button>
        );
    };

    return (
        <header className="sticky inset-x-0 top-0 z-50 w-full border-b border-white bg-[#121212] px-4">
            <LoginDialog
                open={loginDialogOpen}
                onClose={() => setLoginDialogOpen(false)}
            />
            <nav className="mx-auto flex max-w-7xl items-center py-2">
                <div className=" w-12 shrink-0 sm:w-16">
                    <img
                        src="https://res.cloudinary.com/prabhjotsingh/image/upload/v1757313106/logo_anhmgo.png"
                        alt="logo"
                        className="scale-250"
                    />
                </div>
                <div className="relative mx-auto hidden w-full max-w-md overflow-hidden sm:block">
                    <input
                        className="w-full border border-white bg-transparent text-white py-1 pl-8 pr-3 placeholder-white outline-none sm:py-2"
                        placeholder="Search"
                    />
                    <span className="absolute left-2.5 top-1/2 inline-block -translate-y-1/2">
                        <SearchIcon />
                    </span>
                </div>
                <button className="ml-auto sm:hidden">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className=" h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        ></path>
                    </svg>
                </button>
                <button className="group peer ml-4 flex w-6 shrink-0 flex-wrap gap-y-1.5 sm:hidden">
                    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                        <SheetTrigger
                            className="scale-135 mt-1.5 mr-1.5 "
                            asChild
                        >
                            <button className="flex flex-col items-center justify-center p-2 text-white hover:text-white transition-colors duration-200">
                                <Menu className="w-5 h-5 mb-1" />
                            </button>
                        </SheetTrigger>

                        <SheetContent
                            side="right"
                            className="w-80 bg-[#121212] border-l border-neutral-800 p-0"
                        >
                            <SheetHeader className="px-6 py-4 border-b border-neutral-800">
                                <div className="flex items-center justify-between">
                                    <SheetTitle className="text-white text-lg font-semibold">
                                        Menu
                                    </SheetTitle>
                                </div>
                                <SheetDescription className="text-neutral-400 text-sm">
                                    Access all your favorite features
                                </SheetDescription>
                            </SheetHeader>

                            <div className="flex flex-col h-full">
                                {/* User Section */}
                                {isLoggedIn && (
                                    <div className="px-6 py-4 border-b border-neutral-800">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                                                <span className="text-black font-semibold text-sm">
                                                    {isLoggedIn?.fullName?.charAt(
                                                        0
                                                    ) || "U"}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">
                                                    {isLoggedIn?.fullName ||
                                                        "User"}
                                                </p>
                                                <p className="text-neutral-400 text-sm">
                                                    {isLoggedIn?.email ||
                                                        "user@example.com"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Main Navigation */}
                                <nav className="flex-1 px-2 py-4 space-y-1">
                                    <div className="px-4 py-2">
                                        <h3 className="text-neutral-400 text-xs font-semibold uppercase tracking-wide">
                                            Library
                                        </h3>
                                    </div>
                                    {navigationItems.map((item) => (
                                        <NavItem
                                            key={item.id}
                                            item={item}
                                            isMobile={true}
                                        />
                                    ))}
                                </nav>

                                {/* Bottom Section */}
                                <div className="px-2 py-4 border-t border-neutral-800 space-y-1">
                                    <div className="px-4 py-2">
                                        <h3 className="text-neutral-400 text-xs font-semibold uppercase tracking-wide">
                                            More
                                        </h3>
                                    </div>
                                    {bottomNavigationItems.map((item) => (
                                        <NavItem
                                            key={item.id}
                                            item={item}
                                            isMobile={true}
                                        />
                                    ))}

                                    {/* Sign Out Button */}
                                    {isLoggedIn && (
                                        <button
                                            onClick={() => {
                                                // Add your sign out logic here
                                                setSheetOpen(false);
                                            }}
                                            className="flex items-center w-full px-4 py-3 text-left text-red-400 hover:bg-red-500/10 rounded-lg transition-colors duration-200"
                                        >
                                            <svg
                                                className="w-5 h-5 mr-3"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                />
                                            </svg>
                                            <span className="text-sm font-medium">
                                                Sign Out
                                            </span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </button>
            </nav>
        </header>
    );
}

export default Header;
