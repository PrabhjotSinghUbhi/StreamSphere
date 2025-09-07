import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { userService } from "../../service/user.service";
import { updateFullName } from "../../slice/userSlice";

function EditPersonalInfo() {
    const { fullName, email } = useSelector(
        (state) => state.loginUser.login_user.user
    );

    const [name, setName] = useState(fullName);
    const [mail, setMail] = useState(email);

    const dispatch = useDispatch();

    const handleChangeInfo = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const fullName = formData.get("fullName");
        const email = formData.get("email");
        if (!formData || (fullName.size === 0 && email.size === 0)) {
            toast.error("fields are required...");
            throw new Error("fields are required...");
        }

        try {
            const resp = await userService.updateAccountDetails(formData);
            dispatch(updateFullName(resp.payload.user.fullName));
        } catch (error) {
            console.error("Error in Updating User Info :: ", error);
            toast.error(
                error.response.data.message || "Something went wrong..."
            );
        }
    };

    return (
        <div>
            <div className="flex flex-wrap justify-center gap-y-4 py-4">
                <div className="w-full sm:w-1/2 lg:w-1/3">
                    <h5 className="font-semibold">Personal Info</h5>
                    <p className="text-gray-300">
                        Update your photo and personal details.
                    </p>
                </div>
                <div className="w-full sm:w-1/2 lg:w-2/3">
                    <form
                        onSubmit={handleChangeInfo}
                        className="rounded-lg border"
                    >
                        <div className="flex flex-wrap gap-y-4 p-4">
                            <div className="w-full lg:w-1/2 lg:pr-2">
                                <label
                                    htmlFor="name"
                                    className="mb-1 inline-block"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                                    id="fullName"
                                    placeholder="Enter first name"
                                    value={name}
                                    name="fullName"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="w-full">
                                <Label
                                    htmlFor="email"
                                    className="mb-1 inline-block"
                                >
                                    Email address
                                </Label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-300">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                                            ></path>
                                        </svg>
                                    </div>
                                    <input
                                        type="email"
                                        className="w-full rounded-lg border bg-transparent py-1.5 pl-10 pr-2"
                                        id=""
                                        name="email"
                                        placeholder="Enter email address"
                                        value={mail}
                                        onChange={(e) =>
                                            setMail(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <hr className="border border-gray-300" />
                        <div className="flex items-center justify-end gap-4 p-4">
                            <button
                                type="reset"
                                className="cursor-pointer inline-block rounded-lg border px-3 py-1.5 hover:bg-white/10"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="cursor-pointer inline-block bg-[#ae7aff] px-3 py-1.5 text-black"
                            >
                                Save changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditPersonalInfo;
