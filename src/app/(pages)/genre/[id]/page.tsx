"use client";

import { Background, BackgroundInfo, DisplaySongs, Loader } from "@/components";
import { useAppContext } from "@/context";
import { CategoriesProps } from "@/types";
import { useEffect, useState } from "react";

interface PageProps {
  params: {
    id: string;
  };
}
const GnerePage = ({ params }: PageProps) => {
  const { data } = useAppContext();

  const [loading, setLoading] = useState(false);

  const [categorySelected, setCategorySelected] = useState({ color: "" });
  const [categorySelectedSongs, setCaategorySelectedSongs] = useState([]);

  useEffect(() => {
    if (params.id && data.albums.length > 1) {
      setLoading(true);
      setCategorySelected(
        data.categories.filter(
          (cate: CategoriesProps) =>
            cate.name.replaceAll(" ", "").toLowerCase() ===
            params.id.replaceAll(" ", "").toLowerCase()
        )[0]
      );
      setCaategorySelectedSongs(
        data.data.filter((song: any) => song.genre.includes(params.id))
      );
    }
  }, [params.id, data]);

  if (!loading) {
    return <Loader />;
  }

  return (
    <>
      {/* Background */}
      <Background color={`#${categorySelected.color}`} />

      {/* Background Info*/}

      <BackgroundInfo title={params.id} />

      {/* List of Artist Songs */}
      <DisplaySongs data={categorySelectedSongs} plays album />
    </>
  );
};

export default GnerePage;
