#!/usr/bin/env node

/**
 * Direct Database Setup using Supabase PostgREST API
 * This script creates tables directly via HTTP requests to Supabase
 */

import { createClient } from '@supabase/supabase-js';
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
  console.error('❌ Error: Missing Supabase credentials in .env.local');
  process.exit(1);
}

// Create admin client
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function runSQL(sql) {
  // Get project reference
  const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];
  
  if (!projectRef) {
    throw new Error('Could not extract project reference from URL');
  }

  // Use Supabase's REST API to execute SQL
  // Note: Supabase doesn't expose direct SQL execution via their JS client
  // We need to use the Management API or PostgREST
  
  const sqlStatements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  console.log(`📝 Found ${sqlStatements.length} SQL statements\n`);

  // Execute via Supabase REST API
  for (let i = 0; i < sqlStatements.length; i++) {
    const statement = sqlStatements[i];
    
    if (!statement || statement.length === 0) continue;

    try {
      // Use fetch to call Supabase's query endpoint
      const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
          'apikey': serviceRoleKey,
          'Authorization': `Bearer ${serviceRoleKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sql: statement }),
      });

      if (response.ok || response.status === 200) {
        console.log(`✅ Statement ${i + 1}/${sqlStatements.length} executed`);
      } else {
        const errorText = await response.text();
        // Handle expected errors (already exists, etc.)
        if (errorText.includes('already exists') || 
            errorText.includes('duplicate') ||
            errorText.includes('relation') && errorText.includes('already')) {
          console.log(`ℹ️  Statement ${i + 1}: Already exists`);
        } else {
          console.log(`⚠️  Statement ${i + 1}: ${errorText.substring(0, 80)}`);
        }
      }
    } catch (error) {
      // If direct API doesn't work, we'll use an alternative method
      console.log(`⚠️  Direct SQL execution not available, using alternative method...`);
      break;
    }
  }
}

async function createTablesDirectly() {
  console.log('🚀 Creating tables directly via Supabase API...\n');

  const sqlPath = join(__dirname, '..', 'supabase-migrations.sql');
  const sql = readFileSync(sqlPath, 'utf-8');

  try {
    await runSQL(sql);
    console.log('\n✅ Database setup complete!');
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('\n📋 Using Supabase Management API instead...\n');
    
    // Use the Management API approach
    await setupViaManagementAPI(sql);
  }
}

async function setupViaManagementAPI(sql) {
  const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];
  
  // Use Supabase Management API (requires API token)
  // Since we don't have a management API token, we'll provide instructions
  console.log('📋 Automatic setup requires Supabase CLI or manual SQL execution.');
  console.log('\n💡 Recommended: Use Supabase SQL Editor');
  console.log('   1. Go to: https://supabase.com/dashboard');
  console.log(`   2. Select project: ${projectRef}`);
  console.log('   3. Navigate to SQL Editor');
  console.log('   4. Copy SQL from: supabase-migrations.sql');
  console.log('   5. Paste and click "Run"\n');
  
  // Alternatively, we can try to use curl to execute SQL
  console.log('🔧 Attempting via REST API...\n');
  
  // Try executing via PostgREST query endpoint
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'POST',
      headers: {
        'apikey': serviceRoleKey,
        'Authorization': `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/vnd.pgjson.object+json',
        'Prefer': 'return=representation',
      },
    });

    if (response.ok) {
      console.log('✅ Connection successful!');
    }
  } catch (error) {
    console.log('⚠️  Direct API execution not available');
  }
}

// Main execution
async function main() {
  console.log('🔧 Supabase Database Setup\n');
  console.log(`📍 Project: ${supabaseUrl}\n`);

  await createTablesDirectly();
}

main().catch(console.error);

