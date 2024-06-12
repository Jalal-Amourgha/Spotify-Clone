"use client";

import { Background, BackgroundInfo, DisplaySongs, Loader } from "@/components";
import { useAppContext } from "@/context";
import { AlbumProps } from "@/types";
import { FC, useEffect, useRef, useState } from "react";

interface AlbumPageProps {
  params: {
    id: string;
  };
}

const AlbumPage: FC<AlbumPageProps> = ({ params }) => {
  const { data } = useAppContext();

  const [loading, setLoading] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [albumInfo, setAlbumInfo] = useState({ name: "", img: "" });
  const [albumSongs, setAlbumSongs] = useState<any>("");
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
    if (params.id && data.albums.length > 1) {
      setLoading(true);
      setAlbumInfo(
        data.albums.filter(
          (album: AlbumProps) =>
            album.name.replaceAll(" ", "").toLowerCase() ===
            params.id.toLowerCase()
        )[0]
      );
      setAlbumSongs(
        data.data.filter(
          (item: any) =>
            item.album.replaceAll(" ", "").toLowerCase() ===
            params.id.replaceAll(" ", "").toLowerCase()
        )
      );
    }
  }, [params.id, data]);

  useEffect(() => {
    if (albumInfo.img) {
      setImageUrl(albumInfo.img);
    }
  }, [albumInfo]);

  if (!loading) {
    return <Loader />;
  }
  return (
    <>
      {/* Selected The Color of the Image */}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      {/* Background */}
      <Background color={`${color}`} />

      {/* Background Info*/}

      <BackgroundInfo
        img={albumInfo.img}
        type="Album"
        title={albumInfo.name}
        description=""
      />

      {/* Song Play Btn */}
      {/* <div className="flex items-center gap-5">
        <div className="text-5xl text-primary ml-8 my-5 cursor-pointer">
          {playing ? <FaPlayCircle /> : <FaPauseCircle />}
        </div>
        <div className="text-4xl text-gray cursor-pointer">
          <FiPlusCircle />
        </div>
      </div> */}

      {/* List of Artist Songs */}
      <DisplaySongs data={albumSongs} />
    </>
  );
};

export default AlbumPage;
