import { options } from "../utils/constants";

export const getNowPlayingMovies = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?page=1",
    options,
  );
  const data = await response.json();
  return data.results;
};

export const getVideoKey = async (movieId) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos`,
    options,
  );
  const data = await response.json();
  const videos = (data.results || []).filter((v) => v.site === "YouTube");
  // Prefer a trailer; fall back to any YouTube video (teaser, clip)
  return (videos.find((video) => video.type === "Trailer") || videos[0])?.key;
};
