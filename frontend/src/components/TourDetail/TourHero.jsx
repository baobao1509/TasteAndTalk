import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Star } from 'lucide-react';

export default function TourHero({ tour }) {
  return (
    <section className="relative h-[60vh] min-h-[400px] overflow-hidden rounded-b-[3rem] md:rounded-b-[5rem]">
      <img src={tour.heroImage} alt={tour.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      
      <div className="absolute top-32 left-4 right-4">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={20} /> Back to Tours
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold   text-white mb-6 max-w-3xl"
          >
            {tour.title}
          </motion.h1>
          <div className="flex flex-wrap gap-6 text-white/90">
            <div className="flex items-center gap-2"><Clock size={20} className="text-brand-yellow" /> {tour.duration}</div>
            <div className="flex items-center gap-2"><Users size={20} className="text-brand-yellow" /> {tour.groupSize}</div>
            <div className="flex items-center gap-2"><Star size={20} className="text-brand-yellow fill-brand-yellow" /> {tour.rating} (Google Reviews)</div>
          </div>
        </div>
      </div>
    </section>
  );
}
