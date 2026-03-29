-- ============================================================
-- Sevanjali — Content Enrichment Migration
-- Run this in the Supabase SQL Editor if the database already
-- exists and you want to enrich it with the full content from
-- the old website.
-- ============================================================

-- ------------------------------------------------------------
-- 1. Update activity descriptions with richer content
-- ------------------------------------------------------------
UPDATE activities SET
  description        = 'Bi-monthly free medical camps providing specialist consultations, medicines, and health screenings to underserved communities.',
  detail_description = 'Sevanjali Prathishtana has conducted 344+ free medical camps since 1993 in partnership with Rotary Club Bantwal and Justice KS Hegde Charitable Hospital. Each camp features specialist doctors covering general medicine, orthopaedics, ophthalmology, ENT, and gynaecology. The Green Card scheme provides eligible patients ongoing free treatment at partner hospitals.',
  stats              = '[{"label": "Camps Conducted", "value": "344+"}, {"label": "Patients Served", "value": "10,000+"}]'::jsonb
WHERE slug = 'free-medical-camps';

UPDATE activities SET
  description        = 'Merit-cum-need scholarships helping students from underprivileged families pursue engineering and higher education.',
  detail_description = 'Under the personal initiative of founder Sri KK Punja, Sevanjali distributes scholarships worth ₹3.5 lakh annually to deserving students. The programme has supported hundreds of students from families below the poverty line, enabling them to pursue professional degrees.',
  stats              = '[{"label": "Scholarships Given", "value": "100+"}, {"label": "Annual Budget", "value": "₹3.5L"}]'::jsonb
WHERE slug = 'educational-scholarships';

UPDATE activities SET
  description        = 'Regular blood donation camps replenishing blood banks across Dakshina Kannada district.',
  detail_description = 'Sevanjali recently completed its 110th blood donation camp — a milestone achieved through consistent community mobilisation. The drives are organised in partnership with district hospitals and have saved countless lives by maintaining critical blood supply.',
  stats              = '[{"label": "Camps Held", "value": "110+"}, {"label": "Units Collected", "value": "5,000+"}]'::jsonb
WHERE slug = 'blood-donation-camps';

UPDATE activities SET
  description        = 'Financial assistance and medicines for hospitalised patients who cannot afford treatment costs.',
  detail_description = 'Sevanjali directly covers treatment expenses for patients in critical need — including surgery costs, medicines, and post-operative care. Cases are referred through the Green Card scheme and partner hospitals.',
  stats              = '[{"label": "Patients Assisted", "value": "500+"}]'::jsonb
WHERE slug = 'patient-assistance';

UPDATE activities SET
  description        = 'Green Cards giving underprivileged families access to free treatment at partner hospitals.',
  detail_description = 'The Green Card scheme is a landmark initiative that provides identified underprivileged families with access to free outpatient and inpatient treatment at empanelled hospitals. Beneficiaries receive year-round healthcare without worrying about costs.'
WHERE slug = 'free-health-cards';

UPDATE activities SET
  description        = 'Free specialist care for those who cannot afford eye, dental, or surgical treatment.',
  detail_description = 'Beyond general medicine, Sevanjali organises dedicated camps for eye care (cataract surgeries, spectacle distribution), dental treatment (extractions, fillings), and surgical procedures for patients identified through partner hospitals and community referrals.'
WHERE slug = 'eye-dental-surgical';

-- ------------------------------------------------------------
-- 2. Delete old 3-entry testimonials and re-seed all 9
--    (safe to run — clears only the seeded ones if they match)
-- ------------------------------------------------------------
DELETE FROM testimonials
WHERE name IN (
  'Divya Shanker', 'Harinakshi Shetty', 'Pavithra Lakshmi',
  'Navya Shetty', 'Vidhyashree', 'Mamatha',
  'Reshma Gatty', 'Pranam Kumar', 'Ramanath Amin'
);

INSERT INTO testimonials (name, course, quote, is_visible) VALUES
('Divya Shanker',   'Engineering Student',       'I am pursuing my Engineering 2nd year in a reputed college in Mangalore. I belong to a very poor family and was unable to pay my fees. Sevanjali Prathishtana helped me with a scholarship and I am very grateful to Sri KK Punja sir and the entire team.', true),
('Harinakshi Shetty','Scholarship Recipient',     'Thanks to Sevanjali Prathishtana and Sri Krishna Kumar Punja for the scholarship. My father is a daily wage worker and could not afford my college fees. This scholarship has given me hope and a future.', true),
('Pavithra Lakshmi', 'Engineering Student',       'I am the first person in my family to attend college. The scholarship from Sevanjali Prathishtana made it possible. Sri KK Punja sir personally encouraged me and I will never forget his kindness.', true),
('Navya Shetty',     'Scholarship Recipient',     'Sevanjali Prathishtana has been a blessing for our family. The financial support helped me continue my studies without interruption. I am forever thankful to Sri KK Punja sir.', true),
('Vidhyashree',      'Higher Education Student',  'Coming from a single-parent household, education seemed like a distant dream. The scholarship from Sevanjali changed everything. I am now in my final year and look forward to giving back to society.', true),
('Mamatha',          'Engineering Student',       'I was about to drop out due to financial constraints when Sevanjali stepped in. The scholarship not only paid my fees but also restored my confidence. Thank you Sri KK Punja sir.', true),
('Reshma Gatty',     'Scholarship Recipient',     'The generosity of Sevanjali Prathishtana is unmatched. Their scholarship has helped me pursue my dream of becoming an engineer. I am proud to be associated with this great organisation.', true),
('Pranam Kumar',     'Higher Education Student',  'Thanks to Sevanjali''s scholarship, I could focus on my studies rather than worrying about fees. Sri KK Punja sir''s vision for education empowerment is truly inspiring.', true),
('Ramanath Amin',    'Scholarship Recipient',     'Sevanjali Prathishtana has done tremendous work in uplifting the community through education. The scholarship I received has changed the trajectory of my life.', true);
