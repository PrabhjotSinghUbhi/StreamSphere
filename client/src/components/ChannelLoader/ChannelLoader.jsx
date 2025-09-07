import { Skeleton } from "../ui/skeleton";

function ChannelPageLoader() {
    return (
        <div className="h-screen overflow-y-scroll scrollbar-hide bg-[#121212] text-white">
            <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
                <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
                    {/* Cover Image Skeleton */}
                    <Skeleton className="w-full h-52 sm:h-64 md:h-72 lg:h-80 bg-neutral-800" />

                    <div className="px-4 pb-4">
                        {/* Avatar + Name Skeleton */}
                        <div className="flex items-center gap-4 mt-[-40px] sm:mt-[-50px]">
                            <Skeleton className="h-24 w-24 rounded-full border-4 border-[#121212] bg-neutral-800" />
                            <div className="flex flex-col gap-2">
                                <Skeleton className="h-6 w-40 bg-neutral-800" />
                                <Skeleton className="h-4 w-28 bg-neutral-800" />
                            </div>
                        </div>

                        {/* Navbar Tabs Skeleton */}
                        <div className="flex gap-6 mt-6">
                            <Skeleton className="h-8 w-20 bg-neutral-800" />
                            <Skeleton className="h-8 w-20 bg-neutral-800" />
                            <Skeleton className="h-8 w-20 bg-neutral-800" />
                            <Skeleton className="h-8 w-20 bg-neutral-800" />
                        </div>

                        {/* Content Placeholder */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <Skeleton
                                    key={i}
                                    className="h-40 w-full rounded-lg bg-neutral-800"
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
export default ChannelPageLoader;