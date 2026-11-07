import React, { useRef } from "react";
import toast from "react-hot-toast";
import { language } from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openAI";
import { searchMovies } from "../services/movieService";
import { setIsSearching, setSearchResults } from "../utils/movieSlice";

// Turns OpenAI API errors into readable messages
const getGptErrorMessage = (error) => {
  if (
    error?.type === "insufficient_quota" ||
    error?.code === "insufficient_quota" ||
    error?.code === "credit_balance_exhausted"
  )
    return "API quota exceeded. Check your account's usage limits.";
  if (error?.status === 429)
    return "Too many requests. Please wait a moment and try again.";
  if (error?.status === 401)
    return "Missing or invalid API key. Check REACT_APP_GROQ_API_KEY in .env.local.";
  if (error?.status === 404) return "The selected GPT model is not available.";
  return "Something went wrong with GPT search. Please try again.";
};

const parseMovieNames = (content = "") => {
  const match = content.match(/\[[\s\S]*\]/);
  if (match) {
    try {
      const names = JSON.parse(match[0]);
      if (Array.isArray(names)) {
        return names.map((name) => String(name).trim()).filter(Boolean);
      }
    } catch {
      // not valid JSON, use the fallback below
    }
  }
  return (
    content
      .split(/[,\n]/)
      // strip list markers like "1.", "2)", "-", "*" and surrounding quotes, but keep titles like "3 Idiots"
      .map((name) =>
        name
          .trim()
          .replace(/^(\d+[.)]|[-*•])\s*/, "")
          .replace(/^"|"$/g, "")
          .trim(),
      )
      .filter(Boolean)
  );
};

const GptSeachBar = () => {
  const selectedLanguage = useSelector((state) => state.config.language);
  const searchText = useRef("");
  // In Redux so GptMovieSuggestions can show a loader too
  const loading = useSelector((state) => state.movies.isSearching);
  const dispatch = useDispatch(); // hooks only at the top level of the component

  const handleGptSearchClick = async () => {
    const query = searchText.current.value.trim();
    if (!query) {
      toast.error("Please enter what you'd like to watch.");
      return;
    }

    // System message fixes the output format; user message is just what they typed
    const systemPrompt = `You are a movie recommendation engine. Reply with ONLY a JSON array of exactly 10 movie titles as strings, using each movie's official English release title. No numbering, descriptions, years, markdown or extra text.
Rules for choosing the 10 titles:
1. If the user's text is or contains the name of a movie, that exact movie MUST be the first item.
2. Next, include other real movies whose titles contain the user's words (for example sequels or movies with the same word in the title).
3. Fill any remaining places with movies most similar to the user's request (same lead actors, genre, language and era).
4. If the text describes a mood or genre instead of a title, return 10 movies that best match it.
Example: for "chennai express" reply ["Chennai Express", "Dilwale", "Happy New Year", "Golmaal Again", "Singham", "Ra.One", "Main Hoon Na", "Om Shanti Om", "Kal Ho Naa Ho", "Rowdy Rathore"]`;

    dispatch(setIsSearching(true));
    dispatch(setSearchResults([])); // clear old results so the loader shows
    try {
      const completion = await openai.chat.completions.create({
        model: "openai/gpt-oss-120b", // Groq model; list at console.groq.com/docs/models
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: query },
        ],
      });
      const movieNames = parseMovieNames(completion.choices[0].message.content);
      if (movieNames.length === 0) {
        toast.error("No movies found. Try describing it differently.");
        return;
      }

      // Search TMDB for every title in parallel (plain service call, not a hook)
      const results = await Promise.all(
        movieNames.map((name) => searchMovies(name)),
      );
      // Keep the best match per title: exact title match if there is one, else TMDB's first result
      const movies = results
        .map((list, i) => {
          const items = list || [];
          return (
            items.find(
              (m) => m.title?.toLowerCase() === movieNames[i].toLowerCase(),
            ) || items[0]
          );
        })
        .filter(Boolean);
      dispatch(setSearchResults(movies));
    } catch (error) {
      console.error("GPT search failed:", error);
      toast.error(getGptErrorMessage(error));
    } finally {
      dispatch(setIsSearching(false));
    }
  };
  return (
    <div className="flex justify-center px-4 pt-28 md:pt-[12vh]">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex w-full max-w-3xl flex-col gap-3 rounded-xl border border-white/20 bg-zinc-700/60 p-4 shadow-2xl backdrop-blur-sm sm:flex-row sm:items-center md:p-6"
      >
        <input
          type="text"
          ref={searchText}
          placeholder={language[selectedLanguage].getSearchPlaceholder}
          className="w-full flex-1 rounded-md border border-gray-400/60 bg-zinc-800/80 px-5 py-3 text-base text-white placeholder-gray-500 transition focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/40 md:text-lg"
        />
        <button
          onClick={handleGptSearchClick}
          disabled={loading}
          className="rounded-md bg-red-600 px-8 py-3 text-base font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600/50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 md:text-lg"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Searching...
            </span>
          ) : (
            language[selectedLanguage].search
          )}
        </button>
      </form>
    </div>
  );
};

export default GptSeachBar;
