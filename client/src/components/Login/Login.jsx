import PropTypes from "prop-types";
import Logo from "../Logo";
import { Link, useNavigate } from "react-router";
import { api } from "../../api/api";
import { useDispatch } from "react-redux";
import { setUser } from "../../slice/userSlice";
import toast from "react-hot-toast";
import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardAction,
    CardDescription,
    CardContent
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

function Login() {
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const [disable, setDisable] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        console.log(
            "Formdata :: ",
            formData.forEach((element) => console.log(element))
        );

        let toast_id;
        let time_id;

        try {
            toast_id = toast.loading("Logging in...");
            setDisable(true);
            time_id = setTimeout(() => {
                toast.dismiss(toast_id);
                toast.error("Logging took too long. Please try again...");
            }, 5000);

            const resp = await api.post("/users/login", formData);

            if (resp) {
                console.log("User Logged in Successfully :: ", resp);
                toast.success("User Logged in successfully.");
                dispatch(setUser(resp.data.payload.foundUser));
                console.log("user dispatched successfully");
                navigator(`/channel/${resp.data.payload.foundUser.username}`);
            }
        } catch (error) {
            console.error("Error Logging In :: ", error);
            if (error.response) {
                toast.error(error.response.data.message || error.message);
                console.error("Error Response :: ", error.response.message);
            } else if (error.request) {
                toast.error(error.message || "Network Error");
                console.error("Error in Request :: ", error.message);
            } else {
                toast.error("Something went wrong");
                console.error("Something Went wrong", error.message);
            }
        } finally {
            toast.dismiss(toast_id);
            clearTimeout(time_id);
            setDisable(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-full max-w-sm bg-neutral-900">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                    <CardAction>
                        <Button
                            onClick={() => navigator("/register")}
                            variant="link"
                        >
                            Sign Up
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <Link
                                        to="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="* * * * * * * *"
                                    required
                                />
                                <div className="pt-5">
                                    <Button
                                        type="submit"
                                        className={`w-full cursor-pointer ${
                                            disable ? "pointer-events-none" : ""
                                        }`}
                                        disabled={disable}
                                    >
                                        Login
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2"></CardFooter>
            </Card>
        </div>
    );
}

export default Login;
