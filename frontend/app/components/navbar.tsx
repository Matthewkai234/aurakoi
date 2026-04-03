"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ShoppingCart, User, Languages, Home, Shirt, Store, ShoppingBag, UserCircle, User2, UserCheck, ImageDown } from "lucide-react";
import YinYangLogo from "../assets/yinyang.png";
import Image from "next/image";
import { Product } from "../../types/Iproduct";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [language, setLanguage] = useState("en");
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const router = useRouter()


    useEffect(() => {
        async function fetchCategories() {
            const res = await fetch("/api/products/");
            const data = await res.json();
            const dataSet: Set<string> = new Set(data.map((item: Product) => item.Category));
            setCategories([...dataSet])
            console.log("Fetched categories:", [...dataSet]);
        }
        fetchCategories();

    }, []);
    useEffect(() => { console.log(categories); }, [categories])


    const toggleLanguage = () => {
        setLanguage((prev) => (prev === "en" ? "he" : "en"));
        console.log("Language toggled to", language === "en" ? "he" : "en");
    };




    return (
        <nav className="theme-aware shadow-md px-4 py-2 sticky z-30 opacity-90 " >
            <div className=" container mx-auto flex items-center justify-between  ">
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
                    <Link
                        href="/home"
                        className="flex items-center space-x-1 hover:text-blue-600 transition"
                    >                        <Home size={20} />

                        Home
                    </Link>


                    <div className="relative flex ">
                        <div className="dropdown dropdown-start">
                            <div tabIndex={0} role="button" className="flex items-center space-x-1 p-2  hover:text-blue-600 transition cursor-pointer">
                                <Store size={20} />
                                Store
                            </div>
                            <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                <li> <button onClick={() => setSelectedCategory(null)}>All</button> </li>
                                {categories.map((cat, i) => (
                                    <li key={i}>
                                        <button onClick={() => setSelectedCategory(cat)}>
                                            {cat}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>

                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="flex items-center space-x-1 p-2  hover:text-blue-600 transition cursor-pointer">
                                <ShoppingBag size={24} />
                            </div>
                            <span className="absolute top-3 left-3 inline-flex items-center justify-center px-1 py-[0.5px] text-xs font-bold leading-none text-white bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                                0
                            </span>
                            <ul tabIndex={-1} className="dropdown-content menu theme-aware rounded-box z-1 w-100 p-2 shadow-sm">
                                <div className="flex justify-between items-center border-b">
                                    <h2>Shopping Cart</h2>
                                    <h2>0 Items</h2>
                                </div>
                                <li>
                                    <a>
                                        <ImageDown size={44} />
                                        <div className="flex flex-col">
                                            <h1>Product Name</h1>
                                            <div className="flex gap-2  text-sm">
                                                <p>size: xl</p>
                                                <p>color: red</p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="dropdown dropdown-start">
                            <div tabIndex={0} role="button" className="flex items-center space-x-1 p-2 hover:text-blue-600 transition cursor-pointer">
                                <User size={24} />
                            </div>
                            <ul tabIndex={-1} className="dropdown-content menu theme-aware rounded-box z-1 w-52 p-2 shadow-sm">
                                <li><Link type="button" href="/auth"> <User size={20} /> Login</Link></li>
                            </ul>
                        </div>
                    </div>

                    <button
                        onClick={toggleLanguage}
                        className="p-2 hover:text-blue-600 transition cursor-pointer"
                        aria-label="Toggle language"
                    >
                        <Languages size={25} />
                    </button>
                </div>
            </div>
        </nav>
    );
}