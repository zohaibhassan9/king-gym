import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const member = await prisma.member.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        payments: true,
        attendance: true
      }
    });
    
    if (!member) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }
    
    return NextResponse.json(member);
  } catch (error) {
    console.error('Error fetching member:', error);
    return NextResponse.json({ error: 'Failed to fetch member' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const updateData = await request.json();
    
    const member = await prisma.member.update({
      where: { id: parseInt(params.id) },
      data: updateData
    });
    
    return NextResponse.json({ success: true, member });
  } catch (error) {
    console.error('Error updating member:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.member.delete({
      where: { id: parseInt(params.id) }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting member:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
