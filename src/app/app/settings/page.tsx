"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { loadProfile, saveProfile } from "@/lib/profile-store";

export default function SettingsPage() {
  const [language, setLanguage] = useState("en");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadProfile().then((p) => {
      setLanguage(p.language || "en");
    });
  }, []);

  const handleLanguageChange = async (lang: string) => {
    setLanguage(lang);
    setSaving(true);
    const profile = await loadProfile();
    await saveProfile({ ...profile, language: lang });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    if (!supabase) return;
    setSigningOut(true);
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Settings</h1>
        <p className="text-text-muted">Manage your preferences</p>
      </div>

      <div className="bg-white rounded-xl border border-border p-6">
        <h2 className="text-lg font-semibold text-text mb-4">Language</h2>
        <p className="text-sm text-text-muted mb-4">
          Choose your preferred language for AI responses and explanations.
        </p>
        <div className="space-y-2">
          {[
            { value: "en", label: "English" },
            { value: "hi", label: "Hindi" },
            { value: "as", label: "Assamese" },
            { value: "bn", label: "Bengali" },
            { value: "ta", label: "Tamil" },
            { value: "te", label: "Telugu" },
            { value: "mr", label: "Marathi" },
          ].map((lang) => (
            <label
              key={lang.value}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                language === lang.value
                  ? "border-primary bg-primary/5"
                  : "border-border hover:bg-surface-alt"
              }`}
            >
              <input
                type="radio"
                name="language"
                value={lang.value}
                checked={language === lang.value}
                onChange={() => handleLanguageChange(lang.value)}
                className="text-primary focus:ring-primary"
              />
              <span className="text-text font-medium">{lang.label}</span>
            </label>
          ))}
        </div>
        {saving && (
          <p className="text-xs text-text-muted mt-2">Saving...</p>
        )}
        {saved && (
          <p className="text-xs text-risk-green mt-2">Language saved!</p>
        )}
      </div>

      <div className="bg-white rounded-xl border border-border p-6">
        <h2 className="text-lg font-semibold text-text mb-4">Account</h2>
        <div className="space-y-3">
          <button
            onClick={() => router.push("/app/profile")}
            className="w-full text-left px-4 py-3 rounded-lg border border-border hover:bg-surface-alt transition-colors"
          >
            <p className="font-medium text-text">Edit Profile</p>
            <p className="text-sm text-text-muted">
              Update your personal and health information
            </p>
          </button>

          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className="w-full text-left px-4 py-3 rounded-lg border border-risk-red/30 text-risk-red hover:bg-risk-red/5 transition-colors"
          >
            <p className="font-medium">
              {signingOut ? "Signing out..." : "Sign Out"}
            </p>
            <p className="text-sm text-risk-red/70">
              You&apos;ll be redirected to the login page
            </p>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border p-6">
        <h2 className="text-lg font-semibold text-text mb-4">About</h2>
        <div className="space-y-2 text-sm text-text-muted">
          <p>
            <span className="font-medium text-text">Nirogi</span> v0.1.0
          </p>
          <p>
            AI-powered personal health companion. Understand your health, not
            just store it.
          </p>
          <div className="flex gap-4 mt-4">
            <a
              href="/about"
              className="text-primary font-medium hover:underline"
            >
              About Us
            </a>
            <a
              href="/privacy"
              className="text-primary font-medium hover:underline"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-primary font-medium hover:underline"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
