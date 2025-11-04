# Supabase Setup Guide

This guide will help you set up Supabase database for your King Gym project.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in your project details:
   - Project Name: `king-gym` (or any name you prefer)
   - Database Password: Choose a strong password (save it!)
   - Region: Choose the closest region to your users
4. Click "Create new project" and wait for it to be set up (usually takes 1-2 minutes)

## Step 2: Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. You'll find:
   - **Project URL** (this is your `NEXT_PUBLIC_SUPABASE_URL`)
   - **anon/public key** (this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
   - **service_role key** (this is your `SUPABASE_SERVICE_ROLE_KEY` - keep this secret!)

## Step 3: Create Environment Variables

Create a `.env.local` file in the root of your project:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

**Important:** Never commit `.env.local` to git. It should already be in `.gitignore`.

## Step 4: Create Database Tables in Supabase

1. Go to your Supabase project dashboard
2. Click on **SQL Editor** in the left sidebar
3. Click **New query**
4. Copy and paste the SQL from `supabase-migrations.sql`
5. Click **Run** to execute the SQL

## Step 5: Using Supabase in Your Code

All API routes have been updated to use Supabase. You can use either:

- `SupabaseDatabase` class (recommended):
```typescript
import { SupabaseDatabase } from '@/lib/supabase-database';
const members = await SupabaseDatabase.getMembers();
```

- `ServerDatabase` class (for backward compatibility - delegates to SupabaseDatabase):
```typescript
import { ServerDatabase } from '@/lib/server-database';
const members = await ServerDatabase.getMembers();
```

## Step 6: Test Your Setup

1. Start your development server: `npm run dev`
2. Try creating a member or viewing the dashboard
3. Check your Supabase dashboard → **Table Editor** to see if data is being created

## Database Schema

The Supabase database has the following tables:

- **members** - Gym members
- **payments** - Payment transactions
- **attendance** - Member attendance records

All tables are created using the SQL migration script in `supabase-migrations.sql`.

## Troubleshooting

### "Invalid API key" error
- Make sure your `.env.local` file has the correct keys
- Restart your development server after updating `.env.local`

### "relation does not exist" error
- Make sure you've created the tables in Supabase
- Check that table names match (Supabase uses snake_case by default)

### Connection issues
- Verify your Supabase project is active
- Check that your IP isn't blocked in Supabase settings
- Ensure your database password is correct

## Next Steps

- Consider setting up Row Level Security (RLS) policies in Supabase for better security
- Set up database backups in Supabase dashboard
- Configure environment-specific Supabase projects (dev, staging, production)

