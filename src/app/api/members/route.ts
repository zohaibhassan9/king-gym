import { NextRequest, NextResponse } from 'next/server';
import { SupabaseDatabase } from '../../../lib/supabase-database';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const members = await SupabaseDatabase.getMembers();
    // Ensure we always return an array, even if empty
    return NextResponse.json(Array.isArray(members) ? members : []);
  } catch (error: any) {
    console.error('Error fetching members:', error);
    // Return empty array on error instead of error object
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const memberData = await request.json();
    
    const member = await SupabaseDatabase.addMember(memberData);
    
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
    
    return NextResponse.json({ success: true, member: normalizedMember });
  } catch (error: any) {
    console.error('Error creating member:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
