-- Sevanjali Admin Panel — Supabase Database Schema
-- Run this in Supabase SQL Editor to set up your tables

-- ============================================
-- Table: members (volunteers, donors, trustees)
-- ============================================
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'volunteer',
  notes TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- Table: activities
-- ============================================
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL DEFAULT 'healthcare',
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  detail_description TEXT,
  icon_name TEXT DEFAULT 'Heart',
  image_url TEXT,
  stats JSONB DEFAULT '[]'::jsonb,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- Table: events
-- ============================================
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  event_date DATE,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'Healthcare',
  image_url TEXT,
  is_upcoming BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- Row Level Security (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Public read access for active activities
CREATE POLICY "Public can view active activities"
  ON activities FOR SELECT
  USING (is_active = true);

-- Public read access for upcoming events
CREATE POLICY "Public can view upcoming events"
  ON events FOR SELECT
  USING (true);

-- Authenticated users (admin) can do everything
CREATE POLICY "Admin full access to activities"
  ON activities FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admin full access to events"
  ON events FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admin full access to members"
  ON members FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- ============================================
-- Seed Data: Existing Activities
-- ============================================
INSERT INTO activities (slug, type, title, description, detail_description, icon_name, stats, sort_order) VALUES
(
  'free-medical-camps',
  'healthcare',
  'Free Medical Camps',
  'Quality healthcare twice monthly for underprivileged families in Farangipete.',
  'Twice every month, Sevanjali organises free medical camps in Farangipete, providing quality healthcare to families who cannot afford regular medical consultations. Our camps include general check-ups, specialist consultations, and distribution of free medicines.',
  'Heart',
  '[{"label": "Camps Held", "value": "344+"}, {"label": "Frequency", "value": "Bi-monthly"}, {"label": "Patients Served", "value": "10,000+"}]'::jsonb,
  1
),
(
  'educational-scholarships',
  'education',
  'Educational Scholarships',
  'Merit and need-based support for engineering and higher education students.',
  'We provide merit-based and need-based scholarships to deserving students from economically weaker sections. Our scholarship programme has helped dozens of students pursue engineering, medical, and other higher education courses they otherwise could not afford.',
  'GraduationCap',
  '[{"label": "Students Supported", "value": "100+"}, {"label": "Fields Covered", "value": "Engineering, Medical & more"}, {"label": "Success Rate", "value": "95%"}]'::jsonb,
  2
),
(
  'blood-donation-camps',
  'healthcare',
  'Blood Donation Camps',
  'Regular drives replenishing blood banks across Dakshina Kannada.',
  'Regular blood donation camps are organised in collaboration with local hospitals and blood banks. These drives help maintain critical blood supplies across Dakshina Kannada district, saving countless lives in emergency situations.',
  'Droplets',
  '[{"label": "Drives Organised", "value": "50+"}, {"label": "Units Collected", "value": "5,000+"}, {"label": "Partner Hospitals", "value": "Multiple"}]'::jsonb,
  3
),
(
  'patient-assistance',
  'healthcare',
  'Patient Assistance',
  'Financial and emotional support for hospitalised patients who cannot afford care.',
  'For patients who are hospitalised and cannot afford treatment, Sevanjali steps in with financial and emotional support. We work with hospitals to negotiate costs and provide direct financial assistance to ensure no one is denied care due to poverty.',
  'HandHeart',
  '[{"label": "Patients Helped", "value": "500+"}, {"label": "Support Type", "value": "Financial & Emotional"}, {"label": "Response Time", "value": "Immediate"}]'::jsonb,
  4
),
(
  'free-health-cards',
  'healthcare',
  'Free Health Cards',
  'Green Cards giving underprivileged families access at partner hospitals.',
  'The Green Card programme provides underprivileged families with health cards that grant them access to subsidised or free treatment at partner hospitals. This ensures continuous healthcare access beyond our bi-monthly camp schedule.',
  'CreditCard',
  '[{"label": "Cards Issued", "value": "1,000+"}, {"label": "Partner Hospitals", "value": "Multiple"}, {"label": "Coverage", "value": "Comprehensive"}]'::jsonb,
  5
),
(
  'eye-dental-surgical',
  'healthcare',
  'Eye, Dental & Surgical',
  'Free specialist care for those who cannot afford eye, dental, or surgical treatment.',
  'Specialist camps for eye care, dental treatment, and minor surgical procedures are organised periodically. These camps bring specialist doctors to Farangipete, making expert medical care accessible to rural communities.',
  'Eye',
  '[{"label": "Specialist Camps", "value": "50+"}, {"label": "Surgeries Funded", "value": "200+"}, {"label": "Specialists Involved", "value": "Various"}]'::jsonb,
  6
);

-- ============================================
-- Seed Data: Existing Upcoming Events
-- ============================================
INSERT INTO events (title, date, location, description, type) VALUES
(
  'Free Medical Camp',
  '1st & 3rd Sunday of Every Month',
  'Farangipete Community Hall',
  'Regular bi-monthly free medical camp featuring general health check-ups, specialist consultations, and free medicine distribution for the community.',
  'Healthcare'
),
(
  'Blood Donation Drive',
  'To be announced',
  'Farangipete',
  'Upcoming blood donation drive in collaboration with local hospitals. Help save lives by donating blood.',
  'Healthcare'
),
(
  'Educational Felicitation',
  'To be announced',
  'Farangipete Community Hall',
  'Annual felicitation ceremony recognising academic achievements of scholarship recipients and honour students.',
  'Education'
),
(
  'Community Outreach Programme',
  'To be announced',
  'Various locations, Bantwal Taluk',
  'Ration distribution and welfare assistance for underprivileged families across the taluk.',
  'Community'
);

-- ============================================
-- Table: testimonials
-- ============================================
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  course TEXT NOT NULL,
  quote TEXT NOT NULL,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS for testimonials
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Anyone can view visible testimonials
CREATE POLICY "Public can view visible testimonials"
  ON testimonials FOR SELECT
  USING (is_visible = true);

-- Anyone can insert testimonials (students submit from public site)
CREATE POLICY "Anyone can submit testimonials"
  ON testimonials FOR INSERT
  WITH CHECK (true);

-- Admin full access
CREATE POLICY "Admin full access to testimonials"
  ON testimonials FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- Seed existing testimonials
INSERT INTO testimonials (name, course, quote) VALUES
('Divya Shanker', 'Engineering Student', 'I am pursuing my Engineering 2nd year in a reputed college in Mangalore. I belong to a very poor family and was unable to pay my fees. Sevanjali Prathishtana helped me with a scholarship and I am very grateful to Sri KK Punja sir and the entire team.'),
('Harinakshi Shetty', 'Scholarship Recipient', 'Thanks to Sevanjali Prathishtana and Sri Krishna Kumar Punja for the scholarship. My father is a daily wage worker and could not afford my college fees. This scholarship has given me hope and a future.'),
('Pavithra Lakshmi', 'Engineering Student', 'I am the first person in my family to attend college. The scholarship from Sevanjali Prathishtana made it possible. Sri KK Punja sir personally encouraged me and I will never forget his kindness.'),
('Navya Shetty', 'Scholarship Recipient', 'Sevanjali Prathishtana has been a blessing for our family. The financial support helped me continue my studies without interruption. I am forever thankful to Sri KK Punja sir.'),
('Vidhyashree', 'Higher Education Student', 'Coming from a single-parent household, education seemed like a distant dream. The scholarship from Sevanjali changed everything. I am now in my final year and look forward to giving back to society.'),
('Mamatha', 'Engineering Student', 'I was about to drop out due to financial constraints when Sevanjali stepped in. The scholarship not only paid my fees but also restored my confidence. Thank you Sri KK Punja sir.'),
('Reshma Gatty', 'Scholarship Recipient', 'The generosity of Sevanjali Prathishtana is unmatched. Their scholarship has helped me pursue my dream of becoming an engineer. I am proud to be associated with this great organisation.'),
('Pranam Kumar', 'Higher Education Student', 'Thanks to Sevanjali''s scholarship, I could focus on my studies rather than worrying about fees. Sri KK Punja sir''s vision for education empowerment is truly inspiring.'),
('Ramanath Amin', 'Scholarship Recipient', 'Sevanjali Prathishtana has done tremendous work in uplifting the community through education. The scholarship I received has changed the trajectory of my life.');

-- ============================================
-- Table: blood_donors
-- ============================================
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

-- Anyone can register as a donor (public form)
CREATE POLICY "Anyone can register as donor"
  ON blood_donors FOR INSERT
  WITH CHECK (true);

-- Admin full access
CREATE POLICY "Admin full access to blood_donors"
  ON blood_donors FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- ============================================
-- Table: blood_requests
-- ============================================
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

-- Anyone can submit a blood request (public form)
CREATE POLICY "Anyone can submit blood request"
  ON blood_requests FOR INSERT
  WITH CHECK (true);

-- Admin full access
CREATE POLICY "Admin full access to blood_requests"
  ON blood_requests FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);
