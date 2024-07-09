"use client";

import { likedSongsImg } from "@/assets/icons";
import { Background, BackgroundInfo, DisplaySongs } from "@/components";
import { useAppContext } from "@/context";

const CollectionPage = () => {
  const { likedSongs } = useAppContext();

  return (
    <>
      {/* Playlist Background*/}
      <Background bgColor="#4d2fb5" />

      {/* Display Playlist Info */}

      <BackgroundInfo
        img={likedSongsImg}
        type="Playlist"
        title="Liked Songs"
        description={`${likedSongs.length} Songs`}
      />

      {/* Display Playlist Songs */}
      <DisplaySongs data={likedSongs} album date />
    </>
  );
};

export default CollectionPage;
