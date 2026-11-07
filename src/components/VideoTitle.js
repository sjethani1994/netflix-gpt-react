const VideoTitle = ({ original_title, overview }) => {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] flex flex-col justify-center bg-gradient-to-r from-black via-black/60 to-transparent px-4 pb-20 pt-14 text-white sm:px-6 md:px-16 md:pb-56">
      <h1 className="line-clamp-2 max-w-[80%] text-2xl font-extrabold drop-shadow-lg sm:text-4xl md:max-w-xl md:text-6xl">
        {original_title}
      </h1>
      <p className="mt-4 hidden max-w-md text-lg leading-snug text-gray-200 drop-shadow md:line-clamp-3">
        {overview}
      </p>

      <div className="pointer-events-auto mt-4 flex gap-2 sm:gap-3 md:mt-6">
        <button className="flex items-center gap-2 rounded bg-white px-3 py-1.5 text-sm font-semibold sm:px-4 sm:py-2 sm:text-base text-black transition hover:bg-white/80 md:px-8 md:py-3 md:text-lg">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4 sm:h-5 sm:w-5 md:h-7 md:w-7"
            aria-hidden="true"
          >
            <path d="M6 4v16a1 1 0 0 0 1.52.85l13-8a1 1 0 0 0 0-1.7l-13-8A1 1 0 0 0 6 4z" />
          </svg>
          Play
        </button>
        <button className="flex items-center gap-2 rounded bg-gray-500/70 px-3 py-1.5 text-sm font-semibold sm:px-4 sm:py-2 sm:text-base text-white transition hover:bg-gray-500/50 md:px-8 md:py-3 md:text-lg">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4 sm:h-5 sm:w-5 md:h-7 md:w-7"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path strokeLinecap="round" d="M12 16v-5M12 8h.01" />
          </svg>
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
