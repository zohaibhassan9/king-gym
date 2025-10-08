import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const members = await prisma.member.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const memberData = await request.json();
    
    const member = await prisma.member.create({
      data: {
        memberId: memberData.memberId || `KG${Date.now()}`,
        memberName: memberData.memberName,
        cnicNumber: memberData.cnicNumber,
        contactNumber: memberData.contactNumber,
        address: memberData.address,
        package: memberData.package,
        packagePrice: memberData.packagePrice || 0,
        discount: memberData.discount || 0,
        finalPrice: memberData.finalPrice || 0,
        joiningDate: memberData.joiningDate,
        expiryDate: memberData.expiryDate,
        photo: memberData.photo,
        status: memberData.status || 'active'
      }
    });
    
    return NextResponse.json({ success: true, member });
  } catch (error) {
    console.error('Error creating member:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
