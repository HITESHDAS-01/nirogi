export default function TimelinePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Health Timeline</h1>
        <p className="text-text-muted">Your complete medical history</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        <FilterChip label="All" active />
        <FilterChip label="Documents" />
        <FilterChip label="Medicines" />
        <FilterChip label="Diagnoses" />
        <FilterChip label="Metrics" />
        <FilterChip label="Follow-ups" />
      </div>

      <div className="bg-white rounded-xl border border-border p-12 text-center">
        <div className="text-4xl mb-4">🗓️</div>
        <h2 className="text-lg font-semibold text-text mb-2">No events yet</h2>
        <p className="text-text-muted text-sm">
          Your health timeline will populate as you add documents and records.
        </p>
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
