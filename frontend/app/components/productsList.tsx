"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { SlidersHorizontal } from "lucide-react";

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
    <div className="bg-white shadow-md rounded-xl p-4 mx-auto">
      <div className="flex flex-col-2 mb-4 items-center justify-between">
        <h2 className="text-xl font-aldrich text-gray-800">
          {category}
        </h2>

        <div className="dropdown dropdown-start">
          <div
            tabIndex={0}
            role="button"
            className="flex items-center pt-1 text-gray-700 hover:text-blue-600 transition cursor-pointer hover:scale-105"
          >
            <SlidersHorizontal />
          </div>

          <ul className="dropdown-content menu bg-base-100 rounded-box z-10 min-w-full p-2 shadow-sm">
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

      <div className="aspect-square w-full overflow-auto rounded-lg">
        <div className="grid grid-cols-5 grid-rows-5 gap-2 p-5">
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
  );
}