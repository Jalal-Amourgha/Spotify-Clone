"use client";
import { FaBars } from "react-icons/fa6";
import { GoHomeFill, GoSearch } from "react-icons/go";
import { FaSpotify } from "react-icons/fa";
import { BiLibrary } from "react-icons/bi";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import Link from "next/link";
import { usePathname } from "next/navigation";

const FooterNav = () => {
  const pathname = usePathname();

  const footerLinks = [
    { icon: <GoHomeFill />, href: "", label: "Home" },
    { icon: <GoSearch />, href: "search", label: "Search" },
    { icon: <BiLibrary />, href: "playlists", label: "Your Library" },
    { icon: <IoIosHeartEmpty />, href: "collection", label: "Liked Songs" },
  ];
  return (
    <div className="block md:hidden sticky bottom-0 left-0 w-full z-[100] bg-black p-2  border-t-1 border-gray">
      <div className="flex justify-between items-center">
        {footerLinks.map((item) => (
          <Link
            href={`/${item.href}`}
            className={`flex flex-col items-center text-gray ${
              pathname === `/${item.href}` ? "text-white" : "text-gray"
            }`}
            key={item.label}
          >
            <div className="text-2xl">{item.icon}</div>
            <div className="text-base">{item.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FooterNav;
