import React from "react";

function ChangeUserPassword() {
    return (
        <div>
            <div className="h-screen overflow-y-auto bg-[#121212] text-white">
                <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
                    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
                        <div className="px-4 pb-4">
                            <div className="flex flex-wrap justify-center gap-y-4 py-4">
                                <div className="w-full sm:w-1/2 lg:w-1/3">
                                    <h5 className="font-semibold">Password</h5>
                                    <p className="text-gray-300">
                                        Please enter your current password to
                                        change your password.
                                    </p>
                                </div>
                                <div className="w-full sm:w-1/2 lg:w-2/3">
                                    <div className="rounded-lg border">
                                        <div className="flex flex-wrap gap-y-4 p-4">
                                            <div className="w-full">
                                                <label
                                                    className="mb-1 inline-block"
                                                    for="old-pwd"
                                                >
                                                    Current password
                                                </label>
                                                <input
                                                    type="password"
                                                    className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                                                    id="old-pwd"
                                                    placeholder="Current password"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label
                                                    className="mb-1 inline-block"
                                                    for="new-pwd"
                                                >
                                                    New password
                                                </label>
                                                <input
                                                    type="password"
                                                    className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                                                    id="new-pwd"
                                                    placeholder="New password"
                                                />
                                                <p className="mt-0.5 text-sm text-gray-300">
                                                    Your new password must be
                                                    more than 8 characters.
                                                </p>
                                            </div>
                                            <div className="w-full">
                                                <label
                                                    className="mb-1 inline-block"
                                                    for="cnfrm-pwd"
                                                >
                                                    Confirm password
                                                </label>
                                                <input
                                                    type="password"
                                                    className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                                                    id="cnfrm-pwd"
                                                    placeholder="Confirm password"
                                                />
                                            </div>
                                        </div>
                                        <hr className="border border-gray-300" />
                                        <div className="flex items-center justify-end gap-4 p-4">
                                            <button className="inline-block rounded-lg border px-3 py-1.5 hover:bg-white/10">
                                                Cancel
                                            </button>
                                            <button className="inline-block bg-[#ae7aff] px-3 py-1.5 text-black">
                                                Update Password
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default ChangeUserPassword;
