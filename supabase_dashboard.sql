-- Table contenus (packs, ebooks, bons plans, transferts)
CREATE TABLE IF NOT EXISTS contents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL, -- 'pack_institut' | 'pack_camp' | 'ebook' | 'bon_plan' | 'transfert'
  titre TEXT NOT NULL,
  sous_titre TEXT,
  description TEXT,
  prix TEXT,
  ancien_prix TEXT,
  badge TEXT,
  items JSONB DEFAULT '[]', -- liste des inclusions/caractéristiques
  image_url TEXT,
  ordre INTEGER DEFAULT 0,
  actif BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,
  extra JSONB DEFAULT '{}', -- champs spécifiques par type
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS contents_type_idx ON contents (type, actif, ordre);

-- Table paramètres du site (textes modifiables)
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Storage bucket pour les images (à créer dans l'interface Supabase)
-- Nom du bucket : site-images, public : true

-- Suivi des relances email
ALTER TABLE leads ADD COLUMN IF NOT EXISTS last_email_sent TIMESTAMPTZ;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS notes TEXT;

ALTER TABLE contents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "contents_read_public" ON contents FOR SELECT USING (actif = true);
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "settings_read_public" ON site_settings FOR SELECT USING (true);
-- Les écritures se font via la service_role key côté serveur uniquement
