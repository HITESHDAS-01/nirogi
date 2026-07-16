import { createClient } from "@/lib/supabase/client";

export interface ProfileData {
  full_name: string;
  dob: string;
  gender: string;
  language: string;
  height_cm: string;
  weight_kg: string;
  blood_group: string;
  allergies: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  conditions: Array<{ condition_name: string; diagnosed_date: string; notes: string }>;
  medicines: Array<{ medicine_name: string; dose: string; frequency: string; prescribed_by: string; start_date: string }>;
  surgeries: Array<{ surgery_name: string; surgery_date: string; hospital: string; surgeon: string; notes: string }>;
  family_history: Array<{ relation: string; condition: string; notes: string }>;
}

export const defaultProfile: ProfileData = {
  full_name: "",
  dob: "",
  gender: "",
  language: "en",
  height_cm: "",
  weight_kg: "",
  blood_group: "",
  allergies: "",
  emergency_contact_name: "",
  emergency_contact_phone: "",
  conditions: [],
  medicines: [],
  surgeries: [],
  family_history: [],
};

async function getUserId(): Promise<string | null> {
  const supabase = createClient();
  if (!supabase) return null;
  const { data: { user } } = await supabase.auth.getUser();
  return user?.id ?? null;
}

export async function loadProfile(): Promise<ProfileData> {
  const userId = await getUserId();
  if (!userId) return defaultProfile;

  const supabase = createClient();
  if (!supabase) return defaultProfile;

  const [profileRes, healthRes, conditionsRes, medicinesRes, surgeriesRes, familyRes] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
    supabase.from("health_profiles").select("*").eq("user_id", userId).maybeSingle(),
    supabase.from("chronic_conditions").select("*").eq("user_id", userId).order("created_at", { ascending: true }),
    supabase.from("current_medicines").select("*").eq("user_id", userId).order("created_at", { ascending: true }),
    supabase.from("surgeries").select("*").eq("user_id", userId).order("created_at", { ascending: true }),
    supabase.from("family_history").select("*").eq("user_id", userId).order("created_at", { ascending: true }),
  ]);

  const p = profileRes.data;
  const h = healthRes.data;

  return {
    full_name: p?.full_name ?? "",
    dob: p?.dob ?? "",
    gender: p?.gender ?? "",
    language: p?.language ?? "en",
    height_cm: h?.height_cm?.toString() ?? "",
    weight_kg: h?.weight_kg?.toString() ?? "",
    blood_group: h?.blood_group ?? "",
    allergies: Array.isArray(h?.allergies) ? h.allergies.join(", ") : (h?.allergies ?? ""),
    emergency_contact_name: h?.emergency_contact_name ?? "",
    emergency_contact_phone: h?.emergency_contact_phone ?? "",
    conditions: (conditionsRes.data ?? []).map((c: Record<string, unknown>) => ({
      condition_name: (c.condition_name as string) ?? "",
      diagnosed_date: (c.diagnosed_date as string) ?? "",
      notes: (c.notes as string) ?? "",
    })),
    medicines: (medicinesRes.data ?? []).map((m: Record<string, unknown>) => ({
      medicine_name: (m.medicine_name as string) ?? "",
      dose: (m.dose as string) ?? "",
      frequency: (m.frequency as string) ?? "",
      prescribed_by: (m.prescribed_by as string) ?? "",
      start_date: (m.start_date as string) ?? "",
    })),
    surgeries: (surgeriesRes.data ?? []).map((s: Record<string, unknown>) => ({
      surgery_name: (s.surgery_name as string) ?? "",
      surgery_date: (s.surgery_date as string) ?? "",
      hospital: (s.hospital as string) ?? "",
      surgeon: (s.surgeon as string) ?? "",
      notes: (s.notes as string) ?? "",
    })),
    family_history: (familyRes.data ?? []).map((f: Record<string, unknown>) => ({
      relation: (f.relation as string) ?? "",
      condition: (f.condition as string) ?? "",
      notes: (f.notes as string) ?? "",
    })),
  };
}

export async function saveProfile(profile: ProfileData): Promise<boolean> {
  const userId = await getUserId();
  if (!userId) return false;

  const supabase = createClient();
  if (!supabase) return false;

  const allergiesArray = profile.allergies
    ? profile.allergies.split(",").map((a) => a.trim()).filter(Boolean)
    : [];

  // Upsert profile
  await supabase.from("profiles").upsert({
    id: userId,
    full_name: profile.full_name,
    dob: profile.dob || null,
    gender: profile.gender,
    language: profile.language,
  });

  // Upsert health profile
  await supabase.from("health_profiles").upsert({
    user_id: userId,
    height_cm: profile.height_cm ? Number(profile.height_cm) : null,
    weight_kg: profile.weight_kg ? Number(profile.weight_kg) : null,
    blood_group: profile.blood_group || null,
    allergies: allergiesArray,
    emergency_contact_name: profile.emergency_contact_name || null,
    emergency_contact_phone: profile.emergency_contact_phone || null,
  }, { onConflict: "user_id" });

  // Replace conditions
  await supabase.from("chronic_conditions").delete().eq("user_id", userId);
  if (profile.conditions.length > 0) {
    await supabase.from("chronic_conditions").insert(
      profile.conditions.filter((c) => c.condition_name).map((c) => ({
        user_id: userId,
        condition_name: c.condition_name,
        diagnosed_date: c.diagnosed_date || null,
        notes: c.notes || null,
      }))
    );
  }

  // Replace medicines
  await supabase.from("current_medicines").delete().eq("user_id", userId);
  if (profile.medicines.length > 0) {
    await supabase.from("current_medicines").insert(
      profile.medicines.filter((m) => m.medicine_name).map((m) => ({
        user_id: userId,
        medicine_name: m.medicine_name,
        dose: m.dose || null,
        frequency: m.frequency || null,
        prescribed_by: m.prescribed_by || null,
        start_date: m.start_date || null,
      }))
    );
  }

  // Replace surgeries
  await supabase.from("surgeries").delete().eq("user_id", userId);
  if (profile.surgeries.length > 0) {
    await supabase.from("surgeries").insert(
      profile.surgeries.filter((s) => s.surgery_name).map((s) => ({
        user_id: userId,
        surgery_name: s.surgery_name,
        surgery_date: s.surgery_date || null,
        hospital: s.hospital || null,
        surgeon: s.surgeon || null,
        notes: s.notes || null,
      }))
    );
  }

  // Replace family history
  await supabase.from("family_history").delete().eq("user_id", userId);
  if (profile.family_history.length > 0) {
    await supabase.from("family_history").insert(
      profile.family_history.filter((f) => f.condition).map((f) => ({
        user_id: userId,
        relation: f.relation || null,
        condition: f.condition,
        notes: f.notes || null,
      }))
    );
  }

  return true;
}
