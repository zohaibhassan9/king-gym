'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Membership', href: '/membership' },
    { name: 'Classes', href: '/classes' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
        <header className="bg-gray-900/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <div className="relative">
                    <img 
                      src="/logo-navbar.png" 
                      alt="King Gym Logo" 
                      className="h-24 w-auto transition-transform duration-300 group-hover:scale-105"
                    />
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                    className="relative text-gray-300 hover:text-orange-400 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg hover:bg-gray-800 group"
              >
                <span className="relative z-10">{item.name}</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-300 rounded-full"></div>
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/login"
                  className="text-gray-300 hover:text-orange-400 px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg hover:bg-gray-800"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
            >
              Join Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-300 hover:text-orange-400 p-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            ></div>
            
            {/* Mobile Menu Panel */}
                <div className="relative z-10 h-full bg-gray-900 flex flex-col">
              {/* Header with Close Button */}
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <div className="flex items-center space-x-3">
                      <img 
                        src="/logo-navbar.png" 
                        alt="King Gym Logo" 
                        className="h-20 w-auto"
                      />
                  <span className="text-white text-lg font-semibold">King Gym</span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              
              {/* Navigation Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                  {/* Navigation Links in Two Columns */}
                  {navigation && navigation.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                              className="block px-4 py-3 text-gray-300 text-base font-medium hover:bg-gray-800 hover:text-orange-400 rounded-lg transition-colors text-center"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-500 text-center py-8">
                      <p>Navigation items not found</p>
                    </div>
                  )}
                </div>
                
                {/* Auth Buttons */}
                    <div className="p-6 border-t border-gray-700">
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/login"
                      className="block text-center px-4 py-3 text-gray-300 text-base font-medium hover:bg-gray-800 rounded-lg transition-colors border border-gray-600 hover:border-gray-500"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="block text-center px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors text-base font-semibold shadow-sm hover:shadow-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Join Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
