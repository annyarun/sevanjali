-- ============================================================
-- Sevanjali — Activity Updates (News Feed)
-- Run this in the Supabase SQL Editor
-- ============================================================

CREATE TABLE activity_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  photo_url TEXT,
  tag TEXT NOT NULL DEFAULT 'healthcare',
  -- tag values: healthcare | community | religious | education
  activity_date DATE NOT NULL DEFAULT CURRENT_DATE,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE activity_updates ENABLE ROW LEVEL SECURITY;

-- Public can read published updates
CREATE POLICY "Public can view published updates"
  ON activity_updates FOR SELECT
  USING (published = true);

-- Admin full access
CREATE POLICY "Admin full access to activity_updates"
  ON activity_updates FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);
