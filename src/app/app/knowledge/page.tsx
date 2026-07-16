"use client";

import { useState } from "react";

const categories = [
  { icon: "🦠", name: "Diseases", count: 0 },
  { icon: "🧪", name: "Tests", count: 0 },
  { icon: "💊", name: "Medicines", count: 0 },
  { icon: "🥗", name: "Nutrition", count: 0 },
  { icon: "💉", name: "Vaccines", count: 0 },
  { icon: "🧠", name: "Mental Health", count: 0 },
  { icon: "🏥", name: "First Aid", count: 0 },
  { icon: "📖", name: "Medical Terms", count: 0 },
];

export default function KnowledgePage() {
  const [query, setQuery] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Medical Knowledge</h1>
        <p className="text-text-muted">
          Reliable health information at your fingertips
        </p>
      </div>

      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask any health question..."
          className="w-full px-4 py-3 pl-10 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
        <svg
          className="absolute left-3 top-3.5 w-5 h-5 text-text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="bg-white rounded-xl border border-border p-4 text-center hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="text-3xl mb-2">{cat.icon}</div>
            <p className="font-medium text-text text-sm">{cat.name}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-border p-6">
        <p className="text-sm text-risk-yellow bg-risk-yellow/10 px-4 py-3 rounded-lg">
          ⚠️ This information is for educational purposes only. Always consult a
          healthcare professional for personal medical advice.
        </p>
      </div>
    </div>
  );
}
