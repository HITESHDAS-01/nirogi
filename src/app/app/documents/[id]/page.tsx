"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

interface Extraction {
  id: string;
  extracted_data: Record<string, unknown>;
  explanation_en: string;
  risk_level: string;
  key_findings: Array<{ name: string; value: string; unit: string; normal_range: string; status: string }>;
  medicines_found: Array<{ name: string; dose: string; frequency: string }>;
  follow_up_date: string | null;
  follow_up_notes: string | null;
  diagnosis_noted: string | null;
  allergy_warnings: Array<{ medicine: string; allergy: string; warning: string }>;
  interaction_warnings: Array<{ medicine1: string; medicine2: string; warning: string }>;
  duplicate_warnings: Array<{ existing: string; new: string; warning: string }>;
  created_at: string;
}

function StatusBadge({ status }: { status: string }) {
  if (status === "normal" || status === "completed")
    return (
      <span className="px-2 py-0.5 text-xs font-medium rounded bg-risk-green/10 text-risk-green">
        Normal
      </span>
    );
  if (status === "abnormal" || status === "failed")
    return (
      <span className="px-2 py-0.5 text-xs font-medium rounded bg-risk-red/10 text-risk-red">
        Abnormal
      </span>
    );
  if (status === "borderline" || status === "pending")
    return (
      <span className="px-2 py-0.5 text-xs font-medium rounded bg-risk-yellow/10 text-risk-yellow">
        Borderline
      </span>
    );
  return (
    <span className="px-2 py-0.5 text-xs font-medium rounded bg-gray-100 text-gray-600">
      {status}
    </span>
  );
}

function RiskBadge({ level }: { level: string }) {
  if (level === "green")
    return (
      <span className="px-3 py-1 text-sm font-semibold rounded-full bg-risk-green/10 text-risk-green">
        🟢 Normal
      </span>
    );
  if (level === "yellow")
    return (
      <span className="px-3 py-1 text-sm font-semibold rounded-full bg-risk-yellow/10 text-risk-yellow">
        🟡 Borderline
      </span>
    );
  if (level === "red")
    return (
      <span className="px-3 py-1 text-sm font-semibold rounded-full bg-risk-red/10 text-risk-red">
        🔴 Abnormal
      </span>
    );
  return null;
}

