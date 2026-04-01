"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { SlidersHorizontal } from "lucide-react";
import Banner from "../assets/banner.png";
import BannerBody from "../assets/bannerBody.png";

interface Product {
  Id: number;
  Title: string;
  Category: string;
  SubCategory: string;
  IconImage: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);

  const category = "Supplement";

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch(`/api/products/category/${category}`);
      const data: Product[] = await res.json();

      setProducts(data);

      const uniqueSubs = [
        ...new Set(data.map(p => p.SubCategory.trim()))
      ];
      setSubCategories(uniqueSubs);
    }
    fetchProducts();
  }, [category]);

  const filtered = selectedSub
    ? products.filter(
      (p) =>
        p.SubCategory.trim().toLowerCase() ===
        selectedSub.trim().toLowerCase()
    )
    : products;

  return (

    <div className="relativet  flex flex-col rounded-lg W-100  items-center justify-center ">


      <div className=" relative flex flex-col w-full items-center justify-center w-100 ">
        <Image
          src={Banner}
          alt="Banner"
          width={350}
          height={350}
          className=" absolute -z-10  opacity-50 object-cover"
        />

        <div className=" flex items-center justify-between w-80 pr-12  ">
          <h2 className="text-xl font-aldrich text-white">
            {category}
          </h2>

          <div className="dropdown dropdown-start">
            <div
              tabIndex={0}
              role="button"
              className="flex items-center pt-1 text-grey-100 hover:text-blue-600 transition cursor-pointer hover:scale-105 pb-2 "
            >
              <SlidersHorizontal />
            </div>

            <ul className="dropdown-content menu bg-base-100 rounded-box z-10 min-w-full p-2 shadow-sm ">
              <li>
                <button onClick={() => setSelectedSub(null)}>All</button>
              </li>

              {subCategories.map((sub) => (
                <li key={sub}>
                  <button onClick={() => setSelectedSub(sub)}>
                    {sub}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="relative h-screen">
        <Image
          src={BannerBody}
          alt="Banner Body"
          width={450}
          height={450}
          className="absolute -z-7   object-cover rounded-lg opacity-50 "
        />
        <div className="aspect-square overflow-auto rounded-lg p-4 ">

          <div className="flex flex-cols-5 flex-rows-5 flex-wrap  gap-4 ">
            {filtered.map((product) => (
              <div
                key={product.Id}
                className="bg-transparent border rounded-full shadow-md shadow-gray-400 h-15 w-15 flex items-center justify-center hover:bg-gray-200 transition cursor-pointer hover:scale-105"
              >
                <Image
                  src={product.IconImage}
                  alt={product.Title}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>



    </div>
  );
}