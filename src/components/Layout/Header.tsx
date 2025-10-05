'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Bars3Icon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

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

  // Check for logged-in user
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

      const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Membership', href: '/membership' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
      ];

  return (
        <header className={`bg-gray-900/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b transition-all duration-300 ${
          isScrolled ? 'border-orange-500' : 'border-gray-700/50'
        }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20 relative">
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
                    className={`px-6 py-3 text-lg font-medium transition-all duration-300 ${
                      pathname === item.href 
                        ? 'text-orange-400' 
                        : 'text-gray-300 hover:text-orange-400'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <>
                <span className="text-gray-300 px-4 py-2 text-sm">
                  Welcome, {user.role === 'admin' ? 'Admin' : 'Staff'}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-red-400 px-6 py-3 text-lg font-medium transition-colors duration-300 rounded-md hover:bg-red-600/10 border border-red-500/20 hover:border-red-500/40"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-300 hover:text-orange-400 px-6 py-3 text-lg font-medium transition-colors duration-300 rounded-md hover:bg-gray-800/50"
                >
                  Login
                </Link>
                
                <Link
                  href="/register"
                  className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded-md transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 text-lg"
                >
                  Join Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-300 hover:text-orange-400 p-3 rounded-md hover:bg-gray-800/50 transition-colors duration-300"
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
          <div className="md:hidden fixed inset-0 z-50 bg-gray-900">
            {/* Close Button */}
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-400 hover:text-white p-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <XMarkIcon className="h-8 w-8" />
              </button>
            </div>
            
            {/* Full Screen Navigation */}
            <div className="h-full flex flex-col justify-center items-center px-8">
              {/* Logo */}
              <div className="mb-12 text-center">
                <img 
                  src="/logo-navbar.png" 
                  alt="King Gym Logo" 
                  className="h-24 w-auto mx-auto mb-4"
                />
                <h2 className="text-2xl font-bold text-white">King Gym</h2>
              </div>
              
              {/* Navigation Links */}
              <div className="w-full max-w-sm space-y-4 mb-12">
                {navigation && navigation.length > 0 ? (
                  navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block w-full px-8 py-4 text-xl font-semibold transition-all duration-300 text-center rounded-xl border-2 ${
                        pathname === item.href 
                          ? 'text-orange-400 bg-orange-500/20 border-orange-500 shadow-lg shadow-orange-500/25' 
                          : 'text-gray-300 hover:text-orange-400 hover:bg-gray-800 border-gray-600 hover:border-orange-500/50'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <p>Navigation not available</p>
                  </div>
                )}
              </div>
              
              {/* Auth Buttons */}
              <div className="w-full max-w-sm space-y-4">
                {user ? (
                  <div className="text-center">
                    <div className="text-gray-300 text-lg mb-6">
                      Welcome, {user.role === 'admin' ? 'Admin' : 'Staff'}
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-8 py-4 text-red-300 text-xl font-semibold hover:bg-red-600/10 rounded-xl transition-colors border-2 border-red-500/30 hover:border-red-500/60"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Link
                      href="/login"
                      className="block w-full text-center px-8 py-4 text-gray-300 text-xl font-semibold hover:bg-gray-800 rounded-xl transition-colors border-2 border-gray-600 hover:border-gray-500"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="block w-full text-center px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl transition-colors text-xl font-bold shadow-lg hover:shadow-xl"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Join Now
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
