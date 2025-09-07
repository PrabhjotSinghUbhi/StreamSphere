import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    // This updates state when an error occurs
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    // Optional: log the error to an external service
    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
        // You can send this to a logging service
    }

    render() {
        if (this.state.hasError) {
            // Fallback UI
            return (
                <div style={{ padding: "2rem", textAlign: "center" }}>
                    <h1>Something went wrong 😢</h1>
                    <p>{this.state.error?.message}</p>
                </div>
            );
        }

        // If no error, render children normally
        return this.props.children;
    }
}

export default ErrorBoundary;
