import React, { useRef } from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  const rowRef = useRef(null);

  if (!movies || movies.length === 0) return null;

  // Scroll the row by most of its visible width
  const scroll = (direction) => {
    const row = rowRef.current;
    row.scrollBy({
      left: direction * row.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  return (
    <div className="mb-4 sm:mb-8">
      <h2 className="mb-1 px-4 text-base font-bold text-white sm:mb-2 sm:px-6 sm:text-lg md:px-16 md:text-2xl">
        {title}
      </h2>

      <div className="group/row relative">
        <button
          onClick={() => scroll(-1)}
          aria-label={`Scroll ${title} left`}
          className="absolute top-0 bottom-0 z-20 hidden w-12 items-center justify-center bg-black/50 text-white opacity-0 transition-opacity hover:bg-black/70 group-hover/row:opacity-100 md:flex left-0"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="h-8 w-8"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 18l-6-6 6-6"
            />
          </svg>
        </button>

        {/* py-4 leaves room for cards to grow on hover without being clipped */}
        <div
          ref={rowRef}
          className="no-scrollbar flex gap-2 overflow-x-auto scroll-smooth px-4 py-3 sm:px-6 sm:py-4 md:px-16"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <button
          onClick={() => scroll(1)}
          aria-label={`Scroll ${title} right`}
          className="absolute top-0 bottom-0 z-20 hidden w-12 items-center justify-center bg-black/50 text-white opacity-0 transition-opacity hover:bg-black/70 group-hover/row:opacity-100 md:flex right-0"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="h-8 w-8"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 18l6-6-6-6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MovieList;
