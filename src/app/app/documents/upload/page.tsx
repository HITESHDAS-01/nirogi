"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const ACCEPTED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/heic",
];
const MAX_SIZE_MB = 10;

export default function UploadPage() {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [docType, setDocType] = useState("");
  const [docDate, setDocDate] = useState("");
  const [hospital, setHospital] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleFile = useCallback((f: File) => {
    setError(null);
    setUploaded(false);
    if (!ACCEPTED_TYPES.includes(f.type)) {
      setError("Invalid file type. Please upload PDF, JPG, PNG, or HEIC.");
      return;
    }
    if (f.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File too large. Maximum size is ${MAX_SIZE_MB}MB.`);
      return;
    }
    setFile(f);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const handleUpload = async () => {
    if (!file) return;

    const supabase = createClient();
    if (!supabase) {
      setError("Supabase not configured.");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError("You must be logged in to upload.");
        return;
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("documents")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("documents")
        .getPublicUrl(filePath);

      const { data: docRecord, error: insertError } = await supabase
        .from("documents")
        .insert({
          user_id: user.id,
          file_url: urlData.publicUrl,
          file_name: file.name,
          file_type: file.type,
          file_size_kb: Math.round(file.size / 1024),
          doc_type: docType || null,
          doc_date: docDate || null,
          hospital_name: hospital || null,
          processing_status: "pending",
        })
        .select("id")
        .single();

      if (insertError) throw insertError;

      setUploaded(true);

      fetch("/api/process-document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          file_url: urlData.publicUrl,
          file_type: file.type,
          document_id: docRecord.id,
        }),
      }).catch(() => {});

      setTimeout(() => {
        router.push("/app/documents");
      }, 1500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      setError(msg);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Upload Document</h1>
        <p className="text-text-muted">
          Upload a medical document for AI analysis
        </p>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer ${
          dragOver
            ? "border-primary bg-primary/5"
            : uploaded
              ? "border-risk-green bg-risk-green/5"
              : file
                ? "border-risk-green bg-risk-green/5"
                : "border-border hover:border-primary/50"
        }`}
        onClick={() => !uploading && document.getElementById("file-input")?.click()}
      >
        <input
          id="file-input"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.heic"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />

        {uploaded ? (
          <div>
            <div className="text-4xl mb-3">✅</div>
            <p className="font-medium text-risk-green">Uploaded successfully!</p>
            <p className="text-sm text-text-muted mt-1">
              Processing with AI in background...
            </p>
          </div>
        ) : file ? (
          <div>
            <div className="text-4xl mb-3">✅</div>
            <p className="font-medium text-text">{file.name}</p>
            <p className="text-sm text-text-muted mt-1">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
                setUploaded(false);
              }}
              className="mt-3 text-sm text-risk-red font-medium hover:underline"
            >
              Remove
            </button>
          </div>
        ) : (
          <div>
            <div className="text-4xl mb-3">📄</div>
            <p className="font-medium text-text">
              Drag & drop your document here
            </p>
            <p className="text-sm text-text-muted mt-1">
              or click to browse. PDF, JPG, PNG, HEIC up to {MAX_SIZE_MB}MB.
            </p>
          </div>
        )}
      </div>

      {file && !uploaded && (
        <div className="bg-white rounded-xl border border-border p-6 space-y-4">
          <h2 className="font-semibold text-text">Document Details</h2>

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Document Type
            </label>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="">AI will detect automatically</option>
              <option value="prescription">Prescription</option>
              <option value="blood_report">Blood Report</option>
              <option value="urine_report">Urine Report</option>
              <option value="xray">X-Ray</option>
              <option value="mri">MRI</option>
              <option value="ct">CT Scan</option>
              <option value="ecg">ECG</option>
              <option value="ultrasound">Ultrasound</option>
              <option value="discharge_summary">Discharge Summary</option>
              <option value="vaccination">Vaccination</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Document Date
              </label>
              <input
                type="date"
                value={docDate}
                onChange={(e) => setDocDate(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Hospital / Clinic
              </label>
              <input
                type="text"
                value={hospital}
                onChange={(e) => setHospital(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Optional"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-risk-red bg-risk-red/10 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-light transition-colors disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload & Process"}
          </button>
        </div>
      )}
    </div>
  );
}
