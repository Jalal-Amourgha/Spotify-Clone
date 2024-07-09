import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { LuClock3 } from "react-icons/lu";
import { format } from "date-fns";
import { IoPlay } from "react-icons/io5";
import Playlists from "./Playlists";
import { useAppContext } from "../context";
import { SongProps } from "../types";
import { useNavigate } from "react-router-dom";

interface DisplaySongsProps {
  data: any[];
  album?: boolean;
  plays?: boolean;
  date?: boolean;
}

const DisplaySongs = ({
  data,
  album = false,
  plays = false,
  date = false,
}: DisplaySongsProps) => {
  const {
    songSelected,
    setSongSelected,
    setPlaying,
    setPlaylistSelected,
    likedSongs,
    setLikedSongs,
  } = useAppContext();

  const [hovered, setHovered] = useState(-1);
  const [showAddToPlaylistDiv, setShowAddToPlaylistDiv] = useState({
    index: -1,
    show: false,
  });
  const navigate = useNavigate();

  const handleAddedIn = (date: string) => {
    return format(new Date(date), "MMM d, yyyy");
  };

  const addToList = (song: any) => {
    if (
      likedSongs.findIndex((item: SongProps) => item.name === song.name) === -1
    ) {
      setLikedSongs([...likedSongs, song]);
    } else {
      setLikedSongs(
        likedSongs.filter((item: SongProps) => item.name !== song.name)
      );
    }
  };
  const playSong = (song: SongProps) => {
    var indexOfSelectedSong = data.findIndex(
      (item: SongProps) => item.name === song.name
    );
    setSongSelected({
      url: song.url,
      artist: song.artist,
      name: song.name,
      img: song.img,
      duration: song.duration,
    });
    setPlaylistSelected(data.filter((e, i) => i > indexOfSelectedSong));
    setPlaying(true);
  };

  return (
    <>
      {/* F O R - D E S K T O P */}
      <div className="hidden md:block relative z-10 p-5 text-base">
        <div className="flex flex-row items-center mt-10 text-lg text-gray pb-4 pl-5 pe-8 border-b-1 border-gray">
          <div className="basis-1/2 flex items-center gap-3">
            <span>#</span> <span>Title</span>
          </div>
          <div
            className={`basis-1/2 grid ${
              album || plays ? "grid-cols-3 " : ""
            }  items-center`}
          >
            {plays && <span>Plays</span>}
            {album && <span>Album</span>}
            {date && <span>Added in</span>}

            <LuClock3 className="ml-auto" />
          </div>
        </div>
        <div className="flex flex-col gap-5 mt-10">
          {data.length > 0 &&
            data.map((song, index) => (
              <div className="relative" key={index}>
                <div
                  className="flex flex-row items- py-2 pl-5 pe-8 relative rounded-lg text-base hover:bg-[#6d6a75a6]  cursor-pointer"
                  onClick={() => playSong(song)}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(-1)}
                >
                  <div className="basis-1/2 flex items-center gap-3">
                    <span className="text-xl text-gray w-5">
                      {songSelected.url === song.url ? (
                        <div className="playing"></div>
                      ) : hovered === index ? (
                        <IoPlay className="text-xl hover:text-primary cursor-pointer" />
                      ) : (
                        index + 1
                      )}
                    </span>
                    <div>
                      <img
                        src={song.img}
                        width={50}
                        height={50}
                        sizes="100%"
                        className={`img-${index} rounded-lg`}
                        id={`img-${index}`}
                        alt="img"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h1
                        className={`${
                          songSelected.name === song.name ? "text-primary" : ""
                        } hover:underline hover:text-primary`}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(
                            `/song/${song.name
                              .toLowerCase()
                              .replaceAll(" ", "")}`
                          );
                        }}
                      >
                        {song.name}
                      </h1>
                      <p className="text-gray">{song.artist}</p>
                    </div>
                  </div>
                  <div
                    className={`basis-1/2 grid ${
                      album || plays ? "grid-cols-3 " : ""
                    } relative items-center text-gray gap-3`}
                  >
                    {plays && (
                      <p className="text line-clamp-1 w-fit">{song.views}</p>
                    )}
                    {album && <p>{song.album}</p>}
                    {date && <p>{handleAddedIn(song.added_in)}</p>}
                    <div className="absolute right-20 top-5 z-10 text-xl">
                      {likedSongs[
                        likedSongs.findIndex(
                          (item: any) => item.name === song.name
                        )
                      ] ? (
                        <IoIosHeart
                          className="text-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToList({
                              img: song.img,
                              artist: song.artist,
                              name: song.name,
                              album: song.album,
                              url: song.url,
                              duration: song.duration,
                              added_in: new Date().toString(),
                            });
                          }}
                        />
                      ) : (
                        <IoIosHeartEmpty
                          onClick={(e) => {
                            e.stopPropagation();
                            addToList({
                              img: song.img,
                              artist: song.artist,
                              name: song.name,
                              album: song.album,
                              url: song.url,
                              duration: song.duration,
                              added_in: new Date().toString(),
                            });
                          }}
                          className="cursor-pointer"
                        />
                      )}
                    </div>
                    <p className="text-end">{song.duration}</p>
                  </div>
                  <div
                    className="absolute top-0 right-0 h-[68px] w-12 flex justify-end items-center z-[100]"
                    onClick={(e) => {
                      e.stopPropagation();

                      setShowAddToPlaylistDiv({
                        index: index,
                        show: !showAddToPlaylistDiv.show,
                      });
                    }}
                  >
                    {hovered === index ? (
                      <BsThreeDots className="text-2xl" />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="absolute h-[300px] top-16 right-0 z-[100]">
                  {showAddToPlaylistDiv.index === index &&
                  showAddToPlaylistDiv.show ? (
                    <Playlists song={song} />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* F O R - M O B I L E S */}
      <div className="md:hidden relative  bg-neutral-900/40 text-base flex flex-col gap-2 p-2">
        {data.map((song, index) => (
          <div
            className="flex justify-between items-center"
            onClick={() => playSong(song)}
            key={index}
          >
            <div className="flex items-center gap-2">
              <img
                src={song.img}
                height={40}
                width={40}
                className="rounded-lg"
                alt="img"
              />
              <div>
                <h1
                  className={`text-lg font-semibold ${
                    songSelected.name === song.name ? "text-primary" : ""
                  } hover:text-primary  cursor-pointer`}
                >
                  {song.name}
                </h1>
                <p className="text-gray">{song.artist}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DisplaySongs;
