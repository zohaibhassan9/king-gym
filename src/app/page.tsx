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
      name: 'Couple',
      price: 'Rs 6,000',
      period: '/month',
      features: ['Dedicated Couple Floor', 'Private Workout Space', 'Full Equipment Access', 'Personal Lockers', 'Premium Facilities'],
      popular: true
    },
    {
      name: 'Ladies',
      price: 'Rs 4,000',
      period: '/month',
      features: ['Ladies Only Floor', 'Full Gym Access', 'Female Trainers Available', 'Private Changing Rooms', 'Security & Privacy'],
      popular: false
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-black via-gray-900 to-orange-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-transparent"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-orange-600/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-orange-400/15 rounded-full blur-lg animate-pulse delay-500"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-600/20 border border-orange-500/30 text-orange-300 text-sm font-medium mb-8 animate-fade-in">
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-2 animate-pulse"></span>
              #1 Fitness Destination in Lahore
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="block">Transform</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                Your Body
              </span>
              <span className="block text-4xl md:text-5xl font-bold text-gray-300 mt-2">
                Transform Your Life
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Join <span className="text-orange-400 font-semibold">King Gym</span> and become part of a community dedicated to achieving 
              their fitness goals with world-class facilities, expert trainers, and cutting-edge equipment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                href="/register" 
                className="group relative bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold text-lg px-10 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25"
              >
                <span className="relative z-10">Start Your Journey</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
              </Link>
              <Link 
                href="/membership" 
                className="group border-2 border-white/30 hover:border-orange-400 text-white hover:text-orange-400 font-semibold text-lg px-10 py-4 rounded-xl transition-all duration-300 hover:bg-white/5 backdrop-blur-sm"
              >
                View Packages
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-12 max-w-6xl mx-auto">
              <div className="text-center group">
                <div className="text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                  5000+
                </div>
                <div className="text-gray-300 text-lg md:text-xl font-semibold">Active Members</div>
              </div>
              <div className="text-center group">
                <div className="text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                  10+
                </div>
                <div className="text-gray-300 text-lg md:text-xl font-semibold">Years Experience</div>
              </div>
              <div className="text-center group">
                <div className="text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                  50+
                </div>
                <div className="text-gray-300 text-lg md:text-xl font-semibold">Expert Trainers</div>
              </div>
              <div className="text-center group">
                <div className="text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                  100%
                </div>
                <div className="text-gray-300 text-lg md:text-xl font-semibold">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Logos Section */}
      <section className="py-16 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-600/10 border border-orange-500/20 text-orange-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
              Trusted & Certified
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Certifications</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Recognized by leading fitness organizations and certified professionals
            </p>
          </div>
          
          {/* Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center justify-items-center">
            {/* Fitness Certification Logos */}
            <div className="group relative w-48 h-48 hover:scale-110 transition-all duration-500">
              {/* Circular background exactly behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-full border-4 border-orange-500/20 hover:border-orange-500/40 transition-all duration-500 shadow-2xl hover:shadow-orange-500/20"></div>
              {/* Circular glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img 
                src="/ace-certified.png" 
                alt="ACE Certified" 
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300 relative z-10 rounded-full"
              />
            </div>
            
            <div className="group relative w-48 h-48 hover:scale-110 transition-all duration-500">
              {/* Circular background exactly behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-full border-4 border-orange-500/20 hover:border-orange-500/40 transition-all duration-500 shadow-2xl hover:shadow-orange-500/20"></div>
              {/* Circular glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img 
                src="/issa-certified.webp" 
                alt="ISSA Certified" 
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300 relative z-10 rounded-full"
              />
            </div>
            
            <div className="group relative w-48 h-48 hover:scale-110 transition-all duration-500">
              {/* Circular background exactly behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-full border-4 border-orange-500/20 hover:border-orange-500/40 transition-all duration-500 shadow-2xl hover:shadow-orange-500/20"></div>
              {/* Circular glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img 
                src="/acsm-certified.png" 
                alt="ACSM Certified" 
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300 relative z-10 rounded-full"
              />
            </div>
            
            <div className="group relative w-48 h-48 hover:scale-110 transition-all duration-500">
              {/* Circular background exactly behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-full border-4 border-orange-500/20 hover:border-orange-500/40 transition-all duration-500 shadow-2xl hover:shadow-orange-500/20"></div>
              {/* Circular glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img 
                src="/nsca-certified.png" 
                alt="NSCA Certified" 
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300 relative z-10 rounded-full"
              />
            </div>
          </div>
          
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-50"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-600/10 border border-orange-500/20 text-orange-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
              Why Choose Us
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              World-Class <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Fitness Experience</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We provide everything you need to achieve your fitness goals in a supportive, 
              professional environment with cutting-edge equipment and expert guidance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-2"
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-600/20 to-orange-700/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-orange-400 group-hover:text-orange-300 transition-colors duration-300" />
                  </div>
                  {/* Decorative Line */}
                  <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-transparent rounded-full"></div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {feature.description}
                </p>
                
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Preview Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/20 to-black"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-600/10 border border-orange-500/20 text-orange-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
              Membership Plans
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Fitness Journey</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
              Flexible membership options designed to fit your lifestyle and fitness goals. 
              All plans include access to our world-class facilities and expert guidance.
            </p>
            
            {/* Quick Preview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {packages.map((pkg, index) => (
                <div 
                  key={index} 
                  className={`group relative bg-gray-800/30 backdrop-blur-sm rounded-xl border transition-all duration-300 hover:-translate-y-1 ${
                    pkg.popular 
                      ? 'border-orange-500/50 hover:border-orange-400 hover:shadow-lg hover:shadow-orange-500/20' 
                      : 'border-gray-700/50 hover:border-orange-500/30'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-1 rounded-full text-xs font-bold">
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  <div className="p-6 pt-8">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-300 transition-colors duration-300">
                      {pkg.name}
                    </h3>
                    <div className="mb-4">
                      <span className="text-3xl font-black text-orange-400">{pkg.price}</span>
                      <span className="text-gray-400 ml-1">{pkg.period}</span>
                    </div>
                    <div className="text-gray-300 text-sm mb-4">
                      {pkg.features.slice(0, 2).map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center mb-1">
                          <svg className="h-3 w-3 text-orange-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-xs">{feature}</span>
                        </div>
                      ))}
                      <div className="text-orange-400 text-xs font-medium mt-2">
                        +{pkg.features.length - 2} more features
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/membership" 
                className="group relative bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold text-lg px-10 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25"
              >
                <span className="relative z-10">View All Plans</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
              </Link>
              <Link 
                href="/register" 
                className="group border-2 border-orange-500/50 hover:border-orange-400 text-orange-400 hover:text-orange-300 font-semibold text-lg px-10 py-4 rounded-xl transition-all duration-300 hover:bg-orange-500/10 backdrop-blur-sm"
              >
                Join Now
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/8 rounded-full blur-lg animate-pulse delay-500"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 bg-white rounded-full mr-3 animate-pulse"></span>
            Join the Fitness Revolution
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
            Ready to Start Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-100">
              Fitness Journey?
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 text-orange-100 max-w-4xl mx-auto leading-relaxed">
            Join <span className="text-white font-semibold">thousands of members</span> who have already 
            transformed their lives with King Gym. Your transformation starts today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              href="/register" 
              className="group relative bg-white text-orange-600 hover:bg-orange-50 font-bold text-lg px-10 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-white/25"
            >
              <span className="relative z-10">Get Started Today</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-white rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
            </Link>
            
            <Link 
              href="/contact" 
              className="group border-2 border-white/80 hover:border-white text-white hover:text-orange-600 font-bold text-lg px-10 py-4 rounded-xl transition-all duration-300 hover:bg-white/10 backdrop-blur-sm hover:scale-105"
            >
              Contact Us
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-2">5000+</div>
              <div className="text-orange-200 text-sm font-medium">Happy Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-2">10+</div>
              <div className="text-orange-200 text-sm font-medium">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-orange-200 text-sm font-medium">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}