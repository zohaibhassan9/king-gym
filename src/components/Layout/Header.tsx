'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Membership', href: '/membership' },
    { name: 'Classes', href: '/classes' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-gradient-to-r from-black via-gray-900 to-black backdrop-blur-lg shadow-2xl sticky top-0 z-50 border-b border-orange-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 relative">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          {/* Logo */}
          <div className="flex-shrink-0 z-10">
            <Link href="/" className="flex items-center group">
              <div className="relative p-2 rounded-xl">
                <img 
                  src="/logo-navbar.png" 
                  alt="King Gym Logo" 
                  className="h-20 w-auto transition-all duration-500 group-hover:scale-110 group-hover:rotate-2"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-orange-600/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute inset-0 border border-orange-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2 z-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-white/90 hover:text-white px-5 py-3 text-sm font-semibold transition-all duration-500 rounded-xl hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-orange-600/20 group overflow-hidden"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>{item.name}</span>
                  <div className="w-0 h-0.5 bg-orange-400 group-hover:w-4 transition-all duration-300"></div>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-orange-400 to-orange-500 group-hover:w-full transition-all duration-500 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-0 bg-gradient-to-r from-orange-500/30 to-orange-600/30 group-hover:h-full transition-all duration-500 rounded-xl"></div>
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4 z-10">
            <Link
              href="/login"
              className="text-white/90 hover:text-white px-5 py-3 text-sm font-semibold transition-all duration-500 rounded-xl hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5 border border-transparent hover:border-white/20"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="relative bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 hover:from-orange-500 hover:via-orange-600 hover:to-orange-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-500 shadow-2xl hover:shadow-orange-500/40 hover:scale-105 group overflow-hidden border border-orange-500/30"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>Join Now</span>
                <div className="w-0 h-0.5 bg-white group-hover:w-6 transition-all duration-300"></div>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="absolute top-0 left-0 w-full h-0 bg-gradient-to-r from-white/20 to-white/10 group-hover:h-full transition-all duration-500 rounded-xl"></div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden z-10">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white/90 hover:text-white p-3 rounded-xl hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-orange-600/20 transition-all duration-500 border border-transparent hover:border-orange-500/30"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-7 w-7" />
              ) : (
                <Bars3Icon className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/95 backdrop-blur-md">
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white/90 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                <XMarkIcon className="h-8 w-8" />
              </button>
            </div>
            
            <div className="px-4 pb-6 space-y-2 h-full overflow-y-auto">
              {/* Logo in Mobile Menu */}
              <div className="flex justify-center mb-8">
                <img 
                  src="/logo-navbar.png" 
                  alt="King Gym Logo" 
                  className="h-24 w-auto"
                />
              </div>
              
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white/90 hover:text-white block px-4 py-4 text-lg font-medium rounded-lg hover:bg-white/10 transition-all duration-300 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-8 space-y-4 border-t border-gray-800">
                <Link
                  href="/login"
                  className="text-white/90 hover:text-white block px-4 py-4 text-lg font-medium rounded-lg hover:bg-white/10 transition-all duration-300 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-medium py-4 px-6 rounded-lg transition-all duration-300 block text-center shadow-lg hover:shadow-orange-500/25 text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Join Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
