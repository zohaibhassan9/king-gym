import { NextRequest, NextResponse } from 'next/server';
import { SupabaseDatabase } from '../../../../lib/supabase-database';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const member = await SupabaseDatabase.getMemberById(parseInt(params.id));
    
    if (!member) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }
    
    // Normalize response to camelCase for frontend
    const normalizedMember = {
      id: member.id,
      memberId: member.member_id || member.memberId,
      memberName: member.member_name || member.memberName,
      cnicNumber: member.cnic_number || member.cnicNumber,
      contactNumber: member.contact_number || member.contactNumber,
      address: member.address,
      package: member.package,
      packagePrice: member.package_price || member.packagePrice,
      discount: member.discount || 0,
      finalPrice: member.final_price || member.finalPrice,
      joiningDate: member.joining_date || member.joiningDate,
      expiryDate: member.expiry_date || member.expiryDate,
      photo: member.photo,
      status: member.status || 'active',
      createdAt: member.created_at || member.createdAt,
      updatedAt: member.updated_at || member.updatedAt,
    };
    
    return NextResponse.json(normalizedMember);
  } catch (error: any) {
    console.error('Error fetching member:', error);
    return NextResponse.json(
      { error: 'Failed to fetch member', details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const updateData = await request.json();
    
    const member = await SupabaseDatabase.updateMember(parseInt(params.id), updateData);
    
    return NextResponse.json({ success: true, member });
  } catch (error: any) {
    console.error('Error updating member:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await SupabaseDatabase.deleteMember(parseInt(params.id));
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting member:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
