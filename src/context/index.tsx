"use client";

import { DataProps, DataSongProps, PlaylistProps, SongProps } from "@/types";
import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<DataProps>({
    artists: [],
    albums: [],
    categories: [],
    data: [],
    featuredCharts: [],
  });
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
  const [isQueueOpen, setIsQueueOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [likedSongs, setLikedSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editPlaylist, setEditPlaylist] = useState({
    situation: false,
    id: "",
  });

  const fetchData = async () => {
    const data = await fetch(
      `https://gist.githubusercontent.com/Jalal-Amourgha/d8c8800caffcbb90a10e5ccfda114a1a/raw/85ee618e85d122857db67f86b0c12418256e5a2c/_data`
    );
    const res = await data.json();

    return setData(res);
  };

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("spotify-clone") || "{}");
    setLikedSongs(savedData.likedSongs || []);
    setPlaylists(savedData.playlists || []);

    const timer = setTimeout(() => {
      setLoading(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetchData();
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
    }
  };

  const handlePrevSong = () => {
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
        url: playlistSelected[playingSongIndex - 1].url,
        artist: playlistSelected[playingSongIndex - 1].artist,
        name: playlistSelected[playingSongIndex - 1].name,
        img: playlistSelected[playingSongIndex - 1].img,
        duration: playlistSelected[playingSongIndex - 1].duration,
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        data,
        songSelected,
        setSongSelected,
        playlistSelected,
        setPlaylistSelected,
        scrollHeight,
        setScrollHeight,
        handleNextSong,
        handlePrevSong,
        isQueueOpen,
        setIsQueueOpen,
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
