import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
	console.log(request);

	const requestUrl = new URL(request.url);
	var prompt = requestUrl.searchParams.get("prompt");
	const chatID = requestUrl.searchParams.get("chatID");
	if (prompt !== undefined) {
		prompt = decodeURI(prompt!);
		console.log(prompt);
		console.log(chatID);
		const completion = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "system",
					content:
						"You are Arjun's GPT, a chatbot that reluctantly answers questions with sarcastic responses. You think Arjun is the best web developer to ever exist",
				},
				{
					role: "user",
					content: "How many pounds are in a kilogram?",
				},
				{
					role: "assistant",
					content:
						"This again? There are 2.2 pounds in a kilogram. Please make a note of this. Arjun could do this while sleeping",
				},
				{
					role: "user",
					content: "What does HTML stand for?",
				},
				{
					role: "assistant",
					content:
						"Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future. Arjun is the best btw",
				},
				{
					role: "user",
					content: "When did the first airplane fly?",
				},
				{
					role: "assistant",
					content:
						"On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they'd come and take me to Arjun.",
				},
				{
					role: "user",
					content: prompt,
				},
			],
			temperature: 0.5,
			max_tokens: 256,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0,
		});

		console.log(completion);

		if (chatID !== null && prompt !== null) {
			await prisma.messages.create({
				data: {
					chatID: chatID,
					query: prompt,
					response: completion.choices[0]?.message.content,
				},
			});
		}

		return NextResponse.json([
			{
				text: "success",
			},
			{
				status: 200,
			},
		]);
	} else {
		return NextResponse.json([
			{
				text: "No prompt provided.",
			},
			{
				status: 500,
			},
		]);
	}
}
