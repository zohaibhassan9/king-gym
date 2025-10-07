// Database service using API calls instead of localStorage
class DatabaseService {
  private baseUrl = '/api';

  // Members
  async getMembers() {
    const response = await fetch(`${this.baseUrl}/members`);
    if (!response.ok) throw new Error('Failed to fetch members');
    return response.json();
  }

  async getMemberById(id: number) {
    const response = await fetch(`${this.baseUrl}/members/${id}`);
    if (!response.ok) throw new Error('Failed to fetch member');
    return response.json();
  }

  async addMember(memberData: any) {
    const response = await fetch(`${this.baseUrl}/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(memberData),
    });
    if (!response.ok) throw new Error('Failed to create member');
    return response.json();
  }

  async updateMember(id: number, updateData: any) {
    const response = await fetch(`${this.baseUrl}/members/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    if (!response.ok) throw new Error('Failed to update member');
    return response.json();
  }

  async deleteMember(id: number) {
    const response = await fetch(`${this.baseUrl}/members/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete member');
    return response.json();
  }

  // Payments
  async getPayments() {
    const response = await fetch(`${this.baseUrl}/payments`);
    if (!response.ok) throw new Error('Failed to fetch payments');
    return response.json();
  }

  async getPaymentsByMemberId(memberId: number) {
    const payments = await this.getPayments();
    return payments.filter((payment: any) => payment.memberId === memberId);
  }

  async addPayment(paymentData: any) {
    const response = await fetch(`${this.baseUrl}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });
    if (!response.ok) throw new Error('Failed to create payment');
    return response.json();
  }

  // Attendance
  async getAttendance() {
    const response = await fetch(`${this.baseUrl}/attendance`);
    if (!response.ok) throw new Error('Failed to fetch attendance');
    return response.json();
  }

  async getAttendanceByMemberId(memberId: number) {
    const attendance = await this.getAttendance();
    return attendance.filter((record: any) => record.memberId === memberId);
  }

  async addAttendance(attendanceData: any) {
    const response = await fetch(`${this.baseUrl}/attendance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(attendanceData),
    });
    if (!response.ok) throw new Error('Failed to create attendance');
    return response.json();
  }

  // Dashboard data
  async getDashboardData() {
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
  getPackagePrice(packageName: string) {
    const prices: { [key: string]: number } = {
      'Men Cardio': 4000,
      'Men Normal': 3000,
      'Couple (Separate Floor)': 6000,
      'Ladies (Separate Floor)': 4000,
    };
    return prices[packageName] || 3000;
  }
}

export const databaseService = new DatabaseService();
export default databaseService;
