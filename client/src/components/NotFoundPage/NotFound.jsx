import React from "react";
import { useNavigate } from "react-router";

function NotFound() {
    const navigator = useNavigate();

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-[#121212] text-white">
            <div className="text-center">
                <h1 className="text-6xl font-bold mb-4 text-[#ae7aff]">404</h1>
                <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
                <p className="mb-6 text-gray-300">
                    Sorry, the page you are looking for does not exist or has
                    been moved.
                </p>
                <button
                    onClick={() => {
                        navigator("/");
                    }}
                    className="inline-block rounded-lg bg-[#ae7aff] px-6 py-3 text-black font-bold shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out hover:bg-[#c7aaff] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none"
                >
                    Go Home
                </button>
            </div>
            <div className="mt-8">
                <img
                    src="https://images.pexels.com/photos/1115808/pexels-photo-1115808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Not Found"
                    className="mx-auto rounded-lg w-64 h-40 object-cover shadow-lg"
                />
            </div>
        </div>
    );
}

export default NotFound;
