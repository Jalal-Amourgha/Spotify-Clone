import { HomeComponents } from "../components";
import { useAppContext } from "../context";

const Albums = () => {
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

export default Albums;
