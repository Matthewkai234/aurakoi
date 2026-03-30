import Image from "next/image";
import Button from "./components/buttons";
import MenuBg from "./assets/menubg.jpg";
import Navbar from "./components/navbar";
import ProductsList from "./components/productsList";


export default function Home() {
  return (
    // <div className="relative w-full h-screen font-sans dark:bg-black">
    //   <Image
    //     src={MenuBg}
    //     alt="Menu Background"
    //     fill
    //     className="object-cover"
    //     priority
    //   />

    //   {/* Overlay for darkening the image a bit */}
    //   <div className="absolute inset-0 bg-black/40"></div>

    //   {/* Content */}
    //   <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
    //     {/* Heading aligned left */}
    //     <h1 className="absolute top-8 left-20 text-4xl font-bold text-white font-aldrich">
    //       Aurakoi
    //     </h1>

    //     {/* Game options */}
    //     <div className="flex flex-col gap-4">
    //       <Button variant="primary" content="Start" />
    //       <Button variant="primary" content="Options" />
    //       <Button variant="primary" content="Quit" />
    //     </div>
    //   </div>
    // </div>
    <>
    <Navbar/>
    <ProductsList/>
    </>
  );
}