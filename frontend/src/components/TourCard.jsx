import React from 'react';
import { motion } from 'motion/react';
import { Clock, Users, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TourCard({ id, title, price, duration, groupSize, image, rating, description }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-amber-50/50 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all border border-amber-200/50 group"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl font-bold text-brand-orange shadow-sm">
          {price}
        </div>
        <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-brand-dark/80 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm">
          <Star size={14} className="fill-brand-yellow text-brand-yellow" />
          <span>{rating}</span>
        </div>
      </div>
      
      <div className="p-8">
        <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-brand-orange transition-colors">{title}</h3>
        <p className="text-brand-brown/60 text-sm mb-6 line-clamp-2 leading-relaxed">
          {description}
        </p>
        
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-brand-brown/70 text-sm font-medium">
            <Clock size={16} />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-2 text-brand-brown/70 text-sm font-medium">
            <Users size={16} />
            <span>{groupSize}</span>
          </div>
        </div>
        
        <Link 
          to={`/tour/${id}`}
          className="w-full py-4 rounded-2xl border-2 border-brand-orange/20 text-brand-orange font-bold flex items-center justify-center gap-2 hover:bg-brand-orange hover:text-white transition-all"
        >
          View Details <ArrowRight size={18} />
        </Link>
      </div>
    </motion.div>
  );
}
