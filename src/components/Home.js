import React, { useState, useEffect } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaBars, FaTimes } from 'react-icons/fa';

function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Products', href: '#products' },
    { name: 'Contact', href: '#contact' },
  ];

  const products = [
    { id: 1, name: 'Melamine Plate', image: '/img1.jpeg' },
    { id: 2, name: 'Melamine Bowl', image: '/img2.jpeg' },
    { id: 3, name: 'Melamine Cup', image: '/img3.jpeg' },
    { id: 4, name: 'Melamine Tray', image: '/img4.jpeg' },
    { id: 5, name: 'Melamine Set', image: '/img5.jpeg' },
    { id: 6, name: 'Melamine Dish', image: '/img6.jpeg' },
    { id: 7, name: 'Melamine Container', image: '/img7.jpeg' },
    { id: 8, name: 'Melamine Collection', image: '/img8.jpeg' },
  ];

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900 shadow-lg' : 'bg-gray-900/80 backdrop-blur-sm'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <a href="#" className="flex flex-col items-center">
                <img 
                  src="/logoimg1.png" 
                  alt="Radhe Tableware Logo" 
                  className="h-10 w-auto object-contain"
                />
                <span className="text-white text-sm mt-1 w-42 text-center">tableware of your choice</span>
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-gray-300 hover:text-white transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                className="btn bg-indigo-600 text-white hover:bg-indigo-700 transform hover:scale-105 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">Get Quote</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-2xl text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <FaTimes />
              ) : (
                <FaBars />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-gray-900 shadow-lg rounded-lg mt-2 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                className="block px-4 py-2 text-indigo-400 hover:bg-gray-800 hover:text-indigo-300 transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Quote
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with Image Background */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Image Background */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/tablewareimg.jpg"
            alt="Tableware Background"
            className="absolute min-w-full min-h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-indigo-900/60 to-indigo-800/80"></div>
        </div>

        {/* Content */}
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">RG Melamine</h1>
            <h2 className="text-3xl md:text-5xl font-semibold mb-8 text-indigo-200">Radhe Tableware</h2>
            <p className="text-xl md:text-2xl mb-12 text-indigo-100">Quality Meets Elegance</p>
            <div className="flex flex-row flex-wrap gap-4 justify-center">
              <a 
                href="#products" 
                className="btn bg-white text-indigo-600 hover:bg-indigo-50 transform hover:scale-105 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">View Products</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a 
                href="#contact" 
                className="btn bg-indigo-500 text-white hover:bg-indigo-600 transform hover:scale-105 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">Contact Us</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section bg-white">
        <div className="container">
          <h2 className="heading-primary text-center text-indigo-900">About Us</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-6 text-gray-700">
              Radhe Tablewares has been a prominent name in the crockery manufacturing industry for the past 25 years. 
              Established as a pioneer in the field, Radhe has solidified its position as one of India's leading brands 
              specializing in the production of melamine crockery.
            </p>
            <p className="text-lg mb-6 text-gray-700">
              With a legacy spanning over two decades, Radhe Tablewares has consistently delivered high-quality products 
              and exceptional service to our customers. Our journey began in Ahmedabad, Gujarat, where our state-of-the-art 
              manufacturing plant is located.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-indigo-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="heading-secondary text-indigo-800">Our Commitment</h3>
                <p className="text-gray-600">
                  At Radhe, quality is the cornerstone of our business philosophy. We adhere to stringent quality control 
                  measures at every stage of the manufacturing process.
                </p>
              </div>
              <div className="bg-indigo-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="heading-secondary text-indigo-800">Our Vision</h3>
                <p className="text-gray-600">
                  As we look ahead, Radhe Tablewares is poised for continued growth and innovation in the crockery 
                  manufacturing industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="section bg-gray-50">
        <div className="container">
          <h2 className="heading-primary text-center text-indigo-900">Our Products</h2>
          <p className="text-center text-lg mb-12 max-w-3xl mx-auto text-gray-700">
            Discover our premium collection of melamine crockery products, designed for durability, elegance, and functionality.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
                <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2 text-indigo-900">{product.name}</h3>
                  <p className="text-gray-600">Premium Quality</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section bg-white">
        <div className="container">
          <h2 className="heading-primary text-center text-indigo-900">Contact Us</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-indigo-50 p-8 rounded-xl">
                <h3 className="heading-secondary text-indigo-800">Get in Touch</h3>
                <div className="space-y-6 mt-6">
                  <div className="flex items-center space-x-4 group">
                    <div className="bg-indigo-100 p-3 rounded-full group-hover:bg-indigo-200 transition-colors duration-300">
                      <FaPhone className="text-indigo-600 text-xl transform group-hover:scale-110 transition-transform duration-300 rotate-90" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Phone</p>
                      <a href="tel:9227440440" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">
                        9227440440
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 group">
                    <div className="bg-indigo-100 p-3 rounded-full group-hover:bg-indigo-200 transition-colors duration-300">
                      <FaEnvelope className="text-indigo-600 text-xl transform group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Email</p>
                      <a href="mailto:rgmelamine@gmail.com" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">
                        rgmelamine@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 group">
                    <div className="bg-indigo-100 p-3 rounded-full group-hover:bg-indigo-200 transition-colors duration-300">
                      <FaMapMarkerAlt className="text-indigo-600 text-xl transform group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Location</p>
                      <p className="text-gray-600">Ahmedabad, Gujarat, India</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-indigo-50 p-8 rounded-xl">
                <h3 className="heading-secondary text-indigo-800">Business Details</h3>
                <div className="mt-6 space-y-4">
                  <p className="text-gray-700"><span className="font-medium text-gray-800">Firm Name:</span> RG Melamine</p>
                  <p className="text-gray-700"><span className="font-medium text-gray-800">Brand Name:</span> Radhe Tableware</p>
                  <p className="text-gray-700"><span className="font-medium text-gray-800">GST Number:</span> 24ABCPL1246Q1ZJ</p>
                  <p className="text-gray-700"><span className="font-medium text-gray-800">Contact Person:</span> Rajesh Lumb</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white py-8">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                Radhe Tableware
              </h3>
              <p className="text-indigo-200 text-base font-medium mb-4">Quality Meets Elegance</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4 border border-white/20">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="bg-indigo-500 p-1.5 rounded-full">
                  <FaMapMarkerAlt className="text-white text-lg" />
                </div>
                <span className="text-white font-semibold text-base">Our Location</span>
              </div>
              <div className="text-center">
                <p className="text-indigo-100 text-sm leading-relaxed">
                  AKSHAR INDUSTRIAL PARK, PLOT NO. 81, OPP.ZYDUS CADILA,<br />
                  VILLAGE VASNA, CHACHARVADI, TALUKA SANAND,<br />
                  <span className="text-white font-semibold">Ahmedabad, Gujarat, 371652</span>
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="border-t border-white/20 pt-3">
                <p className="text-indigo-300 text-xs">
                  &copy; {new Date().getFullYear()} RG Melamine. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home; 