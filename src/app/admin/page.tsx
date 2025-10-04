'use client';

import { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { 
  UserGroupIcon, 
  CurrencyDollarIcon, 
  ClockIcon, 
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - in a real app, this would come from your backend
  const stats = {
    totalMembers: 1247,
    activeMembers: 1156,
    expiredMembers: 91,
    pendingPayments: 23,
    monthlyRevenue: 45680,
    attendanceToday: 89
  };

  const recentMembers = [
    {
      id: 1,
      name: 'Ahmed Ali',
      package: 'Weight Training',
      joinDate: '2024-01-15',
      expiryDate: '2024-02-15',
      status: 'active',
      paymentStatus: 'paid'
    },
    {
      id: 2,
      name: 'Sara Khan',
      package: 'With Trainer',
      joinDate: '2024-01-14',
      expiryDate: '2024-02-14',
      status: 'active',
      paymentStatus: 'pending'
    },
    {
      id: 3,
      name: 'Muhammad Hassan',
      package: 'Cardio',
      joinDate: '2024-01-10',
      expiryDate: '2024-02-10',
      status: 'expired',
      paymentStatus: 'overdue'
    }
  ];

  const pendingPayments = [
    {
      id: 1,
      memberName: 'Sara Khan',
      amount: 79,
      method: 'JazzCash',
      date: '2024-01-14',
      transactionId: 'JC123456789'
    },
    {
      id: 2,
      memberName: 'Ali Raza',
      amount: 39,
      method: 'EasyPaisa',
      date: '2024-01-13',
      transactionId: 'EP987654321'
    }
  ];

  const expiringMemberships = [
    {
      id: 1,
      name: 'Fatima Sheikh',
      package: 'Weight Training',
      expiryDate: '2024-01-20',
      daysLeft: 3
    },
    {
      id: 2,
      name: 'Hassan Ahmed',
      package: 'With Coach',
      expiryDate: '2024-01-22',
      daysLeft: 5
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: ChartBarIcon },
    { id: 'members', name: 'Members', icon: UserGroupIcon },
    { id: 'payments', name: 'Payments', icon: CurrencyDollarIcon },
    { id: 'attendance', name: 'Attendance', icon: ClockIcon }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <UserGroupIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Members</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalMembers.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Members</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeMembers.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircleIcon className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Expired Members</p>
              <p className="text-2xl font-bold text-gray-900">{stats.expiredMembers.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Payments</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingPayments.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <CurrencyDollarIcon className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${stats.monthlyRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ClockIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Today's Attendance</p>
              <p className="text-2xl font-bold text-gray-900">{stats.attendanceToday.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Members</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.package}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      member.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {member.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Expiring Memberships</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {expiringMemberships.map((member) => (
                <div key={member.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.package}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Expires: {member.expiryDate}</p>
                    <p className="text-sm font-medium text-orange-600">{member.daysLeft} days left</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMembers = () => (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">All Members</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Member
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Package
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Join Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expiry Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentMembers.map((member) => (
              <tr key={member.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{member.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{member.package}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{member.joinDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{member.expiryDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    member.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {member.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-orange-600 hover:text-orange-900 mr-3">
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  <button className="text-blue-600 hover:text-blue-900">
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
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Pending Payment Approvals</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {pendingPayments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{payment.memberName}</p>
                  <p className="text-sm text-gray-600">Amount: ${payment.amount}</p>
                  <p className="text-sm text-gray-600">Method: {payment.method}</p>
                  <p className="text-sm text-gray-600">Transaction ID: {payment.transactionId}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    Approve
                  </button>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAttendance = () => (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Attendance Management</h3>
      </div>
      <div className="p-6">
        <div className="text-center py-12">
          <ClockIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Attendance System</h3>
          <p className="mt-1 text-sm text-gray-500">
            Manage member attendance, view reports, and track daily check-ins.
          </p>
          <div className="mt-6">
            <button className="btn-primary">
              View Attendance Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your gym operations and members</p>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'members' && renderMembers()}
          {activeTab === 'payments' && renderPayments()}
          {activeTab === 'attendance' && renderAttendance()}
        </div>
      </div>
    </Layout>
  );
}
