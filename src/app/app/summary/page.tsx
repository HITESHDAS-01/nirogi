export default function SummaryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Health Summary</h1>
        <p className="text-text-muted">AI-generated overview of your health</p>
      </div>

      <div className="bg-white rounded-xl border border-border p-12 text-center">
        <div className="text-4xl mb-4">📋</div>
        <h2 className="text-lg font-semibold text-text mb-2">
          No data to summarize
        </h2>
        <p className="text-text-muted text-sm mb-6">
          Upload documents and fill your profile to generate a health summary.
        </p>
        <button className="px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-light transition-colors">
          Generate Summary
        </button>
      </div>
    </div>
  );
}
