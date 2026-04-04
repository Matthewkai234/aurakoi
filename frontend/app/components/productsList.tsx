"use client";
import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
import Image from "next/image";
import { SlidersHorizontal, Sparkles } from "lucide-react";
import Buttons from "./buttons";
import { Product } from "../../types/Iproduct";
import { useSearchParams } from "next/navigation";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [zoomActive, setZoomActive] = useState<boolean>(false);
  const [zoomPosition, setZoomPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "All";

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = category.toLowerCase() === "all" ? await fetch("/api/products") : await fetch(`/api/products/category/${category}`);
        const data: Product[] = await res.json();
        setProducts(data);

        const uniqueSubs = [
          ...new Set(
            data
              .map((p) => p.SubCategory?.trim())
              .filter((sub): sub is string => !!sub)
          ),
        ];
        setSubCategories(uniqueSubs);

        if (data.length > 0) setSelectedProduct(data[0]);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }
    fetchProducts();
  }, [category]);

  const filtered = useMemo(() => {
    if (selectedSub) {
      return products.filter(
        (p) => p.SubCategory?.trim().toLowerCase() === selectedSub.toLowerCase()
      );
    }
    return products;
  }, [products, selectedSub]);

  useEffect(() => {
    if (selectedProduct && !filtered.some((p) => p.Id === selectedProduct.Id)) {
      setSelectedProduct(filtered[0] || null);
    } else if (!selectedProduct && filtered.length > 0) {
      setSelectedProduct(filtered[0]);
    }
  }, [filtered, selectedProduct]);

  const addToCart = useCallback(async (product: Product) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log(`Added ${product.Title} to cart`);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x: Math.min(100, Math.max(0, x)), y: Math.min(100, Math.max(0, y)) });
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden theme-aware-background opacity-90 z-20">
      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        {/* Page Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-6 py-2 border-b border-gray-300">
            <Sparkles className="w-4 h-4 theme-aware-secondary-color" />
            <h1 className="text-3xl md:text-4xl font-light tracking-wide font-serif">
              {category}
            </h1>
            <div className="w-6 h-px theme-aware-secondary-background rotate-12" />
          </div>
          <p className="theme-aware-secondary-color text-sm mt-4 font-light italic">水墨·阴阳·自然之选</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Product Icons with Filter */}
          <div className="theme-aware backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden">
            <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 bg-gray-500 rounded-full" />
                <h2 className="text-lg font-medium tracking-wide">{category}</h2>
              </div>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="flex items-center mt-1 gap-1  py-1  theme-aware-primary-color transition-all duration-300 hover:scale-105 rounded-full cursor-pointer">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span className="text-xs hidden sm:inline">选 · Select</span>
                </div>
                <ul className="dropdown-content menu theme-aware backdrop-blur-sm rounded-xl z-20 min-w-36 p-2 shadow-lg border border-gray-100">
                  <li><button onClick={() => setSelectedSub(null)} className="theme-aware-primary-color hover:bg-gray-50 rounded-lg px-3 py-1.5 text-sm">全部 · All</button></li>
                  {subCategories.map((sub) => (
                    <li key={sub}><button onClick={() => setSelectedSub(sub)} className="theme-aware-secondary-color hover:bg-gray-50 rounded-lg px-3 py-1.5 text-sm">{sub}</button></li>
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
                    className={`group relative flex items-center justify-center aspect-square border rounded-lg min-h-4 transition-all duration-300 cursor-pointer
                      ${selectedProduct?.Id === product.Id ? " scale-110 " : "  "}`}
                  >
                    {product.IconImage ? (
                      <Image src={product.IconImage} alt={product.Title} width={40} height={40} className="object-contain transition-transform duration-300 group-hover:scale-105" />
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 rounded-full" />
                    )}
                    {selectedProduct?.Id === product.Id && <div className="absolute -top-1 -right-1 w-2.5 h-2.5 theme-aware-reverse rounded-full" />}
                  </div>
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="text-center py-12 text-gray-400 text-sm">
                  <div className="inline-block p-4 rounded-full bg-gray-50"><Sparkles className="w-6 h-6" /></div>
                  <p className="mt-2">无此品类 · No products</p>
                </div>
              )}
            </div>
          </div>

          {/* Column 2: Main Product Image with Zoom Lens */}
          <div className="theme-aware backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/60 p-6 flex items-center justify-center min-h-[400px]">
            {selectedProduct?.ImageUrl ? (
              <div
                ref={imageContainerRef}
                className="relative w-full h-80 md:h-96 group cursor-crosshair"
                onMouseEnter={() => setZoomActive(true)}
                onMouseLeave={() => setZoomActive(false)}
                onMouseMove={handleMouseMove}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100/20 to-transparent rounded-xl pointer-events-none z-10" />
                <Image src={selectedProduct.ImageUrl} alt={selectedProduct.Title} fill className="object-contain rounded-xl transition-all duration-700 group-hover:scale-[1.02]" sizes="(max-width: 768px) 100vw, 33vw" priority />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
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
                <div className="w-24 h-24 mx-auto mb-4 rounded-full border border-gray-200 flex items-center justify-center"><Sparkles className="w-8 h-8 opacity-50" /></div>
                <p className="text-sm">择一物 · 观其形</p>
                <p className="text-xs mt-1">Select a product to reveal</p>
              </div>
            )}
          </div>

          {/* Column 3: Product Details */}
          <div className="theme-aware backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/60 p-6">
            {selectedProduct ? (
              <div className="space-y-5">
                <div className="relative">
                  <div className="absolute -top-1 left-0 w-8 h-px bg-gray-400" />
                  <h2 className="text-2xl font-medium theme-aware-primary-color pt-2 tracking-wide">{selectedProduct.Title}</h2>
                  <div className="w-12 h-0.5 bg-gray-300 mt-2" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-light theme-aware-primary-color">¥{selectedProduct.Price?.toFixed(2) ?? "0.00"}</span>
                  <span className="text-xs text-gray-400 tracking-wider">水墨价</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="theme-aware-secondary-color">余量 · Stock</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${selectedProduct.Stock > 0 ? " theme-aware-primary-color" : "theme-aware-primary-color"}`}>
                    {selectedProduct.Stock > 0 ? `${selectedProduct.Stock} 件` : "无货 · Out"}
                  </span>
                </div>
                {selectedProduct.Sizes && selectedProduct.Sizes.length > 0 && (
                  <div>
                    <span className="text-xs theme-aware-secondary-color tracking-wide uppercase">尺码 · Sizes</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedProduct.Sizes.map((size) => (
                        <span key={size} className="px-3 py-1 text-xs border border-gray-300 rounded-full text-gray-600 bg-white/50">{size}</span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="pt-2">
                  <h3 className="text-xs theme-aware-primary-color tracking-wide uppercase mb-2">墨韵 · Description</h3>
                  <p className="theme-aware-secondary-color leading-relaxed text-sm font-light border-l-2 border-gray-200 pl-3">
                    {selectedProduct.Description || "无描述 · 静待缘人"}
                  </p>
                </div>

                {/* Simplified Add to Cart – all logic inside Buttons */}
                <div className="pt-4">
                  <Buttons
                    variant="addToCart"
                    product={selectedProduct}
                    onAddToCart={addToCart}
                  />
                </div>

                <div className="text-center text-[10px] text-gray-400 pt-2 border-t border-gray-100">一阴一阳 · 谓之道</div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
                <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center mb-3"><Sparkles className="w-5 h-5 text-gray-300" /></div>
                <p className="text-gray-400 text-sm">静待君选</p>
                <p className="text-xs text-gray-300 mt-1">Awaiting your choice</p>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-12 text-[10px] text-gray-400 tracking-widest">水墨之间 · 自有乾坤</div>
      </div>
    </div>
  );
}