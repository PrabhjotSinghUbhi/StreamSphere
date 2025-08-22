import { useDispatch } from "react-redux";
import { removeUser } from "../slice/userSlice";
import { useNavigate } from "react-router";
import { authService } from "../service/auth.service";
import { removeChannel } from "../slice/channelSlice";

export function useLogout() {
    const dispatch = useDispatch();
    const navigator = useNavigate();

    return async function () {
        try {
            console.log("Logout Hook Called");

            const response = await authService.logout();

            dispatch(removeUser());
            dispatch(removeChannel());
            navigator("/");
            console.log("response in logout hook :: ", response);
        } catch (error) {
            console.log("Error Occurred in Logout :: ", error);
        }
    };
}
