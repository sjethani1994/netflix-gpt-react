import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import checkValidData from "../utils/CheckValidData";
import { getAuthErrorMessage } from "../utils/authErrors";
import { signIn, signUp } from "../services/authService";
import { addUser } from "../utils/userSlice";
import { backgroundImage } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [loading, setLoading] = useState(false);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = checkValidData(
      email.current.value,
      password.current.value,
      isSignInForm ? undefined : name.current.value,
    );
    if (message) {
      toast.error(message);
      return;
    }

    setLoading(true);
    try {
      if (isSignInForm) {
        const user = await signIn(email.current.value, password.current.value);
        toast.success(
          `Welcome back${user.displayName ? ", " + user.displayName : ""}!`,
        );
      } else {
        const user = await signUp(
          name.current.value,
          email.current.value,
          password.current.value,
        );
        // The auth listener fires before updateProfile, so add the displayName here
        const { uid, email: userEmail, displayName, photoURL } = user;
        dispatch(addUser({ uid, email: userEmail, displayName, photoURL }));
        toast.success("Account created successfully!");
      }
    } catch (error) {
      toast.error(getAuthErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      <div className="absolute inset-0">
        <img
          className="h-full w-full object-cover"
          src={backgroundImage}
          alt="background"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 pt-20 pb-8 sm:pt-24">
        <form
          noValidate
          onSubmit={(e) => handleSubmit(e)}
          className="w-full max-w-md rounded-md bg-black/75 px-6 py-10 text-white sm:px-16 sm:py-12"
        >
          <h1 className="mb-6 text-2xl font-bold sm:mb-7 sm:text-3xl">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="mb-4 w-full rounded border border-gray-500 bg-gray-900/70 p-4 placeholder-gray-400 focus:border-white focus:outline-none"
            />
          )}
          <input
            ref={email}
            type="email"
            placeholder="Email Address"
            className="mb-4 w-full rounded border border-gray-500 bg-gray-900/70 p-4 placeholder-gray-400 focus:border-white focus:outline-none"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="mb-4 w-full rounded border border-gray-500 bg-gray-900/70 p-4 placeholder-gray-400 focus:border-white focus:outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded bg-red-600 py-3 font-semibold transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Please wait..." : isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <p className="mt-6 text-sm text-gray-400 sm:mt-8 sm:text-base">
            {isSignInForm ? "New to Netflix? " : "Already registered? "}
            <span
              className="cursor-pointer font-semibold text-white hover:underline"
              onClick={() => setIsSignInForm(!isSignInForm)}
            >
              {isSignInForm ? "Sign up now." : "Sign in now."}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
