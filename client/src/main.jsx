import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from "react-router";
import {
    Login,
    Layout,
    Register,
    Home,
    EmptyVideoPage,
    SearchResultVideos,
    VideoDetailPage,
    NotFound,
    ChannelPage,
    ChannelNoVideos,
    EmptyPlayList,
    ChannelPlayList,
    PlayListPage,
    ChannelEmptyTweets,
    ChannelTweets,
    ChannelEmptySubscribers,
    ChannelSubscriberPage,
    MyChannelEmptyVideoPage,
    UploadVideos,
    UploadingFileLoader,
    UploadedSuccessfully,
    MyChannelVideoUpload,
    MyChannelTweets,
    EditInfoPage,
    EditPersonalInfo,
    EditChannelInfo,
    ChangeUserPassword,
    Admin,
    EditVideoPopUp,
    DeleteVideoPopUp,
    PrivacyPolicyPage,
    TermsAndCondition
} from "./components/index.js";

const route = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="/" element={<Layout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/empty" element={<EmptyVideoPage />} />
                <Route path="/search" element={<SearchResultVideos />} />
                <Route path="/video" element={<VideoDetailPage />} />
                <Route path="/playlist" element={<PlayListPage />} />
                <Route path="/channel" element={<ChannelPage />}>
                    <Route path="empty-videos" element={<ChannelNoVideos />} />
                    <Route path="videos" element={<Home />} />
                    <Route path="empty-playlist" element={<EmptyPlayList />} />
                    <Route path="playlists" element={<ChannelPlayList />} />
                    <Route path="no-tweets" element={<ChannelEmptyTweets />} />
                    <Route path="tweets" element={<ChannelTweets />} />
                    <Route
                        path="no-subscribers"
                        element={<ChannelEmptySubscribers />}
                    />
                    <Route
                        path="subscribers"
                        element={<ChannelSubscriberPage />}
                    />
                </Route>
                <Route
                    path="/my-channel"
                    element={<ChannelPage isMyChannel={true} />}
                >
                    <Route
                        path="video-upload"
                        element={<MyChannelVideoUpload />}
                    />
                    <Route path="upload-popup" element={<UploadVideos />} />
                    <Route
                        path="no-videos"
                        element={<MyChannelEmptyVideoPage />}
                    />
                    <Route path="uploading" element={<UploadingFileLoader />} />
                    <Route
                        path="uploaded-successfully"
                        element={<UploadedSuccessfully />}
                    />
                    <Route path="tweets" element={<MyChannelTweets />} />
                    <Route
                        path="edit/personal-info"
                        element={<EditPersonalInfo />}
                    />
                    <Route
                        path="edit/channel-info"
                        element={<EditChannelInfo />}
                    />
                    <Route
                        path="edit/change-password"
                        element={<ChangeUserPassword />}
                    />
                </Route>
            </Route>
            <Route path="/admin" element={<Admin />}>
                <Route path="edit-video" element={<EditVideoPopUp />} />
                <Route path="delete-video" element={<DeleteVideoPopUp />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-and-conditions" element={<TermsAndCondition />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    )
);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={route}></RouterProvider>
    </StrictMode>
);
