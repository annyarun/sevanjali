-- ============================================================
-- Sevanjali — Blood Bank Tables
-- Run this in the Supabase SQL Editor to add blood bank support
-- ============================================================

CREATE TABLE blood_donors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  blood_group TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  location TEXT NOT NULL,
  available BOOLEAN DEFAULT true,
  last_donated_at DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE blood_donors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can register as donor"
  ON blood_donors FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin full access to blood_donors"
  ON blood_donors FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- -------------------------------------------------------

CREATE TABLE blood_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name TEXT NOT NULL,
  blood_group TEXT NOT NULL,
  units_needed INT NOT NULL DEFAULT 1,
  hospital TEXT NOT NULL,
  location TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  urgency TEXT NOT NULL DEFAULT 'normal',
  message TEXT,
  fulfilled BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE blood_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit blood request"
  ON blood_requests FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin full access to blood_requests"
  ON blood_requests FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);
