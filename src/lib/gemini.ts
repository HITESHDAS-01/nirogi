import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function processDocument(base64Data: string, mimeType: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `You are a medical document assistant. Extract information from this document.
Return ONLY valid JSON with these fields:
{
  "doc_type": "",
  "doc_date": "",
  "hospital_name": "",
  "doctor_name": "",
  "diagnosis": "",
  "medicines": [],
  "tests": [],
  "key_values": [],
  "follow_up_date": "",
  "follow_up_notes": "",
  "risk_level": "green|yellow|red",
  "explanation_simple": "",
  "important_notes": []
}
Rules:
- diagnosis: only if explicitly written by doctor
- risk_level: green=all normal, yellow=some borderline, red=abnormal/urgent
- explanation_simple: in plain language, no medical jargon
- Never guess or infer diagnosis`;

  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        mimeType,
        data: base64Data,
      },
    },
  ]);

  const response = result.response.text();
  const jsonMatch = response.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Failed to parse AI response");

  return JSON.parse(jsonMatch[0]);
}

export async function chatWithAI(
  messages: Array<{ role: string; content: string }>,
  userProfile: string,
  recentDocs: string
) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const systemPrompt = `You are Nirogi Assistant, a personal health companion.
You have access to the user's health profile and medical records.

USER PROFILE:
${userProfile}

RECENT DOCUMENTS:
${recentDocs}

Rules:
- Explain, educate, organize, compare
- Never diagnose, prescribe, or replace doctors
- If user describes emergency symptoms → advise emergency care immediately
- If asked about specific report → refer to their actual data
- Keep responses concise and friendly
- Never make up medical information`;

  const chat = model.startChat({
    history: [
      { role: "user", parts: [{ text: systemPrompt }] },
      { role: "model", parts: [{ text: "Understood. I'm ready to help with health questions." }] },
      ...messages.map((m) => ({
        role: m.role === "user" ? "user" : "model" as const,
        parts: [{ text: m.content }],
      })),
    ],
  });

  const lastMessage = messages[messages.length - 1];
  const result = await chat.sendMessage(lastMessage.content);
  return result.response.text();
}
