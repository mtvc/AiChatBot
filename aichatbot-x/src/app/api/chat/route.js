import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request) {
  try {
    const { message } = await request.json();
    if (!message) {
      return NextResponse.json(
        { message: "Message is required" },
        { status: 400 }
      );
    }

    const chatCompletion = await groq.chatCompletion.create({
      message: [
        {
          role: "user",
          content: message,
        },
        {
          role: "bot",
          content: "Hello, how can I help you?",
        },
      ],
      model: "llama3-8b-8192",
    });

    const responseMessage =
      chatCompletion.choices[0]?.content || "No response from the bot";

    return NextResponse.json({ message: responseMessage });
  } catch (error) {
    console.error("error in chatbot", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
