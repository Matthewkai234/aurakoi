"use client";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Product } from "../../types/Iproduct";
import { LogIn, UserPlus } from "lucide-react";

interface ButtonProps {
  variant: "primary" | "secondary" | "addToCart" | "Auth";
  content?: string;

  product?: Product;
  onAddToCart?: (product: Product) => Promise<void>;
  authtype?: "login" | "signup";
}

export default function Buttons({ variant, content, product, onAddToCart, authtype }: ButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState("");

  if (variant === "primary") {
    return <button className="px-4 py-2 bg-gray-800 text-white rounded-full">{content}</button>;
  }

  if (variant === "Auth") {
    return (
      <button
        type="submit"
        className="w-full py-3 rounded-full font-medium flex items-center justify-center gap-2 bg-gray-800 text-white cursor-pointer transition-all duration-300 tracking-wide hover:bg-gray-700 shadow-sm"
      >
        {authtype === "login" ? (
          <>
            <LogIn className="w-4 h-4" />
            登录 · Sign In
          </>
        ) : (
          <>
            <UserPlus className="w-4 h-4" />
            创建账户 · Create Account
          </>
        )}
      </button>
    );
  }

  if (variant === "addToCart") {
    if (!product) return null;

    const isOutOfStock = !product.Stock || product.Stock <= 0;
    const disabled = isOutOfStock || isAdding;

    const handleClick = async () => {
      if (isOutOfStock) {
        setMessage("无货 · Out of stock");
        setTimeout(() => setMessage(""), 2000);
        return;
      }

      setIsAdding(true);
      try {
        await onAddToCart?.(product);
        setMessage(`「${product.Title}」 已添至竹篮 · Added`);
      } catch (error) {
        setMessage("添加失败 · Please try again");
      } finally {
        setIsAdding(false);
        setTimeout(() => setMessage(""), 2000);
      }
    };

    return (
      <div>
        <button
          onClick={handleClick}
          disabled={disabled}
          className={`
            group relative w-full py-3 px-4 rounded-full overflow-hidden
            transition-all duration-500 ease-out
            ${!isOutOfStock ? "theme-aware-button hover:bg-black cursor-pointer" : "bg-gray-200 text-gray-400 cursor-not-allowed"}
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

        {/* Message displayed below the button */}
        {message && (
          <div className="mt-3 text-center animate-fade-in-up">
            <p className="text-xs text-gray-600 bg-gray-50 inline-block px-3 py-1.5 rounded-full shadow-sm">
              {message}
            </p>
          </div>
        )}
      </div>
    );
  }

  return <button className="px-4 py-2 border border-gray-400 rounded-full">{content}</button>;
}