#!/usr/bin/env node

/**
 * Automatic Supabase Database Setup
 * Uses Supabase REST API to execute SQL via HTTP requests
 */

import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Error: Missing Supabase credentials');
  process.exit(1);
}

async function executeSQL(sql) {
  // Extract the project reference from the URL
  const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];
  
  if (!projectRef) {
    throw new Error('Invalid Supabase URL format');
  }

  // Supabase Management API endpoint
  const apiUrl = `https://api.supabase.com/v1/projects/${projectRef}/db/query`;

  // Split SQL into executable statements
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  console.log(`📝 Executing ${statements.length} SQL statements...\n`);

  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i];
    
    if (statement.trim().length === 0) continue;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${serviceRoleKey}`,
          'Content-Type': 'application/json',
          'apikey': serviceRoleKey,
        },
        body: JSON.stringify({
          query: statement + ';'
        }),
      });

      if (response.ok) {
        console.log(`✅ Statement ${i + 1}/${statements.length} executed`);
      } else {
        const error = await response.text();
        // Some errors are expected (like "already exists")
        if (error.includes('already exists') || error.includes('duplicate')) {
          console.log(`ℹ️  Statement ${i + 1}: Already exists (skipping)`);
        } else {
          console.error(`❌ Statement ${i + 1} failed:`, error.substring(0, 100));
        }
      }
    } catch (error) {
      console.error(`❌ Error executing statement ${i + 1}:`, error.message);
    }
  }
}

async function setupViaREST() {
  console.log('🚀 Setting up database via Supabase REST API...\n');

  try {
    // Read SQL file
    const sqlPath = join(__dirname, '..', 'supabase-migrations.sql');
    const sql = readFileSync(sqlPath, 'utf-8');

    await executeSQL(sql);

    console.log('\n✅ Database setup complete!');
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    
    // Fallback: Provide manual instructions
    console.log('\n📋 Manual setup required:');
    console.log('   1. Go to: https://supabase.com/dashboard');
    console.log('   2. Select your project');
    console.log('   3. Go to SQL Editor');
    console.log('   4. Copy contents from: supabase-migrations.sql');
    console.log('   5. Paste and click "Run"\n');
    
    process.exit(1);
  }
}

setupViaREST();

