"use client";

import HomeComponents from "@/components/HomeComponents";
import { useAppContext } from "@/context";
import { AlbumProps, ArtistsProps, DataSongProps, SongProps } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCircle, FaPlayCircle } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";

const SearchPage = () => {
  const {
    data,
    songSelected,
    setSongSelected,
    search,
    setSearch,
    setPlaylistSelected,
  } = useAppContext();
  const router = useRouter();
  const [searchedArtists, setSearchedArtists] = useState<any>([]);
  const [searchedAlbums, setSearchedAlbums] = useState<any>([]);
  const [topResult, setTopResult] = useState<any>([]);
  const [topRelatedSongs, setTopRelatedSongs] = useState<any>([]);
  const [hovered, setHovered] = useState<string>("");

  useEffect(() => {
    if (search !== "" || search !== " ") {
      setSearchedArtists(
        data.artists.filter(
          (artist: ArtistsProps) =>
            artist.name.toLowerCase().startsWith(search.toLowerCase()) ||
            artist.name.toLowerCase().includes(search.toLowerCase())
        )
      );
      setSearchedAlbums(
        data.albums.filter(
          (album: AlbumProps) =>
            album.name.toLowerCase().startsWith(search.toLowerCase()) ||
            album.name.toLowerCase().includes(search.toLowerCase())
        )
      );
      setTopResult(
        data.data.filter(
          (song: DataSongProps) =>
            song.name.toLowerCase().startsWith(search.toLowerCase()) ||
            song.name.toLowerCase().includes(search.toLowerCase())
        )[0]
      );
      setTopRelatedSongs(
        data.data.filter(
          (song: DataSongProps) =>
            song.name.toLowerCase().startsWith(search.toLowerCase()) ||
            song.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search]);

  const playSong = (song: SongProps) => {
    setSongSelected({
      url: song.url,
      artist: song.artist,
      name: song.name,
      img: song.img,
      duration: song.duration,
    });
  };
  return (
    <>
      {/* F O R - P H O N E S - O N L Y */}
      <div className="block md:hidden mx-2">
        <h1 className="text-2xl font-bold mb-5">Search</h1>
        <div className="w-full relative">
          <div className="absolute top-3 left-3 text-xl text-black">
            <IoSearchOutline />
          </div>
          <input
            type="text"
            className="w-full py-2 pl-10 bg-white text-black text-base rounded-lg placeholder:text-black"
            placeholder="What do you want to play?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {search === "" ? (
        <div className="mt-100 mx-3">
          <h1 className="text-2xl font-semibold ">Browse All</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-5">
            {data.categories.map((category: any, index: number) => (
              <div
                className={`rounded-lg overflow-hidden p-3 h-40 cursor-pointer`}
                style={{ background: `#${category.color}` }}
                onClick={() => router.push(`/genre/${category.name}`)}
                key={index}
              >
                <h1 className="text-xl font-medium">{category.name}</h1>
                <div className="-m-5 rotate-[30deg]">
                  <Image
                    src={category.img}
                    height={100}
                    width={100}
                    sizes="100%"
                    className="rounded-lg ml-auto"
                    alt="img"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}

      {search !== "" ? (
        <>
          {topRelatedSongs.length > 0 ? (
            <div className="my-100 mx-6 flex flex-row gap-10">
              <div>
                <h1 className="text-2xl font-bold mb-5">Top Result</h1>
                <div
                  className="min-w-[400px] relative p-4 rounded-lg bg-[#1f1f1f] hover:bg-neutral-600 cursor-pointer"
                  onMouseEnter={() => setHovered(topResult.name)}
                  onMouseLeave={() => setHovered("")}
                  onClick={() => playSong(topResult)}
                >
                  <div className="mb-5">
                    <Image
                      src={topResult.img}
                      height={100}
                      width={100}
                      sizes="100%"
                      className="rounded-lg"
                      alt="img"
                    />
                    {hovered === topResult.name ? (
                      <div className="absolute bottom-3 right-3 bg-black text-primary text-4xl rounded-full">
                        <FaPlayCircle />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold mb-2">
                      {topResult.name}
                    </h1>
                    <div className="flex items-center gap-1 text-gray">
                      <span className="h-4 w-4 flex justify-center items-center bg-gray text-black  rounded-sm text-xs">
                        E
                      </span>
                      <span>Song</span>
                      <FaCircle className="text-[4px] mx-1" />
                      <span className="text-white">{topResult.artist}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <h1 className="text-2xl font-bold mb-5">Songs</h1>
                <div className="flex flex-col">
                  {topRelatedSongs.map((song: DataSongProps, index: number) =>
                    index < 4 ? (
                      <div
                        className="flex justify-between items-center p-2 rounded-lg hover:bg-[#1f1f1f] cursor-pointer"
                        key={index}
                        onClick={() => playSong(song)}
                      >
                        <div className="flex items-center gap-1">
                          <div>
                            <Image
                              src={song.img}
                              height={40}
                              width={40}
                              sizes="100%"
                              className="rounded-lg"
                              alt="img"
                            />
                          </div>
                          <div className="flex flex-col">
                            <h1
                              className={`${
                                song.name === songSelected.name
                                  ? "text-primary"
                                  : ""
                              } hover:underline cursor-pointer`}
                            >
                              {song.name}
                            </h1>
                            <p className="text-gray">{song.artist}</p>
                          </div>
                        </div>
                        <div className="text-gray">{song.duration}</div>
                      </div>
                    ) : (
                      ""
                    )
                  )}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          {searchedArtists.length > 0 ? (
            <HomeComponents
              data={searchedArtists}
              displayHome
              rounded
              title="Artists"
              route="artists"
            />
          ) : (
            ""
          )}

          {searchedAlbums.length > 0 ? (
            <HomeComponents
              data={searchedAlbums}
              displayHome
              title="Albums"
              route="albums"
            />
          ) : (
            ""
          )}

          <HomeComponents
            data={data.featuredCharts}
            displayHome
            title="Featured Charts"
            route="charts"
          />
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default SearchPage;
