import { NextResponse } from 'next/server';
import db from '../../../../lib/database';

export async function GET() {
  try {
    const payments = db.getPayments();
    return NextResponse.json({ success: true, data: payments });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const paymentData = await request.json();
    
    // Validate required fields
    if (!paymentData.memberId || !paymentData.amount || !paymentData.method) {
      return NextResponse.json({ success: false, error: 'memberId, amount, and method are required' }, { status: 400 });
    }
    
    // Process payment and extend membership
    const result = db.processPayment(paymentData.memberId, paymentData);
    
    return NextResponse.json({ 
      success: true, 
      data: result,
      message: `Payment processed successfully! Membership extended to ${new Date(result.newExpiryDate).toLocaleDateString()}`
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
