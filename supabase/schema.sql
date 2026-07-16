-- ============================================
-- Nirogi Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Profiles (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  dob DATE,
  gender TEXT,
  language TEXT DEFAULT 'en',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Health Profile
CREATE TABLE IF NOT EXISTS health_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  height_cm NUMERIC,
  weight_kg NUMERIC,
  blood_group TEXT,
  allergies TEXT[] DEFAULT '{}',
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Chronic Conditions
CREATE TABLE IF NOT EXISTS chronic_conditions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  condition_name TEXT NOT NULL,
  diagnosed_date DATE,
  notes TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Current Medicines
CREATE TABLE IF NOT EXISTS current_medicines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  medicine_name TEXT NOT NULL,
  dose TEXT,
  frequency TEXT,
  prescribed_by TEXT,
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT true,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Surgeries
CREATE TABLE IF NOT EXISTS surgeries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  surgery_name TEXT NOT NULL,
  surgery_date DATE,
  hospital TEXT,
  surgeon TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Family History
CREATE TABLE IF NOT EXISTS family_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  relation TEXT,
  condition TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Documents
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT,
  file_size_kb INTEGER,
  doc_type TEXT,
  doc_date DATE,
  hospital_name TEXT,
  doctor_name TEXT,
  processing_status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Document Extractions
CREATE TABLE IF NOT EXISTS document_extractions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  extracted_data JSONB,
  explanation_en TEXT,
  explanation_hi TEXT,
  explanation_as TEXT,
  risk_level TEXT DEFAULT 'green',
  key_findings JSONB DEFAULT '[]',
  medicines_found JSONB DEFAULT '[]',
  follow_up_date DATE,
  follow_up_notes TEXT,
  diagnosis_noted TEXT,
  ai_model_used TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Health Metrics
CREATE TABLE IF NOT EXISTS health_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  metric_type TEXT NOT NULL,
  value NUMERIC NOT NULL,
  unit TEXT,
  recorded_at TIMESTAMPTZ DEFAULT now(),
  source TEXT DEFAULT 'manual',
  document_id UUID REFERENCES documents(id)
);

-- Timeline Events
CREATE TABLE IF NOT EXISTS timeline_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_date DATE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  document_id UUID REFERENCES documents(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- AI Conversations
CREATE TABLE IF NOT EXISTS ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  messages JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Follow-ups
CREATE TABLE IF NOT EXISTS follow_ups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  document_id UUID REFERENCES documents(id),
  doctor_name TEXT,
  due_date DATE NOT NULL,
  notes TEXT,
  is_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- RLS Policies
-- ============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE chronic_conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE current_medicines ENABLE ROW LEVEL SECURITY;
ALTER TABLE surgeries ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_extractions ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE follow_ups ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read/update own profile
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Health Profiles
CREATE POLICY "Users can view own health profile" ON health_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own health profile" ON health_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own health profile" ON health_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Chronic Conditions
CREATE POLICY "Users can view own conditions" ON chronic_conditions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own conditions" ON chronic_conditions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own conditions" ON chronic_conditions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own conditions" ON chronic_conditions FOR DELETE USING (auth.uid() = user_id);

-- Current Medicines
CREATE POLICY "Users can view own medicines" ON current_medicines FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own medicines" ON current_medicines FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own medicines" ON current_medicines FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own medicines" ON current_medicines FOR DELETE USING (auth.uid() = user_id);

-- Surgeries
CREATE POLICY "Users can view own surgeries" ON surgeries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own surgeries" ON surgeries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own surgeries" ON surgeries FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own surgeries" ON surgeries FOR DELETE USING (auth.uid() = user_id);

-- Family History
CREATE POLICY "Users can view own family history" ON family_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own family history" ON family_history FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own family history" ON family_history FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own family history" ON family_history FOR DELETE USING (auth.uid() = user_id);

-- Documents
CREATE POLICY "Users can view own documents" ON documents FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own documents" ON documents FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own documents" ON documents FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own documents" ON documents FOR DELETE USING (auth.uid() = user_id);

-- Document Extractions
CREATE POLICY "Users can view own extractions" ON document_extractions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own extractions" ON document_extractions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Health Metrics
CREATE POLICY "Users can view own metrics" ON health_metrics FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own metrics" ON health_metrics FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own metrics" ON health_metrics FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own metrics" ON health_metrics FOR DELETE USING (auth.uid() = user_id);

-- Timeline Events
CREATE POLICY "Users can view own timeline" ON timeline_events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own timeline" ON timeline_events FOR INSERT WITH CHECK (auth.uid() = user_id);

-- AI Conversations
CREATE POLICY "Users can view own conversations" ON ai_conversations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own conversations" ON ai_conversations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own conversations" ON ai_conversations FOR UPDATE USING (auth.uid() = user_id);

-- Follow-ups
CREATE POLICY "Users can view own follow_ups" ON follow_ups FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own follow_ups" ON follow_ups FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own follow_ups" ON follow_ups FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own follow_ups" ON follow_ups FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- Auto-create profile on signup
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
