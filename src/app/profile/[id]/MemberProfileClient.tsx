'use client';

import { useState, useEffect } from 'react';
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
  XCircleIcon,
  ArrowLeftIcon,
  TrashIcon
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
  updatedAt?: string;
}

interface MemberProfileClientProps {
  memberId: string;
}

export default function MemberProfileClient({ memberId }: MemberProfileClientProps) {
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    loadMemberData();
  }, [memberId]);

  const loadMemberData = async () => {
    try {
      setLoading(true);
      
      // Import client database
      const { default: clientDb } = await import('../../../../lib/client-database');
      
      // Load member data
      const memberData = clientDb.getMemberById(Number(memberId));
      if (memberData) {
        setMember(memberData);
        
        // Load related data
        const memberPayments = clientDb.getPaymentsByMemberId(Number(memberId));
        const memberAttendance = clientDb.getAttendanceByMemberId(Number(memberId));
        
        // Enrich payment data with status and other information
        const enrichedPayments = memberPayments.map(payment => ({
          ...payment,
          status: payment.status || 'completed', // Default status if not set
          memberName: memberData.memberName // Add member name for consistency
        }));
        
        setPayments(enrichedPayments);
        setAttendance(memberAttendance);
      } else {
        // Handle case where member doesn't exist (e.g., fallback 'default' case)
        console.log('Member not found for ID:', memberId);
        setMember(null);
        setPayments([]);
        setAttendance([]);
      }
    } catch (error) {
      console.error('Error loading member data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'inactive':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'expired':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'suspended':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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

  const handleDeleteMember = async () => {
    if (!member) return;
    
    try {
      setDeleting(true);
      
      // Import client database
      const { default: clientDb } = await import('../../../../lib/client-database');
      
      // Delete member
      clientDb.deleteMember(member.id);
      
      // Show success modal
      setShowSuccessModal(true);
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting member:', error);
      setDeleting(false);
      setShowDeleteModal(false);
      // You could add an error modal here if needed
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    window.location.href = '/staff';
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading member profile...</p>
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
            <XCircleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Member Not Found</h1>
            <p className="text-gray-400 mb-6">The member profile you're looking for doesn't exist.</p>
            <button
              onClick={() => window.history.back()}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-black py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => window.history.back()}
              className="flex items-center text-gray-400 hover:text-white transition-colors mb-4"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back
            </button>
            <h1 className="text-4xl font-bold text-white">Member Profile</h1>
            <p className="text-gray-400 text-lg">Complete member information and activity</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Member Info Card */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
                {/* Profile Photo */}
                <div className="flex justify-center mb-6">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-orange-500 shadow-2xl shadow-orange-500/25">
                    <img
                      src={member.photo}
                      alt={member.memberName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.memberName)}&background=orange&color=fff&size=200`;
                      }}
                    />
                  </div>
                </div>

                {/* Member Details */}
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{member.memberName}</h2>
                    <div className="text-orange-400 font-semibold text-lg">{member.memberId}</div>
                  </div>

                  <div className="flex items-center justify-center">
                    <span className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(member.status)}`}>
                      {member.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-gray-700">
                    <div className="flex items-center text-gray-300">
                      <IdentificationIcon className="h-5 w-5 mr-3 text-orange-400" />
                      <span className="text-sm">{member.cnicNumber || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <PhoneIcon className="h-5 w-5 mr-3 text-orange-400" />
                      <span className="text-sm">{member.contactNumber}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <MapPinIcon className="h-5 w-5 mr-3 text-orange-400" />
                      <span className="text-sm">{member.address}</span>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <div className="pt-4 border-t border-gray-700">
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="w-full bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-500/50 font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center"
                    >
                      <TrashIcon className="h-4 w-4 mr-2" />
                      Delete Member
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Membership Details */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
                <h3 className="text-xl font-bold text-white mb-6">Membership Details</h3>
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
                    <div className="text-white">{formatDate(member.joiningDate)}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Expiry Date</label>
                    <div className="text-white">{formatDate(member.expiryDate)}</div>
                  </div>
                </div>
              </div>

              {/* Payment History */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
                <h3 className="text-xl font-bold text-white mb-6">Payment History</h3>
                {payments.length === 0 ? (
                  <div className="text-center py-8">
                    <CurrencyDollarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">No payment history available</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {payments.slice(0, 5).map((payment: any) => (
                      <div key={payment.id} className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                        <div>
                          <div className="text-white font-medium">Rs {payment.amount?.toLocaleString() || '0'}</div>
                          <div className="text-sm text-gray-400">{payment.method}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-300">{getTimeAgo(payment.createdAt)}</div>
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold border ${
                            payment.status === 'completed' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                            'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                          }`}>
                            {payment.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Attendance History */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
                <h3 className="text-xl font-bold text-white mb-6">Recent Attendance</h3>
                {attendance.length === 0 ? (
                  <div className="text-center py-8">
                    <ClockIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">No attendance records available</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {attendance.slice(0, 5).map((record: any) => (
                      <div key={record.id} className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                        <div>
                          <div className="text-white font-medium">{formatDate(record.date)}</div>
                          <div className="text-sm text-gray-400">
                            {record.checkInTime} - {record.checkOutTime || 'Active'}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-300">{getTimeAgo(record.createdAt)}</div>
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold border ${
                            record.status === 'completed' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                            'bg-blue-500/20 text-blue-400 border-blue-500/30'
                          }`}>
                            {record.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6 max-w-md w-full mx-4">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mr-4">
                  <TrashIcon className="h-6 w-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Delete Member</h3>
                  <p className="text-gray-400 text-sm">This action cannot be undone</p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-300 mb-2">
                  Are you sure you want to delete <span className="font-semibold text-white">{member?.memberName}</span>?
                </p>
                <p className="text-sm text-gray-400">
                  This will permanently remove the member and all associated data including payments and attendance records.
                </p>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  disabled={deleting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteMember}
                  disabled={deleting}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50"
                >
                  {deleting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Deleting...
                    </>
                  ) : (
                    'Delete Member'
                  )}
                </button>
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
                  <h3 className="text-xl font-bold text-white">Member Deleted</h3>
                  <p className="text-gray-400 text-sm">Successfully removed from the system</p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-300 mb-2">
                  <span className="font-semibold text-white">{member?.memberName}</span> has been permanently deleted.
                </p>
                <p className="text-sm text-gray-400">
                  All associated data including payments and attendance records have been removed.
                </p>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={handleSuccessModalClose}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  Continue to Dashboard
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
