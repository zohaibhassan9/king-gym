#!/usr/bin/env node

/**
 * Easy Database Setup - Uses Next.js API route to execute SQL
 */

import { config } from 'dotenv';

config({ path: '.env.local' });

const API_URL = process.env.NEXT_PUBLIC_SUPABASE_URL 
  ? `http://localhost:3000/api/setup-database`
  : null;

if (!API_URL) {
  console.error('❌ Error: Could not determine API URL');
  console.error('   Make sure NEXT_PUBLIC_SUPABASE_URL is set in .env.local');
  process.exit(1);
}

async function setupDatabase() {
  console.log('🚀 Setting up Supabase database...\n');
  console.log('📡 Connecting to Next.js API...\n');

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (response.ok && result.success) {
      console.log('✅ Database setup complete!\n');
      console.log(`📊 Summary:`);
      console.log(`   Total statements: ${result.summary.total}`);
      console.log(`   ✅ Succeeded: ${result.summary.succeeded}`);
      console.log(`   ❌ Failed: ${result.summary.failed}\n`);
      
      if (result.summary.failed === 0) {
        console.log('🎉 All tables created successfully!\n');
      }
    } else {
      console.error('❌ Setup failed:', result.error || 'Unknown error');
      console.log('\n💡 Please run the SQL manually in Supabase SQL Editor\n');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n💡 Make sure your Next.js dev server is running:');
    console.log('   npm run dev\n');
    console.log('   Then run this script again:');
    console.log('   npm run setup-db\n');
  }
}

setupDatabase();

