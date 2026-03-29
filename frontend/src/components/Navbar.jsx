import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, Star } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Tours', href: '/#tours' },
    { name: 'Reviews', href: '/#reviews' },
    { name: 'About', href: '/#about' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-2 md:py-3' : 'py-3 md:py-4 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 md:gap-3 group">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden flex items-center justify-center group-hover:scale-110 transition-transform">
            <img 
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 140 100'%3E%3Cg transform='translate(10, 0)'%3E%3Crect x='0' y='30' width='12' height='5' rx='2.5' fill='%23FFD200'/%3E%3Crect x='8' y='40' width='15' height='5' rx='2.5' fill='%23FFD200'/%3E%3Crect x='4' y='50' width='18' height='5' rx='2.5' fill='%23FFD200'/%3E%3Crect x='12' y='60' width='12' height='5' rx='2.5' fill='%23FFD200'/%3E%3Cpath d='M70 50 L105 25 A40 40 0 1 0 105 75 Z' fill='%23FFD200' stroke='%235D3A1A' stroke-width='3'/%3E%3Ccircle cx='75' cy='35' r='4' fill='%235D3A1A'/%3E%3Cline x1='110' y1='35' x2='125' y2='25' stroke='%235D3A1A' stroke-width='4' stroke-linecap='round'/%3E%3Cline x1='115' y1='50' x2='130' y2='50' stroke='%235D3A1A' stroke-width='4' stroke-linecap='round'/%3E%3Cline x1='110' y1='65' x2='125' y2='75' stroke='%235D3A1A' stroke-width='4' stroke-linecap='round'/%3E%3C/g%3E%3C/svg%3E" 
              alt="Taste & Talk Logo" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className={`font-display font-bold text-base xs:text-lg sm:text-2xl transition-colors ${
            isScrolled ? 'text-brand-brown' : 'text-white'
          }`}>
            Taste&Talk <span className="text-brand-orange">Saigon</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={`font-bold transition-colors ${
                isScrolled ? 'text-brand-brown hover:text-brand-orange' : 'text-white/90 hover:text-brand-yellow'
              }`}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="https://wa.me/84123456789"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-orange text-white px-6 py-3 rounded-2xl font-bold hover:scale-105 transition-transform shadow-lg shadow-brand-orange/20 flex items-center gap-2"
          >
            <Phone size={18} />
            Book Now
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={`md:hidden p-2 transition-colors ${
            isScrolled ? 'text-brand-brown' : 'text-white'
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ 
              height: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute top-full left-0 right-0 bg-white shadow-2xl overflow-hidden md:hidden rounded-b-[2.5rem]"
          >
            <div className="p-8 flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.a 
                  key={link.name} 
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-3xl font-display font-bold text-brand-brown hover:text-brand-orange transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a 
                href="https://wa.me/84123456789"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="bg-brand-orange text-white px-8 py-5 rounded-2xl font-bold text-center text-xl shadow-xl shadow-brand-orange/20 flex items-center justify-center gap-3"
              >
                <Phone size={24} />
                Book on WhatsApp
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
