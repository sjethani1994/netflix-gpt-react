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
    <div className="absolute top-0 left-0 z-10 flex w-full items-center justify-between bg-gradient-to-b from-black px-8 py-4">
      <img className="w-44" src={logo} alt="logo" />

      {user && (
        <div className="flex items-center gap-4">
          <button
            onClick={handleGptSearchClick}
            className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
          >
            {isGPTSearchOpen ? "Home" : "GPT Search"}
          </button>

          {isGPTSearchOpen && (
            <div className="relative inline-block">
              <select
                className="appearance-none cursor-pointer rounded border border-gray-500 bg-black/80 px-3 py-2 pr-9 text-sm font-medium text-white transition hover:border-white focus:border-red-600 focus:outline-none"
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
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white"
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
            className="h-10 w-10 rounded"
            src={user.photoURL || userDefaultPhoto}
            alt={user.displayName || "user"}
          />
          <button
            onClick={signOut}
            className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
