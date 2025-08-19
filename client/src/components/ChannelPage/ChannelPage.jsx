/* eslint-disable no-irregular-whitespace */
import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router";
import ChannelNavbar from "../ChannelNavBar/ChannelNavbar";
import CoverImage from "../CoverImage/CoverImage";
import ChannelUserAvatar from "../ChannelUserAvatar/ChannelUserAvatar";
import EditUserNavbar from "../EditUserNavBar/EditUserNavbar";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { api } from "../../api/api";

function ChannelPage() {
    const edit = useSelector((state) => state.edit.edit);
    const [channelInfo, setChannelInfo] = useState({});

    const getChannelInfo = async (username) => {
        let toast_id;
        let time_id;

        try {
            toast_id = toast.loading("Getting Channel Info...");
            time_id = setTimeout(() => {
                toast.dismiss(toast_id);
            }, 8000);
            const resp = await api.get(`users/c/${username}`);
            console.log("Got the Channel Info :: ", resp.data);
            setChannelInfo(resp.data.payload);
            toast.success("Fetched Channel Info.");
        } catch (error) {
            if (error.response) {
                console.error(
                    "Error in Fetching User :: ",
                    error.response.data.message
                );
                toast.error(error.response.data.message || error.message);
            } else if (error.request) {
                console.error("Network Error :: ", error.message);
                toast.error(error.message);
            } else {
                toast.error(error.message);
            }
        } finally {
            toast.dismiss(toast_id);
            clearTimeout(time_id);
        }
    };

    const { user_name } = useParams();

    useEffect(() => {
        getChannelInfo(user_name);
    }, []);

    const {
        username,
        avatar,
        coverImage,
        subscriberCount,
        channelsSubscribedTo,
        fullName
    } = channelInfo;

    console.log(channelInfo);

    return (
        <div>
            <div className="h-screen overflow-y-scroll scrollbar-hide bg-[#121212] text-white">
                <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
                    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
                        <CoverImage src={coverImage?.url} />
                        <div className="px-4 pb-4">
                            <ChannelUserAvatar
                                subscriberCount={subscriberCount}
                                subscribed={channelsSubscribedTo}
                                src={avatar?.url}
                                userName={username}
                                full_name={fullName}
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
