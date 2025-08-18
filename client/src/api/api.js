import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    withCredentials: true
});

api.interceptors.response.use(
    (resp) => resp,
    async (error) => {
        //save the error response for retry.
        const originalRequestResponse = error.config;
        console.log("Error Intercepted.");

        if (error.response?.status === 401 && !originalRequestResponse._retry) {
            originalRequestResponse._retry = true;

            console.log("Error caught by the interceptor.");
            

            try {
                console.log("Interceptor sending request.");
                const resp = await axios.post(
                    "http://localhost:8000/api/v1/users/refresh-token",
                    {},
                    { withCredentials: true }
                );
                console.log(
                    "Access Token Refreshed successfully :: ",
                    resp.data
                );
                return api(originalRequestResponse);
            } catch (error) {
                console.log("Error in Refreshing User", error);
                window.location.href = "/login";
                if (error.response) {
                    console.error(
                        "Error in Response :: ",
                        error.response.message ||
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
                return Promise.reject(error);
            }
        }

        return Promise.reject(error)
    }
);
