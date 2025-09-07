import React, { useRef } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useLogout } from "../../hooks/useLogout.hook";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { userService } from "../../service/user.service";

function ChangeUserPassword() {
    const logout = useLogout();
    const formRef = useRef(null);

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            const resp = await userService.changePassword(formData);

            logout();
        } catch (error) {
            console.error("Error in Updating password :: ", error);
        }
    };

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
                                    <form
                                        ref={formRef}
                                        onSubmit={handlePasswordChange}
                                        className="rounded-lg border"
                                    >
                                        <div className="flex flex-wrap gap-y-4 p-4">
                                            <div className="w-full">
                                                <Label
                                                    className="mb-1 inline-block"
                                                    htmlFor="old-pwd"
                                                >
                                                    Current password
                                                </Label>
                                                <Input
                                                    type="password"
                                                    className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                                                    id="old-pwd"
                                                    placeholder="Current password"
                                                    name="oldPassword"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <Label
                                                    className="mb-1 inline-block"
                                                    htmlFor="new-pwd"
                                                >
                                                    New password
                                                </Label>
                                                <Input
                                                    type="password"
                                                    className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                                                    id="new-pwd"
                                                    placeholder="New password"
                                                    name="newPassword"
                                                />
                                                <p className="mt-0.5 text-sm text-gray-300">
                                                    Your new password must be
                                                    more than 8 characters.
                                                </p>
                                            </div>
                                            <div className="w-full">
                                                <Label
                                                    className="mb-1 inline-block"
                                                    htmlFor="cnfrm-pwd"
                                                >
                                                    Confirm password
                                                </Label>
                                                <Input
                                                    type="password"
                                                    className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                                                    id="cnfrm-pwd"
                                                    placeholder="Confirm password"
                                                    name="confirmPassword"
                                                />
                                            </div>
                                        </div>
                                        <hr className="border border-gray-300" />
                                        <div className="flex items-center justify-end gap-4 p-4">
                                            <Button className="inline-block rounded-lg border px-3 py-1.5 hover:bg-white/10">
                                                Cancel
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="outline">
                                                        Update Password
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            Are you absolutely
                                                            sure?
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action will
                                                            update your account
                                                            password. You’ll
                                                            need to use the new
                                                            password the next
                                                            time you log in.
                                                            Make sure to choose
                                                            a strong and secure
                                                            password.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>
                                                            Cancel
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() =>
                                                                formRef.current.requestSubmit()
                                                            }
                                                        >
                                                            continue
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </form>
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
