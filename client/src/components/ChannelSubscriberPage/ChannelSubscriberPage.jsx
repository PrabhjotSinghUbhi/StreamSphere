/* eslint-disable no-irregular-whitespace */
import React from "react";
import { useSelector } from "react-redux";
import ChannelEmptySubscribers from "../ChannelEmptySubscribers/ChannelEmptySubscribers";
import { useParams } from "react-router";
import SubscriberCard from "./SubscriberCard";

function ChannelSubscriberPage() {
    const { user_name } = useParams();
    const user = useSelector((state) => state.loginUser.login_user.user);
    const isOwner = user_name == user.username;
    const { channel } = useSelector((state) => state.channelInfo);

    let subscribedTo;

    if (isOwner) {
        subscribedTo = user.subscribedTo || [];
    } else {
        subscribedTo = channel.subscribedTo;
    }

    return (
        <div>
            {subscribedTo.length === 0 ? (
                <ChannelEmptySubscribers />
            ) : (
                <div className="h-screen overflow-y-scroll scrollbar-hide bg-[#121212] text-white">
                    <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
                        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
                            <div className="px-4 pb-4">
                                {subscribedTo.map((subscription) => (
                                    <SubscriberCard
                                        _id={subscription?.channel}
                                        key={subscription?._id}
                                    />
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChannelSubscriberPage;
