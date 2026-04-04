
'use client'
import Navbar from '../components/navbar';
import ProductList from '../components/productsList';

import LiveWallpaper from '../components/liveWallpaper';
import Footer from '../components/footer';
import { useState } from 'react';

export default function Store() {
    const [selectedCategory, setSelectedCategory] = useState("Supplement");

    return (
        <>

        <LiveWallpaper/>
            <Navbar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            <div className='flex w-full items-center justify-center'>
                    <ProductList category={selectedCategory} />
            </div>

        </>

    );
}