function WarningCard({
  type,
  warnings,
}: {
  type: "allergy" | "interaction" | "duplicate";
  warnings: Array<Record<string, string>>;
}) {
  if (warnings.length === 0) return null;

  const config = {
    allergy: { icon: "🚨", title: "Allergy Warnings", color: "risk-red" },
    interaction: { icon: "⚠️", title: "Drug Interactions", color: "risk-yellow" },
    duplicate: { icon: "ℹ️", title: "Duplicate Medicines", color: "risk-yellow" },
  };

  const c = config[type];

  return (
    <div className={`bg-${c.color}/5 border border-${c.color}/20 rounded-xl p-4`}>
      <h3 className={`font-semibold text-${c.color} mb-2`}>
        {c.icon} {c.title}
      </h3>
      {warnings.map((w, i) => (
        <div key={i} className="text-sm text-text mb-2 last:mb-0">
          {Object.entries(w).map(([key, val]) => (
            <p key={key}>
              <span className="font-medium">{key.replace(/_/g, " ")}:</span>{" "}
              {val}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function DocumentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [document, setDocument] = useState<Document | null>(null);
  const [extraction, setExtraction] = useState<Extraction | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchDoc = async () => {
      const supabase = createClient();
      if (!supabase) {
        setLoading(false);
        return;
      }

      const { data: doc } = await supabase
        .from("documents")
        .select("*")
        .eq("id", id)
        .single();

      if (doc) {
        setDocument(doc as Document);
        setNewName((doc as Document).file_name);
      }

      const { data: ext } = await supabase
        .from("document_extractions")
        .select("*")
        .eq("document_id", id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (ext) setExtraction(ext as Extraction);
      setLoading(false);
    };

    fetchDoc();
  }, [id]);

  const handleRename = async () => {
    if (!newName.trim() || newName === document?.file_name) {
      setEditing(false);
      return;
    }
    setSaving(true);
    const supabase = createClient();
    if (!supabase) return;

    await supabase.from("documents").update({ file_name: newName.trim() }).eq("id", id);
    setDocument((prev) => prev ? { ...prev, file_name: newName.trim() } : prev);
    setEditing(false);
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirm("Delete this document? This cannot be undone.")) return;

    const supabase = createClient();
    if (!supabase) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const fileExt = document?.file_name.split(".").pop();
    const storagePath = `${user.id}/${id}.${fileExt}`;
    await supabase.storage.from("documents").remove([storagePath]);
    await supabase.from("documents").delete().eq("id", id);

    router.push("/app/documents");
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-40 bg-gray-200 rounded" />
          <div className="h-60 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-text">Document Details</h1>
        </div>
        <div className="bg-white rounded-xl border border-border p-12 text-center">
          <div className="text-4xl mb-4">📄</div>
          <h2 className="text-lg font-semibold text-text mb-2">
            Document not found
          </h2>
          <p className="text-text-muted text-sm mb-4">
            This document doesn&apos;t exist or you don&apos;t have access.
          </p>
          <Link
            href="/app/documents"
            className="text-primary font-medium hover:underline"
          >
            ← Back to documents
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/app/documents"
          className="text-sm text-primary hover:underline mb-2 inline-block"
        >
          ← Back to documents
        </Link>
        {editing ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleRename()}
              className="flex-1 px-3 py-2 border border-border rounded-lg text-lg font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              autoFocus
            />
            <button
              onClick={handleRename}
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-light transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => { setEditing(false); setNewName(document.file_name); }}
              className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-surface-alt transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-text flex-1">{document.file_name}</h1>
            <button
              onClick={() => setEditing(true)}
              className="text-sm text-primary hover:text-primary-light font-medium"
            >
              Rename
            </button>
            <button
              onClick={handleDelete}
              className="text-sm text-risk-red hover:text-risk-red/80 font-medium"
            >
              Delete
            </button>
          </div>
        )}
        <p className="text-text-muted">
          {document.doc_type?.replace("_", " ") || "Document"} •{" "}
          {document.hospital_name || "Unknown hospital"}
        </p>
      </div>

      {document.processing_status === "pending" && (
        <div className="bg-risk-yellow/5 border border-risk-yellow/20 rounded-xl p-6 text-center">
          <div className="text-3xl mb-2">⏳</div>
          <p className="font-medium text-risk-yellow">Processing...</p>
          <p className="text-sm text-text-muted mt-1">
            AI is analyzing your document. Refresh in a few moments.
          </p>
        </div>
      )}

      {document.processing_status === "failed" && (
        <div className="bg-risk-red/5 border border-risk-red/20 rounded-xl p-6 text-center">
          <div className="text-3xl mb-2">❌</div>
          <p className="font-medium text-risk-red">Processing failed</p>
          <p className="text-sm text-text-muted mt-1">
            Could not analyze this document. Try uploading again.
          </p>
        </div>
      )}

      {extraction && (
        <>
          {extraction.allergy_warnings?.length > 0 && (
            <WarningCard type="allergy" warnings={extraction.allergy_warnings} />
          )}
          {extraction.interaction_warnings?.length > 0 && (
            <WarningCard
              type="interaction"
              warnings={extraction.interaction_warnings}
            />
          )}
          {extraction.duplicate_warnings?.length > 0 && (
            <WarningCard
              type="duplicate"
              warnings={extraction.duplicate_warnings}
            />
          )}

          <div className="bg-white rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-text">
                AI Analysis
              </h2>
              <RiskBadge level={extraction.risk_level} />
            </div>

            {extraction.diagnosis_noted && (
              <div className="mb-4 p-3 bg-surface-alt rounded-lg">
                <p className="text-sm font-medium text-text-muted">
                  Diagnosis
                </p>
                <p className="text-text font-medium">
                  {extraction.diagnosis_noted}
                </p>
              </div>
            )}

            <div className="prose prose-sm max-w-none text-text">
              <p className="whitespace-pre-wrap">{extraction.explanation_en}</p>
            </div>
          </div>

          {extraction.key_findings?.length > 0 && (
            <div className="bg-white rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold text-text mb-4">
                Key Findings
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-text-muted font-medium">
                        Test
                      </th>
                      <th className="text-left py-2 text-text-muted font-medium">
                        Value
                      </th>
                      <th className="text-left py-2 text-text-muted font-medium">
                        Normal Range
                      </th>
                      <th className="text-left py-2 text-text-muted font-medium">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {extraction.key_findings.map((f, i) => (
                      <tr key={i} className="border-b border-border/50">
                        <td className="py-2 font-medium text-text">
                          {f.name}
                        </td>
                        <td className="py-2 text-text">
                          {f.value} {f.unit}
                        </td>
                        <td className="py-2 text-text-muted">
                          {f.normal_range}
                        </td>
                        <td className="py-2">
                          <StatusBadge status={f.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {extraction.medicines_found?.length > 0 && (
            <div className="bg-white rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold text-text mb-4">
                Medicines Found
              </h2>
              <div className="space-y-2">
                {extraction.medicines_found.map((m, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 bg-surface-alt rounded-lg"
                  >
                    <span className="text-lg">💊</span>
                    <div>
                      <p className="font-medium text-text">{m.name}</p>
                      <p className="text-xs text-text-muted">
                        {m.dose} • {m.frequency}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {extraction.follow_up_date && (
            <div className="bg-white rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold text-text mb-2">
                Follow-up
              </h2>
              <p className="text-text">
                📅 Due: {new Date(extraction.follow_up_date).toLocaleDateString("en-IN")}
              </p>
              {extraction.follow_up_notes && (
                <p className="text-sm text-text-muted mt-1">
                  {extraction.follow_up_notes}
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
