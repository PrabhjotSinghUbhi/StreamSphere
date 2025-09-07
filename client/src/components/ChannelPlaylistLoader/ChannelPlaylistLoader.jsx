import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function ChannelPlayListLoader() {
    // Simulate loading multiple playlist cards
    return (
        <div className="h-screen overflow-y-auto bg-[#121212] text-white scrollbar-hide">
            <section className="w-full px-4 py-6 sm:ml-[70px] lg:ml-0">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-transparent border-0 rounded-lg overflow-hidden"
                        >
                            {/* Thumbnail skeleton */}
                            <div className="relative aspect-video rounded-md overflow-hidden">
                                <Skeleton className="h-full w-full" />
                                {/* stacked effect placeholders */}
                                <div className="absolute top-1 right-1 h-3 w-5 bg-neutral-800 rounded-sm -rotate-1" />
                                <div className="absolute top-2 right-2 h-3 w-5 bg-neutral-700 rounded-sm rotate-2" />
                            </div>

                            {/* Content skeleton */}
                            <div className="p-3 flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                    <Skeleton className="h-4 w-32 mb-2" />
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-5 w-5 rounded-full" />
                                        <Skeleton className="h-3 w-24" />
                                    </div>
                                </div>
                                <Skeleton className="h-5 w-5 rounded-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default ChannelPlayListLoader;
