import React, { use } from "react";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react"; // nice minimal clock icon
import { useNavigate } from "react-router";

function EmptyWatchLater() {
    const navigator = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center px-6">
            {/* Illustration using an icon */}
            <div className="w-24 h-24 mb-8 flex items-center justify-center rounded-full bg-neutral-800/60">
                <Clock className="w-12 h-12 text-gray-400" />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-semibold mb-3">
                Your Watch Later is empty
            </h2>

            {/* Subtitle */}
            <p className="text-sm text-gray-400 dark:text-gray-500 max-w-md mb-8">
                Save videos to your Watch Later playlist so you can come back to
                them anytime. When you find something you like, just click the{" "}
                <span className="font-medium">Save</span> button.
            </p>

            {/* CTA */}
            <Button
                onClick={() => navigator("/")}
                size="lg"
                className="rounded-full px-6"
            >
                Explore Videos
            </Button>
        </div>
    );
}

export default EmptyWatchLater;
