"use client"
import Image from "next/image";
import Button from "./components/buttons";
import MenuBg from "./assets/menubg.jpg";
import Navbar from "./components/navbar";
import ProductsList from "./components/productsList";
import LiveWallpaper from "./components/liveWallpaper";
import { useState } from "react";



export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <>
    <LiveWallpaper/>
    <div className="relative z-20">
    <Navbar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
    <ProductsList category={selectedCategory}/>
    </div>
    </>
  );
}