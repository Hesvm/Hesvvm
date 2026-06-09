-- Create statuses table for the public profile status bubble.
-- Run this once in the Supabase Dashboard SQL Editor.

CREATE TABLE IF NOT EXISTS statuses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('song', 'movie', 'game', 'book', 'manual')),
  title text NOT NULL,
  subtitle text,
  link text,
  photo text,
  is_active boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS statuses_single_active_idx
  ON statuses (is_active)
  WHERE is_active;

CREATE INDEX IF NOT EXISTS statuses_updated_at_idx
  ON statuses (updated_at DESC);

CREATE OR REPLACE FUNCTION set_statuses_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SET search_path = public;

DROP TRIGGER IF EXISTS statuses_updated_at_trigger ON statuses;
CREATE TRIGGER statuses_updated_at_trigger
  BEFORE UPDATE ON statuses
  FOR EACH ROW
  EXECUTE FUNCTION set_statuses_updated_at();

ALTER TABLE statuses ENABLE ROW LEVEL SECURITY;

REVOKE ALL PRIVILEGES ON TABLE statuses FROM anon, authenticated;
GRANT SELECT ON TABLE statuses TO anon, authenticated;

DROP POLICY IF EXISTS "Public can read active statuses" ON statuses;
CREATE POLICY "Public can read active statuses"
  ON statuses
  FOR SELECT
  USING (is_active = true);
