import Layout from '@/components/Layout/Layout';
import Link from 'next/link';
import { CheckIcon } from '@heroicons/react/24/outline';

export default function Membership() {
  const packages = [
        {
          id: 'men-normal',
          name: 'Men Normal',
          price: 3000,
          period: 'month',
          description: 'Complete gym access for men with all facilities',
          features: [
            'Full gym equipment access',
            'Weight training equipment',
            'Cardio equipment access',
            'Locker room access',
            'Shower facilities',
            '24/7 gym access',
            'Monthly progress tracking'
          ],
          popular: false
        },
        {
          id: 'men-cardio',
          name: 'Men Cardio',
          price: 4000,
          period: 'month',
          description: 'Cardio-focused package for cardiovascular fitness',
          features: [
            'Cardio equipment only',
            'Treadmills & stationary bikes',
            'Group fitness classes',
            'Locker room access',
            'Shower facilities',
            'Basic nutrition guidance',
            'Monthly cardio assessments'
          ],
          popular: true
        },
    {
      id: 'couple',
      name: 'Couple',
      price: 6000,
      period: 'month',
      description: 'Premium package for couples with dedicated floor',
      features: [
        'Dedicated couple floor',
        'Private workout space',
        'Full equipment access',
        'Personal lockers',
        'Premium facilities',
        'Couple training sessions',
        'Private changing rooms',
        'Priority booking system'
      ],
      popular: false
    },
    {
      id: 'ladies',
      name: 'Ladies',
      price: 4000,
      period: 'month',
      description: 'Exclusive ladies-only floor with full privacy',
      features: [
        'Ladies only floor',
        'Full gym equipment access',
        'Female trainers available',
        'Private changing rooms',
        'Security & privacy',
        'Women-only group classes',
        'Locker room access',
        'Shower facilities'
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
      <div className="min-h-screen bg-black">

        {/* Packages Section */}
        <section className="py-24 bg-black relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/20 to-black"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-600/10 border border-orange-500/20 text-orange-300 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                Membership Plans
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Fitness Journey</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Flexible membership options designed to fit your lifestyle and fitness goals. 
                All plans include access to our world-class facilities and expert guidance.
              </p>
            </div>
            
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {packages.map((pkg, index) => (
                    <div 
                      key={pkg.id} 
                      className={`group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl border transition-all duration-500 hover:-translate-y-2 flex flex-col h-full ${
                        pkg.popular 
                          ? 'border-orange-500/50 hover:border-orange-400 hover:shadow-2xl hover:shadow-orange-500/20' 
                          : 'border-gray-700/50 hover:border-orange-500/30 hover:shadow-xl hover:shadow-orange-500/10'
                      }`}
                    >
                      {/* Popular Badge */}
                      {pkg.popular && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
                            Most Popular
                          </div>
                        </div>
                      )}
                      
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
                        pkg.popular 
                          ? 'bg-gradient-to-br from-orange-600/10 to-transparent opacity-100' 
                          : 'bg-gradient-to-br from-orange-600/5 to-transparent opacity-0 group-hover:opacity-100'
                      }`}></div>
                      
                      <div className="relative p-8 pt-12 flex flex-col h-full">
                        {/* Package Name */}
                        <div className="mb-6">
                          <h3 className="text-2xl font-black text-white mb-2 group-hover:text-orange-300 transition-colors duration-300">
                            {pkg.name}
                          </h3>
                          <p className="text-gray-400 text-sm mb-4">{pkg.description}</p>
                          {pkg.popular && (
                            <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-transparent rounded-full"></div>
                          )}
                        </div>
                        
                        {/* Price */}
                        <div className="mb-8">
                          <div className="flex items-baseline">
                            <span className="text-5xl font-black text-orange-400">Rs {pkg.price}</span>
                            <span className="text-gray-400 ml-2 text-lg">/{pkg.period}</span>
                          </div>
                        </div>
                        
                        {/* Features */}
                        <ul className="space-y-4 mb-8 flex-grow">
                          {pkg.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start">
                              <div className="w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                <CheckIcon className="h-4 w-4 text-orange-400" />
                              </div>
                              <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {/* CTA Button - Always at bottom */}
                        <div className="mt-auto">
                          <Link 
                            href="/register" 
                            className={`group/btn relative w-full text-center py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                              pkg.popular 
                                ? 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white shadow-lg hover:shadow-xl hover:shadow-orange-500/25' 
                                : 'bg-gray-700/50 hover:bg-orange-600 text-white border border-gray-600 hover:border-orange-500'
                            }`}
                          >
                            <span className="relative z-10">
                              {pkg.popular ? 'Get Started' : 'Choose Plan'}
                            </span>
                            {pkg.popular && (
                              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl blur opacity-0 group-hover/btn:opacity-75 transition-opacity duration-300"></div>
                            )}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
          </div>
        </section>

        {/* Custom Plan Creator */}
        <section className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-50"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
          
          {/* Animated Background Elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-orange-600/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-orange-400/15 rounded-full blur-lg animate-pulse delay-500"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-600/10 border border-orange-500/20 text-orange-300 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                Build Your Perfect Plan
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Create Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Custom Plan</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Design a personalized fitness package that perfectly fits your goals, schedule, and budget
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Plan Builder Form */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                <h3 className="text-2xl font-bold text-white mb-6">Plan Builder</h3>
                
                <form className="space-y-6">
                  {/* Plan Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Plan Type</label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="relative cursor-pointer">
                        <input type="radio" name="planType" value="individual" className="sr-only" defaultChecked />
                        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 text-center hover:border-orange-500/50 transition-colors">
                          <div className="text-white font-medium">Individual</div>
                        </div>
                      </label>
                      <label className="relative cursor-pointer">
                        <input type="radio" name="planType" value="couple" className="sr-only" />
                        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 text-center hover:border-orange-500/50 transition-colors">
                          <div className="text-white font-medium">Couple</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Duration</label>
                    <select className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500">
                      <option value="1">1 Month</option>
                      <option value="3">3 Months</option>
                      <option value="6">6 Months</option>
                      <option value="12">12 Months</option>
                    </select>
                  </div>

                  {/* Features Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Select Features</label>
                    <div className="space-y-3">
                      {[
                        'Full Gym Access',
                        'Personal Training Sessions',
                        'Nutrition Consultation',
                        'Group Classes',
                        'Locker Access',
                        'Shower Facilities',
                        'Progress Tracking',
                        '24/7 Access'
                      ].map((feature, index) => (
                        <label key={index} className="flex items-center space-x-3 cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 text-orange-600 bg-gray-700 border-gray-600 rounded focus:ring-orange-500" />
                          <span className="text-gray-300">{feature}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Additional Services */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Additional Services</label>
                    <div className="space-y-3">
                      {[
                        'Massage Therapy',
                        'Supplement Store Access',
                        'Meal Planning',
                        'Online Workout Videos',
                        'Priority Booking'
                      ].map((service, index) => (
                        <label key={index} className="flex items-center space-x-3 cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 text-orange-600 bg-gray-700 border-gray-600 rounded focus:ring-orange-500" />
                          <span className="text-gray-300">{service}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25"
                  >
                    Create My Custom Plan
                  </button>
                </form>
              </div>

              {/* Plan Preview */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                <h3 className="text-2xl font-bold text-white mb-6">Your Custom Plan</h3>
                
                <div className="space-y-6">
                  {/* Plan Summary */}
                  <div className="bg-gray-700/30 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-orange-400 mb-4">Plan Summary</h4>
                    <div className="space-y-2 text-gray-300">
                      <div className="flex justify-between">
                        <span>Plan Type:</span>
                        <span className="text-white">Individual</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="text-white">3 Months</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Features:</span>
                        <span className="text-white">5 Selected</span>
                      </div>
                    </div>
                  </div>

                  {/* Price Estimate */}
                  <div className="bg-gradient-to-r from-orange-600/20 to-orange-700/20 rounded-xl p-6 border border-orange-500/30">
                    <h4 className="text-lg font-semibold text-orange-400 mb-4">Estimated Price</h4>
                    <div className="text-3xl font-black text-white mb-2">Rs 8,500</div>
                    <div className="text-gray-300 text-sm">per month</div>
                    <div className="text-orange-300 text-xs mt-2">*Final price will be calculated based on your selections</div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">What's Included</h4>
                    <ul className="space-y-2">
                      {[
                        'Personalized workout plan',
                        'Flexible scheduling',
                        'Dedicated support',
                        'Progress tracking',
                        'Custom nutrition guidance'
                      ].map((benefit, index) => (
                        <li key={index} className="flex items-center space-x-2 text-gray-300">
                          <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-gray-700/30 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-white mb-4">Need Help?</h4>
                    <p className="text-gray-300 text-sm mb-4">
                      Our team will help you create the perfect plan for your fitness goals.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2 text-gray-300">
                        <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>0320 4881042</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-300">
                        <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>info@kinggym.com</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-24 bg-gray-900 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-50"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-600/10 border border-orange-500/20 text-orange-300 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                Premium Services
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Additional <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Services</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Enhance your fitness journey with our premium services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {additionalServices.map((service, index) => (
                <div key={index} className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-2">
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-orange-300 transition-colors duration-300">{service.name}</h3>
                    <p className="text-2xl font-bold text-orange-400 mb-4">{service.price}</p>
                    <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-black relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/20 to-black"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
          
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-600/10 border border-orange-500/20 text-orange-300 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                Common Questions
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Questions</span>
              </h2>
            </div>

            <div className="space-y-6">
              <div className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500">
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-orange-300 transition-colors duration-300">
                  Can I change my package later?
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                  Yes, you can upgrade or downgrade your package at any time. Changes will be 
                  reflected in your next billing cycle.
                </p>
              </div>

              <div className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500">
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-orange-300 transition-colors duration-300">
                  What payment methods do you accept?
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                  We accept cash, credit/debit cards, bank transfers, JazzCash, and EasyPaisa. 
                  Online payments require admin approval.
                </p>
              </div>

              <div className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500">
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-orange-300 transition-colors duration-300">
                  Is there a contract period?
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                  Our memberships are month-to-month with no long-term contracts. 
                  You can cancel anytime with 30 days notice.
                </p>
              </div>

              <div className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500">
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-orange-300 transition-colors duration-300">
                  What are your operating hours?
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                  We're open 24/7 for all members. Some services like personal training 
                  and classes have specific hours.
                </p>
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
              Start Your Transformation
            </div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
              Ready to Start Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-100">
                Fitness Journey?
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl mb-12 text-orange-100 max-w-4xl mx-auto leading-relaxed">
              Join <span className="text-white font-semibold">King Gym</span> today and transform your life with our world-class facilities and expert guidance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                href="/register" 
                className="group relative bg-white text-orange-600 hover:bg-orange-50 font-bold text-lg px-10 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-white/25"
              >
                <span className="relative z-10">Join Now</span>
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
          </div>
        </section>
      </div>
    </Layout>
  );
}
