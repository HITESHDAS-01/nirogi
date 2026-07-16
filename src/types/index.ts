export interface Profile {
  id: string;
  full_name: string | null;
  dob: string | null;
  gender: string | null;
  language: string;
  avatar_url: string | null;
  created_at: string;
}

export interface HealthProfile {
  id: string;
  user_id: string;
  height_cm: number | null;
  weight_kg: number | null;
  blood_group: string | null;
  allergies: string[];
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  updated_at: string;
}

export interface ChronicCondition {
  id: string;
  user_id: string;
  condition_name: string;
  diagnosed_date: string | null;
  notes: string | null;
  is_active: boolean;
  created_at: string;
}

export interface CurrentMedicine {
  id: string;
  user_id: string;
  medicine_name: string;
  dose: string | null;
  frequency: string | null;
  prescribed_by: string | null;
  start_date: string | null;
  end_date: string | null;
  is_active: boolean;
  notes: string | null;
  created_at: string;
}

export interface Surgery {
  id: string;
  user_id: string;
  surgery_name: string;
  surgery_date: string | null;
  hospital: string | null;
  surgeon: string | null;
  notes: string | null;
  created_at: string;
}

export interface FamilyHistory {
  id: string;
  user_id: string;
  relation: string | null;
  condition: string | null;
  notes: string | null;
  created_at: string;
}

export interface Document {
  id: string;
  user_id: string;
  file_url: string;
  file_name: string;
  file_type: string | null;
  file_size_kb: number | null;
  doc_type: string | null;
  doc_date: string | null;
  hospital_name: string | null;
  doctor_name: string | null;
  processing_status: "pending" | "processing" | "done" | "failed";
  created_at: string;
}

export interface DocumentExtraction {
  id: string;
  document_id: string;
  user_id: string;
  extracted_data: Record<string, unknown>;
  explanation_en: string | null;
  explanation_hi: string | null;
  explanation_as: string | null;
  risk_level: "green" | "yellow" | "red";
  key_findings: Array<{
    test: string;
    value: string;
    unit: string;
    normal_range: string;
    status: "normal" | "borderline" | "abnormal";
  }>;
  medicines_found: Array<{
    name: string;
    dose: string;
    frequency: string;
  }>;
  follow_up_date: string | null;
  follow_up_notes: string | null;
  diagnosis_noted: string | null;
  ai_model_used: string | null;
  created_at: string;
}

export interface HealthMetric {
  id: string;
  user_id: string;
  metric_type: string;
  value: number;
  unit: string | null;
  recorded_at: string;
  source: "manual" | "document";
  document_id: string | null;
}

export interface TimelineEvent {
  id: string;
  user_id: string;
  event_type: string;
  event_date: string;
  title: string;
  description: string | null;
  document_id: string | null;
  created_at: string;
}

export interface AiConversation {
  id: string;
  user_id: string;
  messages: Array<{
    role: "user" | "assistant";
    content: string;
    timestamp: string;
  }>;
  created_at: string;
  updated_at: string;
}

export interface FollowUp {
  id: string;
  user_id: string;
  document_id: string | null;
  doctor_name: string | null;
  due_date: string;
  notes: string | null;
  is_completed: boolean;
  created_at: string;
}

export type DocType =
  | "prescription"
  | "blood_report"
  | "urine_report"
  | "xray"
  | "mri"
  | "ct"
  | "ecg"
  | "ultrasound"
  | "discharge_summary"
  | "vaccination"
  | "insurance"
  | "bill"
  | "other";

export type RiskLevel = "green" | "yellow" | "red";

export type MetricType =
  | "weight"
  | "bp_systolic"
  | "bp_diastolic"
  | "sugar_fasting"
  | "sugar_pp"
  | "hba1c"
  | "spo2";

export type EventType =
  | "document_upload"
  | "diagnosis"
  | "medicine_start"
  | "medicine_stop"
  | "surgery"
  | "metric_recorded"
  | "follow_up";

export const DOC_TYPE_LABELS: Record<DocType, string> = {
  prescription: "Prescription",
  blood_report: "Blood Report",
  urine_report: "Urine Report",
  xray: "X-Ray",
  mri: "MRI",
  ct: "CT Scan",
  ecg: "ECG",
  ultrasound: "Ultrasound",
  discharge_summary: "Discharge Summary",
  vaccination: "Vaccination",
  insurance: "Insurance",
  bill: "Bill",
  other: "Other",
};

export const METRIC_TYPE_LABELS: Record<MetricType, string> = {
  weight: "Weight",
  bp_systolic: "BP Systolic",
  bp_diastolic: "BP Diastolic",
  sugar_fasting: "Fasting Sugar",
  sugar_pp: "Post-Prandial Sugar",
  hba1c: "HbA1c",
  spo2: "SpO2",
};

export const EVENT_TYPE_ICONS: Record<EventType, string> = {
  document_upload: "📄",
  diagnosis: "🏥",
  medicine_start: "💊",
  medicine_stop: "💊",
  surgery: "🏥",
  metric_recorded: "📊",
  follow_up: "🗓️",
};
