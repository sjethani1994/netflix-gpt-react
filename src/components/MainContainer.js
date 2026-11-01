import React from "react";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies.nowPlayingMovies);
  if (!movies || movies.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    // relative: VideoTitle is absolutely positioned over the video
    <div className="relative bg-black">
      <VideoBackground movies={movies[0]} />
      <VideoTitle
        original_title={movies[0].original_title}
        overview={movies[0].overview}
      />
    </div>
  );
};

export default MainContainer;
