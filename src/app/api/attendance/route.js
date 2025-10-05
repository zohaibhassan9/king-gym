import { NextResponse } from 'next/server';
import db from '../../../../lib/database';

export async function GET() {
  try {
    const attendance = db.getAttendance();
    return NextResponse.json({ success: true, data: attendance });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const attendanceData = await request.json();
    
    // Validate required fields
    if (!attendanceData.memberId || !attendanceData.date || !attendanceData.checkInTime) {
      return NextResponse.json({ success: false, error: 'memberId, date, and checkInTime are required' }, { status: 400 });
    }
    
    const newRecord = db.addAttendance(attendanceData);
    return NextResponse.json({ success: true, data: newRecord });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
