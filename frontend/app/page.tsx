import Image from "next/image";
import Button from "./components/buttons";
import MenuBg from "./assets/menubg.jpg";
import Navbar from "./components/navbar";
import ProductsList from "./components/productsList";
import LiveWallpaper from "./components/liveWallpaper";
import Footer from "./components/footer";



export default function Home() {
  return (
    <>
    <LiveWallpaper/>
    <div className="relative z-20">
    <Navbar />
    <ProductsList/>
    <Footer/>
    </div>
    </>
  );
}