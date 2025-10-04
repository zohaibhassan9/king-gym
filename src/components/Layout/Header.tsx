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
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">KG</span>
              </div>
              <span className="ml-3 text-2xl font-bold text-gray-900">King Gym</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="btn-primary"
            >
              Join Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-orange-600 p-2"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-orange-600 block px-3 py-2 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-orange-600 block px-3 py-2 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="btn-primary block text-center mx-3"
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
