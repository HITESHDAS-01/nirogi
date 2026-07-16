import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 503 }
      );
    }

    // TODO: Call Gemini chat with user context
    // For now, return a helpful message
    return NextResponse.json({
      reply: "AI Chat is not yet configured. Please add your Gemini API key to .env.local to enable this feature.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process chat" },
      { status: 500 }
    );
  }
}
