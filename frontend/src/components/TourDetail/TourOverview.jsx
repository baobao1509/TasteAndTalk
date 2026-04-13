import React from 'react';

import { Clock } from 'lucide-react';

export default function TourOverview({ description, duration, isCustom }) {
  return (
    <section>
      {!isCustom && <h2 className="text-3xl font-display font-bold mb-6"></h2>}
      
      {isCustom && (
        <div className="flex items-center gap-2 text-brand-orange font-bold text-sm mb-3">
          <Clock size={16} />
          <span>{duration}</span>
        </div>
      )}
      
      <p className={`${isCustom ? 'text-brand-brown text-lg md:text-xl font-medium' : 'text-brand-brown/80 text-lg'} leading-relaxed whitespace-pre-wrap`}>
        {description}
      </p>
    </section>
  );
}
