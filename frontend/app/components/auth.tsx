"use client";

import React, { useState } from "react";
import { Mail, Lock, User, Sparkles, LogIn, UserPlus, Eye, EyeOff } from "lucide-react";
import InputField from "./inputFields";
import Buttons from "./buttons";
import { supabase } from "@/lib/supabaseClient";

export default function AuthPage() {
    const [mode, setMode] = useState<"login" | "signup">("login")
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");
        setLoading(true);
        console.log(`${mode} form submitted`);
        try {
            if (mode === "signup") {

                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                });

                if (error) throw error;

                console.log("Signup successful:", data);
            } else {

                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                if (error) throw error;

                console.log("Login successful:", data);
            }
        } catch (error: any) {
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setMode(mode === "login" ? "signup" : "login");
    };

    return (
        <div className="relative min-h-screen w-full overflow-x-hidden bg-ink-paper opacity-90 z-20 theme-aware-background">
            <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">

                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 px-6 py-2 border-b border-gray-300">
                        <Sparkles className="w-4 h-4 theme-aware-secondary-color" />
                        <h1 className="text-3xl md:text-4xl font-light tracking-wide text-gray-800 font-serif theme-aware-primary-color">
                            Welcome
                        </h1>
                        <div className="w-6 h-px  rotate-12 theme-aware-secondary-background" />
                    </div>
                    <p className="text-gray-500 text-sm mt-4 font-light italic">
                        {mode === "login" ? "阳 · 光明之径" : "阴 · 静谧之途"}
                    </p>
                </div>

                <div className="max-w-md mx-auto">
                    <div className="relative rounded-2xl theme-aware shadow-sm  transition-all duration-700 ease-out backdrop-blur-sm overflow-hidden">

                        <div className="p-6 md:p-8">
                            <div className="flex flex-col items-center mb-6">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-500">
                                    {mode === "login" ? (
                                        <LogIn className="w-5 h-5" />
                                    ) : (
                                        <UserPlus className="w-5 h-5" />
                                    )}
                                </div>
                                <h2
                                    className="text-2xl font-light tracking-wide font-serif transition-colors duration-500 theme-aware-primary-color">
                                    {mode === "login" ? "登录 · Sign In" : "注册 · Sign Up"}
                                </h2>
                                <div className="w-12 h-px mt-2 transition-colors duration-500" />
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {mode === "signup" && (
                                    <InputField
                                        variant="text"
                                        placeholder="姓名 · Full Name"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}

                                    />
                                )}

                                {mode === "signup" && (
                                    <InputField
                                        variant="text"
                                        placeholder="姓名 · Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                )}

                                <InputField
                                    variant="email"
                                    placeholder="电子邮箱 · Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <InputField
                                    variant="password"
                                    placeholder="密码 · Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                {mode === "login" && (
                                    <div className="text-right">
                                        <button
                                            type="button"
                                            className="text-xs theme-aware-primary-color cursor-pointer hover:scale-105 duration-300 hover:text-gray-600"
                                        >
                                            Forgot password?
                                        </button>
                                    </div>
                                )}
                                <Buttons variant="Auth" authtype={mode} />
                            </form>
                            {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
                            {loading && <p className="text-gray-500 text-sm mt-2">Processing...</p>}
                            

                            <div className="mt-6 text-center">
                                <button
                                    onClick={toggleMode}
                                    className=" text-sm transition-all duration-300 inline-flex items-center gap-1 hover:underline underline-offset-4 theme-aware-primary-color cursor-pointer"
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

                            <div className="text-center text-[10px] text-gray-400 pt-6 mt-2 border-t border-gray-100/50">
                                一阴一阳 · 谓之道
                            </div>
                        </div>
                    </div>

                    {/* Additional decorative yin yang swirl */}
                    <div className="flex justify-center mt-8">
                        <div className="w-8 h-8 rounded-full border border-gray-300/40 flex items-center justify-center">
                            <div
                                className="
                  w-3 h-3 rounded-full transition-all duration-700 theme-aware-reverse                "
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