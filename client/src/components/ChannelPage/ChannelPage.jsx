import React from "react";
import { Outlet, useParams } from "react-router";
import ChannelNavbar from "../ChannelNavBar/ChannelNavbar";
import CoverImage from "../CoverImage/CoverImage";
import ChannelUserAvatar from "../ChannelUserAvatar/ChannelUserAvatar";
import EditUserNavbar from "../EditUserNavBar/EditUserNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userService } from "../../service/user.service";
import { setUserChannelDetails } from "../../slice/userSlice";
import { setChannelInfo } from "../../slice/channelSlice";

function ChannelPage() {
    const { edit } = useSelector((state) => state.edit);
    const dispatch = useDispatch();
    //getting username from params.
    const params = useParams();
    const { user } = useSelector((state) => state.loginUser.login_user);
    const isOwner = user.username == params.username;

    const { userChannelDetails } = useSelector((state) => {
        console.log("state in the channelPage is :: ", state);
        return state.loginUser.login_user;
    });

    useEffect(() => {
        console.log("Channel Page mounted.........................");
        if (!userChannelDetails) {
            console.log(
                "The Channel is Owner and the userChannelDetails state is null"
            );
            (async () => {
                try {
                    const resp = await userService.getUserChannel(
                        user.username
                    );
                    console.log(
                        "Successfully got the channel info of user :: ",
                        resp
                    );
                    //set user channel info redux state persist.
                    dispatch(setUserChannelDetails(resp.payload));
                } catch (error) {
                    console.log("Error in fetching channel.", error);
                }
            })();
        } else if (!isOwner) {
            console.log("The Channel is not of Owner.");
            (async () => {
                try {
                    const resp = await userService.getUserChannel(
                        params.username
                    );
                    console.log("Fetched Channel Details :: ", resp);
                    dispatch(setChannelInfo(resp.payload));
                } catch (error) {
                    console.error(
                        "ERROR in fetching the Channel Details of Non User :: ",
                        error
                    );
                }
            })();
        }

    }, [params]);

    return (   
        <div>
            <div className="h-screen overflow-y-scroll scrollbar-hide bg-[#121212] text-white">
                <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
                    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
                        <CoverImage />
                        <div className="px-4 pb-4">
                            <ChannelUserAvatar />
                            {/* <ChannelNavbar /> */}
                            {edit ? <EditUserNavbar /> : <ChannelNavbar />}
                            <Outlet />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default ChannelPage;
