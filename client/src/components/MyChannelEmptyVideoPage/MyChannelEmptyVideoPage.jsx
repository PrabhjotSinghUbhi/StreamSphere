import { Plus } from "lucide-react";
import React from "react";
import UploadVideo from "../UploadVideo/UploadVideo";

function MyChannelEmptyVideoPage() {
    return (
        <div>
            <div className="h-screen overflow-y-auto bg-[#121212] text-white">
                <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
                    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
                        <div className="px-4 pb-4">
                            <div className="flex justify-center p-4">
                                <div className="w-full max-w-sm text-center">
                                    <p className="mb-3 w-full">
                                        <span className="inline-flex rounded-full bg-[#E4D3FF] p-2 text-[#AE7AFF]">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                                className="w-6"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                                                ></path>
                                            </svg>
                                        </span>
                                    </p>
                                    <h5 className="mb-2 font-semibold">
                                        No videos uploaded
                                    </h5>
                                    <p>
                                        This page has yet to upload a video.
                                        Search another page in order to find
                                        more videos.
                                    </p>
                                    <button className="mt-4 cursor-pointer  px-3 py-2 font-semibold text-black">
                                        <UploadVideo />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default MyChannelEmptyVideoPage;
