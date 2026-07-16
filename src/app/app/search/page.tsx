"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface SearchResult {
  id: string;
  file_name: string;
  doc_type: string | null;
  doc_date: string | null;
  hospital_name: string | null;
  processing_status: string;
  created_at: string;
  type: "document";
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);

    const supabase = createClient();
    if (!supabase) {
      setLoading(false);
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("documents")
      .select("*")
      .eq("user_id", user.id)
      .or(`file_name.ilike.%${query}%,doc_type.ilike.%${query}%,hospital_name.ilike.%${query}%,doctor_name.ilike.%${query}%`)
      .order("created_at", { ascending: false })
      .limit(20);

    setResults((data as SearchResult[]) || []);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Search</h1>
        <p className="text-text-muted">Search your health records</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search documents, hospitals, doctors..."
          className="flex-1 px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-light transition-colors disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {searched && !loading && results.length === 0 && (
        <div className="bg-white rounded-xl border border-border p-12 text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h2 className="text-lg font-semibold text-text mb-2">
            No results found
          </h2>
          <p className="text-text-muted text-sm">
            Try different keywords or upload more documents.
          </p>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-text-muted">
            {results.length} result{results.length !== 1 ? "s" : ""} found
          </p>
          {results.map((doc) => (
            <Link
              key={doc.id}
              href={`/app/documents/${doc.id}`}
              className="block bg-white rounded-xl border border-border p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">📄</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-text truncate">
                    {doc.file_name}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-text-muted">
                    {doc.doc_type && (
                      <span className="capitalize">
                        {doc.doc_type.replace("_", " ")}
                      </span>
                    )}
                    {doc.hospital_name && <span>{doc.hospital_name}</span>}
                    {doc.doc_date && <span>{formatDate(doc.doc_date)}</span>}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {!searched && (
        <div className="bg-white rounded-xl border border-border p-12 text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h2 className="text-lg font-semibold text-text mb-2">
            Search your records
          </h2>
          <p className="text-text-muted text-sm">
            Search by document name, hospital, doctor, or type.
          </p>
        </div>
      )}
    </div>
  );
}
