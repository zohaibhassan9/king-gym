// Client-side database using localStorage
class ClientDatabase {
  constructor() {
    this.initializeStorage();
  }

  initializeStorage() {
    if (!localStorage.getItem('kingGym_members')) {
      localStorage.setItem('kingGym_members', JSON.stringify([]));
    }
    if (!localStorage.getItem('kingGym_payments')) {
      localStorage.setItem('kingGym_payments', JSON.stringify([]));
    }
    if (!localStorage.getItem('kingGym_attendance')) {
      localStorage.setItem('kingGym_attendance', JSON.stringify([]));
    }
  }

  // Members
  getMembers() {
    return JSON.parse(localStorage.getItem('kingGym_members') || '[]');
  }

  getMemberById(id) {
    const members = this.getMembers();
    return members.find(member => member.id === id);
  }

  addMember(memberData) {
    const members = this.getMembers();
    const newMember = {
      id: Date.now(),
      memberId: this.generateMemberId(),
      ...memberData,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    members.push(newMember);
    localStorage.setItem('kingGym_members', JSON.stringify(members));
    return newMember;
  }

  updateMember(id, updateData) {
    const members = this.getMembers();
    const index = members.findIndex(member => member.id === id);
    if (index !== -1) {
      members[index] = { ...members[index], ...updateData, updatedAt: new Date().toISOString() };
      localStorage.setItem('kingGym_members', JSON.stringify(members));
      return members[index];
    }
    return null;
  }

  deleteMember(id) {
    const members = this.getMembers();
    const filtered = members.filter(member => member.id !== id);
    localStorage.setItem('kingGym_members', JSON.stringify(filtered));
    return true;
  }

  // Payments
  getPayments() {
    return JSON.parse(localStorage.getItem('kingGym_payments') || '[]');
  }

  getPaymentsByMemberId(memberId) {
    const payments = this.getPayments();
    return payments.filter(payment => payment.memberId === memberId);
  }

  addPayment(paymentData) {
    const payments = this.getPayments();
    const newPayment = {
      id: Date.now(),
      transactionId: this.generateTransactionId(),
      ...paymentData,
      createdAt: new Date().toISOString()
    };
    
    payments.push(newPayment);
    localStorage.setItem('kingGym_payments', JSON.stringify(payments));
    return newPayment;
  }

  // Attendance
  getAttendance() {
    return JSON.parse(localStorage.getItem('kingGym_attendance') || '[]');
  }

  getAttendanceByMemberId(memberId) {
    const attendance = this.getAttendance();
    return attendance.filter(record => record.memberId === memberId);
  }

  addAttendance(attendanceData) {
    const attendance = this.getAttendance();
    const newRecord = {
      id: Date.now(),
      ...attendanceData,
      createdAt: new Date().toISOString()
    };
    
    attendance.push(newRecord);
    localStorage.setItem('kingGym_attendance', JSON.stringify(attendance));
    return newRecord;
  }

  // Dashboard data
  getDashboardData() {
    const members = this.getMembers();
    const payments = this.getPayments();
    const attendance = this.getAttendance();
    
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    
    const activeMembers = members.filter(member => member.status === 'active');
    const expiringMembers = members.filter(member => {
      const expiryDate = new Date(member.expiryDate);
      const daysUntilExpiry = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
      return daysUntilExpiry <= 5 && daysUntilExpiry > 0;
    });
    
    const expiredMembers = members.filter(member => {
      const expiryDate = new Date(member.expiryDate);
      return expiryDate < now;
    });
    
    const todayAttendance = attendance.filter(record => 
      record.date === today
    );
    
    const monthlyRevenue = payments
      .filter(payment => {
        const paymentDate = new Date(payment.createdAt);
        return paymentDate.getMonth() === thisMonth && paymentDate.getFullYear() === thisYear;
      })
      .reduce((sum, payment) => sum + (payment.amount || 0), 0);
    
    const todayRevenue = payments
      .filter(payment => payment.date === today)
      .reduce((sum, payment) => sum + (payment.amount || 0), 0);
    
    const monthlyProfit = Math.round(monthlyRevenue * 0.7);
    
    const newMembersThisMonth = members.filter(member => {
      const memberDate = new Date(member.createdAt);
      return memberDate.getMonth() === thisMonth && memberDate.getFullYear() === thisYear;
    }).length;
    
    return {
      stats: {
        totalMembers: members.length,
        activeMembers: activeMembers.length,
        inactiveMembers: members.length - activeMembers.length,
        activeToday: todayAttendance.length,
        pendingCheckouts: 0,
        expiringMemberships: expiringMembers.length,
        monthlyRevenue,
        todayRevenue,
        monthlyProfit,
        newMembersThisMonth,
        averageAttendance: attendance.length / Math.max(members.length, 1),
        attendanceToday: todayAttendance.length
      },
      expiringMembers,
      expiredMembers,
      todayAttendance
    };
  }

  // Utility functions
  generateMemberId() {
    const members = this.getMembers();
    const lastId = members.length > 0 ? Math.max(...members.map(m => parseInt(m.memberId.replace('KG', '')))) : 0;
    return `KG${String(lastId + 1).padStart(3, '0')}`;
  }

  generateTransactionId() {
    return `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
  }

  getPackagePrice(packageName) {
    const packagePrices = {
      'Men Cardio': 4000,
      'Men Normal': 3000,
      'Couple (Separate Floor)': 6000,
      'Ladies (Separate Floor)': 4000
    };
    
    return packagePrices[packageName] || 0;
  }
}

// Create and export a singleton instance
const clientDb = new ClientDatabase();
export default clientDb;
