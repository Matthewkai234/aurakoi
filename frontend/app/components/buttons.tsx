"use client";
import { ShoppingBag } from "lucide-react";

interface ButtonProps {
  variant: "primary" | "secondary" | "addToCart";
  content?: string;
  // props for addToCart variant
  stock?: number;
  isAdding?: boolean;
  onAddToCart?: () => void;
}

export default function Buttons({ variant, content, stock, isAdding, onAddToCart }: ButtonProps) {
  if (variant === "primary") {
    return <button className="px-4 py-2 bg-gray-800 text-white rounded-full">{content}</button>;
  }

  if (variant === "addToCart") {
    const isOutOfStock = !stock || stock <= 0;
    const disabled = isOutOfStock || isAdding;

    return (
      <button
        onClick={onAddToCart}
        disabled={disabled}
        className={`
          group relative w-full py-3 px-4 rounded-full overflow-hidden
          transition-all duration-500 ease-out
          ${!isOutOfStock ? "bg-gray-800 text-white hover:bg-black cursor-pointer" : "bg-gray-200 text-gray-400 cursor-not-allowed"}
        `}
      >
        <span className="relative z-10 flex items-center justify-center gap-2 text-sm tracking-wide">
          {isAdding ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              入篮中 · Adding
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              {!isOutOfStock ? "添至竹篮 · Add to Cart" : "已无余 · Out of Stock"}
            </>
          )}
        </span>
        {/* Ink wash hover effect */}
        {!isOutOfStock && (
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 bg-gradient-to-r from-gray-700 to-black" />
        )}
      </button>
    );
  }

  // fallback / secondary variant
  return <button className="px-4 py-2 border border-gray-400 rounded-full">{content}</button>;
}