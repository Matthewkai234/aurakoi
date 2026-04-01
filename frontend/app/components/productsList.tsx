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
        ...new Set(data.map((p) => p.SubCategory.trim())),
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
    <div className="flex flex-col items-center justify-center w-lg items-center">

      <div className="relative w-full max-w-md flex flex-col items-center">

        <div className=" flex relative w-2xl  ">
          <Image
            src={BannerBody}
            alt="Banner Body"
            fill
            className="absolute inset-0 -z-10 object-cover rounded-lg opacity-50"
          />

          <div className="flex " >
            <div className=" aspect-square overflow-auto rounded-lg p-4 w-md flex flex-cols-3 mt-10 gap-2 ml-30 pt-25 pl-15" >
              {filtered.map((product) => (
                <div
                  key={product.Id}
                  className="bg-transparent border rounded-full shadow-md shadow-gray-400 h-16 w-16 flex items-center justify-center hover:bg-gray-200 transition cursor-pointer hover:scale-105"
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

        {/* 🧾 Banner (header overlay) */}
        <div className="absolute  flex flex-col items-center w-full ">

          <Image
            src={Banner}
            alt="Banner"
            width={260}
            height={260}
            className=" drop-shadow-lg min-w-md opacity-60"
          />

          {/* 🏷️ Title + Filter */}
          <div className="absolute top-5 flex items-start justify-between w-3/4 mt-8 bg-opacity-50 rounded-lg min-w-xsm mr-10 px-4 pr-10">
            <h2 className="text-xl font-aldrich text-white">
              {category}
            </h2>

            <div className="dropdown dropdown-start">
              <div
                tabIndex={0}
                role="button"
                className="text-white hover:text-blue-400 cursor-pointer"
              >
                <SlidersHorizontal />
              </div>

              <ul className="dropdown-content menu bg-base-100 rounded-box z-10 p-2 shadow-sm">
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
      </div>
    </div>
  );
}