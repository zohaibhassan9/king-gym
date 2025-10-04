import Layout from '@/components/Layout/Layout';
import Link from 'next/link';
import { CheckIcon, StarIcon } from '@heroicons/react/24/outline';

export default function Membership() {
  const packages = [
    {
      id: 'cardio',
      name: 'Cardio Package',
      price: 29,
      period: 'month',
      description: 'Perfect for cardio enthusiasts and beginners',
      features: [
        'Access to all cardio equipment',
        'Group fitness classes',
        'Locker room access',
        'Basic nutrition guidance',
        'Monthly progress check-ins'
      ],
      popular: false
    },
    {
      id: 'weight',
      name: 'Weight Training Package',
      price: 39,
      period: 'month',
      description: 'Comprehensive weight training program',
      features: [
        'Full gym equipment access',
        'Free weights and machines',
        'Locker room access',
        'Workout plan creation',
        'Monthly body composition analysis',
        'Supplement recommendations'
      ],
      popular: true
    },
    {
      id: 'trainer',
      name: 'With Trainer Package',
      price: 79,
      period: 'month',
      description: 'Personal training with certified professionals',
      features: [
        '4 personal training sessions/month',
        'Custom workout plans',
        'Nutrition consultation',
        'Progress tracking',
        '24/7 gym access',
        'Priority equipment booking',
        'Monthly goal setting sessions'
      ],
      popular: false
    },
    {
      id: 'coach',
      name: 'With Coach Package',
      price: 99,
      period: 'month',
      description: 'Elite coaching for serious athletes',
      features: [
        'Unlimited personal training',
        'Competition preparation',
        'Advanced nutrition planning',
        'Performance analytics',
        '24/7 gym access',
        'Equipment priority access',
        'Weekly coaching sessions',
        'Competition entry support'
      ],
      popular: false
    }
  ];

  const additionalServices = [
    {
      name: 'Nutrition Consultation',
      price: '$50/session',
      description: 'One-on-one nutrition planning with certified dietitians'
    },
    {
      name: 'Massage Therapy',
      price: '$80/session',
      description: 'Professional massage therapy for recovery and relaxation'
    },
    {
      name: 'Supplement Store',
      price: 'Various',
      description: 'High-quality supplements and protein powders at member prices'
    },
    {
      name: 'Personal Training',
      price: '$30/session',
      description: 'Additional personal training sessions beyond your package'
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Choose Your Perfect Package
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto">
              Flexible membership options designed to help you achieve your fitness goals
            </p>
          </div>
        </section>

        {/* Packages Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                    pkg.popular ? 'ring-2 ring-orange-500 scale-105' : ''
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                        <StarIcon className="h-4 w-4 mr-1" />
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  <div className="p-8">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                      <p className="text-gray-600 mb-4">{pkg.description}</p>
                      <div className="mb-6">
                        <span className="text-4xl font-bold text-orange-600">${pkg.price}</span>
                        <span className="text-gray-600">/{pkg.period}</span>
                      </div>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckIcon className="h-5 w-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/register"
                      className={`w-full text-center py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                        pkg.popular
                          ? 'bg-orange-600 hover:bg-orange-700 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
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

        {/* Additional Services */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Additional Services
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Enhance your fitness journey with our premium services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {additionalServices.map((service, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-2xl font-bold text-orange-600 mb-4">{service.price}</p>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Can I change my package later?
                </h3>
                <p className="text-gray-600">
                  Yes, you can upgrade or downgrade your package at any time. Changes will be 
                  reflected in your next billing cycle.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What payment methods do you accept?
                </h3>
                <p className="text-gray-600">
                  We accept cash, credit/debit cards, bank transfers, JazzCash, and EasyPaisa. 
                  Online payments require admin approval.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Is there a contract period?
                </h3>
                <p className="text-gray-600">
                  Our memberships are month-to-month with no long-term contracts. 
                  You can cancel anytime with 30 days notice.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What are your operating hours?
                </h3>
                <p className="text-gray-600">
                  We're open 24/7 for all members. Some services like personal training 
                  and classes have specific hours.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Fitness Journey?
            </h2>
            <p className="text-xl mb-8 text-orange-100">
              Join King Gym today and transform your life with our world-class facilities and expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="bg-white text-orange-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200">
                Join Now
              </Link>
              <Link href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-medium py-3 px-8 rounded-lg transition-all duration-200">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
