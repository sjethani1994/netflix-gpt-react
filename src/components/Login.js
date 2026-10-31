import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  return (
    <div className="relative min-h-screen w-full">
      <Header />
      <div className="absolute inset-0">
        <img
          className="h-full w-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/29195c81-5ebb-453e-82e9-d3a50737dfb3/web/IN-en-20261026-TRIFECTA-perspective_ef561213-292c-4768-aef0-c1db800e385e_large.jpg"
          alt="background"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 pt-24 pb-8">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-md rounded-md bg-black/75 px-8 py-12 text-white sm:px-16"
        >
          <h1 className="mb-7 text-3xl font-bold">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignInForm && (
            <input
              type="text"
              placeholder="Full Name"
              className="mb-4 w-full rounded border border-gray-500 bg-gray-900/70 p-4 placeholder-gray-400 focus:border-white focus:outline-none"
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            className="mb-4 w-full rounded border border-gray-500 bg-gray-900/70 p-4 placeholder-gray-400 focus:border-white focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-4 w-full rounded border border-gray-500 bg-gray-900/70 p-4 placeholder-gray-400 focus:border-white focus:outline-none"
          />

          <button
            type="submit"
            className="mt-2 w-full rounded bg-red-600 py-3 font-semibold transition-colors hover:bg-red-700"
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <p className="mt-8 text-gray-400">
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
