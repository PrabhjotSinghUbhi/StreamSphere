/* eslint-disable no-irregular-whitespace */
import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setEdit } from "../../slice/editSlice";

function ChannelUserAvatar({
    avatar,
    channelName,
    subscribers,
    subscribed,
    isMyChannel = false
}) {
    const dispatch = useDispatch();
    const edit = useSelector((state) => state.edit.edit);

    let buttonContent;
    if (!isMyChannel) {
        buttonContent = (
            <button className="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto">
                <span className="inline-block w-5">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                        ></path>
                    </svg>
                </span>
                <span className="group-focus/btn:hidden">Subscribe</span>
                <span className="hidden group-focus/btn:block">Subscribed</span>
            </button>
        );
    } else if (!edit) {
        buttonContent = (
            <button
                className="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"
                onClick={() => dispatch(setEdit(!edit))}
            >
                <span className="inline-block w-5">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        ></path>
                    </svg>
                </span>
                Edit
            </button>
        );
    } else {
        buttonContent = (
            <button
                className="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"
                onClick={() => dispatch(setEdit(!edit))}
            >
                <span className="inline-block w-5">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        ></path>
                    </svg>
                </span>
                View Channel
            </button>
        );
    }

    return (
        <div>
            <div className="flex flex-wrap gap-4 pb-4 pt-6">
                <span className="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2">
                    <img src={avatar} alt="Channel" className="h-full w-full" />
                </span>
                <div className="mr-auto inline-block">
                    <h1 className="font-bol text-xl">{channelName}</h1>
                    <p className="text-sm text-gray-400">@{channelName}</p>
                    <p className="text-sm text-gray-400">
                        {subscribers} Subscribers · {subscribed} Subscribed
                    </p>
                </div>
                <div className="inline-block">
                    <div className="inline-flex min-w-[145px] justify-end">
                        {buttonContent}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChannelUserAvatar;

ChannelUserAvatar.propTypes = {
    avatar: PropTypes.string.isRequired,
    channelName: PropTypes.string.isRequired,
    subscribers: PropTypes.number.isRequired,
    subscribed: PropTypes.number.isRequired,
    isMyChannel: PropTypes.bool
};
