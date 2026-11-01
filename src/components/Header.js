import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { logOut } from "../services/authService";
import { getAuthErrorMessage } from "../utils/authErrors";

const Header = () => {
  const user = useSelector((store) => store.user);
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

  return (
    <div className="absolute top-0 left-0 z-10 flex w-full items-center justify-between bg-gradient-to-b from-black px-8 py-4">
      <img
        className="w-44"
        src="https://occ.a.nflxso.net/dnmt/api/v6/iL4oJVDYZ8KLSrJ6eG2OwtghbfQ/AAAAAchJje9GUBJ_ehbO0uOApH8QmRyuvK0LQI9obzFeGtfkpfLyh4FdolMZR4PtvyNoOomDcY7BzTbhFC3gJinH0UadYBg807AKDSPyfsUDm9T3CZKn9OSZN3II7060MZESFcb6YOS9jvzh.svg"
        alt="logo"
      />

      {user && (
        <div className="flex items-center gap-4">
          <img
            className="h-10 w-10 rounded"
            src="https://occ-0-3216-2186.1.nflxso.net/dnm/api/v6/SO2HoVCx33X8phZh2pZZmQ4QgNY/AAAABWdoQDrgD7cokEYrF-FVdgfoil5wiBMg6j3GeUjYY_av6C64opFSXOsJ5U8EF02G6SB6b4zUw4MSG6EtpQu8gUBg1Y5Bgs4.png?r=229"
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
