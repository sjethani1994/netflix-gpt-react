import { useSelector } from "react-redux";
import { useMovies, usePopularMovies } from "../hooks/useMovies";
import GptSearch from "./GptSearch";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
  useMovies();
  usePopularMovies();

  const showGptSearch = useSelector((store) => store.gpt.isGPTSearchOpen);

  return (
    <div
      className={`min-h-screen ${!showGptSearch ? "bg-black" : "bg-gradient-to-b from-black to-gray-300"}`}
    >
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
