import React, { useState } from "react";
import Logo from "../Logo";
import { useNavigate } from "react-router";
import { SyncLoader } from "react-spinners";

function Register() {
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [coverPreview, setCoverPreview] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigator = useNavigate();

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) setAvatarPreview(URL.createObjectURL(file));
    };

    const handleCoverChange = (e) => {
        const file = e.target.files[0];
        if (file) setCoverPreview(URL.createObjectURL(file));
    };

    const handleRegisterForm = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
            const formData = new FormData(e.target);
            const response = await fetch(
                `${
                    import.meta.env.VITE_STREAM_SPHERE_SERVER_URI
                }/api/v1/users/register`,
                {
                    method: "POST",
                    body: formData
                }
            );

            const responseData = await response.json();

            if (!response.ok) {
                // Show backend error message if available
                setError(
                    responseData.message ||
                        "Registration failed. Please try again."
                );
                return;
            }
            console.log("Response:", responseData);
            navigator("/login"); // Redirect to login after successful registration
        } catch (error) {
            setError(error.message || "Registration failed. Please try again.");
            console.error("Registration error:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="absolute inset-0 flex items-center justify-center bg-">
                <SyncLoader color="#ae7aff" />
            </div>
        );
    }

    return (
        <div className="min-h-screen overflow-y-scroll scrollbar-hide bg-gradient-to-br from-[#1c1c1f] via-[#18181b] to-[#141416] text-white flex items-center justify-center px-4 py-8">
            <div className="mx-auto w-full max-w-2xl rounded-2xl shadow-xl bg-black/40 backdrop-blur-lg p-8 space-y-6 border border-[#ae7aff]/20">
                {/* Logo */}
                <div className="flex m-0 justify-center">
                    <Logo heightAndWidth={250} />
                </div>
                <h1 className="text-center text-3xl font-bold text-[#ae7aff] drop-shadow-md">
                    Create Your Account
                </h1>
                <p className="text-center text-sm text-gray-400">
                    Join Stream Sphere and start your journey
                </p>
                {/* Error Message */}
                {error && (
                    <div className="bg-[#2c1e3a] border border-[#ae7aff]/60 text-[#ae7aff] rounded-lg px-4 py-3 text-center font-medium shadow mb-2 animate-fade-in">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegisterForm} className="space-y-6">
                    {/* Cover Image + Avatar */}
                    <div className="flex gap-7 flex-row-reverse justify-between items-center mt-6">
                        {/* Cover Image */}
                        <div className="space-y-2 w-full">
                            <label className="text-sm font-medium text-gray-300">
                                Cover Image
                            </label>
                            <div className="relative w-full h-32 rounded-xl overflow-hidden border border-dashed border-[#ae7aff]/40 flex items-center justify-center cursor-pointer bg-[#1e1e1e] hover:bg-[#7b3d3d] hover:border-[#ae7aff]/70 transition">
                                {coverPreview ? (
                                    <img
                                        src={coverPreview}
                                        alt="Cover Preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-gray-500 text-sm">
                                        Click to upload cover image
                                    </span>
                                )}
                                <input
                                    type="file"
                                    name="coverImage"
                                    accept="image/*"
                                    onChange={handleCoverChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    autoComplete="on"
                                />
                            </div>
                        </div>

                        {/* Avatar */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">
                                Avatar
                            </label>
                            <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border border-dashed border-[#ae7aff]/40 flex items-center justify-center cursor-pointer bg-[#1e1e1e] hover:bg-[#252525] hover:border-[#ae7aff]/70 transition">
                                {avatarPreview ? (
                                    <img
                                        src={avatarPreview}
                                        alt="Avatar Preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-gray-500 text-xs text-center px-2">
                                        Click to upload avatar
                                    </span>
                                )}
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    autoComplete="on"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Username & Full Name */}
                    <div className="flex gap-3 flex-col sm:flex-row">
                        <div className="flex-1">
                            <label
                                htmlFor="username"
                                className="block mb-1 text-gray-300 text-sm font-medium"
                            >
                                Username*
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Choose a username"
                                required
                                className="rounded-lg bg-[#1e1e1e] px-3 py-2 w-full border border-transparent focus:outline-none focus:border-[#ae7aff] focus:ring-2 focus:ring-[#ae7aff]/60 transition"
                                autoComplete="on"
                            />
                        </div>
                        <div className="flex-1">
                            <label
                                htmlFor="fullName"
                                className="block mb-1 text-gray-300 text-sm font-medium"
                            >
                                Full Name
                            </label>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                placeholder="Your full name"
                                className="rounded-lg bg-[#1e1e1e] px-3 py-2 w-full border border-transparent focus:outline-none focus:border-[#ae7aff] focus:ring-2 focus:ring-[#ae7aff]/60 transition"
                                required
                                autoComplete="on"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-1 text-gray-300 text-sm font-medium"
                        >
                            Email*
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            required
                            className="rounded-lg bg-[#1e1e1e] px-3 py-2 w-full border border-transparent focus:outline-none focus:border-[#ae7aff] focus:ring-2 focus:ring-[#ae7aff]/60 transition"
                            autoComplete="on"
                        />
                    </div>

                    {/* Password & Confirm Password */}
                    <div className="flex gap-3 flex-col sm:flex-row">
                        <div className="flex-1">
                            <label
                                htmlFor="password"
                                className="block mb-1 text-gray-300 text-sm font-medium"
                            >
                                Password*
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Create a password"
                                required
                                className="rounded-lg bg-[#1e1e1e] px-3 py-2 w-full border border-transparent focus:outline-none focus:border-[#ae7aff] focus:ring-2 focus:ring-[#ae7aff]/60 transition"
                                autoComplete="on"
                            />
                        </div>
                        <div className="flex-1">
                            <label
                                htmlFor="confirmPassword"
                                className="block mb-1 text-gray-300 text-sm font-medium"
                            >
                                Confirm Password*
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                required
                                className="rounded-lg bg-[#1e1e1e] px-3 py-2 w-full border border-transparent focus:outline-none focus:border-[#ae7aff] focus:ring-2 focus:ring-[#ae7aff]/60 transition"
                                autoComplete="on"
                            />
                        </div>
                    </div>

                    {/* Terms */}
                    <div className="flex items-center gap-2 mt-2">
                        <input
                            type="checkbox"
                            id="terms"
                            name="terms"
                            required
                            className="accent-[#ae7aff]"
                            autoComplete="on"
                        />
                        <label
                            htmlFor="terms"
                            className="text-xs text-gray-400"
                        >
                            I agree to the{" "}
                            <a
                                href="/terms-and-conditions"
                                className="text-[#ae7aff] underline hover:text-[#c7a6ff]"
                            >
                                Terms & Conditions
                            </a>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-[#ae7aff] hover:bg-[#c7a6ff] transition px-4 py-3 rounded-lg text-black font-semibold shadow mt-2"
                    >
                        Sign up
                    </button>
                </form>

                {/* Social Sign-up */}
                <div className="mt-5 flex flex-col gap-3">
                    <button className="flex items-center justify-center gap-2 bg-[#1e1e1e] hover:bg-[#2c2c2c] transition px-4 py-2 rounded-lg text-white font-medium border border-[#ae7aff]/40">
                        <span>🔗</span> Sign up with Google
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-[#1e1e1e] hover:bg-[#2c2c2c] transition px-4 py-2 rounded-lg text-white font-medium border border-[#ae7aff]/40">
                        <span>💻</span> Sign up with GitHub
                    </button>
                </div>

                {/* Sign in */}
                <p className="text-center text-gray-400 text-sm mt-4">
                    Already have an account?{" "}
                    <a
                        href="#"
                        className="text-[#ae7aff] hover:underline hover:text-[#c7a6ff]"
                    >
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Register;
