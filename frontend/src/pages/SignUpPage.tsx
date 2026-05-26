import { cn } from "@/utils/cn";
import { IconUser, IconMail, IconLock, IconEye, IconEyeOff } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useState } from "react";

interface exportType {
    className?: string
}

export function SignUpPage({className}: exportType) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <section className={cn("min-h-screen w-full bg-neutral-50 dark:bg-neutral-900 flex flex-col items-center justify-center", className)}>
            <div className="w-full max-w-md border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-md dark:shadow-2xl dark:shadow-black/30 p-8 mx-4">
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block text-xl font-bold font-finlandica text-neutral-900 dark:text-white mb-6">
                        BLOOM<span className="text-amber-500">SHOP</span>
                    </Link>
                    <h1 className="text-2xl font-bold font-finlandica text-neutral-900 dark:text-white">Create Account</h1>
                    <p className="text-sm font-finlandica text-neutral-500 dark:text-neutral-400 mt-2">Join BloomShop and start shopping</p>
                </div>

                <form className="space-y-5">
                    <div className="flex flex-col space-y-1.5">
                        <label className="text-sm font-semibold font-finlandica text-neutral-900 dark:text-white">Full Name</label>
                        <div className="relative">
                            <IconUser size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-neutral-200 dark:border-neutral-700 text-sm font-finlandica focus:outline-none focus:ring-1 focus:ring-amber-500 dark:ring-neutral-600 dark:shadow-neutral-50 shadow dark:text-white bg-transparent"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <label className="text-sm font-semibold font-finlandica text-neutral-900 dark:text-white">Email</label>
                        <div className="relative">
                            <IconMail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-neutral-200 dark:border-neutral-700 text-sm font-finlandica focus:outline-none focus:ring-1 focus:ring-amber-500 dark:ring-neutral-600 dark:shadow-neutral-50 shadow dark:text-white bg-transparent"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <label className="text-sm font-semibold font-finlandica text-neutral-900 dark:text-white">Password</label>
                        <div className="relative">
                            <IconLock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                className="w-full pl-10 pr-10 py-2.5 rounded-full border border-neutral-200 dark:border-neutral-700 text-sm font-finlandica focus:outline-none focus:ring-1 focus:ring-amber-500 dark:ring-neutral-600 dark:shadow-neutral-50 shadow dark:text-white bg-transparent"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-white"
                            >
                                {showPassword ? <IconEyeOff size={16} /> : <IconEye size={16} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <label className="text-sm font-semibold font-finlandica text-neutral-900 dark:text-white">Confirm Password</label>
                        <div className="relative">
                            <IconLock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                            <input
                                type={showConfirm ? "text" : "password"}
                                placeholder="Confirm your password"
                                className="w-full pl-10 pr-10 py-2.5 rounded-full border border-neutral-200 dark:border-neutral-700 text-sm font-finlandica focus:outline-none focus:ring-1 focus:ring-amber-500 dark:ring-neutral-600 dark:shadow-neutral-50 shadow dark:text-white bg-transparent"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-white"
                            >
                                {showConfirm ? <IconEyeOff size={16} /> : <IconEye size={16} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2.5 rounded-full bg-amber-500 text-neutral-900 font-bold font-finlandica text-sm shadow-md hover:bg-amber-500/90 transition-colors cursor-pointer"
                    >
                        Create Account
                    </button>
                </form>

                <p className="text-center text-xs font-finlandica text-neutral-500 dark:text-neutral-400 mt-6">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-amber-500 font-semibold hover:underline">Sign In</Link>
                </p>
            </div>
        </section>
    )
}
