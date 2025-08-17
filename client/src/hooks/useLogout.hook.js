import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { api } from "../api/api";
import { removeUser } from "../slice/userSlice";
import { useNavigate } from "react-router";

export function useLogout() {
    const dispatch = useDispatch();
    const navigator = useNavigate();

    return async function () {
        let toast_id;
        let time_id;

        try {
            toast_id = toast.loading("Logging Out...");

            time_id = setTimeout(() => {
                toast.error("Couldn't logout. Please try again...");
            }, 5000);

            const response = await api.post("/users/logout");

            clearTimeout(time_id);

            console.log("User Logged out :: Successfully :: ", response);

            dispatch(removeUser());
            navigator("/");
            toast.success(
                response.data.payload.message ||
                    "User Logged out successfully..."
            );
        } catch (error) {
            clearTimeout(time_id);
            console.error("Error in logout :: ", error);
            if (error.response) {
                console.error(
                    "Error Response :: ",
                    error.response.payload.message
                );
                toast.error(error.response.payload.message || error.message);
            } else {
                console.error(
                    "Something went wrong :: Logout :: ",
                    error.message
                );
                toast.error(error.message || "Something went wrong.");
            }
        } finally {
            toast.dismiss(toast_id);
        }
    };
}
