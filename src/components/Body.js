import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { subscribeToAuthChanges } from "../services/authService";
import { addUser, removeUser } from "../utils/userSlice";
import Header from "./Header";

// Layout route: listens for auth changes and renders the matched child page
const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      if (user) {
        dispatch(addUser(user));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return unsubscribe;
  }, [dispatch, navigate]);

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Body;
