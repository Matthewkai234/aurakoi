
import Navbar from '../components/navbar';
import ProductDetail from '../components/productInfo';
import ProductInfo from '../components/productInfo';
import ProductList from '../components/productsList';
import Pillar from '../assets/pillar.png';
import Image from 'next/image';
import LiveWallpaper from '../components/liveWallpaper';
import Footer from '../components/footer';
export default function Store() {
    return (
        <div className="relative w-full h-full">

            {/* 🎥 Background Video */}
            <LiveWallpaper />
            {/* 🧩 Content */}
            <div className="relative z-20">
                <Navbar />

                <div className="flex ">
                    <div className="flex items-center border-r-2 border-l-2 border-gray-300 ">
                        <ProductList />
                    </div>

                    <div className="flex max-w-[80%] w-full items-center justify-center border-r-2 border-gray-300">
                        <ProductInfo />
                        
                    </div>

                    <div className="flex max-w-[80%] w-full items-center justify-center border-r-2 border-gray-300">
                        <ProductInfo />
                    </div>
                </div>

            </div>

        </div>

    );
}