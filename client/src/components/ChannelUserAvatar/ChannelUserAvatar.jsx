/* eslint-disable no-irregular-whitespace */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setEdit } from "../../slice/editSlice";
import { useNavigate, useParams } from "react-router";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger
} from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "../ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import toast from "react-hot-toast";
import { api } from "../../api/api";
import { updateAvatar } from "../../slice/userSlice";

function ChannelUserAvatar({
    src,
    subscriberCount,
    subscribed,
    userName,
    full_name
}) {
    const dispatch = useDispatch();
    const edit = useSelector((state) => state.edit.edit);

    const { _id, avatar, fullName, username } = useSelector((state) => {
        console.log("State in User Avatar is :: ", state);
        return state.loginUser.login_user.user;
    });

    const { user_name } = useParams();

    const isMyChannel = username == user_name;

    const [imageUrl, setImageUrl] = useState(avatar.url);

    let buttonContent;
    if (!isMyChannel) {
        buttonContent = (
            <button className="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto">
                <span className="inline-block w-5">
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
                            d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                        ></path>
                    </svg>
                </span>
                <span className="group-focus/btn:hidden">Subscribe</span>
                <span className="hidden group-focus/btn:block">Subscribed</span>
            </button>
        );
    } else if (!edit) {
        buttonContent = (
            <button
                className="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"
                onClick={() => dispatch(setEdit(true))}
            >
                <span className="inline-block w-5">
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
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        ></path>
                    </svg>
                </span>
                Edit
            </button>
        );
    } else {
        buttonContent = (
            <button
                className="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"
                onClick={() => dispatch(setEdit(!edit))}
            >
                <span className="inline-block w-5">
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
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        ></path>
                    </svg>
                </span>
                View Channel
            </button>
        );
    }

    const navigator = useNavigate();

    const handleAvatarUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        for (let [k, v] of formData.entries()) {
            console.log(k, v);
        }

        const avatar = formData.get("avatar");

        if (!avatar || (avatar instanceof File && avatar.size === 0)) {
            toast.error("New Avatar in required.");
            return;
        }

        let toastId;
        let timeId;
        try {
            toastId = toast.loading("Updating the avatar...");

            timeId = setTimeout(() => {
                toast.dismiss(toastId);
                toast.error("Update took too long. Please try again.");
            }, 8000);

            const resp = await api.patch("/users/update-avatar", formData);

            console.log("User Avatar Updated Successfully :: ", resp.data);
            dispatch(updateAvatar(resp.data.payload.user.avatar.url));

            toast.success(
                resp.data.message || "Avatar Updated Successfully..."
            );

            navigator(`/channel/${user_name}`);
        } catch (error) {
            console.log(error);
            if (error.response) {
                console.error(
                    "Error in updating the avatar :: ",
                    error.response.data.message
                );
                toast.error(error.response.data.message || error.message);
            } else if (error.request) {
                console.error(
                    "Network Error :: Updating Avatar :: ",
                    error.message
                );
                toast(error.message || "Network Error");
            } else {
                console.error(error.message || "Something went wrong");
                toast.error(error.message || "Something went wrong");
            }
        } finally {
            toast.dismiss(toastId);
            clearTimeout(timeId);
        }
    };

    return (
        <div>
            <div className="flex flex-wrap gap-4 pb-4 pt-6">
                <div className=" relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2">
                    {edit && (
                        <Dialog>
                            <div>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="absolute text-purple-500 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center"
                                    >
                                        <svg
                                            xmlns="http:www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                            ></path>
                                        </svg>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="fixed lg:top-[25%] md:left-[30%] md:top-[30%] sm:top-[30%] sm:left-[25%] right-[5%] left-[5%]  lg:left-[40%] rounded-xl p-5 bg-neutral-800 sm:max-w-[425px] z-50">
                                    <form onSubmit={handleAvatarUpdate}>
                                        <DialogHeader className="space-y-1">
                                            <DialogTitle className="text-xl font-semibold">
                                                Edit Profile
                                            </DialogTitle>
                                            <DialogDescription className="text-sm text-muted-foreground">
                                                Update your profile details,
                                                including avatar. Click{" "}
                                                <span className="font-medium">
                                                    Save changes
                                                </span>{" "}
                                                when you’re done.
                                            </DialogDescription>
                                        </DialogHeader>

                                        <div className="grid gap-6 py-4">
                                            {/* Avatar Section */}
                                            <div className="flex items-center gap-4">
                                                <div className="relative flex flex-col">
                                                    <img
                                                        src={imageUrl}
                                                        alt="User avatar"
                                                        className="w-16 h-16 rounded-full object-cover border"
                                                    />
                                                    {/* Change Avatar button */}
                                                    <div>
                                                        <label
                                                            htmlFor="avatar-upload"
                                                            className="absolute bottom-0 right-0 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-primary text-white text-xs shadow"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 24 24"
                                                                fill="purple"
                                                                className="size-4"
                                                            >
                                                                <path d="M9.97.97a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06l-1.72-1.72v3.44h-1.5V3.31L8.03 5.03a.75.75 0 0 1-1.06-1.06l3-3ZM9.75 6.75v6a.75.75 0 0 0 1.5 0v-6h3a3 3 0 0 1 3 3v7.5a3 3 0 0 1-3 3h-7.5a3 3 0 0 1-3-3v-7.5a3 3 0 0 1 3-3h3Z" />
                                                                <path d="M7.151 21.75a2.999 2.999 0 0 0 2.599 1.5h7.5a3 3 0 0 0 3-3v-7.5c0-1.11-.603-2.08-1.5-2.599v7.099a4.5 4.5 0 0 1-4.5 4.5H7.151Z" />
                                                            </svg>
                                                        </label>
                                                        <input
                                                            id="avatar-upload"
                                                            type="file"
                                                            accept="image/*"
                                                            className="hidden"
                                                            name="avatar"
                                                            onChange={(e) => {
                                                                // handle avatar preview & upload
                                                                const file =
                                                                    e.target
                                                                        .files?.[0];
                                                                if (file) {
                                                                    const imageUrl =
                                                                        URL.createObjectURL(
                                                                            file
                                                                        );
                                                                    setImageUrl(
                                                                        imageUrl
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">
                                                        Profile Picture
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        Upload a JPG or PNG, max
                                                        5MB.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <DialogFooter className="flex justify-end gap-2">
                                            <DialogClose asChild>
                                                <Button variant="outline">
                                                    Cancel
                                                </Button>
                                            </DialogClose>
                                            <Button type="submit">
                                                Save changes
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </div>
                        </Dialog>
                    )}
                    <img
                        src={isMyChannel ? avatar.url : src}
                        alt="Channel"
                        className="h-full w-full"
                    />
                </div>
                <div className="mr-auto inline-block">
                    <h1 className="font-bol text-xl">{isMyChannel ? fullName : full_name}</h1>
                    <p className="text-sm text-gray-400">
                        @{isMyChannel ? username : userName}
                    </p>
                    <p className="text-sm text-gray-400">
                        {subscriberCount} Subscribers · {subscribed} Subscribed
                    </p>
                </div>
                <div className="inline-block">
                    <div className="inline-flex min-w-[145px] justify-end">
                        {buttonContent}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChannelUserAvatar;

ChannelUserAvatar.propTypes = {
    subscriberCount: PropTypes.number.isRequired,
    subscribed: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired
};
