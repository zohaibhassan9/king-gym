// Real database service using Prisma
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class DatabaseService {
  constructor() {
    this.prisma = prisma;
  }

  // Members
  async getMembers() {
    try {
      return await this.prisma.member.findMany({
        orderBy: { createdAt: 'desc' }
      });
    } catch (error) {
      console.error('Error fetching members:', error);
      return [];
    }
  }

  async getMemberById(id) {
    try {
      return await this.prisma.member.findUnique({
        where: { id: parseInt(id) }
      });
    } catch (error) {
      console.error('Error fetching member:', error);
      return null;
    }
  }

  async addMember(memberData) {
    try {
      const member = await this.prisma.member.create({
        data: {
          memberId: memberData.memberId || `KG${Date.now()}`,
          memberName: memberData.memberName,
          cnicNumber: memberData.cnicNumber,
          contactNumber: memberData.contactNumber,
          address: memberData.address,
          package: memberData.package,
          packagePrice: memberData.packagePrice || 0,
          discount: memberData.discount || 0,
          finalPrice: memberData.finalPrice || 0,
          joiningDate: memberData.joiningDate,
          expiryDate: memberData.expiryDate,
          photo: memberData.photo,
          status: memberData.status || 'active'
        }
      });
      return { success: true, member };
    } catch (error) {
      console.error('Error adding member:', error);
      return { success: false, error: error.message };
    }
  }

  async updateMember(id, updateData) {
    try {
      const member = await this.prisma.member.update({
        where: { id: parseInt(id) },
        data: updateData
      });
      return { success: true, member };
    } catch (error) {
      console.error('Error updating member:', error);
      return { success: false, error: error.message };
    }
  }

  async deleteMember(id) {
    try {
      await this.prisma.member.delete({
        where: { id: parseInt(id) }
      });
      return { success: true };
    } catch (error) {
      console.error('Error deleting member:', error);
      return { success: false, error: error.message };
    }
  }

  // Payments
  async getPayments() {
    try {
      return await this.prisma.payment.findMany({
        include: {
          member: true
        },
        orderBy: { createdAt: 'desc' }
      });
    } catch (error) {
      console.error('Error fetching payments:', error);
      return [];
    }
  }

  async getPaymentsByMemberId(memberId) {
    try {
      return await this.prisma.payment.findMany({
        where: { memberId: parseInt(memberId) },
        include: {
          member: true
        },
        orderBy: { createdAt: 'desc' }
      });
    } catch (error) {
      console.error('Error fetching member payments:', error);
      return [];
    }
  }

  async addPayment(paymentData) {
    try {
      const payment = await this.prisma.payment.create({
        data: {
          memberId: parseInt(paymentData.memberId),
          amount: paymentData.amount,
          method: paymentData.method,
          status: paymentData.status || (paymentData.method === 'cash' ? 'approved' : 'pending'),
          transactionId: paymentData.transactionId || `TXN${Date.now()}`
        },
        include: {
          member: true
        }
      });
      return { success: true, payment };
    } catch (error) {
      console.error('Error adding payment:', error);
      return { success: false, error: error.message };
    }
  }

  async updatePaymentStatus(paymentId, status) {
    try {
      const payment = await this.prisma.payment.update({
        where: { id: parseInt(paymentId) },
        data: { status }
      });
      return { success: true, payment };
    } catch (error) {
      console.error('Error updating payment status:', error);
      return { success: false, error: error.message };
    }
  }

  // Attendance
  async getAttendance() {
    try {
      return await this.prisma.attendance.findMany({
        include: {
          member: true
        },
        orderBy: { createdAt: 'desc' }
      });
    } catch (error) {
      console.error('Error fetching attendance:', error);
      return [];
    }
  }

  async getAttendanceByMemberId(memberId) {
    try {
      return await this.prisma.attendance.findMany({
        where: { memberId: parseInt(memberId) },
        include: {
          member: true
        },
        orderBy: { createdAt: 'desc' }
      });
    } catch (error) {
      console.error('Error fetching member attendance:', error);
      return [];
    }
  }

  async addAttendance(attendanceData) {
    try {
      // Check for duplicate attendance for the same member on the same day
      const existingAttendance = await this.prisma.attendance.findFirst({
        where: {
          memberId: parseInt(attendanceData.memberId),
          date: attendanceData.date
        }
      });

      if (existingAttendance) {
        return { success: false, message: 'Attendance already marked for this member today' };
      }

      const attendance = await this.prisma.attendance.create({
        data: {
          memberId: parseInt(attendanceData.memberId),
          date: attendanceData.date,
          checkInTime: attendanceData.checkInTime,
          checkOutTime: attendanceData.checkOutTime,
          status: attendanceData.status || 'active'
        },
        include: {
          member: true
        }
      });
      return { success: true, attendance };
    } catch (error) {
      console.error('Error adding attendance:', error);
      return { success: false, error: error.message };
    }
  }

  // Dashboard data
  async getDashboardData() {
    try {
      const members = await this.getMembers();
      const payments = await this.getPayments();
      const attendance = await this.getAttendance();
      
      const currentDate = new Date();
      const today = currentDate.toISOString().split('T')[0];
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      
      // Calculate stats
      const totalMembers = members.length;
      const activeMembers = members.filter(member => member.status === 'active').length;
      const inactiveMembers = totalMembers - activeMembers;
      
      // Today's attendance
      const todayAttendance = attendance.filter(record => record.date === today);
      
      // Enrich today's attendance with member names
      const enrichedTodayAttendance = todayAttendance.map(record => ({
        ...record,
        memberName: record.member?.memberName || 'Unknown Member',
        memberId: record.memberId
      }));
      
      // Monthly revenue
      const monthlyRevenue = payments
        .filter(payment => {
          const paymentDate = new Date(payment.createdAt);
          return paymentDate.getMonth() === currentMonth && 
                 paymentDate.getFullYear() === currentYear;
        })
        .reduce((sum, payment) => sum + (payment.amount || 0), 0);
      
      // Today's revenue
      const todayRevenue = payments
        .filter(payment => payment.createdAt && payment.createdAt.toISOString().startsWith(today))
        .reduce((sum, payment) => sum + (payment.amount || 0), 0);
      
      // Recent members (last 5)
      const recentMembers = members
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      
      // Recent payments (last 5)
      const recentPayments = payments
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      
      return {
        stats: {
          totalMembers,
          activeMembers,
          inactiveMembers,
          activeToday: enrichedTodayAttendance.length,
          pendingCheckouts: 0,
          expiringMemberships: 0,
          monthlyRevenue,
          todayRevenue,
          monthlyProfit: monthlyRevenue * 0.3, // Assuming 30% profit margin
          newMembersThisMonth: members.filter(member => {
            const memberDate = new Date(member.joiningDate);
            return memberDate.getMonth() === currentMonth && 
                   memberDate.getFullYear() === currentYear;
          }).length,
          averageAttendance: 0
        },
        expiringMembers: [],
        expiredMembers: [],
        recentMembers,
        recentPayments,
        todayAttendance: enrichedTodayAttendance,
        recentActivities: []
      };
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
          averageAttendance: 0
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
    const packagePrices = {
      'Men Normal': 3000,
      'Men Cardio': 4000,
      'Men Premium': 5000,
      'Women Normal': 2500,
      'Women Cardio': 3500,
      'Women Premium': 4500,
      'Kids': 1500,
      'Family': 6000
    };
    return packagePrices[packageName] || 0;
  }

  // Close database connection
  async disconnect() {
    await this.prisma.$disconnect();
  }
}

export default new DatabaseService();
