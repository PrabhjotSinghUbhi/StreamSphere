import React from "react";
import { Button } from "@/components/ui/button";

function EmptyWatchHistory() {
    return (
        <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4 py-16 text-center">
            {/* Icon placeholder (YouTube style clock/history icon) */}
            <div className="w-28 h-28 mb-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-full h-full text-gray-500"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </div>

            {/* Title */}
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                No watch history
            </h2>

            {/* Subtitle */}
            <p className="text-gray-400 max-w-md mb-6">
                Your watch history will appear here. Start watching videos to
                build your history.
            </p>
        </div>
    );
}

export default EmptyWatchHistory;
