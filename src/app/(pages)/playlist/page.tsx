"use client";

import { playlistImg } from "@/assets/icons";
import { useAppContext } from "@/context";
import { PlaylistProps } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GoDotFill } from "react-icons/go";

const PlaylistsPage = () => {
  const { playlists } = useAppContext();
  const router = useRouter();

  return (
    <div className="mt-100 mx-5">
      <h1 className="text-2xl font-semibold mb-10">Your Library</h1>
      <div className="flex flex-col gap-5">
        {playlists.length === 0 ? (
          <h1 className="text-xl font-medium">
            You Dont Have any Playlist yet
          </h1>
        ) : (
          playlists.map((playlist: PlaylistProps, index: number) => (
            <div
              className="flex items-center gap-2"
              onClick={() => router.push(`/playlist/${playlist.id}`)}
              key={index}
            >
              <div>
                <Image
                  src={playlistImg}
                  height={60}
                  width={60}
                  className="rounded-lg"
                  sizes="100%"
                  alt="playlist img"
                />
              </div>
              <div>
                <h1 className="text-lg font-medium hover:text-primary cursor-pointer">
                  {playlist.name}
                </h1>
                <div className="flex items-center gap-2 text-gray">
                  <span> Playlist</span>
                  <GoDotFill className="text-[6px]" />
                  <span> {playlist.songs.length} Songs</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PlaylistsPage;
