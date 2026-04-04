import Image from "next/image";
import Button from "./components/buttons";
import MenuBg from "./assets/menubg.jpg";
import Navbar from "./components/navbar";
import ProductsList from "./components/productsList";
import LiveWallpaper from "./components/liveWallpaper";



export default function Home() {
  return (
    <>
    <LiveWallpaper/>
    <div className="relative z-20">
    <Navbar />
    <ProductsList/>
    </div>
    </>
  );
}