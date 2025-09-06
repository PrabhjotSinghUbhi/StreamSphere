export const useFormatDuration = () => {
    const formatDuration = (seconds) => {
        if (!seconds || isNaN(seconds)) return "0:00";

        const totalSeconds = Math.floor(seconds);
        const minutes = Math.floor(totalSeconds / 60);
        const remainingSeconds = totalSeconds % 60;

        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    const formatTime = (timestamp) => {
        if (!timestamp) return "";

        const now = new Date();
        const commentTime = new Date(
            typeof timestamp === "number" ? timestamp * 1000 : timestamp
        );
        let diffInSeconds = Math.floor((now - commentTime) / 1000);

        if (diffInSeconds < 0) diffInSeconds = 0; // handle future timestamps

        const minutes = Math.floor(diffInSeconds / 60);
        const hours = Math.floor(diffInSeconds / 3600);
        const days = Math.floor(diffInSeconds / 86400);
        const weeks = Math.floor(diffInSeconds / 604800);
        const months = Math.floor(diffInSeconds / 2592000); // ~30 days
        const years = Math.floor(diffInSeconds / 31536000);

        if (diffInSeconds < 60) return "just now";
        if (minutes < 60)
            return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
        if (hours < 24) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
        if (days < 7) return `${days} ${days === 1 ? "day" : "days"} ago`;
        if (weeks < 5) return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
        if (months < 12)
            return `${months} ${months === 1 ? "month" : "months"} ago`;
        return `${years} ${years === 1 ? "year" : "years"} ago`;
    };

    const formatViews = (views) => {
        if (!views) return "0";
        if (views >= 1000000) {
            return `${(views / 1000000).toFixed(1)}M`;
        }
        if (views >= 1000) {
            return `${(views / 1000).toFixed(1)}K`;
        }
        return views.toString();
    };

    const formatSubscribers = (count) => {
        if (!count) return "0";
        if (count >= 1000000) {
            return `${(count / 1000000).toFixed(1)}M`;
        }
        if (count >= 1000) {
            return `${(count / 1000).toFixed(1)}K`;
        }
        return count.toString();
    };

    return { formatDuration, formatTime, formatViews, formatSubscribers };
};
