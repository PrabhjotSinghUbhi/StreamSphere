import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useState } from "react";
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
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const formData = new FormData(e.target);

        try {
            const resp = await authService.login(formData);
            dispatch(setUser(resp.payload.foundUser));
            navigate("/");
        } catch (err) {
            console.error("Login error:", err);
            setError("Invalid email or password. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
                <Card className="bg-neutral-900/95 backdrop-blur-sm border-neutral-700 shadow-2xl">
                    <CardHeader className="space-y-4 text-center px-4 sm:px-6 pt-6 sm:pt-8">
                        <div className="space-y-2">
                            <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold flex justify-center text-white tracking-tight">
                                <img
                                    src="https://res.cloudinary.com/prabhjotsingh/image/upload/v1757937893/croppedLogo_yjocsl.png"
                                    alt="logo"
                                    height={200}
                                    width={200}
                                />
                            </CardTitle>
                            <CardDescription className="text-sm sm:text-base text-neutral-400">
                                Sign in to your account to continue
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                        {error && (
                            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                                <p className="text-red-400 text-sm text-center font-medium">
                                    {error}
                                </p>
                            </div>
                        )}

                        <form
                            onSubmit={handleLogin}
                            className="space-y-4 sm:space-y-5"
                        >
                            <div className="space-y-2">
                                <Label
                                    htmlFor="email"
                                    className="text-sm sm:text-base font-medium text-neutral-200"
                                >
                                    Email Address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    required
                                    autoComplete="email"
                                    className="h-10 sm:h-11 px-3 sm:px-4 text-sm sm:text-base bg-neutral-800 border-neutral-600 text-white placeholder-neutral-400 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg transition-colors"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label
                                        htmlFor="password"
                                        className="text-sm sm:text-base font-medium text-neutral-200"
                                    >
                                        Password
                                    </Label>
                                    {/* <Link
                                        to="/forgot-password"
                                        className="text-xs sm:text-sm text-primary hover:text-primary/80 underline-offset-4 hover:underline transition-colors"
                                    >
                                        Forgot password?
                                    </Link> */}
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    required
                                    autoComplete="current-password"
                                    className="h-10 sm:h-11 px-3 sm:px-4 text-sm sm:text-base bg-neutral-800 border-neutral-600 text-white placeholder-neutral-400 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg transition-colors"
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-10 sm:h-11 text-sm sm:text-base font-semibold bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all duration-200 mt-6"
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        Signing in...
                                    </div>
                                ) : (
                                    "Sign In"
                                )}
                            </Button>
                        </form>
                    </CardContent>

                    <CardFooter className="px-4 sm:px-6 pb-6 sm:pb-8">
                        <div className="w-full text-center">
                            <p className="text-sm text-neutral-400">
                                Don't have an account?{" "}
                                <Button
                                    onClick={() => navigate("/register")}
                                    variant="link"
                                    className="p-0 h-auto text-sm text-primary hover:text-primary/80 font-medium underline-offset-4 hover:underline transition-colors"
                                >
                                    Create one now
                                </Button>
                            </p>
                        </div>
                    </CardFooter>
                </Card>

                {/* Optional: Social login buttons for larger screens */}
                <div className="mt-6 hidden sm:block">
                    {/* <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-neutral-700" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-neutral-900 px-2 text-neutral-500">
                                Or continue with
                            </span>
                        </div>
                    </div> */}
                    {/* 
                    <div className="mt-4 grid grid-cols-2 gap-3">
                        <Button
                            variant="outline"
                            className="h-10 bg-neutral-800 border-neutral-600 text-neutral-200 hover:bg-neutral-700 transition-colors"
                        >
                            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Google
                        </Button>
                        <Button
                            variant="outline"
                            className="h-10 bg-neutral-800 border-neutral-600 text-neutral-200 hover:bg-neutral-700 transition-colors"
                        >
                            <svg
                                className="w-4 h-4 mr-2"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                            </svg>
                            GitHub
                        </Button>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default Login;
