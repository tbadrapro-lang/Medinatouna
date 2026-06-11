-- Seed initial : reprend les données actuelles codées en dur dans le site
-- pour que le client parte de l'existant et puisse tout modifier depuis le dashboard.

-- Packs Institut
INSERT INTO contents (type, titre, prix, items, ordre, actif, featured) VALUES
('pack_institut', 'Pack Été', '995€', '["2 semaines intensives", "Hébergement inclus", "Cours en petit groupe", "Activités culturelles"]', 0, true, false),
('pack_institut', 'Intensif', '795€', '["1 semaine intensive", "Professeurs natifs", "Suivi personnalisé", "Certificat de niveau"]', 1, true, true),
('pack_institut', 'Famille', '1990€', '["2 semaines pour 2 personnes", "Hébergement familial", "Programme enfants", "Omra incluse"]', 2, true, false);

-- Packs Camp bédouin
INSERT INTO contents (type, titre, prix, items, ordre, actif, featured) VALUES
('pack_camp', 'Cavalier', '50€', '["Balade à cheval", "Goûter bédouin", "2h sur place"]', 0, true, false),
('pack_camp', 'Soirée', '50€', '["Dîner traditionnel", "Spectacle musical", "Veillée sous les étoiles"]', 1, true, false),
('pack_camp', 'Premium', '85€', '["Journée complète", "Toutes activités incluses", "Transport aller-retour"]', 2, true, true);

-- E-books
INSERT INTO contents (type, titre, sous_titre, description, prix, ancien_prix, badge, items, ordre, actif, featured, extra) VALUES
('ebook', 'Bons Plans à Médine', 'Guide PDF · Édition 2026',
 'Évite les erreurs coûteuses sur place. Gagne un temps précieux durant ton séjour et découvre les meilleures adresses avant même d''arriver.',
 '29,90 €', '49,90 €', 'Disponible',
 '["Prépare ton séjour : appartements, hôtels, guide Omra, visa en 30 min", "Découvre Médine : restaurants, visites, shopping, loisirs", "E-commerce : fournisseurs Abaya, Qamis, Musc", "Un pas vers la science : halaqat Coran, assises des savants, musées", "Laisse une œuvre : sadaqa Coran, eau, nourriture, parrainage orphelin"]',
 0, true, false,
 '{"id": "medine", "tagline": "+ de 50 bons plans", "badgeStyle": "disponible", "available": true}'),

('ebook', 'Bons Plans à la Mecque', 'Guide PDF · Édition 2026',
 'Toutes les adresses et astuces pour vivre ta Omra à la Mecque sereinement : hébergement, restaurants, transports, lieux historiques.',
 '29,90 €', '49,90 €', 'Bientôt disponible',
 '[]',
 1, true, false,
 '{"id": "mecque", "tagline": "Le complément indispensable", "badgeStyle": "bientot", "available": false, "waitlistService": "waitlist_ebook_mecque"}'),

('ebook', 'Pack Complet — Médine + Mecque', '2 Guides PDF · Édition 2026',
 'Les deux guides réunis : tout ce qu''il faut savoir pour ton séjour complet en Arabie. Rentabilisé dès les premiers jours sur place.',
 '49,90 €', '99,80 €', '🔥 Meilleure offre',
 '[]',
 2, true, true,
 '{"id": "pack", "tagline": "Économise 50%", "badgeStyle": "meilleure", "available": false, "waitlistService": "waitlist_pack"}');

-- Bons plans (à compléter par le client depuis le dashboard)
-- INSERT INTO contents (type, titre, description, ordre, actif) VALUES
-- ('bon_plan', 'Exemple de bon plan', 'Description du bon plan', 0, true);

-- Transferts (à compléter par le client depuis le dashboard)
-- INSERT INTO contents (type, titre, description, prix, ordre, actif) VALUES
-- ('transfert', 'Exemple de transfert', 'Description du transfert', '30€', 0, true);
