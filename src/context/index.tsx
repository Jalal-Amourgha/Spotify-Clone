"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Data } from "../constants/_data";
import { DataSongProps, SongProps } from "../types";

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<any>({});
  const [scrollHeight, setScrollHeight] = useState<number>(0);
  const [songSelected, setSongSelected] = useState<SongProps>({
    url: "",
    artist: "",
    name: "",
    img: "",
    duration: "",
  });
  const [playlistSelected, setPlaylistSelected] = useState<
    DataSongProps[] | any
  >();
  const [playing, setPlaying] = useState(true);
  const [songProps, setSongProps] = useState({ queue: false, playing: false });
  const [search, setSearch] = useState<string>("");
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [likedSongs, setLikedSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editPlaylist, setEditPlaylist] = useState({
    situation: false,
    id: "",
  });

  useEffect(() => {
    setData(Data);
    const savedData = JSON.parse(localStorage.getItem("spotify-clone") || "{}");
    setLikedSongs(savedData.likedSongs || []);
    setPlaylists(savedData.playlists || []);

    const timer = setTimeout(() => {
      setLoading(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) {
      const dataToSave = { likedSongs, playlists };
      localStorage.setItem("spotify-clone", JSON.stringify(dataToSave));
    }
  }, [likedSongs, playlists, loading]);

  const handleNextSong = () => {
    // find index of playing song
    var playingSongIndex = playlistSelected.findIndex(
      (item: DataSongProps) => item.url === songSelected.url
    );
    if (playingSongIndex === playlistSelected.length - 1) {
      setSongSelected({
        url: playlistSelected[0].url,
        artist: playlistSelected[0].artist,
        name: playlistSelected[0].name,
        img: playlistSelected[0].img,
        duration: playlistSelected[0].duration,
      });
    } else {
      setSongSelected({
        url: playlistSelected[playingSongIndex + 1].url,
        artist: playlistSelected[playingSongIndex + 1].artist,
        name: playlistSelected[playingSongIndex + 1].name,
        img: playlistSelected[playingSongIndex + 1].img,
        duration: playlistSelected[playingSongIndex + 1].duration,
      });

      setPlaylistSelected(
        playlistSelected.filter(
          (_e: DataSongProps, i: number) => i > playingSongIndex
        )
      );
      setPlaying(true);
    }
  };

  return (
    <AppContext.Provider
      value={{
        data,
        playing,
        setPlaying,
        songSelected,
        setSongSelected,
        playlistSelected,
        setPlaylistSelected,
        scrollHeight,
        setScrollHeight,
        handleNextSong,

        songProps,
        setSongProps,
        search,
        setSearch,
        likedSongs,
        setLikedSongs,
        playlists,
        setPlaylists,
        editPlaylist,
        setEditPlaylist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
