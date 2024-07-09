import { useEffect, useState } from "react";
import { FiMinusCircle } from "react-icons/fi";

import { RiMenuAddFill } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import { HiOutlinePencil } from "react-icons/hi2";
import { FaBars } from "react-icons/fa";
import { useAppContext } from "../context";
import { playlistImg } from "../assets/icons";
import { DisplaySongs, EditPlaylist } from "../components";
import { useParams } from "react-router-dom";

const Playlist = () => {
  const { id } = useParams<{ id: string }>();
  const {
    playlists,
    setPlaylists,

    setEditPlaylist,
  } = useAppContext();
  const [selectedPlaylist, setSelectedPlaylist] = useState({
    name: "",
    description: "",
    id: "",
    songs: [],
  });
  const [showPlaylistProps, setShowPlaylistProps] = useState(false);
  const [showListProps, setShowListProps] = useState(false);

  useEffect(() => {
    var indexOfSelectedPlaylist = playlists.findIndex(
      (playlist: any) => playlist.id === id
    );

    setSelectedPlaylist({
      name: playlists[indexOfSelectedPlaylist].name,

      description: playlists[indexOfSelectedPlaylist].description,
      id: playlists[indexOfSelectedPlaylist].id,
      songs: playlists[indexOfSelectedPlaylist].songs,
    });
  }, []);
  const handleDeletePlaylist = (id: string) => {
    setPlaylists(playlists.filter((playlist: any) => playlist.id !== id));
  };

  return (
    <>
      <div
        className={`h-[400px] w-full cursor-pointer absolute left-0 top-0 `}
        style={{ background: `linear-gradient(#5d5d5d, #171717)` }}
      >
        <div
          className="flex items-end h-full "
          onClick={() => setEditPlaylist({ situation: true, id: id })}
        >
          <div className="flex flex-row items-center gap-5 mb-20 pl-5">
            <div>
              <img
                src={playlistImg}
                height={200}
                width={200}
                sizes="100%"
                className="rounded-lg"
                alt="400"
              />
            </div>
            <div className="flex flex-col gap-4">
              <p>Playlist</p>
              <h1 className="text-8xl font-bold ">{selectedPlaylist.name}</h1>
              <p>{selectedPlaylist.description}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center relative mt-[300px] text-gray mx-5">
          <BsThreeDots
            className="text-3xl cursor-pointer"
            onClick={() => setShowPlaylistProps(!showPlaylistProps)}
          />
          {showPlaylistProps ? (
            <div className="absolute top-10 left-0 z-20 bg-neutral-700 p-1 rounded-lg flex flex-col gap-1 text-white w-56">
              <div
                className="flex items-center gap-2 rounded p-2 cursor-pointer hover:bg-neutral-800"
                onClick={() => setEditPlaylist({ situation: true, id: id })}
              >
                <HiOutlinePencil />
                <p>Edit details</p>
              </div>
              <div
                className="flex items-center gap-2 rounded p-2 cursor-pointer hover:bg-neutral-800"
                onClick={() => handleDeletePlaylist(selectedPlaylist.id)}
              >
                <FiMinusCircle />
                <p>Delete</p>
              </div>
            </div>
          ) : (
            ""
          )}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setShowListProps(!showListProps)}
          >
            List <RiMenuAddFill className="text-xl" />
          </div>
          {showListProps ? (
            <div className="absolute top-10 right-0  bg-neutral-700 p-1 rounded-lg flex flex-col gap-1 text-white w-56">
              <div className="flex items-center gap-2 rounded-lg p-2 cursor-pointer hover:bg-neutral-800">
                <FaBars />
                <p>Component</p>
              </div>
              <div className="flex items-center gap-2 rounded p-2 cursor-pointer hover:bg-neutral-800">
                <RiMenuAddFill />
                <p>List</p>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <DisplaySongs data={selectedPlaylist.songs} album date />
      <EditPlaylist />
    </>
  );
};

export default Playlist;
