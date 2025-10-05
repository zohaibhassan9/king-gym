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
    expiryDate: '',
    photo: null as File | null
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const packages = [
    { id: 'cardio', name: 'Men Cardio', price: 'Rs 4,000/month' },
    { id: 'weight', name: 'Men Normal', price: 'Rs 3,000/month' },
    { id: 'trainer', name: 'Couple (Separate Floor)', price: 'Rs 6,000/month' },
    { id: 'coach', name: 'Ladies (Separate Floor)', price: 'Rs 4,000/month' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = {
        ...prev,
        [name]: value
      };
      
      // Auto-set expiry date when joining date is selected
      if (name === 'joiningDate' && value) {
        const joiningDate = new Date(value);
        const expiryDate = new Date(joiningDate);
        expiryDate.setMonth(expiryDate.getMonth() + 1); // Add 1 month
        updated.expiryDate = expiryDate.toISOString().split('T')[0];
      }
      
      return updated;
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          photo: 'Please select a valid image file'
        }));
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          photo: 'Image size should be less than 5MB'
        }));
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        photo: file
      }));
      
      // Clear error
      if (errors.photo) {
        setErrors(prev => ({
          ...prev,
          photo: ''
        }));
      }
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

    if (!formData.photo) {
      newErrors.photo = 'Profile photo is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        // Import client database dynamically
        const { default: clientDb } = await import('../../../lib/client-database');
        
        // Set package price
        const packagePrice = clientDb.getPackagePrice(formData.package);
        const finalPrice = packagePrice - (formData.discount || 0);
        
        const memberData = {
          ...formData,
          packagePrice,
          finalPrice,
          photo: formData.photo ? URL.createObjectURL(formData.photo) : null
        };
        
        const newMember = clientDb.addMember(memberData);
        
        alert(`Registration successful! Your member ID is ${newMember.memberId}. You will be contacted soon for payment confirmation.`);
        
        // Reset form
        setFormData({
          memberName: '',
          cnicNumber: '',
          contactNumber: '',
          address: '',
          package: '',
          joiningDate: '',
          expiryDate: '',
          photo: null
        });
      } catch (error) {
        console.error('Registration error:', error);
        alert('Registration failed. Please try again.');
      }
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-black py-12 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/20 to-black"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-orange-600/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-orange-400/15 rounded-full blur-lg animate-pulse delay-500"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-600/10 border border-orange-500/20 text-orange-300 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                Member Registration
              </div>
              <h1 className="text-5xl font-black text-white mb-4">
                Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">King Gym</span>
              </h1>
              <p className="text-xl text-gray-300">
                Fill out the form below to start your fitness journey with us
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Member Name */}
              <div>
                <label htmlFor="memberName" className="block text-lg font-semibold text-white mb-2">
                  <UserIcon className="h-6 w-6 inline mr-2 text-orange-400" />
                  Member Name *
                </label>
                <input
                  type="text"
                  id="memberName"
                  name="memberName"
                  value={formData.memberName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg ${
                    errors.memberName ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.memberName && (
                  <p className="mt-1 text-sm text-red-400">{errors.memberName}</p>
                )}
              </div>

              {/* CNIC Number */}
              <div>
                <label htmlFor="cnicNumber" className="block text-lg font-semibold text-white mb-2">
                  <IdentificationIcon className="h-6 w-6 inline mr-2 text-orange-400" />
                  CNIC Number *
                </label>
                <input
                  type="text"
                  id="cnicNumber"
                  name="cnicNumber"
                  value={formData.cnicNumber}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg ${
                    errors.cnicNumber ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="12345-1234567-1"
                />
                {errors.cnicNumber && (
                  <p className="mt-1 text-sm text-red-400">{errors.cnicNumber}</p>
                )}
              </div>

              {/* Contact Number */}
              <div>
                <label htmlFor="contactNumber" className="block text-lg font-semibold text-white mb-2">
                  <PhoneIcon className="h-6 w-6 inline mr-2 text-orange-400" />
                  Contact Number *
                </label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg ${
                    errors.contactNumber ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="03XX-XXXXXXX"
                />
                {errors.contactNumber && (
                  <p className="mt-1 text-sm text-red-400">{errors.contactNumber}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-lg font-semibold text-white mb-2">
                  <MapPinIcon className="h-6 w-6 inline mr-2 text-orange-400" />
                  Address *
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-4 py-4 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg ${
                    errors.address ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="Enter your complete address"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-400">{errors.address}</p>
                )}
              </div>

              {/* Profile Photo */}
              <div>
                <label htmlFor="photo" className="block text-lg font-semibold text-white mb-2">
                  <UserIcon className="h-6 w-6 inline mr-2 text-orange-400" />
                  Profile Photo *
                </label>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <input
                      type="file"
                      id="photo"
                      name="photo"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className={`w-full px-4 py-4 bg-gray-700/50 border rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-600 file:text-white hover:file:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                        errors.photo ? 'border-red-500' : 'border-gray-600'
                      }`}
                    />
                    <p className="mt-2 text-sm text-gray-400">
                      Upload a clear photo of yourself (Max 5MB, JPG/PNG)
                    </p>
                  </div>
                  {formData.photo && (
                    <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-orange-500">
                      <img
                        src={URL.createObjectURL(formData.photo)}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
                {errors.photo && (
                  <p className="mt-1 text-sm text-red-400">{errors.photo}</p>
                )}
              </div>

              {/* Package Selection */}
              <div>
                <label className="block text-lg font-semibold text-white mb-4">
                  Select Package *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={`group relative border-2 rounded-xl p-6 cursor-pointer transition-all ${
                        formData.package === pkg.id
                          ? 'border-orange-500 bg-orange-600/10'
                          : 'border-gray-600 hover:border-orange-400/50 bg-gray-700/30'
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
                          <h3 className="font-bold text-white text-lg group-hover:text-orange-300 transition-colors duration-300">{pkg.name}</h3>
                          <p className="text-orange-400 font-semibold text-lg">{pkg.price}</p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 ${
                          formData.package === pkg.id
                            ? 'border-orange-500 bg-orange-500'
                            : 'border-gray-400'
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
                  <p className="mt-1 text-sm text-red-400">{errors.package}</p>
                )}
              </div>

              {/* Joining Date */}
              <div>
                <label htmlFor="joiningDate" className="block text-lg font-semibold text-white mb-2">
                  <CalendarIcon className="h-6 w-6 inline mr-2 text-orange-400" />
                  Joining Date *
                </label>
                <input
                  type="date"
                  id="joiningDate"
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 bg-gray-700/50 border rounded-xl text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg ${
                    errors.joiningDate ? 'border-red-500' : 'border-gray-600'
                  }`}
                />
                {errors.joiningDate && (
                  <p className="mt-1 text-sm text-red-400">{errors.joiningDate}</p>
                )}
              </div>

              {/* Expiry Date */}
              <div>
                <label htmlFor="expiryDate" className="block text-lg font-semibold text-white mb-2">
                  <CalendarIcon className="h-6 w-6 inline mr-2 text-orange-400" />
                  Expiry Date (Auto-calculated)
                </label>
                <input
                  type="date"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  readOnly
                  className="w-full px-4 py-4 bg-gray-600/50 border border-gray-500 rounded-xl text-orange-400 font-semibold text-lg"
                />
                <p className="mt-2 text-sm text-gray-400">
                  Automatically set to 1 month from joining date
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-8">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold text-xl py-5 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25"
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
