"use client";
import Image from "next/image";
import YinYangLogo from "../assets/yinyang.png";

type PreloaderProps = {
  loading: boolean;
  message?: string;
  subtext?: string;
};

export default function Preloader({
  loading,
  message = "正在加载 · Loading",
  subtext = "请稍候，墨韵即将呈现",
}: PreloaderProps) {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center theme-aware-background backdrop-blur-sm px-4 py-8">
      <div className="relative items-center bg-black w-md">
        <span className=" absolute loading loading-ring loading-xl w-200"></span>
      </div>
    </div>
  );
}
