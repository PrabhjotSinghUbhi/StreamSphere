import { api } from "../api/api";
import { makeRequest } from "../api/makeRequest";

export const authService = {
    login: (formData) => {
        return makeRequest(() => api.post("/users/login", formData), {
            successMessage: "User logged in successfully!"
        });
    },

    register: (formData) => {
        return makeRequest(() => api.post("/users/register", formData));
    },

    logout: () => {
        return makeRequest(() => api.post("/users/logout"));
    }
};
