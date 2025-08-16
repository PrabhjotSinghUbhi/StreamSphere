import { Provider } from "react-redux";
import { Outlet } from "react-router";
import store from "./store/store";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <Provider store={store}>
            <Toaster />
            <div className="h-screen overflow-y-auto bg-[#121212] text-white">
                <Outlet />
            </div>
        </Provider>
    );
}

export default App;
