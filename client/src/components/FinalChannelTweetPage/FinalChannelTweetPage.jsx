import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import MyChannelTweets from "../MyChannelTweets/MyChannelTweets";
import ChannelTweets from "../ChannelTweets/ChannelTweets";

function FinalChannelTweetPage() {
    const params = useParams();
    const { username } = useSelector(
        (state) => state?.loginUser?.login_user?.user
    );

    const isMyChannel = params?.username === username; // replace "mychannel" with actual logged-in username logic

    if (isMyChannel) {
        return <MyChannelTweets />;
    } else {
        return <ChannelTweets />;
    }
}

export default FinalChannelTweetPage;
