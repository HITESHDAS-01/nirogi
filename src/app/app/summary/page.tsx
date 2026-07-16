"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface SummaryData {
  name: string;
  age: number;
  blood_group: string;
  conditions: string[];
  medicines: string[];
  allergies: string[];
  recentDocs: number;
  latestMetrics: Array<{
    metric_type: string;
    value: number;
    unit: string;
    recorded_at: string;
  }>;
  followUps: Array<{
    doctor_name: string;
    due_date: string;
  }>;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function SummaryPage() {
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
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

      const [profileRes, healthRes, condRes, medsRes, docsRes, metricsRes, followRes] =
        await Promise.all([
          supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
          supabase.from("health_profiles").select("*").eq("user_id", user.id).maybeSingle(),
          supabase.from("chronic_conditions").select("condition_name").eq("user_id", user.id),
          supabase.from("current_medicines").select("medicine_name").eq("user_id", user.id),
          supabase.from("documents").select("id", { count: "exact", head: true }).eq("user_id", user.id),
          supabase.from("health_metrics").select("metric_type, value, unit, recorded_at").eq("user_id", user.id).order("recorded_at", { ascending: false }).limit(10),
          supabase.from("follow_ups").select("doctor_name, due_date").eq("user_id", user.id).eq("is_completed", false).order("due_date", { ascending: true }).limit(5),
        ]);

      const p = profileRes.data;
      const h = healthRes.data;

      let age = 0;
      if (p?.dob) {
        const birth = new Date(p.dob);
        age = new Date().getFullYear() - birth.getFullYear();
      }

      setSummary({
        name: p?.full_name || "User",
        age,
        blood_group: h?.blood_group || "",
        conditions: (condRes.data || []).map((c: Record<string, unknown>) => c.condition_name as string).filter(Boolean),
        medicines: (medsRes.data || []).map((m: Record<string, unknown>) => m.medicine_name as string).filter(Boolean),
        allergies: Array.isArray(h?.allergies) ? h.allergies : [],
        recentDocs: docsRes.count || 0,
        latestMetrics: (metricsRes.data || []) as SummaryData["latestMetrics"],
        followUps: (followRes.data || []) as SummaryData["followUps"],
      });
      setLoading(false);
    };

    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-64 bg-gray-200 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!summary) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Health Summary</h1>
        <p className="text-text-muted">Your health profile at a glance</p>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="bg-primary text-white px-6 py-4">
          <h2 className="text-xl font-bold">
            {summary.name} | {summary.age > 0 ? `${summary.age} years` : "Age not set"}
          </h2>
          {summary.blood_group && (
            <p className="text-white/80 mt-1">Blood Group: {summary.blood_group}</p>
          )}
        </div>

        <div className="p-6 space-y-6">
          <Section
            title="Active Conditions"
            empty="No conditions recorded"
            icon="🏥"
          >
            {summary.conditions.map((c, i) => (
              <li key={i} className="text-text font-medium">
                {c}
              </li>
            ))}
          </Section>

          <Section
            title="Current Medicines"
            empty="No medicines recorded"
            icon="💊"
          >
            {summary.medicines.map((m, i) => (
              <li key={i} className="text-text font-medium">
                {m}
              </li>
            ))}
          </Section>

          <Section
            title="Allergies"
            empty="No allergies recorded"
            icon="⚠️"
          >
            {summary.allergies.map((a, i) => (
              <li key={i} className="text-risk-red font-medium">
                {a}
              </li>
            ))}
          </Section>

          <Section
            title="Documents"
            empty="No documents uploaded"
            icon="📄"
          >
            <li className="text-text font-medium">
              {summary.recentDocs} document{summary.recentDocs !== 1 ? "s" : ""} uploaded
            </li>
          </Section>

          {summary.latestMetrics.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-3 flex items-center gap-2">
                <span>📊</span> Recent Metrics
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {summary.latestMetrics.slice(0, 6).map((m, i) => (
                  <div
                    key={i}
                    className="p-3 bg-surface-alt rounded-lg"
                  >
                    <p className="text-xs text-text-muted capitalize">
                      {m.metric_type.replace(/_/g, " ")}
                    </p>
                    <p className="text-lg font-bold text-text">
                      {m.value} {m.unit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {summary.followUps.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-3 flex items-center gap-2">
                <span>🗓️</span> Upcoming Follow-ups
              </h3>
              <div className="space-y-2">
                {summary.followUps.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-surface-alt rounded-lg"
                  >
                    <span className="text-text font-medium">
                      {f.doctor_name || "Doctor"}
                    </span>
                    <span className="text-sm text-text-muted">
                      {formatDate(f.due_date)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  empty,
  icon,
  children,
}: {
  title: string;
  empty: string;
  icon: string;
  children: React.ReactNode;
}) {
  const hasContent = Array.isArray(children) && children.length > 0;
  return (
    <div>
      <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-3 flex items-center gap-2">
        <span>{icon}</span> {title}
      </h3>
      {hasContent ? (
        <ul className="space-y-1">{children}</ul>
      ) : (
        <p className="text-sm text-text-muted">{empty}</p>
      )}
    </div>
  );
}
