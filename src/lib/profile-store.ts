const PROFILE_KEY = "nirogi-profile";

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

const defaultProfile: ProfileData = {
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

export function loadProfile(): ProfileData {
  if (typeof window === "undefined") return defaultProfile;
  try {
    const data = localStorage.getItem(PROFILE_KEY);
    return data ? { ...defaultProfile, ...JSON.parse(data) } : defaultProfile;
  } catch {
    return defaultProfile;
  }
}

export function saveProfile(profile: ProfileData) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch {}
}

export function updateProfile(partial: Partial<ProfileData>) {
  const current = loadProfile();
  saveProfile({ ...current, ...partial });
}
