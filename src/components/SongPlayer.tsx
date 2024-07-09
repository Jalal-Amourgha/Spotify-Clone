"use client";

import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { SlVolumeOff, SlVolume1, SlVolume2 } from "react-icons/sl";
import { RxLoop } from "react-icons/rx";
import { IoShuffle, IoPlaySkipForward, IoPlaySkipBack } from "react-icons/io5";
import { TbMicrophone2 } from "react-icons/tb";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { FaPause, FaPlay } from "react-icons/fa6";
import { LuMenuSquare } from "react-icons/lu";
import { RiVideoLine } from "react-icons/ri";
import { SongProps } from "../types";
import { useAppContext } from "../context";
import { useLocation, useNavigate } from "react-router-dom";
const SongPlayer = () => {
  const {
    playing,
    setPlaying,
    songSelected,
    handleNextSong,
    songProps,
    setSongProps,
    playlistSelected,
    setSongSelected,
    likedSongs,
    setLikedSongs,
  } = useAppContext();
  const [played, setPlayed] = useState(0);
  const [volume, setVolume] = useState(0.5); // Initial volume set to 50%
  const [muted, setMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState(0);

  const playerRef: any = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleProgress = (state: any) => {
    setPlayed(state.played);
  };

  const handleSeekChange = (e: any) => {
    const seekTo = parseFloat(e.target.value);
    playerRef.current.seekTo(seekTo);
    setPlayed(seekTo);
    // Update the current time
    const newTime = playerRef.current.getCurrentTime();
    setCurrentTime(newTime);
  };

  useEffect(() => {
    var currentTime = playerRef.current.getCurrentTime();
    var songDuration = playerRef.current.getDuration();

    const timer = setTimeout(() => {
      if (playing) {
        setCurrentTime(currentTime);
      }
    }, 500);

    if (currentTime === songDuration && currentTime !== null) {
      if (playlistSelected.length > 1) {
        var indexOfSongPlaying = playlistSelected.findIndex(
          (song: SongProps) => song.name === songSelected.name
        );
        if (playlistSelected[indexOfSongPlaying + 1] !== undefined) {
          setSongSelected(playlistSelected[indexOfSongPlaying + 1]);
        }
      }
    }

    return () => clearTimeout(timer);
  }, [currentTime, played]);

  const handleVolumeChange = (e: any) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const togglePlaying = () => {
    setPlaying(!playing);
  };
  const addToList = (song: any) => {
    setLikedSongs([...likedSongs, song]);
  };

  const handlePrevSong = () => {
    playerRef.current.seekTo(0);
  };

  return (
    <>
      {/* F O R - D E S K T O P */}
      <div className="hidden md:block sticky bottom-0 left-0 z-[100] bg-black w-full p-3 ">
        <div className="flex justify-between items-center">
          <div className="flex flex-row items-center gap-2">
            <div>
              {songSelected && (
                <img
                  src={`${songSelected.img}`}
                  height={60}
                  width={60}
                  sizes="100%"
                  className="rounded-lg"
                  alt="img"
                />
              )}
            </div>
            <div className="flex flex-col gap-1">
              <h1
                className="text-lg font-semibold hover:text-primary cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(
                    `/song/${songSelected.name
                      .toLowerCase()
                      .replaceAll(" ", "")}`
                  );
                }}
              >
                {songSelected.name}
              </h1>
              <p className="text-gray">{songSelected.artist}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-[700px] text-xl">
            <div className="flex items-center justify-center text-gray  gap-5">
              <IoShuffle className="hover:text-white cursor-pointer" />
              <IoPlaySkipBack
                className="hover:text-white cursor-pointer"
                onClick={handlePrevSong}
              />
              {playing ? (
                <FaPauseCircle
                  className="text-3xl text-white cursor-pointer"
                  onClick={togglePlaying}
                />
              ) : (
                <FaPlayCircle
                  className="text-3xl text-white cursor-pointer"
                  onClick={togglePlaying}
                />
              )}
              <IoPlaySkipForward
                className="hover:text-white cursor-pointer"
                onClick={handleNextSong}
              />
              <RxLoop className="hover:text-white cursor-pointer" />
            </div>
            <div className="flex gap-2">
              <div className="text-base text-gray w-12 ">
                {Math.floor(currentTime / 60)}:
                {Math.floor(currentTime % 60)
                  .toString()
                  .padStart(2, "0")}
              </div>
              <div className="w-full">
                {songSelected.url ? (
                  <ReactPlayer
                    ref={playerRef}
                    url={songSelected.url}
                    playing={playing}
                    volume={volume}
                    muted={muted}
                    controls
                    height="0px"
                    width="0px"
                    onProgress={handleProgress}
                  />
                ) : (
                  ""
                )}

                <input
                  type="range"
                  min={0}
                  max={1}
                  step="any"
                  value={played}
                  onChange={handleSeekChange}
                  className="bg-gray w-full accent-white hover:accent-primary cursor-pointer"
                />
              </div>
              <div className="text-base text-gray w-12 ">
                {songSelected.duration}
              </div>
            </div>
          </div>
          <div className="flex items-center text-xl text-gray gap-3">
            <RiVideoLine
              className={`${
                songProps.playing ? "text-primary" : ""
              } hover:text-primary cursor-pointer`}
              onClick={() =>
                setSongProps({
                  queue: false,
                  playing: !songProps.playing,
                })
              }
            />
            <TbMicrophone2
              className={`${
                location.pathname === "/lyrics" ? "text-primary" : ""
              } hover:text-primary cursor-pointer`}
              onClick={() => navigate("/lyrics")}
            />

            <LuMenuSquare
              className={`${
                songProps.queue ? "text-primary" : ""
              } hover:text-primary cursor-pointer`}
              onClick={() =>
                setSongProps({
                  queue: !songProps.queue,
                  playing: false,
                })
              }
            />
            <div onClick={() => setMuted(!muted)}>
              {volume === 0 || muted ? (
                <SlVolumeOff className="hover:text-primary cursor-pointer" />
              ) : volume < 0.3 ? (
                <SlVolume1 className="hover:text-primary cursor-pointer" />
              ) : (
                <SlVolume2 className="hover:text-primary cursor-pointer" />
              )}
            </div>

            <div>
              <input
                type="range"
                min={0}
                max={1}
                step="any"
                value={volume}
                onChange={handleVolumeChange}
                className="bg-gray accent-white hover:accent-primary max-w-32 cursor-pointer"
                style={{ width: "100%", marginTop: "10px" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* F O R - M O B I L E S */}
      <div className="block md:hidden sticky bottom-[64px] left-0 z-[100] bg-black w-full p-2 rounded-t-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src={`${songSelected.img}`}
              height={40}
              width={40}
              sizes="100%"
              className="rounded-lg"
              alt="img"
            />
            <div>
              <h1 className="text-lg font-semibold hover:text-primary cursor-pointer">
                {songSelected.name}
              </h1>
              <p className="text-gray">{songSelected.artist}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-3xl">
            {likedSongs[
              likedSongs.findIndex(
                (item: any) => item.name === songSelected.name
              )
            ] ? (
              <IoIosHeart className="text-primary cursor-pointer" />
            ) : (
              <IoIosHeartEmpty
                onClick={(e) => {
                  e.stopPropagation();
                  addToList({
                    img: songSelected.img,
                    artist: songSelected.artist,
                    name: songSelected.name,
                    album: songSelected.album,
                    url: songSelected.url,
                    duration: songSelected.duration,
                    added_in: new Date().toString(),
                  });
                }}
                className="cursor-pointer"
              />
            )}
            {playing ? (
              <FaPause
                className="text-white cursor-pointer"
                onClick={togglePlaying}
              />
            ) : (
              <FaPlay
                className="text-white cursor-pointer"
                onClick={togglePlaying}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SongPlayer;
