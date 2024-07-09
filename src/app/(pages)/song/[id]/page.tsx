"use client";

import {
  Background,
  BackgroundInfo,
  DisplaySongs,
  Playlists,
} from "@/components";
import { useAppContext } from "@/context";
import { SongProps } from "@/types";
import { useEffect, useState } from "react";
import { FaCirclePlay, FaCirclePause, FaCircleCheck } from "react-icons/fa6";
import { FiPlusCircle } from "react-icons/fi";
import { RxDotsHorizontal } from "react-icons/rx";
interface SongPageProps {
  params: {
    id: string;
  };
}

const SongPage = ({ params }: SongPageProps) => {
  const {
    data,
    playing,
    setPlaying,
    setSongSelected,
    setPlaylistSelected,
    likedSongs,
    setLikedSongs,
  } = useAppContext();
  const [selectedSong, setSelectedSong] = useState<SongPageProps | any>({
    name: "",
  });
  const [addToPlaylist, setAddToPlaylist] = useState(false);

  useEffect(() => {
    if (params.id && data) {
      setSelectedSong(
        data.data.find(
          (song: SongProps) =>
            song.name?.toLowerCase().replaceAll(" ", "") === params.id
        )
      );
    }
  }, [params.id, data]);

  const addToList = () => {
    selectedSong.added_in = new Date().toString();

    if (
      likedSongs.findIndex(
        (item: SongProps) => item.name === selectedSong.name
      ) === -1
    ) {
      setLikedSongs([...likedSongs, selectedSong]);
    } else {
      setLikedSongs(
        likedSongs.filter((item: SongProps) => item.name !== selectedSong.name)
      );
    }
  };

  const playSong = () => {
    setSongSelected({
      url: selectedSong.url,
      artist: selectedSong.artist,
      name: selectedSong.name,
      img: selectedSong.img,
      duration: selectedSong.duration,
    });
    setPlaylistSelected([selectedSong]);
    setPlaying(!playing);
  };

  if (!selectedSong.name) {
    return;
  }

  return (
    <>
      {/* Background */}
      <Background imgUrl={selectedSong.img} />

      {/* Background - Info */}

      <BackgroundInfo
        img={selectedSong.img}
        type="Song"
        title={selectedSong.name}
        // description={`${numberWithCommas(listeners)} Totaly listeners`}
        verified
      />

      {/* Song Play Btn */}
      <div className="hidden md:flex items-center gap-5 relative w-fit z-50">
        <div
          className="text-6xl text-primary ml-8 my-5 cursor-pointer"
          onClick={playSong}
        >
          {playing ? <FaCirclePause /> : <FaCirclePlay />}
        </div>

        <div className="text-3xl  cursor-pointer" onClick={addToList}>
          {likedSongs[
            likedSongs.findIndex((item: any) => item.name === selectedSong.name)
          ] ? (
            <FaCircleCheck className="text-primary" />
          ) : (
            <FiPlusCircle className="text-gray" />
          )}
        </div>

        <RxDotsHorizontal
          className="text-gray cursor-pointer"
          size={30}
          onClick={() => setAddToPlaylist(!addToPlaylist)}
        />
        {addToPlaylist ? (
          <div className="absolute top-20 -right-[200px] bg-neutral-700 z-10 h-10">
            <Playlists song={selectedSong} />
          </div>
        ) : (
          ""
        )}
      </div>

      {/* Display Artist Songs*/}
      <DisplaySongs data={[selectedSong]} album plays />
    </>
  );
};

export default SongPage;
