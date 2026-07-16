import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Dashboard</h1>
        <p className="text-text-muted">Your health at a glance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          icon="💊"
          title="Active Medicines"
          value="—"
          href="/app/profile/medical"
        />
        <DashboardCard
          icon="🏥"
          title="Conditions"
          value="—"
          href="/app/profile/medical"
        />
        <DashboardCard
          icon="📄"
          title="Documents"
          value="0"
          href="/app/documents"
        />
        <DashboardCard
          icon="🗓️"
          title="Follow-ups"
          value="0"
          href="/app/timeline"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-text mb-4">
            Health Metrics
          </h2>
          <p className="text-text-muted text-sm">
            No metrics recorded yet. Upload a document or add metrics manually.
          </p>
          <Link
            href="/app/documents/upload"
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-light transition-colors"
          >
            Upload Document
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-text mb-4">
            Recent Documents
          </h2>
          <p className="text-text-muted text-sm">
            No documents uploaded yet. Start by uploading your first medical
            document.
          </p>
          <Link
            href="/app/documents/upload"
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-light transition-colors"
          >
            Upload First Document
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border p-6">
        <h2 className="text-lg font-semibold text-text mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <QuickAction href="/app/documents/upload" icon="📄" label="Upload Doc" />
          <QuickAction href="/app/chat" icon="💬" label="AI Chat" />
          <QuickAction href="/app/timeline" icon="🗓️" label="Timeline" />
          <QuickAction href="/app/summary" icon="📋" label="Summary" />
        </div>
      </div>
    </div>
  );
}

function DashboardCard({
  icon,
  title,
  value,
  href,
}: {
  icon: string;
  title: string;
  value: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="bg-white rounded-xl border border-border p-5 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <p className="text-sm text-text-muted">{title}</p>
          <p className="text-2xl font-bold text-text">{value}</p>
        </div>
      </div>
    </Link>
  );
}

function QuickAction({
  href,
  icon,
  label,
}: {
  href: string;
  icon: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border hover:bg-secondary transition-colors"
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-sm font-medium text-text">{label}</span>
    </Link>
  );
}
