import React from "react";
import PropTypes from "prop-types";
import { useFormatDuration } from "../../hooks/useFormatDuration.hook";

function SingleComment({ src, alt, username, time, comment }) {

    const { formatTime } = useFormatDuration();

    return (
        <>
            <div className="flex gap-x-4 py-2">
                <div className="mt-1 h-10 w-10 shrink-0">
                    <img
                        src={src || "/user.png"}
                        alt={`${alt}'s avatar`}
                        className="h-full w-full rounded-full object-cover border border-gray-600"
                        onError={(e) => (e.target.src = "/user.png")}
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-white truncate">
                            {username || "Anonymous"}
                        </p>
                        <span className="text-xs text-gray-400 flex-shrink-0">
                            {formatTime(time)}
                        </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-2 truncate">
                        @{username || "anonymous"}
                    </p>
                    <p className="text-sm text-gray-200 leading-relaxed break-words">
                        {comment || "No comment content"}
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                        <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors group">
                            <svg
                                className="w-4 h-4 group-hover:fill-current"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                            <span>Like</span>
                        </button>
                        <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors group">
                            <svg
                                className="w-4 h-4 group-hover:fill-current"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                                />
                            </svg>
                            <span>Reply</span>
                        </button>
                    </div>
                </div>
            </div>
            <hr className="my-4 border-gray-700" />
        </>
    );
}

SingleComment.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    username: PropTypes.string,
    time: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    comment: PropTypes.string
};

SingleComment.defaultProps = {
    src: "/user.png",
    alt: "User avatar",
    username: "Anonymous",
    time: null,
    comment: "No comment content"
};

export default SingleComment;
