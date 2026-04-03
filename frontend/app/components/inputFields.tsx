"use client";

import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

interface InputFieldProps {
  variant: "text" | "email" | "password";
  placeholder: string;
  isLightMode: boolean;
}

export default function InputField({
  variant,
  placeholder,
  isLightMode,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = variant === "password";

  const inputType = isPassword
    ? showPassword
      ? "text"
      : "password"
    : variant;

  const Icon =
    variant === "email"
      ? Mail
      : variant === "password"
      ? Lock
      : User;

  return (
    <div className="relative group">
      {/* Left Icon */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gray-600 transition-colors duration-200">
        <Icon className="w-4 h-4" />
      </div>

      {/* Input */}
      <input
        type={inputType}
        placeholder={placeholder}
        className={`
          w-full pl-10 ${isPassword ? "pr-10" : "pr-4"} py-3 rounded-xl border transition-all duration-200
          focus:outline-none focus:ring-1
          ${
            isLightMode
              ? "bg-white/80 border-gray-200 focus:ring-gray-400 focus:border-gray-400 text-gray-800 placeholder:text-gray-400"
              : "bg-gray-700/80 border-gray-600 focus:ring-gray-400 focus:border-gray-400 text-gray-100 placeholder:text-gray-400"
          }
        `}
      />

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      )}
    </div>
  );
}