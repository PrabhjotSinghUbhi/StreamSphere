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
        <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />}>
                <Route path="channel/:user_id" element={<ChannelPage />}></Route>
            </Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />} />
        </Route>
    )
);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={route}></RouterProvider>
    </StrictMode>
);
