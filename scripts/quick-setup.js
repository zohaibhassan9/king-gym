#!/usr/bin/env node

/**
 * Quick Database Setup
 * Opens Supabase SQL Editor with SQL ready to execute
 */

import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { exec } from 'child_process';

config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

if (!SUPABASE_URL) {
  console.error('❌ Error: Missing Supabase URL');
  process.exit(1);
}

const projectRef = SUPABASE_URL.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];

if (!projectRef) {
  console.error('❌ Invalid Supabase URL');
  process.exit(1);
}

// Read SQL file
const sqlPath = join(__dirname, '..', 'supabase-migrations.sql');
const sql = readFileSync(sqlPath, 'utf-8');

console.log('🚀 Supabase Database Setup\n');
console.log('📋 Quick Setup Instructions:\n');
console.log(`1. Go to: https://supabase.com/dashboard/project/${projectRef}/sql`);
console.log('2. Click "New query"');
console.log('3. Copy the SQL below and paste it');
console.log('4. Click "Run"\n');
console.log('─'.repeat(70));
console.log(sql);
console.log('─'.repeat(70));
console.log('\n💡 Tip: The SQL is saved in: supabase-migrations.sql\n');

// Try to open browser (optional)
const sqlEditorUrl = `https://supabase.com/dashboard/project/${projectRef}/sql/new`;
console.log(`🔗 Direct link: ${sqlEditorUrl}\n`);

// Try opening browser (works on macOS, Linux, Windows)
const platform = process.platform;
let command = '';

if (platform === 'darwin') {
  command = `open "${sqlEditorUrl}"`;
} else if (platform === 'win32') {
  command = `start "${sqlEditorUrl}"`;
} else {
  command = `xdg-open "${sqlEditorUrl}"`;
}

exec(command, (error) => {
  if (error) {
    console.log('💻 Please open the URL manually in your browser\n');
  } else {
    console.log('✅ Opened Supabase SQL Editor in your browser\n');
    console.log('📋 Copy the SQL above and paste it in the editor, then click "Run"\n');
  }
});

