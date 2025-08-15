import React from "react";
import PropTypes from "prop-types";
import Logo from "../Logo";
import { useNavigate } from "react-router";
import { api } from "../../api/api";

function Login({ className }) {
    const navigator = useNavigate();

    const handleLogin = async (e) => {
        const formDate = new FormData(e.target);

        try {
            const resp = await api.post("/users/login");
        } catch (error) {}
    };
    return (
        <div
            className={`min-h-screen overflow-y-auto bg-[#121212] text-white flex items-center justify-center p-4 ${className}`}
        >
            <div className="w-full max-w-sm rounded-xl shadow-lg bg-[#181818] px-6 py-8">
                {/* Logo */}
                <div className="flex flex-col items-center mb-6">
                    <div className="">
                        <Logo heightAndWidth={200} />
                    </div>
                    <h1 className="text-2xl font-bold uppercase tracking-wide text-[#ae7aff]">
                        Stream Sphere
                    </h1>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleLogin}
                    encType="application/x-www-form-urlencoded"
                    className="flex flex-col gap-4"
                >
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-gray-300 text-sm font-medium mb-1"
                        >
                            Email<span className="text-red-500">*</span>
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                            className="w-full rounded-lg border border-[#ae7aff] bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ae7aff]"
                            autoComplete="on"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-gray-300 text-sm font-medium mb-1"
                        >
                            Password<span className="text-red-500">*</span>
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                            className="w-full rounded-lg border border-[#ae7aff] bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ae7aff]"
                            autoComplete="true"
                        />
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-400">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                className="accent-[#ae7aff]"
                                autoComplete="on"
                            />{" "}
                            Remember me
                        </label>
                        <a href="#" className="text-[#ae7aff] hover:underline">
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#ae7aff] hover:bg-[#c7a6ff] transition-colors px-4 py-3 rounded-lg text-black font-semibold shadow"
                    >
                        Sign in
                    </button>
                </form>

                {/* Sign up link */}
                <p className="mt-6 text-center text-gray-400 text-sm">
                    Don't have an account?{" "}
                    <a href="#" className="text-[#ae7aff] hover:underline">
                        Sign up
                    </a>
                </p>

                {/* Social buttons */}
                <div className="mt-4 flex flex-col gap-2">
                    <SocialButton
                        icon={
                            <svg
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M21.35 11.1H12.18V13.89H17.68C17.23 15.67 15.56 17.1 13.5 17.1C11.01 17.1 9.01 15.1 9.01 12.6C9.01 10.1 11.01 8.1 13.5 8.1C14.56 8.1 15.52 8.47 16.27 9.09L18.19 7.17C16.97 6.13 15.33 5.5 13.5 5.5C9.91 5.5 7.01 8.4 7.01 12C7.01 15.6 9.91 18.5 13.5 18.5C16.64 18.5 19.23 16.13 19.23 12.6C19.23 12.27 19.2 11.94 19.16 11.62L21.35 11.1Z" />
                            </svg>
                        }
                    >
                        Sign in with Google
                    </SocialButton>

                    <SocialButton
                        icon={
                            <svg
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M17.5 9.5C17.5 7.57 15.93 6 14 6C12.07 6 10.5 7.57 10.5 9.5C10.5 11.43 12.07 13 14 13C15.93 13 17.5 11.43 17.5 9.5ZM14 15C11.24 15 9 12.76 9 10C9 7.24 11.24 5 14 5C16.76 5 19 7.24 19 10C19 12.76 16.76 15 14 15ZM14 17C17.31 17 20 14.31 20 11C20 7.69 17.31 5 14 5C10.69 5 8 7.69 8 11C8 14.31 10.69 17 14 17Z" />
                            </svg>
                        }
                    >
                        Sign in with GitHub
                    </SocialButton>
                </div>
            </div>
        </div>
    );
}

export default Login;

function SocialButton({ icon, children }) {
    return (
        <button className="flex items-center justify-center gap-2 bg-[#232323] hover:bg-[#2c2c2c] transition-colors px-4 py-2 rounded-lg text-white font-medium border border-[#ae7aff]">
            {icon}
            {children}
        </button>
    );
}

SocialButton.propTypes = {
    icon: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired
};

Login.propTypes = {
    className: PropTypes.string
};
