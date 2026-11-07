import React from "react";
import { useSelector } from "react-redux";
import { IMG_CDN_URL } from "../utils/constants";

const GptMovieSuggestions = () => {
  const serachedMovies = useSelector((state) => state.movies.searchResults);
  const isSearching = useSelector((state) => state.movies.isSearching);

  // Skeleton cards in the same row layout while GPT and TMDB are working
  if (isSearching) {
    return (
      <div className="mx-auto mt-8 max-w-8xl px-4 pb-16">
        <div className="rounded-xl border border-white/10 bg-black/75 p-4 shadow-2xl backdrop-blur-sm md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-red-600/30 border-t-red-600" />
            <p className="text-lg font-semibold text-white md:text-xl">
              Finding movies for you...
            </p>
          </div>

          <div className="no-scrollbar flex gap-4 overflow-x-auto p-1">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="w-36 flex-shrink-0 animate-pulse overflow-hidden rounded-lg bg-zinc-900 ring-1 ring-white/10 md:w-48"
              >
                <div className="aspect-[2/3] bg-zinc-800" />
                <div className="space-y-2 p-3">
                  <div className="h-4 w-3/4 rounded bg-zinc-700" />
                  <div className="h-3 w-1/4 rounded bg-zinc-700" />
                  <div className="h-3 w-full rounded bg-zinc-800" />
                  <div className="h-3 w-5/6 rounded bg-zinc-800" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!serachedMovies || serachedMovies.length === 0) return null;

  return (
    <div className="mx-auto mt-8 max-w-6xl px-4 pb-16">
      <div className="rounded-xl border border-white/10 bg-black/75 p-4 shadow-2xl backdrop-blur-sm md:p-8">
        <h2 className="mb-6 text-xl font-bold text-white md:text-2xl">
          Recommended for you
        </h2>

        {/* Single row that scrolls sideways; p-1 keeps the hover lift/ring from being clipped */}
        <div className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth p-1">
          {serachedMovies.map((movie) => {
            const rating = movie.vote_average?.toFixed(1);
            const year = movie.release_date?.slice(0, 4);

            return (
              <div
                key={movie.id}
                className="group flex w-36 flex-shrink-0 cursor-pointer flex-col overflow-hidden md:w-48 rounded-lg bg-zinc-900 ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:ring-red-600/60 hover:shadow-xl hover:shadow-red-900/20"
              >
                <div className="relative aspect-[2/3] overflow-hidden bg-zinc-800">
                  {movie.poster_path ? (
                    <img
                      src={`${IMG_CDN_URL}w342${movie.poster_path}`}
                      alt={movie.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center p-3 text-center text-sm font-semibold text-gray-400">
                      {movie.title}
                    </div>
                  )}

                  {rating > 0 && (
                    <span className="absolute right-2 top-2 flex items-center gap-1 rounded bg-black/80 px-2 py-0.5 text-xs font-semibold text-green-400">
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
                </div>

                <div className="flex flex-1 flex-col p-3">
                  <h3 className="line-clamp-1 text-sm font-semibold text-white md:text-base">
                    {movie.title}
                  </h3>
                  {year && (
                    <p className="mt-0.5 text-xs text-gray-400">{year}</p>
                  )}
                  {movie.overview && (
                    <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-gray-300">
                      {movie.overview}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
