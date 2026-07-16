# Nirogi — Project Status

> Last updated: July 2026

---

## What Is Nirogi?

Nirogi (निरोगी) = Free from illness. AI-powered personal health companion that helps you understand medical reports, track health metrics, manage prescriptions, and maintain complete medical history — all in one secure app.

**Tech Stack:** Next.js 16 + TypeScript + Tailwind CSS + Supabase + Gemini 2.5 Flash

---

## ✅ What's Built

### Foundation
- [x] Next.js project setup (TypeScript, Tailwind, App Router)
- [x] App shell — sidebar navigation + topbar (responsive, mobile hamburger)
- [x] Color system — Medical green primary (#1A6B4A), risk colors, surfaces
- [x] TypeScript types for all 13 database tables
- [x] Utility functions (cn, formatDate, getInitials, calculateAge)
- [x] Middleware for protected routes
- [x] Supabase client helpers (browser, server, middleware) — handles missing credentials gracefully

### Auth
- [x] Login page — Google OAuth + Email/Password
- [x] Sign up / Sign in toggle
- [x] OAuth callback route (`/auth/callback`)
- [x] Warning banner when Supabase not configured
- [x] Protected route middleware (redirects to login if not authenticated)

### App Pages (28 routes total)
- [x] `/` — Landing page (full SEO content: hero, problem, features, how it works, use cases, trust, languages, pricing, FAQ, CTA)
- [x] `/auth/login` — Login / Signup
- [x] `/auth/callback` — OAuth callback
- [x] `/app/dashboard` — Health dashboard (widgets, quick actions)
- [x] `/app/profile` — Basic info form (name, DOB, gender, language)
- [x] `/app/profile/health` — Health data form (height, weight, blood group, allergies, emergency contact)
- [x] `/app/profile/medical` — Medical history (conditions, medicines, surgeries, family history — dynamic add/remove)
- [x] `/app/documents` — Document list with filter chips
- [x] `/app/documents/upload` — Drag & drop + file validation (PDF, JPG, PNG, HEIC, 10MB limit)
- [x] `/app/documents/[id]` — Document detail placeholder
- [x] `/app/chat` — AI health chat UI (WhatsApp-style bubbles, suggestion chips)
- [x] `/app/timeline` — Health timeline with filter chips
- [x] `/app/search` — Full-text search page
- [x] `/app/summary` — Health summary page
- [x] `/app/emergency` — Emergency card (blood group, allergies, contacts, medicines)
- [x] `/app/knowledge` — Medical knowledge base with categories
- [x] `/app/settings` — Language, notifications, account, about

### SEO Pages
- [x] `/about` — Mission, values, commitment
- [x] `/how-it-works` — 5-step guide + supported document types
- [x] `/faq` — 24 questions across 6 categories
- [x] `/privacy` — Full privacy policy (DPDP Act compliant)
- [x] `/terms` — Full terms of service with medical disclaimer

### API Routes
- [x] `/api/process-document` — Skeleton (returns "not configured" without Gemini key)
- [x] `/api/chat` — Skeleton (returns helpful message without Gemini key)
- [x] `/api/explain` — Skeleton
- [x] `/api/translate` — Skeleton

### AI Integration
- [x] `lib/gemini.ts` — Gemini 2.5 Flash helper (processDocument, chatWithAI functions)

---

## 🔲 What's Remaining

### Phase 1 — Database & Auth (HIGH PRIORITY)

- [ ] Create Supabase project (free tier)
- [ ] Create all 13 database tables with SQL:
  - profiles, health_profiles, chronic_conditions, current_medicines
  - surgeries, family_history, documents, document_extractions
  - health_metrics, timeline_events, ai_conversations, follow_ups
- [ ] Enable RLS on all tables with policies
- [ ] Create Supabase Storage bucket (private, per-user folder)
- [ ] Add real Supabase credentials to `.env.local`
- [ ] Test login/signup flow end-to-end
- [ ] Profile form → Supabase read/write
- [ ] Onboarding flow (first-time user guided setup)

### Phase 2 — Document System (MEDIUM PRIORITY)

- [ ] Connect upload page to Supabase Storage
- [ ] Create document record in DB on upload
- [ ] Document list page — fetch real data from DB
- [ ] Document detail page — fetch + display
- [ ] Processing status UI (spinner → done → failed)
- [ ] Error handling for failed uploads
- [ ] Timeline auto-update on document upload

### Phase 3 — AI Processing (MEDIUM PRIORITY)

- [ ] Add Gemini API key to `.env.local`
- [ ] `/api/process-document` — Send document to Gemini Vision, parse JSON response
- [ ] Save extraction to `document_extractions` table
- [ ] Auto-populate `health_metrics` from extracted values
- [ ] Auto-populate `follow_ups` if follow_up_date found
- [ ] Auto-update `current_medicines` if new prescription
- [ ] Document detail page — show AI explanation (risk badge, key findings table, simple language)
- [ ] Language toggle for explanations (Hindi/Assamese)
- [ ] `/api/chat` — Full implementation with user context injection
- [ ] Conversation history (save to `ai_conversations`)
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
- [ ] AI responses in user's language (prompt already handles this)

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
│   │   │   ├── page.tsx        ← Basic info
│   │   │   ├── health/page.tsx
│   │   │   └── medical/page.tsx
│   │   ├── documents/
│   │   │   ├── page.tsx        ← Document list
│   │   │   ├── upload/page.tsx ← Drag & drop upload
│   │   │   └── [id]/page.tsx   ← Document detail
│   │   ├── chat/page.tsx       ← AI Health Chat
│   │   ├── timeline/page.tsx
│   │   ├── search/page.tsx
│   │   ├── summary/page.tsx
│   │   ├── emergency/page.tsx  ← Emergency card
│   │   ├── knowledge/page.tsx
│   │   └── settings/page.tsx
│   └── api/
│       ├── process-document/route.ts
│       ├── chat/route.ts
│       ├── explain/route.ts
│       └── translate/route.ts
├── lib/
│   ├── utils.ts                ← cn, formatDate, etc.
│   ├── gemini.ts               ← Gemini AI helper
│   └── supabase/
│       ├── client.ts           ← Browser client
│       ├── server.ts           ← Server client
│       └── middleware.ts       ← Session refresh
└── types/
    └── index.ts                ← All 13 table types
```

---

## Environment Variables (.env.local)

```env
NEXT_PUBLIC_SUPABASE_URL=          # Set after Supabase project creation
NEXT_PUBLIC_SUPABASE_ANON_KEY=     # Set after Supabase project creation
SUPABASE_SERVICE_ROLE_KEY=         # Set after Supabase project creation
GEMINI_API_KEY=                    # Set after Gemini API setup
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
