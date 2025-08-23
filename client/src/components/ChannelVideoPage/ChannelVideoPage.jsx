import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import MyChannelEmptyVideoPage from "../MyChannelEmptyVideoPage/MyChannelEmptyVideoPage";
import ChannelNoVideos from "../ChannelNoVideos/ChannelNoVideos";

function ChannelVideoPage() {
    const params = useParams();
    const { user } = useSelector((state) => state.loginUser.login_user);

    const isOwner = params.username === user.username;
    const videos = [];

    if (isOwner && videos.length === 0) {
        return <MyChannelEmptyVideoPage />;
    }

    if (videos.length === 0) {
        return <ChannelNoVideos />;
    }

    return <div></div>;
}

export default ChannelVideoPage;
