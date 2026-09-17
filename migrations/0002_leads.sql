CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  kind TEXT NOT NULL,
  qualification TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '',
  zip TEXT NOT NULL DEFAULT '',
  homeowner BOOLEAN NOT NULL DEFAULT FALSE,
  job_type TEXT NOT NULL DEFAULT '',
  size_band TEXT NOT NULL DEFAULT '',
  height_band TEXT NOT NULL DEFAULT '',
  budget_band TEXT NOT NULL DEFAULT '',
  timeline TEXT NOT NULL DEFAULT '',
  source TEXT NOT NULL DEFAULT '',
  notes TEXT NOT NULL DEFAULT '',
  estimate TEXT NOT NULL DEFAULT '',
  routing_status TEXT NOT NULL DEFAULT 'pending',
  routing_error TEXT NOT NULL DEFAULT '',
  routed_at TIMESTAMPTZ,
  booking_status TEXT NOT NULL DEFAULT 'not_requested'
);

CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_qualification_created_at_idx ON leads (qualification, created_at DESC);

CREATE TABLE IF NOT EXISTS lead_events (
  id TEXT PRIMARY KEY,
  lead_id TEXT NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  event_type TEXT NOT NULL,
  detail TEXT NOT NULL DEFAULT ''
);

CREATE INDEX IF NOT EXISTS lead_events_lead_id_created_at_idx ON lead_events (lead_id, created_at ASC);
