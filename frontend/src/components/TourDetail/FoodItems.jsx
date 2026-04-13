import React, { useState } from 'react';
import { Utensils, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FoodItems({ items }) {
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="bg-brand-yellow/10 p-8 rounded-[2.5rem]">
      <div className="flex items-center gap-3 mb-6">
        <Utensils className="text-brand-orange" />
        <h2 className="text-2xl font-display font-bold">Menu</h2>
      </div>
      
      {/* Desktop View: Always show all */}
      <div className="hidden md:grid grid-cols-3 gap-3">
        {items.map((item, i) => (
          <div 
            key={i} 
            className="bg-white px-4 py-3 rounded-xl font-bold text-brand-brown shadow-sm border border-brand-yellow/20 flex items-center justify-center text-center"
          >
            {item}
          </div>
        ))}
      </div>

      {/* Mobile View: Animated expansion */}
      <div className="md:hidden space-y-3">
        {/* Always show first 3 */}
        <div className="grid grid-cols-1 gap-3">
          {items.slice(0, 3).map((item, i) => (
            <div 
              key={i} 
              className="bg-white px-4 py-3 rounded-xl font-bold text-brand-brown shadow-sm border border-brand-yellow/20 flex items-center justify-center text-center"
            >
              {item}
            </div>
          ))}
        </div>

        {/* Animated extra items */}
        <AnimatePresence>
          {showAll && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 gap-3 pt-3">
                {items.slice(3).map((item, i) => (
                  <div 
                    key={i + 3} 
                    className="bg-white px-4 py-3 rounded-xl font-bold text-brand-brown shadow-sm border border-brand-yellow/20 flex items-center justify-center text-center"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {items.length > 3 && (
          <button 
            onClick={() => setShowAll(!showAll)}
            className="mt-4 w-full flex items-center justify-center gap-2 text-brand-orange font-bold py-3 bg-white/50 hover:bg-white rounded-xl transition-colors border border-brand-orange/10"
          >
            {showAll ? (
              <>Show Less <ChevronUp size={18} /></>
            ) : (
              <>See All {items.length} Dishes <ChevronDown size={18} /></>
            )}
          </button>
        )}
      </div>
    </section>
  );
}
