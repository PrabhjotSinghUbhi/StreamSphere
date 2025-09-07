import React from "react";
import SingleTweetComponent from "../ChannelTweets/SingleTweetComponent";
import { useSelector } from "react-redux";

function MyChannelTweets() {
    const { user } = useSelector((state) => state?.loginUser?.login_user);

    return (
        <div>
            <link
                rel="preload"
                as="image"
                href="https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            <link
                rel="preload"
                as="image"
                href="https://images.pexels.com/photos/1092424/pexels-photo-1092424.jpeg?auto=compress"
            />
            <div className="h-screen overflow-y-auto bg-[#121212] text-white">
                <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
                    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
                        <div className="px-4 pb-4">
                            <div className="mt-2 border pb-2">
                                <textarea
                                    className="mb-2 h-10 w-full resize-none border-none bg-transparent px-3 pt-2 outline-none"
                                    placeholder="Write a tweet"
                                ></textarea>
                                <div className="flex items-center justify-end gap-x-3 px-3">
                                    <button className="inline-block h-5 w-5 hover:text-[#ae7aff]">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="2"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                                            ></path>
                                        </svg>
                                    </button>
                                    <button className="inline-block h-5 w-5 hover:text-[#ae7aff]">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="2"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                            ></path>
                                        </svg>
                                    </button>
                                    <button className="bg-[#ae7aff] px-3 py-2 font-semibold text-black">
                                        Send
                                    </button>
                                </div>
                            </div>
                            <div className="py-4">
                                <SingleTweetComponent
                                    fullName={user?.fullName}
                                    userName={user?.username}
                                    userImage={user?.avatar?.url}
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

export default MyChannelTweets;
