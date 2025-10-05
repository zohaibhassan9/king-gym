import { NextResponse } from 'next/server';
import db from '../../../../lib/database';

export async function GET() {
  try {
    const members = db.getMembers();
    const activeMembers = db.getActiveMembers();
    const expiringMembers = db.getExpiringMembers(5); // 5 days before expiry
    const expiredMembers = db.getExpiredMembers();
    const todayAttendance = db.getTodayAttendance();
    const payments = db.getPayments();
    
    // Calculate statistics
    const totalMembers = members.length;
    const activeToday = todayAttendance.length;
    const pendingCheckouts = todayAttendance.filter(record => !record.checkOutTime).length;
    const expiringMemberships = expiringMembers.length;
    
    // Calculate revenue
    const today = new Date().toISOString().split('T')[0];
    const todayRevenue = payments
      .filter(payment => payment.date === today)
      .reduce((sum, payment) => sum + payment.amount, 0);
    
    const thisMonth = new Date().toISOString().substring(0, 7);
    const monthlyRevenue = payments
      .filter(payment => payment.date.startsWith(thisMonth))
      .reduce((sum, payment) => sum + payment.amount, 0);
    
    // Calculate monthly profit (assuming 70% profit margin after expenses)
    const monthlyProfit = Math.round(monthlyRevenue * 0.7);
    
    // New members this month
    const newMembersThisMonth = members.filter(member => 
      member.createdAt && member.createdAt.startsWith(thisMonth)
    ).length;
    
    // Average attendance (simplified calculation)
    const averageAttendance = totalMembers > 0 ? Math.round((activeToday / totalMembers) * 100) : 0;
    
    const stats = {
      totalMembers,
      activeMembers: activeMembers.length,
      inactiveMembers: totalMembers - activeMembers.length,
      activeToday,
      pendingCheckouts,
      expiringMemberships,
      monthlyRevenue,
      todayRevenue,
      monthlyProfit,
      newMembersThisMonth,
      averageAttendance,
      attendanceToday: activeToday
    };
    
    return NextResponse.json({ 
      success: true, 
      data: {
        stats,
        expiringMembers,
        expiredMembers,
        todayAttendance
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
