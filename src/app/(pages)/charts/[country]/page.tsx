"use client";

import { Background, BackgroundInfo, DisplaySongs, Loader } from "@/components";
import { useAppContext } from "@/context";
import { DataSongProps, FeaturedChartsProps } from "@/types";
import { useEffect, useState } from "react";

interface ChartsPageProps {
  params: {
    country: string;
  };
}
const ChartPage = ({ params }: ChartsPageProps) => {
  const { data } = useAppContext();

  const [selectedChart, setSelectedChart] = useState({
    name: "",
    color: "",
    img: "",
  });
  const [selectedChartSongs, setSelectedChartSongs] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params.country && data.featuredCharts.length > 1) {
      setLoading(true);
      setSelectedChart(
        data.featuredCharts.filter(
          (chart: FeaturedChartsProps) =>
            chart.name.replaceAll(" ", "").toLocaleLowerCase() ===
            params.country.replaceAll(" ", "").toLocaleLowerCase()
        )[0]
      );
    }
  }, [params.country, data]);

  useEffect(() => {
    setSelectedChartSongs(
      data.data.filter((song: DataSongProps) =>
        song.charts?.includes(
          selectedChart.name.replaceAll(" ", "").replace("-", "").toLowerCase()
        )
      )
    );
  }, [selectedChart]);

  if (!loading) {
    return <Loader />;
  }

  return (
    <>
      {/* Playlist Background*/}
      <Background color={`#${selectedChart.color}`} />

      {/* Playlist Background - Info */}
      <BackgroundInfo
        type="Playlist"
        title={selectedChart.name}
        img={selectedChart.img}
        description="Your weekly update of the most played tracks"
      />

      {/* Display Playlist Songs */}

      <DisplaySongs data={selectedChartSongs} plays album />
    </>
  );
};

export default ChartPage;
