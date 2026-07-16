import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions About Nirogi",
  description:
    "Find answers to common questions about Nirogi: how the AI works, data privacy, supported documents, languages, pricing, and more.",
  openGraph: {
    title: "FAQ — Nirogi",
    description:
      "Common questions about Nirogi health companion answered.",
    type: "website",
  },
};

const faqs = [
  {
    category: "General",
    items: [
      {
        q: "What is Nirogi?",
        a: "Nirogi is a personal AI health companion that helps you understand, organize, and track your medical information. It uses AI to read medical documents, explain them in plain language, and keep your complete health history organized.",
      },
      {
        q: "Is Nirogi a replacement for a doctor?",
        a: "Absolutely not. Nirogi is a health management tool that helps you understand and organize your medical information. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for medical decisions.",
      },
      {
        q: "Who is Nirogi for?",
        a: "Nirogi is for anyone who wants to better understand and manage their health information. It is especially useful for: people who receive medical reports they don't fully understand, families managing health records for multiple members, elderly individuals who need help with medication tracking, and anyone who wants their complete health history organized in one place.",
      },
      {
        q: "Is Nirogi free?",
        a: "Yes, Nirogi offers a free tier that includes 10 document uploads, 20 AI chats per day, a health dashboard, emergency card, and multilingual support. Premium (₹99/month or ₹799/year) adds unlimited uploads, unlimited chats, priority processing, and family accounts.",
      },
    ],
  },
  {
    category: "AI & Accuracy",
    items: [
      {
        q: "How does the AI explain my reports?",
        a: "When you upload a document, our AI (powered by Google Gemini 2.5 Flash) reads the document using advanced vision and language understanding. It extracts key medical information, compares values against normal ranges, and generates a plain-language explanation in your preferred language.",
      },
      {
        q: "Is the AI accurate?",
        a: "Our AI is trained to be careful and conservative. It extracts information that is explicitly present in the document and does not guess or infer diagnoses. When it is uncertain, it says so. However, AI is not perfect — always verify important health information with your doctor.",
      },
      {
        q: "Does the AI diagnose diseases?",
        a: "No. The AI never diagnoses diseases based on symptoms or test values. It only reports diagnoses that are explicitly written by a doctor in the document. If a test value is abnormal, it flags it and recommends discussing with your doctor.",
      },
      {
        q: "What happens if the AI makes a mistake?",
        a: "While our AI is highly accurate, errors are possible. That is why we always recommend discussing findings with your doctor. If you notice an error in the AI extraction, you can report it and we continuously improve the system.",
      },
    ],
  },
  {
    category: "Documents & Upload",
    items: [
      {
        q: "What types of documents can I upload?",
        a: "You can upload prescriptions, blood test reports, urine reports, X-rays, MRI scans, CT scans, ECG reports, ultrasound reports, discharge summaries, vaccination records, insurance documents, and medical bills. Supported formats are PDF, JPG, PNG, and HEIC.",
      },
      {
        q: "Is there a file size limit?",
        a: "Yes, each document can be up to 10MB. For larger files, try compressing the image or splitting the PDF into smaller sections.",
      },
      {
        q: "Can I upload handwritten documents?",
        a: "The AI works best with printed text and digital documents. Handwritten documents may have lower accuracy depending on legibility.",
      },
      {
        q: "Can I delete a document after uploading?",
        a: "Yes, you have full control over your documents. You can delete any document at any time, and it will be permanently removed from our servers.",
      },
    ],
  },
  {
    category: "Privacy & Security",
    items: [
      {
        q: "Is my data safe?",
        a: "Yes. All your data is encrypted at rest and in transit using industry-standard encryption. We use Supabase (PostgreSQL) with Row Level Security, meaning only you can access your data. We never sell, share, or monetize your personal health information.",
      },
      {
        q: "Where is my data stored?",
        a: "Your data is stored on secure cloud servers with encryption. We use Supabase for database and storage, which provides enterprise-grade security and compliance.",
      },
      {
        q: "Can I download or delete all my data?",
        a: "Yes. You can export all your health data at any time. You can also request complete deletion of your account and all associated data, in compliance with DPDP Act requirements.",
      },
      {
        q: "Do you share my data with third parties?",
        a: "No. We never share your personal health data with third parties. The only external service we use is Google Gemini for AI processing, and documents are processed ephemerally — they are not stored by Google.",
      },
    ],
  },
  {
    category: "Languages & Accessibility",
    items: [
      {
        q: "Which languages are supported?",
        a: "Nirogi currently supports English, Hindi, and Assamese for AI-generated explanations. The app interface is in English. Bengali, Tamil, Telugu, and Marathi support is coming soon.",
      },
      {
        q: "Can I switch languages?",
        a: "Yes, you can change your preferred language at any time in Settings. All future AI explanations will be generated in your selected language.",
      },
      {
        q: "Does the emergency card work offline?",
        a: "Yes. Once you set up your emergency card, it is cached for offline access. Your blood group, allergies, emergency contacts, and current medications will be available even without internet connection.",
      },
    ],
  },
  {
    category: "Account & Pricing",
    items: [
      {
        q: "How do I create an account?",
        a: "You can sign up using your email address or Google account. No credit card required for the free tier.",
      },
      {
        q: "Can I use Nirogi for my family?",
        a: "Yes! Free users can manage their own records. Premium users can add up to 5 family members, making it easy to manage health records for parents, children, and other family members.",
      },
      {
        q: "How do I upgrade to Premium?",
        a: "Go to Settings and select the Premium plan. We accept payments via Razorpay (UPI, credit/debit cards, net banking). Annual plan (₹799) saves you 33% compared to monthly (₹99/month).",
      },
      {
        q: "Can I cancel my subscription?",
        a: "Yes, you can cancel your Premium subscription at any time from Settings. Your Premium features will remain active until the end of your current billing period.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />

      <main className="flex-1">
        <section className="px-6 py-20 bg-gradient-to-b from-secondary to-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-text max-w-3xl mx-auto">
            Frequently Asked Questions
          </h1>
          <p className="mt-6 text-lg text-text-muted max-w-2xl mx-auto">
            Everything you need to know about Nirogi. Can&apos;t find an
            answer? Email us at{" "}
            <a
              href="mailto:support@nirogi.in"
              className="text-primary font-medium hover:underline"
            >
              support@nirogi.in
            </a>
          </p>
        </section>

        <section className="px-6 py-16 bg-white">
          <div className="max-w-3xl mx-auto space-y-12">
            {faqs.map((group) => (
              <div key={group.category}>
                <h2 className="text-2xl font-bold text-text mb-6">
                  {group.category}
                </h2>
                <div className="space-y-4">
                  {group.items.map((faq, i) => (
                    <div
                      key={i}
                      className="p-6 rounded-xl border border-border bg-surface-alt"
                    >
                      <h3 className="font-semibold text-text mb-2">{faq.q}</h3>
                      <p className="text-text-muted text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 py-16 bg-surface-alt text-center">
          <h2 className="text-2xl font-bold text-text mb-4">
            Still Have Questions?
          </h2>
          <p className="text-text-muted mb-6">
            Our support team is here to help.
          </p>
          <a
            href="mailto:support@nirogi.in"
            className="px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-light transition-colors inline-block"
          >
            Contact Support
          </a>
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
