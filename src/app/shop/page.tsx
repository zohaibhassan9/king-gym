import Layout from '@/components/Layout/Layout';
import Link from 'next/link';

export default function Shop() {
  const categories = [
    {
      name: 'Supplements',
      items: [
        { name: 'Whey Protein', price: 'Rs 8,500', description: 'Premium whey protein powder (5lbs)' },
        { name: 'Creatine Monohydrate', price: 'Rs 3,200', description: 'Pure creatine for muscle building (500g)' },
        { name: 'BCAA Powder', price: 'Rs 4,500', description: 'Branched chain amino acids (400g)' },
        { name: 'Pre-Workout', price: 'Rs 6,000', description: 'Energy and focus booster (300g)' },
        { name: 'Multivitamin', price: 'Rs 2,800', description: 'Complete vitamin complex (120 tablets)' },
        { name: 'Fish Oil', price: 'Rs 2,200', description: 'Omega-3 fatty acids (120 capsules)' },
        { name: 'Protein Bars', price: 'Rs 350', description: 'High protein snack bar (per bar)' },
        { name: 'Mass Gainer', price: 'Rs 7,500', description: 'Weight gain supplement (5lbs)' }
      ]
    },
    {
      name: 'Apparel',
      items: [
        { name: 'King Gym T-Shirt', price: 'Rs 2,500', description: 'Premium cotton gym t-shirt' },
        { name: 'Training Shorts', price: 'Rs 3,200', description: 'Comfortable workout shorts' },
        { name: 'Hoodie', price: 'Rs 6,500', description: 'Warm and stylish hoodie' },
        { name: 'Tank Top', price: 'Rs 1,800', description: 'Lightweight training tank' },
        { name: 'Leggings', price: 'Rs 4,500', description: 'High-performance leggings' },
        { name: 'Cap', price: 'Rs 1,200', description: 'King Gym branded cap' },
        { name: 'Sports Bra', price: 'Rs 2,800', description: 'High support sports bra' },
        { name: 'Joggers', price: 'Rs 3,800', description: 'Comfortable jogging pants' }
      ]
    },
    {
      name: 'Accessories',
      items: [
        { name: 'Gym Towel', price: 'Rs 1,200', description: 'Quick-dry gym towel' },
        { name: 'Water Bottle', price: 'Rs 1,800', description: 'Insulated water bottle (32oz)' },
        { name: 'Resistance Bands', price: 'Rs 2,500', description: 'Set of resistance bands' },
        { name: 'Gym Bag', price: 'Rs 4,500', description: 'Large capacity gym bag' },
        { name: 'Wrist Wraps', price: 'Rs 1,500', description: 'Weightlifting wrist support' },
        { name: 'Knee Sleeves', price: 'Rs 3,200', description: 'Compression knee sleeves' },
        { name: 'Gym Gloves', price: 'Rs 2,000', description: 'Weightlifting gloves' },
        { name: 'Jump Rope', price: 'Rs 1,500', description: 'Adjustable speed jump rope' }
      ]
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-black via-gray-900 to-orange-900 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-transparent"></div>
          
          {/* Animated Background Elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-orange-600/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-orange-400/15 rounded-full blur-lg animate-pulse delay-500"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-600/10 border border-orange-500/20 text-orange-300 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                King Gym Store
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
                Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Fitness Store</span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Shop the best supplements, apparel, and accessories at exclusive member prices
              </p>
            </div>
          </div>
        </section>

        {/* Shop Categories */}
        <section className="py-24 bg-gray-900 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-50"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-600/10 border border-orange-500/20 text-orange-300 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                Shop by Category
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Quality <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Products</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Everything you need for your fitness journey at unbeatable member prices
              </p>
            </div>

            <div className="space-y-16">
              {categories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                    {category.name}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.items.map((item, itemIndex) => (
                      <div 
                        key={itemIndex} 
                        className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-2"
                      >
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="relative">
                          <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-300 transition-colors duration-300">
                            {item.name}
                          </h4>
                          <p className="text-2xl font-bold text-orange-400 mb-3">{item.price}</p>
                          <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 text-sm mb-4">
                            {item.description}
                          </p>
                          
                          <button className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25">
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Member Benefits */}
        <section className="py-24 bg-black relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/20 to-black"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-600/10 border border-orange-500/20 text-orange-300 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                Member Benefits
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Why Shop at <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">King Gym?</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-600/20 to-orange-700/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Member Prices</h3>
                <p className="text-gray-300">Exclusive discounts for all King Gym members</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-600/20 to-orange-700/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Quality Guaranteed</h3>
                <p className="text-gray-300">Only premium, certified products from trusted brands</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-600/20 to-orange-700/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Fast Delivery</h3>
                <p className="text-gray-300">Quick and reliable delivery to your doorstep</p>
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
          
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-100">Shop?</span>
            </h2>
            
            <p className="text-xl md:text-2xl mb-12 text-orange-100 max-w-4xl mx-auto leading-relaxed">
              Get the best fitness products at exclusive member prices
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                href="/membership" 
                className="group relative bg-white text-orange-600 hover:bg-orange-50 font-bold text-lg px-10 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-white/25"
              >
                <span className="relative z-10">View Membership</span>
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
