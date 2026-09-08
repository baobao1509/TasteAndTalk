import React, { useState } from 'react';
import { Utensils, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function renderFormattedText(text) {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-bold text-brand-brown">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function FoodItems({ items = [], tour }) {
  const [showAllStandard, setShowAllStandard] = useState(false);

  // 1. Lấy nội dung text từ trường menuDescription trong MongoDB (tự động tách thành các đoạn khi có xuống dòng)
  const paragraphs = typeof tour?.menuDescription === 'string' && tour.menuDescription.trim().length > 0
    ? tour.menuDescription.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)
    : [];

  // 2. Lấy 2 ảnh từ 2 trường menuImage1 và menuImage2 trong MongoDB
  const images = [];
  if (tour?.menuImage1) images.push(tour.menuImage1);
  if (tour?.menuImage2) images.push(tour.menuImage2);

  const hasMenuContent = paragraphs.length > 0;

  return (
    <section className="bg-brand-yellow/10 p-6 md:p-8 rounded-[2.5rem] border border-brand-yellow/20">
      {!hasMenuContent && items.length > 0 && (
        <div className="flex items-center gap-3 mb-6">
          <Utensils className="text-brand-orange" />
          <h2 className="text-2xl font-display font-bold">
            Must-try Dishes
          </h2>
        </div>
      )}

      {hasMenuContent ? (
        <div className="space-y-6">
          {/* Text paragraphs - displays completely without folding on both mobile & desktop */}
          <div className="space-y-4 text-brand-brown/85 leading-relaxed text-base md:text-lg">
            {paragraphs.map((paragraph, i) => (
              <p key={i}>
                {renderFormattedText(paragraph)}
              </p>
            ))}
          </div>

          {/* Dynamic, lively photo showcase */}
          {images.length > 0 && (
            <div className="pt-4 pb-2">
              {images.length === 1 ? (
                <div className="relative rounded-[2rem] overflow-hidden shadow-md border border-brand-yellow/30 bg-amber-50 h-64 md:h-80">
                  <img 
                    src={images[0]} 
                    alt="Tour culinary highlight" 
                    className="w-full h-full object-cover" 
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="relative flex flex-col sm:flex-row items-center sm:items-end justify-center gap-5 sm:gap-6 pt-4">
                  {/* Decorative background warmth */}
                  <div className="absolute -top-6 right-1/4 w-40 h-40 bg-brand-yellow/30 rounded-full blur-3xl pointer-events-none" />

                  {/* Photo 1: Primary card, organic slight tilt with polaroid-style white frame */}
                  <motion.div 
                    whileHover={{ scale: 1.02, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full sm:w-[56%] relative z-10 bg-white p-2.5 sm:p-3.5 rounded-[2rem] shadow-lg hover:shadow-xl transition-all duration-300 border border-brand-yellow/30 -rotate-1 sm:-rotate-2"
                  >
                    <div className="relative h-56 sm:h-64 md:h-72 rounded-[1.4rem] overflow-hidden bg-amber-50">
                      <img 
                        src={images[0]} 
                        alt="Tour culinary highlight 1" 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                        loading="lazy"
                      />
                      <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-brand-brown text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        🥢 Fresh & Authentic
                      </span>
                    </div>
                  </motion.div>

                  {/* Photo 2: Secondary card, overlapping & offset with opposing tilt */}
                  <motion.div 
                    whileHover={{ scale: 1.03, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-[90%] sm:w-[46%] relative z-20 bg-white p-2.5 sm:p-3.5 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300 border border-brand-yellow/40 rotate-2 sm:rotate-3 -mt-8 sm:-mt-0 sm:-ml-12"
                  >
                    <div className="relative h-52 sm:h-60 md:h-68 rounded-[1.4rem] overflow-hidden bg-amber-50">
                      <img 
                        src={images[1]} 
                        alt="Tour culinary highlight 2" 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                        loading="lazy"
                      />
                      <span className="absolute bottom-3 right-3 bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        ✨ Local Specialty
                      </span>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Fallback Desktop View if only simple foodItems tags exist */}
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

          {/* Fallback Mobile View */}
          <div className="md:hidden space-y-3">
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

            <AnimatePresence>
              {showAllStandard && (
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
                onClick={() => setShowAllStandard(!showAllStandard)}
                className="mt-4 w-full flex items-center justify-center gap-2 text-brand-orange font-bold py-3 bg-white/50 hover:bg-white rounded-xl transition-colors border border-brand-orange/10"
              >
                {showAllStandard ? (
                  <>Show Less <ChevronUp size={18} /></>
                ) : (
                  <>See All {items.length} Dishes <ChevronDown size={18} /></>
                )}
              </button>
            )}
          </div>
        </>
      )}
    </section>
  );
}
