import { Provider } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import store from "./store/store";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { setNavigator } from "./Helper/navigate";

function App() {
    const navigate = useNavigate();

    useEffect(() => {
        setNavigator(navigate);
    }, [navigate]);

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
