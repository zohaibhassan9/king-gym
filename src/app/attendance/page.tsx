'use client';

import { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { 
  ClockIcon, 
  UserGroupIcon, 
  ChartBarIcon,
  QrCodeIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

export default function Attendance() {
  const [activeTab, setActiveTab] = useState('check-in');
  const [memberId, setMemberId] = useState('');
  const [attendanceData, setAttendanceData] = useState({
    memberId: '',
    checkInTime: '',
    checkOutTime: '',
    date: new Date().toISOString().split('T')[0]
  });

  const todayAttendance = [
    {
      id: 1,
      memberName: 'Ahmed Ali',
      memberId: 'KG001',
      checkInTime: '08:30 AM',
      checkOutTime: '10:15 AM',
      duration: '1h 45m',
      status: 'completed'
    },
    {
      id: 2,
      memberName: 'Sara Khan',
      memberId: 'KG002',
      checkInTime: '09:00 AM',
      checkOutTime: null,
      duration: null,
      status: 'active'
    },
    {
      id: 3,
      memberName: 'Muhammad Hassan',
      memberId: 'KG003',
      checkInTime: '07:45 AM',
      checkOutTime: '09:30 AM',
      duration: '1h 45m',
      status: 'completed'
    },
    {
      id: 4,
      memberName: 'Fatima Sheikh',
      memberId: 'KG004',
      checkInTime: '06:00 PM',
      checkOutTime: null,
      duration: null,
      status: 'active'
    }
  ];

  const attendanceStats = {
    totalToday: 89,
    currentlyActive: 12,
    averageDuration: '1h 32m',
    peakHour: '7:00 PM'
  };

  const weeklyReport = [
    { day: 'Monday', attendance: 45, peak: '7:00 PM' },
    { day: 'Tuesday', attendance: 52, peak: '6:30 PM' },
    { day: 'Wednesday', attendance: 38, peak: '7:30 PM' },
    { day: 'Thursday', attendance: 61, peak: '6:00 PM' },
    { day: 'Friday', attendance: 48, peak: '7:00 PM' },
    { day: 'Saturday', attendance: 35, peak: '10:00 AM' },
    { day: 'Sunday', attendance: 28, peak: '11:00 AM' }
  ];

  const handleCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberId.trim()) {
      alert('Please enter a member ID');
      return;
    }
    
    const currentTime = new Date().toLocaleTimeString('en-US', { 
      hour12: true, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    console.log('Check-in:', { memberId, time: currentTime });
    alert(`Check-in successful for member ${memberId} at ${currentTime}`);
    setMemberId('');
  };

  const handleCheckOut = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberId.trim()) {
      alert('Please enter a member ID');
      return;
    }
    
    const currentTime = new Date().toLocaleTimeString('en-US', { 
      hour12: true, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    console.log('Check-out:', { memberId, time: currentTime });
    alert(`Check-out successful for member ${memberId} at ${currentTime}`);
    setMemberId('');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'active':
        return <ClockIcon className="h-5 w-5 text-blue-500" />;
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
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Attendance Management</h1>
            <p className="text-gray-600">Track member attendance and generate reports</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <UserGroupIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Today</p>
                  <p className="text-2xl font-bold text-gray-900">{attendanceStats.totalToday}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <ClockIcon className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Currently Active</p>
                  <p className="text-2xl font-bold text-gray-900">{attendanceStats.currentlyActive}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <ChartBarIcon className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Duration</p>
                  <p className="text-2xl font-bold text-gray-900">{attendanceStats.averageDuration}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <ClockIcon className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Peak Hour</p>
                  <p className="text-2xl font-bold text-gray-900">{attendanceStats.peakHour}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('check-in')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'check-in'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Check In/Out
              </button>
              <button
                onClick={() => setActiveTab('today')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'today'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Today's Attendance
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reports'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Reports
              </button>
            </nav>
          </div>

          {/* Check In/Out Tab */}
          {activeTab === 'check-in' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Check In</h2>
                <form onSubmit={handleCheckIn} className="space-y-6">
                  <div>
                    <label htmlFor="checkInMemberId" className="block text-sm font-medium text-gray-700 mb-2">
                      Member ID
                    </label>
                    <input
                      type="text"
                      id="checkInMemberId"
                      value={memberId}
                      onChange={(e) => setMemberId(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter member ID"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full btn-primary text-lg py-4"
                  >
                    Check In
                  </button>
                </form>
              </div>

              <div className="bg-white rounded-lg shadow p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Check Out</h2>
                <form onSubmit={handleCheckOut} className="space-y-6">
                  <div>
                    <label htmlFor="checkOutMemberId" className="block text-sm font-medium text-gray-700 mb-2">
                      Member ID
                    </label>
                    <input
                      type="text"
                      id="checkOutMemberId"
                      value={memberId}
                      onChange={(e) => setMemberId(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter member ID"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-4 px-4 rounded-lg transition-colors duration-200 text-lg"
                  >
                    Check Out
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Today's Attendance Tab */}
          {activeTab === 'today' && (
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Today's Attendance</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Member
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Member ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Check In
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Check Out
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {todayAttendance.map((attendance) => (
                      <tr key={attendance.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {attendance.memberName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {attendance.memberId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {attendance.checkInTime}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {attendance.checkOutTime || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {attendance.duration || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getStatusIcon(attendance.status)}
                            <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(attendance.status)}`}>
                              {attendance.status}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow p-8">
                <h3 className="text-lg font-medium text-gray-900 mb-6">Weekly Attendance Report</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Day
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Attendance
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Peak Hour
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {weeklyReport.map((day, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {day.day}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {day.attendance}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {day.peak}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-8">
                <h3 className="text-lg font-medium text-gray-900 mb-6">Export Reports</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="btn-outline">
                    Export Daily Report
                  </button>
                  <button className="btn-outline">
                    Export Weekly Report
                  </button>
                  <button className="btn-outline">
                    Export Monthly Report
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
