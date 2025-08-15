import React from "react";

function UploadVideo() {
    // Trap focus inside modal for accessibility

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-2 sm:px-6 ">
            {/* Blurred background overlay */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                aria-label="Close modal"
                tabIndex={-1}
            ></div>
            {/* Popup modal */}
            <div className="relative mx-auto z-10 w-full max-w-md sm:max-w-lg md:max-w-2xl rounded-xl border-2 border-white bg-[#121212] shadow-2xl overflow-y-scroll scrollbar-hide max-h-[90vh]">
                <div className="flex items-center justify-between border-b border-white p-4 sticky top-0 bg-[#121212] z-20">
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                        Upload Videos
                    </h2>
                    <button
                        className="text-white text-2xl font-bold px-2 hover:text-[#ae7aff] focus:outline-none"
                        aria-label="Close"
                    >
                        &times;
                    </button>
                </div>
                <form className="mx-auto flex w-full flex-col gap-y-4 p-4">
                    <div className="w-full border-2 border-dashed border-white px-2 py-8 sm:px-4 sm:py-12 text-center rounded-lg">
                        <span className="mb-4 inline-block w-20 sm:w-24 rounded-full bg-[#E4D3FF] p-4 text-[#AE7AFF]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                                ></path>
                            </svg>
                        </span>
                        <h6 className="mb-2 font-bold text-white text-base sm:text-lg">
                            Drag and drop video files to upload
                        </h6>
                        <p className="text-gray-300 text-xs sm:text-sm">
                            Your videos will be private until you publish them.
                        </p>
                        <label
                            htmlFor="upload-video"
                            className="group/btn mt-4 inline-flex w-auto cursor-pointer items-center gap-x-2 bg-[#ae7aff] px-4 py-2 text-center font-bold text-black rounded shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out hover:bg-[#c7aaff] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none"
                        >
                            <input
                                type="file"
                                id="upload-video"
                                className="sr-only"
                            />
                            Select Files
                        </label>
                    </div>
                    <div className="w-full mt-2 sm:mt-4">
                        <label
                            htmlFor="thumbnail"
                            className="mb-1 inline-block text-white font-semibold"
                        >
                            Thumbnail<sup>*</sup>
                        </label>
                        <input
                            id="thumbnail"
                            type="file"
                            className="w-full border border-white p-1 file:mr-4 file:border-none file:bg-[#ae7aff] file:px-3 file:py-1.5 bg-transparent text-white"
                        />
                    </div>
                    <div className="w-full mt-2 sm:mt-4">
                        <label
                            htmlFor="title"
                            className="mb-1 inline-block text-white font-semibold"
                        >
                            Title<sup>*</sup>
                        </label>
                        <input
                            id="title"
                            type="text"
                            className="w-full border border-white bg-transparent px-2 py-1 outline-none text-white"
                        />
                    </div>
                    <div className="w-full mt-2 sm:mt-4">
                        <label
                            htmlFor="desc"
                            className="mb-1 inline-block text-white font-semibold"
                        >
                            Description<sup>*</sup>
                        </label>
                        <textarea
                            id="desc"
                            className="h-32 sm:h-40 w-full resize-none border border-white bg-transparent px-2 py-1 outline-none text-white"
                        ></textarea>
                    </div>
                    <div className="flex justify-end mt-2 sm:mt-4">
                        <button
                            type="submit"
                            className="group/btn flex w-auto items-center gap-x-2 bg-[#ae7aff] px-4 py-2 text-center font-bold text-black rounded-lg shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out hover:bg-[#c7aaff] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UploadVideo;
