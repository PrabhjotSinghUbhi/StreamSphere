import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function TweetsLoader() {
    return (
        <div className="space-y-6 p-4">
            {[...Array(5)].map((_, index) => (
                <div key={index} className="flex space-x-4 items-start">
                    {/* Avatar */}
                    <Skeleton className="h-12 w-12 rounded-full" />

                    {/* Tweet content */}
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4 rounded" />
                        <Skeleton className="h-4 w-1/2 rounded" />
                        <Skeleton className="h-3 w-full rounded" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TweetsLoader;
