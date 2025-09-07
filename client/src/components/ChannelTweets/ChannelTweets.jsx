/* eslint-disable no-irregular-whitespace */
import React from "react";
import SingleTweetComponent from "./SingleTweetComponent";
import { useSelector } from "react-redux";

function ChannelTweets() {
    const { channelInfo } = useSelector((state) => state?.channelInfo);

    return (
        <div>
            <div className="h-screen overflow-y-scroll scrollbar-hide bg-[#121212] text-white">
                <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
                    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
                        <div className="px-4 pb-4">
                            <div className="py-4">
                                <SingleTweetComponent
                                    userImage={channelInfo?.avatar?.url}
                                    fullName={channelInfo?.fullName}
                                    userName={channelInfo?.username}
                                    timeAgo="5 hours ago"
                                    tweetContent="Exploring the latest features in JavaScript ES11! The language keeps evolving. 💡 #JavaScript #ES11"
                                    likeCount={425}
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default ChannelTweets;
