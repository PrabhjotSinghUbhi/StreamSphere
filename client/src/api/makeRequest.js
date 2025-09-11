import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import getStoredState from "redux-persist/es/getStoredState";
import store from "../store/store";
import { LoginDialog } from "../components/Dialogs/LoginAlertDialog/LoginAlertDialog";

async function makeRequest(fn, options = {}) {
    const {
        showToast = true,
        successMessage = null,
        showErrorToast = true
    } = options;

    let loadingToast, timeId;

    try {
        if (showToast) {
            loadingToast = toast.loading("Loading...");
            timeId = setTimeout(() => toast.dismiss(loadingToast), 9000);
        }

        const res = await fn();

        if (loadingToast) {
            toast.dismiss(loadingToast);
            clearTimeout(timeId);
        }

        if (successMessage)
            toast.success(res.data.message || successMessage || "Success");

        return res.data;
    } catch (error) {
        if (loadingToast) {
            toast.dismiss(loadingToast);
            clearTimeout(timeId);
        }

        const message =
            error.response?.data?.message ||
            error.response?.data?.error ||
            (error.request ? "Network error. Try again." : "Unexpected error");

        const real_message =
            message &&
            !message.includes("undefined") &&
            !message.includes("TypeError")
                ? message
                : error?.response?.data?.error ||
                  (error?.request
                      ? "Network error. Try again."
                      : "Unexpected error");

        if (showErrorToast) toast.error(real_message);

        throw error;
    }
}

export { makeRequest };
