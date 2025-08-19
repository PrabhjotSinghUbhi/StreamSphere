import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger
} from "../ui/dialog";
import { Button } from "../ui/button";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import toast from "react-hot-toast";
import { api } from "../../api/api";
import { updateCover } from "../../slice/userSlice";
import { useParams } from "react-router";

function CoverImage({ src }) {
    const { coverImage } = useSelector(
        (state) => state.loginUser.login_user.user
    );
    const edit = useSelector((state) => state.edit.edit);
    const [imageUrl, setImageUrl] = useState(coverImage?.url || null);
    const [statusButton, setStatusButton] = useState(false);
    const dispatch = useDispatch();

    const handleCoverImageUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        console.log("FORM___________________________-");
        for (let [K, V] of formData.entries()) {
            console.log(K, V);
        }
        const coverImage = formData.get("coverImage");
        if (
            !coverImage ||
            (coverImage instanceof File && coverImage.size === 0)
        ) {
            toast.error("New Cover Image is required.");
            return;
        }
        let toast_id;
        let time_id;
        try {
            toast_id = toast.loading("Updating Cover Image...");
            time_id = setTimeout(() => {
                toast.dismiss(toast_id);
                toast.error("Update took too long, Please try again");
            }, 10000);
            const resp = await api.patch("/users/update-cover-image", formData);
            console.log("CoverImage updated successfully.", resp.data);
            toast.success(
                resp.data.message || "Cover Image Updated Successfully."
            );
            setStatusButton(true);
            dispatch(updateCover(resp.data.payload.user.coverImage.url));
        } catch (error) {
            console.log(error);
            toast.dismiss(toast_id);
            clearTimeout(time_id);
            if (error.response) {
                console.error(
                    "Error in updating the Cover Image :: ",
                    error.response.data.message
                );
                toast.error(error.response.data.message || error.message);
            } else if (error.request) {
                console.error(
                    "Network Error :: Updating Cover Image :: ",
                    error.message
                );
                toast(error.message || "Network Error");
            } else {
                console.error(error.message || "Something went wrong");
                toast.error(error.message || "Something went wrong");
            }
        } finally {
            toast.dismiss(toast_id);
            clearTimeout(time_id);
        }
    };

    const { user_name } = useParams();
    const { username } = useSelector(state => state.loginUser.login_user.user);

    const isOwner = username == user_name;

    return (
        <div>
            <div className="relative min-h-[290px] w-full pt-[16.28%]">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src={isOwner ? coverImage?.url : src}
                        alt="cover-photo"
                        className="w-full h-full object-cover object-center"
                        onError={(e) => (e.target.src = "/default-cover.jpg")}
                    />
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
                                <DialogContent className="fixed  rounded-xl p-5 bg-neutral-800 sm:max-w-[425px] z-50">
                                    <form onSubmit={handleCoverImageUpdate}>
                                        <DialogHeader className="space-y-1">
                                            <DialogTitle className="text-xl font-semibold">
                                                Edit Cover Image
                                            </DialogTitle>
                                            <DialogDescription className="text-sm text-muted-foreground">
                                                Upload a new cover image for
                                                your profile. Click{" "}
                                                <span className="font-medium">
                                                    Save changes
                                                </span>{" "}
                                                when you’re done.
                                            </DialogDescription>
                                        </DialogHeader>

                                        <div className="grid gap-6 py-4">
                                            {/* Cover Image Section */}
                                            <div className="flex flex-col gap-2">
                                                <div className="relative w-full h-40 rounded-md border border-border overflow-hidden bg-muted">
                                                    {imageUrl ? (
                                                        <img
                                                            src={imageUrl}
                                                            alt="Cover"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                                                            No cover image
                                                            uploaded
                                                        </div>
                                                    )}

                                                    <Label
                                                        htmlFor="cover-upload"
                                                        className="absolute bottom-2 right-2 cursor-pointer rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow hover:bg-primary/90"
                                                    >
                                                        Change
                                                    </Label>
                                                    <Input
                                                        id="cover-upload"
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        name="coverImage"
                                                        onChange={(e) => {
                                                            const file =
                                                                e.target
                                                                    .files?.[0];
                                                            if (file) {
                                                                const url =
                                                                    URL.createObjectURL(
                                                                        file
                                                                    );
                                                                setImageUrl(
                                                                    url
                                                                );
                                                            }
                                                        }}
                                                        onError={(e) =>
                                                            (e.target.src =
                                                                "/user.png")
                                                        }
                                                    />
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    Recommended size:
                                                    1200×300px. JPG or PNG only.
                                                </p>
                                            </div>
                                        </div>

                                        <DialogFooter className="flex justify-end gap-2">
                                            <DialogClose asChild>
                                                {statusButton ? (
                                                    <Button variant={"success"}>
                                                        Done
                                                    </Button>
                                                ) : (
                                                    <Button variant="outline">
                                                        Cancel
                                                    </Button>
                                                )}
                                            </DialogClose>
                                            <Button
                                                variant={"default"}
                                                type="submit"
                                            >
                                                Save changes
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </div>
                        </Dialog>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CoverImage;
