/* eslint-disable no-irregular-whitespace */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useUser } from "../../hooks/useUser.hook";
import { Skeleton } from "../ui/skeleton";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { navigate } from "../../Helper/navigate";

function SubscriberCard({ _id }) {
    const { user, fetchUser } = useUser(_id);
    const navigator = useNavigate();

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
                    <button
                        className="group/btn px-3 py-2 text-black bg-[#ae7aff] focus:bg-white cursor-pointer"
                        onClick={() => navigator(`/channel/${username}`)}
                    >
                        view channel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SubscriberCard;
