import { useNavigate } from "react-router";
import { authService } from "../service/auth.service";

export function useLogout() {
    const navigator = useNavigate();

    return async function () {
        try {
            console.log("Logout Hook Called");

            const response = await authService.logout();

            navigator("/");
            console.log("response in logout hook :: ", response);
        } catch (error) {
            console.log("Error Occurred in Logout :: ", error);
        }
    };
}
