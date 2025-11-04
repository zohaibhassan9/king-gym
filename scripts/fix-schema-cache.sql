-- Fix Schema Cache Issue
-- Run this in Supabase SQL Editor to refresh the schema cache

-- Grant necessary permissions to postgres role
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;

-- Ensure tables are in public schema
ALTER TABLE IF EXISTS members SET SCHEMA public;
ALTER TABLE IF EXISTS payments SET SCHEMA public;
ALTER TABLE IF EXISTS attendance SET SCHEMA public;

-- Refresh PostgREST schema cache by querying the tables
SELECT 1 FROM members LIMIT 1;
SELECT 1 FROM payments LIMIT 1;
SELECT 1 FROM attendance LIMIT 1;

-- Notify PostgREST to reload schema (this happens automatically, but we can trigger it)
NOTIFY pgrst, 'reload schema';

