import {
  Home,
  Albums,
  Search,
  Artists,
  Artist,
  Album,
  Chart,
  Song,
  Collection,
  Playlist,
  Lyrics,
  Playlists,
} from "./pages";
import { useEffect, useRef } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import { useAppContext } from "./context";
import {
  Footer,
  FooterNav,
  Library,
  Nav,
  PlayingSong,
  Queue,
  Sidebar,
  SongPlayer,
} from "./components";

const App = () => {
  const { setScrollHeight, songSelected, songProps } = useAppContext();

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      setScrollHeight(scrollContainerRef.current.scrollHeight);
    }
  }, []);

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
    <HashRouter>
      <div
        className={`h-screen grid ${
          songProps.queue || songProps.playing
            ? "grid-cols-[100%] lg:grid-cols-[360px_auto_360px]"
            : "grid-cols-[100%] lg:grid-cols-[360px_auto_0px]"
        } gap-2`}
      >
        <div className="hidden lg:flex flex-col w-full gap-2">
          <div className="bg-neutral-900 md:rounded-xl">
            <Sidebar />
          </div>
          <div className="bg-neutral-900 h-full rounded-xl">
            <Library />
          </div>
        </div>
        <div
          className={`w-full h-full bg-neutral-900 md:rounded-xl overflow-x-hidden overflow-y-scroll`}
          ref={scrollContainerRef}
        >
          <div>
            <div className="relative bg-color">
              <Nav />
              <div className="w-full">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/artists" element={<Artists />} />
                  <Route path="/artists/:id" element={<Artist />} />
                  <Route path="/albums" element={<Albums />} />
                  <Route path="/albums/:id" element={<Album />} />
                  <Route path="/chart/:id" element={<Chart />} />
                  <Route path="/song/:id" element={<Song />} />
                  <Route path="/collection" element={<Collection />} />
                  <Route path="/lyrics" element={<Lyrics />} />
                  <Route path="/playlists" element={<Playlists />} />
                  <Route path="/playlist/:id" element={<Playlist />} />
                </Routes>
                <Footer />
              </div>
            </div>
          </div>
        </div>
        <div
          className={`hidden lg:block ${
            songProps.queue || songProps.playing ? "w-full" : "hidden"
          }`}
        >
          {songProps.queue ? <Queue /> : ""}
          {songProps.playing ? <PlayingSong /> : ""}
        </div>
      </div>
      {songSelected.url ? <SongPlayer /> : ""}
      <FooterNav />
    </HashRouter>
  );
};

export default App;
