import { NextRequest, NextResponse } from 'next/server';
import { SupabaseDatabase } from '../../../lib/supabase-database';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const payments = await SupabaseDatabase.getPayments();
    const members = await SupabaseDatabase.getMembers();
    
    // Ensure arrays
    const paymentsArray = Array.isArray(payments) ? payments : [];
    const membersArray = Array.isArray(members) ? members : [];
    
    // Enrich payments with member information
    const enrichedPayments = paymentsArray.map((payment: any) => {
      // Match payment.member_id (foreign key) with members.id (primary key)
      const paymentMemberId = payment.member_id || payment.memberId;
      const member = membersArray.find((m: any) => {
        const memberId = Number(m.id);
        const paymentId = Number(paymentMemberId);
        return memberId === paymentId || m.id === paymentMemberId;
      });
      
      // Format date
      const paymentDate = payment.created_at || payment.createdAt || payment.date;
      let formattedDate = '';
      if (paymentDate) {
        try {
          const date = new Date(paymentDate);
          formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          });
        } catch (e) {
          formattedDate = paymentDate;
        }
      }
      
      return {
        ...payment,
        memberId: member?.member_id || member?.memberId || '',
        memberName: member?.member_name || member?.memberName || 'Unknown Member',
        memberPhoto: member?.photo || '',
        date: formattedDate,
        amount: payment.amount || 0,
        method: payment.method || 'cash',
        status: payment.status || 'pending',
      };
    });
    
    return NextResponse.json(enrichedPayments);
  } catch (error: any) {
    console.error('Error fetching payments:', error);
    // Return empty array on error instead of error object
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const paymentData = await request.json();
    
    // Set status based on payment method
    const status = paymentData.method === 'cash' ? 'approved' : 'pending';
    
    const payment = await SupabaseDatabase.addPayment({
      ...paymentData,
      status,
    });
    
    return NextResponse.json({ success: true, payment });
  } catch (error: any) {
    console.error('Error creating payment:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
