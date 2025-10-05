'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/Layout/Layout';
import { 
  UserGroupIcon, 
  CurrencyDollarIcon, 
  ClockIcon, 
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
  id: string;
  memberName: string;
  package: string;
  finalPrice: number;
  status: string;
  expiryDate: string;
  joiningDate: string;
  createdAt?: string;
}

interface DashboardData {
  stats: {
    totalMembers: number;
    activeMembers: number;
    inactiveMembers: number;
    expiringMemberships: number;
    expiredMembers: number;
    monthlyRevenue: number;
    todayRevenue: number;
    monthlyProfit: number;
    attendanceToday: number;
    newMembersThisMonth: number;
  };
  expiringMembers: Member[];
  expiredMembers: Member[];
  recentPayments: any[];
  recentActivities: any[];
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [members, setMembers] = useState<Member[]>([]);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [payments, setPayments] = useState<any[]>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data from API
  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load members
      const membersResponse = await fetch('/api/members');
      const membersResult = await membersResponse.json();
      if (membersResult.success) {
        setMembers(membersResult.data);
      }

      // Load payments
      const paymentsResponse = await fetch('/api/payments');
      const paymentsResult = await paymentsResponse.json();
      if (paymentsResult.success) {
        setPayments(paymentsResult.data);
      }

      // Load dashboard data
      const dashboardResponse = await fetch('/api/dashboard');
      const dashboardResult = await dashboardResponse.json();
      if (dashboardResult.success) {
        setDashboardData(dashboardResult.data);
      }

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

