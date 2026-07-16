# Nirogi — Personal AI Health Companion
### Plan Document v1.0

> **Tagline:** Understand Your Health, Not Just Store It.
>
> **Name meaning:** निरोगी (Nirogi) = Free from illness. Sanskrit origin. Universal across Hindi, Assamese, Bengali, Tamil, Telugu.

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Frontend | Next.js 14+ (App Router) | Tera existing strength |
| Database | Supabase (Postgres + RLS) | Auth + Storage + DB ek jagah |
| Auth | Supabase Auth | Google OAuth + Email |
| File Storage | Supabase Storage | Medical documents secure storage |
| Styling | Tailwind CSS + shadcn/ui | Fast, clean, accessible |
| AI — All Tasks | Gemini 2.5 Flash | Vision + Chat + Multilingual + Assamese |
| PWA | next-pwa | Emergency Card offline access |

**Why Gemini 2.5 Flash — single model:**
- Vision + PDF + image understanding → medical reports ✅
- Chat + explanations + multilingual (Assamese/Hindi) → one key, zero complexity ✅

---

## Color System

| Token | Color | Use |
|---|---|---|
| Primary | `#1A6B4A` (Deep Medical Green) | Buttons, active states |
| Secondary | `#E8F5EF` (Mint) | Backgrounds, cards |
| Accent | `#2563EB` (Trust Blue) | Links, info |
| Risk Green | `#16A34A` | Normal values |
| Risk Yellow | `#D97706` | Borderline values |
| Risk Red | `#DC2626` | Abnormal / urgent values |
| Surface | `#FFFFFF` / `#F8FAFC` | Cards |
| Text | `#0F172A` | Primary text |

---

## Database Schema

```sql
-- Core Auth (Supabase handles)
-- profiles extends auth.users

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT,
  dob DATE,
  gender TEXT,
  language TEXT DEFAULT 'en', -- en, hi, as, bn, ta, te, mr
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE health_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  height_cm NUMERIC,
  weight_kg NUMERIC,
  blood_group TEXT,
  allergies TEXT[],
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE chronic_conditions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  condition_name TEXT NOT NULL,
  diagnosed_date DATE,
  notes TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE current_medicines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  medicine_name TEXT NOT NULL,
  dose TEXT,
  frequency TEXT,
  prescribed_by TEXT,
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT true,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE surgeries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  surgery_name TEXT NOT NULL,
  surgery_date DATE,
  hospital TEXT,
  surgeon TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE family_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  relation TEXT,
  condition TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT, -- pdf, image
  file_size_kb INTEGER,
  doc_type TEXT, -- prescription, blood_report, urine_report, xray, mri, ct, ecg, ultrasound, discharge_summary, vaccination, insurance, bill, other
  doc_date DATE,
  hospital_name TEXT,
  doctor_name TEXT,
  processing_status TEXT DEFAULT 'pending', -- pending, processing, done, failed
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE document_extractions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  extracted_data JSONB, -- raw AI extraction
  explanation_en TEXT, -- English explanation
  explanation_hi TEXT, -- Hindi explanation
  explanation_as TEXT, -- Assamese explanation
  risk_level TEXT DEFAULT 'green', -- green, yellow, red
  key_findings JSONB, -- array of {test, value, unit, normal_range, status}
  medicines_found JSONB,
  follow_up_date DATE,
  follow_up_notes TEXT,
  diagnosis_noted TEXT,
  ai_model_used TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE health_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  metric_type TEXT NOT NULL, -- weight, bp_systolic, bp_diastolic, sugar_fasting, sugar_pp, hba1c, spo2
  value NUMERIC NOT NULL,
  unit TEXT,
  recorded_at TIMESTAMPTZ DEFAULT now(),
  source TEXT DEFAULT 'manual', -- manual, document
  document_id UUID REFERENCES documents(id)
);

CREATE TABLE timeline_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL, -- document_upload, diagnosis, medicine_start, medicine_stop, surgery, metric_recorded, follow_up
  event_date DATE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  document_id UUID REFERENCES documents(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  messages JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE follow_ups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  document_id UUID REFERENCES documents(id),
  doctor_name TEXT,
  due_date DATE NOT NULL,
  notes TEXT,
  is_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS Policies (all tables)
-- ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Users see own data" ON profiles FOR ALL USING (auth.uid() = id);
-- (Same pattern for all tables with user_id)
```

