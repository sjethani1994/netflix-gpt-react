import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { logOut } from "../services/authService";
import { getAuthErrorMessage } from "../utils/authErrors";
import { logo, supportedLanguages, userDefaultPhoto } from "../utils/constants";
import { toggleGPTSearch } from "../utils/gptSlice";

const Header = () => {
  const user = useSelector((store) => store.user);
  const isGPTSearchOpen = useSelector((store) => store.gpt.isGPTSearchOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signOut = async () => {
    try {
      toast.success("Successfully sign out");
      await logOut(); // listener in Body then runs removeUser() + navigate("/")
      dispatch(removeUser());
      navigate("/");
    } catch (error) {
      toast.error(getAuthErrorMessage(error));
    }
  };

  const handleGptSearchClick = () => {
    dispatch(toggleGPTSearch());
  };
  return (
    // Smaller padding, logo and controls on phones so everything fits on one line
    <div className="absolute top-0 left-0 z-10 flex w-full items-center justify-between gap-2 bg-gradient-to-b from-black px-4 py-3 md:px-8 md:py-4">
      <img className="w-24 flex-shrink-0 sm:w-32 md:w-44" src={logo} alt="logo" />

      {user && (
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={handleGptSearchClick}
            className="whitespace-nowrap rounded bg-red-600 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-red-700 md:px-4 md:py-2 md:text-sm"
          >
            {isGPTSearchOpen ? "Home" : "GPT Search"}
          </button>

          {isGPTSearchOpen && (
            <div className="relative inline-block">
              <select
                className="appearance-none cursor-pointer rounded border border-gray-500 bg-black/80 py-1.5 pl-2 pr-7 text-xs font-medium text-white transition hover:border-white focus:border-red-600 focus:outline-none md:px-3 md:py-2 md:pr-9 md:text-sm"
                value={user.language}
                onChange={(e) =>
                  dispatch({
                    type: "config/setLanguage",
                    payload: e.target.value,
                  })
                }
              >
                {supportedLanguages.map((lang) => (
                  <option
                    key={lang.code}
                    value={lang.code}
                    className="bg-gray-900 text-white"
                  >
                    {lang.name}
                  </option>
                ))}
              </select>

              <svg
                className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white md:right-3 md:h-4 md:w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          )}

          <img
            className="hidden h-8 w-8 rounded sm:block md:h-10 md:w-10"
            src={user.photoURL || userDefaultPhoto}
            alt={user.displayName || "user"}
          />
          <button
            onClick={signOut}
            aria-label="Sign Out"
            className="flex items-center gap-1.5 rounded bg-red-600 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-red-700 md:px-4 md:py-2 md:text-sm"
          >
            {/* Icon only on phones, text from sm up */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 sm:hidden"
              aria-hidden="true"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
