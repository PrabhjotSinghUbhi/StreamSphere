import React from "react";
import { Header, Login, Register, Sidebar, EmptyVideoPage } from "../index";
import { Outlet } from "react-router";

function Layout() {
    return (
        <div className="h-screen overflow-y-scroll scrollbar-hide bg-[#121212] text-white">
            <Header />
            <div className="flex">
                <Sidebar />
                <div className="w-full scrollbar-hide">
                    {/* <Outlet /> */}
                </div> 
            </div>
        </div>
    );
}

export default Layout;
