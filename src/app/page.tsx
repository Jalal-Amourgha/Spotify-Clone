"use client";

import HomeComponents from "@/components/HomeComponents";
import { useAppContext } from "@/context";

export default function Home() {
  const { data } = useAppContext();
  return (
    <>
      {data.data.length > 0 ? (
        <>
          <HomeComponents
            data={data.artists}
            title="Popular Artists"
            rounded={true}
            displayHome
            route="artists"
          />
          <HomeComponents
            data={data.albums}
            title="Popular Albums"
            rounded={false}
            displayHome
            route="albums"
          />
          <HomeComponents
            data={data.featuredCharts}
            title="Featured Charts"
            rounded={false}
            displayHome
            route="charts"
            showBtn={false}
          />
        </>
      ) : (
        ""
      )}
    </>
  );
}
