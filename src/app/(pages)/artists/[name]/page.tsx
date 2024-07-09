"use client";

import { useAppContext } from "@/context";
import { FC, useEffect, useState, useRef } from "react";
import { ArtistsProps, DataSongProps, SongProps } from "@/types";
import {
  Background,
  BackgroundInfo,
  DisplaySongs,
  Loader,
  HomeComponents,
} from "@/components";

interface PageProps {
  params: {
    name: string;
  };
}

const ArtistPage: FC<PageProps> = ({ params }) => {
  const { data } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [artistInfo, setArtistInfo] = useState({ name: "", img: "" });
  const [artistSongs, setArtistSongs] = useState<any>("");
  const [listeners, setListeners] = useState(5946);

  useEffect(() => {
    if (params.name && data.albums.length > 1) {
      setLoading(true);
      setArtistInfo(
        data.artists.filter(
          (artist: ArtistsProps) =>
            artist.name.replaceAll(" ", "").toLowerCase() ===
            params.name.toLowerCase()
        )[0]
      );
      setArtistSongs(
        data.data.filter(
          (artist: DataSongProps) =>
            artist.artist.replaceAll(" ", "").toLowerCase() ===
            params.name.toLowerCase()
        )
      );
    }
  }, [params.name, data]);

  if (!loading) {
    return <Loader />;
  }

  function numberWithCommas(n: number) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <>
      {/* Background */}
      <Background imgUrl={artistInfo.img} />

      {/* Background - Info */}

      <BackgroundInfo
        img={artistInfo.img}
        type="Artist"
        title={artistInfo.name}
        description={`${numberWithCommas(listeners)} Totaly listeners`}
        verified
        rounded
      />

      {/* Display Artist Songs*/}
      <DisplaySongs data={artistSongs} album plays />

      {/* Song Play Btn */}
      {/* <div className="flex items-center gap-5">
        <div className="text-5xl text-primary ml-8 my-5 cursor-pointer">
          {playing ? <FaPlayCircle /> : <FaPauseCircle />}
        </div>
        <button className="bg-inherit py-2 px-4 border-1 border-white rounded-full text-xl">
          Follow
        </button>
      </div> */}

      {/* List of Artist Songs */}

      {/* Artist Related To This */}
      <HomeComponents
        data={data.artists}
        title="Fans Also Like"
        displayRecommended
        rounded
        route="artists"
        selectedItem={artistInfo.name}
      />
    </>
  );
};

export default ArtistPage;
