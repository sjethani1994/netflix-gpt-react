import React from "react";
import { IMG_CDN_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { setSelectedMovie } from "../utils/movieSlice";

const MovieCard = ({ movie }) => {
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null;
  const year = movie.release_date?.slice(0, 4);
  const dispatch = useDispatch();
  const getMovieId = () => {
    // Hero switches to this movie; VideoBackground's useVideoKey then fetches its trailer
    dispatch(setSelectedMovie(movie));
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll back up to the trailer
  };

  return (
    <div
      onClick={getMovieId}
      className="group relative aspect-[2/3] w-32 flex-shrink-0 cursor-pointer overflow-hidden rounded-md bg-zinc-800 transition-transform duration-300 hover:z-10 hover:scale-105 md:w-44"
    >
      {movie.poster_path ? (
        <img
          src={`${IMG_CDN_URL}w342${movie.poster_path}`}
          alt={movie.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      ) : (
        // No poster: show the title on a plain card
        <div className="flex h-full items-center justify-center p-3 text-center text-sm font-semibold text-gray-300">
          {movie.title}
        </div>
      )}

      {/* Details revealed on hover */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h3 className="line-clamp-2 text-sm font-bold text-white">
          {movie.title}
        </h3>
        <div className="mt-1 flex items-center gap-2 text-xs text-gray-300">
          {rating && (
            <span className="flex items-center gap-1 font-semibold text-green-400">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-3 w-3"
                aria-hidden="true"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
              </svg>
              {rating}
            </span>
          )}
          {year && <span>{year}</span>}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
