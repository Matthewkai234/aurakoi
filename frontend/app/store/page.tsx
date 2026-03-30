
import Navbar from '../components/navbar';
import ProductDetail from '../components/productInfo';
import ProductInfo from '../components/productInfo';
import ProductList from '../components/productsList';
export default function Store() {
    return (
        <>
            <Navbar />
            <div className='flex flex-col-3 items-center justify-center h-screen gap-4'>
                <div className='flex max-w-[80%] w-full h-4/4  bg-transparent items-center justify-center border-r-2 border-l-2 border-gray-300'>
                    <ProductList />
                </div>
                <div className='flex max-w-[80%] w-full h-4/4  bg-transparent items-center justify-center border-r-2 border-gray-300'>
                </div>
                <div className='flex max-w-[80%] w-full h-4/4  bg-transparent items-center justify-center border-r-2 border-gray-300 '>
                </div>
            </div>
        </>
    );
}