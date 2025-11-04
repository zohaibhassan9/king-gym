import { NextRequest, NextResponse } from 'next/server';
import { SupabaseDatabase } from '../../../lib/supabase-database';
import { supabase } from '../../../lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const attendance = await SupabaseDatabase.getAttendance();
    return NextResponse.json(attendance);
  } catch (error: any) {
    console.error('Error fetching attendance:', error);
    return NextResponse.json(
      { error: 'Failed to fetch attendance', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const attendanceData = await request.json();
    
    // Check if attendance already exists for this member on this date
    const { createServerClient } = await import('../../../lib/supabase');
    const serverClient = createServerClient();
    const { data: existingAttendance } = await serverClient
      .from('attendance')
      .select('*')
      .eq('member_id', attendanceData.memberId || attendanceData.member_id)
      .eq('date', attendanceData.date)
      .single();
    
    if (existingAttendance) {
      return NextResponse.json({ 
        success: false, 
        message: 'Attendance already marked for this member today' 
      });
    }
    
    const attendance = await SupabaseDatabase.addAttendance(attendanceData);
    
    return NextResponse.json({ success: true, attendance });
  } catch (error: any) {
    console.error('Error creating attendance:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
