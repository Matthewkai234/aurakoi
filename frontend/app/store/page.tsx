
import Navbar from '../components/navbar';
import ProductList from '../components/productsList';
export default function Store() {
    return (
        <>
            <Navbar />
            <div className='flex flex-col-3 items-center justify-center h-screen gap-4'>
                <ProductList />
                <ProductList />
                <ProductList />
            </div>
        </>
    );
}