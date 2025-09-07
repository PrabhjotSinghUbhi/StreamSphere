import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUser } from "../../slice/userSlice";
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
import { authService } from "../../service/auth.service";

function Login() {
    const dispatch = useDispatch();
    const navigator = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        try {
            const resp = await authService.login(formData);
            dispatch(setUser(resp.payload.foundUser));
            navigator("/");
        } catch (error) {
            console.error("ERROR LOGIN USER :: ", error);
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
                                        className={`w-full cursor-pointer`}
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
