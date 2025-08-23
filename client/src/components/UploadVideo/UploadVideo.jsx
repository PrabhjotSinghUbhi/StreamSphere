import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger
} from "@radix-ui/react-dialog";
import React from "react";
import { DialogHeader } from "../ui/dialog";
import { Plus, Upload } from "lucide-react";

function UploadVideo() {
    // Trap focus inside modal for accessibility

    return (
        <Dialog>
            {/* Trigger button - you can place it anywhere */}
            <DialogTrigger asChild>
                <button className="bg-[#ae7aff] text-black flex gap-x-2 px-4 py-2 rounded-xs font-bold shadow hover:bg-[#c7aaff]">
                    <Upload />
                    Upload Video
                </button>
            </DialogTrigger>

            <DialogContent
                className="fixed left-1/2 top-1/2 z-[100] max-w-md sm:max-w-lg md:max-w-2xl w-full -translate-x-1/2 -translate-y-1/2 bg-[#121212] text-white max-h-[90vh] overflow-y-auto rounded-lg shadow-lg focus:outline-none border-2"
                style={{ outline: "none" }}
            >
                <DialogHeader className="sticky top-0 bg-[#121212] z-20 border-b border-white p-4">
                    <DialogTitle className="text-xl sm:text-2xl font-bold">
                        Upload Videos
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                        Upload your videos with thumbnail, title, and
                        description.
                    </DialogDescription>
                </DialogHeader>

                <form className="mx-auto flex w-full flex-col gap-y-4 p-4">
                    {/* Upload Box */}
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
                                />
                            </svg>
                        </span>
                        <h6 className="mb-2 font-bold text-base sm:text-lg">
                            Drag and drop video files to upload
                        </h6>
                        <p className="text-gray-300 text-xs sm:text-sm">
                            Your videos will be private until you publish them.
                        </p>
                        <label
                            htmlFor="upload-video"
                            className="group/btn mt-4 inline-flex cursor-pointer items-center gap-x-2 bg-[#ae7aff] px-4 py-2 font-bold text-black rounded shadow-[5px_5px_0px_0px_#4f4e4e] transition-all hover:bg-[#c7aaff] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none"
                        >
                            <input
                                type="file"
                                id="upload-video"
                                className="sr-only"
                            />
                            Select Files
                        </label>
                    </div>

                    {/* Thumbnail */}
                    <div className="w-full mt-2 sm:mt-4">
                        <label
                            htmlFor="thumbnail"
                            className="mb-1 inline-block font-semibold"
                        >
                            Thumbnail<sup>*</sup>
                        </label>
                        <input
                            id="thumbnail"
                            type="file"
                            className="w-full border border-white p-1 file:mr-4 file:border-none file:bg-[#ae7aff] file:px-3 file:py-1.5 bg-transparent"
                        />
                    </div>

                    {/* Title */}
                    <div className="w-full mt-2 sm:mt-4">
                        <label
                            htmlFor="title"
                            className="mb-1 inline-block font-semibold"
                        >
                            Title<sup>*</sup>
                        </label>
                        <input
                            id="title"
                            type="text"
                            className="w-full border border-white bg-transparent px-2 py-1 outline-none"
                        />
                    </div>

                    {/* Description */}
                    <div className="w-full mt-2 sm:mt-4">
                        <label
                            htmlFor="desc"
                            className="mb-1 inline-block font-semibold"
                        >
                            Description<sup>*</sup>
                        </label>
                        <textarea
                            id="desc"
                            className="h-32 sm:h-40 w-full resize-none border border-white bg-transparent px-2 py-1 outline-none"
                        ></textarea>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end mt-2 gap-x-4 sm:mt-4">
                        <DialogClose asChild>
                            <button
                                type="submit"
                                className="group/btn flex items-center gap-x-2 bg-[#333] px-4 py-2 font-bold text-white rounded-lg shadow-[5px_5px_0px_0px_#4f4e4e] transition-all hover:bg-[#345] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none"
                            >
                                Cancel  
                            </button>
                        </DialogClose>
                        <button
                            type="submit"
                            className="group/btn flex items-center gap-x-2 bg-[#ae7aff] px-4 py-2 font-bold text-black rounded-lg shadow-[5px_5px_0px_0px_#4f4e4e] transition-all hover:bg-[#c7aaff] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default UploadVideo;