  useEffect(() => {
    loadData();
  }, []);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: ChartBarIcon },
    { id: 'analytics', name: 'Analytics', icon: ChartPieIcon },
    { id: 'members', name: 'Members', icon: UserGroupIcon },
    { id: 'payments', name: 'Payments', icon: CurrencyDollarIcon },
    { id: 'attendance', name: 'Attendance', icon: ClockIcon }
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-orange-600/20 to-orange-700/20 backdrop-blur-sm rounded-2xl border border-orange-500/30 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome back, Admin!</h2>
            <p className="text-orange-200 text-lg">Here's what's happening at King Gym today</p>
          </div>
          <div className="hidden md:block">
            <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center">
              <ChartBarIcon className="h-8 w-8 text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Members</p>
              <p className="text-3xl font-bold text-white mt-2">
                {dashboardData?.stats?.totalMembers?.toLocaleString() || '0'}
              </p>
              <div className="flex items-center mt-2">
                <UserPlusIcon className="h-4 w-4 text-green-400 mr-1" />
                <span className="text-green-400 text-sm">
                  +{dashboardData?.stats?.newMembersThisMonth || 0} this month
                </span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <UserGroupIcon className="h-6 w-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Monthly Revenue</p>
              <p className="text-3xl font-bold text-white mt-2">
                Rs {dashboardData?.stats?.monthlyRevenue?.toLocaleString() || '0'}
              </p>
              <div className="flex items-center mt-2">
                <ArrowTrendingUpIcon className="h-4 w-4 text-green-400 mr-1" />
                <span className="text-green-400 text-sm">+12% from last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
              <CurrencyDollarIcon className="h-6 w-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Monthly Profit</p>
              <p className="text-3xl font-bold text-white mt-2">
                Rs {dashboardData?.stats?.monthlyProfit?.toLocaleString() || '0'}
              </p>
              <div className="flex items-center mt-2">
                <BanknotesIcon className="h-4 w-4 text-orange-400 mr-1" />
                <span className="text-orange-400 text-sm">After expenses</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
              <ChartBarIcon className="h-6 w-6 text-orange-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Today's Revenue</p>
              <p className="text-3xl font-bold text-white mt-2">
                Rs {dashboardData?.stats?.todayRevenue?.toLocaleString() || '0'}
              </p>
              <div className="flex items-center mt-2">
                <CalendarDaysIcon className="h-4 w-4 text-blue-400 mr-1" />
                <span className="text-blue-400 text-sm">Today's earnings</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <ClockIcon className="h-6 w-6 text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Alerts and Notifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Expiring Memberships</h3>
            <ExclamationTriangleIcon className="h-5 w-5 text-orange-400" />
          </div>
          <div className="text-center py-4">
            <div className="text-4xl font-bold text-orange-400 mb-2">
              {dashboardData?.stats?.expiringMemberships || 0}
            </div>
            <p className="text-gray-400">Memberships expiring in 5 days</p>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Today's Attendance</h3>
            <CheckCircleIcon className="h-5 w-5 text-green-400" />
          </div>
          <div className="text-center py-4">
            <div className="text-4xl font-bold text-green-400 mb-2">
              {dashboardData?.stats?.attendanceToday || 0}
            </div>
            <p className="text-gray-400">Members checked in today</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
          <ClockIcon className="h-5 w-5 text-orange-400" />
        </div>
        <div className="space-y-3">
          {recentActivities.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 text-lg">No recent activity</div>
              <div className="text-gray-500 text-sm mt-2">Activities will appear here as members register and make payments</div>
            </div>
          ) : (
            recentActivities.map((activity: any) => (
              <div key={activity.id} className="flex items-center p-3 bg-gray-700/30 rounded-lg">
                <div className={`w-2 h-2 rounded-full mr-3 ${
                  activity.type === 'payment' ? 'bg-green-400' :
                  activity.type === 'attendance' ? 'bg-blue-400' :
                  'bg-orange-400'
                }`}></div>
                <div className="flex-1">
                  <div className="text-white text-sm">
                    {activity.type === 'payment' && `${activity.member} paid Rs ${activity.amount?.toLocaleString() || '0'}`}
                    {activity.type === 'attendance' && `${activity.member} ${activity.action}`}
                    {activity.type === 'registration' && `${activity.member} joined with ${activity.package}`}
                  </div>
                  <div className="text-gray-400 text-xs">{activity.time}</div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  activity.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                  activity.status === 'active' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-orange-500/20 text-orange-400'
                }`}>
                  {activity.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-8">
      {/* Revenue Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
          <h3 className="text-xl font-bold text-white mb-6">Revenue Breakdown</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Monthly Revenue</span>
              <span className="text-2xl font-bold text-green-400">
                Rs {dashboardData?.stats?.monthlyRevenue?.toLocaleString() || '0'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Monthly Profit</span>
              <span className="text-2xl font-bold text-orange-400">
                Rs {dashboardData?.stats?.monthlyProfit?.toLocaleString() || '0'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Today's Revenue</span>
              <span className="text-2xl font-bold text-blue-400">
                Rs {dashboardData?.stats?.todayRevenue?.toLocaleString() || '0'}
              </span>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Profit Margin</span>
                <span className="text-lg font-semibold text-white">
                  {dashboardData?.stats?.monthlyRevenue && dashboardData?.stats?.monthlyProfit 
                    ? Math.round((dashboardData.stats.monthlyProfit / dashboardData.stats.monthlyRevenue) * 100)
                    : 0}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
          <h3 className="text-xl font-bold text-white mb-6">Member Analytics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Members</span>
              <span className="text-2xl font-bold text-blue-400">
                {dashboardData?.stats?.totalMembers?.toLocaleString() || '0'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Active Members</span>
              <span className="text-2xl font-bold text-green-400">
                {dashboardData?.stats?.activeMembers?.toLocaleString() || '0'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">New This Month</span>
              <span className="text-2xl font-bold text-orange-400">
                {dashboardData?.stats?.newMembersThisMonth?.toLocaleString() || '0'}
              </span>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Active Rate</span>
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
          <div className="text-center p-4 bg-gray-700/30 rounded-lg">
            <div className="text-2xl font-bold text-orange-400">45%</div>
            <div className="text-gray-400 text-sm">Men Normal</div>
          </div>
          <div className="text-center p-4 bg-gray-700/30 rounded-lg">
            <div className="text-2xl font-bold text-green-400">30%</div>
            <div className="text-gray-400 text-sm">Men Cardio</div>
          </div>
          <div className="text-center p-4 bg-gray-700/30 rounded-lg">
            <div className="text-2xl font-bold text-blue-400">15%</div>
            <div className="text-gray-400 text-sm">Couple</div>
          </div>
          <div className="text-center p-4 bg-gray-700/30 rounded-lg">
            <div className="text-2xl font-bold text-purple-400">10%</div>
            <div className="text-gray-400 text-sm">Ladies</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMembers = () => (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
      <h2 className="text-2xl font-bold text-white mb-6">All Members</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-3 px-4 text-gray-300 font-semibold">Member</th>
              <th className="text-left py-3 px-4 text-gray-300 font-semibold">Package</th>
              <th className="text-left py-3 px-4 text-gray-300 font-semibold">Status</th>
              <th className="text-left py-3 px-4 text-gray-300 font-semibold">Expiry Date</th>
              <th className="text-left py-3 px-4 text-gray-300 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.slice(0, 10).map((member: Member) => (
              <tr key={member.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                <td className="py-4 px-4">
                  <div className="font-semibold text-white">{member.memberName}</div>
                </td>
                <td className="py-4 px-4 text-gray-300">{member.package}</td>
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
                <td className="py-4 px-4">
                  <button className="text-orange-400 hover:text-orange-300 mr-3">
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  <button className="text-blue-400 hover:text-blue-300">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPayments = () => (
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
            </tr>
          </thead>
          <tbody>
            {payments.slice(0, 10).map((payment: any) => (
              <tr key={payment.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                <td className="py-4 px-4">
                  <div className="font-semibold text-white">{payment.memberName}</div>
                </td>
                <td className="py-4 px-4 text-orange-400 font-semibold">Rs {payment.amount.toLocaleString()}</td>
                <td className="py-4 px-4 text-gray-300">{payment.method}</td>
                <td className="py-4 px-4">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${
                    payment.status === 'completed' 
                      ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                      : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                  }`}>
                    {payment.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-300">{payment.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAttendance = () => (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Attendance Management</h2>
      <div className="text-center py-12">
        <ClockIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Attendance System</h3>
        <p className="text-gray-400 mb-6">
          Manage member attendance, view reports, and track daily check-ins.
        </p>
        <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
          View Attendance Reports
        </button>
      </div>
    </div>
  );

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
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'analytics' && renderAnalytics()}
          {activeTab === 'members' && renderMembers()}
          {activeTab === 'payments' && renderPayments()}
          {activeTab === 'attendance' && renderAttendance()}
        </div>
      </div>
    </Layout>
  );
}
