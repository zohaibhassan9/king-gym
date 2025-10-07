'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/Layout/Layout';
import { 
  UserGroupIcon, 
  ClockIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarDaysIcon,
  BanknotesIcon,
  UserPlusIcon,
  ChartPieIcon
} from '@heroicons/react/24/outline';

interface Member {
  id: number;
  memberId: string;
  memberName: string;
  cnicNumber: string;
  contactNumber: string;
  address: string;
  package: string;
  packagePrice: number;
  discount: number;
  finalPrice: number;
  joiningDate: string;
  expiryDate: string;
  status: string;
  photo?: string;
  createdAt?: string;
}

interface DashboardData {
  stats: {
    totalMembers: number;
    activeMembers: number;
    inactiveMembers: number;
    activeToday: number;
    pendingCheckouts: number;
    expiringMemberships: number;
    monthlyRevenue: number;
    todayRevenue: number;
    monthlyProfit: number;
    newMembersThisMonth: number;
    averageAttendance: number;
    attendanceToday: number;
  };
  expiringMembers: Member[];
  expiredMembers: Member[];
  todayAttendance: any[];
  recentPayments: any[];
  recentActivities: any[];
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('analytics');
  const [members, setMembers] = useState<Member[]>([]);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [payments, setPayments] = useState<any[]>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal and form state variables
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showEditFeeModal, setShowEditFeeModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showEditMemberModal, setShowEditMemberModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showExpiringModal, setShowExpiringModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPaymentErrorModal, setShowPaymentErrorModal] = useState(false);
  const [paymentErrorMessage, setPaymentErrorMessage] = useState('');
  const [showPaymentSuccessModal, setShowPaymentSuccessModal] = useState(false);

  // Form data state
  const [newTransaction, setNewTransaction] = useState({
    amount: 0,
    method: 'cash',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [editingMember, setEditingMember] = useState({
    memberName: '',
    package: '',
    packagePrice: 0,
    discount: 0,
    finalPrice: 0,
    status: 'active',
    expiryDate: ''
  });

  const [attendanceData, setAttendanceData] = useState({
    date: '',
    checkInTime: '',
    checkOutTime: '',
    notes: ''
  });

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  // Load data from client database
  const loadData = async () => {
    try {
      setLoading(true);
      
      // Import client database dynamically
      const { default: clientDb } = await import('../../../lib/client-database');
      
      // Load members
      const members = clientDb.getMembers();
      setMembers(members);

      // Load payments and enrich with member information
      const payments = clientDb.getPayments();
      const enrichedPayments = payments.map((payment: any) => {
        const member = members.find((m: any) => m.id === payment.memberId);
        return {
          ...payment,
          memberName: member ? member.memberName : 'Unknown Member',
          status: payment.status || 'completed' // Default status if not set
        };
      });
      setPayments(enrichedPayments);

      // Load dashboard data
      const dashboardData = clientDb.getDashboardData();
      // Add missing fields to match interface
      const enrichedDashboardData = {
        ...dashboardData,
        recentPayments: payments.slice(0, 5), // Get recent 5 payments
        recentActivities: [] // Will be populated by generateRecentActivities
      };
      setDashboardData(enrichedDashboardData);

      // Generate recent activities
      setTimeout(() => {
        generateRecentActivities();
      }, 100);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateRecentActivities = () => {
    const activities: any[] = [];
    
    if (payments.length > 0) {
      const recentPayments = payments
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);
      
      recentPayments.forEach(payment => {
        activities.push({
          id: payment.id,
          type: 'payment',
          member: payment.memberName,
          amount: payment.amount,
          time: getTimeAgo(payment.createdAt),
          status: 'completed'
        });
      });
    }

    if (members.length > 0) {
      const recentRegistrations = members
        .sort((a, b) => new Date(b.createdAt || b.joiningDate).getTime() - new Date(a.createdAt || a.joiningDate).getTime())
        .slice(0, 3);
      
      recentRegistrations.forEach(member => {
        activities.push({
          id: `reg_${member.id}`,
          type: 'registration',
          member: member.memberName,
          package: member.package,
          time: getTimeAgo(member.createdAt || member.joiningDate),
          status: 'new'
        });
      });
    }

    const sortedActivities = activities.sort((a, b) => {
      const timeA = a.time.includes('minute') ? 0 : a.time.includes('hour') ? 1 : 2;
      const timeB = b.time.includes('minute') ? 0 : b.time.includes('hour') ? 1 : 2;
      return timeA - timeB;
    });
    
    setRecentActivities(sortedActivities.slice(0, 8));
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  // Handler functions for member actions

  const handleMarkAttendance = (member: Member) => {
    setSelectedMember(member);
    setAttendanceData({
      date: new Date().toISOString().split('T')[0],
      checkInTime: new Date().toTimeString().split(' ')[0].substring(0, 5),
      checkOutTime: '',
      notes: ''
    });
    setShowAttendanceModal(true);
  };

  const handleViewProfile = (member: Member) => {
    window.open(`/profile/${member.id}`, '_blank');
  };

  const handleSaveAttendance = async () => {
    if (selectedMember) {
      try {
        // Import client database
        const { default: clientDb } = await import('../../../lib/client-database');
        
        // Create attendance record using client database
        const attendanceRecord = {
          memberId: selectedMember.id,
          date: attendanceData.date,
          checkInTime: attendanceData.checkInTime,
          checkOutTime: attendanceData.checkOutTime || null,
          notes: attendanceData.notes,
          status: attendanceData.checkOutTime ? 'completed' : 'active'
        };
        
        // Add attendance record
        const result = clientDb.addAttendance(attendanceRecord);
        
        if (result.success) {
          // Show success modal
          setShowSuccessModal(true);
          setShowAttendanceModal(false);
          
          // Reset form
          setAttendanceData({
            date: new Date().toISOString().split('T')[0],
            checkInTime: new Date().toTimeString().split(' ')[0].substring(0, 5),
            checkOutTime: '',
            notes: ''
          });
          
          // Reload data
          await loadData();
        } else {
          // Show error modal for duplicate attendance
          setErrorMessage(result.message || 'Attendance already marked for this member today');
          setShowErrorModal(true);
        }
      } catch (error) {
        console.error('Attendance error:', error);
        setErrorMessage('Attendance marking failed. Please try again.');
        setShowErrorModal(true);
      }
    }
  };

  // Handler for member form changes
  const handleMemberChange = (field: string, value: any) => {
    setEditingMember(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-calculate final price when package price or discount changes
      if (field === 'packagePrice' || field === 'discount') {
        updated.finalPrice = updated.packagePrice - updated.discount;
      }
      
      return updated;
    });
  };

  // Filter members based on search term and status
  const filteredMembers = members.filter(member => {
    const matchesSearch = member.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.memberId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.contactNumber.includes(searchTerm) ||
      member.package.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.status.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    loadData();
    
    // Auto-refresh when page becomes visible (user switches back to tab)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadData();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (activeTab === 'analytics' && members.length > 0) {
      loadAnalyticsData();
    } else if (activeTab === 'analytics' && members.length === 0) {
      // If no members, still load analytics with empty data
      loadAnalyticsData();
    }
  }, [activeTab, members]);

  // Add timeout to ensure analytics loads even if there are issues
  useEffect(() => {
    if (activeTab === 'analytics' && !analyticsData) {
      const timeout = setTimeout(() => {
        if (!analyticsData) {
          console.log('Analytics loading timeout, setting fallback data');
          setAnalyticsData({
            projectedRevenue: 0,
            activeMembers: [],
            realAttendanceRate: 0,
            revenueGrowthRate: 0,
            memberGrowthRate: 0,
            attendanceGrowthRate: 0,
            packagePercentages: [],
            daysInMonth: 30,
            daysPassed: 1,
            daysRemaining: 29,
            currentMonthMembers: 0,
            monthlyRevenueData: new Array(12).fill(0),
            monthlyMembersData: new Array(12).fill(0),
            monthlyAttendanceData: new Array(12).fill(0)
          });
        }
      }, 3000); // 3 second timeout

      return () => clearTimeout(timeout);
    }
  }, [activeTab, analyticsData]);

  const tabs = [
    { id: 'analytics', name: 'Analytics', icon: ChartPieIcon },
    { id: 'members', name: 'Members', icon: UserGroupIcon },
    { id: 'payments', name: 'Payments', icon: CurrencyDollarIcon },
    { id: 'attendance', name: 'Attendance', icon: ClockIcon }
  ];


  // Load analytics data
  const loadAnalyticsData = async () => {
    try {
      // Calculate analytics data
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      const daysPassed = currentDate.getDate();
      const daysRemaining = daysInMonth - daysPassed;
      
      // Calculate projected monthly revenue from active members' fees
      const activeMembers = members.filter(member => member.status === 'active');
      const projectedRevenue = activeMembers.reduce((sum, member) => {
        return sum + (member.finalPrice || 0);
      }, 0);
      
      // Calculate real attendance rate for the month
      const monthStart = new Date(currentYear, currentMonth, 1);
      const monthEnd = new Date(currentYear, currentMonth + 1, 0);
      
      // Get attendance data for current month
      const { default: clientDb } = await import('../../../lib/client-database');
      const allAttendance = clientDb.getAttendance();
      const monthlyAttendance = allAttendance.filter((record: any) => {
        const recordDate = new Date(record.date);
        return recordDate >= monthStart && recordDate <= monthEnd;
      });
      
      // Calculate average attendance for completed days
      const completedDays = Math.min(daysPassed, daysInMonth);
      const uniqueAttendanceDays = new Set(monthlyAttendance.map((record: any) => record.date)).size;
      const realAttendanceRate = completedDays > 0 ? Math.round((uniqueAttendanceDays / completedDays) * 100) : 0;
      
      // Calculate real growth rates
      const currentMonthMembers = members.filter(member => {
        const memberDate = new Date(member.joiningDate);
        return memberDate.getMonth() === currentMonth && memberDate.getFullYear() === currentYear;
      }).length;
      
      // Calculate previous month members for comparison
      const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      const previousMonthMembers = members.filter(member => {
        const memberDate = new Date(member.joiningDate);
        return memberDate.getMonth() === previousMonth && memberDate.getFullYear() === previousYear;
      }).length;
      
      // Calculate member growth rate (can be negative)
      const memberGrowthRate = previousMonthMembers > 0 
        ? Math.round(((currentMonthMembers - previousMonthMembers) / previousMonthMembers) * 100)
        : currentMonthMembers > 0 ? 100 : 0;
      
      // Calculate revenue growth (simulated for demo - can be negative)
      const revenueGrowthRate = 12; // 12% growth (can be negative)
      const attendanceGrowthRate = 5; // 5% growth (can be negative)
      
      // Calculate package distribution from actual data
      const packageDistribution = members.reduce((acc: any, member: any) => {
        acc[member.package] = (acc[member.package] || 0) + 1;
        return acc;
      }, {});
      
      const totalMembers = members.length;
      const packagePercentages = Object.entries(packageDistribution).map(([packageName, count]: [string, any]) => ({
        name: packageName,
        count,
        percentage: Math.round((count / totalMembers) * 100)
      }));

      // Calculate real monthly data for charts
      const monthlyRevenueData = [];
      const monthlyMembersData = [];
      const monthlyAttendanceData = [];
      
      for (let month = 0; month < 12; month++) {
        const monthStart = new Date(currentYear, month, 1);
        const monthEnd = new Date(currentYear, month + 1, 0);
        
        // Calculate revenue for this month (sum of active members' fees)
        const monthMembers = members.filter(member => {
          const memberDate = new Date(member.joiningDate);
          return memberDate >= monthStart && memberDate <= monthEnd;
        });
        const monthRevenue = monthMembers.reduce((sum, member) => sum + (member.finalPrice || 0), 0);
        
        // Calculate active members for this month
        const activeInMonth = members.filter(member => {
          const memberDate = new Date(member.joiningDate);
          const expiryDate = new Date(member.expiryDate);
          return memberDate <= monthEnd && expiryDate >= monthStart;
        }).length;
        
        // Calculate attendance rate for this month
        const monthAttendance = allAttendance.filter((record: any) => {
          const recordDate = new Date(record.date);
          return recordDate >= monthStart && recordDate <= monthEnd;
        });
        const uniqueAttendanceDays = new Set(monthAttendance.map((record: any) => record.date)).size;
        const daysInMonth = monthEnd.getDate();
        const monthAttendanceRate = daysInMonth > 0 ? Math.round((uniqueAttendanceDays / daysInMonth) * 100) : 0;
        
        monthlyRevenueData.push(monthRevenue);
        monthlyMembersData.push(activeInMonth);
        monthlyAttendanceData.push(monthAttendanceRate);
      }

      setAnalyticsData({
        projectedRevenue,
        activeMembers,
        realAttendanceRate,
        revenueGrowthRate,
        memberGrowthRate,
        attendanceGrowthRate,
        packagePercentages,
        daysInMonth,
        daysPassed,
        daysRemaining,
        currentMonthMembers,
        monthlyRevenueData,
        monthlyMembersData,
        monthlyAttendanceData
      });
    } catch (error) {
      console.error('Error loading analytics data:', error);
      // Set fallback data to prevent infinite loading state
      setAnalyticsData({
        projectedRevenue: 0,
        activeMembers: [],
        realAttendanceRate: 0,
        revenueGrowthRate: 0,
        memberGrowthRate: 0,
        attendanceGrowthRate: 0,
        packagePercentages: [],
        daysInMonth: 30,
        daysPassed: 1,
        daysRemaining: 29,
        currentMonthMembers: 0,
        monthlyRevenueData: new Array(12).fill(0),
        monthlyMembersData: new Array(12).fill(0),
        monthlyAttendanceData: new Array(12).fill(0)
      });
    }
  };

  const renderAnalytics = () => {
    if (!analyticsData) {
      return (
        <div className="space-y-8">
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">Loading analytics...</div>
          </div>
        </div>
      );
    }

    const {
      projectedRevenue,
      activeMembers,
      realAttendanceRate,
      revenueGrowthRate,
      memberGrowthRate,
      attendanceGrowthRate,
      packagePercentages,
      daysInMonth,
      daysPassed,
      daysRemaining,
      currentMonthMembers,
      monthlyRevenueData,
      monthlyMembersData,
      monthlyAttendanceData
    } = analyticsData;

    return (
      <div className="space-y-8">
        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-green-600/20 to-green-700/20 backdrop-blur-sm rounded-2xl border border-green-500/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-green-400 text-sm font-medium">Monthly Revenue</p>
                <p className="text-3xl font-bold text-white mt-2">
                  Rs {projectedRevenue.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  {revenueGrowthRate >= 0 ? (
                    <ArrowTrendingUpIcon className="h-4 w-4 text-green-400 mr-1" />
                  ) : (
                    <ArrowTrendingDownIcon className="h-4 w-4 text-red-400 mr-1" />
                  )}
                  <span className={`text-sm ${revenueGrowthRate >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {revenueGrowthRate >= 0 ? '+' : ''}{revenueGrowthRate}% vs last month
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <CurrencyDollarIcon className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600/20 to-blue-700/20 backdrop-blur-sm rounded-2xl border border-blue-500/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-blue-400 text-sm font-medium">Expected This Month</p>
                <p className="text-3xl font-bold text-white mt-2">
                  Rs {projectedRevenue.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <CalendarDaysIcon className="h-4 w-4 text-blue-400 mr-1" />
                  <span className="text-blue-400 text-sm">{daysRemaining} days remaining</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <ChartBarIcon className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-600/20 to-orange-700/20 backdrop-blur-sm rounded-2xl border border-orange-500/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-orange-400 text-sm font-medium">Member Growth</p>
                <p className="text-3xl font-bold text-white mt-2">
                  {memberGrowthRate >= 0 ? '+' : ''}{currentMonthMembers}
                </p>
                <div className="flex items-center mt-2">
                  {memberGrowthRate >= 0 ? (
                    <ArrowTrendingUpIcon className="h-4 w-4 text-orange-400 mr-1" />
                  ) : (
                    <ArrowTrendingDownIcon className="h-4 w-4 text-red-400 mr-1" />
                  )}
                  <span className={`text-sm ${memberGrowthRate >= 0 ? 'text-orange-400' : 'text-red-400'}`}>
                    {memberGrowthRate >= 0 ? '+' : ''}{memberGrowthRate}% this month
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <UserGroupIcon className="h-6 w-6 text-orange-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-600/20 to-purple-700/20 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-purple-400 text-sm font-medium">Attendance Rate</p>
                <p className="text-3xl font-bold text-white mt-2">
                  {realAttendanceRate}%
                </p>
                <div className="flex items-center mt-2">
                  <ArrowTrendingUpIcon className="h-4 w-4 text-purple-400 mr-1" />
                  <span className="text-purple-400 text-sm">+{attendanceGrowthRate}% improvement</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <ClockIcon className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
            <h3 className="text-xl font-bold text-white mb-6">Revenue Analysis</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-700/30 rounded-lg">
                <div>
                  <span className="text-gray-400 text-sm">Active Members Revenue</span>
                  <div className="text-2xl font-bold text-green-400">
                    Rs {projectedRevenue.toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">{activeMembers.length} active members</div>
                  <div className="text-xs text-gray-500">Total monthly fees</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gray-700/30 rounded-lg">
                <div>
                  <span className="text-gray-400 text-sm">Average Member Fee</span>
                  <div className="text-2xl font-bold text-blue-400">
                    Rs {activeMembers.length > 0 ? Math.round(projectedRevenue / activeMembers.length).toLocaleString() : 0}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Per member</div>
                  <div className="text-xs text-gray-500">Monthly average</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gray-700/30 rounded-lg">
                <div>
                  <span className="text-gray-400 text-sm">Revenue per Day</span>
                  <div className="text-2xl font-bold text-orange-400">
                    Rs {Math.round(projectedRevenue / daysInMonth).toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Daily average</div>
                  <div className="text-xs text-gray-500">Based on active members</div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Projected Revenue</span>
                  <span className="text-lg font-semibold text-white">
                    Rs {projectedRevenue.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
            <h3 className="text-xl font-bold text-white mb-6">Member Analytics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-700/30 rounded-lg">
                <div>
                  <span className="text-gray-400 text-sm">Total Members</span>
                  <div className="text-2xl font-bold text-blue-400">
                    {dashboardData?.stats?.totalMembers?.toLocaleString() || '0'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">All time</div>
                  <div className="text-xs text-gray-500">Registered</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gray-700/30 rounded-lg">
                <div>
                  <span className="text-gray-400 text-sm">Active Members</span>
                  <div className="text-2xl font-bold text-green-400">
                    {dashboardData?.stats?.activeMembers?.toLocaleString() || '0'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Current</div>
                  <div className="text-xs text-gray-500">Valid membership</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gray-700/30 rounded-lg">
                <div>
                  <span className="text-gray-400 text-sm">New This Month</span>
                  <div className="text-2xl font-bold text-orange-400">
                    {dashboardData?.stats?.newMembersThisMonth?.toLocaleString() || '0'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Growth</div>
                  <div className="text-xs text-gray-500">+{memberGrowthRate}% vs last month</div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Retention Rate</span>
                  <span className="text-lg font-semibold text-white">
                    {dashboardData?.stats?.totalMembers && dashboardData?.stats?.activeMembers 
                      ? Math.round((dashboardData.stats.activeMembers / dashboardData.stats.totalMembers) * 100)
                      : 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Package Distribution */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
          <h3 className="text-xl font-bold text-white mb-6">Package Distribution</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {packagePercentages.map((pkg: any, index: number) => {
              const colors = ['text-orange-400', 'text-green-400', 'text-blue-400', 'text-purple-400', 'text-pink-400'];
              const bgColors = ['bg-orange-500/20', 'bg-green-500/20', 'bg-blue-500/20', 'bg-purple-500/20', 'bg-pink-500/20'];
              return (
                <div key={pkg.name} className={`text-center p-4 ${bgColors[index % colors.length]} rounded-lg`}>
                  <div className={`text-2xl font-bold ${colors[index % colors.length]}`}>{pkg.percentage}%</div>
                  <div className="text-gray-400 text-sm">{pkg.name}</div>
                  <div className="text-gray-500 text-xs">{pkg.count} members</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Performance Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
            <h3 className="text-xl font-bold text-white mb-6">Growth Trends</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-700/30 rounded-lg">
                <div>
                  <span className="text-gray-400 text-sm">Revenue Growth</span>
                  <div className={`text-2xl font-bold ${revenueGrowthRate >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {revenueGrowthRate >= 0 ? '+' : ''}{revenueGrowthRate}%
                  </div>
                </div>
                {revenueGrowthRate >= 0 ? (
                  <ArrowTrendingUpIcon className="h-6 w-6 text-green-400" />
                ) : (
                  <ArrowTrendingDownIcon className="h-6 w-6 text-red-400" />
                )}
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gray-700/30 rounded-lg">
                <div>
                  <span className="text-gray-400 text-sm">Member Growth</span>
                  <div className={`text-2xl font-bold ${memberGrowthRate >= 0 ? 'text-blue-400' : 'text-red-400'}`}>
                    {memberGrowthRate >= 0 ? '+' : ''}{memberGrowthRate}%
                  </div>
                </div>
                {memberGrowthRate >= 0 ? (
                  <ArrowTrendingUpIcon className="h-6 w-6 text-blue-400" />
                ) : (
                  <ArrowTrendingDownIcon className="h-6 w-6 text-red-400" />
                )}
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gray-700/30 rounded-lg">
                <div>
                  <span className="text-gray-400 text-sm">Attendance Growth</span>
                  <div className={`text-2xl font-bold ${attendanceGrowthRate >= 0 ? 'text-orange-400' : 'text-red-400'}`}>
                    {attendanceGrowthRate >= 0 ? '+' : ''}{attendanceGrowthRate}%
                  </div>
                </div>
                {attendanceGrowthRate >= 0 ? (
                  <ArrowTrendingUpIcon className="h-6 w-6 text-orange-400" />
                ) : (
                  <ArrowTrendingDownIcon className="h-6 w-6 text-red-400" />
                )}
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
            <h3 className="text-xl font-bold text-white mb-6">Monthly Projections</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-700/30 rounded-lg">
                <div>
                  <span className="text-gray-400 text-sm">Expected Revenue</span>
                  <div className="text-2xl font-bold text-green-400">
                    Rs {projectedRevenue.toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">End of month</div>
                  <div className="text-xs text-gray-500">Projected</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gray-700/30 rounded-lg">
                <div>
                  <span className="text-gray-400 text-sm">Expected Members</span>
                  <div className="text-2xl font-bold text-blue-400">
                    {Math.round((dashboardData?.stats?.newMembersThisMonth || 0) * 1.2)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">New signups</div>
                  <div className="text-xs text-gray-500">Projected</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gray-700/30 rounded-lg">
                <div>
                  <span className="text-gray-400 text-sm">Days Remaining</span>
                  <div className="text-2xl font-bold text-orange-400">{daysRemaining}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">This month</div>
                  <div className="text-xs text-gray-500">Time left</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Trends Graphs */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-white">Monthly Trends</h3>
          
          {/* First Row - Revenue and Members */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Trend */}
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-3xl border border-gray-600/30 p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-bold text-white">Monthly Revenue Trend</h4>
                <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <CurrencyDollarIcon className="h-5 w-5 text-green-400" />
                </div>
              </div>
              <div className="h-72 flex items-end justify-between space-x-1">
                {(() => {
                  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                  const currentMonth = new Date().getMonth();
                  const maxRevenue = Math.max(...monthlyRevenueData, 1); // Ensure minimum of 1 to avoid division by zero
                  
                  return months.map((month, index) => {
                    const revenue = monthlyRevenueData[index] || 0;
                    const height = Math.max((revenue / maxRevenue) * 240, 8);
                    const isCurrentMonth = index === currentMonth;
                    const isPastMonth = index < currentMonth;
                    
                    return (
                      <div key={month} className="flex flex-col items-center flex-1 group">
                        <div 
                          className={`w-full rounded-t-xl transition-all duration-500 hover:scale-105 hover:shadow-lg ${
                            isCurrentMonth ? 'bg-gradient-to-t from-green-500 via-green-400 to-green-300 shadow-green-500/30' :
                            isPastMonth ? 'bg-gradient-to-t from-blue-500 via-blue-400 to-blue-300 shadow-blue-500/30' :
                            'bg-gradient-to-t from-gray-500 via-gray-400 to-gray-300 shadow-gray-500/30'
                          }`}
                          style={{ height: `${height}px` }}
                          title={`${month}: Rs ${revenue.toLocaleString()}`}
                        >
                          <div className="h-full w-full rounded-t-xl bg-white/10 backdrop-blur-sm"></div>
                        </div>
                        <div className="text-xs text-gray-300 mt-3 font-medium">{month}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          Rs {(revenue / 1000).toFixed(0)}k
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>

            {/* Active Members Trend */}
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-3xl border border-gray-600/30 p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-bold text-white">Active Members Trend</h4>
                <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <UserGroupIcon className="h-5 w-5 text-orange-400" />
                </div>
              </div>
              <div className="h-72 flex items-end justify-between space-x-1">
                {(() => {
                  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                  const currentMonth = new Date().getMonth();
                  const maxMembers = Math.max(...monthlyMembersData, 1); // Ensure minimum of 1 to avoid division by zero
                  
                  return months.map((month, index) => {
                    const members = monthlyMembersData[index] || 0;
                    const height = Math.max((members / maxMembers) * 240, 8);
                    const isCurrentMonth = index === currentMonth;
                    const isPastMonth = index < currentMonth;
                    
                    return (
                      <div key={month} className="flex flex-col items-center flex-1 group">
                        <div 
                          className={`w-full rounded-t-xl transition-all duration-500 hover:scale-105 hover:shadow-lg ${
                            isCurrentMonth ? 'bg-gradient-to-t from-orange-500 via-orange-400 to-orange-300 shadow-orange-500/30' :
                            isPastMonth ? 'bg-gradient-to-t from-purple-500 via-purple-400 to-purple-300 shadow-purple-500/30' :
                            'bg-gradient-to-t from-gray-500 via-gray-400 to-gray-300 shadow-gray-500/30'
                          }`}
                          style={{ height: `${height}px` }}
                          title={`${month}: ${members} members`}
                        >
                          <div className="h-full w-full rounded-t-xl bg-white/10 backdrop-blur-sm"></div>
                        </div>
                        <div className="text-xs text-gray-300 mt-3 font-medium">{month}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          {members}
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </div>

          {/* Second Row - Attendance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Attendance Trend */}
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-3xl border border-gray-600/30 p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-bold text-white">Average Attendance Trend</h4>
                <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                  <ClockIcon className="h-5 w-5 text-cyan-400" />
                </div>
              </div>
              <div className="h-72 flex items-end justify-between space-x-1">
                {(() => {
                  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                  const currentMonth = new Date().getMonth();
                  const maxAttendance = Math.max(...monthlyAttendanceData, 1); // Ensure minimum of 1 to avoid division by zero
                  
                  return months.map((month, index) => {
                    const attendance = monthlyAttendanceData[index] || 0;
                    const height = Math.max((attendance / maxAttendance) * 240, 8);
                    const isCurrentMonth = index === currentMonth;
                    const isPastMonth = index < currentMonth;
                    
                    return (
                      <div key={month} className="flex flex-col items-center flex-1 group">
                        <div 
                          className={`w-full rounded-t-xl transition-all duration-500 hover:scale-105 hover:shadow-lg ${
                            isCurrentMonth ? 'bg-gradient-to-t from-cyan-500 via-cyan-400 to-cyan-300 shadow-cyan-500/30' :
                            isPastMonth ? 'bg-gradient-to-t from-pink-500 via-pink-400 to-pink-300 shadow-pink-500/30' :
                            'bg-gradient-to-t from-gray-500 via-gray-400 to-gray-300 shadow-gray-500/30'
                          }`}
                          style={{ height: `${height}px` }}
                          title={`${month}: ${attendance}%`}
                        >
                          <div className="h-full w-full rounded-t-xl bg-white/10 backdrop-blur-sm"></div>
                        </div>
                        <div className="text-xs text-gray-300 mt-3 font-medium">{month}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          {attendance}%
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>

            {/* Package Distribution Chart */}
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-3xl border border-gray-600/30 p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-bold text-white">Package Distribution</h4>
                <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <ChartBarIcon className="h-5 w-5 text-purple-400" />
                </div>
              </div>
              <div className="h-72 flex items-end justify-between space-x-2">
                {packagePercentages.map((pkg: any, index: number) => {
                  const colors = [
                    'bg-gradient-to-t from-orange-500 via-orange-400 to-orange-300 shadow-orange-500/30',
                    'bg-gradient-to-t from-green-500 via-green-400 to-green-300 shadow-green-500/30',
                    'bg-gradient-to-t from-blue-500 via-blue-400 to-blue-300 shadow-blue-500/30',
                    'bg-gradient-to-t from-purple-500 via-purple-400 to-purple-300 shadow-purple-500/30',
                    'bg-gradient-to-t from-pink-500 via-pink-400 to-pink-300 shadow-pink-500/30'
                  ];
                  const textColors = [
                    'text-orange-400',
                    'text-green-400', 
                    'text-blue-400',
                    'text-purple-400',
                    'text-pink-400'
                  ];
                  
                  const height = Math.max((pkg.percentage / 100) * 240, 8);
                  const colorClass = colors[index % colors.length];
                  const textColor = textColors[index % textColors.length];
                  
                  return (
                    <div key={pkg.name} className="flex flex-col items-center flex-1 group">
                      <div 
                        className={`w-full rounded-t-xl transition-all duration-500 hover:scale-105 hover:shadow-lg ${colorClass}`}
                        style={{ height: `${height}px` }}
                        title={`${pkg.name}: ${pkg.percentage}% (${pkg.count} members)`}
                      >
                        <div className="h-full w-full rounded-t-xl bg-white/10 backdrop-blur-sm"></div>
                      </div>
                      <div className="text-xs text-gray-300 mt-3 font-medium text-center">
                        {pkg.name.length > 8 ? pkg.name.substring(0, 8) + '...' : pkg.name}
                      </div>
                      <div className={`text-xs mt-1 font-bold ${textColor}`}>
                        {pkg.percentage}%
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {pkg.count}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMembers = () => (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
      <h2 className="text-2xl font-bold text-white mb-6">All Members</h2>
      
      {/* Search and Filter Controls */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="expired">Expired</option>
        </select>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-3 px-4 text-gray-300 font-semibold">Member</th>
              <th className="text-left py-3 px-4 text-gray-300 font-semibold">Package</th>
              <th className="text-left py-3 px-4 text-gray-300 font-semibold">Phone</th>
              <th className="text-left py-3 px-4 text-gray-300 font-semibold">Status</th>
              <th className="text-left py-3 px-4 text-gray-300 font-semibold">Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member: Member) => (
              <tr 
                key={member.id} 
                onClick={() => handleViewProfile(member)}
                className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors cursor-pointer"
              >
                <td className="py-4 px-4">
                  <div className="font-semibold text-white">{member.memberName}</div>
                </td>
                <td className="py-4 px-4 text-gray-300">{member.package}</td>
                <td className="py-4 px-4 text-gray-300">{member.contactNumber}</td>
                <td className="py-4 px-4">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${
                    member.status === 'active' 
                      ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                      : 'bg-red-500/20 text-red-400 border-red-500/30'
                  }`}>
                    {member.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-300">{member.expiryDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPayments = () => {
    // Sort payments: pending first, then approved, then by date (newest first)
    const sortedPayments = [...payments].sort((a, b) => {
      if (a.status === 'pending' && b.status !== 'pending') return -1;
      if (a.status !== 'pending' && b.status === 'pending') return 1;
      return new Date(b.createdAt || b.date).getTime() - new Date(a.createdAt || a.date).getTime();
    });

    const handleApprovePayment = async (paymentId: number) => {
      try {
        const { default: clientDb } = await import('../../../lib/client-database');
        clientDb.updatePaymentStatus(paymentId, 'approved');
        await loadData(); // Reload data to reflect changes
      } catch (error) {
        console.error('Error approving payment:', error);
      }
    };

    const handleRejectPayment = async (paymentId: number) => {
      try {
        const { default: clientDb } = await import('../../../lib/client-database');
        clientDb.updatePaymentStatus(paymentId, 'rejected');
        await loadData(); // Reload data to reflect changes
      } catch (error) {
        console.error('Error rejecting payment:', error);
      }
    };

    return (
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Payment Management</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-300 font-semibold">Member</th>
                <th className="text-left py-3 px-4 text-gray-300 font-semibold">Amount</th>
                <th className="text-left py-3 px-4 text-gray-300 font-semibold">Method</th>
                <th className="text-left py-3 px-4 text-gray-300 font-semibold">Status</th>
                <th className="text-left py-3 px-4 text-gray-300 font-semibold">Date</th>
                <th className="text-left py-3 px-4 text-gray-300 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedPayments.slice(0, 20).map((payment: any) => (
                <tr key={payment.id} className={`border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors ${
                  payment.status === 'pending' ? 'bg-yellow-500/5' : ''
                }`}>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-white">{payment.memberName || 'Unknown Member'}</div>
                  </td>
                  <td className="py-4 px-4 text-orange-400 font-semibold">Rs {(payment.amount || 0).toLocaleString()}</td>
                  <td className="py-4 px-4 text-gray-300 capitalize">{payment.method || 'Unknown'}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${
                      payment.status === 'approved' 
                        ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                        : payment.status === 'pending'
                        ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                        : 'bg-red-500/20 text-red-400 border-red-500/30'
                    }`}>
                      {payment.status || 'unknown'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-300">{payment.date || payment.createdAt || 'Unknown'}</td>
                  <td className="py-4 px-4">
                    {payment.status === 'approved' || payment.status === 'rejected' ? (
                      <span className={`text-sm font-medium ${
                        payment.status === 'approved' 
                          ? 'text-green-400' 
                          : 'text-red-400'
                      }`}>
                        Final
                      </span>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprovePayment(payment.id)}
                          className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded-lg transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejectPayment(payment.id)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded-lg transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderAttendance = () => {
    // Get today's attendance from dashboard data
    const todayAttendance = dashboardData?.todayAttendance || [];
    
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'active':
          return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
        case 'completed':
          return 'bg-green-500/20 text-green-400 border-green-500/30';
        case 'late':
          return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
        default:
          return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      }
    };

    return (
      <div className="space-y-6">
        {/* Today's Attendance */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Today's Attendance</h2>
            <div className="text-sm text-gray-400">
              {todayAttendance.length} members checked in today
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-300 font-semibold">Member</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-semibold">Check-in</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-semibold">Check-out</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {todayAttendance.map((attendance: any) => (
                  <tr key={attendance.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-semibold text-white">{attendance.memberName}</div>
                        <div className="text-sm text-gray-400">{attendance.memberId}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-green-400 font-medium">{attendance.checkInTime}</td>
                    <td className="py-4 px-4 text-red-400 font-medium">{attendance.checkOutTime || '-'}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(attendance.status)}`}>
                        {attendance.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button 
                        onClick={() => handleMarkAttendance(attendance)}
                        className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-colors"
                        title="Mark Attendance"
                      >
                        <ClockIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {todayAttendance.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-400 text-lg">No attendance records for today</div>
              <div className="text-gray-500 text-sm mt-2">Members will appear here once they check in</div>
            </div>
          )}
        </div>

        {/* Attendance Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Today's Check-ins</p>
                <p className="text-2xl font-bold text-white">{todayAttendance.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <ClockIcon className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Members</p>
                <p className="text-2xl font-bold text-white">{dashboardData?.stats?.activeMembers || 0}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                <UserGroupIcon className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Attendance Rate</p>
                <p className="text-2xl font-bold text-white">{dashboardData?.stats?.averageAttendance || 0}%</p>
              </div>
              <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                <ChartBarIcon className="h-6 w-6 text-orange-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading admin dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400 text-lg">Manage your gym operations and members</p>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-700 mb-8">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-3 px-1 border-b-2 font-medium text-lg transition-colors ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-400'
                      : 'border-transparent text-gray-400 hover:text-orange-300 hover:border-orange-300'
                  }`}
                >
                  <tab.icon className="h-6 w-6 mr-3" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'analytics' && renderAnalytics()}
          {activeTab === 'members' && renderMembers()}
          {activeTab === 'payments' && renderPayments()}
          {activeTab === 'attendance' && renderAttendance()}
        </div>
      </div>

      {/* Modals */}
      {showPaymentModal && selectedMember && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-2xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Add New Transaction</h3>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Member</label>
                  <div className="text-white font-semibold">{selectedMember.memberName}</div>
                  <div className="text-sm text-gray-400">{selectedMember.package}</div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Amount (Rs)</label>
                  <input
                    type="number"
                    value={newTransaction.amount}
                    onChange={(e) => setNewTransaction(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter amount"
                  />
                  <div className="text-sm text-gray-400 mt-1">
                    Current fee: Rs {selectedMember.finalPrice.toLocaleString()}
                  </div>
                </div>

                <div className="bg-orange-600/10 border border-orange-500/30 rounded-lg p-4">
                  <h4 className="text-orange-400 font-semibold mb-2">Membership Extension</h4>
                  <div className="text-sm text-gray-300 space-y-1">
                    <div>Current expiry: {new Date(selectedMember.expiryDate).toLocaleDateString()}</div>
                    <div className="text-orange-400 font-medium">
                      New expiry: {(() => {
                        const currentExpiry = new Date(selectedMember.expiryDate);
                        const newExpiry = new Date(currentExpiry);
                        newExpiry.setMonth(newExpiry.getMonth() + 1);
                        return newExpiry.toLocaleDateString();
                      })()}
                    </div>
                    <div className="text-xs text-gray-400">Membership will be extended by 1 month from current expiry date</div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Payment Method</label>
                  <select
                    value={newTransaction.method}
                    onChange={(e) => setNewTransaction(prev => ({ ...prev, method: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="cash">Cash</option>
                    <option value="jazzcash">JazzCash</option>
                    <option value="easypaisa">Easypaisa</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="card">Credit/Debit Card</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                  <input
                    type="date"
                    value={newTransaction.date}
                    onChange={(e) => setNewTransaction(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // TODO: Implement payment processing
                    setShowPaymentModal(false);
                  }}
                  className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Process Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAttendanceModal && selectedMember && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Mark Attendance</h3>
                <button
                  onClick={() => setShowAttendanceModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Member</label>
                  <div className="text-white font-semibold">{selectedMember.memberName}</div>
                  <div className="text-sm text-gray-400">{selectedMember.id} - {selectedMember.package}</div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                  <input
                    type="date"
                    value={attendanceData.date}
                    onChange={(e) => setAttendanceData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Check-in Time</label>
                  <input
                    type="time"
                    value={attendanceData.checkInTime}
                    onChange={(e) => setAttendanceData(prev => ({ ...prev, checkInTime: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Notes (Optional)</label>
                  <textarea
                    value={attendanceData.notes}
                    onChange={(e) => setAttendanceData(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    rows={3}
                    placeholder="Additional notes"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowAttendanceModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAttendance}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Mark Attendance
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditFeeModal && selectedMember && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Edit Member Information</h3>
                <button
                  onClick={() => setShowEditFeeModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Member Photo */}
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-orange-500 shadow-2xl shadow-orange-500/25">
                    <img
                      src={selectedMember.photo || '/dummy.png'}
                      alt={selectedMember.memberName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/dummy.png';
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Member Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Member Name</label>
                    <input
                      type="text"
                      value={editingMember.memberName}
                      onChange={(e) => handleMemberChange('memberName', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  {/* Package Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Package</label>
                    <select
                      value={editingMember.package}
                      onChange={(e) => handleMemberChange('package', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="Men Cardio">Men Cardio</option>
                      <option value="Men Normal">Men Normal</option>
                      <option value="Women Cardio">Women Cardio</option>
                      <option value="Women Normal">Women Normal</option>
                      <option value="Couple (Separate Floor)">Couple (Separate Floor)</option>
                      <option value="Couple (Same Floor)">Couple (Same Floor)</option>
                    </select>
                  </div>

                  {/* Package Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Package Price (Rs)</label>
                    <input
                      type="number"
                      value={editingMember.packagePrice}
                      onChange={(e) => handleMemberChange('packagePrice', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  {/* Discount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Discount (Rs)</label>
                    <input
                      type="number"
                      value={editingMember.discount}
                      onChange={(e) => handleMemberChange('discount', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  {/* Final Price (Read-only) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Final Price (Rs)</label>
                    <input
                      type="number"
                      value={editingMember.finalPrice}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-600/50 border border-gray-500 rounded-lg text-orange-400 font-semibold"
                    />
                    <p className="text-xs text-gray-400 mt-1">Calculated automatically</p>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                    <select
                      value={editingMember.status}
                      onChange={(e) => handleMemberChange('status', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="suspended">Suspended</option>
                      <option value="expired">Expired</option>
                    </select>
                  </div>

                  {/* Expiry Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Expiry Date</label>
                    <input
                      type="date"
                      value={editingMember.expiryDate}
                      onChange={(e) => handleMemberChange('expiryDate', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-6 border-t border-gray-700">
                  <button
                    onClick={() => setShowEditFeeModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // TODO: Implement member update
                      setShowEditFeeModal(false);
                    }}
                    className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    Update Member
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAttendanceModal && selectedMember && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Mark Attendance</h3>
                <button
                  onClick={() => setShowAttendanceModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Member</label>
                  <div className="text-white font-semibold">{selectedMember.memberName}</div>
                  <div className="text-sm text-gray-400">{selectedMember.id} - {selectedMember.package}</div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                  <input
                    type="date"
                    value={attendanceData.date}
                    onChange={(e) => setAttendanceData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Check-in Time</label>
                  <input
                    type="time"
                    value={attendanceData.checkInTime}
                    onChange={(e) => setAttendanceData(prev => ({ ...prev, checkInTime: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Notes (Optional)</label>
                  <textarea
                    value={attendanceData.notes}
                    onChange={(e) => setAttendanceData(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    rows={3}
                    placeholder="Additional notes"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowAttendanceModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAttendance}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Mark Attendance
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
