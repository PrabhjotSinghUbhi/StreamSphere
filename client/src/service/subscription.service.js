import { api } from "../api/api";
import { makeRequest } from "../api/makeRequest";

export const subscriptionService = {
    toggleSubscription: (channelId) => {
        return makeRequest(() => api.post(`/subscribe/${channelId}`), {
            successMessage: "Subscription updated"
        });
    },
    getSubscriptions: (userId) => {
        return makeRequest(() => api.get(`/subscribe/${userId}/subscriptions`));
    },
    getSubscribers: (channelId) => {
        return makeRequest(() =>
            api.get(`/subscribe/${channelId}/subscribers`)
        );
    }
};
