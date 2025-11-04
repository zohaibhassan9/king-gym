import { NextResponse } from 'next/server';
import { SupabaseDatabase } from '../../../lib/supabase-database';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const dashboardData = await SupabaseDatabase.getDashboardData();
    
    // Get members for additional processing if needed
    const members = await SupabaseDatabase.getMembers();
    const membersArray = Array.isArray(members) ? members : [];
    
    // Calculate monthly profit (assuming 30% profit margin)
    const monthlyProfit = (dashboardData?.stats?.monthlyRevenue || 0) * 0.3;
    
    // Use the enriched todayAttendance from getDashboardData() which already has member info
    const todayAttendance = dashboardData?.todayAttendance || [];
    
    return NextResponse.json({
      stats: {
        ...(dashboardData?.stats || {}),
        monthlyProfit,
        attendanceToday: todayAttendance.length,
      },
      expiringMembers: Array.isArray(dashboardData?.expiringMembers) ? dashboardData.expiringMembers : [],
      expiredMembers: Array.isArray(dashboardData?.expiredMembers) ? dashboardData.expiredMembers : [],
      recentMembers: Array.isArray(dashboardData?.recentMembers) ? dashboardData.recentMembers : [],
      recentPayments: Array.isArray(dashboardData?.recentPayments) ? dashboardData.recentPayments : [],
      todayAttendance: todayAttendance, // This already has memberName and memberId from getDashboardData()
      recentActivities: []
    });
  } catch (error: any) {
    console.error('Error getting dashboard data:', error);
    // Return default structure on error
    return NextResponse.json({
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
    }, { status: 500 });
  }
}
