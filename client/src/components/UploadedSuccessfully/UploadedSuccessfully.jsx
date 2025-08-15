import React from "react";

function UploadedSuccessfully() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-2 sm:px-6">
            {/* Blurred background overlay */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                aria-label="Close modal"
                tabIndex={-1}
            ></div>
            {/* Popup modal */}
            <div className="relative z-10 w-full max-w-md sm:max-w-lg rounded-xl border-2 border-white bg-[#121212] shadow-2xl mx-auto flex flex-col items-center justify-center p-8">
                <span className="mb-4 inline-block w-20 sm:w-24 rounded-full bg-[#E4D3FF] p-4 text-[#AE7AFF]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                        />
                    </svg>
                </span>
                <h2 className="text-2xl font-bold text-white mb-2 text-center">
                    Upload Successful!
                </h2>
                <p className="text-gray-300 mb-6 text-center">
                    Your video has been uploaded and is now available.
                </p>
                <button
                    className="group/btn flex w-auto items-center gap-x-2 bg-[#ae7aff] px-6 py-2 text-center font-bold text-black rounded-lg shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out hover:bg-[#c7aaff] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default UploadedSuccessfully;
