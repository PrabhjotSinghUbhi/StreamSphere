import React from "react";
import SingleTweetComponent from "../ChannelTweets/SingleTweetComponent";
import { useDispatch, useSelector } from "react-redux";
import { useFormatDuration } from "../../hooks/useFormatDuration.hook";
import TweetsLoader from "../ChannelTweets/TweetsLoader";
import { apiDeleteTweet, apiPostTweet } from "../../slice/channelTweets";

function MyChannelTweets() {
    const { channelTweets, loading } = useSelector(
        (state) => state?.channelTweets
    );
    const { user } = useSelector((state) => state?.loginUser?.login_user);
    const { formatTime } = useFormatDuration();
    const dispatch = useDispatch();

    if (loading) {
        return <TweetsLoader />;
    }

    let content;
    if (!channelTweets || channelTweets.length === 0) {
        content = (
            <div className="flex flex-col items-center justify-center py-20">
                No tweets available
            </div>
        );
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
                        isMyChannel={true}
                        OnDeleteClick={() => {
                            dispatch(apiDeleteTweet(tweet?._id));
                        }}
                    />
                ))}
            </div>
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const tweetData = new FormData(e.target);
        const content = tweetData.get("content");
        console.log("Tweet content:", content);

        dispatch(apiPostTweet(tweetData));
    };

    return (
        <div>
            <div className="h-screen overflow-y-auto bg-[#121212] text-white">
                <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
                    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
                        <div className="px-4 pb-4">
                            <form
                                onSubmit={handleSubmit}
                                className="mt-4 border rounded-lg bg-[#1e1e1e] p-4"
                            >
                                <textarea
                                    className="w-full resize-none border-none bg-transparent px-3 py-2 text-white placeholder-gray-400 outline-none rounded-md focus:ring-2 focus:ring-[#ae7aff] focus:ring-opacity-50"
                                    placeholder="What's happening?"
                                    name="content"
                                    rows={3}
                                ></textarea>

                                <div className="mt-3 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {/* Emoji Button */}
                                        <button
                                            type="button"
                                            className="p-2 rounded-full hover:bg-gray-700 transition"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                className="h-5 w-5 text-gray-400 hover:text-[#ae7aff]"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                                                />
                                            </svg>
                                        </button>

                                        {/* More Options Button */}
                                        <button
                                            type="button"
                                            className="p-2 rounded-full hover:bg-gray-700 transition"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                className="h-5 w-5 text-gray-400 hover:text-[#ae7aff]"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                                />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="bg-[#ae7aff] px-4 py-2 rounded-full font-semibold text-black hover:bg-[#b882ff] transition"
                                    >
                                        Tweet
                                    </button>
                                </div>
                            </form>

                            <div className="py-4">{content}</div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default MyChannelTweets;
