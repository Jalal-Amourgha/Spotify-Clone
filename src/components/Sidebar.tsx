"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { GoHomeFill, GoSearch } from "react-icons/go";

const links = [
  { icon: <GoHomeFill />, href: "", label: "Home" },
  { icon: <GoSearch />, href: "search", label: "Search" },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <header className="flex flex-col gap-5 p-4 text-white">
      {links.map((item) => (
        <Link
          href={`/${item.href}`}
          className={`flex items-center gap-3 text-2xl ${
            pathname === `/${item.href}` ? "text-white" : "text-gray"
          }`}
          key={item.label}
        >
          <div>{item.icon}</div>
          <div className="hidden lg:block text-lg">{item.label}</div>
        </Link>
      ))}
    </header>
  );
};

export default Sidebar;
