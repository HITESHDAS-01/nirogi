export default function DocumentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Document Details</h1>
        <p className="text-text-muted">
          AI-extracted information and explanation
        </p>
      </div>

      <div className="bg-white rounded-xl border border-border p-12 text-center">
        <div className="text-4xl mb-4">📄</div>
        <h2 className="text-lg font-semibold text-text mb-2">
          Document not found
        </h2>
        <p className="text-text-muted text-sm">
          This document doesn&apos;t exist or hasn&apos;t been processed yet.
        </p>
      </div>
    </div>
  );
}
