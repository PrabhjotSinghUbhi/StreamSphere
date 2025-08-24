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
import { Provider } from "react-redux";
import store from "./store/store.js";
import ChannelVideoPage from "./components/MyChannelVideoPage/MyChannelVideoPage.jsx";

const route = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Home />}></Route>
                <Route path="/video/:video_id" element={<VideoDetailPage />} />
                <Route path="channel/:username" element={<ChannelPage />}>
                    <Route
                        path="change-password"
                        element={<ChangeUserPassword />}
                    />
                    <Route
                        path="subscribed"
                        element={<ChannelSubscriberPage />}
                    />
                    <Route path="" element={<ChannelVideoPage />} />
                    <Route path="change-info" element={<EditPersonalInfo />} />
                </Route>
            </Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/terms" element={<TermsAndCondition />} />
            <Route path="/policy" element={<PrivacyPolicyPage />} />
        </Route>
    )
);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={route}></RouterProvider>
        </Provider>
    </StrictMode>
);
