import { IoClose } from "react-icons/io5";
import { useAppContext } from "../context";

const PlayingSong = () => {
  const { songSelected, setSongProps } = useAppContext();
  return (
    <div className="h-screen w-full bg-neutral-900 p-4 rounded-lg overflow-y-auto">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-xl font-bold">{songSelected.name}</h1>
        <div className="text-2xl text-gray hover:text-white cursor-pointer">
          <IoClose
            onClick={() => setSongProps({ queue: false, playing: false })}
          />
        </div>
      </div>
      <div>
        <div className="w-full relative aspect-square">
          <img
            src={songSelected.img}
            sizes="100%"
            className="rounded-lg"
            alt="img"
          />
        </div>
        <h1 className="text-xl font-bold mt-3">{songSelected.name}</h1>
        <p className="text-gray">{songSelected.artist}</p>
      </div>
    </div>
  );
};

export default PlayingSong;
