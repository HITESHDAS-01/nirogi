import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { document_id, language } = await request.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 503 }
      );
    }

    // TODO: Fetch extraction, generate explanation in requested language
    return NextResponse.json({
      explanation: "Document explanation will be available once Gemini API key is configured.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate explanation" },
      { status: 500 }
    );
  }
}
