"use client";

import { useAppContext } from "@/context";

const Playlists = ({ song }: { song: any }) => {
  const { playlists, setPlaylists } = useAppContext();

  const handleAddSongToPlaylist = (id: string) => {
    const updatedPlaylists = playlists.map((playlist: any) => {
      song.added_in = new Date().toString();
      if (playlist.id === id) {
        const updatedSongs = playlist.songs
          ? [...playlist.songs, song]
          : [song];

        return {
          ...playlist,
          songs: updatedSongs,
        };
      }
      return playlist;
    });

    setPlaylists(updatedPlaylists);
  };
  return (
    <div className="flex flex-col gap-1 p-2 bg-neutral-700 text-white rounded-lg">
      {playlists &&
        playlists.map((playlist: any, index: number) => (
          <div
            className="p-2  rounded-lg hover:bg-neutral-800 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleAddSongToPlaylist(playlist.id);
            }}
            key={index}
          >
            Add To - {playlist.name}
          </div>
        ))}
    </div>
  );
};

export default Playlists;
