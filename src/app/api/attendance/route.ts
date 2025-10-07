import { NextRequest, NextResponse } from 'next/server';

// GET /api/attendance - Get all attendance records
export async function GET() {
  try {
    // For now, return empty array since we're using client-database
    // This API route is not being used by the client-database approach
    return NextResponse.json([]);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    return NextResponse.json(
      { error: 'Failed to fetch attendance' },
      { status: 500 }
    );
  }
}

// POST /api/attendance - Create a new attendance record
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Since we're using client-database, we'll just return success
    // The actual attendance creation happens in the client-side code
    return NextResponse.json({ success: true, data: body }, { status: 201 });
  } catch (error) {
    console.error('Error creating attendance:', error);
    return NextResponse.json(
      { error: 'Failed to create attendance' },
      { status: 500 }
    );
  }
}
