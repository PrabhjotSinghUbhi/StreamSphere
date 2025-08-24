import { useDispatch } from "react-redux";
import {
    removeUser,
    removeUserChannelDetails,
    removeUserChannelVideos
} from "../slice/userSlice";
import { useNavigate } from "react-router";
import { authService } from "../service/auth.service";
import { removeChannelInfo } from "../slice/channelSlice";

export function useLogout() {
    const dispatch = useDispatch();
    const navigator = useNavigate();

    return async function () {
        try {
            console.log("Logout Hook Called");

            const response = await authService.logout();

            dispatch(removeUser());
            dispatch(removeChannelInfo());
            dispatch(removeUserChannelDetails());
            dispatch(removeUserChannelVideos());
            navigator("/");
            console.log("response in logout hook :: ", response);
        } catch (error) {
            console.log("Error Occurred in Logout :: ", error);
        }
    };
}
