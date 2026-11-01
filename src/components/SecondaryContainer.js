import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((state) => state.movies);
  return (
    <div className="relative z-20 -mt-12 pb-12 md:-mt-32">
      <MovieList title="Now Playing" movies={movies.nowPlayingMovies} />
      <MovieList title="Popular" movies={movies.popularMovies} />
    </div>
  );
};

export default SecondaryContainer;
