"use client";

import { useState, useEffect } from "react";
import { loadProfile, type ProfileData } from "@/lib/profile-store";

export default function EmergencyPage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile().then((p) => {
      setProfile(p);
      setLoading(false);
    });
  }, []);

  const bloodGroup = profile?.blood_group || "—";
  const allergies = profile?.allergies
    ? profile.allergies.split(",").map((a) => a.trim()).filter(Boolean)
    : [];
  const contactName = profile?.emergency_contact_name || "Not set";
  const contactPhone = profile?.emergency_contact_phone || "";
  const medicines = profile?.medicines?.filter((m) => m.medicine_name) || [];
  const conditions = profile?.conditions?.filter((c) => c.condition_name) || [];

  if (loading) {
    return (
      <div className="max-w-lg mx-auto space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2" />
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 space-y-4">
            <div className="h-12 bg-gray-200 rounded w-1/3 mx-auto" />
            <div className="h-6 bg-gray-200 rounded" />
            <div className="h-6 bg-gray-200 rounded" />
            <div className="h-6 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Emergency Card</h1>
        <p className="text-text-muted">
          Critical information accessible offline
        </p>
      </div>

      <div className="bg-white rounded-2xl border-2 border-risk-red overflow-hidden">
        <div className="bg-risk-red text-white px-6 py-4 text-center">
          <h2 className="text-xl font-bold">EMERGENCY INFORMATION</h2>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center">
            <p className="text-sm text-text-muted uppercase tracking-wide">
              Blood Group
            </p>
            <p className="text-4xl font-bold text-risk-red mt-1">
              {bloodGroup}
            </p>
          </div>

          <div className="border-t border-border pt-4">
            <p className="text-sm text-text-muted uppercase tracking-wide mb-2">
              Allergies
            </p>
            {allergies.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {allergies.map((a, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-risk-red/10 text-risk-red text-sm font-medium rounded"
                  >
                    {a}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-text font-medium">No allergies recorded</p>
            )}
          </div>

          <div className="border-t border-border pt-4">
            <p className="text-sm text-text-muted uppercase tracking-wide mb-2">
              Emergency Contact
            </p>
            <p className="text-text font-medium">{contactName}</p>
            {contactPhone && (
              <p className="text-primary font-semibold mt-1">{contactPhone}</p>
            )}
          </div>

          <div className="border-t border-border pt-4">
            <p className="text-sm text-text-muted uppercase tracking-wide mb-2">
              Current Medicines
            </p>
            {medicines.length > 0 ? (
              <ul className="space-y-1">
                {medicines.map((m, i) => (
                  <li key={i} className="text-text font-medium">
                    {m.medicine_name}
                    {m.dose && ` — ${m.dose}`}
                    {m.frequency && ` (${m.frequency})`}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-text font-medium">No medicines recorded</p>
            )}
          </div>

          <div className="border-t border-border pt-4">
            <p className="text-sm text-text-muted uppercase tracking-wide mb-2">
              Chronic Conditions
            </p>
            {conditions.length > 0 ? (
              <ul className="space-y-1">
                {conditions.map((c, i) => (
                  <li key={i} className="text-text font-medium">
                    {c.condition_name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-text font-medium">No conditions recorded</p>
            )}
          </div>
        </div>
      </div>

      <p className="text-xs text-text-muted text-center">
        Fill your profile and medical history to populate this card.
      </p>
    </div>
  );
}
