import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Nirogi Health Companion",
  description:
    "Nirogi's privacy policy. Learn how we collect, use, store, and protect your personal health data. DPDP Act compliant.",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />

      <main className="flex-1">
        <section className="px-6 py-16 bg-white">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-text mb-4">
              Privacy Policy
            </h1>
            <p className="text-text-muted mb-8">
              Last updated: January 2026
            </p>

            <div className="prose prose-lg max-w-none text-text-muted space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-text mb-4">
                  1. Introduction
                </h2>
                <p>
                  Nirogi (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;)
                  is committed to protecting your privacy. This Privacy Policy
                  explains how we collect, use, disclose, and safeguard your
                  information when you use our application and services.
                </p>
                <p>
                  We comply with the Digital Personal Data Protection Act, 2023
                  (DPDP Act) and applicable Indian data protection regulations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">
                  2. Information We Collect
                </h2>
                <h3 className="text-lg font-semibold text-text mb-2">
                  Personal Information
                </h3>
                <ul className="list-disc list-inside space-y-1 mb-4">
                  <li>Name, date of birth, gender</li>
                  <li>Email address</li>
                  <li>Profile information (blood group, height, weight)</li>
                </ul>
                <h3 className="text-lg font-semibold text-text mb-2">
                  Health Information
                </h3>
                <ul className="list-disc list-inside space-y-1 mb-4">
                  <li>Medical documents you upload (prescriptions, reports, etc.)</li>
                  <li>Extracted health data from documents</li>
                  <li>Health metrics you record manually</li>
                  <li>Medical history (conditions, surgeries, medications)</li>
                  <li>Emergency contact information</li>
                </ul>
                <h3 className="text-lg font-semibold text-text mb-2">
                  Usage Information
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>App usage patterns</li>
                  <li>Device information</li>
                  <li>Log data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">
                  3. How We Use Your Information
                </h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    To provide and maintain our health companion services
                  </li>
                  <li>
                    To process and extract information from your medical
                    documents using AI
                  </li>
                  <li>
                    To generate health summaries and explanations
                  </li>
                  <li>
                    To send follow-up and medication reminders
                  </li>
                  <li>
                    To improve our AI accuracy and services
                  </li>
                  <li>
                    To communicate with you about your account
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">
                  4. Data Storage and Security
                </h2>
                <p>
                  Your data is stored on secure cloud servers provided by
                  Supabase. We implement the following security measures:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-4">
                  <li>
                    End-to-end encryption for data at rest and in transit
                  </li>
                  <li>
                    Row Level Security (RLS) ensuring only you can access your
                    data
                  </li>
                  <li>
                    Regular security audits and updates
                  </li>
                  <li>
                    Access controls and authentication
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">
                  5. Data Sharing
                </h2>
                <p>
                  We do not sell, trade, or otherwise transfer your personal
                  health information to third parties. We may share information
                  only in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-4">
                  <li>
                    With your explicit consent (e.g., sharing a health summary
                    with a doctor)
                  </li>
                  <li>
                    With AI service providers (Google Gemini) solely for
                    document processing — data is processed ephemerally
                  </li>
                  <li>
                    As required by law
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">
                  6. Your Rights
                </h2>
                <p>Under the DPDP Act and our policies, you have the right to:</p>
                <ul className="list-disc list-inside space-y-2 mt-4">
                  <li>Access all your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Withdraw consent at any time</li>
                  <li>Export your data in a portable format</li>
                  <li>Grievance redressal</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">
                  7. Data Retention
                </h2>
                <p>
                  We retain your data for as long as your account is active or
                  as needed to provide services. If you delete your account, all
                  your data will be permanently removed within 30 days.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">
                  8. Children&apos;s Privacy
                </h2>
                <p>
                  Our services are not directed to individuals under 18. If you
                  are a parent managing health records for a minor, you are
                  responsible for the data and consent.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">
                  9. Changes to This Policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time. We will
                  notify you of any material changes by posting the new policy
                  on this page and updating the &quot;Last updated&quot; date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">
                  10. Contact Us
                </h2>
                <p>
                  If you have questions about this Privacy Policy or your data,
                  please contact us at:
                </p>
                <p className="mt-2">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:privacy@nirogi.in"
                    className="text-primary hover:underline"
                  >
                    privacy@nirogi.in
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
