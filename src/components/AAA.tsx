"use server";

import { fetchLyrics } from "@/app/actions/fetchLyrics";

interface LyricsProps {
  id: string;
}

const AAA = async ({ id }: LyricsProps) => {
  let lyrics = await fetchLyrics(id);

  return <div>{lyrics ? lyrics : "ob"}</div>;
};

export default AAA;
