"use client";
import { FaBars } from "react-icons/fa6";
import { GoHome, GoHomeFill, GoSearch } from "react-icons/go";
import { FaSpotify } from "react-icons/fa";
import { BiLibrary } from "react-icons/bi";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import Link from "next/link";
import { usePathname } from "next/navigation";

const FooterNav = () => {
  const pathname = usePathname();

  const footerLinks = [
    { icon: <GoHome />, icon2: <GoHomeFill />, href: "", label: "Home" },
    {
      icon: <GoSearch />,
      icon2: <GoSearch />,
      href: "search",
      label: "Search",
    },
    {
      icon: <BiLibrary />,
      icon2: <BiLibrary />,
      href: "playlist",
      label: "Your Library",
    },
    {
      icon: <IoIosHeartEmpty />,
      icon2: <IoIosHeart />,
      href: "collection",
      label: "Liked Songs",
    },
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
            <div className="text-2xl">
              {pathname === `/${item.href}` ? item.icon2 : item.icon}
            </div>
            <div className="text-base">{item.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FooterNav;
