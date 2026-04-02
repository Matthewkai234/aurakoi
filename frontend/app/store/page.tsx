
import LiveWallpaper from '../components/liveWallpaper';
import Navbar from '../components/navbar';
import ProductDetail from '../components/productInfo';
import ProductInfo from '../components/productInfo';
import ProductList from '../components/productsList';
export default function Store() {
    return (
        <>

        <LiveWallpaper/>
            <Navbar />
            <div className='flex w-full items-center justify-center'>
                    <ProductList />
            </div>
        </>
    );
}