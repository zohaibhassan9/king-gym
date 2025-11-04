#!/usr/bin/env node

/**
 * Verify Database Setup
 * Checks if tables exist in Supabase
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('❌ Error: Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function verifyTables() {
  console.log('🔍 Verifying database setup...\n');

  const tables = ['members', 'payments', 'attendance'];
  const results = {};

  for (const table of tables) {
    try {
      // Try to query the table (will fail if it doesn't exist)
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1);

      if (error) {
        if (error.message.includes('relation') || error.message.includes('does not exist')) {
          results[table] = { exists: false, error: error.message };
        } else {
          results[table] = { exists: true, error: null };
        }
      } else {
        results[table] = { exists: true, error: null };
      }
    } catch (error) {
      results[table] = { exists: false, error: error.message };
    }
  }

  console.log('📊 Table Status:\n');
  
  let allExist = true;
  for (const [table, result] of Object.entries(results)) {
    if (result.exists) {
      console.log(`✅ ${table.padEnd(15)} - Exists`);
    } else {
      console.log(`❌ ${table.padEnd(15)} - Missing`);
      allExist = false;
    }
  }

  console.log('');

  if (allExist) {
    console.log('🎉 All tables are set up correctly!\n');
    console.log('✅ Your database is ready to use!\n');
  } else {
    console.log('⚠️  Some tables are missing.\n');
    console.log('💡 Run the setup script:');
    console.log('   npm run setup-db\n');
    console.log('   Then copy the SQL and run it in Supabase SQL Editor\n');
  }
}

verifyTables();

