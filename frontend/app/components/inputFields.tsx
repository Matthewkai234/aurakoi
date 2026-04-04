"use client";

import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

interface InputFieldProps {
  variant: "text" | "email" | "password";
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({
  variant,
  placeholder,
  value,
  onChange,
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
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gray-600 transition-colors duration-200">
        <Icon className="w-4 h-4" />
      </div>

      {/* Input */}
      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          w-full pl-10 ${isPassword ? "pr-3" : "pr-3"} py-3 rounded-xl border transition-all duration-200
          focus:outline-none focus:ring-1 theme-aware-primary-color

        `}
      />

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
        </button>
      )}
    </div>
  );
}