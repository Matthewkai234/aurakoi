"use client";
import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
import Image from "next/image";
import { SlidersHorizontal, Sparkles } from "lucide-react";
import { BsYinYang } from "react-icons/bs";
import Yin from "../assets/yin.png";
import Yang from "../assets/yang.png";
import Buttons from "./buttons"; // adjust path as needed

// Interface matches backend PascalCase DTO exactly
interface Product {
  Id: number;
  Title: string;
  Category: string;
  SubCategory: string;
  IconImage: string;
  ImageUrl: string;
  Price: number;
  Description: string;
  Stock: number;
  Sizes: string[];
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartMessage, setCartMessage] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);

  // Zoom lens state
  const [zoomActive, setZoomActive] = useState<boolean>(false);
  const [zoomPosition, setZoomPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const category = "Supplement";

  // Fetch products on mount
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`/api/products/category/${category}`);
        const data: Product[] = await res.json();
        setProducts(data);

        // Extract unique sub-categories safely
        const uniqueSubs = [
          ...new Set(
            data
              .map((p) => p.SubCategory?.trim())
              .filter((sub): sub is string => !!sub)
          ),
        ];
        setSubCategories(uniqueSubs);

        if (data.length > 0) {
          setSelectedProduct(data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }
    fetchProducts();
  }, [category]);

  // Memoize filtered products
  const filtered = useMemo(() => {
    if (selectedSub) {
      return products.filter(
        (p) =>
          p.SubCategory?.trim().toLowerCase() === selectedSub.toLowerCase()
      );
    }
    return products;
  }, [products, selectedSub]);

  // Update selected product when filtered list changes
  useEffect(() => {
    if (selectedProduct && !filtered.some((p) => p.Id === selectedProduct.Id)) {
      setSelectedProduct(filtered[0] || null);
    } else if (!selectedProduct && filtered.length > 0) {
      setSelectedProduct(filtered[0]);
    }
    // Clear cart message when product selection changes due to filter
    setCartMessage("");
  }, [filtered, selectedProduct]);

  // Add to cart handler with calm animation
  const handleAddToCart = useCallback((product: Product) => {
    if (product.Stock <= 0) {
      setCartMessage("无货 · Out of stock");
      setTimeout(() => setCartMessage(""), 2000);
      return;
    }

    setIsAdding(true);
    setCartMessage(`「${product.Title}」 已添至竹篮 · Added`);

    // Simulate adding to cart - you can replace with actual cart logic
    setTimeout(() => {
      setIsAdding(false);
      setTimeout(() => setCartMessage(""), 2000);
    }, 500);
  }, []);

  // Zoom lens mouse move handler
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x: Math.min(100, Math.max(0, x)), y: Math.min(100, Math.max(0, y)) });
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-ink-paper opacity-90 z-20">

      {/* <div className="fixed bottom-6 right-6 z-30 pointer-events-none">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0">
            <div className="fab fab-flower">
              <div tabIndex={0} role="button" className="btn btn-lg btn-circle btn-success text-white bg-black"><BsYinYang className="h-10 w-10" /></div> //when i click here both buttons appear
              <button className="fab-main-action btn btn-circle btn-lg"><BsYinYang className="h-10 w-10 reverse" /></button> // don't touch this 
              <button className="btn btn-lg btn-circle justify-end bg-white"> //whe i click here its dark
                <Image src={Yin} alt="yin-darktheme" height={30} width={34} />
              </button>
              <button className="btn btn-lg btn-circle justify-start bg-black"> //when i click here its light 
                <Image src={Yang} alt="yin-lighttheme" height={30} width={34} />
              </button>
            </div>
          </div>
        </div>
      </div> */}

      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        {/* Page Title with Calligraphy Style */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-6 py-2 border-b border-gray-300">
            <Sparkles className="w-4 h-4 text-gray-500" />
            <h1 className="text-3xl md:text-4xl font-light tracking-wide text-gray-800 font-serif">
              {category}
            </h1>
            <div className="w-6 h-px bg-gray-400 rotate-12" />
          </div>
          <p className="text-gray-500 text-sm mt-4 font-light italic">水墨·阴阳·自然之选</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Product Icons with Filter */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden transition-all duration-300 hover:shadow-md">
            <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 bg-gray-500 rounded-full" />
                <h2 className="text-lg font-medium text-gray-700 tracking-wide">{category}</h2>
              </div>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center gap-1 px-2 py-1 text-gray-500 hover:text-gray-800 transition-all duration-300 hover:bg-gray-50 rounded-full cursor-pointer"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span className="text-xs hidden sm:inline">选 · Select</span>
                </div>
                <ul className="dropdown-content menu bg-white/95 backdrop-blur-sm rounded-xl z-20 min-w-36 p-2 shadow-lg border border-gray-100">
                  <li key="all" className="w-full">
                    <button
                      onClick={() => setSelectedSub(null)}
                      className="text-gray-700 hover:bg-gray-50 rounded-lg px-3 py-1.5 text-sm"
                    >
                      全部 · All
                    </button>
                  </li>
                  {subCategories.map((sub) => (
                    <li key={sub}>
                      <button
                        onClick={() => setSelectedSub(sub)}
                        className="text-gray-700 hover:bg-gray-50 rounded-lg px-3 py-1.5 text-sm"
                      >
                        {sub}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="overflow-auto max-h-[70vh] p-4">
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {filtered.map((product) => (
                  <div
                    key={product.Id}
                    onClick={() => setSelectedProduct(product)}
                    className={`
                      group relative flex items-center justify-center
                      aspect-square rounded-full border transition-all duration-300 cursor-pointer
                      ${selectedProduct?.Id === product.Id
                        ? "border-gray-800 bg-gray-50 shadow-md ring-1 ring-gray-400 ring-offset-2"
                        : "border-gray-200 bg-white hover:border-gray-400 hover:shadow-sm"
                      }
                    `}
                  >
                    {product.IconImage ? (
                      <Image
                        src={product.IconImage}
                        alt={product.Title}
                        width={40}
                        height={40}
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 rounded-full" />
                    )}
                    {/* Subtle Yin Yang dot indicator for selected */}
                    {selectedProduct?.Id === product.Id && (
                      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-gray-700 rounded-full" />
                    )}
                  </div>
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="text-center py-12 text-gray-400 text-sm">
                  <div className="inline-block p-4 rounded-full bg-gray-50">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <p className="mt-2">无此品类 · No products</p>
                </div>
              )}
            </div>
          </div>

          {/* Column 2: Main Product Image - Zen Gallery with Zoom Lens */}
          <div className="bg-gray-50/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/60 p-6 flex items-center justify-center min-h-[400px] transition-all duration-500">
            {selectedProduct?.ImageUrl ? (
              <div
                ref={imageContainerRef}
                className="relative w-full h-80 md:h-96 group cursor-crosshair"
                onMouseEnter={() => setZoomActive(true)}
                onMouseLeave={() => setZoomActive(false)}
                onMouseMove={handleMouseMove}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100/20 to-transparent rounded-xl pointer-events-none z-10" />
                <Image
                  src={selectedProduct.ImageUrl}
                  alt={selectedProduct.Title}
                  fill
                  className="object-contain rounded-xl transition-all duration-700 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
                {/* Ink brush stroke decoration */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent" />

                {/* Zoom Lens */}
                {zoomActive && (
                  <div
                    className="fixed w-40 h-40 rounded-full border-2 border-white/60 shadow-2xl pointer-events-none z-50 backdrop-blur-sm"
                    style={{
                      left: `${zoomPosition.x}%`,
                      top: `${zoomPosition.y}%`,
                      transform: 'translate(-50%, -50%)',
                      backgroundImage: `url(${selectedProduct.ImageUrl})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '300% auto',
                      backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      boxShadow: '0 0 0 2px rgba(0,0,0,0.1), 0 8px 20px rgba(0,0,0,0.2)'
                    }}
                  />
                )}
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full border border-gray-200 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 opacity-50" />
                </div>
                <p className="text-sm">择一物 · 观其形</p>
                <p className="text-xs mt-1">Select a product to reveal</p>
              </div>
            )}
          </div>

          {/* Column 3: Product Details - Ink Calligraphy Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/60 p-6 transition-all duration-300 hover:shadow-md">
            {selectedProduct ? (
              <div className="space-y-5">
                {/* Title with brush stroke accent */}
                <div className="relative">
                  <div className="absolute -top-1 left-0 w-8 h-px bg-gray-400" />
                  <h2 className="text-2xl font-medium text-gray-800 pt-2 tracking-wide">
                    {selectedProduct.Title}
                  </h2>
                  <div className="w-12 h-0.5 bg-gray-300 mt-2" />
                </div>

                {/* Price in zen style */}
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-light text-gray-800">
                    ¥{selectedProduct.Price?.toFixed(2) ?? "0.00"}
                  </span>
                  <span className="text-xs text-gray-400 tracking-wider">水墨价</span>
                </div>

                {/* Stock status with yin-yang balance */}
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">余量 · Stock</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      selectedProduct.Stock > 0
                        ? "bg-gray-100 text-gray-700"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {selectedProduct.Stock > 0
                      ? `${selectedProduct.Stock} 件`
                      : "无货 · Out"}
                  </span>
                </div>

                {/* Sizes as ink wash tags */}
                {selectedProduct.Sizes && selectedProduct.Sizes.length > 0 && (
                  <div>
                    <span className="text-xs text-gray-500 tracking-wide uppercase">
                      尺码 · Sizes
                    </span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedProduct.Sizes.map((size) => (
                        <span
                          key={size}
                          className="px-3 py-1 text-xs border border-gray-300 rounded-full text-gray-600 bg-white/50"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description with elegant line clamp */}
                <div className="pt-2">
                  <h3 className="text-xs text-gray-500 tracking-wide uppercase mb-2">
                    墨韵 · Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm font-light border-l-2 border-gray-200 pl-3">
                    {selectedProduct.Description || "无描述 · 静待缘人"}
                  </p>
                </div>

                {/* Add to Cart Button - using the extracted Buttons component */}
                <div className="pt-4">
                  <Buttons
                    variant="addToCart"
                    stock={selectedProduct.Stock}
                    isAdding={isAdding}
                    onAddToCart={() => handleAddToCart(selectedProduct)}
                  />
                  {cartMessage && (
                    <div className="mt-3 text-center animate-fade-in-up">
                      <p className="text-xs text-gray-600 bg-gray-50 inline-block px-3 py-1.5 rounded-full shadow-sm">
                        {cartMessage}
                      </p>
                    </div>
                  )}
                </div>

                {/* Zen proverb placeholder */}
                <div className="text-center text-[10px] text-gray-400 pt-2 border-t border-gray-100">
                  一阴一阳 · 谓之道
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
                <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5 text-gray-300" />
                </div>
                <p className="text-gray-400 text-sm">静待君选</p>
                <p className="text-xs text-gray-300 mt-1">Awaiting your choice</p>
              </div>
            )}
          </div>
        </div>

        {/* Subtle Calligraphy Footer */}
        <div className="text-center mt-12 text-[10px] text-gray-400 tracking-widest">
          水墨之间 · 自有乾坤
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.4s ease-out forwards;
        }
        .bg-ink-paper {
          background-color: #faf8f2;
          background-image: radial-gradient(circle at 25% 40%, rgba(0,0,0,0.02) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .font-serif {
          font-family: 'Noto Serif SC', 'Times New Roman', serif;
        }
      `}</style>
    </div>
  );
}