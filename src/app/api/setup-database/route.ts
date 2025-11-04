import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function POST() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { error: 'Missing Supabase credentials' },
        { status: 400 }
      );
    }

    // Read SQL file
    const sqlPath = join(process.cwd(), 'supabase-migrations.sql');
    const sql = readFileSync(sqlPath, 'utf-8');

    // Extract project reference
    const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];
    if (!projectRef) {
      return NextResponse.json(
        { error: 'Invalid Supabase URL' },
        { status: 400 }
      );
    }

    // Split SQL into statements
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s && !s.startsWith('--') && s.length > 5);

    const results = [];
    
    // Execute each statement via Supabase Management API
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i] + ';';
      
      try {
        const response = await fetch(
          `https://api.supabase.com/v1/projects/${projectRef}/database/query`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${serviceRoleKey}`,
              'Content-Type': 'application/json',
              'apikey': serviceRoleKey,
            },
            body: JSON.stringify({ query: statement }),
          }
        );

        const result = await response.json();
        
        if (response.ok && !result.error) {
          results.push({ index: i + 1, status: 'success', message: 'Executed' });
        } else if (result.error?.includes('already exists') || result.error?.includes('duplicate')) {
          results.push({ index: i + 1, status: 'skipped', message: 'Already exists' });
        } else {
          results.push({ index: i + 1, status: 'error', message: result.error || 'Failed' });
        }
      } catch (error: any) {
        results.push({ index: i + 1, status: 'error', message: error.message });
      }
    }

    const successCount = results.filter(r => r.status === 'success' || r.status === 'skipped').length;
    const errorCount = results.filter(r => r.status === 'error').length;

    return NextResponse.json({
      success: errorCount === 0,
      summary: {
        total: statements.length,
        succeeded: successCount,
        failed: errorCount,
      },
      results,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

