"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface DashboardData {
  medicinesCount: number;
  conditionsCount: number;
  documentsCount: number;
  followUpsCount: number;
  recentDocs: Array<{
    id: string;
    file_name: string;
    doc_type: string | null;
    processing_status: string;
    created_at: string;
  }>;
  latestMetrics: Array<{
    metric_type: string;
    value: number;
    unit: string;
    recorded_at: string;
  }>;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
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

      const [medsRes, condRes, docsRes, followRes, metricsRes] =
        await Promise.all([
          supabase
            .from("current_medicines")
            .select("id", { count: "exact", head: true })
            .eq("user_id", user.id),
          supabase
            .from("chronic_conditions")
            .select("id", { count: "exact", head: true })
            .eq("user_id", user.id),
          supabase
            .from("documents")
            .select("id", { count: "exact", head: true })
            .eq("user_id", user.id),
          supabase
            .from("follow_ups")
            .select("id", { count: "exact", head: true })
            .eq("user_id", user.id)
            .eq("is_completed", false),
          supabase
            .from("documents")
            .select("id, file_name, doc_type, processing_status, created_at")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })
            .limit(5),
        ]);

      const { data: recentDocs } = await supabase
        .from("documents")
        .select("id, file_name, doc_type, processing_status, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5);

      const { data: metricsData } = await supabase
        .from("health_metrics")
        .select("metric_type, value, unit, recorded_at")
        .eq("user_id", user.id)
        .order("recorded_at", { ascending: false })
        .limit(10);

      setData({
        medicinesCount: medsRes.count || 0,
        conditionsCount: condRes.count || 0,
        documentsCount: docsRes.count || 0,
        followUpsCount: followRes.count || 0,
        recentDocs: recentDocs || [],
        latestMetrics: metricsData || [],
      });
      setLoading(false);
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4" />
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl" />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="h-48 bg-gray-200 rounded-xl" />
            <div className="h-48 bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Dashboard</h1>
        <p className="text-text-muted">Your health at a glance</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DashboardCard
          icon="💊"
          title="Active Medicines"
          value={data?.medicinesCount.toString() || "0"}
          href="/app/profile/medical"
        />
        <DashboardCard
          icon="🏥"
          title="Conditions"
          value={data?.conditionsCount.toString() || "0"}
          href="/app/profile/medical"
        />
        <DashboardCard
          icon="📄"
          title="Documents"
          value={data?.documentsCount.toString() || "0"}
          href="/app/documents"
        />
        <DashboardCard
          icon="🗓️"
          title="Follow-ups"
          value={data?.followUpsCount.toString() || "0"}
          href="/app/timeline"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-text mb-4">
            Recent Documents
          </h2>
          {!data?.recentDocs.length ? (
            <p className="text-text-muted text-sm">
              No documents uploaded yet.
            </p>
          ) : (
            <div className="space-y-2">
              {data.recentDocs.map((doc) => (
                <Link
                  key={doc.id}
                  href={`/app/documents/${doc.id}`}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-alt transition-colors"
                >
                  <span className="text-lg">📄</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text truncate">
                      {doc.file_name}
                    </p>
                    <p className="text-xs text-text-muted">
                      {doc.doc_type?.replace("_", " ") || "Document"}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${
                      doc.processing_status === "completed"
                        ? "bg-risk-green/10 text-risk-green"
                        : doc.processing_status === "failed"
                          ? "bg-risk-red/10 text-risk-red"
                          : "bg-risk-yellow/10 text-risk-yellow"
                    }`}
                  >
                    {doc.processing_status === "completed"
                      ? "Done"
                      : doc.processing_status === "failed"
                        ? "Failed"
                        : "Pending"}
                  </span>
                </Link>
              ))}
            </div>
          )}
          <Link
            href="/app/documents/upload"
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-light transition-colors"
          >
            Upload Document
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-text mb-4">
            Health Metrics
          </h2>
          {!data?.latestMetrics.length ? (
            <p className="text-text-muted text-sm">
              No metrics recorded yet. Upload a document to extract metrics.
            </p>
          ) : (
            <div className="space-y-2">
              {data.latestMetrics.slice(0, 5).map((m, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded-lg bg-surface-alt"
                >
                  <span className="text-sm font-medium text-text capitalize">
                    {m.metric_type.replace(/_/g, " ")}
                  </span>
                  <span className="text-sm text-text">
                    {m.value} {m.unit}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border p-6">
        <h2 className="text-lg font-semibold text-text mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <QuickAction
            href="/app/documents/upload"
            icon="📄"
            label="Upload Doc"
          />
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
