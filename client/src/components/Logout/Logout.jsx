import React from "react";
import { Button } from "../ui/button";
import { useLogout } from "../../hooks/useLogout.hook";

function Logout() {
    const handleLogout = useLogout();

    return (
        <Button
            variant="destructive"
            className="rounded-full px-4 py-2 text-sm font-medium 
        shadow-md hover:scale-105 transition"
            onClick={handleLogout}
        >
            Logout
        </Button>
    );
}

export default Logout;
