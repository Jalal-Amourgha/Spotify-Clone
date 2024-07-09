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
  const [albumInfo, setAlbumInfo] = useState({ name: "", img: "" });
  const [albumSongs, setAlbumSongs] = useState<any>("");

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

  if (!loading) {
    return <Loader />;
  }
  return (
    <>
      {/* Background */}
      <Background imgUrl={albumInfo.img} />

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
