import React from "react";
import { Link } from "react-router-dom";

function EmptySubscriberPage() {
    return (
        <div className="flex min-h-[60vh] w-full flex-col items-center justify-center px-4 py-12 text-center">
            {/* Illustration/Icon */}
            <div className="mb-8 relative">
                <div className="relative">
                    {/* Background Circle */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-xl transform scale-150" />

                    {/* Main Icon Container */}
                    <div className="relative bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-full p-8 sm:p-12 border border-neutral-700/50 shadow-2xl">
                        <svg
                            className="w-16 h-16 sm:w-20 sm:h-20 text-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary/20 rounded-full animate-pulse" />
                    <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-primary/30 rounded-full animate-pulse delay-300" />
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-md space-y-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                    No Subscribers Yet
                </h1>

                <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
                    You have no subscribers yet. Start exploring and find
                    creators you love!
                </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-sm">
                <Link
                    to="/"
                    className="flex-1 bg-neutral-500 hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-neutral-900"
                >
                    Explore Channels
                </Link>

                <Link
                    to="/trending"
                    className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold py-3 px-6 rounded-lg border border-neutral-600 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-neutral-900"
                >
                    Browse Trending
                </Link>
            </div>

            {/* Tips Section */}
            <div className="mt-12 max-w-2xl">
                <h3 className="text-lg font-semibold text-white mb-4">
                    How to Get Started
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    {/* Tip 1 */}
                    <div className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-4 border border-neutral-700/30 hover:border-neutral-600/50 transition-colors duration-200">
                        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mb-3">
                            <svg
                                className="w-5 h-5 text-primary"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                        <h4 className="font-medium text-white mb-1 text-sm">
                            Discover
                        </h4>
                        <p className="text-xs text-neutral-400">
                            Search for topics you're interested in
                        </p>
                    </div>

                    {/* Tip 2 */}
                    <div className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-4 border border-neutral-700/30 hover:border-neutral-600/50 transition-colors duration-200">
                        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mb-3">
                            <svg
                                className="w-5 h-5 text-primary"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-7 4h12a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v6a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <h4 className="font-medium text-white mb-1 text-sm">
                            Watch
                        </h4>
                        <p className="text-xs text-neutral-400">
                            Enjoy videos from creators you like
                        </p>
                    </div>

                    {/* Tip 3 */}
                    <div className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-4 border border-neutral-700/30 hover:border-neutral-600/50 transition-colors duration-200">
                        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mb-3">
                            <svg
                                className="w-5 h-5 text-primary"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                            </svg>
                        </div>
                        <h4 className="font-medium text-white mb-1 text-sm">
                            Subscribe
                        </h4>
                        <p className="text-xs text-neutral-400">
                            Never miss new content from your favorites
                        </p>
                    </div>
                </div>
            </div>

            {/* Popular Categories */}
            {/* <div className="mt-12 w-full max-w-4xl">
                <h3 className="text-lg font-semibold text-white mb-6 text-center">
                    Popular Categories
                </h3>

                <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                    {[
                        { name: "Gaming", icon: "🎮" },
                        { name: "Music", icon: "🎵" },
                        { name: "Education", icon: "📚" },
                        { name: "Technology", icon: "💻" },
                        { name: "Cooking", icon: "👨‍🍳" },
                        { name: "Travel", icon: "✈️" },
                        { name: "Sports", icon: "⚽" },
                        { name: "Art", icon: "🎨" }
                    ].map((category) => (
                        <Link
                            key={category.name}
                            to={`/category/${category.name.toLowerCase()}`}
                            className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-neutral-900 border border-neutral-700/50 hover:border-neutral-600"
                        >
                            <span className="mr-2">{category.icon}</span>
                            {category.name}
                        </Link>
                    ))}
                </div>
            </div> */}
        </div>
    );
}

export default EmptySubscriberPage;
