import React from "react";

function DeleteVideoPopUp({ onClose, onDelete }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-2 sm:px-6">
            {/* Blurred background overlay */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
                aria-label="Close modal"
                tabIndex={-1}
            ></div>
            {/* Popup modal */}
            <div className="relative z-10 w-full max-w-lg rounded-xl border border-white bg-[#181818] shadow-2xl mx-auto p-4">
                <div className="flex items-start justify-between w-full">
                    <div className="flex items-center gap-x-4">
                        <span className="w-10 h-10 rounded-full bg-red-200 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.2" stroke="#e53e3e" className="w-7 h-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m2 0v14a2 2 0 01-2 2H8a2 2 0 01-2-2V6m5 8v4m-4-4v4m8-4v4" />
                            </svg>
                        </span>
                        <div>
                            <h2 className="text-xl font-bold text-white">Delete Video</h2>
                            <p className="text-gray-200 text-base mt-1">Are you sure you want to delete this video? <span className="text-red-400 font-semibold">Once it's deleted, you will not be able to recover it.</span></p>
                        </div>
                    </div>
                    <button
                        className="text-white text-2xl font-bold px-2 hover:text-[#ae7aff] focus:outline-none"
                        aria-label="Close"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4">
                    <button
                        className="border border-white px-4 py-3 rounded-lg text-white hover:bg-white/10 transition text-lg font-semibold"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-red-600 px-4 py-3 text-white rounded-lg font-bold text-lg shadow-[0_0_10px_0_#e53e3e] hover:bg-red-700 transition"
                        onClick={onDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteVideoPopUp;
