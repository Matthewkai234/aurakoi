"use client";

import React, { useState } from "react";
import { Mail, Lock, User, Sparkles, LogIn, UserPlus, Eye, EyeOff } from "lucide-react";
import InputField from "./inputFields";
import Buttons from "./buttons";

export default function AuthPage() {
    const [mode, setMode] = useState<"login" | "signup">("login");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Determine theme based on mode: login = light (yang), signup = dark (yin)
    const isLightMode = mode === "login";

    // Form field placeholders and labels adjust slightly, but we keep design
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Design only — logic will be implemented later
        console.log(`${mode} form submitted`);
    };

    const toggleMode = () => {
        setMode(mode === "login" ? "signup" : "login");
        // Reset password visibility when switching modes
        setShowPassword(false);
        setShowConfirmPassword(false);
    };

    return (
        <div className="relative min-h-screen w-full overflow-x-hidden bg-ink-paper opacity-90 z-20">
            <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">

                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 px-6 py-2 border-b border-gray-300">
                        <Sparkles className="w-4 h-4 text-gray-500" />
                        <h1 className="text-3xl md:text-4xl font-light tracking-wide text-gray-800 font-serif">
                            阴阳 · 之门
                        </h1>
                        <div className="w-6 h-px bg-gray-400 rotate-12" />
                    </div>
                    <p className="text-gray-500 text-sm mt-4 font-light italic">
                        {mode === "login" ? "阳 · 光明之径" : "阴 · 静谧之途"}
                    </p>
                </div>

                {/* Main Card — transitions between light (yang) and dark (yin) */}
                <div className="max-w-md mx-auto">
                    <div className={`
                        relative rounded-2xl shadow-sm border transition-all duration-700 ease-out
                        backdrop-blur-sm overflow-hidden
                        ${isLightMode
                            ? "bg-white/90 border-gray-200/60"
                            : "bg-gray-800/90 border-gray-700/60"
                        }
                    `}
                    >
                        {/* Yin Yang decorative symbol — animated subtle rotation based on mode */}
                        <div className="absolute -top-6 -right-6 w-20 h-20 opacity-20 pointer-events-none transition-all duration-700">
                            <div
                                className={`
                  w-full h-full rounded-full border-2 transition-all duration-700
                  ${isLightMode
                                        ? "border-gray-400 bg-white rotate-0"
                                        : "border-gray-500 bg-gray-900 rotate-180"
                                    }
                `}
                            >
                                <div
                                    className={`
                    absolute w-2/5 h-2/5 rounded-full transition-all duration-700
                    ${isLightMode
                                            ? "bg-gray-800 top-1/4 left-1/4"
                                            : "bg-white top-1/4 left-1/4"
                                        }
                  `}
                                />
                                <div
                                    className={`
                    absolute w-2/5 h-2/5 rounded-full transition-all duration-700
                    ${isLightMode
                                            ? "bg-white bottom-1/4 right-1/4"
                                            : "bg-gray-800 bottom-1/4 right-1/4"
                                        }
                  `}
                                />
                            </div>
                        </div>

                        {/* Inner content */}
                        <div className="p-6 md:p-8">
                            {/* Mode icon and title */}
                            <div className="flex flex-col items-center mb-6">
                                <div
                                    className={`
                    w-12 h-12 rounded-full flex items-center justify-center mb-3
                    transition-all duration-500
                    ${isLightMode
                                            ? "bg-gray-100 text-gray-700"
                                            : "bg-gray-700 text-gray-200"
                                        }
                  `}
                                >
                                    {mode === "login" ? (
                                        <LogIn className="w-5 h-5" />
                                    ) : (
                                        <UserPlus className="w-5 h-5" />
                                    )}
                                </div>
                                <h2
                                    className={`
                    text-2xl font-light tracking-wide font-serif transition-colors duration-500
                    ${isLightMode ? "text-gray-800" : "text-gray-100"}
                  `}
                                >
                                    {mode === "login" ? "登录 · Sign In" : "注册 · Sign Up"}
                                </h2>
                                <div
                                    className={`
                    w-12 h-px mt-2 transition-colors duration-500
                    ${isLightMode ? "bg-gray-300" : "bg-gray-600"}
                  `}
                                />
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Full Name */}
                                {mode === "signup" && (
                                    <InputField
                                        variant="text"
                                        placeholder="姓名 · Full Name"
                                        isLightMode={isLightMode}
                                    />
                                )}

                                {/* Email */}
                                <InputField
                                    variant="email"
                                    placeholder="电子邮箱 · Email"
                                    isLightMode={isLightMode}
                                />

                                {/* Password */}
                                <InputField
                                    variant="password"
                                    placeholder="密码 · Password"
                                    isLightMode={isLightMode}
                                />

                                {/* Confirm Password */}
                                {mode === "signup" && (
                                    <InputField
                                        variant="password"
                                        placeholder="确认密码 · Confirm Password"
                                        isLightMode={isLightMode}
                                    />
                                )}

                                {/* Forgot password */}
                                {mode === "login" && (
                                    <div className="text-right">
                                        <button
                                            type="button"
                                            className="text-xs text-gray-400 hover:text-gray-600"
                                        >
                                            忘了密码? · Forgot password?
                                        </button>
                                    </div>
                                )}
                                <Buttons variant="Auth" authtype={mode}/>
                            </form>


                            {/* Toggle between Login and Signup — the "other side" switch */}
                            <div className="mt-6 text-center">
                                <button
                                    onClick={toggleMode}
                                    className={`
                    text-sm transition-all duration-300 inline-flex items-center gap-1
                    hover:underline underline-offset-4
                    ${isLightMode ? "text-gray-500 hover:text-gray-700" : "text-gray-400 hover:text-gray-200"}
                  `}
                                >
                                    {mode === "login" ? (
                                        <>
                                            <span>Don't have an account？Sign up</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Already have an account？Login</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Yin Yang quote */}
                            <div className="text-center text-[10px] text-gray-400 pt-6 mt-2 border-t border-gray-100/50">
                                一阴一阳 · 谓之道
                            </div>
                        </div>
                    </div>

                    {/* Additional decorative yin yang swirl */}
                    <div className="flex justify-center mt-8">
                        <div className="w-8 h-8 rounded-full border border-gray-300/40 flex items-center justify-center">
                            <div
                                className={`
                  w-3 h-3 rounded-full transition-all duration-700
                  ${isLightMode ? "bg-gray-700" : "bg-white"}
                `}
                            />
                        </div>
                    </div>
                </div>

                <div className="text-center mt-12 text-[10px] text-gray-400 tracking-widest">
                    水墨之间 · 自有乾坤
                </div>
            </div>
        </div>
    );
}