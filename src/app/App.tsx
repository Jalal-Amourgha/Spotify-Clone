"use client";

import {
  EditPlaylist,
  Footer,
  FooterNav,
  Library,
  Nav,
  Queue,
  Sidebar,
  SongPlayer,
} from "@/components";
import { useAppContext } from "@/context";
import { useEffect, useRef } from "react";

const App = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { setScrollHeight, songSelected, isQueueOpen, editPlaylist } =
    useAppContext();

  const scrollContainerRef: any = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      setScrollHeight(scrollContainerRef.current.scrollHeight);
    }
  }, [children]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        setScrollHeight(scrollContainerRef.current.scrollTop);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [scrollContainerRef.current]);

  return (
    <>
      <div
        className={`h-screen grid  ${
          isQueueOpen
            ? "grid-cols-[100%] lg:grid-cols-[360px_auto_360px]"
            : "grid-cols-[100%] lg:grid-cols-[360px_auto_0px]"
        } 
            gap-2`}
      >
        <div className="hidden lg:flex flex-col w-full  gap-2">
          <div className="bg-neutral-900 md:rounded-xl">
            <Sidebar />
          </div>
          <div className="bg-neutral-900 h-full rounded-xl">
            <Library />
          </div>
        </div>
        <div
          className={`w-full  h-full bg-neutral-900 md:rounded-xl overflow-x-hidden overflow-y-scroll`}
          ref={scrollContainerRef}
        >
          <div>
            <div className="relative bg-color">
              <Nav />

              <div className="  w-full">
                {children}
                <Footer />
              </div>
            </div>
          </div>
        </div>
        <div className={`hidden lg:block ${isQueueOpen ? "w-full" : "hidden"}`}>
          {isQueueOpen ? <Queue /> : ""}
        </div>
      </div>
      {songSelected.url ? <SongPlayer /> : ""}
      <FooterNav />
      {editPlaylist.situation ? <EditPlaylist /> : ""}
    </>
  );
};

export default App;
