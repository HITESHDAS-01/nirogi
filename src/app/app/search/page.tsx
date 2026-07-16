"use client";

import { useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Search</h1>
        <p className="text-text-muted">
          Find anything across your health records
        </p>
      </div>

      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search documents, medicines, conditions..."
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

      {!query && (
        <div className="bg-white rounded-xl border border-border p-12 text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h2 className="text-lg font-semibold text-text mb-2">
            Search your records
          </h2>
          <p className="text-text-muted text-sm">
            Type to search across documents, medicines, conditions, and more.
          </p>
        </div>
      )}

      {query && (
        <div className="bg-white rounded-xl border border-border p-12 text-center">
          <p className="text-text-muted text-sm">
            Search results will appear here once you have records.
          </p>
        </div>
      )}
    </div>
  );
}
