"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface Document {
  id: string;
  file_name: string;
  file_type: string;
  file_url: string;
  file_size_kb: number;
  doc_type: string | null;
  doc_date: string | null;
  hospital_name: string | null;
  doctor_name: string | null;
  processing_status: string;
  created_at: string;
}

const DOC_TYPES = [
  { value: "all", label: "All" },
  { value: "prescription", label: "Prescriptions" },
  { value: "blood_report", label: "Blood Reports" },
  { value: "xray", label: "X-Rays" },
  { value: "other", label: "Other" },
];

function formatFileSize(kb: number): string {
  if (kb < 1024) return `${kb} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function StatusBadge({ status }: { status: string }) {
  if (status === "completed")
    return (
      <span className="px-2 py-0.5 text-xs font-medium rounded bg-risk-green/10 text-risk-green">
        Processed
      </span>
    );
  if (status === "failed")
    return (
      <span className="px-2 py-0.5 text-xs font-medium rounded bg-risk-red/10 text-risk-red">
        Failed
      </span>
    );
  return (
    <span className="px-2 py-0.5 text-xs font-medium rounded bg-risk-yellow/10 text-risk-yellow">
      Processing...
    </span>
  );
}

function DocTypeIcon({ type }: { type: string | null }) {
  if (type === "prescription") return <span className="text-2xl">💊</span>;
  if (type === "blood_report") return <span className="text-2xl">🩸</span>;
  if (type === "xray") return <span className="text-2xl">🦴</span>;
  if (type === "mri") return <span className="text-2xl">🧠</span>;
  if (type === "ecg") return <span className="text-2xl">❤️</span>;
  return <span className="text-2xl">📄</span>;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = async () => {
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
      .order("created_at", { ascending: false });

    if (data) setDocuments(data as Document[]);
    setLoading(false);
  };

  const handleDelete = async (doc: Document) => {
    if (!confirm(`Delete "${doc.file_name}"? This cannot be undone.`)) return;

    setDeletingId(doc.id);
    const supabase = createClient();
    if (!supabase) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Delete from storage
    const fileExt = doc.file_name.split(".").pop();
    const storagePath = `${user.id}/${doc.id}.${fileExt}`;
    await supabase.storage.from("documents").remove([storagePath]);

    // Delete from DB (cascading handles extractions)
    await supabase.from("documents").delete().eq("id", doc.id);

    setDocuments((prev) => prev.filter((d) => d.id !== doc.id));
    setDeletingId(null);
  };

  const filtered =
    filter === "all"
      ? documents
      : documents.filter((d) => d.doc_type === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Documents</h1>
          <p className="text-text-muted">Your medical documents and reports</p>
        </div>
        <Link
          href="/app/documents/upload"
          className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-light transition-colors"
        >
          + Upload
        </Link>
      </div>

      <div className="flex gap-2 flex-wrap">
        {DOC_TYPES.map((t) => (
          <button
            key={t.value}
            onClick={() => setFilter(t.value)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === t.value
                ? "bg-primary text-white"
                : "bg-white border border-border text-text-muted hover:bg-surface-alt"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-border p-4 animate-pulse"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-3 bg-gray-200 rounded w-1/4 mt-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-border p-12 text-center">
          <div className="text-4xl mb-4">📄</div>
          <h2 className="text-lg font-semibold text-text mb-2">
            {documents.length === 0 ? "No documents yet" : "No matching documents"}
          </h2>
          <p className="text-text-muted text-sm mb-6">
            {documents.length === 0
              ? "Upload your first medical document to get started."
              : "Try a different filter."}
          </p>
          {documents.length === 0 && (
            <Link
              href="/app/documents/upload"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-light transition-colors"
            >
              Upload Document
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-xl border border-border p-4 hover:shadow-md transition-shadow"
            >
              <Link
                href={`/app/documents/${doc.id}`}
                className="flex items-center gap-4"
              >
                <DocTypeIcon type={doc.doc_type} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-text truncate">
                      {doc.file_name}
                    </p>
                    <StatusBadge status={doc.processing_status} />
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-text-muted">
                    {doc.doc_type && (
                      <span className="capitalize">
                        {doc.doc_type.replace("_", " ")}
                      </span>
                    )}
                    {doc.doc_date && <span>{formatDate(doc.doc_date)}</span>}
                    {doc.hospital_name && <span>{doc.hospital_name}</span>}
                    <span>{formatFileSize(doc.file_size_kb)}</span>
                  </div>
                </div>
                <span className="text-text-muted text-sm hidden sm:block">
                  {formatDate(doc.created_at)}
                </span>
              </Link>
              <div className="flex justify-end mt-2 pt-2 border-t border-border/50">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(doc);
                  }}
                  disabled={deletingId === doc.id}
                  className="text-xs text-risk-red hover:text-risk-red/80 font-medium disabled:opacity-50"
                >
                  {deletingId === doc.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
