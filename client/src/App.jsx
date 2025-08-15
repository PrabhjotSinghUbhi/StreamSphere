import { Provider } from "react-redux";
import { Outlet } from "react-router";
import store from "./store/store";

function App() {
    return (
        <Provider store={store}>
            <div className="h-screen overflow-y-auto bg-[#121212] text-white">
                <Outlet />
            </div>
        </Provider>
    );
}

export default App;
