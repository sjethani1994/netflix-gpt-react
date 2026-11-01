import React from "react";
import { language } from "../utils/languageConstants";
import { useSelector } from "react-redux";

const GptSeachBar = () => {
  const selectedLanguage = useSelector((state) => state.config.language);
  return (
    <div className="flex justify-center px-4 pt-28 md:pt-[12vh]">
      <form className="flex w-full max-w-3xl flex-col gap-3 rounded-xl border border-white/20 bg-zinc-700/60 p-4 shadow-2xl backdrop-blur-sm sm:flex-row sm:items-center md:p-6">
        <input
          type="text"
          placeholder={language[selectedLanguage].getSearchPlaceholder}
          className="w-full flex-1 rounded-md border border-gray-400/60 bg-zinc-800/80 px-5 py-3 text-base text-white placeholder-gray-500 transition focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/40 md:text-lg"
        />
        <button
          type="submit"
          className="rounded-md bg-red-600 px-8 py-3 text-base font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600/50 active:scale-95 md:text-lg"
        >
          {language[selectedLanguage].search}
        </button>
      </form>
    </div>
  );
};

export default GptSeachBar;
