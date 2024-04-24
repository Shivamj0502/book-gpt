import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEN_API_KEY!);

export async function POST(request: Request) {
  console.log(request);

  const requestUrl = new URL(request.url);
  var prompt = requestUrl.searchParams.get("prompt");
  const chatID = requestUrl.searchParams.get("chatID");
  if (prompt !== undefined) {
    prompt = decodeURI(prompt!);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: "I'm looking for a new thriller to read. Any suggestions?",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "Absolutely! I recommend 'Gone Girl' by Gillian Flynn. It's a gripping psychological thriller full of twists and turns.",
            },
          ],
        },
        {
          role: "user",
          parts: [
            {
              text: "I need a book that's both educational and engaging. Can you help?",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "Of course! 'Sapiens: A Brief History of Humankind' by Yuval Noah Harari is a fascinating and insightful read that explores the history of our species.",
            },
          ],
        },
        {
          role: "user",
          parts: [
            {
              text: "I love historical fiction. Do you have any recommendations?",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "Sure thing! 'The Nightingale' by Kristin Hannah is a moving historical fiction novel set during World War II in France.",
            },
          ],
        },
        {
          role: "user",
          parts: [
            {
              text: "I'm looking for something light and funny to read. Any ideas?",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "Absolutely! 'Bossypants' by Tina Fey is a hilarious and light-hearted memoir that will definitely make you laugh.",
            },
          ],
        },
        {
          role: "user",
          parts: [
            {
              text: "I need a book that can help me unwind before bed. What do you suggest?",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "Sure thing! 'The Alchemist' by Paulo Coelho is a soothing and philosophical read that's perfect for relaxing before sleep.",
            },
          ],
        },
        {
          role: "user",
          parts: [
            {
              text: "I'm into science fiction lately. Got any good sci-fi book recommendations?",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "Of course! 'Dune' by Frank Herbert is a must-read in the sci-fi genre, offering a complex story of politics, religion, and ecology set on a desert planet.",
            },
          ],
        },
        {
          role: "user",
          parts: [
            {
              text: "I need a book that's inspiring and motivating. Can you recommend one?",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "Absolutely! 'The Power of Now' by Eckhart Tolle is an inspiring read that encourages living in the moment and finding peace within.",
            },
          ],
        },
        {
          role: "user",
          parts: [
            {
              text: "I'm looking for a gripping mystery novel. Any suggestions?",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "Sure thing! 'The Girl with the Dragon Tattoo' by Stieg Larsson is a complex and thrilling mystery that's hard to put down.",
            },
          ],
        },

        {
          role: "user",
          parts: [
            {
              text: "Can you help me fix my car's engine?",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "Sorry, I am BookGPT and I may not be able to assist you with car repairs. Is there a particular type of book you're interested in?",
            },
          ],
        },
        {
          role: "user",
          parts: [
            {
              text: "Do you know how to play the piano?",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "Sorry, I am BookGPT and I may not be able to assist you with playing the piano. However, I can recommend some excellent books on music theory if you're interested?",
            },
          ],
        },
        {
          role: "user",
          parts: [
            {
              text: "What's the weather forecast for tomorrow?",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "Sorry, I am BookGPT and I don't have current weather information. Would you like a book suggestion instead, perhaps something related to meteorology?",
            },
          ],
        },
        {
          role: "user",
          parts: [
            {
              text: "Can you recommend a good recipe for lasagna?",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "Sorry, I am BookGPT and I specialize in book recommendations, not recipes. Can I suggest a cookbook or a book about Italian cuisine instead?",
            },
          ],
        },
        {
          role: "user",
          parts: [
            {
              text: "How do I solve this math problem: 3x + 5 = 20?",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "Sorry, I am BookGPT and I may not be able to assist you directly with math problems. However, I can recommend some excellent books on algebra that might help you solve it.",
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 200,
      },
    });

    const msg = prompt;

    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const text = response.text();

    console.log(text);

    if (chatID !== null && prompt !== null) {
      await prisma.messages.create({
        data: {
          chatID: chatID,
          query: prompt,
          response: text,
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