---

## App Routes

```
/                          → Landing Page
/auth/login                → Login / Signup
/auth/callback             → Supabase OAuth callback

/app/                      → Dashboard (protected)
/app/profile               → Profile setup / edit
/app/profile/health        → Health data (height, weight, blood group, etc.)
/app/profile/medical       → Chronic conditions, medicines, surgeries, family history

/app/documents             → All documents list
/app/documents/upload      → Upload page
/app/documents/[id]        → Single document view + AI explanation

/app/timeline              → Full health timeline

/app/chat                  → AI Health Chat

/app/dashboard             → Health Dashboard (metrics, trends, alerts)

/app/search                → Search across all records

/app/summary               → Health Summary generator

/app/emergency             → Emergency Card (PWA offline accessible)

/app/knowledge             → Medical Knowledge base (AI-powered)

/app/settings              → Language, notifications, account, subscription
```

---

## Phase-wise Build Plan

---

### Phase 1 — Foundation
**Goal:** Auth working, profile setup, basic layout

**Tasks:**
- [ ] Next.js 14 project setup (App Router, TypeScript, Tailwind, shadcn/ui)
- [ ] Supabase project setup
- [ ] All tables created + RLS enabled
- [ ] Auth pages (Login, Signup, Google OAuth)
- [ ] Protected route middleware
- [ ] App shell (sidebar navigation, topbar)
- [ ] `/app/profile` — Basic profile form (name, DOB, gender, language)
- [ ] `/app/profile/health` — Health data form
- [ ] `/app/profile/medical` — Conditions, medicines, surgeries, family history forms
- [ ] Onboarding flow (first-time user guided setup)

**AI Used:** None yet

---

### Phase 2 — Document System
**Goal:** Upload any document, store it, display it

**Tasks:**
- [ ] Supabase Storage bucket setup (private, per-user folder)
- [ ] `/app/documents/upload` — Drag & drop + camera capture
- [ ] File type validation (PDF, JPG, PNG, HEIC)
- [ ] File size limits (10MB per doc)
- [ ] Documents list page with filters (by type, date)
- [ ] Single document viewer (PDF viewer + image viewer)
- [ ] Document type manual selection (if user wants to override AI)
- [ ] Timeline auto-update on upload

**AI Used:** None yet (just storage)

---

### Phase 3 — AI Document Processing
**Goal:** Gemini reads every uploaded document and extracts + explains

**Gemini Prompt Strategy:**
```
System: You are a medical document assistant. Extract information from this document.
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
- Never guess or infer diagnosis
```

**Tasks:**
- [ ] `/api/process-document` — Next.js API route
- [ ] Send document to Gemini Vision API (base64 for images, PDF parts for PDFs)
- [ ] Parse JSON response, save to `document_extractions`
- [ ] Auto-populate `health_metrics` from extracted values (BP, sugar, etc.)
- [ ] Auto-populate `follow_ups` if follow_up_date found
- [ ] Auto-update `current_medicines` if new prescription processed
- [ ] Processing status UI (spinner → done)
- [ ] Error handling if AI extraction fails (show manual entry form)

**AI Used:** Gemini 2.5 Flash (Vision)

---

### Phase 4 — Report Explanation UI
**Goal:** Every document has a beautiful, clear explanation screen

