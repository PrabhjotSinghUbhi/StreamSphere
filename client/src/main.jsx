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
    TermsAndCondition,
    LikedVideosPage,
    SubscriberList,
    WatchHistoryPage,
    MyPlaylistPage,
    FinalChannelTweetPage,
    SettingsComponent,
    SupportComponent
} from "./components/index.js";
import { Provider } from "react-redux";
import store from "./store/store.js";
import ChannelVideoPage from "./components/MyChannelVideoPage/MyChannelVideoPage.jsx";
import Test from "./components/Test.jsx";
import WatchLaterVideos from "./components/WatchLaterVideos/WatchLaterVideos.jsx";
import ErrorBoundary from "./components/Error/ErrorBoundary.jsx";
import RouteError from "./components/RouteError/RouteError.jsx";

const route = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />} errorElement={<RouteError />}>
            <Route path="/" element={<Layout />} errorElement={<RouteError />}>
                <Route
                    path="/"
                    element={<Home />}
                    errorElement={<RouteError />}
                />
                <Route
                    path="/playlist/:playlistId"
                    element={<PlayListPage />}
                    errorElement={<RouteError />}
                />
                <Route
                    path="/liked-videos"
                    element={<LikedVideosPage />}
                    errorElement={<RouteError />}
                />
                <Route
                    path="/my-playlists"
                    element={<MyPlaylistPage />}
                    errorElement={<RouteError />}
                />
                <Route
                    path="/watch-later"
                    element={<WatchLaterVideos />}
                    errorElement={<RouteError />}
                />
                <Route
                    path="/subscribers"
                    element={<SubscriberList />}
                    errorElement={<RouteError />}
                />
                <Route
                    path="/watch-history"
                    element={<WatchHistoryPage />}
                    errorElement={<RouteError />}
                />
                <Route
                    path="/video/:video_id"
                    element={<VideoDetailPage />}
                    errorElement={<RouteError />}
                />
                <Route
                    path="channel/:username"
                    element={<ChannelPage errorElement={<RouteError />} />}
                >
                    <Route
                        path="change-password"
                        element={<ChangeUserPassword />}
                        errorElement={<RouteError />}
                    />
                    <Route
                        path="subscribed"
                        element={<ChannelSubscriberPage />}
                        errorElement={<RouteError />}
                    />
                    <Route
                        path="videos"
                        element={<ChannelVideoPage />}
                        errorElement={<RouteError />}
                    />
                    <Route
                        path="playlists"
                        element={<ChannelPlayList />}
                        errorElement={<RouteError />}
                    />
                    <Route
                        path="change-info"
                        element={<EditPersonalInfo />}
                        errorElement={<RouteError />}
                    />
                    <Route
                        path="tweets"
                        element={<FinalChannelTweetPage />}
                        errorElement={<RouteError />}
                    />
                </Route>
            </Route>
            <Route
                path="/login"
                element={<Login />}
                errorElement={<RouteError />}
            ></Route>
            <Route
                path="/register"
                element={<Register />}
                errorElement={<RouteError />}
            />
            <Route
                path="*"
                element={<NotFound />}
                errorElement={<RouteError />}
            />
            <Route
                path="/terms"
                element={<TermsAndCondition />}
                errorElement={<RouteError />}
            />
            <Route
                path="/policy"
                element={<PrivacyPolicyPage />}
                errorElement={<RouteError />}
            />
            <Route
                path="/test"
                element={<Test />}
                errorElement={<RouteError />}
            />
            <Route path="/settings" element={<SettingsComponent />} />
            <Route path="/support" element={<SupportComponent />} />
        </Route>
    )
);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ErrorBoundary>
            <Provider store={store}>
                <RouterProvider router={route}></RouterProvider>
            </Provider>
        </ErrorBoundary>
    </StrictMode>
);
