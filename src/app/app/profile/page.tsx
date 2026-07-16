"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [form, setForm] = useState({
    full_name: "",
    dob: "",
    gender: "",
    language: "en",
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-border p-6 max-w-2xl"
    >
      <h2 className="text-lg font-semibold text-text mb-6">
        Basic Information
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            value={form.dob}
            onChange={(e) => setForm({ ...form, dob: e.target.value })}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1">
            Gender
          </label>
          <select
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1">
            Preferred Language
          </label>
          <select
            value={form.language}
            onChange={(e) => setForm({ ...form, language: e.target.value })}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="as">Assamese</option>
            <option value="bn">Bengali</option>
            <option value="ta">Tamil</option>
            <option value="te">Telugu</option>
            <option value="mr">Marathi</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary-light transition-colors"
        >
          Save Changes
        </button>
        {saved && (
          <span className="text-sm text-risk-green font-medium">Saved!</span>
        )}
      </div>
    </form>
  );
}
