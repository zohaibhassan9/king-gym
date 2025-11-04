import { SupabaseDatabase } from './supabase-database';

// Server-side database functions that can be called from API routes or server components
// This class now acts as an alias to SupabaseDatabase for backward compatibility
export class ServerDatabase {
  // Members - Delegates to SupabaseDatabase
  static async getMembers() {
    return await SupabaseDatabase.getMembers();
  }

  static async getMemberById(id: number) {
    return await SupabaseDatabase.getMemberById(id);
  }

  static async addMember(memberData: any) {
    return await SupabaseDatabase.addMember(memberData);
  }

  static async updateMember(id: number, updateData: any) {
    return await SupabaseDatabase.updateMember(id, updateData);
  }

  static async deleteMember(id: number) {
    return await SupabaseDatabase.deleteMember(id);
  }

  // Payments - Delegates to SupabaseDatabase
  static async getPayments() {
    return await SupabaseDatabase.getPayments();
  }

  static async getPaymentsByMemberId(memberId: number) {
    return await SupabaseDatabase.getPaymentsByMemberId(memberId);
  }

  static async addPayment(paymentData: any) {
    return await SupabaseDatabase.addPayment(paymentData);
  }

  // Attendance - Delegates to SupabaseDatabase
  static async getAttendance() {
    return await SupabaseDatabase.getAttendance();
  }

  static async getAttendanceByMemberId(memberId: number) {
    return await SupabaseDatabase.getAttendanceByMemberId(memberId);
  }

  static async addAttendance(attendanceData: any) {
    return await SupabaseDatabase.addAttendance(attendanceData);
  }

  // Dashboard data - Delegates to SupabaseDatabase
  static async getDashboardData() {
    return await SupabaseDatabase.getDashboardData();
  }

  // Package pricing
  static getPackagePrice(packageName: string) {
    return SupabaseDatabase.getPackagePrice(packageName);
  }
}
