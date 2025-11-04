import { NextRequest, NextResponse } from 'next/server';
import { SupabaseDatabase } from '../../../../lib/supabase-database';

export const dynamic = 'force-dynamic';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const paymentId = parseInt(params.id);
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { success: false, error: 'Status is required' },
        { status: 400 }
      );
    }

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status. Must be pending, approved, or rejected' },
        { status: 400 }
      );
    }

    const payment = await SupabaseDatabase.updatePaymentStatus(paymentId, status);

    return NextResponse.json({ success: true, payment });
  } catch (error: any) {
    console.error('Error updating payment status:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update payment status' },
      { status: 500 }
    );
  }
}
