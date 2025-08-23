import { api } from "../api/api";
import { makeRequest } from "../api/makeRequest";

export const subscriptionService = {
    createSubscription: (channel) => {
        return makeRequest(
            () => api.post(`subscribe/add-subscriber/${channel}`),
            {
                successMessage: "Subscribed"
            }
        );
    },

    deleteSubscription: (channel) => {
        return makeRequest(
            () => api.delete(`/subscribe/delete-subscriber/${channel}`),
            {
                successMessage: "Unsubscribed"
            }
        );
    }
};
