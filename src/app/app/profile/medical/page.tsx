"use client";

import { useState, useEffect } from "react";
import { loadProfile, updateProfile, type ProfileData } from "@/lib/profile-store";

export default function MedicalProfilePage() {
  const [conditions, setConditions] = useState<Record<string, string>[]>([]);
  const [medicines, setMedicines] = useState<Record<string, string>[]>([]);
  const [surgeries, setSurgeries] = useState<Record<string, string>[]>([]);
  const [familyHistory, setFamilyHistory] = useState<Record<string, string>[]>(
    []
  );
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const profile = loadProfile();
    setConditions(profile.conditions);
    setMedicines(profile.medicines);
    setSurgeries(profile.surgeries);
    setFamilyHistory(profile.family_history);
  }, []);

  const handleSave = () => {
    updateProfile({
      conditions: conditions as ProfileData["conditions"],
      medicines: medicines as ProfileData["medicines"],
      surgeries: surgeries as ProfileData["surgeries"],
      family_history: familyHistory as ProfileData["family_history"],
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <Section
        title="Chronic Conditions"
        items={conditions}
        onAdd={() =>
          setConditions([
            ...conditions,
            { condition_name: "", diagnosed_date: "", notes: "" },
          ])
        }
        onRemove={(i) =>
          setConditions(conditions.filter((_, idx) => idx !== i))
        }
        onUpdate={(i, field, value) =>
          setConditions(
            conditions.map((c, idx) =>
              idx === i ? { ...c, [field]: value } : c
            )
          )
        }
        fields={[
          {
            key: "condition_name",
            label: "Condition",
            type: "text",
            placeholder: "e.g., Diabetes Type 2",
          },
          { key: "diagnosed_date", label: "Diagnosed Date", type: "date" },
          {
            key: "notes",
            label: "Notes",
            type: "text",
            placeholder: "Additional notes",
          },
        ]}
      />

      <Section
        title="Current Medicines"
        items={medicines}
        onAdd={() =>
          setMedicines([
            ...medicines,
            {
              medicine_name: "",
              dose: "",
              frequency: "",
              prescribed_by: "",
              start_date: "",
            },
          ])
        }
        onRemove={(i) =>
          setMedicines(medicines.filter((_, idx) => idx !== i))
        }
        onUpdate={(i, field, value) =>
          setMedicines(
            medicines.map((m, idx) =>
              idx === i ? { ...m, [field]: value } : m
            )
          )
        }
        fields={[
          {
            key: "medicine_name",
            label: "Medicine Name",
            type: "text",
            placeholder: "e.g., Metformin",
          },
          { key: "dose", label: "Dose", type: "text", placeholder: "e.g., 500mg" },
          {
            key: "frequency",
            label: "Frequency",
            type: "text",
            placeholder: "e.g., Twice daily",
          },
          {
            key: "prescribed_by",
            label: "Prescribed By",
            type: "text",
            placeholder: "Doctor name",
          },
          { key: "start_date", label: "Start Date", type: "date" },
        ]}
      />

      <Section
        title="Surgeries"
        items={surgeries}
        onAdd={() =>
          setSurgeries([
            ...surgeries,
            {
              surgery_name: "",
              surgery_date: "",
              hospital: "",
              surgeon: "",
              notes: "",
            },
          ])
        }
        onRemove={(i) =>
          setSurgeries(surgeries.filter((_, idx) => idx !== i))
        }
        onUpdate={(i, field, value) =>
          setSurgeries(
            surgeries.map((s, idx) =>
              idx === i ? { ...s, [field]: value } : s
            )
          )
        }
        fields={[
          {
            key: "surgery_name",
            label: "Surgery",
            type: "text",
            placeholder: "e.g., Appendectomy",
          },
          { key: "surgery_date", label: "Date", type: "date" },
          {
            key: "hospital",
            label: "Hospital",
            type: "text",
            placeholder: "Hospital name",
          },
          {
            key: "surgeon",
            label: "Surgeon",
            type: "text",
            placeholder: "Surgeon name",
          },
          {
            key: "notes",
            label: "Notes",
            type: "text",
            placeholder: "Additional notes",
          },
        ]}
      />

      <Section
        title="Family History"
        items={familyHistory}
        onAdd={() =>
          setFamilyHistory([
            ...familyHistory,
            { relation: "", condition: "", notes: "" },
          ])
        }
        onRemove={(i) =>
          setFamilyHistory(familyHistory.filter((_, idx) => idx !== i))
        }
        onUpdate={(i, field, value) =>
          setFamilyHistory(
            familyHistory.map((f, idx) =>
              idx === i ? { ...f, [field]: value } : f
            )
          )
        }
        fields={[
          {
            key: "relation",
            label: "Relation",
            type: "text",
            placeholder: "e.g., Father",
          },
          {
            key: "condition",
            label: "Condition",
            type: "text",
            placeholder: "e.g., Heart Disease",
          },
          {
            key: "notes",
            label: "Notes",
            type: "text",
            placeholder: "Additional notes",
          },
        ]}
      />

      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          className="px-6 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary-light transition-colors"
        >
          Save Changes
        </button>
        {saved && (
          <span className="text-sm text-risk-green font-medium">Saved!</span>
        )}
      </div>
    </div>
  );
}

function Section({
  title,
  items,
  onAdd,
  onRemove,
  onUpdate,
  fields,
}: {
  title: string;
  items: Record<string, string>[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, field: string, value: string) => void;
  fields: Array<{
    key: string;
    label: string;
    type: string;
    placeholder?: string;
  }>;
}) {
  return (
    <div className="bg-white rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text">{title}</h2>
        <button
          onClick={onAdd}
          className="text-sm text-primary font-medium hover:underline"
        >
          + Add
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-text-muted">No items added yet.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="p-4 rounded-lg border border-border bg-surface-alt space-y-3"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {fields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-xs font-medium text-text-muted mb-1">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      value={item[field.key] || ""}
                      onChange={(e) => onUpdate(i, field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full px-3 py-1.5 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={() => onRemove(i)}
                className="text-xs text-risk-red font-medium hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
