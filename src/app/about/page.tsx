import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Nirogi — Our Mission to Make Health Accessible",
  description:
    "Learn about Nirogi's mission to make medical information understandable for every Indian. Read about our team, values, and commitment to health literacy.",
  openGraph: {
    title: "About Nirogi — Our Mission",
    description:
      "Making medical information understandable for every Indian family.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />

      <main className="flex-1">
        <section className="px-6 py-20 bg-gradient-to-b from-secondary to-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-text max-w-3xl mx-auto leading-tight">
            Our Mission: Health Literacy for Every Indian
          </h1>
          <p className="mt-6 text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
            We believe that understanding your health should not require a
            medical degree. Nirogi was built to bridge the gap between complex
            medical information and the people who need to understand it.
          </p>
        </section>

        <section className="px-6 py-20 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-text mb-8">Why Nirogi?</h2>
            <div className="prose prose-lg max-w-none text-text-muted space-y-6">
              <p>
                In India, millions of people receive medical reports every day
                that they cannot fully understand. The language barrier, medical
                jargon, and lack of health literacy mean that important health
                information often goes unnoticed.
              </p>
              <p>
                A borderline blood sugar level might be ignored. A critical
                value on a lab report might not be understood. A medication
                change might be forgotten. These small gaps in understanding can
                have serious consequences.
              </p>
              <p>
                Nirogi was created to solve this problem. Using advanced AI, we
                read your medical documents, extract the key information, and
                explain everything in plain language — in the language you
                understand best.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 bg-surface-alt">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-text mb-8">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <ValueCard
                icon="🎯"
                title="Simplicity First"
                description="Health information is already complex. We make it simple. Every feature in Nirogi is designed to be intuitive, especially for users who are not tech-savvy."
              />
              <ValueCard
                icon="🔒"
                title="Privacy is Non-Negotiable"
                description="Your medical data is the most personal information you have. We treat it that way. End-to-end encryption, strict access controls, and a promise: we never sell your data."
              />
              <ValueCard
                icon="🌍"
                title="Language Shouldn't Be a Barrier"
                description="Health information should be accessible to everyone, regardless of the language they speak. That's why we support multiple Indian languages."
              />
              <ValueCard
                icon="🤝"
                title="Empowering, Not Replacing"
                description="Nirogi helps you understand your health better so you can have more informed conversations with your doctor. We never replace professional medical advice."
              />
            </div>
          </div>
        </section>

        <section className="px-6 py-20 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-text mb-8">Our Commitment</h2>
            <div className="space-y-6 text-text-muted leading-relaxed">
              <p>
                <strong className="text-text">To our users:</strong> We will
                always keep your data secure and private. We will never make
                medical claims or replace your doctor. We will always be
                transparent about what our AI can and cannot do.
              </p>
              <p>
                <strong className="text-text">To accuracy:</strong> Our AI is
                trained to be careful and conservative. When it&apos;s unsure,
                it says so. When it finds something concerning, it flags it. We
                would rather be cautious than wrong.
              </p>
              <p>
                <strong className="text-text">To accessibility:</strong> We will
                keep improving our language support and ensure that Nirogi works
                for people of all ages and technical abilities.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 bg-primary text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Join Us on This Journey
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
            We are building Nirogi for every Indian family. Your feedback and
            support help us improve every day.
          </p>
          <Link
            href="/auth/login"
            className="px-8 py-4 rounded-xl bg-white text-primary font-semibold text-lg hover:bg-secondary transition-colors inline-block"
          >
            Get Started
          </Link>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}

function ValueCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-xl bg-white border border-border">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
      <p className="text-text-muted text-sm leading-relaxed">{description}</p>
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
        <a href="/#features" className="hover:text-text transition-colors">
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
      <Link
        href="/auth/login"
        className="px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary-light transition-colors text-sm"
      >
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
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm">
              N
            </div>
            <span className="text-lg font-bold">Nirogi</span>
          </div>
          <p className="text-sm text-gray-400">
            Understand Your Health, Not Just Store It.
          </p>
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
