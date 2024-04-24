"use client";
import React from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const LoginForm: React.FC = () => {
  const handleLoginWithGoogle = async () => {
    const { createClientComponentClient } = await import(
      "@supabase/auth-helpers-nextjs"
    );
    const supabase = createClientComponentClient();
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-8 text-center">Welcome Back!</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            required
            className="form-input appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email Address"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            required
            className="form-input appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
          />
        </div>
        <div className="flex items-center justify-between">
          <button className="btn-primary w-full mr-2" type="submit">
            Sign In
          </button>
          <button
            className="btn-primary w-full ml-2"
            type="submit"
            formAction="/auth/signup"
          >
            Sign Up
          </button>
        </div>
        <div className="my-4 w-full flex items-center border-t border-gray-300">
          <p className="mx-4 mb-0 text-center font-semibold">OR</p>
        </div>
        <button className="btn-google mb-3" onClick={handleLoginWithGoogle}>
          <img
            className="pr-2"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqJfKJo3DdrXnTEKARi8lVPgX06k36eXvmJWh2N731Ylo7C0tvtXd-VuueGewCQwV1QJ4&usqp=CAU"
            alt=""
            style={{ height: "2rem" }}
          />
          Continue with Google
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
