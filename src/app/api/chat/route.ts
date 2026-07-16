import { NextResponse } from "next/server";
import { chatWithAIStream, isGeminiConfigured } from "@/lib/gemini";
import { createClient } from "@/lib/supabase/server";
import { getNirogiSystemPrompt, buildRecordsSummary } from "@/lib/ai/system-prompt";

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!isGeminiConfigured()) {
      return NextResponse.json(
        { error: "Gemini API key not configured. Please add GEMINI_API_KEY to .env.local." },
        { status: 503 }
      );
    }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase not configured" },
        { status: 503 }
      );
    }

    const { data: { user } } = await supabase.auth.getUser();

    let userName = "User";
    let userAge = 30;
    let bloodGroup = "";
    let conditions: string[] = [];
    let medicines: string[] = [];
    let allergies: string[] = [];
    let language = "en";
    let recordsSummary = "No health records available yet.";

    if (user) {
      const [profileRes, healthRes, conditionsRes, medicinesRes, docsRes, metricsRes, followUpsRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
        supabase.from("health_profiles").select("*").eq("user_id", user.id).maybeSingle(),
        supabase.from("chronic_conditions").select("condition_name").eq("user_id", user.id),
        supabase.from("current_medicines").select("medicine_name").eq("user_id", user.id),
        supabase.from("documents").select("file_name, doc_type, doc_date, hospital_name, doctor_name, processing_status").eq("user_id", user.id).order("created_at", { ascending: false }).limit(10),
        supabase.from("health_metrics").select("metric_type, value, unit, recorded_at").eq("user_id", user.id).order("recorded_at", { ascending: false }).limit(20),
        supabase.from("follow_ups").select("doctor_name, due_date, notes, is_completed").eq("user_id", user.id).order("due_date", { ascending: true }).limit(10),
      ]);

      const p = profileRes.data;
      const h = healthRes.data;

      if (p) {
        userName = p.full_name || "User";
        language = p.language || "en";
        if (p.dob) {
          const birth = new Date(p.dob);
          const today = new Date();
          userAge = today.getFullYear() - birth.getFullYear();
        }
      }

      if (h) {
        bloodGroup = h.blood_group || "";
        allergies = Array.isArray(h.allergies) ? h.allergies : [];
      }

      conditions = (conditionsRes.data || []).map((c) => c.condition_name).filter(Boolean);
      medicines = (medicinesRes.data || []).map((m) => m.medicine_name).filter(Boolean);

      const riskLevel = (status: string) => {
        if (status === "completed") return "green";
        if (status === "failed") return "red";
        return "yellow";
      };

      recordsSummary = buildRecordsSummary({
        recent_documents: (docsRes.data || []).map((d) => ({
          file_name: d.file_name,
          doc_type: d.doc_type || "document",
          doc_date: d.doc_date || "",
          hospital_name: d.hospital_name || "",
          doctor_name: d.doctor_name || "",
          risk_level: riskLevel(d.processing_status),
        })),
        recent_metrics: (metricsRes.data || []).map((m) => ({
          metric_type: m.metric_type,
          value: m.value,
          unit: m.unit || "",
          recorded_at: m.recorded_at,
        })),
        follow_ups: (followUpsRes.data || []).map((f) => ({
          doctor_name: f.doctor_name || "",
          due_date: f.due_date,
          notes: f.notes || "",
          is_completed: f.is_completed,
        })),
      });
    }

    const systemPrompt = getNirogiSystemPrompt({
      name: userName,
      age: userAge,
      blood_group: bloodGroup,
      conditions,
      medicines,
      allergies,
      language,
      records_summary: recordsSummary,
    });

    const stream = await chatWithAIStream(messages, systemPrompt);

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error: unknown) {
    console.error("Chat API error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    if (errorMessage.includes("API key not valid")) {
      return NextResponse.json(
        { error: "Invalid Gemini API key. Please check your GEMINI_API_KEY in .env.local." },
        { status: 401 }
      );
    }

    if (errorMessage.includes("429") || errorMessage.includes("quota")) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Failed to get AI response. Please try again." },
      { status: 500 }
    );
  }
}
