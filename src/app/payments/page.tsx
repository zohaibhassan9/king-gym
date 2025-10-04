'use client';

import { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { 
  CreditCardIcon, 
  BanknotesIcon, 
  DevicePhoneMobileIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export default function Payments() {
  const [activeTab, setActiveTab] = useState('make-payment');
  const [paymentData, setPaymentData] = useState({
    memberId: '',
    amount: '',
    paymentMethod: '',
    transactionId: '',
    description: ''
  });

  const paymentMethods = [
    { id: 'cash', name: 'Cash', icon: BanknotesIcon, description: 'Pay at gym reception' },
    { id: 'jazzcash', name: 'JazzCash', icon: DevicePhoneMobileIcon, description: 'Mobile wallet payment' },
    { id: 'easypaisa', name: 'EasyPaisa', icon: DevicePhoneMobileIcon, description: 'Mobile wallet payment' },
    { id: 'bank', name: 'Bank Transfer', icon: CreditCardIcon, description: 'Direct bank transfer' },
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCardIcon, description: 'Card payment' }
  ];

  const paymentHistory = [
    {
      id: 1,
      date: '2024-01-15',
      amount: 79,
      method: 'JazzCash',
      status: 'completed',
      transactionId: 'JC123456789',
      description: 'Monthly membership fee'
    },
    {
      id: 2,
      date: '2024-01-10',
      amount: 39,
      method: 'Cash',
      status: 'completed',
      transactionId: 'CASH001',
      description: 'Personal training session'
    },
    {
      id: 3,
      date: '2024-01-08',
      amount: 29,
      method: 'EasyPaisa',
      status: 'pending',
      transactionId: 'EP987654321',
      description: 'Monthly membership fee'
    },
    {
      id: 4,
      date: '2024-01-05',
      amount: 99,
      method: 'Bank Transfer',
      status: 'completed',
      transactionId: 'BT456789123',
      description: 'With Coach package'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Payment submitted:', paymentData);
    alert('Payment submitted successfully! It will be verified by admin shortly.');
    setPaymentData({
      memberId: '',
      amount: '',
      paymentMethod: '',
      transactionId: '',
      description: ''
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'failed':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Payment Management</h1>
            <p className="text-gray-600">Manage your gym payments and transactions</p>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('make-payment')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'make-payment'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Make Payment
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'history'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Payment History
              </button>
            </nav>
          </div>

          {/* Make Payment Tab */}
          {activeTab === 'make-payment' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Make a Payment</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="memberId" className="block text-sm font-medium text-gray-700 mb-2">
                      Member ID
                    </label>
                    <input
                      type="text"
                      id="memberId"
                      name="memberId"
                      value={paymentData.memberId}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter your member ID"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                      Amount ($)
                    </label>
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      value={paymentData.amount}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter amount"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
                            paymentData.paymentMethod === method.id
                              ? 'border-orange-500 bg-orange-50'
                              : 'border-gray-200 hover:border-orange-300'
                          }`}
                          onClick={() => setPaymentData(prev => ({ ...prev, paymentMethod: method.id }))}
                        >
                          <input
                            type="radio"
                            id={method.id}
                            name="paymentMethod"
                            value={method.id}
                            checked={paymentData.paymentMethod === method.id}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <div className="flex items-center">
                            <method.icon className="h-6 w-6 text-orange-600 mr-3" />
                            <div>
                              <h3 className="font-medium text-gray-900">{method.name}</h3>
                              <p className="text-sm text-gray-600">{method.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {paymentData.paymentMethod && paymentData.paymentMethod !== 'cash' && (
                    <div>
                      <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700 mb-2">
                        Transaction ID
                      </label>
                      <input
                        type="text"
                        id="transactionId"
                        name="transactionId"
                        value={paymentData.transactionId}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Enter transaction ID"
                        required
                      />
                    </div>
                  )}

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={paymentData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Payment description (optional)"
                    />
                  </div>

                  <div className="pt-6">
                    <button
                      type="submit"
                      className="w-full btn-primary text-lg py-4"
                    >
                      Submit Payment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Payment History Tab */}
          {activeTab === 'history' && (
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Payment History</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Method
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Transaction ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paymentHistory.map((payment) => (
                      <tr key={payment.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {payment.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ${payment.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {payment.method}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {payment.transactionId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {payment.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getStatusIcon(payment.status)}
                            <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                              {payment.status}
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
        </div>
      </div>
    </Layout>
  );
}
