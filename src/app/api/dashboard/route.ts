import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const members = await prisma.member.findMany();
    const payments = await prisma.payment.findMany({
      include: { member: true }
    });
    const attendance = await prisma.attendance.findMany({
      include: { member: true }
    });
    
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
      .reduce((sum, payment) => sum + payment.amount, 0);
    
    // Today's revenue
    const todayRevenue = payments
      .filter(payment => {
        const paymentDate = new Date(payment.createdAt).toISOString().split('T')[0];
        return paymentDate === today;
      })
      .reduce((sum, payment) => sum + payment.amount, 0);
    
    // Recent members (last 5)
    const recentMembers = members
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
    
    // Recent payments (last 5)
    const recentPayments = payments
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
    
    return NextResponse.json({
      stats: {
        totalMembers,
        activeMembers,
        inactiveMembers,
        activeToday: enrichedTodayAttendance.length,
        pendingCheckouts: 0,
        expiringMemberships: 0,
        monthlyRevenue,
        todayRevenue,
        monthlyProfit: monthlyRevenue * 0.3,
        newMembersThisMonth: members.filter(member => {
          const memberDate = new Date(member.joiningDate);
          return memberDate.getMonth() === currentMonth && 
                 memberDate.getFullYear() === currentYear;
        }).length,
        averageAttendance: 0,
        attendanceToday: enrichedTodayAttendance.length
      },
      expiringMembers: [],
      expiredMembers: [],
      recentMembers,
      recentPayments,
      todayAttendance: enrichedTodayAttendance,
      recentActivities: []
    });
  } catch (error) {
    console.error('Error getting dashboard data:', error);
    return NextResponse.json({ error: 'Failed to get dashboard data' }, { status: 500 });
  }
}
