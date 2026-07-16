import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/app/dashboard";
  const error = searchParams.get("error");

  // If there's an error from OAuth provider
  if (error) {
    return NextResponse.redirect(
      `${origin}/auth/login?error=${encodeURIComponent(error)}`
    );
  }

  // Exchange authorization code for session
  if (code) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.redirect(
        `${origin}/auth/login?error=not_configured`
      );
    }

    // Dynamic import to avoid issues at build time
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();

    if (supabase) {
      const { error: exchangeError } =
        await supabase.auth.exchangeCodeForSession(code);

      if (!exchangeError) {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // Fallback — something went wrong
  return NextResponse.redirect(
    `${origin}/auth/login?error=auth_failed`
  );
}
