import Link from 'next/link';
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">KG</span>
              </div>
              <span className="ml-3 text-2xl font-bold">King Gym</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Your premier destination for fitness and wellness. We provide world-class facilities 
              and expert trainers to help you achieve your fitness goals.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-300">
                <MapPinIcon className="h-5 w-5 mr-2" />
                <span>123 Fitness Street, Gym City, GC 12345</span>
              </div>
              <div className="flex items-center text-gray-300">
                <PhoneIcon className="h-5 w-5 mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-300">
                <EnvelopeIcon className="h-5 w-5 mr-2" />
                <span>info@kinggym.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/membership" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Membership Plans
                </Link>
              </li>
              <li>
                <Link href="/classes" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Classes
                </Link>
              </li>
              <li>
                <Link href="/trainers" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Trainers
                </Link>
              </li>
              <li>
                <Link href="/facilities" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Facilities
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 King Gym. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                Facebook
              </Link>
              <Link href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                Instagram
              </Link>
              <Link href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                Twitter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
