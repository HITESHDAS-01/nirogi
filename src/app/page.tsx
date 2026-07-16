import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nirogi — Personal AI Health Companion | Understand Your Health",
  description:
    "Nirogi is an AI-powered personal health companion that helps you understand medical reports, track health metrics, manage prescriptions, and maintain your complete medical history — all in one secure app. Available in English, Hindi, and Assamese.",
  keywords: [
    "health companion",
    "AI health app",
    "medical report explanation",
    "health tracker India",
    "personal health records",
    "medical document organizer",
    "AI health assistant",
    "health records app India",
    "medical report translator",
    "Hindi health app",
    "Assamese health app",
    "prescription tracker",
    "health dashboard",
    "emergency health card",
    "medical history app",
  ],
  openGraph: {
    title: "Nirogi — Personal AI Health Companion",
    description:
      "Understand Your Health, Not Just Store It. AI-powered medical report explanation, health tracking, and complete medical history management.",
    type: "website",
    locale: "en_IN",
    siteName: "Nirogi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nirogi — Personal AI Health Companion",
    description:
      "Understand Your Health, Not Just Store It. AI-powered medical report explanation and health tracking.",
  },
  alternates: {
    canonical: "https://nirogi.in",
  },
};

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center px-6 py-20 md:py-32 text-center bg-gradient-to-b from-secondary to-white">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            AI-Powered Health Companion
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-text max-w-4xl leading-tight">
            Understand Your Health,
            <br />
            <span className="text-primary">Not Just Store It</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-text-muted max-w-2xl leading-relaxed">
            Upload medical reports and get instant AI-powered explanations in
            plain language. Track health trends, manage prescriptions, and carry
            your complete medical history — all in one secure app.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/auth/login"
              className="px-8 py-4 rounded-xl bg-primary text-white font-semibold text-lg hover:bg-primary-light transition-colors shadow-lg shadow-primary/20"
            >
              Start Free — No Credit Card
            </Link>
            <Link
              href="/how-it-works"
              className="px-8 py-4 rounded-xl border-2 border-primary text-primary font-semibold text-lg hover:bg-secondary transition-colors"
            >
              See How It Works
            </Link>
          </div>
          <p className="mt-4 text-sm text-text-muted">
            Free for up to 10 documents. No signup required to explore.
          </p>
        </section>

        {/* Problem Statement */}
        <section className="px-6 py-20 bg-white">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-6">
              Medical Reports Shouldn&apos;t Be a Mystery
            </h2>
            <p className="text-lg text-text-muted max-w-3xl mx-auto mb-12">
              Most people receive their medical reports and struggle to
              understand the medical jargon, normal ranges, and what each value
              means. Important health information gets lost in translation.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <ProblemCard
                icon="😰"
                title="Confusing Medical Jargon"
                description="Lab reports are filled with technical terms that are impossible for the average person to understand without a medical background."
              />
              <ProblemCard
                icon="🗂️"
                title="Scattered Records"
                description="Medical documents spread across email, phone photos, hospital folders, and WhatsApp — impossible to find when you need them."
              />
              <ProblemCard
                icon="🔄"
                title="Repeating Your History"
                description="Every new doctor visit means explaining your entire medical history from scratch because you don't have it organized."
              />
            </div>
          </div>
        </section>

        {/* Solution / Features */}
        <section id="features" className="px-6 py-20 bg-surface-alt">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
                Everything You Need to Take Control
              </h2>
              <p className="text-lg text-text-muted max-w-2xl mx-auto">
                Nirogi combines AI intelligence with simple design to make health
                management effortless.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon="📄"
                title="Smart Document Processing"
                description="Upload prescriptions, lab reports, X-rays, or any medical document. AI extracts key information and explains it in plain language you can understand."
              />
              <FeatureCard
                icon="💬"
                title="AI Health Chat"
                description="Ask questions about your health records in English, Hindi, or Assamese. Get personalized answers based on your actual medical data."
              />
              <FeatureCard
                icon="📊"
                title="Health Dashboard"
                description="Track weight, blood pressure, sugar levels, and more. Visualize trends over time with beautiful charts and get alerts for abnormal values."
              />
              <FeatureCard
                icon="🗓️"
                title="Health Timeline"
                description="See your complete medical history in one chronological view. Never forget a follow-up, medication change, or important diagnosis."
              />
              <FeatureCard
                icon="🌐"
                title="Multilingual Support"
                description="Get explanations in English, Hindi, or Assamese. Your health information in the language you understand best — because health shouldn't have a language barrier."
              />
              <FeatureCard
                icon="🚨"
                title="Emergency Card"
                description="Offline-accessible emergency card with blood group, allergies, emergency contacts, and current medicines. Works even without internet."
              />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="px-6 py-20 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text text-center mb-16">
              How Nirogi Works
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <StepCard
                step="1"
                title="Upload"
                description="Take a photo or upload a PDF of any medical document — prescription, lab report, X-ray, discharge summary."
              />
              <StepCard
                step="2"
                title="AI Processes"
                description="Our AI reads and extracts key information: tests, values, medicines, diagnoses, and follow-up dates."
              />
              <StepCard
                step="3"
                title="Understand"
                description="Get a clear, jargon-free explanation in your language. See which values are normal, borderline, or need attention."
              />
              <StepCard
                step="4"
                title="Track & Share"
                description="Your health data is organized in a timeline and dashboard. Share summaries with doctors or family."
              />
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="px-6 py-20 bg-surface-alt">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text text-center mb-16">
              Built for Every Indian Family
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <UseCaseCard
                icon="👨‍👩‍👧‍👦"
                title="Family Health Manager"
                description="Manage health records for your entire family. Keep track of medications for elderly parents, children's vaccination schedules, and everyone's medical history in one place."
              />
              <UseCaseCard
                icon="🧓"
                title="Elderly Care"
                description="Help elderly family members who struggle with English medical reports. Get explanations in Hindi or Assamese. Never miss a medication or follow-up."
              />
              <UseCaseCard
                icon="🏥"
                title="Doctor Visits"
                description="Walk into any doctor's appointment with a complete, organized medical history. Share your health summary instead of trying to remember everything."
              />
              <UseCaseCard
                icon="✈️"
                title="Travel & Emergencies"
                description="Carry your emergency card with blood group, allergies, and contacts — accessible offline. Essential for travel and medical emergencies."
              />
            </div>
          </div>
        </section>

        {/* Trust & Security */}
        <section className="px-6 py-20 bg-white">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-6">
              Your Health Data is Safe With Us
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto mb-12">
              We take privacy seriously. Your medical data is encrypted, secure,
              and never shared without your explicit consent.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <TrustCard
                icon="🔒"
                title="End-to-End Encryption"
                description="All your medical documents and health data are encrypted at rest and in transit. Only you can access them."
              />
              <TrustCard
                icon="🛡️"
                title="HIPAA-Aligned Practices"
                description="We follow industry-standard security practices for handling sensitive health information."
              />
              <TrustCard
                icon="🚫"
                title="No Data Selling"
                description="We never sell, share, or monetize your personal health data. Your data is yours, period."
              />
            </div>
          </div>
        </section>

        {/* Languages */}
        <section className="px-6 py-20 bg-primary text-white">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Health in Your Language
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-12">
              Medical reports are hard enough to understand. Don&apos;t add a
              language barrier. Nirogi provides explanations in the language you
              are most comfortable with.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <LanguageTag label="English" native="English" />
              <LanguageTag label="Hindi" native="हिन्दी" />
              <LanguageTag label="Assamese" native="অসমীয়া" />
              <LanguageTag label="Bengali" native="বাংলা" />
              <LanguageTag label="Tamil" native="தமிழ்" />
              <LanguageTag label="Telugu" native="తెలుగు" />
              <LanguageTag label="Marathi" native="मराठी" />
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="px-6 py-20 bg-surface-alt">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-text-muted mb-12">
              Start free. Upgrade when you need more.
            </p>
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl border border-border p-8 text-left">
                <h3 className="text-xl font-bold text-text mb-2">Free</h3>
                <p className="text-3xl font-bold text-primary mb-4">
                  ₹0<span className="text-base font-normal text-text-muted">/month</span>
                </p>
                <ul className="space-y-3 text-sm text-text">
                  <li className="flex items-center gap-2">
                    <span className="text-risk-green">✓</span> 10 document uploads
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-risk-green">✓</span> 20 AI chats per day
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-risk-green">✓</span> Health dashboard
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-risk-green">✓</span> Emergency card
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-risk-green">✓</span> Multilingual support
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl border-2 border-primary p-8 text-left relative">
                <span className="absolute -top-3 right-6 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                  POPULAR
                </span>
                <h3 className="text-xl font-bold text-text mb-2">Premium</h3>
                <p className="text-3xl font-bold text-primary mb-4">
                  ₹99<span className="text-base font-normal text-text-muted">/month</span>
                </p>
                <ul className="space-y-3 text-sm text-text">
                  <li className="flex items-center gap-2">
                    <span className="text-risk-green">✓</span> Unlimited document uploads
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-risk-green">✓</span> Unlimited AI chats
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-risk-green">✓</span> Priority AI processing
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-risk-green">✓</span> Health summary exports
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-risk-green">✓</span> Family account (up to 5)
                  </li>
                </ul>
                <p className="text-sm text-text-muted mt-4">
                  ₹799/year — save 33%
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-6 py-20 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <FaqItem
                question="Is Nirogi a replacement for a doctor?"
                answer="No. Nirogi is a health management tool that helps you understand and organize your medical information. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for medical decisions."
              />
              <FaqItem
                question="Is my medical data safe?"
                answer="Yes. All your data is encrypted at rest and in transit. We use Supabase (PostgreSQL) with Row Level Security, meaning only you can access your data. We never sell or share your personal health information."
              />
              <FaqItem
                question="Which languages are supported?"
                answer="Nirogi currently supports English, Hindi, and Assamese for AI explanations. The app interface is available in English, with Bengali, Tamil, Telugu, and Marathi coming soon."
              />
              <FaqItem
                question="What types of documents can I upload?"
                answer="You can upload prescriptions, blood test reports, urine reports, X-rays, MRI scans, CT scans, ECG reports, ultrasound reports, discharge summaries, vaccination records, and insurance documents. Supported formats: PDF, JPG, PNG, HEIC."
              />
              <FaqItem
                question="How does the AI explain my reports?"
                answer="When you upload a document, our AI (powered by Google Gemini) reads the document, extracts key values and findings, compares them against normal ranges, and generates a plain-language explanation in your preferred language."
              />
              <FaqItem
                question="Can I use Nirogi for my family?"
                answer="Yes! You can manage health records for your entire family. Premium users can add up to 5 family members. The emergency card feature is especially useful for elderly parents and young children."
              />
              <FaqItem
                question="Does the emergency card work offline?"
                answer="Yes. Once you set up your emergency card, it is cached for offline access. Your blood group, allergies, emergency contacts, and current medications will be available even without internet."
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-20 bg-primary text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
            Join thousands who are already using Nirogi to understand and manage
            their health better.
          </p>
          <Link
            href="/auth/login"
            className="px-8 py-4 rounded-xl bg-white text-primary font-semibold text-lg hover:bg-secondary transition-colors inline-block shadow-lg"
          >
            Get Started — It&apos;s Free
          </Link>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}

function LandingHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-white sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm">
          N
        </div>
        <span className="text-xl font-bold text-text">Nirogi</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-text-muted">
        <a href="#features" className="hover:text-text transition-colors">
          Features
        </a>
        <Link href="/how-it-works" className="hover:text-text transition-colors">
          How It Works
        </Link>
        <Link href="/about" className="hover:text-text transition-colors">
          About
        </Link>
        <Link href="/faq" className="hover:text-text transition-colors">
          FAQ
        </Link>
      </nav>
      <div className="flex items-center gap-3">
        <Link
          href="/auth/login"
          className="px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary-light transition-colors text-sm"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
}

function LandingFooter() {
  return (
    <footer className="bg-text text-white px-6 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm">
              N
            </div>
            <span className="text-lg font-bold">Nirogi</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Understand Your Health, Not Just Store It. AI-powered personal health
            companion for every Indian family.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Product</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link href="/#features" className="hover:text-white transition-colors">
                Features
              </Link>
            </li>
            <li>
              <Link href="/how-it-works" className="hover:text-white transition-colors">
                How It Works
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-white transition-colors">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="mailto:support@nirogi.in" className="hover:text-white transition-colors">
                support@nirogi.in
              </a>
            </li>
            <li>
              <Link href="/faq" className="hover:text-white transition-colors">
                Help Center
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-gray-700 text-center text-sm text-gray-500">
        <p>
          © 2026 Nirogi. All rights reserved. Made with care in India.
        </p>
        <p className="mt-2">
          Nirogi is not a substitute for professional medical advice.
        </p>
      </div>
    </footer>
  );
}

function ProblemCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-xl bg-surface-alt border border-border">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
      <p className="text-text-muted text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-xl border border-border bg-white hover:shadow-lg transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
      <p className="text-text-muted text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function StepCard({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
        {step}
      </div>
      <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
      <p className="text-text-muted text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function UseCaseCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 p-6 rounded-xl bg-white border border-border">
      <div className="text-4xl">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
        <p className="text-text-muted text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function TrustCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-xl border border-border">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
      <p className="text-text-muted text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function LanguageTag({ label, native }: { label: string; native: string }) {
  return (
    <div className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur">
      <p className="font-semibold">{label}</p>
      <p className="text-sm opacity-80">{native}</p>
    </div>
  );
}

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <div className="p-6 rounded-xl border border-border bg-surface-alt">
      <h3 className="font-semibold text-text mb-2">{question}</h3>
      <p className="text-text-muted text-sm leading-relaxed">{answer}</p>
    </div>
  );
}
