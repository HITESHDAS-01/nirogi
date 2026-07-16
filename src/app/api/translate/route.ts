import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { text, target_language } = await request.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 503 }
      );
    }

    // TODO: Call Gemini for translation
    return NextResponse.json({
      translated_text: "Translation will be available once Gemini API key is configured.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to translate" },
      { status: 500 }
    );
  }
}
