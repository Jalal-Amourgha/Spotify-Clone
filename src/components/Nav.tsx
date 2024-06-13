"use client";
import { useAppContext } from "@/context";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { IoSearchOutline } from "react-icons/io5";
import { FaBars } from "react-icons/fa6";
import { FaSpotify } from "react-icons/fa";

export default function Nav() {
  const { scrollHeight, search, setSearch } = useAppContext();

  const pathname = usePathname();
  const router = useRouter();
  const [isNavOpen, setIsNavOpen] = useState(true);

  return (
    <>
      <div
        className={`sticky top-0 left-0 z-50  ${
          scrollHeight > 150 || pathname === "/search"
            ? "bg-neutral-900 "
            : "bg-opacity-0 bg-inherit"
        }  w-full  p-2 text-lg`}
      >
        {/* N A V - D E S K T O P */}
        <nav className="hidden lg:flex items-center justify-between">
          <div className="flex flex-row gap-3">
            <div
              className="h-10 w-10 flex justify-center items-center bg-black rounded-full text-xl cursor-pointer"
              onClick={() => router.back()}
            >
              <SlArrowLeft />
            </div>
            <div
              className="h-10 w-10 flex justify-center items-center bg-black rounded-full text-xl cursor-pointer"
              onClick={() => router.forward()}
            >
              <SlArrowRight />
            </div>
            {pathname === "/search" ? (
              <div className="relative">
                <div className="absolute top-3 left-3 text-xl text-gray">
                  <IoSearchOutline />
                </div>
                <input
                  type="text"
                  className="w-[400px] py-2 pl-10 bg-neutral-800 text-base rounded-full "
                  placeholder="What do you want to play?"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="flex items-center gap-5">
            <button className="hidden md:block py-2 px-8">Sign up</button>
            <button className="bg-white text-black font-semibold rounded-full py-2 px-8">
              Sign in
            </button>
          </div>
        </nav>

        {/* N A V - P H O N E S */}
        <nav className="flex justify-between items-center lg:hidden py-2">
          <FaSpotify
            className="text-3xl text-white "
            onClick={() => router.push("/")}
          />
          <div className="flex items-center gap-4">
            <IoSearchOutline className="text-xl cursor-pointer" />
            <button className="bg-white text-black font-semibold text-lg py-1 px-5 rounded-full">
              Open App
            </button>
            <FaBars
              className="text-xl cursor-pointer"
              onClick={() => setIsNavOpen(!isNavOpen)}
            />
          </div>
        </nav>
      </div>
    </>
  );
}

// export default Nav;
