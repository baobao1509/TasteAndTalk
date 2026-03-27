import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react';

export default function TourItinerary({ itinerary, openAccordion, setOpenAccordion }) {
  return (
    <section className="space-y-8">
      <div className="flex items-center gap-3 mb-4">
        <Calendar className="text-brand-orange" />
        <h2 className="text-3xl font-display font-bold">Tour Itinerary</h2>
      </div>
      
      <div className="relative pl-8 space-y-4">
        {/* Vertical Line */}
        <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-brand-yellow/30" />
        
        {itinerary.map((item, i) => (
          <div key={i} className="relative">
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] top-1.5 w-6 h-6 rounded-full bg-brand-yellow border-4 border-white shadow-sm z-10" />
            
            <div className="group cursor-pointer py-1" onClick={() => setOpenAccordion(openAccordion === `itinerary-${i}` ? null : `itinerary-${i}`)}>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-1 lg:gap-3">
                <div className="space-y-0">
                  <span className="text-brand-orange font-mono font-bold text-[10px] tracking-[0.2em] uppercase opacity-80">{item.time}</span>
                  <h3 className="text-lg font-display font-bold text-brand-brown group-hover:text-brand-orange transition-colors leading-tight">
                    {item.activity}
                  </h3>
                </div>
                
                {/* Redesigned Toggle Indicator */}
                <div className="p-1 rounded-full bg-brand-orange/5 border border-brand-orange/10 group-hover:bg-brand-orange/10 transition-all self-start lg:self-center">
                  {openAccordion === `itinerary-${i}` ? 
                    <ChevronUp size={14} className="text-brand-orange" /> : 
                    <ChevronDown size={14} className="text-brand-orange" />
                  }
                </div>
              </div>

              <AnimatePresence>
                {openAccordion === `itinerary-${i}` && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 pb-2 space-y-4">
                      <div className="bg-brand-yellow/5 p-6 rounded-2xl border border-brand-yellow/10">
                        <p className="text-brand-brown/80 leading-relaxed font-medium">
                          {item.desc}
                        </p>
                      </div>
                      {/* Image - Shown on all devices now */}
                      {item.image && (
                        <div className="w-full h-64 rounded-3xl overflow-hidden shadow-lg border border-black/5">
                          <img src={item.image} alt={item.activity} className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
