import { supabase, createServerClient } from './supabase';

// Supabase database service layer
// This provides similar interface to ServerDatabase but uses Supabase

export class SupabaseDatabase {
  // Use server client for all operations (bypasses RLS)
  private static getClient() {
    return createServerClient();
  }

  // Members
  static async getMembers() {
    const client = this.getClient();
    const { data, error } = await client
      .from('members')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching members:', error);
      throw error;
    }

    return data || [];
  }

  static async getMemberById(id: number) {
    const client = this.getClient();
    const { data, error } = await client
      .from('members')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching member:', error);
      throw error;
    }

    return data;
  }

  static async addMember(memberData: any) {
    // Generate member ID
    const client = this.getClient();
    const { count } = await client
      .from('members')
      .select('*', { count: 'exact', head: true });

    const memberId = `KG-${new Date().getFullYear()}-${String((count || 0) + 1).padStart(3, '0')}`;

    // Map camelCase to snake_case for Supabase
    const { data, error } = await client
      .from('members')
      .insert({
        member_id: memberId,
        member_name: memberData.memberName || memberData.member_name,
        cnic_number: memberData.cnicNumber || memberData.cnic_number,
        contact_number: memberData.contactNumber || memberData.contact_number,
        address: memberData.address,
        package: memberData.package,
        package_price: memberData.packagePrice || memberData.package_price,
        discount: memberData.discount || 0,
        final_price: memberData.finalPrice || memberData.final_price,
        joining_date: memberData.joiningDate || memberData.joining_date,
        expiry_date: memberData.expiryDate || memberData.expiry_date,
        photo: memberData.photo,
        status: memberData.status || 'active',
      })
      .select('*')
      .single();

    if (error) {
      console.error('Error creating member:', error);
      throw error;
    }

    return data;
  }

  static async updateMember(id: number, updateData: any) {
    // Map camelCase to snake_case for Supabase
    const updateFields: any = {
      updated_at: new Date().toISOString(),
    };

    if (updateData.memberName !== undefined) updateFields.member_name = updateData.memberName;
    if (updateData.member_name !== undefined) updateFields.member_name = updateData.member_name;
    if (updateData.cnicNumber !== undefined) updateFields.cnic_number = updateData.cnicNumber;
    if (updateData.cnic_number !== undefined) updateFields.cnic_number = updateData.cnic_number;
    if (updateData.contactNumber !== undefined) updateFields.contact_number = updateData.contactNumber;
    if (updateData.contact_number !== undefined) updateFields.contact_number = updateData.contact_number;
    if (updateData.address !== undefined) updateFields.address = updateData.address;
    if (updateData.package !== undefined) updateFields.package = updateData.package;
    if (updateData.packagePrice !== undefined) updateFields.package_price = updateData.packagePrice;
    if (updateData.package_price !== undefined) updateFields.package_price = updateData.package_price;
    if (updateData.discount !== undefined) updateFields.discount = updateData.discount;
    if (updateData.finalPrice !== undefined) updateFields.final_price = updateData.finalPrice;
    if (updateData.final_price !== undefined) updateFields.final_price = updateData.final_price;
    if (updateData.joiningDate !== undefined) updateFields.joining_date = updateData.joiningDate;
    if (updateData.joining_date !== undefined) updateFields.joining_date = updateData.joining_date;
    if (updateData.expiryDate !== undefined) updateFields.expiry_date = updateData.expiryDate;
    if (updateData.expiry_date !== undefined) updateFields.expiry_date = updateData.expiry_date;
    if (updateData.photo !== undefined) updateFields.photo = updateData.photo;
    if (updateData.status !== undefined) updateFields.status = updateData.status;

    const client = this.getClient();
    const { data, error } = await client
      .from('members')
      .update(updateFields)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      console.error('Error updating member:', error);
      throw error;
    }

    return data;
  }

  static async deleteMember(id: number) {
    const client = this.getClient();
    const { error } = await client
      .from('members')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting member:', error);
      throw error;
    }

    return { success: true };
  }

  // Payments
  static async getPayments() {
    const client = this.getClient();
    const { data, error } = await client
      .from('payments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching payments:', error);
      throw error;
    }

    return data || [];
  }

  static async getPaymentsByMemberId(memberId: number) {
    const client = this.getClient();
    const { data, error } = await client
      .from('payments')
      .select('*')
      .eq('member_id', memberId);

    if (error) {
      console.error('Error fetching payments:', error);
      throw error;
    }

    return data || [];
  }

  static async addPayment(paymentData: any) {
    // Generate transaction ID
    const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Map camelCase to snake_case for Supabase
    const client = this.getClient();
    const { data, error } = await client
      .from('payments')
      .insert({
        member_id: paymentData.memberId || paymentData.member_id,
        amount: paymentData.amount,
        method: paymentData.method,
        status: paymentData.status || 'pending',
        transaction_id: transactionId,
      })
      .select('*')
      .single();

    if (error) {
      console.error('Error creating payment:', error);
      throw error;
    }

    return data;
  }

  static async updatePaymentStatus(paymentId: number, status: string) {
    const client = this.getClient();
    const { data, error } = await client
      .from('payments')
      .update({ 
        status: status,
        updated_at: new Date().toISOString()
      })
      .eq('id', paymentId)
      .select('*')
      .single();

    if (error) {
      console.error('Error updating payment status:', error);
      throw error;
    }

    return data;
  }

  // Attendance
  static async getAttendance() {
    const client = this.getClient();
    const { data, error } = await client
      .from('attendance')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching attendance:', error);
      throw error;
    }

    return data || [];
  }

  static async getAttendanceByMemberId(memberId: number) {
    const client = this.getClient();
    const { data, error } = await client
      .from('attendance')
      .select('*')
      .eq('member_id', memberId);

    if (error) {
      console.error('Error fetching attendance:', error);
      throw error;
    }

    return data || [];
  }

  static async addAttendance(attendanceData: any) {
    // Map camelCase to snake_case for Supabase
    const client = this.getClient();
    const { data, error } = await client
      .from('attendance')
      .insert({
        member_id: attendanceData.memberId || attendanceData.member_id,
        date: attendanceData.date,
        check_in_time: attendanceData.checkInTime || attendanceData.check_in_time,
        check_out_time: attendanceData.checkOutTime || attendanceData.check_out_time,
        status: attendanceData.status || 'active',
      })
      .select('*')
      .single();

    if (error) {
      console.error('Error creating attendance:', error);
      throw error;
    }

    return data;
  }

  // Dashboard data
  static async getDashboardData() {
    const [membersResult, paymentsResult, attendanceResult] = await Promise.all([
      this.getMembers(),
      this.getPayments(),
      this.getAttendance(),
    ]);

    const members = membersResult || [];
    const payments = paymentsResult || [];
    const attendance = attendanceResult || [];

    const activeMembers = members.filter((member: any) => member.status === 'active');
    const inactiveMembers = members.filter((member: any) => member.status === 'inactive');
    const todayDate = new Date().toISOString().split('T')[0];
    const activeToday = attendance.filter((record: any) => record.date === todayDate && record.status === 'active').length;
    const pendingCheckouts = attendance.filter((record: any) => record.status === 'active').length;
    const todayForExpiryCheck = new Date();
    todayForExpiryCheck.setHours(0, 0, 0, 0);
    const expiringMemberships = members.filter((member: any) => {
      const expiryDate = new Date(member.expiry_date);
      const diffTime = expiryDate.getTime() - todayForExpiryCheck.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7 && diffDays >= 0;
    }).length;

    const monthlyRevenue = payments
      .filter((payment: any) => payment.status === 'completed')
      .reduce((sum: number, payment: any) => sum + payment.amount, 0);

    const todayRevenue = payments
      .filter((payment: any) => {
        const paymentDate = new Date(payment.created_at).toISOString().split('T')[0];
        return paymentDate === todayDate && payment.status === 'completed';
      })
      .reduce((sum: number, payment: any) => sum + payment.amount, 0);

    const newMembersThisMonth = members.filter((member: any) => {
      const memberDate = new Date(member.created_at);
      const now = new Date();
      return memberDate.getMonth() === now.getMonth() && memberDate.getFullYear() === now.getFullYear();
    }).length;

    // Enrich attendance records with member information
    // Note: attendance.member_id is a foreign key pointing to members.id (primary key)
    const enrichedAttendance = attendance.map((record: any) => {
      // The attendance record has member_id which references members.id (primary key)
      const attendanceMemberId = record.member_id || record.memberId;
      
      // Find the member by matching the primary key (id) with the foreign key (member_id from attendance)
      // Try both numeric comparison and type conversion
      const member = members.find((m: any) => {
        const memberPrimaryKey = m.id;
        // Convert both to numbers for comparison
        const attendanceId = Number(attendanceMemberId);
        const memberId = Number(memberPrimaryKey);
        return memberId === attendanceId || memberPrimaryKey === attendanceMemberId;
      });
      
      if (!member) {
        console.warn('Member not found for attendance record:', {
          attendanceId: record.id,
          attendanceMemberId: attendanceMemberId,
          attendanceMemberIdType: typeof attendanceMemberId,
          availableMemberIds: members.map((m: any) => ({ id: m.id, type: typeof m.id, member_id: m.member_id }))
        });
      } else {
        console.log('Successfully matched member:', {
          attendanceId: record.id,
          memberId: member.id,
          memberName: member.member_name || member.memberName
        });
      }
      
      return {
        ...record,
        memberId: member?.member_id || member?.memberId || '',
        memberName: member?.member_name || member?.memberName || 'Unknown Member',
        memberPhoto: member?.photo || '',
      };
    });

    // Get today's attendance
    const todayAttendance = enrichedAttendance.filter((record: any) => record.date === todayDate);

    // Get expiring and expired members
    const todayForExpiry = new Date();
    todayForExpiry.setHours(0, 0, 0, 0);
    
    const expiringMembers = members.filter((member: any) => {
      const expiryDate = new Date(member.expiry_date || member.expiryDate);
      const diffTime = expiryDate.getTime() - todayForExpiry.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7 && diffDays >= 0;
    });

    const expiredMembers = members.filter((member: any) => {
      const expiryDate = new Date(member.expiry_date || member.expiryDate);
      return expiryDate.getTime() < todayForExpiry.getTime() && member.status === 'active';
    });

    return {
      stats: {
        totalMembers: members.length,
        activeMembers: activeMembers.length,
        inactiveMembers: inactiveMembers.length,
        activeToday,
        pendingCheckouts,
        expiringMemberships,
        monthlyRevenue,
        todayRevenue,
        newMembersThisMonth,
      },
      recentMembers: members.slice(0, 5),
      recentPayments: payments.slice(0, 5),
      todayAttendance,
      expiringMembers,
      expiredMembers,
    };
  }

  // Package pricing
  static getPackagePrice(packageName: string) {
    const prices: { [key: string]: number } = {
      'Men Cardio': 4000,
      'Men Normal': 3000,
      'Couple (Separate Floor)': 6000,
      'Ladies (Separate Floor)': 4000,
    };
    return prices[packageName] || 3000;
  }
}

