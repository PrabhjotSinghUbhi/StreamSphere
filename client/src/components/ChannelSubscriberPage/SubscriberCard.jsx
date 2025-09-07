/* eslint-disable no-irregular-whitespace */
import React from "react";
import { Link, useNavigate } from "react-router";

function SubscriberCard({ username, fullName, avatar, subscribers }) {
    const navigator = useNavigate();

    return (
        <div className="flex flex-col gap-y-4 py-4">
            <div className="flex w-full justify-between">
                <Link to={`/channel/${username}`}>
                    <div className="flex items-center gap-x-2">
                        <div className="h-14 w-14 shrink-0">
                            <img
                                src={avatar || "/user.png"}
                                alt="Code Master"
                                className="h-full w-full rounded-full"
                                onError={(e) => (e.target.src = "/user.png")}
                            />
                        </div>
                        <div className="block">
                            <h6 className="font-semibold">{fullName}</h6>
                            <p className="text-sm text-gray-300">
                                {subscribers} Subscribers
                            </p>
                        </div>
                    </div>
                </Link>
                <div className="block">
                    <button
                        className="group/btn px-3 py-2 text-black bg-[#ae7aff] focus:bg-white cursor-pointer"
                        onClick={() => navigator(`/channel/${username}/videos`)}
                    >
                        view channel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SubscriberCard;
