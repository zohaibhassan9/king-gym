import Layout from '@/components/Layout/Layout';
import Link from 'next/link';
import { 
  UserGroupIcon, 
  ClockIcon, 
  ChartBarIcon, 
  ShieldCheckIcon,
  HeartIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';

export default function Home() {
  const features = [
    {
      icon: UserGroupIcon,
      title: 'Expert Trainers',
      description: 'Professional certified trainers to guide you on your fitness journey.'
    },
    {
      icon: ClockIcon,
      title: '24/7 Access',
      description: 'Access our facilities anytime that suits your schedule.'
    },
    {
      icon: ChartBarIcon,
      title: 'Progress Tracking',
      description: 'Monitor your fitness progress with our advanced tracking system.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Safe Environment',
      description: 'Clean, sanitized, and safe environment for all members.'
    },
    {
      icon: HeartIcon,
      title: 'Health Focus',
      description: 'Comprehensive approach to physical and mental wellness.'
    },
    {
      icon: TrophyIcon,
      title: 'Achievement Goals',
      description: 'Set and achieve your personal fitness milestones.'
    }
  ];

  const packages = [
    {
      name: 'Men Normal',
      price: 'Rs 3,500',
      period: '/month',
      features: ['Full Gym Access', 'Weight Training Equipment', 'Cardio Equipment', 'Locker Room Access', 'Shower Facilities'],
      popular: false
    },
    {
      name: 'Men Cardio',
      price: 'Rs 2,500',
      period: '/month',
      features: ['Cardio Equipment Only', 'Treadmills & Bikes', 'Group Classes', 'Locker Room Access', 'Shower Facilities'],
      popular: false
    },
    {
      name: 'Couple (Separate Floor)',
      price: 'Rs 6,000',
      period: '/month',
      features: ['Dedicated Couple Floor', 'Private Workout Space', 'Full Equipment Access', 'Personal Lockers', 'Premium Facilities'],
      popular: true
    },
    {
      name: 'Ladies (Separate Floor)',
      price: 'Rs 4,000',
      period: '/month',
      features: ['Ladies Only Floor', 'Full Gym Access', 'Female Trainers Available', 'Private Changing Rooms', 'Security & Privacy'],
      popular: false
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black via-gray-900 to-orange-900 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transform Your Body,
              <span className="text-orange-400"> Transform Your Life</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
              Join King Gym and become part of a community dedicated to achieving 
              their fitness goals with world-class facilities and expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="btn-primary text-lg px-8 py-4">
                Start Your Journey
              </Link>
              <Link href="/membership" className="btn-outline text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-gray-900">
                View Packages
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose King Gym?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We provide everything you need to achieve your fitness goals in a supportive environment.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-orange-600/20 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Choose Your Package
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Flexible membership options designed to fit your lifestyle and fitness goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {packages.map((pkg, index) => (
              <div key={index} className={`relative bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${pkg.popular ? 'ring-2 ring-orange-500' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="p-8 pt-12">
                  <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-orange-600">{pkg.price}</span>
                    <span className="text-gray-400">{pkg.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-300">
                        <svg className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href="/register" 
                    className={`w-full text-center py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                      pkg.popular 
                        ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                    }`}
                  >
                    Choose Plan
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-orange-600 to-orange-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Fitness Journey?
          </h2>
          <p className="text-xl mb-8 text-orange-100 max-w-2xl mx-auto">
            Join thousands of members who have already transformed their lives with King Gym.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-white text-orange-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200">
              Get Started Today
            </Link>
            <Link href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-medium py-3 px-8 rounded-lg transition-all duration-200">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}