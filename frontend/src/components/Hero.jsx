import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, MapPin } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-32 px-4 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/saigon-street-life/1920/1080" 
          alt="Saigon Street Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-brand-dark/90 via-brand-dark/70 to-brand-dark/40 lg:to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-20">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl"
          >
            <h1 className="text-5xl sm:text-7xl lg:text-9xl font-display font-bold leading-tight mb-8 text-white">
              Taste the Real <span className="text-brand-yellow">Saigon</span> <br />
              <span className="text-white/90">Like a Local</span>
            </h1>

            <p className="text-xl sm:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-12">
              Join us for an unforgettable journey through the hidden alleys and vibrant markets of Ho Chi Minh City. Authentic flavors, local stories, and memories that last a lifetime.
            </p>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <button 
                onClick={() => document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-brand-orange text-white px-10 sm:px-12 py-5 sm:py-6 rounded-2xl font-bold text-xl sm:text-2xl hover:scale-105 active:scale-95 transition-transform shadow-2xl shadow-brand-orange/40 flex items-center gap-3"
              >
                Explore Tours <ArrowRight size={28} />
              </button>
              <button 
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 sm:px-12 py-5 sm:py-6 rounded-2xl font-bold text-xl sm:text-2xl hover:bg-white/20 active:scale-95 transition-all"
              >
                Our Story
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 hidden sm:block"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.div>

      {/* Bottom fade to content */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent z-10"></div>
    </section>
  );
}
