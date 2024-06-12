"use client";
import { likedSongsImg, playlistImg } from "@/assets/icons";
import { useAppContext } from "@/context";
import { PlaylistProps } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BiLibrary } from "react-icons/bi";
import { GoDotFill } from "react-icons/go";
import { LuPlus } from "react-icons/lu";
const Library = () => {
  const { playlists, setPlaylists, likedSongs } = useAppContext();
  const router = useRouter();
  const createNewPlaylist = () => {
    setPlaylists([
      ...playlists,
      {
        name: `My Playlist #${playlists.length}`,
        id: `myplaylist${playlists.length}`,
        description: "",
        songs: [],
      },
    ]);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center gap-4 text-gray text-lg mb-10">
        <div className="flex items-center">
          <BiLibrary className="text-2xl" />
          <span className="hidden lg:block">Your Library</span>
        </div>
        <LuPlus
          className="hidden lg:block text-2xl cursor-pointer"
          onClick={() => createNewPlaylist()}
        />
      </div>

      <div className="flex flex-col gap-3">
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => router.push("/collection")}
        >
          <div>
            <Image
              src={likedSongsImg}
              height={50}
              width={50}
              className="rounded-lg"
              alt="img"
            />
          </div>
          <div className="hidden lg:block">
            <h1 className="hover:text-primary cursor-pointer">Liked Songs</h1>
            <div className="flex items-center gap-2 text-gray">
              <span> Playlist</span>
              <GoDotFill className="text-[6px]" />
              <span> {likedSongs.length} Songs</span>
            </div>
          </div>
        </div>
        {playlists.map((playlist: PlaylistProps, index: number) => (
          <div
            className="flex items-center gap-3"
            onClick={() => router.push(`/playlist/${playlist.id}`)}
            key={index}
          >
            <div>
              <Image
                src={playlistImg}
                height={50}
                width={50}
                className="rounded-lg"
                alt="playlist"
              />
            </div>
            <div className="hidden lg:block">
              <h1 className={` hover:text-primary cursor-pointer`}>
                {playlist.name}
              </h1>
              <div className="flex items-center gap-2 text-gray">
                <span> Playlist</span>
                <GoDotFill className="text-[6px]" />
                <span> {playlist.songs.length} Songs</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;
