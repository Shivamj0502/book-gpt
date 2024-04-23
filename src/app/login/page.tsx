// import { LoginForm } from "./form";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import LoginForm from "./form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage() {
	const supabase = createServerComponentClient({ cookies });

	const { data } = await supabase.auth.getSession();

	if (data.session) {
		console.log(data.session);
		return redirect("/logout");
	}

	return (
		<>
			<section className="bg-ct-blue-600 min-h-screen pt-20">
				<div className="container mx-auto flex h-full items-center justify-center px-6 py-12">
					<div className="bg-white px-8 py-10 md:w-8/12 lg:w-5/12">
						<LoginForm />
					</div>
				</div>
			</section>
		</>
	);
}
