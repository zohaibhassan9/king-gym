#!/usr/bin/env node

/**
 * Simple Database Setup Script
 * Uses fetch to execute SQL via Supabase REST API
 */

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
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

async function setupDatabase() {
  console.log('🚀 Setting up Supabase database...\n');

  // Read SQL file
  const sqlPath = join(__dirname, '..', 'supabase-migrations.sql');
  let sql = readFileSync(sqlPath, 'utf-8');

  // Extract project ID
  const projectMatch = SUPABASE_URL.match(/https:\/\/([^.]+)\.supabase\.co/);
  if (!projectMatch) {
    console.error('❌ Invalid Supabase URL');
    process.exit(1);
  }
  const projectRef = projectMatch[1];

  console.log(`📦 Project: ${projectRef}`);
  console.log(`📄 Executing SQL migration...\n`);

  // Split SQL into statements
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s && !s.startsWith('--') && s.length > 5);

  let successCount = 0;
  let errorCount = 0;

  // Execute each statement via Supabase Management API
  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i] + ';';
    
    try {
      // Use Supabase Management API
      const response = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json',
          'apikey': SERVICE_ROLE_KEY,
        },
        body: JSON.stringify({ query: statement }),
      });

      const result = await response.json();

      if (response.ok || result.error === null) {
        console.log(`✅ [${i + 1}/${statements.length}] Executed`);
        successCount++;
      } else {
        const errorMsg = result.error || result.message || 'Unknown error';
        if (errorMsg.includes('already exists') || errorMsg.includes('duplicate')) {
          console.log(`ℹ️  [${i + 1}/${statements.length}] Already exists`);
          successCount++;
        } else {
          console.error(`❌ [${i + 1}/${statements.length}] Error: ${errorMsg.substring(0, 60)}`);
          errorCount++;
        }
      }
    } catch (error) {
      console.error(`❌ [${i + 1}/${statements.length}] Failed: ${error.message}`);
      errorCount++;
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log(`\n📊 Summary: ${successCount} succeeded, ${errorCount} failed`);

  if (errorCount === 0) {
    console.log('\n✅ Database setup complete!\n');
  } else {
    console.log('\n⚠️  Some operations failed. Check errors above.');
    console.log('💡 You may need to run the SQL manually in Supabase SQL Editor\n');
  }
}

setupDatabase().catch(console.error);

