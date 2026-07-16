"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface TimelineEvent {
  id: string;
  event_type: string;
  event_date: string;
  title: string;
  description: string | null;
  document_id: string | null;
  created_at: string;
}

const EVENT_TYPES = [
  { value: "all", label: "All" },
  { value: "upload", label: "Documents" },
  { value: "checkup", label: "Check-ups" },
  { value: "medicine", label: "Medicines" },
  { value: "lab", label: "Lab Results" },
  { value: "other", label: "Other" },
];

function EventIcon({ type }: { type: string }) {
  if (type === "upload") return <span className="text-lg">📄</span>;
  if (type === "checkup") return <span className="text-lg">🏥</span>;
  if (type === "medicine") return <span className="text-lg">💊</span>;
  if (type === "lab") return <span className="text-lg">🩸</span>;
  return <span className="text-lg">📌</span>;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function TimelinePage() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchEvents = async () => {
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
        .from("timeline_events")
        .select("*")
        .eq("user_id", user.id)
        .order("event_date", { ascending: false });

      if (data) setEvents(data as TimelineEvent[]);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  const filtered =
    filter === "all"
      ? events
      : events.filter((e) => e.event_type === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Timeline</h1>
        <p className="text-text-muted">Your health events chronologically</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {EVENT_TYPES.map((t) => (
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
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-border p-4 animate-pulse"
            >
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
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
          <div className="text-4xl mb-4">🗓️</div>
          <h2 className="text-lg font-semibold text-text mb-2">
            {events.length === 0 ? "No events yet" : "No matching events"}
          </h2>
          <p className="text-text-muted text-sm">
            {events.length === 0
              ? "Events will appear as you upload documents and record health data."
              : "Try a different filter."}
          </p>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border" />
          <div className="space-y-4">
            {filtered.map((event) => (
              <div key={event.id} className="flex gap-4 relative">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-border flex items-center justify-center z-10">
                  <EventIcon type={event.event_type} />
                </div>
                <div className="flex-1 bg-white rounded-xl border border-border p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-text">{event.title}</h3>
                    <span className="text-xs text-text-muted">
                      {formatDate(event.event_date)}
                    </span>
                  </div>
                  {event.description && (
                    <p className="text-sm text-text-muted mt-1">
                      {event.description}
                    </p>
                  )}
                  {event.document_id && (
                    <Link
                      href={`/app/documents/${event.document_id}`}
                      className="text-xs text-primary hover:underline mt-2 inline-block"
                    >
                      View document →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
