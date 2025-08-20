import React from "react";
import { NavLink, useParams } from "react-router";

function ChannelNavbar() {
    const { user_name } = useParams();

    return (
        <div>
            <ul className=" top-[66px] z-[2] flex flex-row gap-x-2  overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">
                <li className="w-full text-center">
                    <NavLink
                        to={"/channel/videos"}
                        className={({ isActive }) =>
                            `w-full border-b-2 ${
                                isActive
                                    ? "border-[#ae7aff] bg-white block py-1.5 text-[#ae7aff]"
                                    : "border-transparent px-3 py-1.5 block text-gray-400"
                            }`
                        }
                    >
                        Videos
                    </NavLink>
                </li>
                <li className="w-full text-center">
                    <NavLink
                        to={"/channel/playlists"}
                        className={({ isActive }) =>
                            `w-full border-b-2 ${
                                isActive
                                    ? "border-[#ae7aff] bg-white block px-3 py-1.5 text-[#ae7aff]"
                                    : "border-transparent px-3 py-1.5 block text-gray-400"
                            }`
                        }
                    >
                        Playlist
                    </NavLink>
                </li>
                <li className="w-full text-center">
                    <NavLink
                        to={"/channel/tweets"}
                        className={({ isActive }) =>
                            `w-full border-b-2 ${
                                isActive
                                    ? "border-[#ae7aff] block bg-white px-3 py-1.5 text-[#ae7aff]"
                                    : "border-transparent block px-3 py-1.5 text-gray-400"
                            }`
                        }
                    >
                        Tweets
                    </NavLink>
                </li>
                <li className="w-full text-center">
                    <NavLink
                        to={`/channel/${user_name}/subscribed`}
                        className={({ isActive }) =>
                            `w-full border-b-2 ${
                                isActive
                                    ? "border-[#ae7aff] bg-white block px-3 py-1.5 text-[#ae7aff]"
                                    : "border-transparent block px-3 py-1.5 text-gray-400"
                            }`
                        }
                    >
                        Subscribed
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default ChannelNavbar;
