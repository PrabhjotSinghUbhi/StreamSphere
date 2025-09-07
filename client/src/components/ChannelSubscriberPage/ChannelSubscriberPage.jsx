/* eslint-disable no-irregular-whitespace */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChannelEmptySubscribers from "../ChannelEmptySubscribers/ChannelEmptySubscribers";
import { useParams } from "react-router";
import SubscriberCard from "./SubscriberCard";
import { fetchSubscriptions } from "../../slice/subscriptionListSlice";
import { Skeleton } from "../ui/skeleton";

function ChannelSubscriberPage() {
    const { _id } = useSelector((state) => state.loginUser.login_user.user);
    const dispatch = useDispatch();
    useEffect(() => {
        if (_id) {
            dispatch(fetchSubscriptions(_id));
        }
    }, [_id, dispatch]);

    const { subscriptions, loading } = useSelector(
        (state) => state.subscriptionList
    );

    return (
        <div>
            {subscriptions?.length === 0 ? (
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
                                {loading && (
                                    <div className="w-full flex justify-between">
                                        <div className="flex pt-5  space-x-4">
                                            <Skeleton className="h-12 w-12 rounded-full" />
                                            <div className="space-y-2">
                                                <Skeleton className="h-4 w-[250px]" />
                                                <Skeleton className="h-4 w-[200px]" />
                                            </div>
                                        </div>
                                        <div className="">
                                            <Skeleton className="h-12 pt-5 mt-4 w-[200px]" />
                                        </div>
                                    </div>
                                )}
                                {subscriptions?.map((subscription) => (
                                    <SubscriberCard
                                        _id={subscription?.channel._id}
                                        key={subscription?.channel?._id}
                                        username={
                                            subscription?.channel?.username
                                        }
                                        fullName={
                                            subscription?.channel?.fullName
                                        }
                                        avatar={
                                            subscription?.channel?.avatar?.url
                                        }
                                        subscribers={
                                            subscription?.totalSubscribersCount
                                        }
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
