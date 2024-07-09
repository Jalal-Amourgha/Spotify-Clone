import { HomeComponents } from "../components";
import { useAppContext } from "../context";

const Artists = () => {
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

export default Artists;
