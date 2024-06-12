"use client";

import HomeComponents from "@/components/HomeComponents";
import { useAppContext } from "@/context";

const ArtistsPage = () => {
  const { data } = useAppContext();
  return (
    <>
      {data.artists && (
        <HomeComponents
          data={data.artists}
          displayAll
          rounded
          route="artists"
          title="Popular Artits"
        />
      )}
    </>
  );
};

export default ArtistsPage;
