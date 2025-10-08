import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        member: true
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const paymentData = await request.json();
    
    const payment = await prisma.payment.create({
      data: {
        memberId: paymentData.memberId,
        amount: paymentData.amount,
        method: paymentData.method,
        status: paymentData.method === 'cash' ? 'approved' : 'pending',
        transactionId: paymentData.transactionId
      },
      include: {
        member: true
      }
    });
    
    return NextResponse.json({ success: true, payment });
  } catch (error) {
    console.error('Error creating payment:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
