import React, { useRef, useState } from "react";
import { useVideoKey } from "../hooks/useMovies";
import { useSelector } from "react-redux";

const VideoBackground = ({ movies }) => {
  useVideoKey(movies.id);

  const videoKey = useSelector((store) => store.movies.videoKeys[movies.id]);
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef(null);

  // Tell the YouTube player to mute/unmute. Changing the iframe src instead would reload the video.
  const toggleMute = () => {
    const command = isMuted ? "unMute" : "mute";
    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({ event: "command", func: command, args: [] }),
      "*",
    );
    setIsMuted(!isMuted);
  };

  return (
    // Hero height: 60vh on mobile, up to 90vh on desktop so the movie rows peek below
    <div className="relative h-[60vh] w-full overflow-hidden bg-black md:h-[min(56.25vw,90vh)]">
      {videoKey ? (
        <iframe
          ref={iframeRef}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[max(60vh,56.25vw)] w-[max(100vw,106.67vh)] -translate-x-1/2 -translate-y-1/2 scale-125 md:h-[56.25vw] md:w-screen"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoKey}&playsinline=1&enablejsapi=1`}
          title="Trailer"
          allow="autoplay; encrypted-media; picture-in-picture"
        ></iframe>
      ) : (
        movies.backdrop_path && (
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={`https://image.tmdb.org/t/p/original${movies.backdrop_path}`}
            alt={movies.original_title}
          />
        )
      )}
      {/* Fade into the page below */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent" />

      {videoKey && (
        <button
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
          // z-10 keeps it clickable above the VideoTitle overlay
          className="absolute bottom-16 right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/70 text-white transition hover:bg-white/10 md:bottom-40 md:right-16"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M11 5 6 9H2v6h4l5 4V5z" fill="currentColor" />
            {isMuted ? (
              <path d="m23 9-6 6M17 9l6 6" />
            ) : (
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />
            )}
          </svg>
        </button>
      )}
    </div>
  );
};

export default VideoBackground;
