"use client";
import React from "react";
// import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function LoginForm() {
	const supabase = createClientComponentClient();

	console.log(`${window.location.origin}/auth/callback`);

	const handleLoginWithGoogle = () => {
		supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				redirectTo: `${window.location.origin}/auth/callback`,
			},
		});
	};

	const input_style =
		"form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

	return (
		<form action="/auth/login" method="post">
			{/* Email input field */}
			<div className="mb-6">
				<input
					required
					type="email"
					name="email"
					placeholder="Email address"
					className={`${input_style}`}
				/>
			</div>

			{/* Password input field */}
			<div className="mb-6">
				<input
					required
					type="password"
					name="password"
					placeholder="Password"
					className={`${input_style}`}
				/>
			</div>

			{/* Sign In button */}
			<button
				type="submit"
				className="inline-block w-full rounded bg-blue-600 px-7 py-4 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
			>
				Sign in
			</button>

			{/* Sign Up button */}
			<button
				type="submit"
				className="my-4 inline-block w-full rounded bg-blue-600 px-7 py-4 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
				formAction="/auth/signup"
			>
				Sign up
			</button>

			{/* OR divider */}
			<div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300">
				<p className="mx-4 mb-0 text-center font-semibold">OR</p>
			</div>

			{/* Sign In with Google button */}
			<a
				className="mb-3 flex w-full items-center justify-center rounded px-7 py-2 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
				style={{ backgroundColor: "#ffffff", color: "gray" }}
				onClick={handleLoginWithGoogle}
				role="button"
			>
				<img
					className="pr-2"
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqJfKJo3DdrXnTEKARi8lVPgX06k36eXvmJWh2N731Ylo7C0tvtXd-VuueGewCQwV1QJ4&usqp=CAU"
					alt=""
					style={{ height: "2rem" }}
				/>
				Continue with Google
			</a>
		</form>
	);
}
