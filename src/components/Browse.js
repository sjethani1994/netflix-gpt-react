import { useMovies, usePopularMovies } from "../hooks/useMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
  useMovies();
  usePopularMovies();
  return (
    <div className="min-h-screen bg-black">
      <MainContainer />
      <SecondaryContainer />
    </div>
  );
};

export default Browse;