**Tasks:**
- [ ] `/app/documents/[id]` full explanation page
- [ ] Risk badge (Green / Yellow / Red) with explanation
- [ ] Key findings table (Test | Your Value | Normal Range | Status)
- [ ] Status color coding per row
- [ ] Simple language explanation section
- [ ] Medicines section (if prescription)
- [ ] Follow-up reminder card
- [ ] "What to ask your doctor" section (Gemini generated)
- [ ] Language toggle (show explanation in Hindi / Assamese / English)
- [ ] Share / Export explanation as PDF button

**AI Used:** Gemini 2.5 Flash

---

### Phase 5 — Health Dashboard
**Goal:** Bird's eye view of user's current health status

**Tasks:**
- [ ] `/app/dashboard` page
- [ ] Active medicines widget (from `current_medicines`)
- [ ] Active conditions widget (from `chronic_conditions`)
- [ ] Upcoming follow-ups widget
- [ ] Recently uploaded documents
- [ ] Health metrics charts (weight trend, BP trend, sugar trend) — Recharts
- [ ] Manual metric entry (log BP, sugar, weight manually)
- [ ] Pending tests reminder
- [ ] Quick action buttons (Upload Doc, Log Metric, Start Chat)

**AI Used:** None (data display)

---

### Phase 6 — AI Health Chat
**Goal:** User can ask anything about their own health records

**System Prompt for Chat:**
```
You are Nirogi Assistant, a personal health companion.
You have access to the user's health profile and medical records.

USER PROFILE:
{name}, {age}, {blood_group}, {conditions}, {medicines}

RECENT DOCUMENTS:
{last_10_documents_summary}

Rules:
- Explain, educate, organize, compare
- Never diagnose, prescribe, or replace doctors
- If user describes emergency symptoms → advise emergency care immediately
- If asked about specific report → refer to their actual data
- Language: respond in {user_language}
- Keep responses concise and friendly
- Never make up medical information
```

**Tasks:**
- [ ] `/app/chat` — Chat UI (WhatsApp-style bubbles)
- [ ] `/api/chat` — API route with Gemini 2.5 Flash
- [ ] User context injection (profile + recent docs summary)
- [ ] Conversation history (save to `ai_conversations`)
- [ ] Document reference (user can say "explain my last MRI")
- [ ] Emergency detection → show emergency banner
- [ ] Suggested questions (chips below input)
- [ ] Language-aware responses

**AI Used:** Gemini 2.5 Flash

---

### Phase 7 — Timeline
**Goal:** Complete chronological health history in one view

**Tasks:**
- [ ] `/app/timeline` — Vertical timeline UI
- [ ] Group by year → month
- [ ] Event types with icons (📄 Document, 💊 Medicine, 🏥 Diagnosis, 📊 Metric, 🗓️ Follow-up)
- [ ] Click any event → opens detail
- [ ] Filter by event type
- [ ] Filter by date range
- [ ] Search within timeline

**AI Used:** None

---

### Phase 8 — Search
**Goal:** Find anything across all health records instantly

**Tasks:**
- [ ] `/app/search` — Search page
- [ ] Full-text search across: documents, extractions, medicines, conditions
- [ ] Supabase full-text search (tsvector)
- [ ] Search results grouped by type
- [ ] Highlight matched terms

**AI Used:** None (Supabase FTS)

---

### Phase 9 — Health Summary & Emergency Card
**Goal:** Ready-to-share documents for doctor visits and emergencies

**Health Summary:**
- [ ] `/app/summary` page
- [ ] AI-generated summary (Gemini) from all user data
- [ ] Sections: Conditions, Medicines, Allergies, Blood Group, Recent Reports, Recent Procedures
- [ ] Export as PDF
- [ ] "Copy to clipboard" for WhatsApp sharing

**Emergency Card:**
- [ ] `/app/emergency` page
- [ ] Offline accessible (PWA cache)
- [ ] Blood Group (large, prominent)
- [ ] Allergies
- [ ] Emergency Contact
- [ ] Current Medicines
- [ ] Chronic Conditions
- [ ] Share as image

**AI Used:** Gemini 2.5 Flash

---

### Phase 10 — Multilingual
**Goal:** Full Hindi + Assamese support (others later)

