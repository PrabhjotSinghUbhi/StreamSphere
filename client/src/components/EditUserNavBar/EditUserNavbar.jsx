import React from "react";
import { NavLink } from "react-router";

function EditUserNavbar() {

    return (
        <div>
            <ul className=" top-[66px] z-[2] flex flex-row gap-x-2  overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">
                <li className="w-full text-center">
                    <NavLink
                        to={`change-info`}
                        className={({ isActive }) =>
                            `w-full border-b-2 ${
                                isActive
                                    ? "border-[#ae7aff] bg-white block px-3 py-1.5 text-[#ae7aff]"
                                    : "border-transparent px-3 py-1.5 block text-gray-400"
                        }`
                        }
                    >
                        Personal Information
                    </NavLink>
                </li>
                <li className="w-full text-center">
                    <NavLink
                        to={"/my-channel/edit/channel-info"}
                        className={({ isActive }) =>
                            `w-full border-b-2 ${
                                isActive
                                    ? "border-[#ae7aff] block bg-white px-3 py-1.5 text-[#ae7aff]"
                                    : "border-transparent block px-3 py-1.5 text-gray-400"
                            }`
                        }
                    >
                        Channel Information
                    </NavLink>
                </li>
                <li className="w-full text-center">
                    <NavLink
                        to={`change-password`}
                        className={({ isActive }) =>
                            `w-full border-b-2 ${
                                isActive
                                    ? "border-[#ae7aff] bg-white block px-3 py-1.5 text-[#ae7aff]"
                                    : "border-transparent block px-3 py-1.5 text-gray-400"
                            }`
                        }
                    >
                        Change Password
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default EditUserNavbar;
