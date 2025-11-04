import { supabase, createServerClient } from './supabase';

// Supabase database service layer
// This provides similar interface to ServerDatabase but uses Supabase

export class SupabaseDatabase {
  private client = createServerClient();

  // Members
  static async getMembers() {
    const { data, error } = await supabase
      .from('members')
      .select(`
        *,
        payments:payments(*),
        attendance:attendance(*)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching members:', error);
      throw error;
    }

    return data || [];
  }

  static async getMemberById(id: number) {
    const { data, error } = await supabase
      .from('members')
      .select(`
        *,
        payments:payments(*),
        attendance:attendance(*)
      `)
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
    const { count } = await supabase
      .from('members')
      .select('*', { count: 'exact', head: true });

    const memberId = `KG-${new Date().getFullYear()}-${String((count || 0) + 1).padStart(3, '0')}`;

    // Map camelCase to snake_case for Supabase
    const { data, error } = await supabase
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
      .select(`
        *,
        payments:payments(*),
        attendance:attendance(*)
      `)
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

    const { data, error } = await supabase
      .from('members')
      .update(updateFields)
      .eq('id', id)
      .select(`
        *,
        payments:payments(*),
        attendance:attendance(*)
      `)
      .single();

    if (error) {
      console.error('Error updating member:', error);
      throw error;
    }

    return data;
  }

  static async deleteMember(id: number) {
    const { error } = await supabase
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
    const { data, error } = await supabase
      .from('payments')
      .select(`
        *,
        member:members(*)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching payments:', error);
      throw error;
    }

    return data || [];
  }

  static async getPaymentsByMemberId(memberId: number) {
    const { data, error } = await supabase
      .from('payments')
      .select(`
        *,
        member:members(*)
      `)
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
    const { data, error } = await supabase
      .from('payments')
      .insert({
        member_id: paymentData.memberId || paymentData.member_id,
        amount: paymentData.amount,
        method: paymentData.method,
        status: paymentData.status || 'pending',
        transaction_id: transactionId,
      })
      .select(`
        *,
        member:members(*)
      `)
      .single();

    if (error) {
      console.error('Error creating payment:', error);
      throw error;
    }

    return data;
  }

  // Attendance
  static async getAttendance() {
    const { data, error } = await supabase
      .from('attendance')
      .select(`
        *,
        member:members(*)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching attendance:', error);
      throw error;
    }

    return data || [];
  }

  static async getAttendanceByMemberId(memberId: number) {
    const { data, error } = await supabase
      .from('attendance')
      .select(`
        *,
        member:members(*)
      `)
      .eq('member_id', memberId);

    if (error) {
      console.error('Error fetching attendance:', error);
      throw error;
    }

    return data || [];
  }

  static async addAttendance(attendanceData: any) {
    // Map camelCase to snake_case for Supabase
    const { data, error } = await supabase
      .from('attendance')
      .insert({
        member_id: attendanceData.memberId || attendanceData.member_id,
        date: attendanceData.date,
        check_in_time: attendanceData.checkInTime || attendanceData.check_in_time,
        check_out_time: attendanceData.checkOutTime || attendanceData.check_out_time,
        status: attendanceData.status || 'active',
      })
      .select(`
        *,
        member:members(*)
      `)
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
    const today = new Date().toISOString().split('T')[0];
    const activeToday = attendance.filter((record: any) => record.date === today && record.status === 'active').length;
    const pendingCheckouts = attendance.filter((record: any) => record.status === 'active').length;
    const expiringMemberships = members.filter((member: any) => {
      const expiryDate = new Date(member.expiry_date);
      const today = new Date();
      const diffTime = expiryDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7 && diffDays >= 0;
    }).length;

    const monthlyRevenue = payments
      .filter((payment: any) => payment.status === 'completed')
      .reduce((sum: number, payment: any) => sum + payment.amount, 0);

    const todayRevenue = payments
      .filter((payment: any) => {
        const paymentDate = new Date(payment.created_at).toISOString().split('T')[0];
        return paymentDate === today && payment.status === 'completed';
      })
      .reduce((sum: number, payment: any) => sum + payment.amount, 0);

    const newMembersThisMonth = members.filter((member: any) => {
      const memberDate = new Date(member.created_at);
      const now = new Date();
      return memberDate.getMonth() === now.getMonth() && memberDate.getFullYear() === now.getFullYear();
    }).length;

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

