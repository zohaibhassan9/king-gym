# Fix Supabase Schema Cache Issue

If you're getting the error: **"Could not find the table 'public.members' in the schema cache"**, follow these steps:

## Solution 1: Refresh Schema Cache (Recommended)

1. **Go to Supabase Dashboard** → Your Project → **SQL Editor**
2. **Copy and paste this SQL** and run it:

```sql
-- Refresh schema cache
NOTIFY pgrst, 'reload schema';
```

3. **Wait 30-60 seconds** for the cache to refresh
4. **Restart your Next.js dev server**

## Solution 2: Verify Tables Exist

1. Go to **Supabase Dashboard** → **Table Editor**
2. Verify you can see:
   - `members` table
   - `payments` table  
   - `attendance` table

If tables don't exist, run the `supabase-migrations.sql` file in SQL Editor.

## Solution 3: Check API Settings

1. Go to **Settings** → **API** (Data API section)
2. Verify **"public"** is in the **"Exposed schemas"** list
3. If not, add it:
   - Click "Select schemas for Data API..."
   - Select "public"
   - Save

## Solution 4: Grant Permissions

Run this SQL in Supabase SQL Editor:

```sql
-- Grant permissions
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;
```

## Solution 5: Recreate Tables (Last Resort)

If nothing works, you can drop and recreate the tables:

1. **Backup your data first** (if any)
2. Run the updated `supabase-migrations.sql` which now explicitly uses `public.members`, etc.
3. Wait 1-2 minutes for cache to refresh

## Why This Happens

Supabase uses PostgREST which maintains a schema cache. When tables are created:
- The cache needs time to refresh (usually 1-2 minutes)
- Sometimes it needs to be manually triggered
- Tables must be in an "exposed schema" (usually "public")

## Quick Test

After applying fixes, test with:

```bash
node scripts/refresh-schema-cache.js
```

This should show all tables as accessible.

