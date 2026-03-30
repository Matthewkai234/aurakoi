"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ShoppingCart, User, Languages, Home, Shirt, Store, ShoppingBag, UserCircle, User2, UserCheck } from "lucide-react";
import YinYangLogo from "../assets/yinyang.png";
import Image from "next/image";

export default function Navbar() {
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [language, setLanguage] = useState("en");
    const userMenuRef = useRef<HTMLDivElement>(null);


    const toggleLanguage = () => {
        setLanguage((prev) => (prev === "en" ? "he" : "en"));
        console.log("Language toggled to", language === "en" ? "he" : "en");
    };

    const navItems = [
        {
            href: "/dashboard",
            label: "Home",
            icon: Home,
        },
        {
            href: "/store",
            label: "Store",
            icon: Store,
        },
    ];

    return (
        <nav className="bg-white shadow-md px-4 py-2">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex-shrink-0">
                    <Link href="/">
                        <Image
                            src={YinYangLogo}
                            alt="Gymix Logo"
                            width={70}
                            height={58.86}
                            style={{ padding: "5px" }}
                            priority
                        />
                    </Link>
                </div>

                <div className="hidden md:flex space-x-6">
                    {navItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition"
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>

                <div className="flex items-center space-x-4">
                    <button className="relative p-2 text-gray-700 hover:text-blue-600 transition cursor-pointer">
                        <ShoppingBag size={24} />
                        <span className="absolute top-3 right-2 inline-flex items-center justify-center px-1 py-[0.5px] text-xs font-bold leading-none text-white bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                            0
                        </span>
                    </button>

                    <div className="relative">
                        <div className="dropdown dropdown-start">
                            <div tabIndex={0} role="button" className="flex items-center space-x-1 p-2 text-gray-700 hover:text-blue-600 transition cursor-pointer">
                                <User size={24} />
                            </div>
                            <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                <li><a> <User size={20} /> Login</a></li>
                            </ul>
                        </div>
                    </div>

                    <button
                        onClick={toggleLanguage}
                        className="p-2 text-gray-700 hover:text-blue-600 transition cursor-pointer"
                        aria-label="Toggle language"
                    >
                        <Languages size={25} />
                    </button>
                </div>
            </div>
        </nav>
    );
}