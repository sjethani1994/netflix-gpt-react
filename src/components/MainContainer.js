import React from "react";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies.nowPlayingMovies);
  const selectedMovie = useSelector((store) => store.movies.selectedMovie);
  if (!movies || movies.length === 0) {
    return <div>Loading...</div>;
  }
  // Clicked card's movie, or the first now-playing movie until one is clicked
  const movie = selectedMovie || movies[0];
  return (
    // relative: VideoTitle is absolutely positioned over the video
    <div className="relative bg-black">
      {/* key resets the mute state when the movie changes (new trailer starts muted) */}
      <VideoBackground key={movie.id} movies={movie} />
      <VideoTitle
        original_title={movie.original_title}
        overview={movie.overview}
      />
    </div>
  );
};

export default MainContainer;
