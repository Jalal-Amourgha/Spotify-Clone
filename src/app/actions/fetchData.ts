"use server";

export const fetchData = async () => {
  const data = await fetch(
    `https://gist.githubusercontent.com/Jalal-Amourgha/d8c8800caffcbb90a10e5ccfda114a1a/raw/4ff2f893b646375a4d9297667db318e48c9a6dba/Spotify_Clone`
  );

  const res = await data.json();

  return res;
};
