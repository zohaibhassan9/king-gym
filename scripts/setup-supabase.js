#!/usr/bin/env node

/**
 * Automated Supabase Database Setup
 * Creates all tables, indexes, functions, triggers, and policies
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { config } from 'dotenv';

config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('❌ Error: Missing Supabase credentials in .env.local');
  process.exit(1);
}

// Extract project reference
const projectRef = SUPABASE_URL.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];
if (!projectRef) {
  console.error('❌ Invalid Supabase URL format');
  process.exit(1);
}

console.log('🚀 Setting up Supabase database...\n');
console.log(`📍 Project: ${projectRef}`);
console.log(`🔗 URL: ${SUPABASE_URL}\n`);

// Read SQL file
const sqlPath = join(__dirname, '..', 'supabase-migrations.sql');
const sql = readFileSync(sqlPath, 'utf-8');

// Split SQL into executable statements
function parseSQL(sql) {
  const statements = [];
  let current = '';
  let inFunction = false;
  let inTrigger = false;
  
  const lines = sql.split('\n');
  
  for (const line of lines) {
    // Skip comments
    if (line.trim().startsWith('--')) continue;
    
    current += line + '\n';
    
    // Check for function/procedure blocks
    if (line.includes('CREATE OR REPLACE FUNCTION') || line.includes('$$ language')) {
      inFunction = !inFunction;
    }
    
    if (line.includes('CREATE TRIGGER')) {
      inTrigger = true;
    }
    
    // End of statement
    if (line.trim().endsWith(';') && !inFunction && !inTrigger) {
      const statement = current.trim();
      if (statement && statement.length > 10) {
        statements.push(statement);
      }
      current = '';
      inTrigger = false;
    }
  }
  
  // Add any remaining statement
  if (current.trim().length > 10) {
    statements.push(current.trim());
  }
  
  return statements;
}

async function executeSQL(statement, index, total) {
  try {
    // Use Supabase Management API
    // Note: This requires the Supabase Management API token
    // For now, we'll use a workaround with the REST API
    
    const response = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        'apikey': SERVICE_ROLE_KEY,
      },
      body: JSON.stringify({
        query: statement,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      if (result.error) {
        if (result.error.includes('already exists') || result.error.includes('duplicate')) {
          console.log(`ℹ️  [${index}/${total}] Already exists`);
          return true;
        }
        console.error(`❌ [${index}/${total}] Error: ${result.error.substring(0, 60)}`);
        return false;
      }
      console.log(`✅ [${index}/${total}] Executed`);
      return true;
    } else {
      const errorText = await response.text();
      if (errorText.includes('already exists') || errorText.includes('duplicate')) {
        console.log(`ℹ️  [${index}/${total}] Already exists`);
        return true;
      }
      console.error(`❌ [${index}/${total}] HTTP ${response.status}: ${errorText.substring(0, 60)}`);
      return false;
    }
  } catch (error) {
    // If Management API doesn't work, try alternative method
    console.log(`⚠️  [${index}/${total}] API method failed, trying alternative...`);
    return await executeViaAlternative(statement, index, total);
  }
}

async function executeViaAlternative(statement, index, total) {
  // Alternative: Use Supabase's PostgREST or direct SQL execution
  // This is a fallback method
  try {
    // Try using the Supabase client's rpc method
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
    
    // Since direct SQL execution isn't available via JS client,
    // we'll return false to indicate manual setup is needed
    return false;
  } catch (error) {
    return false;
  }
}

async function setupDatabase() {
  console.log('📄 Parsing SQL migration file...\n');
  
  const statements = parseSQL(sql);
  console.log(`Found ${statements.length} SQL statements to execute\n`);

  let successCount = 0;
  let failCount = 0;
  let skipCount = 0;

  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i];
    
    // Show what we're executing (first 50 chars)
    const preview = statement.substring(0, 50).replace(/\s+/g, ' ');
    
    const result = await executeSQL(statement, i + 1, statements.length);
    
    if (result === true) {
      successCount++;
    } else if (result === false) {
      failCount++;
    } else {
      skipCount++;
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Succeeded: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   ℹ️  Skipped: ${skipCount}\n`);

  if (failCount > 0) {
    console.log('⚠️  Some operations failed.');
    console.log('\n💡 Manual Setup Required:');
    console.log('   1. Go to: https://supabase.com/dashboard');
    console.log(`   2. Select project: ${projectRef}`);
    console.log('   3. Navigate to SQL Editor');
    console.log('   4. Copy contents from: supabase-migrations.sql');
    console.log('   5. Paste and click "Run"\n');
  } else {
    console.log('✅ Database setup complete!\n');
    console.log('🎉 Your Supabase database is ready to use!\n');
  }
}

// Run setup
setupDatabase().catch(error => {
  console.error('\n❌ Setup failed:', error.message);
  console.log('\n💡 Please run the SQL manually in Supabase SQL Editor\n');
  process.exit(1);
});

