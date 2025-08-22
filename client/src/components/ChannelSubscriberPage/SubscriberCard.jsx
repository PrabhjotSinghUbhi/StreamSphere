/* eslint-disable no-irregular-whitespace */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useUser } from "../../hooks/useUser.hook";
import { Skeleton } from "../ui/skeleton";
import toast from "react-hot-toast";
import { Link } from "react-router";

function SubscriberCard({ _id }) {
    const { user, fetchUser } = useUser(_id);

    useEffect(() => {
        fetchUser();
    }, []);

    if (!user) {
        return (
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
        );
    }
    
    toast.dismissAll("completed.");
    const { avatar, fullName, subscribers, isSubscribed, username } = user;

    return (
        <div className="flex flex-col gap-y-4 py-4">
            {/* {search bar} */}
            <div className="relative mb-2 rounded-lg bg-white py-2 pl-8 pr-3 text-black">
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

            <div className="flex w-full justify-between">
                <Link to={`/channel/${username}`}>
                    <div className="flex items-center gap-x-2">
                        <div className="h-14 w-14 shrink-0">
                            <img
                                src={avatar.url}
                                alt="Code Master"
                                className="h-full w-full rounded-full"
                                onError={(e) => (e.target.src = "/user.png")}
                            />
                        </div>
                        <div className="block">
                            <h6 className="font-semibold">{fullName}</h6>
                            <p className="text-sm text-gray-300">
                                {subscribers.length} Subscribers
                            </p>
                        </div>
                    </div>
                </Link>
                <div className="block">
                    <button className="group/btn px-3 py-2 text-black bg-[#ae7aff] focus:bg-white">
                        <span className="group-focus/btn:hidden">
                            {isSubscribed ? "Subscribed" : "Subscribe"}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SubscriberCard;
