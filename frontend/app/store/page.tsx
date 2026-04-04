
import Navbar from '../components/navbar';
import ProductList from '../components/productsList';
import LiveWallpaper from '../components/liveWallpaper';

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