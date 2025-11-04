#!/usr/bin/env node

/**
 * Refresh Supabase Schema Cache
 * Makes a simple query to trigger schema cache refresh
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

async function refreshSchemaCache() {
  console.log('🔄 Refreshing Supabase schema cache...\n');

  try {
    // Try simple queries to trigger schema cache refresh
    console.log('📋 Testing table access...\n');

    // Test members table
    console.log('1. Testing members table...');
    const { data: members, error: membersError } = await supabase
      .from('members')
      .select('id')
      .limit(1);
    
    if (membersError) {
      console.error('   ❌ Error:', membersError.message);
    } else {
      console.log('   ✅ Members table accessible');
    }

    // Test payments table
    console.log('2. Testing payments table...');
    const { data: payments, error: paymentsError } = await supabase
      .from('payments')
      .select('id')
      .limit(1);
    
    if (paymentsError) {
      console.error('   ❌ Error:', paymentsError.message);
    } else {
      console.log('   ✅ Payments table accessible');
    }

    // Test attendance table
    console.log('3. Testing attendance table...');
    const { data: attendance, error: attendanceError } = await supabase
      .from('attendance')
      .select('id')
      .limit(1);
    
    if (attendanceError) {
      console.error('   ❌ Error:', attendanceError.message);
    } else {
      console.log('   ✅ Attendance table accessible');
    }

    console.log('\n📝 Note: Supabase schema cache refreshes automatically.');
    console.log('   If errors persist, try:');
    console.log('   1. Ensure tables are in the "public" schema');
    console.log('   2. Check that "public" is in "Exposed schemas" in API Settings');
    console.log('   3. Wait 1-2 minutes for cache to refresh');
    console.log('   4. Restart your Supabase project if needed\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

refreshSchemaCache();

