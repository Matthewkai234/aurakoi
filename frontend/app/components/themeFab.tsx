"use client";
import useTheme from "../hooks/usetheme"
import { BsYinYang } from "react-icons/bs";
import Yin from "../assets/yin.png";
import Yang from "../assets/yang.png";
import Image from "next/image";

export default function ThemeFab() {
  const { setTheme } = useTheme();
             

  return (
    <>
          <div className="fixed bottom-6 right-6 z-30 pointer-events-none">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0">
                <div className="fab fab-flower">
                  <div tabIndex={0} role="button" className="btn btn-lg btn-circle btn-success text-white bg-black"><BsYinYang className="h-10 w-10" /></div> 
                  <button className="fab-main-action btn btn-circle btn-lg"><BsYinYang className="h-10 w-10 reverse" /></button>
                  <button className="btn btn-lg btn-circle justify-end bg-white" onClick={() => setTheme("dark")}>
                    <Image src={Yin} alt="yin-darktheme" height={30} width={34} />
                  </button>
                  <button className="btn btn-lg btn-circle justify-start bg-black" onClick={() => setTheme("light")}> 
                    <Image src={Yang} alt="yin-lighttheme" height={30} width={34} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          </>
  );
}