'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout/Layout';

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
  updatedAt?: string;
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
  recentMembers: any[];
  recentPayments: any[];
  todayAttendance: any[];
  recentActivities: any[];
}
import { 
  UserGroupIcon, 
  ClockIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  BellIcon,
  PencilIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  PhoneIcon,
  MapPinIcon,
  IdentificationIcon,
  UserIcon
} from '@heroicons/react/24/outline';

// Helper function to normalize member data from Supabase (snake_case) to camelCase
const normalizeMember = (member: any): Member => {
  if (!member) return member;
  return {
    id: member.id,
    memberId: member.memberId || member.member_id || '',
    memberName: member.memberName || member.member_name || '',
    cnicNumber: member.cnicNumber || member.cnic_number || '',
    contactNumber: member.contactNumber || member.contact_number || '',
    address: member.address || '',
    package: member.package || '',
    packagePrice: member.packagePrice || member.package_price || 0,
    discount: member.discount || 0,
    finalPrice: member.finalPrice || member.final_price || 0,
    joiningDate: member.joiningDate || member.joining_date || '',
    expiryDate: member.expiryDate || member.expiry_date || '',
    photo: member.photo || '',
    status: member.status || 'active',
    createdAt: member.createdAt || member.created_at || '',
    updatedAt: member.updatedAt || member.updated_at || '',
  };
};

