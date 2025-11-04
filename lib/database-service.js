// Database service using Supabase
import { SupabaseDatabase } from './supabase-database';

class DatabaseService {

  // Members - Delegates to SupabaseDatabase
  async getMembers() {
    try {
      return await SupabaseDatabase.getMembers();
    } catch (error) {
      console.error('Error fetching members:', error);
      return [];
    }
  }

  async getMemberById(id) {
    try {
      return await SupabaseDatabase.getMemberById(parseInt(id));
    } catch (error) {
      console.error('Error fetching member:', error);
      return null;
    }
  }

  async addMember(memberData) {
    try {
      const member = await SupabaseDatabase.addMember(memberData);
      return { success: true, member };
    } catch (error) {
      console.error('Error adding member:', error);
      return { success: false, error: error.message };
    }
  }

  async updateMember(id, updateData) {
    try {
      const member = await SupabaseDatabase.updateMember(parseInt(id), updateData);
      return { success: true, member };
    } catch (error) {
      console.error('Error updating member:', error);
      return { success: false, error: error.message };
    }
  }

  async deleteMember(id) {
    try {
      await SupabaseDatabase.deleteMember(parseInt(id));
      return { success: true };
    } catch (error) {
      console.error('Error deleting member:', error);
      return { success: false, error: error.message };
    }
  }

  // Payments - Delegates to SupabaseDatabase
  async getPayments() {
    try {
      return await SupabaseDatabase.getPayments();
    } catch (error) {
      console.error('Error fetching payments:', error);
      return [];
    }
  }

  async getPaymentsByMemberId(memberId) {
    try {
      return await SupabaseDatabase.getPaymentsByMemberId(parseInt(memberId));
    } catch (error) {
      console.error('Error fetching member payments:', error);
      return [];
    }
  }

  async addPayment(paymentData) {
    try {
      const status = paymentData.status || (paymentData.method === 'cash' ? 'approved' : 'pending');
      const payment = await SupabaseDatabase.addPayment({
        ...paymentData,
        status,
      });
      return { success: true, payment };
    } catch (error) {
      console.error('Error adding payment:', error);
      return { success: false, error: error.message };
    }
  }

  async updatePaymentStatus(paymentId, status) {
    try {
      const payment = await SupabaseDatabase.updatePaymentStatus(parseInt(paymentId), status);
      return { success: true, payment };
    } catch (error) {
      console.error('Error updating payment status:', error);
      return { success: false, error: error.message };
    }
  }

  // Attendance - Delegates to SupabaseDatabase
  async getAttendance() {
    try {
      return await SupabaseDatabase.getAttendance();
    } catch (error) {
      console.error('Error fetching attendance:', error);
      return [];
    }
  }

  async getAttendanceByMemberId(memberId) {
    try {
      return await SupabaseDatabase.getAttendanceByMemberId(parseInt(memberId));
    } catch (error) {
      console.error('Error fetching member attendance:', error);
      return [];
    }
  }

  async addAttendance(attendanceData) {
    try {
      const attendance = await SupabaseDatabase.addAttendance(attendanceData);
      return { success: true, attendance };
    } catch (error) {
      console.error('Error adding attendance:', error);
      return { success: false, error: error.message };
    }
  }

  // Dashboard data - Delegates to SupabaseDatabase
  async getDashboardData() {
    try {
      return await SupabaseDatabase.getDashboardData();
    } catch (error) {
      console.error('Error getting dashboard data:', error);
      return {
        stats: {
          totalMembers: 0,
          activeMembers: 0,
          inactiveMembers: 0,
          activeToday: 0,
          pendingCheckouts: 0,
          expiringMemberships: 0,
          monthlyRevenue: 0,
          todayRevenue: 0,
          monthlyProfit: 0,
          newMembersThisMonth: 0,
          averageAttendance: 0,
          attendanceToday: 0
        },
        expiringMembers: [],
        expiredMembers: [],
        recentMembers: [],
        recentPayments: [],
        todayAttendance: [],
        recentActivities: []
      };
    }
  }

  // Package pricing
  getPackagePrice(packageName) {
    return SupabaseDatabase.getPackagePrice(packageName);
  }
}

export default new DatabaseService();
