"use server";

export const fetchLyrics = async (id: String) => {
  const data = await fetch(`https://api.lyrics.ovh/v1/${id}`);

  const res = await data.json();

  return res.lyrics;
};
