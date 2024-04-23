import { prisma } from "@/lib/prisma";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const requestUrl = new URL(request.url);
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
		await prisma.chats.create({
			data: {
				userID: data.session?.user.id,
			},
		});
		return NextResponse.json([
			{
				message: "success",
			},
			{
				status: 200,
			},
		]);
	}
}
