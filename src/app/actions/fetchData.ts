"use server";

export const fetchData = async () => {
  const data = await fetch(
    `https://gist.githubusercontent.com/Jalal-Amourgha/d8c8800caffcbb90a10e5ccfda114a1a/raw/0fe699b9070774f6ccaf9e6199d283c85c73d8b2/Spotify_Clone`
  );

  const res = await data.json();

  return res;
};
