import { useEffect, useState } from "react";
import { useAppContext } from "../context";
import { useParams } from "react-router-dom";
import { ArtistsProps, DataSongProps } from "../types";
import {
  Background,
  BackgroundInfo,
  DisplaySongs,
  HomeComponents,
  Loader,
} from "../components";

const ArtistPage = () => {
  const { id } = useParams();
  const { data } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [artistInfo, setArtistInfo] = useState({ name: "", img: "" });
  const [artistSongs, setArtistSongs] = useState<any>("");

  useEffect(() => {
    if (id && data.albums.length > 1) {
      setLoading(true);
      setArtistInfo(
        data.artists.filter(
          (artist: ArtistsProps) =>
            artist.name.replaceAll(" ", "").toLowerCase() === id.toLowerCase()
        )[0]
      );
      setArtistSongs(
        data.data.filter(
          (artist: DataSongProps) =>
            artist.artist.replaceAll(" ", "").toLowerCase() === id.toLowerCase()
        )
      );
    }
  }, [id, data]);

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
        description={`${numberWithCommas(542656265)} Totaly listeners`}
        verified
        rounded
      />

      {/* Display Artist Songs*/}
      <DisplaySongs data={artistSongs} album plays />

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
