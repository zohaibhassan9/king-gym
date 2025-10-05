'use client';

import { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { EyeIcon, EyeSlashIcon, UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'staff'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loginError, setLoginError] = useState('');
  const router = useRouter();

  const roles = [
    { id: 'staff', name: 'Staff', description: '' },
    { id: 'admin', name: 'Admin', description: '' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    
    // Clear login error when user starts typing
    if (loginError) {
      setLoginError('');
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous login error
    setLoginError('');
    
    if (validateForm()) {
      // Here you would typically authenticate with your backend
      console.log('Login attempt:', formData);
      
      // Mock authentication - in real app, this would be handled by your auth system
      if ((formData.email === 'admin@kinggym.com' && formData.password === 'admin123' && formData.role === 'admin') ||
          (formData.email === 'staff@kinggym.com' && formData.password === 'staff123' && formData.role === 'staff')) {
        localStorage.setItem('user', JSON.stringify({
          email: formData.email,
          role: formData.role,
          name: formData.role === 'admin' ? 'Admin User' : 'Staff User'
        }));
        
        if (formData.role === 'admin') {
          router.push('/admin');
        } else if (formData.role === 'staff') {
          router.push('/staff');
        }
      } else {
        // Invalid credentials - show error message
        setLoginError('Invalid credentials. Please check your email and password.');
        console.log('Invalid credentials provided');
      }
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/20 to-black"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-orange-600/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-orange-400/15 rounded-full blur-lg animate-pulse delay-500"></div>
        
        <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-orange-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-500/25 border-2 border-orange-400">
              <img 
                src="/logo-navbar.png" 
                alt="King Gym Logo" 
                className="h-12 w-auto"
              />
            </div>
          </div>
          <h2 className="mt-6 text-center text-4xl font-black text-white">
            Staff & Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Login</span>
          </h2>
          <p className="mt-2 text-center text-lg text-gray-300">
            Access your King Gym management dashboard
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg relative z-10 mb-16">
          <div className="bg-gray-800/50 backdrop-blur-sm py-8 px-6 shadow-2xl sm:rounded-2xl sm:px-10 border border-gray-700/50">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-600/10 border border-orange-500/20 text-orange-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
              Staff Access
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Role Selection */}
              <div>
                <label className="block text-lg font-semibold text-white mb-4">
                  Select Your Role
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {roles.map((role) => (
                    <div
                      key={role.id}
                      className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all ${
                        formData.role === role.id
                          ? 'border-orange-500 bg-orange-600/10'
                          : 'border-gray-600 hover:border-orange-400/50 bg-gray-700/30'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, role: role.id }))}
                    >
                      <input
                        type="radio"
                        id={role.id}
                        name="role"
                        value={role.id}
                        checked={formData.role === role.id}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border-2 mr-4 ${
                          formData.role === role.id
                            ? 'border-orange-500 bg-orange-500'
                            : 'border-gray-400'
                        }`}>
                          {formData.role === role.id && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-lg">{role.name}</h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.role && (
                  <p className="mt-1 text-sm text-red-400">{errors.role}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-lg font-semibold text-white mb-2">
                  Email Address
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <UserIcon className="h-6 w-6 text-orange-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`appearance-none block w-full pl-12 pr-4 py-4 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg ${
                      errors.email ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-lg font-semibold text-white mb-2">
                  Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-6 w-6 text-orange-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`appearance-none block w-full pl-12 pr-12 py-4 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg ${
                      errors.password ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Enter your password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-orange-400 transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-6 w-6" />
                      ) : (
                        <EyeIcon className="h-6 w-6" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                )}
                {loginError && (
                  <p className="mt-1 text-sm text-red-400">{loginError}</p>
                )}
              </div>

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-5 w-5 text-orange-600 focus:ring-orange-500 border-gray-600 rounded bg-gray-700"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-300">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-orange-400 hover:text-orange-300 transition-colors">
                    Forgot your password?
                  </a>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25"
                >
                  Sign In
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </Layout>
  );
}
