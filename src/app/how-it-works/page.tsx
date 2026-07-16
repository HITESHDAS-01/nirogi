import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How Nirogi Works — AI Health Document Processing Explained",
  description:
    "Learn how Nirogi uses AI to read, extract, and explain your medical documents in plain language. Step-by-step guide to using your personal health companion.",
  openGraph: {
    title: "How Nirogi Works",
    description:
      "Step-by-step guide to AI-powered health document processing.",
    type: "website",
  },
};

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />

      <main className="flex-1">
        <section className="px-6 py-20 bg-gradient-to-b from-secondary to-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-text max-w-3xl mx-auto leading-tight">
            How Nirogi Works
          </h1>
          <p className="mt-6 text-lg text-text-muted max-w-2xl mx-auto">
            From upload to understanding in seconds. Here&apos;s how Nirogi
            transforms your medical documents into clear, actionable
            information.
          </p>
        </section>

        {/* Detailed Steps */}
        <section className="px-6 py-20 bg-white">
          <div className="max-w-4xl mx-auto space-y-16">
            <DetailedStep
              number="1"
              title="Upload Your Document"
              description="Start by taking a photo of your medical document or uploading a PDF. Nirogi accepts prescriptions, lab reports, X-rays, MRI scans, ECG reports, discharge summaries, and more."
              details={[
                "Supported formats: PDF, JPG, PNG, HEIC",
                "Maximum file size: 10MB per document",
                "Camera capture for instant uploads",
                "Drag and drop for desktop users",
              ]}
              tip="Tip: Make sure the document is well-lit and all text is clearly visible for the best AI extraction."
            />
            <DetailedStep
              number="2"
              title="AI Reads and Extracts"
              description="Our AI, powered by Google Gemini 2.5 Flash, reads your document using advanced vision and language understanding. It extracts key medical information automatically."
              details={[
                "Identifies document type (blood report, prescription, etc.)",
                "Extracts test names, values, and normal ranges",
                "Identifies medicines, dosages, and frequencies",
                "Detects diagnoses (only when explicitly written by doctor)",
                "Finds follow-up dates and important notes",
              ]}
              tip="The AI never guesses or infers diagnoses. It only reports what is explicitly written in the document."
            />
            <DetailedStep
              number="3"
              title="Get Plain-Language Explanation"
              description="Nirogi translates the medical data into simple, easy-to-understand language. You get a risk assessment (green/yellow/red), a key findings table, and a clear explanation."
              details={[
                "Risk level: Green (all normal), Yellow (some borderline), Red (abnormal/urgent)",
                "Key findings table with Your Value vs Normal Range",
                "Status color coding for each test result",
                "Simple language explanation — no medical jargon",
                "Available in English, Hindi, and Assamese",
              ]}
              tip="If any value is abnormal, Nirogi will always add 'Discuss this with your doctor' — because AI should never replace professional advice."
            />
            <DetailedStep
              number="4"
              title="Track and Monitor"
              description="All your health data is organized in a dashboard and timeline. Track trends over time, get alerts for follow-ups, and see your complete health history at a glance."
              details={[
                "Health metrics charts (weight, BP, sugar trends)",
                "Automatic timeline updates on each upload",
                "Follow-up reminders",
                "Medication tracking",
                "Manual metric entry for daily tracking",
              ]}
              tip="The more documents you upload, the more useful your dashboard becomes. Trends and patterns become visible over time."
            />
            <DetailedStep
              number="5"
              title="Ask and Learn"
              description="Use the AI Health Chat to ask questions about your records. Get answers based on your actual data, not generic health information."
              details={[
                "Ask in English, Hindi, or Assamese",
                "Reference specific documents ('Explain my last MRI')",
                "Get personalized health insights",
                "Emergency symptom detection with immediate advice",
              ]}
              tip="Try asking: 'What were my cholesterol levels in my last blood test?' or 'Summarize my recent documents.'"
            />
          </div>
        </section>

        {/* Supported Documents */}
        <section className="px-6 py-20 bg-surface-alt">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-text text-center mb-12">
              Supported Document Types
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: "💊", name: "Prescriptions", desc: "Medicines, dosages, doctor instructions" },
                { icon: "🩸", name: "Blood Reports", desc: "CBC, lipid profile, thyroid, diabetes" },
                { icon: "🧪", name: "Urine Reports", desc: "Routine urine analysis, culture" },
                { icon: "🦴", name: "X-Rays", desc: "Bone fractures, chest X-rays, dental" },
                { icon: "🧠", name: "MRI Scans", desc: "Brain, spine, joint MRI reports" },
                { icon: "🏥", name: "CT Scans", desc: "All CT scan reports and findings" },
                { icon: "❤️", name: "ECG Reports", desc: "Electrocardiogram readings" },
                { icon: "🤰", name: "Ultrasound", desc: "Abdominal, pelvic, pregnancy scans" },
                { icon: "📋", name: "Discharge Summary", desc: "Hospital discharge documents" },
                { icon: "💉", name: "Vaccination", desc: "Immunization records" },
                { icon: "🛡️", name: "Insurance", desc: "Health insurance documents" },
                { icon: "🧾", name: "Medical Bills", desc: "Hospital and pharmacy bills" },
              ].map((doc) => (
                <div
                  key={doc.name}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white border border-border"
                >
                  <span className="text-2xl">{doc.icon}</span>
                  <div>
                    <p className="font-semibold text-text text-sm">{doc.name}</p>
                    <p className="text-text-muted text-xs">{doc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-20 bg-primary text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Try It?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
            Upload your first document and see how Nirogi can help you
            understand your health better.
          </p>
          <Link
            href="/auth/login"
            className="px-8 py-4 rounded-xl bg-white text-primary font-semibold text-lg hover:bg-secondary transition-colors inline-block"
          >
            Get Started Free
          </Link>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}

function DetailedStep({
  number,
  title,
  description,
  details,
  tip,
}: {
  number: string;
  title: string;
  description: string;
  details: string[];
  tip: string;
}) {
  return (
    <div className="flex gap-6">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
          {number}
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-text mb-3">{title}</h3>
        <p className="text-text-muted leading-relaxed mb-4">{description}</p>
        <ul className="space-y-2 mb-4">
          {details.map((detail, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-text">
              <span className="text-risk-green mt-0.5">✓</span>
              {detail}
            </li>
          ))}
        </ul>
        <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
          <p className="text-sm text-primary font-medium">{tip}</p>
        </div>
      </div>
    </div>
  );
}

function LandingHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-white sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm">N</div>
        <span className="text-xl font-bold text-text">Nirogi</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-text-muted">
        <a href="/#features" className="hover:text-text transition-colors">Features</a>
        <Link href="/how-it-works" className="hover:text-text transition-colors">How It Works</Link>
        <Link href="/about" className="hover:text-text transition-colors">About</Link>
        <Link href="/faq" className="hover:text-text transition-colors">FAQ</Link>
      </nav>
      <Link href="/auth/login" className="px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary-light transition-colors text-sm">
        Get Started
      </Link>
    </header>
  );
}

function LandingFooter() {
  return (
    <footer className="bg-text text-white px-6 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm">N</div>
            <span className="text-lg font-bold">Nirogi</span>
          </div>
          <p className="text-sm text-gray-400">Understand Your Health, Not Just Store It.</p>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Product</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/#features" className="hover:text-white">Features</Link></li>
            <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
            <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="mailto:support@nirogi.in" className="hover:text-white">support@nirogi.in</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-gray-700 text-center text-sm text-gray-500">
        <p>© 2026 Nirogi. All rights reserved.</p>
      </div>
    </footer>
  );
}
