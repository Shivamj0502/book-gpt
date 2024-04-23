import React from "react";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ChatInterface from "./chatInterface";

export default async function ChatPage() {
	const supabase = createServerComponentClient({ cookies });

	const { data } = await supabase.auth.getSession();

	if (!data.session) {
		return redirect("/login");
	}

	return (
		<div>
			<ChatInterface />
		</div>
	);
}