export default function StaffDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
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
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [members, setMembers] = useState<Member[]>([]);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [payments, setPayments] = useState<any[]>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFee, setEditingFee] = useState({
    packagePrice: 0,
    discount: 0,
    finalPrice: 0
  });
  const [newTransaction, setNewTransaction] = useState({
    amount: 0,
    method: 'cash',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [statusChange, setStatusChange] = useState({
    newStatus: 'active',
    reason: ''
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
    date: new Date().toISOString().split('T')[0],
    checkInTime: new Date().toTimeString().split(' ')[0].substring(0, 5),
    checkOutTime: '',
    notes: ''
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Load saved tab from localStorage
    const savedTab = localStorage.getItem('staffActiveTab');
    if (savedTab && ['dashboard', 'members', 'attendance', 'payments'].includes(savedTab)) {
      setActiveTab(savedTab);
    }

    // Load data from database
    loadData();
    
    // Auto-refresh when page becomes visible (user switches back to tab)
    // Only refresh if page was hidden for more than 30 seconds to avoid constant reloads
    let lastVisibilityChange = Date.now();
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const timeSinceLastChange = Date.now() - lastVisibilityChange;
        // Only reload if page was hidden for more than 30 seconds
        if (timeSinceLastChange > 30000) {
          loadData();
        }
      }
      lastVisibilityChange = Date.now();
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load members
      const membersResponse = await fetch('/api/members');
      if (!membersResponse.ok) {
        throw new Error('Failed to fetch members');
      }
      const membersData = await membersResponse.json();
      // Ensure members is always an array and normalize data
      const normalizedMembers = Array.isArray(membersData) 
        ? membersData.map(normalizeMember)
        : [];
      setMembers(normalizedMembers);

      // Load payments
      const paymentsResponse = await fetch('/api/payments');
      if (!paymentsResponse.ok) {
        throw new Error('Failed to fetch payments');
      }
      const paymentsData = await paymentsResponse.json();
      // Ensure payments is always an array
      setPayments(Array.isArray(paymentsData) ? paymentsData : []);

      // Load dashboard data
      const dashboardResponse = await fetch('/api/dashboard');
      if (!dashboardResponse.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      const dashboardData = await dashboardResponse.json();
      setDashboardData(dashboardData);

      // Generate recent activities from the loaded data
      // Use the fresh data instead of state (which might be stale)
      generateRecentActivities(normalizedMembers, Array.isArray(paymentsData) ? paymentsData : []);
    } catch (error) {
      console.error('Error loading data:', error);
      // Set empty arrays on error to prevent filter errors
      setMembers([]);
      setPayments([]);
      setDashboardData(null);
    } finally {
      setLoading(false);
    }
  };

  const generateRecentActivities = (membersData: Member[] = members, paymentsData: any[] = payments) => {
    const activities: any[] = [];
    
    // Only add activities if there's real data
    if (paymentsData && paymentsData.length > 0) {
      const recentPayments = paymentsData
        .filter(p => p.createdAt || p.created_at)
        .sort((a, b) => {
          const dateA = new Date(a.createdAt || a.created_at || 0).getTime();
          const dateB = new Date(b.createdAt || b.created_at || 0).getTime();
          return dateB - dateA;
        })
        .slice(0, 3);
      
      recentPayments.forEach(payment => {
        activities.push({
          id: payment.id,
          type: 'payment',
          member: payment.memberName || payment.member?.memberName || 'Unknown',
          amount: (payment.amount || 0).toLocaleString(),
          time: getTimeAgo(payment.createdAt || payment.created_at),
          status: payment.status || 'completed'
        });
      });
    }

    if (membersData && membersData.length > 0) {
      const recentRegistrations = membersData
        .filter(m => m.createdAt || m.joiningDate)
        .sort((a, b) => {
          const dateA = new Date(a.createdAt || a.joiningDate || 0).getTime();
          const dateB = new Date(b.createdAt || b.joiningDate || 0).getTime();
          return dateB - dateA;
        })
        .slice(0, 2);
      
      recentRegistrations.forEach(member => {
        const normalized = normalizeMember(member);
        activities.push({
          id: `reg_${normalized.id}`,
          type: 'registration',
          member: normalized.memberName,
          package: normalized.package,
          time: getTimeAgo(normalized.createdAt || normalized.joiningDate),
          status: 'new'
        });
      });
    }

    // Sort by time and take most recent 5
    const sortedActivities = activities.sort((a, b) => {
      const timeA = a.time.includes('minute') ? 0 : a.time.includes('hour') ? 1 : 2;
      const timeB = b.time.includes('minute') ? 0 : b.time.includes('hour') ? 1 : 2;
      return timeA - timeB;
    });
    
    setRecentActivities(sortedActivities.slice(0, 5));
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

  // Save active tab to localStorage whenever it changes
  useEffect(() => {
    if (activeTab) {
      localStorage.setItem('staffActiveTab', activeTab);
    }
  }, [activeTab]);

  const staffStats = dashboardData?.stats || {
    totalMembers: 0,
    activeMembers: 0,
    inactiveMembers: 0,
    activeToday: 0,
    pendingCheckouts: 0,
    expiringMemberships: 0,
    monthlyRevenue: 0,
    todayRevenue: 0,
    newMembersThisMonth: 0,
    averageAttendance: 0
  };


  // Mock data removed - using real database data
  const allMembers = [
    {
      id: 1,
      memberName: 'Ahmed Ali',
      memberId: 'KG001',
      cnic: '12345-1234567-1',
      phone: '0300-1234567',
      address: 'Lahore, Pakistan',
      package: 'Men Cardio',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      packagePrice: 4000,
      discount: 0,
      finalPrice: 4000,
      joiningDate: '2024-01-01',
      expiryDate: '2024-02-01',
      status: 'active',
      checkInTime: '08:30 AM',
      paymentHistory: [
        { date: '2024-01-01', amount: 4000, method: 'Cash', status: 'paid' },
        { date: '2023-12-01', amount: 4000, method: 'JazzCash', status: 'paid' }
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
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
      packagePrice: 4000,
      discount: 500,
      finalPrice: 3500,
      joiningDate: '2024-01-05',
      expiryDate: '2024-02-05',
      status: 'active',
      checkInTime: '09:00 AM',
      paymentHistory: [
        { date: '2024-01-05', amount: 3500, method: 'Bank Transfer', status: 'paid' }
      ]
    },
    {
      id: 3,
      memberName: 'Muhammad Hassan',
      memberId: 'KG003',
      cnic: '12345-1234567-3',
      phone: '0300-1234569',
      address: 'Islamabad, Pakistan',
      package: 'Men Normal',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
      packagePrice: 3000,
      discount: 0,
      finalPrice: 3000,
      joiningDate: '2023-12-15',
      expiryDate: '2024-01-15',
      status: 'expired',
      checkInTime: '07:45 AM',
      checkOutTime: '09:30 AM',
      paymentHistory: [
        { date: '2023-12-15', amount: 3000, method: 'Cash', status: 'paid' },
        { date: '2023-11-15', amount: 3000, method: 'Easypaisa', status: 'paid' }
      ]
    },
    {
      id: 4,
      memberName: 'Fatima Sheikh',
      memberId: 'KG004',
      cnic: '12345-1234567-4',
      phone: '0300-1234570',
      address: 'Rawalpindi, Pakistan',
      package: 'Couple (Separate Floor)',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
      packagePrice: 6000,
      discount: 1000,
      finalPrice: 5000,
      joiningDate: '2024-01-10',
      expiryDate: '2024-02-10',
      status: 'active',
      checkInTime: '06:00 PM',
      paymentHistory: [
        { date: '2024-01-10', amount: 5000, method: 'Credit Card', status: 'paid' }
      ]
    }
  ];

  const expiringMembers = dashboardData?.expiringMembers || [];
  const expiredMembers = dashboardData?.expiredMembers || [];

  // Function to mark members as expired
  const markMembersAsExpired = () => {
    expiredMembers.forEach((member: Member) => {
      // In a real app, this would update the database
      const normalized = normalizeMember(member);
      console.log(`Marking ${normalized.memberName} as expired`);
    });
    alert(`${expiredMembers.length} members have been marked as expired due to non-payment.`);
  };

  // Function to send WhatsApp alert
  const sendWhatsAppAlert = (member: Member) => {
    const normalized = normalizeMember(member);
    const message = `Hello ${normalized.memberName}, your King Gym membership has expired on ${new Date(normalized.expiryDate).toLocaleDateString()}. Please renew your membership to continue using our facilities. Contact us for renewal options. - King Gym Team`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${normalized.contactNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const todayAttendance = dashboardData?.todayAttendance || [];



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
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'active':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'expired':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  // Ensure members is always an array before filtering
  const filteredMembers = (Array.isArray(members) ? members : []).filter(member => {
    if (!member) return false;
    const normalized = normalizeMember(member);
    const matchesSearch = (normalized.memberName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (normalized.memberId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (normalized.contactNumber || '').includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || normalized.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewMember = (member: Member) => {
    setSelectedMember(member);
    setShowMemberModal(true);
  };

  const handleUpdatePayment = (member: Member) => {
    const normalized = normalizeMember(member);
    setSelectedMember(normalized);
    setNewTransaction({
      amount: normalized.finalPrice,
      method: 'cash',
      description: `Monthly membership fee - ${normalized.package}`,
      date: new Date().toISOString().split('T')[0]
    });
    setShowPaymentModal(true);
  };

  const handleEditFee = (member: Member) => {
    const normalized = normalizeMember(member);
    setSelectedMember(normalized);
    setEditingMember({
      memberName: normalized.memberName,
      package: normalized.package,
      packagePrice: normalized.packagePrice,
      discount: normalized.discount,
      finalPrice: normalized.finalPrice,
      status: normalized.status,
      expiryDate: normalized.expiryDate
    });
    setShowEditMemberModal(true);
  };

  const handleSaveFee = () => {
    if (selectedMember) {
      // Update the member's fee information
      const updatedMember = {
        ...selectedMember,
        packagePrice: editingFee.packagePrice,
        discount: editingFee.discount,
        finalPrice: editingFee.finalPrice
      };
      
      // In a real app, this would update the database
      console.log('Updated member fees:', updatedMember);
      
      // Update the local state (in real app, this would come from API)
      setSelectedMember(updatedMember);
      setShowEditFeeModal(false);
      
      // Show success message
      alert('Member fees updated successfully!');
    }
  };

  const handleAddTransaction = async () => {
    if (selectedMember && newTransaction.amount > 0) {
      try {
        // Create payment record using API
        const paymentData = {
          memberId: selectedMember.id,
          amount: newTransaction.amount,
          method: newTransaction.method,
          transactionId: `TXN${Date.now()}`
        };
        
        // Add payment record
        const paymentResponse = await fetch('/api/payments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentData),
        });
        
        const paymentResult = await paymentResponse.json();
        
        if (paymentResult.success) {
          // Extend member's expiration date by one month
          const currentExpiryDate = new Date(selectedMember.expiryDate);
          const newExpiryDate = new Date(currentExpiryDate);
          newExpiryDate.setMonth(newExpiryDate.getMonth() + 1);
          
          // Update member's expiry date
          const updateResponse = await fetch(`/api/members/${selectedMember.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              expiryDate: newExpiryDate.toISOString().split('T')[0]
            }),
          });
          
          const updateResult = await updateResponse.json();
          
          if (!updateResult.success) {
            console.error('Failed to update member expiry date:', updateResult.error);
          }
        }
        
        // Show success modal
        setShowPaymentSuccessModal(true);
        setShowPaymentModal(false);
        
        // Reset form
        setNewTransaction({
          amount: selectedMember.finalPrice,
          method: 'cash',
          description: '',
          date: new Date().toISOString().split('T')[0]
        });
        
        // Reload data to get updated information
        await loadData();
      } catch (error) {
        console.error('Payment error:', error);
        setPaymentErrorMessage('Payment failed. Please try again.');
        setShowPaymentErrorModal(true);
      }
    }
  };

  const handleFeeChange = (field: string, value: number) => {
    setEditingFee(prev => {
      const updated = { ...prev, [field]: value };
      // Recalculate final price
      updated.finalPrice = updated.packagePrice - updated.discount;
      return updated;
    });
  };

  const handleStatusChange = () => {
    if (selectedMember) {
      const updatedMember = {
        ...selectedMember,
        status: statusChange.newStatus
      };
      
      // In a real app, this would update the database
      console.log('Updated member status:', updatedMember);
      
      // Update the local state
      setSelectedMember(updatedMember);
      setShowStatusModal(false);
      
      // Show success message
      alert(`Member status changed to ${statusChange.newStatus} successfully!`);
    }
  };

  const handleSaveMember = () => {
    if (selectedMember) {
      const updatedMember = {
        ...selectedMember,
        memberName: editingMember.memberName,
        package: editingMember.package,
        packagePrice: editingMember.packagePrice,
        discount: editingMember.discount,
        finalPrice: editingMember.finalPrice,
        status: editingMember.status,
        expiryDate: editingMember.expiryDate
      };
      
      // In a real app, this would update the database
      console.log('Updated member information:', updatedMember);
      
      // Update the local state
      setSelectedMember(updatedMember);
      setShowEditMemberModal(false);
      
      // Show success message
      alert('Member information updated successfully!');
    }
  };

  const handleMemberChange = (field: string, value: any) => {
    setEditingMember(prev => {
      const updated = { ...prev, [field]: value };
      
      // Recalculate final price when package price or discount changes
      if (field === 'packagePrice' || field === 'discount') {
        updated.finalPrice = updated.packagePrice - updated.discount;
      }
      
      return updated;
    });
  };

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
        // Create attendance record using API
        const attendanceRecord = {
          memberId: selectedMember.id,
          date: attendanceData.date,
          checkInTime: attendanceData.checkInTime,
          checkOutTime: attendanceData.checkOutTime || null,
          status: attendanceData.checkOutTime ? 'completed' : 'active'
        };
        
        // Add attendance record
        const response = await fetch('/api/attendance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(attendanceRecord),
        });
        
        const result = await response.json();
        
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


  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <div className="text-white text-lg">Loading dashboard...</div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/20 to-black"></div>
          <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-orange-600/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          
          <div className="text-center relative z-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-600/10 border border-orange-500/20 text-orange-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
              Access Required
            </div>
            <h1 className="text-4xl font-black text-white mb-6">
              Please <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Login</span> to Access Staff Dashboard
            </h1>
            <a href="/login" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25">
              <ClockIcon className="h-6 w-6 mr-2" />
              Staff Login
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-600/10 border border-orange-500/20 text-orange-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
              Staff Dashboard
            </div>
            <h1 className="text-4xl font-black text-white mb-4">
              Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">{user.name}</span>
            </h1>
            <p className="text-lg text-gray-300">Manage gym operations and member services</p>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center items-center">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'dashboard'
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/25'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('members')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'members'
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/25'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                All Members
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
                onClick={() => setActiveTab('payments')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'payments'
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/25'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                Payments
              </button>
              
              {/* Refresh Button */}
              <button
                onClick={loadData}
                className="px-4 py-3 rounded-xl font-semibold transition-all duration-300 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-600 hover:border-gray-500"
                title="Refresh Data"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>

          {/* Dashboard Tab Content */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Welcome Section */}
              <div className="bg-gradient-to-r from-orange-600/10 to-orange-700/10 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Welcome back, {user?.name || 'Staff'}!</h2>
                    <p className="text-gray-300">Here's what's happening at King Gym today</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => window.open('/register', '_blank')}
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <UserGroupIcon className="h-4 w-4" />
                      Register New Member
                    </button>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                      <div className="text-orange-400 font-semibold">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Metrics - Single row with 4 tiles, non-redundant data */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {/* Total Members */}
                <div className="group relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-3xl border border-orange-500/20 p-6 lg:p-8 hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-start justify-between mb-6">
                      <div className="p-4 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-2xl border border-orange-500/30">
                        <UserGroupIcon className="h-10 w-10 text-orange-400" />
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="text-4xl font-black text-white mb-2">{staffStats.totalMembers}</div>
                      <div className="text-gray-400 font-medium">Total Members</div>
                    </div>
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-700/50">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-sm text-gray-300">Active: <span className="text-green-400 font-semibold">{staffStats.activeMembers}</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span className="text-sm text-gray-300">Inactive: <span className="text-red-400 font-semibold">{staffStats.inactiveMembers}</span></span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Today's Check-ins */}
                <div className="group relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-3xl border border-green-500/20 p-6 lg:p-8 hover:border-green-500/50 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-start justify-between mb-6">
                      <div className="p-4 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl border border-green-500/30">
                        <ClockIcon className="h-10 w-10 text-green-400" />
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="text-4xl font-black text-white mb-2">{staffStats.activeToday}</div>
                      <div className="text-gray-400 font-medium">Today's Check-ins</div>
                    </div>
                    <div className="pt-4 border-t border-gray-700/50">
                      <div className="text-sm text-gray-300">
                        <span className="text-green-400 font-semibold">{staffStats.activeToday}</span> members checked in today
                      </div>
                    </div>
                  </div>
                </div>

                {/* Today's Revenue */}
                <div className="group relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-3xl border border-blue-500/20 p-6 lg:p-8 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-start justify-between mb-6">
                      <div className="p-4 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl border border-blue-500/30">
                        <CurrencyDollarIcon className="h-10 w-10 text-blue-400" />
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="text-4xl font-black text-white mb-2">Rs {staffStats.todayRevenue.toLocaleString()}</div>
                      <div className="text-gray-400 font-medium">Today's Revenue</div>
                    </div>
                    <div className="pt-4 border-t border-gray-700/50">
                      <div className="text-sm text-gray-300">
                        {staffStats.todayRevenue > 0 ? (
                          <span className="text-blue-400 font-semibold">Cash collected</span>
                        ) : (
                          <span>No payments today</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Monthly Revenue */}
                <div className="group relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-3xl border border-purple-500/20 p-6 lg:p-8 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-start justify-between mb-6">
                      <div className="p-4 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl border border-purple-500/30">
                        <ChartBarIcon className="h-10 w-10 text-purple-400" />
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="text-4xl font-black text-white mb-2">Rs {staffStats.monthlyRevenue.toLocaleString()}</div>
                      <div className="text-gray-400 font-medium">Monthly Revenue</div>
                    </div>
                    <div className="pt-4 border-t border-gray-700/50">
                      <div className="text-sm text-gray-300">
                        <span className="text-purple-400 font-semibold">{staffStats.newMembersThisMonth}</span> new members this month
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* All Members Tab Content */}
          {activeTab === 'members' && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">All Members</h2>
                <div className="flex gap-4">
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
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-300 font-semibold">Member</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-semibold">Package</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-semibold">Price</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-semibold">Status</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMembers.map((member) => (
                      <tr key={member.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-orange-500/30">
                              {(() => {
                                const normalized = normalizeMember(member);
                                return (
                                  <img
                                    src={normalized.photo}
                                    alt={normalized.memberName}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.currentTarget.src = '/dummy.png';
                                    }}
                                  />
                                );
                              })()}
                            </div>
                            <div>
                              {(() => {
                                const normalized = normalizeMember(member);
                                return (
                                  <>
                                    <div className="font-semibold text-white">{normalized.memberName}</div>
                                    <div className="text-sm text-gray-400">{normalized.memberId}</div>
                                  </>
                                );
                              })()}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-orange-400 font-medium">
                            {normalizeMember(member).package}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-white">
                            {(() => {
                              const normalized = normalizeMember(member);
                              return (
                                <>
                                  <div className="font-semibold">
                                    Rs {normalized.finalPrice.toLocaleString()}
                                  </div>
                                  {normalized.discount > 0 && (
                                    <div className="text-sm text-green-400">
                                      -Rs {normalized.discount} discount
                                    </div>
                                  )}
                                </>
                              );
                            })()}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(member.status)}`}>
                            {member.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditFee(member)}
                              className="p-2 text-green-400 hover:text-green-300 hover:bg-green-500/20 rounded-lg transition-colors"
                              title="Edit Member Info (Plan, Fee, Status)"
                            >
                              <PencilIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleUpdatePayment(member)}
                              className="p-2 text-orange-400 hover:text-orange-300 hover:bg-orange-500/20 rounded-lg transition-colors"
                              title="Add Transaction"
                            >
                              <CurrencyDollarIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleMarkAttendance(member)}
                              className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-colors"
                              title="Mark Attendance"
                            >
                              <ClockIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleViewProfile(member)}
                              className="p-2 text-purple-400 hover:text-purple-300 hover:bg-purple-500/20 rounded-lg transition-colors"
                              title="View Profile"
                            >
                              <UserIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => sendWhatsAppAlert(member)}
                              className="p-2 text-green-400 hover:text-green-300 hover:bg-green-500/20 rounded-lg transition-colors"
                              title="Send WhatsApp Alert"
                            >
                              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Attendance Tab Content */}
          {activeTab === 'attendance' && (
            <div className="space-y-6">
              {/* Today's Attendance */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Today's Attendance</h2>
                  <div className="text-sm text-gray-400">
                    {new Date().toLocaleDateString()}
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4 text-gray-300 font-semibold">Member</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-semibold">Check-in Time</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-semibold">Check-out Time</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-semibold">Status</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {todayAttendance.map((attendance) => {
                        // Normalize attendance data to handle both snake_case and camelCase
                        const memberName = attendance.memberName || attendance.member_name || 'Unknown Member';
                        const memberId = attendance.memberId || attendance.member_id || '';
                        const checkInTime = attendance.checkInTime || attendance.check_in_time || '-';
                        const checkOutTime = attendance.checkOutTime || attendance.check_out_time || '-';
                        
                        return (
                          <tr key={attendance.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                            <td className="py-4 px-4">
                              <div>
                                <div className="font-semibold text-white">{memberName}</div>
                                {memberId && <div className="text-sm text-gray-400">{memberId}</div>}
                              </div>
                            </td>
                            <td className="py-4 px-4 text-green-400 font-medium">{checkInTime}</td>
                            <td className="py-4 px-4 text-red-400 font-medium">{checkOutTime}</td>
                            <td className="py-4 px-4">
                              <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(attendance.status || 'active')}`}>
                                {attendance.status || 'active'}
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
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* All Members - Quick Attendance */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
                <h3 className="text-xl font-bold text-white mb-6">Mark Attendance for Any Member</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4 text-gray-300 font-semibold">Member</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-semibold">Package</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-semibold">Status</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMembers.map((member) => (
                        <tr key={member.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-lg overflow-hidden border-2 border-orange-500/30">
                                {(() => {
                                  const normalized = normalizeMember(member);
                                  return (
                                    <img
                                      src={normalized.photo}
                                      alt={normalized.memberName}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        e.currentTarget.src = '/dummy.png';
                                      }}
                                    />
                                  );
                                })()}
                              </div>
                              <div>
                                {(() => {
                                  const normalized = normalizeMember(member);
                                  return (
                                    <>
                                      <div className="font-semibold text-white">{normalized.memberName}</div>
                                      <div className="text-sm text-gray-400">{normalized.memberId}</div>
                                    </>
                                  );
                                })()}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-orange-400 font-medium">
                              {normalizeMember(member).package}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(member.status)}`}>
                              {member.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleMarkAttendance(member)}
                                className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-colors"
                                title="Mark Attendance"
                              >
                                <ClockIcon className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => handleViewProfile(member)}
                                className="p-2 text-purple-400 hover:text-purple-300 hover:bg-purple-500/20 rounded-lg transition-colors"
                                title="View Profile"
                              >
                                <UserIcon className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => sendWhatsAppAlert(member)}
                                className="p-2 text-green-400 hover:text-green-300 hover:bg-green-500/20 rounded-lg transition-colors"
                                title="Send WhatsApp Alert"
                              >
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Payments Tab Content */}
          {activeTab === 'payments' && (
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
                      {payments.slice(0, 10).map((payment: any) => {
                        // Normalize payment data to handle both snake_case and camelCase
                        const memberName = payment.memberName || payment.member_name || 'Unknown Member';
                        const memberId = payment.memberId || payment.member_id || '';
                        const amount = payment.amount || 0;
                        const method = payment.method || 'cash';
                        const status = payment.status || 'pending';
                        const paymentDate = payment.date || payment.created_at || payment.createdAt || '';
                        
                        // Format date if it's a string that needs formatting
                        let formattedDate = paymentDate;
                        if (paymentDate && typeof paymentDate === 'string' && paymentDate.includes('T')) {
                          try {
                            const date = new Date(paymentDate);
                            formattedDate = date.toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            });
                          } catch (e) {
                            // Keep original date string if parsing fails
                          }
                        }
                        
                        return (
                          <tr key={payment.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                            <td className="py-4 px-4">
                              <div className="font-semibold text-white">{memberName}</div>
                              {memberId && <div className="text-sm text-gray-400">{memberId}</div>}
                            </td>
                            <td className="py-4 px-4 text-orange-400 font-semibold">
                              Rs {amount.toLocaleString()}
                            </td>
                            <td className="py-4 px-4 text-gray-300 capitalize">{method}</td>
                            <td className="py-4 px-4">
                              <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(status)}`}>
                                {status}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-gray-300">{formattedDate || '-'}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Member Details Modal */}
          {showMemberModal && selectedMember && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-white">Member Details</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setShowMemberModal(false);
                          window.open(`/profile/${selectedMember.id}`, '_blank');
                        }}
                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-semibold"
                      >
                        View Full Profile
                      </button>
                      <button
                        onClick={() => setShowMemberModal(false)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Member Photo */}
                    <div className="flex justify-center mb-6">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-orange-500 shadow-2xl shadow-orange-500/25">
                        <img
                          src={selectedMember.photo}
                          alt={selectedMember.memberName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(selectedMember.memberName) + '&background=orange&color=fff&size=200';
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                        <div className="text-white font-semibold">{selectedMember.memberName}</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Member ID</label>
                        <div className="text-orange-400 font-semibold">{selectedMember.memberId}</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">CNIC</label>
                        <div className="text-white">{selectedMember.cnic}</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                        <div className="text-white">{selectedMember.phone}</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Package</label>
                        <div className="text-orange-400 font-semibold">{selectedMember.package}</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Monthly Fee</label>
                        <div className="text-white">Rs {selectedMember.finalPrice.toLocaleString()}</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Joining Date</label>
                        <div className="text-white">{selectedMember.joiningDate}</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Expiry Date</label>
                        <div className="text-white">{selectedMember.expiryDate}</div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                      <div className="text-white">{selectedMember.address}</div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Payment History</h4>
                      <div className="space-y-3">
                        {selectedMember.paymentHistory.map((payment: any, index: number) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                            <div>
                              <div className="text-white font-medium">Rs {payment.amount.toLocaleString()}</div>
                              <div className="text-sm text-gray-400">{payment.method}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-300">{payment.date}</div>
                              <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(payment.status)}`}>
                                {payment.status}
                              </span>
                            </div>
                          </div>
                        ))
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Add Transaction Modal */}
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
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Description (Optional)</label>
                      <textarea
                        value={newTransaction.description}
                        onChange={(e) => setNewTransaction(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        rows={2}
                        placeholder="Enter transaction description..."
                      />
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={() => setShowPaymentModal(false)}
                        className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddTransaction}
                        className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                      >
                        Add Transaction
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Status Change Modal */}
          {showStatusModal && selectedMember && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-md w-full">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">Change Member Status</h3>
                    <button
                      onClick={() => setShowStatusModal(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Member</label>
                      <div className="text-white font-semibold">{selectedMember.memberName}</div>
                      <div className="text-sm text-gray-400">Current Status: {selectedMember.status}</div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">New Status</label>
                      <select
                        value={statusChange.newStatus}
                        onChange={(e) => setStatusChange(prev => ({ ...prev, newStatus: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Reason (Optional)</label>
                      <textarea
                        value={statusChange.reason}
                        onChange={(e) => setStatusChange(prev => ({ ...prev, reason: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        rows={3}
                        placeholder="Enter reason for status change..."
                      />
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={() => setShowStatusModal(false)}
                        className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleStatusChange}
                        className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${
                          statusChange.newStatus === 'active'
                            ? 'bg-green-600 hover:bg-green-700'
                            : statusChange.newStatus === 'inactive'
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-yellow-600 hover:bg-yellow-700'
                        }`}
                      >
                        {statusChange.newStatus === 'active' ? 'Activate' : 
                         statusChange.newStatus === 'inactive' ? 'Deactivate' : 'Suspend'} Member
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Edit Member Modal */}
          {showEditMemberModal && selectedMember && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-white">Edit Member Information</h3>
                    <button
                      onClick={() => setShowEditMemberModal(false)}
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
                          src={selectedMember.photo}
                          alt={selectedMember.memberName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(selectedMember.memberName) + '&background=orange&color=fff&size=200';
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
                          <option value="Couple (Separate Floor)">Couple (Separate Floor)</option>
                          <option value="Ladies (Separate Floor)">Ladies (Separate Floor)</option>
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
                        onClick={() => setShowEditMemberModal(false)}
                        className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveMember}
                        className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Attendance Modal */}
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
                      <div className="text-sm text-gray-400">{selectedMember.memberId} - {selectedMember.package}</div>
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
                    
                    <div className="grid grid-cols-2 gap-4">
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
                        <label className="block text-sm font-medium text-gray-300 mb-2">Check-out Time (Optional)</label>
                        <input
                          type="time"
                          value={attendanceData.checkOutTime}
                          onChange={(e) => setAttendanceData(prev => ({ ...prev, checkOutTime: e.target.value }))}
                          className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Notes (Optional)</label>
                      <textarea
                        value={attendanceData.notes}
                        onChange={(e) => setAttendanceData(prev => ({ ...prev, notes: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        rows={3}
                        placeholder="Add any notes about the visit..."
                      />
                    </div>

                    <div className="bg-orange-600/10 border border-orange-500/30 rounded-lg p-4">
                      <h4 className="text-orange-400 font-semibold mb-2">Attendance Summary</h4>
                      <div className="text-sm text-gray-300 space-y-1">
                        <div>Date: {new Date(attendanceData.date).toLocaleDateString()}</div>
                        <div>Check-in: {attendanceData.checkInTime}</div>
                        {attendanceData.checkOutTime && (
                          <div>Check-out: {attendanceData.checkOutTime}</div>
                        )}
                        <div className="text-orange-400 font-medium">
                          Status: {attendanceData.checkOutTime ? 'Completed' : 'Active'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={() => setShowAttendanceModal(false)}
                        className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveAttendance}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Mark Attendance
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Expiring Members Modal */}
          {showExpiringModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-white">Members with Expiring Memberships</h3>
                    <button
                      onClick={() => setShowExpiringModal(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-gray-300">
                      The following {expiringMembers.length} members have memberships expiring within the next 5 days. 
                      Contact them for renewal to maintain their membership.
                    </p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-3 px-4 text-gray-300 font-semibold">Member</th>
                          <th className="text-left py-3 px-4 text-gray-300 font-semibold">Package</th>
                          <th className="text-left py-3 px-4 text-gray-300 font-semibold">Expiry Date</th>
                          <th className="text-left py-3 px-4 text-gray-300 font-semibold">Days Left</th>
                          <th className="text-left py-3 px-4 text-gray-300 font-semibold">Contact</th>
                          <th className="text-left py-3 px-4 text-gray-300 font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {expiringMembers.map((member: Member) => {
                          const normalized = normalizeMember(member);
                          const expiryDate = new Date(normalized.expiryDate);
                          const today = new Date();
                          const daysLeft = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                          
                          return (
                            <tr key={normalized.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                              <td className="py-4 px-4">
                                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 rounded-lg overflow-hidden border-2 border-orange-500/30">
                                    <img
                                      src={normalized.photo}
                                      alt={normalized.memberName}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        e.currentTarget.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(normalized.memberName) + '&background=orange&color=fff&size=200';
                                      }}
                                    />
                                  </div>
                                  <div>
                                    <div className="font-semibold text-white">{normalized.memberName}</div>
                                    <div className="text-sm text-gray-400">{normalized.memberId}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="text-orange-400 font-medium">{member.package}</div>
                              </td>
                              <td className="py-4 px-4 text-gray-300">
                                {expiryDate.toLocaleDateString()}
                              </td>
                              <td className="py-4 px-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  daysLeft <= 1 ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                                  daysLeft <= 3 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                                  'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                                }`}>
                                  {daysLeft} day{daysLeft !== 1 ? 's' : ''}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <div className="text-sm text-gray-300">{member.contactNumber}</div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => {
                                      setSelectedMember(member);
                                      setShowExpiringModal(false);
                                      setActiveTab('members');
                                    }}
                                    className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-colors"
                                    title="View Member Details"
                                  >
                                    <UserIcon className="h-5 w-5" />
                                  </button>
                                  <button
                                    onClick={() => {
                                      setSelectedMember(member);
                                      setShowExpiringModal(false);
                                      setActiveTab('payments');
                                    }}
                                    className="p-2 text-green-400 hover:text-green-300 hover:bg-green-500/20 rounded-lg transition-colors"
                                    title="Add Payment/Renewal"
                                  >
                                    <CurrencyDollarIcon className="h-5 w-5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {expiringMembers.length === 0 && (
                    <div className="text-center py-8">
                      <div className="text-gray-400 text-lg">No memberships expiring soon</div>
                      <div className="text-gray-500 text-sm mt-2">All memberships are up to date</div>
                    </div>
                  )}

                  <div className="flex gap-3 pt-6 border-t border-gray-700 mt-6">
                    <button
                      onClick={() => setShowExpiringModal(false)}
                      className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        setShowExpiringModal(false);
                        setActiveTab('members');
                      }}
                      className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      Go to Members
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Success Modal */}
          {showSuccessModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6 max-w-md w-full mx-4">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mr-4">
                    <CheckCircleIcon className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Attendance Marked</h3>
                    <p className="text-gray-400 text-sm">Successfully recorded</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-gray-300">
                    Attendance has been successfully marked for <span className="font-semibold text-white">{selectedMember?.memberName}</span>.
                  </p>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowSuccessModal(false)}
                    className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Error Modal */}
          {showErrorModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6 max-w-md w-full mx-4">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mr-4">
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Error</h3>
                    <p className="text-gray-400 text-sm">Attendance marking failed</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-gray-300">
                    {errorMessage}
                  </p>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowErrorModal(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Payment Error Modal */}
          {showPaymentErrorModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6 max-w-md w-full mx-4">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mr-4">
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Payment Failed</h3>
                    <p className="text-gray-400 text-sm">Transaction could not be processed</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-gray-300">
                    {paymentErrorMessage}
                  </p>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowPaymentErrorModal(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Payment Success Modal */}
          {showPaymentSuccessModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6 max-w-md w-full mx-4">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mr-4">
                    <CheckCircleIcon className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Payment {newTransaction.method === 'cash' ? 'Approved' : 'Pending'}</h3>
                    <p className="text-gray-400 text-sm">
                      {newTransaction.method === 'cash' 
                        ? 'Transaction completed and approved' 
                        : 'Transaction recorded, awaiting admin approval'
                      }
                    </p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-gray-300 mb-3">
                    Payment of <span className="font-semibold text-white">Rs {newTransaction.amount?.toLocaleString() || '0'}</span> has been successfully recorded for <span className="font-semibold text-white">{selectedMember?.memberName}</span>.
                  </p>
                  <div className="bg-gray-700/30 rounded-lg p-3 text-sm">
                    <div className="text-gray-300 space-y-1">
                      <div><span className="text-gray-400">Previous Expiry:</span> {selectedMember?.expiryDate ? new Date(selectedMember.expiryDate).toLocaleDateString() : 'N/A'}</div>
                      <div><span className="text-gray-400">New Expiry:</span> {selectedMember?.expiryDate ? new Date(new Date(selectedMember.expiryDate).setMonth(new Date(selectedMember.expiryDate).getMonth() + 1)).toLocaleDateString() : 'N/A'}</div>
                      <div className="text-green-400 font-medium">Membership extended by 1 month</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowPaymentSuccessModal(false)}
                    className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                  >
                    Continue
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
