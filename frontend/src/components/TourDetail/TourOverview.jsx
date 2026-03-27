import React from 'react';

export default function TourOverview({ description }) {
  return (
    <section>
      <h2 className="text-3xl font-display font-bold mb-6">What is this tour?</h2>
      <p className="text-brand-brown/70 text-lg leading-relaxed">
        {description}
      </p>
    </section>
  );
}
