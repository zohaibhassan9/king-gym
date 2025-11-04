#!/usr/bin/env node

/**
 * Automatic Database Setup
 * Creates tables directly using Supabase client
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('❌ Error: Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function createTables() {
  console.log('🚀 Creating Supabase tables...\n');

  // Read SQL file
  const sqlPath = join(__dirname, '..', 'supabase-migrations.sql');
  const sql = readFileSync(sqlPath, 'utf-8');

  // Since Supabase JS client doesn't support direct SQL execution,
  // we'll create a simple script that generates the SQL for manual execution
  // or we can use the Supabase REST API with proper authentication

  console.log('📋 Supabase Setup Instructions:\n');
  console.log('Since direct SQL execution requires Supabase Management API access,');
  console.log('please follow these steps:\n');
  
  const projectRef = SUPABASE_URL.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];
  
  console.log(`1. Go to: https://supabase.com/dashboard/project/${projectRef}`);
  console.log('2. Click on "SQL Editor" in the left sidebar');
  console.log('3. Click "New query"');
  console.log('4. Copy the SQL from: supabase-migrations.sql');
  console.log('5. Paste and click "Run"\n');
  
  console.log('📄 SQL to execute:\n');
  console.log('─'.repeat(60));
  console.log(sql);
  console.log('─'.repeat(60));
  console.log('\n✅ After running the SQL, your database will be ready!\n');
}

createTables();

