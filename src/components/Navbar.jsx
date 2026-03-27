import React from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-card rounded-2xl px-6 py-3 pointer-events-auto">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-yellow rounded-full flex items-center justify-center overflow-hidden">
             <span className="font-bold text-brand-brown text-xl">T&T</span>
          </div>
          <span className="font-display font-bold text-lg hidden sm:block">Taste & Talk <span className="text-brand-orange">Saigon</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-8 font-medium">
          <Link to="/" className="hover:text-brand-orange transition-colors">Home</Link>
          <a href="/#tours" className="hover:text-brand-orange transition-colors">Tours</a>
          <a href="/#about" className="hover:text-brand-orange transition-colors">About</a>
          <a href="#reviews" className="hover:text-brand-orange transition-colors">Reviews</a>
        </div>

        <div className="flex items-center gap-3">
          <a 
            href="https://wa.me/84123456789" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-xl font-bold hover:bg-green-600 transition-all shadow-lg shadow-green-200"
          >
            <Phone size={18} />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
          <button 
            className="md:hidden p-2 hover:bg-black/5 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-4 right-4 glass-card rounded-2xl p-6 flex flex-col gap-4 md:hidden pointer-events-auto"
          >
            <Link to="/" className="text-lg font-medium" onClick={() => setIsOpen(false)}>Home</Link>
            <a href="/#tours" className="text-lg font-medium" onClick={() => setIsOpen(false)}>Tours</a>
            <a href="/#about" className="text-lg font-medium" onClick={() => setIsOpen(false)}>About</a>
            <a href="#reviews" className="text-lg font-medium" onClick={() => setIsOpen(false)}>Reviews</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
