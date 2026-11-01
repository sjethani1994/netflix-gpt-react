import React from "react";
import GptSeachBar from "./GptSeachBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { backgroundImage } from "../utils/constants";

const GptSearch = () => {
  return (
    <div className="relative min-h-screen">
      {/* Same background as the login page; fixed so it stays put while results scroll */}
      <div className="fixed inset-0">
        <img
          className="h-full w-full object-cover"
          src={backgroundImage}
          alt="background"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative">
        <GptSeachBar />
        <GptMovieSuggestions />
      </div>
    </div>
  );
};

export default GptSearch;
