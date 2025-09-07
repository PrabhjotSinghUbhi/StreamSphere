import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import MyChannelEmptyVideoPage from "../MyChannelEmptyVideoPage/MyChannelEmptyVideoPage";
import ChannelNoVideos from "../ChannelNoVideos/ChannelNoVideos";
import VideoGrid from "../VideoGrid/VideoGrid";
import { userChannelVideos } from "../../slice/userSlice.js";
import { videoService } from "../../service/video.service.js";

function MyChannelVideoPage() {
    const loginUser = useSelector((state) => state.loginUser.login_user);
    const { userVideos = [] } = loginUser;
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                const resp = await videoService.getChannelVideo(
                    params.username
                );
                dispatch(userChannelVideos(resp.payload));
            } catch (error) {
                console.error("Error in Fetching the channel :: ", error);
            }
        })();
    }, []);

    if (userVideos?.length == 0) {
        return <MyChannelEmptyVideoPage />;
    }

    return <VideoGrid />;
}

export default MyChannelVideoPage;
