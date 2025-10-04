'use client';

import { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { UserIcon, IdentificationIcon, PhoneIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';

export default function Register() {
  const [formData, setFormData] = useState({
    memberName: '',
    cnicNumber: '',
    contactNumber: '',
    address: '',
    package: '',
    joiningDate: '',
    expiryDate: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const packages = [
    { id: 'cardio', name: 'Cardio Package', price: '$29/month' },
    { id: 'weight', name: 'Weight Training Package', price: '$39/month' },
    { id: 'trainer', name: 'With Trainer Package', price: '$79/month' },
    { id: 'coach', name: 'With Coach Package', price: '$99/month' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.memberName.trim()) {
      newErrors.memberName = 'Member name is required';
    }

    if (!formData.cnicNumber.trim()) {
      newErrors.cnicNumber = 'CNIC number is required';
    } else if (!/^\d{5}-\d{7}-\d{1}$/.test(formData.cnicNumber)) {
      newErrors.cnicNumber = 'CNIC must be in format 12345-1234567-1';
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^\d{11}$/.test(formData.contactNumber.replace(/\D/g, ''))) {
      newErrors.contactNumber = 'Contact number must be 11 digits';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.package) {
      newErrors.package = 'Please select a package';
    }

    if (!formData.joiningDate) {
      newErrors.joiningDate = 'Joining date is required';
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (formData.joiningDate && new Date(formData.expiryDate) <= new Date(formData.joiningDate)) {
      newErrors.expiryDate = 'Expiry date must be after joining date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      alert('Registration successful! You will be contacted soon for payment confirmation.');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Join King Gym</h1>
              <p className="text-lg text-gray-600">
                Fill out the form below to start your fitness journey with us
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Member Name */}
              <div>
                <label htmlFor="memberName" className="block text-sm font-medium text-gray-700 mb-2">
                  <UserIcon className="h-5 w-5 inline mr-2" />
                  Member Name *
                </label>
                <input
                  type="text"
                  id="memberName"
                  name="memberName"
                  value={formData.memberName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                    errors.memberName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.memberName && (
                  <p className="mt-1 text-sm text-red-600">{errors.memberName}</p>
                )}
              </div>

              {/* CNIC Number */}
              <div>
                <label htmlFor="cnicNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  <IdentificationIcon className="h-5 w-5 inline mr-2" />
                  CNIC Number *
                </label>
                <input
                  type="text"
                  id="cnicNumber"
                  name="cnicNumber"
                  value={formData.cnicNumber}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                    errors.cnicNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="12345-1234567-1"
                />
                {errors.cnicNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.cnicNumber}</p>
                )}
              </div>

              {/* Contact Number */}
              <div>
                <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  <PhoneIcon className="h-5 w-5 inline mr-2" />
                  Contact Number *
                </label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                    errors.contactNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="03XX-XXXXXXX"
                />
                {errors.contactNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.contactNumber}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPinIcon className="h-5 w-5 inline mr-2" />
                  Address *
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your complete address"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                )}
              </div>

              {/* Package Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Select Package *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        formData.package === pkg.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, package: pkg.id }))}
                    >
                      <input
                        type="radio"
                        id={pkg.id}
                        name="package"
                        value={pkg.id}
                        checked={formData.package === pkg.id}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-gray-900">{pkg.name}</h3>
                          <p className="text-sm text-gray-600">{pkg.price}</p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          formData.package === pkg.id
                            ? 'border-orange-500 bg-orange-500'
                            : 'border-gray-300'
                        }`}>
                          {formData.package === pkg.id && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.package && (
                  <p className="mt-1 text-sm text-red-600">{errors.package}</p>
                )}
              </div>

              {/* Joining Date */}
              <div>
                <label htmlFor="joiningDate" className="block text-sm font-medium text-gray-700 mb-2">
                  <CalendarIcon className="h-5 w-5 inline mr-2" />
                  Joining Date *
                </label>
                <input
                  type="date"
                  id="joiningDate"
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                    errors.joiningDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.joiningDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.joiningDate}</p>
                )}
              </div>

              {/* Expiry Date */}
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                  <CalendarIcon className="h-5 w-5 inline mr-2" />
                  Expiry Date *
                </label>
                <input
                  type="date"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                    errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.expiryDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full btn-primary text-lg py-4"
                >
                  Complete Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
