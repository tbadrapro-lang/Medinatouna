-- Table leads (CRM inscriptions)
CREATE TABLE IF NOT EXISTS leads (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom         TEXT,
  email       TEXT NOT NULL,
  whatsapp    TEXT,
  service     TEXT NOT NULL,
  formule     TEXT,
  message     TEXT,
  date_souhait TEXT,
  source      TEXT DEFAULT 'site_web',
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  contacted   BOOLEAN DEFAULT FALSE,
  notes       TEXT
);

-- Index email pour recherches rapides
CREATE INDEX IF NOT EXISTS leads_email_idx ON leads (email);
CREATE INDEX IF NOT EXISTS leads_service_idx ON leads (service);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);

-- Row Level Security (désactiver pour le dashboard admin simple)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy: insert pour tous (formulaires publics)
CREATE POLICY "leads_insert" ON leads FOR INSERT WITH CHECK (true);

-- Policy: select/update uniquement avec service role (admin)
CREATE POLICY "leads_select" ON leads FOR SELECT USING (false);

-- Vue admin (à utiliser avec la service key)
-- SELECT * FROM leads ORDER BY created_at DESC;
