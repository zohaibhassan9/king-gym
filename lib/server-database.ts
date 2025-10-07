import { prisma } from './prisma';

// Server-side database functions that can be called from API routes or server components
export class ServerDatabase {
  // Members
  static async getMembers() {
    return await prisma.member.findMany({
      include: {
        payments: true,
        attendance: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  static async getMemberById(id: number) {
    return await prisma.member.findUnique({
      where: { id },
      include: {
        payments: true,
        attendance: true,
      },
    });
  }

  static async addMember(memberData: any) {
    // Generate member ID
    const memberCount = await prisma.member.count();
    const memberId = `KG-${new Date().getFullYear()}-${String(memberCount + 1).padStart(3, '0')}`;

    return await prisma.member.create({
      data: {
        ...memberData,
        memberId,
      },
      include: {
        payments: true,
        attendance: true,
      },
    });
  }

  static async updateMember(id: number, updateData: any) {
    return await prisma.member.update({
      where: { id },
      data: updateData,
      include: {
        payments: true,
        attendance: true,
      },
    });
  }

  static async deleteMember(id: number) {
    return await prisma.member.delete({
      where: { id },
    });
  }

  // Payments
  static async getPayments() {
    return await prisma.payment.findMany({
      include: {
        member: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  static async getPaymentsByMemberId(memberId: number) {
    return await prisma.payment.findMany({
      where: { memberId },
      include: {
        member: true,
      },
    });
  }

  static async addPayment(paymentData: any) {
    // Generate transaction ID
    const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    return await prisma.payment.create({
      data: {
        ...paymentData,
        transactionId,
      },
      include: {
        member: true,
      },
    });
  }

  // Attendance
  static async getAttendance() {
    return await prisma.attendance.findMany({
      include: {
        member: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  static async getAttendanceByMemberId(memberId: number) {
    return await prisma.attendance.findMany({
      where: { memberId },
      include: {
        member: true,
      },
    });
  }

  static async addAttendance(attendanceData: any) {
    return await prisma.attendance.create({
      data: attendanceData,
      include: {
        member: true,
      },
    });
  }

  // Dashboard data
  static async getDashboardData() {
    const [members, payments, attendance] = await Promise.all([
      this.getMembers(),
      this.getPayments(),
      this.getAttendance(),
    ]);

    const activeMembers = members.filter((member: any) => member.status === 'active');
    const inactiveMembers = members.filter((member: any) => member.status === 'inactive');
    const today = new Date().toISOString().split('T')[0];
    const activeToday = attendance.filter((record: any) => record.date === today && record.status === 'active').length;
    const pendingCheckouts = attendance.filter((record: any) => record.status === 'active').length;
    const expiringMemberships = members.filter((member: any) => {
      const expiryDate = new Date(member.expiryDate);
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
        const paymentDate = new Date(payment.createdAt).toISOString().split('T')[0];
        return paymentDate === today && payment.status === 'completed';
      })
      .reduce((sum: number, payment: any) => sum + payment.amount, 0);

    const newMembersThisMonth = members.filter((member: any) => {
      const memberDate = new Date(member.createdAt);
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
