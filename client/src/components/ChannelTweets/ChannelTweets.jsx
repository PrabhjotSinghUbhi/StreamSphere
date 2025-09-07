/* eslint-disable no-irregular-whitespace */
import React from "react";
import SingleTweetComponent from "./SingleTweetComponent";
import { useSelector } from "react-redux";
import { useFormatDuration } from "../../hooks/useFormatDuration.hook";
import EmptyTweetsComp from "./EmptyTweetsComp";
import TweetsLoader from "./TweetsLoader";

function ChannelTweets() {
    const { channelTweets, loading } = useSelector(
        (state) => state?.channelTweets
    );
    const { formatTime } = useFormatDuration();

    if (loading) {
        return <TweetsLoader />;
    }

    let content;
    if (!channelTweets || channelTweets.length === 0) {
        content = <EmptyTweetsComp />;
    } else {
        content = (
            <div className="">
                {channelTweets?.map((tweet) => (
                    <SingleTweetComponent
                        key={tweet._id}
                        fullName={tweet?.channel?.fullName}
                        userName={tweet?.channel?.username}
                        userImage={tweet?.channel?.avatar?.url}
                        timeAgo={formatTime(tweet?.createdAt)}
                        tweetContent={tweet?.content}
                        likeCount={tweet?.likeCount || 295}
                    />
                ))}
            </div>
        );
    }

    return (
        <div>
            <div className="h-screen overflow-y-scroll scrollbar-hide bg-[#121212] text-white">
                <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
                    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
                        <div className="px-4 pb-4">
                            <div className="py-4">{content}</div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default ChannelTweets;
