import React from 'react';
import { motion } from 'motion/react';
import { Camera } from 'lucide-react';

export default function VisualJourney({ itinerary }) {
  const images = itinerary.filter(item => item.image);
  
  if (images.length === 0) return null;

  return (
    <section className="hidden lg:block space-y-8">
      <div className="flex items-center gap-3 mb-4">
        <Camera className="text-brand-orange" />
        <h2 className="text-3xl font-display font-bold">Visual Journey</h2>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {images.map((item, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -10 }}
            className="group relative h-80 rounded-[2.5rem] overflow-hidden shadow-xl border border-white/20"
          >
            <img src={item.image} alt={item.activity} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
              <span className="text-brand-yellow font-mono text-sm mb-2">{item.time}</span>
              <h3 className="text-2xl font-display font-bold text-white">{item.activity}</h3>
              <p className="text-white/70 mt-2 line-clamp-2 font-medium">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
