import Layout from '@/components/Layout/Layout';
import { 
  UserGroupIcon, 
  TrophyIcon, 
  HeartIcon, 
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

export default function About() {
  const stats = [
    { number: '5000+', label: 'Happy Members' },
    { number: '10+', label: 'Years Experience' },
    { number: '50+', label: 'Expert Trainers' },
    { number: '24/7', label: 'Gym Access' }
  ];

  const trainers = [
    {
      name: 'Ahmad Hassan',
      role: 'Head Trainer',
      experience: '8 years',
      specialties: ['Weight Training', 'Bodybuilding'],
      image: '/trainer-1.webp'
    },
    {
      name: 'Usman Ali',
      role: 'Cardio Specialist',
      experience: '6 years',
      specialties: ['Cardio', 'HIIT', 'Yoga'],
      image: '/trainer-2.jpeg'
    },
    {
      name: 'Bilal Khan',
      role: 'Nutrition Coach',
      experience: '10 years',
      specialties: ['Nutrition', 'Weight Loss', 'Muscle Gain'],
      image: '/trainer-3.webp'
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative py-32 md:py-40 text-white overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/gym-bg.jpg')"
            }}
          ></div>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-70"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-transparent"></div>
          
          {/* Animated Background Elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-orange-600/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-orange-400/15 rounded-full blur-lg animate-pulse delay-500"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-600/20 border border-orange-500/30 text-orange-300 text-sm font-medium mb-8 animate-fade-in">
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-2 animate-pulse"></span>
              About King Gym
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="block">About</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                King Gym
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Your premier destination for fitness and wellness. We've been transforming lives for over a decade with world-class facilities and expert guidance.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-24 bg-black relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/20 to-black"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-600/10 border border-orange-500/20 text-orange-300 text-sm font-medium mb-6">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                  Our Story
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                    Our Journey
                  </span>
                </h2>
                <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                  Founded in 2014, King Gym started as a small fitness center with a big dream: 
                  to make fitness accessible and enjoyable for everyone. Over the years, we've 
                  grown into a comprehensive fitness facility that serves thousands of members 
                  from all walks of life.
                </p>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Our mission is simple: to provide world-class facilities, expert guidance, 
                  and a supportive community that helps you achieve your fitness goals, 
                  whatever they may be.
                </p>
                <div className="flex items-center space-x-6">
                  <img 
                    src="/logo-navbar.png" 
                    alt="King Gym Logo" 
                    className="h-32 w-auto"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-white">King Gym</h3>
                    <p className="text-orange-400 text-lg font-semibold">Since 2014</p>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <div className="rounded-2xl overflow-hidden h-96 shadow-2xl">
                  <img 
                    src="/ceo.jpeg" 
                    alt="King Gym CEO" 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    style={{ objectPosition: 'center 35%' }}
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-500/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-600/10 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 relative overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/customers.jpg')"
            }}
          ></div>
          {/* Overlay */}
          <div className="absolute inset-0 bg-gray-900 opacity-90"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-600/10 border border-orange-500/20 text-orange-300 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                Our Impact
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                By The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Numbers</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-lg md:text-xl font-semibold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-24 bg-black relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/20 to-black"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-600/10 border border-orange-500/20 text-orange-300 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                Our Team
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Expert Team</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Our certified trainers and staff are here to help you succeed on your fitness journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {trainers.map((trainer, index) => (
                <div key={index} className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="h-64 relative overflow-hidden">
                    <img 
                      src={trainer.image} 
                      alt={trainer.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      style={{ objectPosition: 'center 20%' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mb-2">
                        <UserGroupIcon className="h-6 w-6 text-orange-400" />
                      </div>
                      <span className="text-white text-sm font-medium">Professional Trainer</span>
                    </div>
                  </div>
                  <div className="p-6 relative">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors duration-300">
                      {trainer.name}
                    </h3>
                    <p className="text-orange-400 font-semibold mb-2 text-lg">{trainer.role}</p>
                    <p className="text-gray-300 mb-4">{trainer.experience} experience</p>
                    <div className="space-y-2">
                      {trainer.specialties.map((specialty, specIndex) => (
                        <span
                          key={specIndex}
                          className="inline-block bg-orange-600/20 text-orange-300 text-sm px-3 py-1 rounded-full mr-2 mb-1 border border-orange-500/30"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-24 relative overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/certifications-bg.jpg')"
            }}
          ></div>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-85"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-600/10 border border-orange-500/20 text-orange-300 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                Visit Us
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Come <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Visit Us</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Come see our world-class facilities and meet our expert team
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-2 text-center">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-600/20 to-orange-700/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <MapPinIcon className="h-10 w-10 text-orange-400 group-hover:text-orange-300 transition-colors duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-300 transition-colors duration-300">Address</h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
                    199 A Commercial<br />
                    Central Park Housing Scheme<br />
                    Society, 54600
                  </p>
                </div>
              </div>

              <div className="group relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-2 text-center">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-600/20 to-orange-700/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <PhoneIcon className="h-10 w-10 text-orange-400 group-hover:text-orange-300 transition-colors duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-300 transition-colors duration-300">Phone</h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 text-lg font-semibold">0320 4881042</p>
                </div>
              </div>

              <div className="group relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-2 text-center">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-600/20 to-orange-700/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <EnvelopeIcon className="h-10 w-10 text-orange-400 group-hover:text-orange-300 transition-colors duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-300 transition-colors duration-300">Email</h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 text-lg font-semibold">info@kinggym.com</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
