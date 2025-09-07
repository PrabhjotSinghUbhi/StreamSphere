import { useNavigate } from "react-router";
import { authService } from "../service/auth.service";

export function useLogout() {
    const navigator = useNavigate();

    return async function () {
        try {
            await authService.logout();
            navigator("/login");
        } catch (error) {
            console.error("Error Occurred in Logout :: ", error);
        }
    };
}
