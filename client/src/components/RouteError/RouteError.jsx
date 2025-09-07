// src/components/Error/RouteError.jsx
import React from "react";

export default function RouteError({ error }) {
    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
            <h1>Oops! Something went wrong on this page 😢</h1>
            <p>{error?.message || "Please try again later."}</p>
        </div>
    );
}
