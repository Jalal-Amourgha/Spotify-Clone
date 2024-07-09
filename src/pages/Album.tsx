import { FC, useEffect, useRef, useState } from "react";
import { useAppContext } from "../context";
import { useParams } from "react-router-dom";
import { AlbumProps } from "../types";
import {
  Background,
  BackgroundInfo,
  DisplaySongs,
  Loader,
} from "../components";

const Album = () => {
  const { id }: any = useParams();
  const { data } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [albumInfo, setAlbumInfo] = useState({ name: "", img: "" });
  const [albumSongs, setAlbumSongs] = useState<any>("");

  useEffect(() => {
    if (id && data.albums.length > 1) {
      setLoading(true);
      setAlbumInfo(
        data.albums.filter(
          (album: AlbumProps) =>
            album.name.replaceAll(" ", "").toLowerCase() === id.toLowerCase()
        )[0]
      );
      setAlbumSongs(
        data.data.filter(
          (item: any) =>
            item.album.replaceAll(" ", "").toLowerCase() ===
            id.replaceAll(" ", "").toLowerCase()
        )
      );
    }
  }, [id, data]);

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

      {/* List of Artist Songs */}
      <DisplaySongs data={albumSongs} />
    </>
  );
};

export default Album;
