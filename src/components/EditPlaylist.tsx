import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useAppContext } from "../context";

const EditPlaylist = () => {
  const { playlists, setPlaylists, editPlaylist, setEditPlaylist } =
    useAppContext();
  const [playlistName, setPlaylistName] = useState("");

  const [playlistDescription, setPlaylistDescription] = useState("");

  useEffect(() => {
    var indexOfSelectedPlaylist = playlists.findIndex(
      (playlist: any) => playlist.id === editPlaylist.id
    );

    setPlaylistName(playlists[indexOfSelectedPlaylist].name);
    setPlaylistDescription(playlists[indexOfSelectedPlaylist].description);
  }, []);

  const handleEditPlaylist = () => {
    const updatedPlaylists = [...playlists]; // Create a new array to avoid mutation
    const indexOfSelectedPlaylist = updatedPlaylists.findIndex(
      (playlist: any) => playlist.id === editPlaylist.id
    );

    if (!playlistName) {
      return alert("Please Enter a Name");
    }

    updatedPlaylists[indexOfSelectedPlaylist] = {
      ...updatedPlaylists[indexOfSelectedPlaylist],
      name: playlistName,
      description: playlistDescription,
    };
    setPlaylists(updatedPlaylists); // Update state with the new array

    setEditPlaylist({ situation: false });
  };

  return (
    <div
      className={`${
        editPlaylist.situation ? "fixed" : "hidden"
      } h-screen w-full  top-0 left-0 z-[100] bg-black/50 flex items-center justify-center`}
    >
      <div className="w-[500px] bg-neutral-800 p-5 rounded-lg">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl text-white font-semibold">Edit details</h1>
          <IoClose
            size="25"
            onClick={() => setEditPlaylist({ situation: false })}
          />
        </div>
        <div className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Add a name"
            className="bg-neutral-700 text-white p-2 rounded-lg w-full outline-none"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
          />
          <textarea
            placeholder="Add an optinal description"
            className="bg-neutral-700 text-white p-2 rounded-lg w-full outline-none"
            value={playlistDescription}
            onChange={(e) => setPlaylistDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="text-end mt-5">
          <button
            className="bg-white text-black py-2 px-5 text-lg font-semibold rounded-full"
            onClick={handleEditPlaylist}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPlaylist;
