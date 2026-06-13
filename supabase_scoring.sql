-- Scoring chaud/froid des leads + séquences de relance
ALTER TABLE leads ADD COLUMN IF NOT EXISTS temperature TEXT DEFAULT 'froid';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS relance_count INTEGER DEFAULT 0;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS last_relance_type TEXT;

-- Textes éditables du site (fallback géré côté code si absent)
INSERT INTO site_settings (key, value) VALUES
  ('hero_titre', 'Vivez l''Arabie'),
  ('hero_titre_accent', 'de l''intérieur.'),
  ('hero_tagline', 'Institut de langue arabe agréé à Médine, camp bédouin dans le désert, e-books et adresses confidentielles. Omra incluse, professeurs natifs.'),
  ('hero_arabic', 'الخطط الرائعة من الجزيرة العربية'),
  ('hero_bg_image', '/hero-masjid-nabawi.jpg'),
  ('institut_titre', 'Centre Medinatouna à Médine'),
  ('institut_description', 'Medinatouna vous propose un apprentissage de l''arabe selon la méthode égyptienne, reconnue pour son efficacité, structurée en 12 niveaux pédagogiques progressifs allant du débutant complet jusqu''à un niveau avancé de maîtrise.

Au-delà des cours, notre mission est d''offrir un accompagnement humain complet : de la préparation de votre voyage jusqu''à votre quotidien à Médine, notre équipe est présente à chaque étape pour que vous puissiez vous concentrer sur l''essentiel — votre apprentissage et votre expérience spirituelle.

Installé au cœur de la ville du Prophète, notre centre vous offre un cadre serein, respectueux et propice à la concentration, dans une ambiance bienveillante entre étudiants venus du monde entier.'),
  ('camp_titre', 'Le camp bédouin'),
  ('camp_description', 'À quelques encablures de Médine, notre partenaire PrestaArabia vous ouvre les portes d''un campement privé niché au cœur du désert d''Arabie. Loin de l''agitation de la ville, vous y découvrirez l''hospitalité authentique des Bédouins.'),
  ('vision2030_titre', 'Médine au cœur d''une Arabie qui se transforme'),
  ('vision2030_texte', 'L''Arabie Saoudite vit une transformation historique avec la Vision 2030 : ouverture au tourisme, infrastructures modernes, accueil renforcé des pèlerins et visiteurs. C''est le moment idéal pour vivre Médine de l''intérieur — entre tradition préservée et modernité accueillante.')
ON CONFLICT (key) DO NOTHING;
