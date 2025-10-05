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
      // Prevent scrolling with multiple methods
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      document.documentElement.style.overflow = 'hidden';
      
      // Prevent touch scrolling on mobile
      document.addEventListener('touchmove', preventScroll, { passive: false });
      document.addEventListener('wheel', preventScroll, { passive: false });
    } else {
      // Restore scrolling
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
      document.body.style.height = 'unset';
      document.documentElement.style.overflow = 'unset';
      
      // Remove event listeners
      document.removeEventListener('touchmove', preventScroll);
      document.removeEventListener('wheel', preventScroll);
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
      document.body.style.height = 'unset';
      document.documentElement.style.overflow = 'unset';
      document.removeEventListener('touchmove', preventScroll);
      document.removeEventListener('wheel', preventScroll);
    };
  }, [isMenuOpen]);

  // Function to prevent scrolling
  const preventScroll = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

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
          <div className="md:hidden fixed inset-0 z-[9999] bg-black w-full h-screen min-h-screen" style={{top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh'}}>
            {/* Solid Background */}
            <div className="absolute inset-0 bg-black w-full h-full min-h-screen" style={{top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh'}}></div>
            
            {/* Close Button */}
            <div className="absolute top-4 right-4 z-20">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-orange-400 p-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            {/* Mobile Menu Content */}
            <div className="relative h-screen min-h-screen flex flex-col bg-black w-full">
              {/* Header */}
              <div className="flex items-center justify-center p-4 border-b border-gray-700 bg-black flex-shrink-0">
                <img 
                  src="/logo-navbar.png" 
                  alt="King Gym Logo" 
                  className="h-12 w-auto"
                />
                <span className="text-white text-lg font-bold ml-3">King Gym</span>
              </div>
              
              {/* Navigation Links */}
              <div className="flex-1 px-4 py-4 bg-black overflow-y-auto">
                <div className="space-y-3">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block w-full px-4 py-3 text-lg font-bold text-center rounded-lg border-2 transition-all duration-300 ${
                        pathname === item.href 
                          ? 'text-orange-400 bg-orange-500/20 border-orange-500' 
                          : 'text-white border-gray-600 hover:bg-gray-800 hover:border-orange-500'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Auth Buttons - Always at bottom */}
              <div className="p-4 border-t border-gray-700 bg-black flex-shrink-0 sticky bottom-0">
                {user ? (
                  <div className="space-y-4">
                    <div className="text-center text-gray-300 text-sm mb-4">
                      Welcome, {user.role === 'admin' ? 'Admin' : 'Staff'}
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-6 py-4 text-red-400 text-xl font-bold hover:bg-red-600/10 rounded-xl transition-colors border-2 border-red-500/30 hover:border-red-500"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link
                      href="/login"
                      className="block w-full text-center px-4 py-3 text-gray-300 text-lg font-bold hover:bg-gray-800 rounded-lg transition-colors border-2 border-gray-600 hover:border-gray-500"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="block w-full text-center px-4 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors text-xl font-bold shadow-lg hover:shadow-orange-500/25 border-2 border-orange-500"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      🏋️ Join Now
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
