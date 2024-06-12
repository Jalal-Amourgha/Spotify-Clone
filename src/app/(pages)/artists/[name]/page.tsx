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

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [artistInfo, setArtistInfo] = useState({ name: "", img: "" });
  const [artistSongs, setArtistSongs] = useState<any>("");
  const [listeners, setListeners] = useState(5946);

  useEffect(() => {
    const image = new window.Image();
    image.crossOrigin = "Anonymous";
    image.src = imageUrl;

    image.onload = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0);

          // Get the middle top pixel color
          const x = Math.floor(canvas.width / 2);
          const y = 0;
          const pixelData = ctx.getImageData(x, y, 1, 1).data;

          const rgba = `rgba(${pixelData[0]}, ${pixelData[1]}, ${
            pixelData[2]
          }, ${pixelData[3] / 255})`;
          setColor(rgba);
        }
      }
    };
  }, [imageUrl]);

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

  useEffect(() => {
    if (artistInfo.img) {
      setImageUrl(artistInfo.img);
      setListeners(
        artistSongs.reduce(function (acc: any, obj: any) {
          return acc + +obj.views.replaceAll(",", "");
        }, 0)
      );
    }
  }, [artistInfo]);

  if (!loading) {
    return <Loader />;
  }

  function numberWithCommas(n: number) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      {/* Background */}
      <Background color={`${color}`} />

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
