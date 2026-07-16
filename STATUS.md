# Nirogi — Project Status

> Last updated: July 2026

---

## What Is Nirogi?

Nirogi (निरोगी) = Free from illness. AI-powered personal health companion that helps you understand medical reports, track health metrics, manage prescriptions, and maintain complete medical history — all in one secure app.

**Tech Stack:** Next.js 16 + TypeScript + Tailwind CSS + Supabase + Gemini 2.5 Flash

---

## Progress: ~65% Complete

---

## ✅ What's Built & Working

### Foundation (100%)
- [x] Next.js project setup (TypeScript, Tailwind, App Router)
- [x] App shell — sidebar navigation + topbar (responsive, mobile hamburger)
- [x] Color system — Medical green primary (#1A6B4A), risk colors, surfaces
- [x] TypeScript types for all 13 database tables
- [x] Utility functions (cn, formatDate, getInitials, calculateAge)
- [x] Middleware for protected routes
- [x] Supabase client helpers (browser, server, middleware) — handles missing credentials gracefully

### Auth (100%)
- [x] Login page — Google OAuth + Email/Password
- [x] Sign up / Sign in toggle
- [x] OAuth callback route (`/auth/callback`)
- [x] Warning banner when Supabase not configured
- [x] Protected route middleware (redirects to login if not authenticated)

### Database (100%)
- [x] Supabase project created (`ozfxsatcmbvaqiscankh`)
- [x] All 13 database tables created with SQL:
  - profiles, health_profiles, chronic_conditions, current_medicines
  - surgeries, family_history, documents, document_extractions
  - health_metrics, timeline_events, ai_conversations, follow_ups
- [x] RLS enabled on all tables with policies
- [x] Auto-create profile trigger on signup
- [x] `.env.local` with all credentials set

### App Pages (28 routes — 100%)
- [x] `/` — Landing page (full SEO content)
- [x] `/auth/login` — Login / Signup
- [x] `/auth/callback` — OAuth callback
- [x] `/app/dashboard` — Health dashboard
- [x] `/app/profile` — Basic info form (Supabase read/write)
- [x] `/app/profile/health` — Health data form (Supabase read/write)
- [x] `/app/profile/medical` — Medical history (dynamic add/remove, Supabase read/write)
- [x] `/app/documents` — Document list with filter chips
- [x] `/app/documents/upload` — Drag & drop upload UI
- [x] `/app/documents/[id]` — Document detail placeholder
- [x] `/app/chat` — AI health chat (WhatsApp-style, streaming, Supabase history)
- [x] `/app/timeline` — Health timeline with filter chips
- [x] `/app/search` — Full-text search page
- [x] `/app/summary` — Health summary page
- [x] `/app/emergency` — Emergency card (reads from Supabase profile)
- [x] `/app/knowledge` — Medical knowledge base
- [x] `/app/settings` — Language, notifications, account, about

### SEO Pages (100%)
- [x] `/about` — Mission, values, commitment
- [x] `/how-it-works` — 5-step guide + supported document types
- [x] `/faq` — 24 questions across 6 categories
- [x] `/privacy` — Full privacy policy (DPDP Act compliant)
- [x] `/terms` — Full terms of service with medical disclaimer

### AI Integration (90%)
- [x] `lib/gemini.ts` — Gemini 2.5 Flash helper (processDocument, chatWithAIStream)
- [x] `lib/ai/system-prompt.ts` — Full Nirogi AI role system prompt
  - Personality rules (warm, direct, non-preachy, memory-aware)
  - Doctor referral rules (when to refer / when not to)
  - Risk levels (GREEN / YELLOW / RED / EMERGENCY)
  - Medicine safety rules (allergy, interaction, duplicate checks)
  - `buildRecordsSummary()` — generates records summary from DB data
  - `getNirogiSystemPrompt()` — personalized system prompt with user data
  - `getDocumentProcessingPrompt()` — document extraction with safety checks
- [x] `/api/chat` — Full implementation with Supabase user data + streaming
- [x] `/api/process-document` — Full implementation with medicine safety system prompt

### Profile & Data (100%)
- [x] `lib/profile-store.ts` — Supabase CRUD for all profile data
- [x] Profile pages load/save from Supabase (not localStorage)
- [x] Emergency card reads from Supabase (blood group, allergies, contact, medicines, conditions)
- [x] Chat conversations saved to Supabase `ai_conversations` table

---

## 🔲 What's Remaining

### Phase 2 — Document System (MEDIUM PRIORITY)

- [ ] Connect upload page to Supabase Storage
- [ ] Create document record in DB on upload
- [ ] Document list page — fetch real data from DB
- [ ] Document detail page — fetch + display extraction
- [ ] Processing status UI (spinner → done → failed)
- [ ] Error handling for failed uploads
- [ ] Timeline auto-update on document upload

### Phase 3 — AI Processing (MEDIUM PRIORITY)

- [ ] Auto-populate `health_metrics` from extracted values
- [ ] Auto-populate `follow_ups` if follow_up_date found
- [ ] Auto-update `current_medicines` if new prescription
- [ ] Document detail page — show AI explanation (risk badge, key findings table)
- [ ] Language toggle for explanations (Hindi/Assamese)
- [ ] `/api/explain` — Generate explanation in requested language
- [ ] `/api/translate` — Translate text

### Phase 4 — Dashboard & Charts (MEDIUM PRIORITY)

- [ ] Fetch real data from DB for dashboard widgets
- [ ] Recharts integration (weight trend, BP trend, sugar trend)
- [ ] Manual metric entry form
- [ ] Active medicines widget (from `current_medicines`)
- [ ] Active conditions widget (from `chronic_conditions`)
- [ ] Upcoming follow-ups widget
- [ ] Recently uploaded documents widget
- [ ] Pending tests reminder

### Phase 5 — Multilingual (LOW PRIORITY)

- [ ] Install next-intl
- [ ] Create translation files: `en.json`, `hi.json`, `as.json`
- [ ] Wrap app with i18n provider
- [ ] Translate all UI strings
- [ ] Language selector in settings + onboarding

### Phase 6 — PWA & Offline (LOW PRIORITY)

- [ ] Install next-pwa
- [ ] Service worker for offline emergency card
- [ ] Installable prompt
- [ ] Offline caching strategy

### Phase 7 — Premium & Monetization (LOW PRIORITY)

- [ ] Free tier limits enforcement (10 docs, 20 AI chats/day)
- [ ] Premium tier gate
- [ ] Razorpay integration (₹99/month or ₹799/year)
- [ ] Subscription management UI

### Phase 8 — Polish (LOW PRIORITY)

- [ ] Loading skeletons everywhere
- [ ] Error boundaries
- [ ] Toast notifications
- [ ] Mobile responsive audit (375px minimum)
- [ ] Dark mode toggle
- [ ] DPDP Act compliance review
- [ ] Supabase backups enabled
- [ ] Analytics (Plausible / Vercel Analytics)
- [ ] Performance optimization

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx              ← Root layout (Inter font, metadata)
│   ├── page.tsx                ← Landing page (full SEO)
│   ├── globals.css             ← Nirogi color tokens
│   ├── middleware.ts            ← Auth middleware
│   ├── about/page.tsx          ← About page
│   ├── how-it-works/page.tsx   ← How it works
│   ├── faq/page.tsx            ← FAQ (24 questions)
│   ├── privacy/page.tsx        ← Privacy policy
│   ├── terms/page.tsx          ← Terms of service
│   ├── auth/
│   │   ├── login/page.tsx      ← Login/Signup
│   │   └── callback/route.ts   ← OAuth callback
│   ├── app/
│   │   ├── layout.tsx          ← App shell (sidebar + topbar)
│   │   ├── dashboard/page.tsx
│   │   ├── profile/
│   │   │   ├── layout.tsx      ← Profile tabs
│   │   │   ├── page.tsx        ← Basic info (Supabase)
│   │   │   ├── health/page.tsx ← Health data (Supabase)
│   │   │   └── medical/page.tsx← Medical history (Supabase)
│   │   ├── documents/
│   │   │   ├── page.tsx        ← Document list
│   │   │   ├── upload/page.tsx ← Drag & drop upload
│   │   │   └── [id]/page.tsx   ← Document detail
│   │   ├── chat/page.tsx       ← AI Health Chat (Supabase history)
│   │   ├── timeline/page.tsx
│   │   ├── search/page.tsx
│   │   ├── summary/page.tsx
│   │   ├── emergency/page.tsx  ← Emergency card (Supabase data)
│   │   ├── knowledge/page.tsx
│   │   └── settings/page.tsx
│   └── api/
│       ├── process-document/route.ts ← Gemini Vision + medicine safety
│       ├── chat/route.ts             ← Gemini chat + user context
│       ├── explain/route.ts
│       └── translate/route.ts
├── lib/
│   ├── utils.ts                ← cn, formatDate, etc.
│   ├── gemini.ts               ← Gemini AI (processDocument, chatWithAIStream)
│   ├── profile-store.ts        ← Supabase CRUD for profile data
│   ├── ai/
│   │   └── system-prompt.ts    ← Nirogi AI role + system prompts
│   └── supabase/
│       ├── client.ts           ← Browser client
│       ├── server.ts           ← Server client
│       └── middleware.ts       ← Session refresh
├── types/
│   └── index.ts                ← All 13 table types
└── supabase/
    └── schema.sql              ← Full database schema (13 tables + RLS)
```

---

## Environment Variables (.env.local)

```env
NEXT_PUBLIC_SUPABASE_URL=https://ozfxsatcmbvaqiscankh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=***SET***
SUPABASE_SERVICE_ROLE_KEY=***SET***
GEMINI_API_KEY=***SET***
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Key Decisions Made

1. **No route groups** — `/app/app/` instead of `/(app)/` for proper URL paths
2. **Graceful degradation** — App works without credentials (UI renders, auth/AI show warnings)
3. **Inter font** — Using `next/font/google` Inter instead of Geist (network issue with Geist)
4. **Gemini 2.5 Flash** — Single AI model for all tasks (Vision + Chat + Multilingual)
5. **Indian pricing** — ₹99/month or ₹799/year (Razorpay)
6. **DPDP Act compliant** — Privacy policy and terms written for Indian data protection law
7. **Supabase for all data** — Profile, medical history, chat conversations all in Supabase (not localStorage)
8. **Nirogi AI Role** — Full system prompt with personality, doctor referral rules, medicine safety checks

---

## Recent Commits

- `87ded3c` — feat: Nirogi AI role system prompt + Supabase chat history
- `5beeebb` — feat: profile data now saves to Supabase (not localStorage)
- `7d317cd` — feat: profile data persistence + emergency card reads from profile
- `c4c050d` — feat: persist chat history in localStorage (now Supabase)
- `eccd8a9` — feat: AI chat with Gemini streaming + Supabase schema
- `951caa1` — fix: auth flow, error handling, cross-origin dev warning
- `ab87e29` — feat: Nirogi v0.1 — AI health companion with 28 routes
