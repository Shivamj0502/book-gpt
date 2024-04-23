import { prisma } from "@/lib/prisma";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const requestUrl = new URL(request.url);
	const chatID = requestUrl.searchParams.get("chatID");
	chatID?.toString();
	const cookieStore = cookies();
	const supabase = createServerComponentClient({ cookies });
	const { data } = await supabase.auth.getSession();

	if (!data.session?.user.id) {
		return NextResponse.json([
			{
				error: "Internal Server Error",
			},
			{
				status: 500,
			},
		]);
	} else {
		const userChats = await prisma.messages.findMany({
			where: {
				chatID: chatID!,
			},
		});
		return NextResponse.json([
			{
				data: userChats,
			},
			{
				status: 200,
			},
		]);
	}
}
