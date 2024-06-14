"use client";

import { useAppContext } from "@/context";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { PiCursor, PiCursorClickFill } from "react-icons/pi";

export default function Home() {
  const { songSelected } = useAppContext();
  const [lyrics, setLyrics] = useState<any>("");
  const [error, setError] = useState("");
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [changeMode, setChangeMode] = useState(false);

  const fetchLyrics = async () => {
    try {
      const response = await fetch(
        `https://api.lyrics.ovh/v1/${songSelected.artist}/${songSelected.name}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const introPhrase = `Paroles de la chanson ${songSelected.name} par ${songSelected.artist}`;
      setLyrics(data.lyrics.replace(introPhrase, "").split(" "));
      setError("");
    } catch (error) {
      setError("Failed to fetch lyrics");
      setLyrics("");
    }
  };

  useEffect(() => {
    if (pathname === "/lyrics") {
      fetchLyrics();
    }
  }, [pathname]);

  return (
    <>
      <div className="mt-10 text-xl font-semibold text-center px-5 whitespace-pre-wrap relative">
        <div
          className="absolute top-0 right-10 text-2xl"
          onClick={() => setChangeMode(!changeMode)}
        >
          {changeMode ? (
            <PiCursor className="text-white hover:text-primary cursor-pointer" />
          ) : (
            <PiCursorClickFill className="text-primary cursor-pointer" />
          )}
        </div>
        {lyrics &&
          lyrics.map((word: any, index: number) => (
            <span
              key={index}
              className={`${
                changeMode
                  ? index === hoveredIndex
                    ? "text-primary"
                    : ""
                  : index <= hoveredIndex
                  ? "text-primary"
                  : ""
              } cursor-pointer`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
            >
              {word}{" "}
            </span>
          ))}
      </div>
    </>
  );
}
