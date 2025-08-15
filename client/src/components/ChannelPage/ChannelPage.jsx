/* eslint-disable no-irregular-whitespace */
import React from "react";
import { Outlet } from "react-router";
import ChannelNavbar from "../ChannelNavBar/ChannelNavbar";
import CoverImage from "../CoverImage/CoverImage";
import ChannelUserAvatar from "../ChannelUserAvatar/ChannelUserAvatar";
import EditInfoPage from "../EditInfoPage/EditInfoPage";
import EditUserNavbar from "../EditUserNavBar/EditUserNavbar";
import { useSelector } from "react-redux";

function ChannelPage() {
    const edit = useSelector((state) => state.edit.edit);

    return (
        <div>
            <div className="h-screen overflow-y-scroll scrollbar-hide bg-[#121212] text-white">
                <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
                    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
                        <CoverImage
                            src={
                                "https://images.pexels.com/photos/1092424/pexels-photo-1092424.jpeg?auto=compress"
                            }
                        />
                        <div className="px-4 pb-4">
                            <ChannelUserAvatar
                                avatar={
                                    "https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                }
                                channelName={"React Patterns"}
                                subscribers={1000}
                                subscribed={200}
                            />
                            {/* <ChannelNavbar /> */}
                            {edit ? <EditUserNavbar /> : <ChannelNavbar />}
                            <Outlet />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default ChannelPage;
