/* eslint-disable no-irregular-whitespace */
import React from "react";
import { useSelector } from "react-redux";
import ChannelEmptySubscribers from "../ChannelEmptySubscribers/ChannelEmptySubscribers";
import { useParams } from "react-router";
import SubscriberCard from "./SubscriberCard";

function ChannelSubscriberPage() {
    const { user, userChannelDetails } = useSelector(
        (state) => state.loginUser.login_user
    );

    const { channelInfo } = useSelector((state) => state.channelInfo);

    const params = useParams();
    const isOwner = user.username == params.username;

    //is the channel is we are viewing is of owner the userChannel state will have a subscribedTo array which will contain the id's of the user/channel the user has subscribedTo -> by map each one we and show their channel SORTED.

    //if the channel is not of the user, the channelInfo state will have info about the channel and same thing can be done in that case.

    let subscribedTo;
    if (isOwner) {
        subscribedTo = userChannelDetails?.subscribedTo;
    } else {
        subscribedTo = channelInfo && channelInfo.subscribedTo;
    }

    return (
        <div>
            {subscribedTo?.length === 0 ? (
                <ChannelEmptySubscribers />
            ) : (
                <div className="h-screen overflow-y-scroll scrollbar-hide bg-[#121212] text-white">
                    <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
                        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
                            <div className="px-4 pb-4">
                                {/* {search bar} */}
                                <div className="relative mb-2 rounded-lg mt-7 bg-white py-2 pl-8 pr-3 text-black">
                                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                            className="h-5 w-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                            ></path>
                                        </svg>
                                    </span>
                                    <input
                                        className="w-full bg-transparent outline-none"
                                        placeholder="Search"
                                    />
                                </div>
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
