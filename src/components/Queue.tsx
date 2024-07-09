import { IoClose } from "react-icons/io5";
import { useAppContext } from "../context";
import { DataSongProps } from "../types";

const Queue = () => {
  const { songSelected, setSongSelected, playlistSelected, setSongProps } =
    useAppContext();

  const playSong = (song: DataSongProps) => {
    setSongSelected({
      url: song.url,
      artist: song.artist,
      name: song.name,
      img: song.img,
      duration: song.duration,
    });
  };

  return (
    <div className="h-screen w-full bg-neutral-900 p-4 rounded-lg overflow-y-auto">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-xl font-medium">Queue</h1>
        <div className="text-2xl text-gray hover:text-white cursor-pointer">
          <IoClose
            onClick={() => setSongProps({ queue: false, playing: false })}
          />
        </div>
      </div>
      <div>
        <h1>Now playing</h1>
        <div className="flex flex-row items-center gap-3 mt-3">
          <div>
            <img
              src={songSelected.img}
              height={40}
              width={40}
              sizes="100%"
              className="rounded-lg"
              alt="img"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="hover:text-primary cursor-pointer">
              {songSelected.name}
            </h1>
            <p className="text-gray">{songSelected.artist}</p>
          </div>
        </div>
      </div>
      <div className="mt-10">
        {playlistSelected.length > 0 && <h1>Next from : This Playlist</h1>}
        <div className="flex flex-col gap-4 mt-3">
          {playlistSelected &&
            playlistSelected.map((song: DataSongProps, index: number) =>
              song.url !== songSelected.url ? (
                <div
                  className="flex flex-row items-center gap-3"
                  key={index}
                  onClick={() => playSong(song)}
                >
                  <div>
                    <img
                      src={song.img}
                      height={40}
                      width={40}
                      sizes="100%"
                      className="rounded-lg"
                      alt="img"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h1 className="hover:text-primary cursor-pointer">
                      {song.name}
                    </h1>
                    <p className="text-gray">{song.artist}</p>
                  </div>
                </div>
              ) : (
                ""
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default Queue;
