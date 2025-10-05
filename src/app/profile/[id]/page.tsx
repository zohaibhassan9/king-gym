'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Layout from '@/components/Layout/Layout';
import { 
  UserIcon,
  IdentificationIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowLeftIcon,
  PencilIcon
} from '@heroicons/react/24/outline';

export default function MemberProfile() {
  const params = useParams();
  const router = useRouter();
  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock member data - in real app, this would come from API
  const mockMembers = [
    {
      id: 1,
      memberName: 'Ahmed Ali',
      memberId: 'KG001',
      cnic: '12345-1234567-1',
      phone: '0300-1234567',
      address: 'Lahore, Pakistan',
      package: 'Men Cardio',
      packagePrice: 4000,
      discount: 0,
      finalPrice: 4000,
      joiningDate: '2024-01-01',
      expiryDate: '2024-02-01',
      status: 'active',
      email: 'ahmed.ali@email.com',
      emergencyContact: '0300-9876543',
      bloodGroup: 'O+',
      medicalConditions: 'None',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      paymentHistory: [
        { 
          date: '2024-01-01', 
          amount: 4000, 
          method: 'Cash', 
          status: 'paid',
          description: 'Monthly membership fee'
        },
        { 
          date: '2023-12-01', 
          amount: 4000, 
          method: 'JazzCash', 
          status: 'paid',
          description: 'Monthly membership fee'
        },
        { 
          date: '2023-11-01', 
          amount: 4000, 
          method: 'Bank Transfer', 
          status: 'paid',
          description: 'Monthly membership fee'
        }
      ],
      attendanceHistory: [
        { date: '2024-01-15', checkIn: '08:30 AM', checkOut: '10:00 AM', duration: '1h 30m' },
        { date: '2024-01-14', checkIn: '07:45 AM', checkOut: '09:15 AM', duration: '1h 30m' },
        { date: '2024-01-13', checkIn: '06:00 PM', checkOut: '07:30 PM', duration: '1h 30m' },
        { date: '2024-01-12', checkIn: '08:00 AM', checkOut: '09:30 AM', duration: '1h 30m' },
        { date: '2024-01-11', checkIn: '05:30 PM', checkOut: '07:00 PM', duration: '1h 30m' }
      ],
      achievements: [
        { title: 'Consistent Attendance', description: 'Attended 20+ days this month', date: '2024-01-15' },
        { title: 'Weight Loss Goal', description: 'Lost 5kg in 2 months', date: '2024-01-10' },
        { title: 'Strength Milestone', description: 'Increased bench press by 20kg', date: '2024-01-05' }
      ]
    },
    {
      id: 2,
      memberName: 'Sara Khan',
      memberId: 'KG002',
      cnic: '12345-1234567-2',
      phone: '0300-1234568',
      address: 'Karachi, Pakistan',
      package: 'Ladies (Separate Floor)',
      packagePrice: 4000,
      discount: 500,
      finalPrice: 3500,
      joiningDate: '2024-01-05',
      expiryDate: '2024-02-05',
      status: 'active',
      email: 'sara.khan@email.com',
      emergencyContact: '0300-8765432',
      bloodGroup: 'A+',
      medicalConditions: 'None',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
      paymentHistory: [
        { 
          date: '2024-01-05', 
          amount: 3500, 
          method: 'Bank Transfer', 
          status: 'paid',
          description: 'Monthly membership fee with discount'
        }
      ],
      attendanceHistory: [
        { date: '2024-01-15', checkIn: '09:00 AM', checkOut: '10:30 AM', duration: '1h 30m' },
        { date: '2024-01-14', checkIn: '08:15 AM', checkOut: '09:45 AM', duration: '1h 30m' },
        { date: '2024-01-13', checkIn: '07:00 PM', checkOut: '08:30 PM', duration: '1h 30m' }
      ],
      achievements: [
        { title: 'New Member', description: 'Successfully completed first month', date: '2024-01-05' }
      ]
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchMember = () => {
      setLoading(true);
      setTimeout(() => {
        const foundMember = mockMembers.find(m => m.id === parseInt(params.id as string));
        setMember(foundMember || null);
        setLoading(false);
      }, 1000);
    };

    fetchMember();
  }, [params.id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'expired':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'suspended':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'failed':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-600/10 border border-orange-500/20 text-orange-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-2 animate-pulse"></span>
              Loading Profile
            </div>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!member) {
    return (
      <Layout>
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-600/10 border border-red-500/20 text-red-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
              Member Not Found
            </div>
            <h1 className="text-4xl font-black text-white mb-4">Member Not Found</h1>
            <p className="text-lg text-gray-300 mb-8">The member you're looking for doesn't exist.</p>
            <button
              onClick={() => router.back()}
              className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Go Back
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center text-orange-400 hover:text-orange-300 transition-colors mb-6"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Dashboard
            </button>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center space-x-6">
                {/* Profile Photo */}
                <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-orange-500 shadow-2xl shadow-orange-500/25">
                  <img
                    src={member.photo}
                    alt={member.memberName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face';
                    }}
                  />
                </div>
                
                <div>
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-600/10 border border-orange-500/20 text-orange-300 text-sm font-medium mb-4">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                    Member Profile
                  </div>
                  <h1 className="text-4xl font-black text-white mb-2">
                    {member.memberName}
                  </h1>
                  <p className="text-xl text-gray-300">Member ID: {member.memberId}</p>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0">
                <span className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(member.status)}`}>
                  {member.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'overview'
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/25'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'payments'
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/25'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                Payment History
              </button>
              <button
                onClick={() => setActiveTab('attendance')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'attendance'
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/25'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                Attendance
              </button>
              <button
                onClick={() => setActiveTab('achievements')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'achievements'
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/25'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                Achievements
              </button>
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Personal Information */}
              <div className="lg:col-span-2">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 mb-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                      <div className="text-white font-semibold text-lg">{member.memberName}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Member ID</label>
                      <div className="text-orange-400 font-semibold text-lg">{member.memberId}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">CNIC</label>
                      <div className="text-white">{member.cnic}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                      <div className="text-white">{member.phone}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                      <div className="text-white">{member.email}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Emergency Contact</label>
                      <div className="text-white">{member.emergencyContact}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Blood Group</label>
                      <div className="text-white">{member.bloodGroup}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Medical Conditions</label>
                      <div className="text-white">{member.medicalConditions}</div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                    <div className="text-white">{member.address}</div>
                  </div>
                </div>

                {/* Membership Information */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Membership Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Package</label>
                      <div className="text-orange-400 font-semibold text-lg">{member.package}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Monthly Fee</label>
                      <div className="text-white font-semibold text-lg">Rs {member.finalPrice.toLocaleString()}</div>
                      {member.discount > 0 && (
                        <div className="text-sm text-green-400">-Rs {member.discount} discount applied</div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Joining Date</label>
                      <div className="text-white">{member.joiningDate}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Expiry Date</label>
                      <div className="text-white">{member.expiryDate}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-6">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Total Visits</span>
                      <span className="text-orange-400 font-semibold">{member.attendanceHistory.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Payments Made</span>
                      <span className="text-orange-400 font-semibold">{member.paymentHistory.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Achievements</span>
                      <span className="text-orange-400 font-semibold">{member.achievements.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Member Since</span>
                      <span className="text-orange-400 font-semibold">
                        {Math.floor((new Date().getTime() - new Date(member.joiningDate).getTime()) / (1000 * 60 * 60 * 24))} days
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {member.attendanceHistory.slice(0, 3).map((visit: any, index: number) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="text-gray-300">{visit.date}</span>
                        <span className="text-orange-400">{visit.checkIn}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment History Tab */}
          {activeTab === 'payments' && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Payment History</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-300 font-semibold">Date</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-semibold">Amount</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-semibold">Method</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-semibold">Description</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {member.paymentHistory.map((payment: any, index: number) => (
                      <tr key={index} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                        <td className="py-4 px-4 text-gray-300">{payment.date}</td>
                        <td className="py-4 px-4 text-orange-400 font-semibold">Rs {payment.amount.toLocaleString()}</td>
                        <td className="py-4 px-4 text-gray-300">{payment.method}</td>
                        <td className="py-4 px-4 text-gray-300">{payment.description}</td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getPaymentStatusColor(payment.status)}`}>
                            {payment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Attendance Tab */}
          {activeTab === 'attendance' && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Attendance History</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-300 font-semibold">Date</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-semibold">Check-in</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-semibold">Check-out</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-semibold">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {member.attendanceHistory.map((visit: any, index: number) => (
                      <tr key={index} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                        <td className="py-4 px-4 text-gray-300">{visit.date}</td>
                        <td className="py-4 px-4 text-green-400">{visit.checkIn}</td>
                        <td className="py-4 px-4 text-red-400">{visit.checkOut}</td>
                        <td className="py-4 px-4 text-orange-400">{visit.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Achievements & Milestones</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {member.achievements.map((achievement: any, index: number) => (
                  <div key={index} className="bg-gray-700/50 rounded-xl p-6 border border-gray-600/50">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-600/20 to-orange-700/20 rounded-xl flex items-center justify-center mr-4">
                        <CheckCircleIcon className="h-6 w-6 text-orange-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{achievement.title}</h3>
                        <p className="text-sm text-gray-400">{achievement.date}</p>
                      </div>
                    </div>
                    <p className="text-gray-300">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
