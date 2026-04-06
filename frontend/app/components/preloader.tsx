"use client";
import Image from "next/image";
import LoadingGIF from "../assets/loading.gif";
import { usePreloader } from "../contexts/PreloaderContext";
import LiveWallpaper from "./liveWallpaper";

export default function Preloader() {
  const { loading } = usePreloader();

  if (!loading) return null;

  const message = "正在加载 · Loading";
  const subtext = "请稍候，墨韵即将呈现";

  return (
    <>
    <div className="fixed inset-0 z-50 flex items-center justify-center theme-aware-background backdrop-blur-sm px-4 py-8">
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/95 shadow-2xl backdrop-blur-xl dark:bg-slate-900/95 theme-aware">

        <div className="pt-10 pb-8 px-8 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full theme-aware-background shadow-inner shadow-slate-200 dark:bg-slate-800">
            <Image
              src={LoadingGIF}
              height={60}
              width={60}
              alt="loading..."
              className="rounded-full"
            />
          </div>

          <h1 className="text-2xl font-serif font-light tracking-wide text-slate-900 dark:text-white theme-aware-primary-color">
            {message}
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-300 theme-aware-secondary-color">
            {subtext}
          </p>

          <div className="mt-8 flex items-center justify-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full theme-aware-secondary-background animate-pulse"></span>
            <span style={{ animationDelay: "150ms" }} className="h-2.5 w-2.5 rounded-full theme-aware-secondary-background animate-pulse"></span>
            <span style={{ animationDelay: "300ms" }} className="h-2.5 w-2.5 rounded-full theme-aware-secondary-background animate-pulse"></span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
