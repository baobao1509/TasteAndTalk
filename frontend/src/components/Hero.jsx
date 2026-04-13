import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const HERO_IMAGES = [
  "https://res.cloudinary.com/dk9kyhox7/image/upload/v1775663105/de8da303-6c6a-44b7-b125-547262463110.png",
  "https://res.cloudinary.com/dk9kyhox7/image/upload/v1775663112/569c9461-dd4b-40ec-9ed9-46799c4cc968.png",
  "https://res.cloudinary.com/dk9kyhox7/image/upload/v1775663122/69317d4f-ada0-495e-8d37-66827b968051.png",
  "https://res.cloudinary.com/dk9kyhox7/image/upload/v1775663119/6d96ceb3-b4f5-4015-8d96-809f83d1b9ac.png",
  "https://res.cloudinary.com/dk9kyhox7/image/upload/v1775663105/de8da303-6c6a-44b7-b125-547262463110.png",
  "https://res.cloudinary.com/dk9kyhox7/image/upload/v1775663098/77972796-f339-43a6-a453-c735f7535494.png",
];


export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen min-h-[100dvh] flex items-center pt-24 pb-32 px-4 overflow-hidden">
      {/* Background Image Slider with Overlay */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          <motion.img 
            key={currentImageIndex}
            src={HERO_IMAGES[currentImageIndex]} 
            alt={`Saigon Street Background ${currentImageIndex + 1}`} 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
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
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold  leading-tight mb-8 text-white tracking-normal">
              Taste the Real. <br />
              <span className="text-brand-yellow font-bold">Talk the Feel.</span>
            </h1>

            <p className=" text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-12 font-light">
              Forget the staged tours. We’re a high-energy crew of former drivers turned local food experts. Ditch the tourist traps—ride with your new local besties for an unscripted dive into Saigon’s legendary street food and the realest stories behind every bite.
            </p>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-12">
              <button 
                onClick={() => document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-brand-orange text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl hover:scale-105 active:scale-95 transition-transform shadow-2xl shadow-brand-orange/40 flex items-center gap-3"
              >
                Ride & Taste With Us <ArrowRight size={24} />
              </button>
              <button 
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/5 backdrop-blur-md border-2 border-white text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl hover:bg-white/20 active:scale-95 transition-all"
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

      {/* Bottom fade to content - shorter and lower */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/40 to-transparent z-10"></div>
    </section>
  );
}

