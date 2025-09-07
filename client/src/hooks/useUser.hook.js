import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "../api/api";

export function useUser(_id) {
    const [user, setUser] = useState();

    async function fetchUser() {
        try {
            const resp = await api.get(`/users/get-user/${_id}`);

            toast.success("Successful");
            setUser(resp.data.payload);
        } catch (error) {
            console.error(error);
            toast.error(
                error?.response?.data?.message ||
                    error.message ||
                    "Something went wrong."
            );
        }
    }

    return { user, fetchUser };
}
