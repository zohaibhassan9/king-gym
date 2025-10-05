import { NextResponse } from 'next/server';
import db from '../../../../lib/database';

export async function GET() {
  try {
    const members = db.getMembers();
    return NextResponse.json({ success: true, data: members });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const memberData = await request.json();
    
    // Validate required fields
    const requiredFields = ['memberName', 'cnicNumber', 'contactNumber', 'address', 'package', 'joiningDate', 'expiryDate'];
    for (const field of requiredFields) {
      if (!memberData[field]) {
        return NextResponse.json({ success: false, error: `${field} is required` }, { status: 400 });
      }
    }
    
    // Validate CNIC format
    if (!/^\d{5}-\d{7}-\d{1}$/.test(memberData.cnicNumber)) {
      return NextResponse.json({ success: false, error: 'CNIC must be in format 12345-1234567-1' }, { status: 400 });
    }
    
    // Validate phone number
    if (!/^\d{11}$/.test(memberData.contactNumber.replace(/\D/g, ''))) {
      return NextResponse.json({ success: false, error: 'Contact number must be 11 digits' }, { status: 400 });
    }
    
    // Set package price based on package
    memberData.packagePrice = db.getPackagePrice(memberData.package);
    memberData.finalPrice = memberData.packagePrice - (memberData.discount || 0);
    
    const newMember = db.addMember(memberData);
    return NextResponse.json({ success: true, data: newMember });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
