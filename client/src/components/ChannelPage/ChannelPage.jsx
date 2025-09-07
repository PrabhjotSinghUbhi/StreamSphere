import { Outlet, useParams } from "react-router";
import ChannelNavbar from "../ChannelNavbar/ChannelNavbar";
import CoverImage from "../CoverImage/CoverImage";
import ChannelUserAvatar from "../ChannelUserAvatar/ChannelUserAvatar";
import EditUserNavbar from "../EditUserNavBar/EditUserNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchChannelInfo } from "../../slice/channelSlice";
import ChannelPageLoader from "../ChannelLoader/ChannelLoader";
import { setEdit } from "../../slice/editSlice";

function ChannelPage() {
    const { edit } = useSelector((state) => state.edit);
    const dispatch = useDispatch();
    //getting username from params.
    const params = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                if (params.username) {
                    dispatch(fetchChannelInfo(params.username));
                }
            } catch (error) {
                console.error("Error in fetching the channel info :: ", error);
            } finally {
                setLoading(false);
            }
        })();
        return () => {
            dispatch(setEdit(false));
        };
    }, [params.username, dispatch]);

    if (loading) {
        return <ChannelPageLoader />;
    }

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