**Tasks:**
- [ ] next-intl setup
- [ ] Translation files: `en.json`, `hi.json`, `as.json`
- [ ] All UI strings translated
- [ ] AI responses in user's language (already handled via prompt)
- [ ] Document explanations translated (Gemini handles this)
- [ ] Language selector in settings + onboarding

**AI Used:** Gemini (for on-the-fly translation of explanations)

---

### Phase 11 — Medical Knowledge Base
**Goal:** User asks any health question, gets reliable answer

**Topics:** Diseases, Tests, Medicines, Nutrition, Vaccines, Pregnancy, Child Health, Elder Care, Mental Health, First Aid, Medical Terms

**Tasks:**
- [ ] `/app/knowledge` — Browse by category
- [ ] Search any topic
- [ ] Gemini 2.5 Flash generates answer with safety guardrails
- [ ] "Talk to a doctor for personal advice" disclaimer always shown
- [ ] No hallucination guard: model instructed to say "I don't know" if uncertain

**AI Used:** Gemini 2.5 Flash

---

### Phase 12 — Premium & Polish
**Goal:** Production-ready, monetizable

**Tasks:**
- [ ] Free tier limits (10 document uploads, 20 AI chats/day)
- [ ] Premium tier gate
- [ ] Razorpay integration (₹99/month or ₹799/year)
- [ ] PWA setup (installable, offline emergency card)
- [ ] Loading skeletons everywhere
- [ ] Error boundaries
- [ ] Toast notifications
- [ ] Mobile responsive audit
- [ ] Dark mode
- [ ] DPDP Act compliance (privacy policy, data deletion)
- [ ] Supabase backups enabled

---

## AI Safety Rules (hardcoded in all prompts)

```
NEVER:
- Claim a diagnosis (unless explicitly written in the document by a doctor)
- Prescribe medicines or suggest dose changes
- Say "you have X disease" based on symptoms
- Minimize emergency symptoms

ALWAYS:
- Add "Discuss this with your doctor" for any abnormal finding
- If user mentions chest pain, breathlessness, stroke symptoms → advise emergency immediately
- Be clear when information is general vs. from user's own records
- Admit uncertainty rather than guess
```

---

## Folder Structure

```
nirogi/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── callback/
│   ├── app/
│   │   ├── layout.tsx          ← Protected layout with sidebar
│   │   ├── dashboard/
│   │   ├── profile/
│   │   ├── documents/
│   │   │   ├── page.tsx        ← List
│   │   │   ├── upload/
│   │   │   └── [id]/
│   │   ├── timeline/
│   │   ├── chat/
│   │   ├── search/
│   │   ├── summary/
│   │   ├── emergency/
│   │   ├── knowledge/
│   │   └── settings/
│   ├── api/
│   │   ├── process-document/   ← Gemini Vision
│   │   ├── chat/               ← Gemini chat
│   │   ├── explain/            ← Gemini explanation
│   │   └── translate/          ← Gemini translation
│   └── page.tsx                ← Landing
├── components/
│   ├── ui/                     ← shadcn components
│   ├── documents/
│   ├── chat/
│   ├── timeline/
│   ├── dashboard/
│   └── shared/
├── lib/
│   ├── supabase/
│   ├── gemini.ts
│   ├── gemini.ts
│   └── utils.ts
├── types/
│   └── index.ts
└── public/
```

---

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

GEMINI_API_KEY=


NEXT_PUBLIC_APP_URL=
```

---

## Launch Checklist

- [ ] All 12 phases complete
- [ ] Mobile responsive (375px minimum)
- [ ] Offline emergency card works
- [ ] All AI routes have error fallbacks
- [ ] RLS verified on all tables
- [ ] Privacy policy page live
- [ ] DPDP Act compliance reviewed
- [ ] Razorpay test mode → live mode
- [ ] Supabase backups enabled
- [ ] Domain configured
- [ ] Analytics (Plausible / Vercel Analytics)
