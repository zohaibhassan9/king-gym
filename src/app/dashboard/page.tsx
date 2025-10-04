'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/Layout/Layout';
import { 
  UserIcon, 
  CalendarIcon, 
  ClockIcon, 
  CreditCardIcon,
  ChartBarIcon,
  BellIcon
} from '@heroicons/react/24/outline';

export default function MemberDashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const memberData = {
    name: 'Ahmed Ali',
    memberId: 'KG001',
    package: 'Weight Training Package',
    joinDate: '2024-01-01',
    expiryDate: '2024-02-01',
    nextPayment: '2024-02-01',
    paymentStatus: 'paid',
    attendanceThisMonth: 18,
    lastVisit: '2024-01-15',
    membershipDaysLeft: 17
  };

  const recentActivity = [
    {
      id: 1,
      type: 'checkin',
      time: '2024-01-15 08:30 AM',
      description: 'Checked in for workout'
    },
    {
      id: 2,
      type: 'payment',
      time: '2024-01-14 10:15 AM',
      description: 'Payment of $39 received'
    },
    {
      id: 3,
      type: 'checkout',
      time: '2024-01-15 10:30 AM',
      description: 'Checked out after workout'
    }
  ];

  const upcomingClasses = [
    {
      id: 1,
      name: 'Weight Training',
      time: 'Today 6:00 PM',
      trainer: 'John Smith'
    },
    {
      id: 2,
      name: 'Cardio Blast',
      time: 'Tomorrow 7:00 AM',
      trainer: 'Sarah Johnson'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Please log in to access your dashboard</h1>
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
              Welcome back, {memberData.name}!
            </h1>
            <p className="text-gray-600">Here's your fitness journey overview</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <UserIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Member ID</p>
                  <p className="text-2xl font-bold text-gray-900">{memberData.memberId}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CalendarIcon className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Days Left</p>
                  <p className="text-2xl font-bold text-gray-900">{memberData.membershipDaysLeft}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <ClockIcon className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">{memberData.attendanceThisMonth} visits</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <CreditCardIcon className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Payment Status</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(memberData.paymentStatus)}`}>
                    {memberData.paymentStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Membership Info */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Membership Information</h3>
                </div>
                <div className="p-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Package</dt>
                      <dd className="mt-1 text-sm text-gray-900">{memberData.package}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Join Date</dt>
                      <dd className="mt-1 text-sm text-gray-900">{memberData.joinDate}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Expiry Date</dt>
                      <dd className="mt-1 text-sm text-gray-900">{memberData.expiryDate}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Last Visit</dt>
                      <dd className="mt-1 text-sm text-gray-900">{memberData.lastVisit}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="mt-8 bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                </div>
                <div className="p-6">
                  <div className="flow-root">
                    <ul className="-mb-8">
                      {recentActivity.map((activity, activityIdx) => (
                        <li key={activity.id}>
                          <div className="relative pb-8">
                            {activityIdx !== recentActivity.length - 1 ? (
                              <span
                                className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                aria-hidden="true"
                              />
                            ) : null}
                            <div className="relative flex space-x-3">
                              <div>
                                <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                                  activity.type === 'checkin' ? 'bg-green-500' :
                                  activity.type === 'checkout' ? 'bg-blue-500' :
                                  'bg-orange-500'
                                }`}>
                                  {activity.type === 'checkin' ? (
                                    <ClockIcon className="h-4 w-4 text-white" />
                                  ) : activity.type === 'checkout' ? (
                                    <ClockIcon className="h-4 w-4 text-white" />
                                  ) : (
                                    <CreditCardIcon className="h-4 w-4 text-white" />
                                  )}
                                </span>
                              </div>
                              <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                <div>
                                  <p className="text-sm text-gray-500">{activity.description}</p>
                                </div>
                                <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                  <time dateTime={activity.time}>{activity.time}</time>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Upcoming Classes */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Upcoming Classes</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {upcomingClasses.map((classItem) => (
                      <div key={classItem.id} className="border-l-4 border-orange-500 pl-4">
                        <h4 className="text-sm font-medium text-gray-900">{classItem.name}</h4>
                        <p className="text-sm text-gray-600">{classItem.time}</p>
                        <p className="text-sm text-gray-500">with {classItem.trainer}</p>
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
                <div className="p-6 space-y-3">
                  <a
                    href="/attendance"
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <ClockIcon className="h-4 w-4 mr-2" />
                    Check In/Out
                  </a>
                  <a
                    href="/payments"
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <CreditCardIcon className="h-4 w-4 mr-2" />
                    Make Payment
                  </a>
                  <a
                    href="/profile"
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <UserIcon className="h-4 w-4 mr-2" />
                    Update Profile
                  </a>
                </div>
              </div>

              {/* Notifications */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <BellIcon className="h-5 w-5 text-orange-500 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm text-gray-900">Membership expires in 17 days</p>
                        <p className="text-xs text-gray-500">Renew now to avoid interruption</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <BellIcon className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm text-gray-900">New class schedule available</p>
                        <p className="text-xs text-gray-500">Check out our updated timetable</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
