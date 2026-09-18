ALTER TABLE leads ADD COLUMN IF NOT EXISTS contact_consent BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS consent_version TEXT NOT NULL DEFAULT '';

CREATE INDEX IF NOT EXISTS leads_contact_consent_created_at_idx
  ON leads (contact_consent, created_at DESC);
