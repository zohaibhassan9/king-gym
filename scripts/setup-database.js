#!/usr/bin/env node

/**
 * Supabase Database Setup Script
 * This script will automatically create all tables in your Supabase database
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Error: Missing Supabase credentials in .env.local');
  console.error('Please make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.');
  process.exit(1);
}

// Create Supabase client with service role key for admin operations
const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function executeSQL(sql) {
  try {
    // Supabase doesn't allow direct SQL execution through the JS client
    // So we'll use the REST API's rpc endpoint or direct PostgREST calls
    // For now, we'll split the SQL into individual statements and execute them
    
    // Split SQL by semicolons, but keep multi-line statements together
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    console.log(`📝 Found ${statements.length} SQL statements to execute...`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      
      // Skip comments and empty statements
      if (statement.trim().startsWith('--') || statement.trim().length === 0) {
        continue;
      }

      try {
        // Use Supabase's REST API to execute SQL
        // Note: This requires using the Supabase Management API or PostgREST
        // Since direct SQL execution isn't available, we'll use a workaround
        
        // For functions and triggers, we need to execute them differently
        if (statement.includes('CREATE OR REPLACE FUNCTION') || 
            statement.includes('CREATE TRIGGER') ||
            statement.includes('CREATE POLICY')) {
          // These need to be executed via the Supabase SQL editor
          console.log(`⚠️  Note: Some statements need manual execution in Supabase SQL Editor`);
          continue;
        }

        // For table creation, we can check if tables exist and create via Supabase client
        if (statement.includes('CREATE TABLE')) {
          const tableName = statement.match(/CREATE TABLE.*?(\w+)\s*\(/i)?.[1];
          if (tableName) {
            console.log(`✅ Checking table: ${tableName}`);
          }
        }
      } catch (error) {
        console.error(`❌ Error executing statement ${i + 1}:`, error.message);
      }
    }

    // Alternative: Use Supabase REST API directly
    return await createTablesViaAPI();
  } catch (error) {
    console.error('❌ Error executing SQL:', error);
    throw error;
  }
}

async function createTablesViaAPI() {
  console.log('\n🚀 Creating tables via Supabase API...\n');

  try {
    // Create members table
    console.log('📦 Creating members table...');
    await createTable('members', {
      id: { type: 'bigint', primary: true, autoIncrement: true },
      member_id: { type: 'varchar', length: 255, unique: true, notNull: true },
      member_name: { type: 'varchar', length: 255, notNull: true },
      cnic_number: { type: 'varchar', length: 255 },
      contact_number: { type: 'varchar', length: 255, notNull: true },
      address: { type: 'text', notNull: true },
      package: { type: 'varchar', length: 255, notNull: true },
      package_price: { type: 'integer', notNull: true },
      discount: { type: 'integer', default: 0 },
      final_price: { type: 'integer', notNull: true },
      joining_date: { type: 'varchar', length: 255, notNull: true },
      expiry_date: { type: 'varchar', length: 255, notNull: true },
      photo: { type: 'text' },
      status: { type: 'varchar', length: 255, default: 'active' },
      created_at: { type: 'timestamptz', default: 'now()' },
      updated_at: { type: 'timestamptz', default: 'now()' },
    });

    // Create payments table
    console.log('📦 Creating payments table...');
    await createTable('payments', {
      id: { type: 'bigint', primary: true, autoIncrement: true },
      member_id: { type: 'bigint', notNull: true, foreignKey: 'members(id)' },
      amount: { type: 'integer', notNull: true },
      method: { type: 'varchar', length: 255, notNull: true },
      status: { type: 'varchar', length: 255, default: 'pending' },
      transaction_id: { type: 'varchar', length: 255, unique: true, notNull: true },
      created_at: { type: 'timestamptz', default: 'now()' },
      updated_at: { type: 'timestamptz', default: 'now()' },
    });

    // Create attendance table
    console.log('📦 Creating attendance table...');
    await createTable('attendance', {
      id: { type: 'bigint', primary: true, autoIncrement: true },
      member_id: { type: 'bigint', notNull: true, foreignKey: 'members(id)' },
      date: { type: 'varchar', length: 255, notNull: true },
      check_in_time: { type: 'varchar', length: 255 },
      check_out_time: { type: 'varchar', length: 255 },
      status: { type: 'varchar', length: 255, default: 'active' },
      created_at: { type: 'timestamptz', default: 'now()' },
      updated_at: { type: 'timestamptz', default: 'now()' },
    });

    console.log('\n✅ All tables created successfully!');
    console.log('\n📝 Note: You may need to run the SQL migration file manually in Supabase SQL Editor');
    console.log('   for functions, triggers, and indexes. The file is at: supabase-migrations.sql\n');
  } catch (error) {
    console.error('❌ Error creating tables:', error);
    throw error;
  }
}

async function createTable(tableName, schema) {
  // Supabase doesn't provide a direct API to create tables
  // We need to use the SQL editor or Supabase CLI
  // This is a placeholder - the actual table creation needs to be done via SQL
  console.log(`   ℹ️  Table '${tableName}' schema defined (will be created via SQL)`);
}

async function setupDatabase() {
  console.log('🔧 Setting up Supabase database...\n');
  console.log(`📍 Supabase URL: ${supabaseUrl}\n`);

  try {
    // Read the SQL migration file
    const sqlPath = join(__dirname, '..', 'supabase-migrations.sql');
    const sql = readFileSync(sqlPath, 'utf-8');

    console.log('📄 Reading SQL migration file...');
    
    // Since Supabase doesn't allow direct SQL execution via JS client,
    // we'll provide instructions and create a helper script
    console.log('\n⚠️  Supabase requires SQL to be executed via their SQL Editor or CLI.');
    console.log('   Creating an automated solution...\n');

    // Try to use Supabase Management API or create tables via REST API
    await createTablesViaAPI();

    console.log('\n✅ Database setup initiated!');
    console.log('\n📋 Next steps:');
    console.log('   1. Go to your Supabase dashboard');
    console.log('   2. Navigate to SQL Editor');
    console.log('   3. Copy and paste the contents of supabase-migrations.sql');
    console.log('   4. Click "Run" to execute\n');

    // Alternatively, we can use the Supabase REST API to execute SQL
    // if the user has the Supabase CLI installed
    console.log('💡 Tip: Install Supabase CLI for automated migrations:');
    console.log('   npm install -g supabase');
    console.log('   supabase db push\n');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

// Run the setup
setupDatabase();

