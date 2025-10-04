'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/Layout/Layout';
import { 
  UserGroupIcon, 
  ClockIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  BellIcon
} from '@heroicons/react/24/outline';

export default function StaffDashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const staffStats = {
    totalMembers: 1247,
    activeToday: 89,
    pendingCheckouts: 12,
    expiringMemberships: 8
  };

  const todayAttendance = [
    {
      id: 1,
      memberName: 'Ahmed Ali',
      memberId: 'KG001',
      checkInTime: '08:30 AM',
      status: 'active'
    },
    {
      id: 2,
      memberName: 'Sara Khan',
      memberId: 'KG002',
      checkInTime: '09:00 AM',
      status: 'active'
    },
    {
      id: 3,
      memberName: 'Muhammad Hassan',
      memberId: 'KG003',
      checkInTime: '07:45 AM',
      checkOutTime: '09:30 AM',
      status: 'completed'
    },
    {
      id: 4,
      memberName: 'Fatima Sheikh',
      memberId: 'KG004',
      checkInTime: '06:00 PM',
      status: 'active'
    }
  ];

  const expiringMemberships = [
    {
      id: 1,
      memberName: 'Ali Raza',
      memberId: 'KG005',
      package: 'Weight Training',
      expiryDate: '2024-01-20',
      daysLeft: 3
    },
    {
      id: 2,
      memberName: 'Hassan Ahmed',
      memberId: 'KG006',
      package: 'With Coach',
      expiryDate: '2024-01-22',
      daysLeft: 5
    },
    {
      id: 3,
      memberName: 'Ayesha Khan',
      memberId: 'KG007',
      package: 'Cardio',
      expiryDate: '2024-01-25',
      daysLeft: 8
    }
  ];

  const recentPayments = [
    {
      id: 1,
      memberName: 'Sara Khan',
      amount: 79,
      method: 'JazzCash',
      status: 'pending',
      date: '2024-01-14'
    },
    {
      id: 2,
      memberName: 'Ali Raza',
      amount: 39,
      method: 'Cash',
      status: 'completed',
      date: '2024-01-13'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'active':
        return <ClockIcon className="h-5 w-5 text-blue-500" />;
      case 'pending':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Please log in to access staff dashboard</h1>
            <a href="/login" className="btn-primary">Login</a>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Staff Dashboard
            </h1>
            <p className="text-gray-600">Manage gym operations and member services</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <UserGroupIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Members</p>
                  <p className="text-2xl font-bold text-gray-900">{staffStats.totalMembers.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <ClockIcon className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Today</p>
                  <p className="text-2xl font-bold text-gray-900">{staffStats.activeToday}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Checkouts</p>
                  <p className="text-2xl font-bold text-gray-900">{staffStats.pendingCheckouts}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <BellIcon className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
                  <p className="text-2xl font-bold text-gray-900">{staffStats.expiringMemberships}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Today's Attendance */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Today's Attendance</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {todayAttendance.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{member.memberName}</p>
                        <p className="text-sm text-gray-600">ID: {member.memberId}</p>
                        <p className="text-sm text-gray-500">Check-in: {member.checkInTime}</p>
                      </div>
                      <div className="flex items-center">
                        {getStatusIcon(member.status)}
                        <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(member.status)}`}>
                          {member.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Expiring Memberships */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Expiring Memberships</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {expiringMemberships.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                      <div>
                        <p className="font-medium text-gray-900">{member.memberName}</p>
                        <p className="text-sm text-gray-600">ID: {member.memberId}</p>
                        <p className="text-sm text-gray-500">{member.package}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Expires: {member.expiryDate}</p>
                        <p className="text-sm font-medium text-red-600">{member.daysLeft} days left</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Payments */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Payments</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{payment.memberName}</p>
                        <p className="text-sm text-gray-600">${payment.amount} via {payment.method}</p>
                        <p className="text-sm text-gray-500">{payment.date}</p>
                      </div>
                      <div className="flex items-center">
                        {getStatusIcon(payment.status)}
                        <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <a
                    href="/attendance"
                    className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <ClockIcon className="h-5 w-5 mr-2" />
                    Manage Attendance
                  </a>
                  <a
                    href="/members"
                    className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <UserGroupIcon className="h-5 w-5 mr-2" />
                    View Members
                  </a>
                  <a
                    href="/payments"
                    className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <ChartBarIcon className="h-5 w-5 mr-2" />
                    Payment Reports
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
