import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { file_url, file_type } = await request.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 503 }
      );
    }

    // TODO: Fetch file from Supabase Storage, convert to base64, call Gemini
    // For now, return a placeholder response
    return NextResponse.json({
      status: "pending",
      message: "Document processing will be available once Gemini API key is configured.",
      extraction: null,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process document" },
      { status: 500 }
    );
  }
}
