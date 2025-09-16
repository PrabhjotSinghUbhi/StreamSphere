import axios from "axios";
import { removeUser } from "../slice/userSlice";
import store from "../store/store";
import { navigate } from "../Helper/navigate";

export const api = axios.create({
    baseURL: "https://streamsphere-b4it.onrender.com/api/v1",
    withCredentials: true
});

api.interceptors.response.use(
    (resp) => resp,
    async (error) => {
        //save the error response for retry.
        const originalRequestResponse = error.config;

        //handles unauthorized request errors.
        if (error.response?.status === 401 && !originalRequestResponse._retry) {
            originalRequestResponse._retry = true;
            console.error("Error caught by the Interceptor :: ", error);

            try {
                await api.post(`/users/refresh-token`);
                return api(originalRequestResponse);
            } catch (error) {
                console.error("Things got in the catch og interceptor.");
                console.error("Error in Refreshing User", error.message);

                if (error.response) {
                    console.error(
                        "Error in Response :: ",
                        error.response.data.message ||
                            "Something went wrong in response"
                    );
                } else if (error.request) {
                    console.error(
                        "Network Error in Refreshing User :: ",
                        error.message
                    );
                } else {
                    console.error(
                        "Something went wrong in refreshing Tokens :: ",
                        error.message
                    );
                }
                navigate("/login");
                store.dispatch(removeUser());
                return Promise.reject(error);
            }
        }

        // handles general errors.
        if (error.response) {
            console.error("API ERROR :: ", error.response.data.message);
        } else if (error.request) {
            console.error("Network error. Please check connection.");
        } else {
            console.error("Error:", error.message);
        }

        return Promise.reject(error);
    }
);
