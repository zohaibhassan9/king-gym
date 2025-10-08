import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const attendance = await prisma.attendance.findMany({
      include: {
        member: true
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(attendance);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    return NextResponse.json({ error: 'Failed to fetch attendance' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const attendanceData = await request.json();
    
    // Check if attendance already exists for this member on this date
    const existingAttendance = await prisma.attendance.findFirst({
      where: {
        memberId: attendanceData.memberId,
        date: attendanceData.date
      }
    });
    
    if (existingAttendance) {
      return NextResponse.json({ 
        success: false, 
        message: 'Attendance already marked for this member today' 
      });
    }
    
    const attendance = await prisma.attendance.create({
      data: {
        memberId: attendanceData.memberId,
        date: attendanceData.date,
        checkInTime: attendanceData.checkInTime,
        checkOutTime: attendanceData.checkOutTime,
        status: attendanceData.status || 'active'
      },
      include: {
        member: true
      }
    });
    
    return NextResponse.json({ success: true, attendance });
  } catch (error) {
    console.error('Error creating attendance:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
