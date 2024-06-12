"use client";

import HomeComponents from "@/components/HomeComponents";
import { useAppContext } from "@/context";

const AlbumsPage = () => {
  const { data } = useAppContext();
  return (
    <>
      {data.albums && (
        <HomeComponents
          data={data.albums}
          displayAll
          title="Popular Albums"
          route="albums"
        />
      )}
    </>
  );
};

export default AlbumsPage;
