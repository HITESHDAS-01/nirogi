import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — Nirogi Health Companion",
  description:
    "Nirogi's terms of service. Read about the rules and guidelines for using the Nirogi health companion application.",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />

      <main className="flex-1">
        <section className="px-6 py-16 bg-white">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-text mb-4">
              Terms of Service
            </h1>
            <p className="text-text-muted mb-8">
              Last updated: January 2026
            </p>

            <div className="prose prose-lg max-w-none text-text-muted space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-text mb-4">
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing or using Nirogi (&quot;the App&quot;), you agree
                  to be bound by these Terms of Service. If you do not agree to
                  these terms, please do not use the App.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">
                  2. Description of Service
                </h2>
                <p>
                  Nirogi is a personal AI health companion that helps users
                  organize, understand, and track their medical information.
                  Features include document processing, AI-powered explanations,
                  health tracking, and emergency cards.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">
                  3. Medical Disclaimer
                </h2>
                <div className="p-4 rounded-lg bg-risk-yellow/10 border border-risk-yellow/20 mb-4">
                  <p className="font-semibold text-risk-yellow">
                    IMPORTANT: Nirogi is NOT a medical device and does NOT
                    provide medical advice.
                  </p>
                </div>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    The AI-generated explanations are for informational purposes
                    only
                  </li>
                  <li>
                    Nirogi does not diagnose, treat, cure, or prevent any disease
                  </li>
                  <li>
                    Nirogi does not replace the advice of a qualified healthcare
                    professional
                  </li>
                  <li>
                    Always consult your doctor for medical decisions
                  </li>
                  <li>
                    In case of emergency, call 108 (India) or your local
                    emergency number immediately
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">
                  4. User Accounts
                </h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    You must be at least 18 years old to create an account
                  </li>
                  <li>
                    You are responsible for maintaining the security of your
                    account
                  </li>
                  <li>
                    You must provide accurate and complete information
                  </li>
                  <li>
                    One person may not maintain multiple accounts
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">
                  5. Acceptable Use
                </h2>
                <p>You agree NOT to:</p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>
                    Use the App for any unlawful purpose
                  </li>
                  <li>
                    Upload false, misleading, or fraudulent medical documents
                  </li>
                  <li>
                    Attempt to access other users&apos; data
                  </li>
                  <li>
                    Reverse engineer or attempt to extract the AI models
                  </li>
                  <li>
                    Use automated tools to access the App
                  </li>
                  <li>
                    Resell or redistribute Nirogi services
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">
                  6. Intellectual Property
                </h2>
                <p>
                  All content, features, and functionality of Nirogi are owned
                  by us and are protected by copyright, trademark, and other
                  intellectual property laws. You retain ownership of the
                  documents and data you upload.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">
                  7. Pricing and Payment
                </h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    Free tier is available at no cost with usage limits
                  </li>
                  <li>
                    Premium plans are billed monthly or annually via Razorpay
                  </li>
                  <li>
                    Prices are in Indian Rupees (INR) and include applicable
                    taxes
                  </li>
                  <li>
                    You may cancel your subscription at any time
                  </li>
                  <li>
                    Refunds are handled on a case-by-case basis
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">
                  8. Limitation of Liability
                </h2>
                <p>
                  To the maximum extent permitted by law, Nirogi shall not be
                  liable for any indirect, incidental, special, consequential,
                  or punitive damages, or any loss of profits or revenues,
                  whether incurred directly or indirectly, arising from:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>
                    Your use of or inability to use the App
                  </li>
                  <li>
                    Any errors or omissions in AI-generated content
                  </li>
                  <li>
                    Any medical decisions made based on AI explanations
                  </li>
                  <li>
                    Unauthorized access to your data
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">
                  9. Termination
                </h2>
                <p>
                  We may suspend or terminate your account at any time for
                  violation of these terms. You may delete your account at any
                  time from Settings. Upon deletion, all your data will be
                  permanently removed within 30 days.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">
                  10. Changes to Terms
                </h2>
                <p>
                  We reserve the right to modify these terms at any time. We
                  will notify you of material changes via email or in-app
                  notification. Continued use of the App after changes
                  constitutes acceptance of the new terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">
                  11. Governing Law
                </h2>
                <p>
                  These terms are governed by the laws of India. Any disputes
                  shall be subject to the exclusive jurisdiction of courts in
                  India.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">
                  12. Contact
                </h2>
                <p>
                  For questions about these Terms, contact us at:
                </p>
                <p className="mt-2">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:legal@nirogi.in"
                    className="text-primary hover:underline"
                  >
                    legal@nirogi.in
                  </a>
                </p>
              </section>
            </div>
          </div>
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
