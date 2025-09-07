import React from "react";
import { Skeleton } from "@/components/ui/skeleton"; // assuming you use shadcn Skeleton

function PlayListLoader() {
    return (
        <div className="h-screen overflow-y-scroll scrollbar-hide bg-[#121212] text-white">
            <div className="min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
                <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
                    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
                        <div className="flex flex-wrap gap-x-4 gap-y-10 p-4 xl:flex-nowrap">
                            {/* Playlist Preview Loader */}
                            <div className="w-full shrink-0 sm:max-w-md xl:max-w-sm">
                                <div className="relative mb-2 w-full pt-[56%]">
                                    <Skeleton className="absolute inset-0 rounded-md" />
                                </div>
                                <Skeleton className="mb-2 h-6 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />

                                {/* Owner Info */}
                                <div className="mt-6 flex items-center gap-x-3">
                                    <Skeleton className="h-16 w-16 rounded-full" />
                                    <div className="flex flex-col gap-2 w-full">
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-4 w-20" />
                                    </div>
                                </div>
                            </div>

                            {/* Videos Loader */}
                            <div className="flex w-full flex-col gap-y-4">
                                {[...Array(5)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="border border-gray-700 rounded-md p-2"
                                    >
                                        <div className="w-full max-w-3xl gap-x-4 sm:flex">
                                            {/* Thumbnail */}
                                            <div className="relative mb-2 w-full sm:mb-0 sm:w-5/12">
                                                <Skeleton className="w-full h-40 rounded-md" />
                                            </div>
                                            {/* Text */}
                                            <div className="flex gap-x-2 px-2 sm:w-7/12 sm:px-0">
                                                <div className="flex flex-col gap-2 w-full">
                                                    <Skeleton className="h-4 w-3/4" />
                                                    <Skeleton className="h-4 w-1/3" />
                                                    <div className="flex items-center gap-x-2 mt-2">
                                                        <Skeleton className="h-10 w-10 rounded-full" />
                                                        <Skeleton className="h-4 w-20" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default PlayListLoader;
