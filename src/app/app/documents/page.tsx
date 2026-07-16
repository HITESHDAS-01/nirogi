import Link from "next/link";

export default function DocumentsPage() {
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
        <FilterChip label="All" active />
        <FilterChip label="Prescriptions" />
        <FilterChip label="Blood Reports" />
        <FilterChip label="X-Rays" />
        <FilterChip label="Other" />
      </div>

      <div className="bg-white rounded-xl border border-border p-12 text-center">
        <div className="text-4xl mb-4">📄</div>
        <h2 className="text-lg font-semibold text-text mb-2">
          No documents yet
        </h2>
        <p className="text-text-muted text-sm mb-6">
          Upload your first medical document to get started. AI will extract and
          explain the contents.
        </p>
        <Link
          href="/app/documents/upload"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-light transition-colors"
        >
          Upload Document
        </Link>
      </div>
    </div>
  );
}

function FilterChip({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
        active
          ? "bg-primary text-white"
          : "bg-white border border-border text-text-muted hover:bg-surface-alt"
      }`}
    >
      {label}
    </button>
  );
}
