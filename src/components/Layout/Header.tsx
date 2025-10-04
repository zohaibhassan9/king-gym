'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Membership', href: '/membership' },
    { name: 'Classes', href: '/classes' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
        <header className={`bg-gray-900/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b transition-all duration-300 ${
          isScrolled ? 'border-orange-500' : 'border-gray-700/50'
        }`}>
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
              <nav className="hidden md:flex space-x-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="relative text-gray-300 hover:text-white px-6 py-3 text-sm font-medium transition-all duration-500 rounded-lg group overflow-hidden"
                  >
                    {/* Background hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-orange-500/10 rounded-lg transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    
                    {/* Text with subtle glow */}
                    <span className="relative z-10 group-hover:drop-shadow-sm transition-all duration-300">
                      {item.name}
                    </span>
                    
                    {/* Bottom border animation */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-400 group-hover:w-3/4 transition-all duration-500 rounded-full"></div>
                    
                    {/* Subtle top highlight */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent group-hover:w-1/2 transition-all duration-700 delay-100"></div>
                  </Link>
                ))}
              </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="relative text-gray-300 hover:text-white px-6 py-3 text-sm font-medium transition-all duration-500 rounded-lg group overflow-hidden"
            >
              {/* Background hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-700/20 to-gray-600/20 rounded-lg transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              
              {/* Text with subtle glow */}
              <span className="relative z-10 group-hover:drop-shadow-sm transition-all duration-300">
                Login
              </span>
              
              {/* Bottom border animation */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-gray-400 to-gray-300 group-hover:w-3/4 transition-all duration-500 rounded-full"></div>
            </Link>
            
            <Link
              href="/register"
              className="relative bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-500 shadow-lg hover:shadow-xl group overflow-hidden"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Text */}
              <span className="relative z-10 group-hover:scale-105 transition-transform duration-300">
                Join Now
              </span>
              
              {/* Shine effect */}
              <div className="absolute inset-0 -top-1 -left-1 w-0 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:w-full transition-all duration-700 transform -skew-x-12"></div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative text-gray-300 hover:text-orange-400 p-3 rounded-lg group transition-all duration-300"
            >
              {/* Background hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-orange-500/10 rounded-lg transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              
              {/* Icon with subtle rotation */}
              <div className="relative z-10 group-hover:rotate-90 transition-transform duration-300">
                {isMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </div>
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
