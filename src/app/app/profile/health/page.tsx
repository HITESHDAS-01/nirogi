"use client";

import { useState, useEffect } from "react";
import { loadProfile, saveProfile, defaultProfile } from "@/lib/profile-store";

export default function HealthProfilePage() {
  const [form, setForm] = useState(defaultProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadProfile().then((p) => {
      setForm(p);
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await saveProfile(form);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-border p-6 max-w-2xl">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3" />
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-border p-6 max-w-2xl"
    >
      <h2 className="text-lg font-semibold text-text mb-6">Health Data</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Height (cm)
            </label>
            <input
              type="number"
              value={form.height_cm}
              onChange={(e) => setForm({ ...form, height_cm: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="170"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Weight (kg)
            </label>
            <input
              type="number"
              value={form.weight_kg}
              onChange={(e) => setForm({ ...form, weight_kg: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="65"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1">
            Blood Group
          </label>
          <select
            value={form.blood_group}
            onChange={(e) => setForm({ ...form, blood_group: e.target.value })}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="">Select blood group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1">
            Allergies (comma-separated)
          </label>
          <input
            type="text"
            value={form.allergies}
            onChange={(e) => setForm({ ...form, allergies: e.target.value })}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            placeholder="Penicillin, Peanuts"
          />
        </div>

        <div className="border-t border-border pt-4 mt-4">
          <h3 className="text-md font-semibold text-text mb-4">
            Emergency Contact
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Contact Name
              </label>
              <input
                type="text"
                value={form.emergency_contact_name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    emergency_contact_name: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Emergency contact name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Contact Phone
              </label>
              <input
                type="tel"
                value={form.emergency_contact_phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    emergency_contact_phone: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary-light transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
        {saved && (
          <span className="text-sm text-risk-green font-medium">Saved!</span>
        )}
      </div>
    </form>
  );
}
