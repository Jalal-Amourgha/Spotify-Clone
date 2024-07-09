import { useEffect, useState } from "react";
import { useAppContext } from "../context";

import {
  Background,
  BackgroundInfo,
  DisplaySongs,
  Loader,
} from "../components";
import { FeaturedChartsProps } from "../types";
import { useParams } from "react-router-dom";

const Chart = () => {
  const { id }: any = useParams();
  const { data } = useAppContext();

  const [selectedChart, setSelectedChart] = useState<any>({
    name: "",
    color: "",
    img: "",
  });
  const [selectedChartSongs, setSelectedChartSongs] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id && data.featuredCharts.length > 1) {
      setLoading(true);
      setSelectedChart(
        data.featuredCharts.filter(
          (chart: FeaturedChartsProps) =>
            chart.name.replaceAll(" ", "").toLocaleLowerCase() ===
            id.replaceAll(" ", "").toLocaleLowerCase()
        )[0]
      );
    }
  }, [id, data]);

  useEffect(() => {
    setSelectedChartSongs(
      data.data.filter((song: any) =>
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
      <Background imgUrl={selectedChart.img} />

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

export default Chart;
