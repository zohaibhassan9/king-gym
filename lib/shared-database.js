// Shared database that syncs between localStorage and shared files
class SharedDatabase {
  constructor() {
    this.initializeStorage();
  }

  initializeStorage() {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined' && window.localStorage) {
      // Browser environment - sync from shared files to localStorage
      this.syncFromFilesToLocalStorage();
    }
  }

  // Sync data from shared files to localStorage
  syncFromFilesToLocalStorage() {
    try {
      // This will be called from the browser, so we need to fetch from the server
      // For now, we'll use the existing localStorage approach
      if (!localStorage.getItem('kingGym_members')) {
        localStorage.setItem('kingGym_members', JSON.stringify([]));
      }
      if (!localStorage.getItem('kingGym_payments')) {
        localStorage.setItem('kingGym_payments', JSON.stringify([]));
      }
      if (!localStorage.getItem('kingGym_attendance')) {
        localStorage.setItem('kingGym_attendance', JSON.stringify([]));
      }
    } catch (error) {
      console.error('Error syncing from files:', error);
    }
  }

  // Members
  getMembers() {
    if (typeof window !== 'undefined') {
      // Browser environment - use localStorage
      return JSON.parse(localStorage.getItem('kingGym_members') || '[]');
    } else {
      // Server environment - read from shared files
      try {
        const fs = require('fs');
        const path = require('path');
        const dataPath = path.join(process.cwd(), 'data', 'members.json');
        if (fs.existsSync(dataPath)) {
          const data = fs.readFileSync(dataPath, 'utf8');
          return JSON.parse(data);
        }
      } catch (error) {
        console.log('Could not read from data files, using empty array');
      }
      return [];
    }
  }

  getMemberById(id) {
    const members = this.getMembers();
    return members.find(member => member.id === id);
  }

  addMember(memberData) {
    if (typeof window !== 'undefined') {
      // Browser environment - use localStorage
      const members = this.getMembers();
      const newMember = {
        id: Date.now(),
        ...memberData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      members.push(newMember);
      localStorage.setItem('kingGym_members', JSON.stringify(members));
      return { success: true, member: newMember };
    } else {
      // Server environment - write to shared files
      try {
        const fs = require('fs');
        const path = require('path');
        const dataPath = path.join(process.cwd(), 'data', 'members.json');
        const members = this.getMembers();
        const newMember = {
          id: Date.now(),
          ...memberData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        members.push(newMember);
        fs.writeFileSync(dataPath, JSON.stringify(members, null, 2));
        return { success: true, member: newMember };
      } catch (error) {
        console.error('Error adding member:', error);
        return { success: false, error: error.message };
      }
    }
  }

  updateMember(id, updateData) {
    if (typeof window !== 'undefined') {
      // Browser environment - use localStorage
      const members = this.getMembers();
      const memberIndex = members.findIndex(member => member.id === id);
      if (memberIndex !== -1) {
        members[memberIndex] = { ...members[memberIndex], ...updateData, updatedAt: new Date().toISOString() };
        localStorage.setItem('kingGym_members', JSON.stringify(members));
        return { success: true, member: members[memberIndex] };
      }
      return { success: false, error: 'Member not found' };
    } else {
      // Server environment - write to shared files
      try {
        const fs = require('fs');
        const path = require('path');
        const dataPath = path.join(process.cwd(), 'data', 'members.json');
        const members = this.getMembers();
        const memberIndex = members.findIndex(member => member.id === id);
        if (memberIndex !== -1) {
          members[memberIndex] = { ...members[memberIndex], ...updateData, updatedAt: new Date().toISOString() };
          fs.writeFileSync(dataPath, JSON.stringify(members, null, 2));
          return { success: true, member: members[memberIndex] };
        }
        return { success: false, error: 'Member not found' };
      } catch (error) {
        console.error('Error updating member:', error);
        return { success: false, error: error.message };
      }
    }
  }

  deleteMember(id) {
    if (typeof window !== 'undefined') {
      // Browser environment - use localStorage
      const members = this.getMembers();
      const filteredMembers = members.filter(member => member.id !== id);
      localStorage.setItem('kingGym_members', JSON.stringify(filteredMembers));
      return { success: true };
    } else {
      // Server environment - write to shared files
      try {
        const fs = require('fs');
        const path = require('path');
        const dataPath = path.join(process.cwd(), 'data', 'members.json');
        const members = this.getMembers();
        const filteredMembers = members.filter(member => member.id !== id);
        fs.writeFileSync(dataPath, JSON.stringify(filteredMembers, null, 2));
        return { success: true };
      } catch (error) {
        console.error('Error deleting member:', error);
        return { success: false, error: error.message };
      }
    }
  }

  // Payments
  getPayments() {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('kingGym_payments') || '[]');
    } else {
      try {
        const fs = require('fs');
        const path = require('path');
        const dataPath = path.join(process.cwd(), 'data', 'payments.json');
        if (fs.existsSync(dataPath)) {
          const data = fs.readFileSync(dataPath, 'utf8');
          return JSON.parse(data);
        }
      } catch (error) {
        console.log('Could not read payments from data files');
      }
      return [];
    }
  }

  getPaymentsByMemberId(memberId) {
    const payments = this.getPayments();
    return payments.filter(payment => payment.memberId === memberId);
  }

  addPayment(paymentData) {
    if (typeof window !== 'undefined') {
      // Browser environment - use localStorage
      const payments = this.getPayments();
      const newPayment = {
        id: Date.now(),
        ...paymentData,
        createdAt: new Date().toISOString()
      };
      payments.push(newPayment);
      localStorage.setItem('kingGym_payments', JSON.stringify(payments));
      return { success: true, payment: newPayment };
    } else {
      // Server environment - write to shared files
      try {
        const fs = require('fs');
        const path = require('path');
        const dataPath = path.join(process.cwd(), 'data', 'payments.json');
        const payments = this.getPayments();
        const newPayment = {
          id: Date.now(),
          ...paymentData,
          createdAt: new Date().toISOString()
        };
        payments.push(newPayment);
        fs.writeFileSync(dataPath, JSON.stringify(payments, null, 2));
        return { success: true, payment: newPayment };
      } catch (error) {
        console.error('Error adding payment:', error);
        return { success: false, error: error.message };
      }
    }
  }

  updatePaymentStatus(paymentId, status) {
    if (typeof window !== 'undefined') {
      // Browser environment - use localStorage
      const payments = this.getPayments();
      const paymentIndex = payments.findIndex(payment => payment.id === paymentId);
      if (paymentIndex !== -1) {
        payments[paymentIndex].status = status;
        localStorage.setItem('kingGym_payments', JSON.stringify(payments));
        return { success: true };
      }
      return { success: false, error: 'Payment not found' };
    } else {
      // Server environment - write to shared files
      try {
        const fs = require('fs');
        const path = require('path');
        const dataPath = path.join(process.cwd(), 'data', 'payments.json');
        const payments = this.getPayments();
        const paymentIndex = payments.findIndex(payment => payment.id === paymentId);
        if (paymentIndex !== -1) {
          payments[paymentIndex].status = status;
          fs.writeFileSync(dataPath, JSON.stringify(payments, null, 2));
          return { success: true };
        }
        return { success: false, error: 'Payment not found' };
      } catch (error) {
        console.error('Error updating payment status:', error);
        return { success: false, error: error.message };
      }
    }
  }

  // Attendance
  getAttendance() {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('kingGym_attendance') || '[]');
    } else {
      try {
        const fs = require('fs');
        const path = require('path');
        const dataPath = path.join(process.cwd(), 'data', 'attendance.json');
        if (fs.existsSync(dataPath)) {
          const data = fs.readFileSync(dataPath, 'utf8');
          return JSON.parse(data);
        }
      } catch (error) {
        console.log('Could not read attendance from data files');
      }
      return [];
    }
  }

  getAttendanceByMemberId(memberId) {
    const attendance = this.getAttendance();
    return attendance.filter(record => record.memberId === memberId);
  }

  addAttendance(attendanceData) {
    if (typeof window !== 'undefined') {
      // Browser environment - use localStorage
      const attendance = this.getAttendance();
      
      // Check for duplicate attendance for the same member on the same day
      const existingAttendance = attendance.find(record => 
        record.memberId === attendanceData.memberId && 
        record.date === attendanceData.date
      );
      
      if (existingAttendance) {
        return { success: false, message: 'Attendance already marked for this member today' };
      }
      
      const newAttendance = {
        id: Date.now(),
        ...attendanceData,
        createdAt: new Date().toISOString()
      };
      attendance.push(newAttendance);
      localStorage.setItem('kingGym_attendance', JSON.stringify(attendance));
      return { success: true, attendance: newAttendance };
    } else {
      // Server environment - write to shared files
      try {
        const fs = require('fs');
        const path = require('path');
        const dataPath = path.join(process.cwd(), 'data', 'attendance.json');
        const attendance = this.getAttendance();
        
        // Check for duplicate attendance for the same member on the same day
        const existingAttendance = attendance.find(record => 
          record.memberId === attendanceData.memberId && 
          record.date === attendanceData.date
        );
        
        if (existingAttendance) {
          return { success: false, message: 'Attendance already marked for this member today' };
        }
        
        const newAttendance = {
          id: Date.now(),
          ...attendanceData,
          createdAt: new Date().toISOString()
        };
        attendance.push(newAttendance);
        fs.writeFileSync(dataPath, JSON.stringify(attendance, null, 2));
        return { success: true, attendance: newAttendance };
      } catch (error) {
        console.error('Error adding attendance:', error);
        return { success: false, error: error.message };
      }
    }
  }

  // Dashboard data
  getDashboardData() {
    const members = this.getMembers();
    const payments = this.getPayments();
    const attendance = this.getAttendance();
    
    const currentDate = new Date();
    const today = currentDate.toISOString().split('T')[0];
    
    // Calculate stats
    const totalMembers = members.length;
    const activeMembers = members.filter(member => member.status === 'active').length;
    const inactiveMembers = totalMembers - activeMembers;
    
    // Today's attendance
    const todayAttendance = attendance.filter(record => record.date === today);
    
    // Enrich today's attendance with member names
    const enrichedTodayAttendance = todayAttendance.map(record => {
      const member = members.find(m => m.id === record.memberId);
      return {
        ...record,
        memberName: member ? member.memberName : 'Unknown Member',
        memberId: record.memberId
      };
    });
    
    // Monthly revenue
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const monthlyRevenue = payments
      .filter(payment => {
        const paymentDate = new Date(payment.createdAt);
        return paymentDate.getMonth() === currentMonth && 
               paymentDate.getFullYear() === currentYear;
      })
      .reduce((sum, payment) => sum + (payment.amount || 0), 0);
    
    // Today's revenue
    const todayRevenue = payments
      .filter(payment => payment.createdAt && payment.createdAt.startsWith(today))
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
}

export default new SharedDatabase();
