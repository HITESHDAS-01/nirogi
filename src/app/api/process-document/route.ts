import { NextResponse } from "next/server";
import { processDocument, isGeminiConfigured } from "@/lib/gemini";
import { createClient } from "@/lib/supabase/server";
import { getDocumentProcessingPrompt } from "@/lib/ai/system-prompt";

export async function POST(request: Request) {
  let document_id: string | undefined;

  try {
    const body = await request.json();
    const { file_url, file_type } = body;
    document_id = body.document_id;

    if (!isGeminiConfigured()) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 503 }
      );
    }

    if (!file_url) {
      return NextResponse.json(
        { error: "file_url is required" },
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
    let conditions: string[] = [];
    let medicines: string[] = [];
    let allergies: string[] = [];

    if (user) {
      const [profileRes, healthRes, conditionsRes, medicinesRes] = await Promise.all([
        supabase.from("profiles").select("dob").eq("id", user.id).maybeSingle(),
        supabase.from("health_profiles").select("allergies").eq("user_id", user.id).maybeSingle(),
        supabase.from("chronic_conditions").select("condition_name").eq("user_id", user.id),
        supabase.from("current_medicines").select("medicine_name").eq("user_id", user.id),
      ]);

      if (profileRes.data?.dob) {
        const birth = new Date(profileRes.data.dob);
        const today = new Date();
        userAge = today.getFullYear() - birth.getFullYear();
      }

      allergies = Array.isArray(healthRes.data?.allergies) ? healthRes.data.allergies : [];
      conditions = (conditionsRes.data || []).map((c) => c.condition_name).filter(Boolean);
      medicines = (medicinesRes.data || []).map((m) => m.medicine_name).filter(Boolean);
    }

    const systemPrompt = getDocumentProcessingPrompt({
      name: userName,
      age: userAge,
      conditions,
      medicines,
      allergies,
    });

    const response = await fetch(file_url);
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch document" },
        { status: 500 }
      );
    }

    const buffer = await response.arrayBuffer();
    const base64Data = Buffer.from(buffer).toString("base64");

    const extraction = await processDocument(base64Data, file_type || "application/pdf", systemPrompt);

    if (document_id && user) {
      await supabase.from("document_extractions").insert({
        document_id,
        user_id: user.id,
        extracted_data: extraction,
        explanation_en: extraction.explanation_simple || "",
        risk_level: extraction.risk_level || "green",
        key_findings: extraction.key_values || [],
        medicines_found: extraction.medicines || [],
        follow_up_date: extraction.follow_up_date || null,
        follow_up_notes: extraction.follow_up_notes || null,
        diagnosis_noted: extraction.diagnosis || null,
        allergy_warnings: extraction.allergy_warnings || [],
        interaction_warnings: extraction.interaction_warnings || [],
        duplicate_warnings: extraction.duplicate_warnings || [],
        ai_model_used: "gemini-2.5-flash",
      });

      await supabase.from("documents").update({
        processing_status: "completed",
        doc_type: extraction.doc_type || null,
        doc_date: extraction.doc_date || null,
        hospital_name: extraction.hospital_name || null,
        doctor_name: extraction.doctor_name || null,
      }).eq("id", document_id);
    }

    return NextResponse.json({
      status: "completed",
      extraction,
    });
  } catch (error) {
    console.error("Document processing error:", error);

    // Update status to failed so document doesn't stay stuck in "processing"
    if (document_id) {
      try {
        const supabase = await createClient();
        if (supabase) {
          await supabase.from("documents").update({
            processing_status: "failed",
          }).eq("id", document_id);
        }
      } catch {}
    }

    return NextResponse.json(
      { error: "Failed to process document" },
      { status: 500 }
    );
  }
}
