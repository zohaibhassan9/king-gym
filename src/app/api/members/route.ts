import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

// GET /api/members - Get all members
export async function GET() {
  try {
    const members = await prisma.member.findMany({
      include: {
        payments: true,
        attendance: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json(
      { error: 'Failed to fetch members' },
      { status: 500 }
    );
  }
}

// POST /api/members - Create a new member
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Generate member ID
    const memberCount = await prisma.member.count();
    const memberId = `KG-${new Date().getFullYear()}-${String(memberCount + 1).padStart(3, '0')}`;

    const member = await prisma.member.create({
      data: {
        ...body,
        memberId,
      },
      include: {
        payments: true,
        attendance: true,
      },
    });

    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    console.error('Error creating member:', error);
    return NextResponse.json(
      { error: 'Failed to create member' },
      { status: 500 }
    );
  }
}
