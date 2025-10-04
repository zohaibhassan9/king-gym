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
      name: 'John Smith',
      role: 'Head Trainer',
      experience: '8 years',
      specialties: ['Weight Training', 'Bodybuilding'],
      image: '/api/placeholder/300/300'
    },
    {
      name: 'Sarah Johnson',
      role: 'Cardio Specialist',
      experience: '6 years',
      specialties: ['Cardio', 'HIIT', 'Yoga'],
      image: '/api/placeholder/300/300'
    },
    {
      name: 'Mike Davis',
      role: 'Nutrition Coach',
      experience: '10 years',
      specialties: ['Nutrition', 'Weight Loss', 'Muscle Gain'],
      image: '/api/placeholder/300/300'
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About King Gym
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto">
              Your premier destination for fitness and wellness. We've been transforming lives for over a decade.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Our Story
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Founded in 2014, King Gym started as a small fitness center with a big dream: 
                  to make fitness accessible and enjoyable for everyone. Over the years, we've 
                  grown into a comprehensive fitness facility that serves thousands of members 
                  from all walks of life.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  Our mission is simple: to provide world-class facilities, expert guidance, 
                  and a supportive community that helps you achieve your fitness goals, 
                  whatever they may be.
                </p>
                <div className="flex items-center space-x-4">
                  <img 
                    src="/logo-navbar.png" 
                    alt="King Gym Logo" 
                    className="h-16 w-auto"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">King Gym</h3>
                    <p className="text-gray-600">Since 2014</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                <span className="text-gray-500">CEO Photo Placeholder</span>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Values
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <HeartIcon className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Health First</h3>
                <p className="text-gray-600">
                  Your health and safety are our top priorities. We provide a clean, 
                  safe environment with proper equipment maintenance.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <UserGroupIcon className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
                <p className="text-gray-600">
                  We believe fitness is better together. Our supportive community 
                  helps you stay motivated and achieve your goals.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrophyIcon className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h3>
                <p className="text-gray-600">
                  We strive for excellence in everything we do, from our facilities 
                  to our service and support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our certified trainers and staff are here to help you succeed
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {trainers.map((trainer, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="h-64 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Trainer Photo</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {trainer.name}
                    </h3>
                    <p className="text-orange-600 font-medium mb-2">{trainer.role}</p>
                    <p className="text-gray-600 mb-4">{trainer.experience} experience</p>
                    <div className="space-y-1">
                      {trainer.specialties.map((specialty, specIndex) => (
                        <span
                          key={specIndex}
                          className="inline-block bg-orange-100 text-orange-800 text-sm px-2 py-1 rounded mr-2 mb-1"
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
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Visit Us
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Come see our facilities and meet our team
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPinIcon className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Address</h3>
                <p className="text-gray-600">
                  199 A Commercial<br />
                  Central Park Housing Scheme<br />
                  Society, 54600
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <PhoneIcon className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone</h3>
                <p className="text-gray-600">0320 4881042</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <EnvelopeIcon className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600">info@kinggym.com</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
