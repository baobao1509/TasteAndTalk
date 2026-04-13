import React from 'react';
import { Send } from 'lucide-react';

export default function BookingSidebar({ tour, bookingBoxRef }) {
  return (
    <div className="lg:col-span-1 order-last">
      <div ref={bookingBoxRef} className="sticky top-32 glass-card rounded-[2.5rem] p-8 space-y-8 shadow-xl border border-white/50">
        <div>
          <p className="text-brand-brown/60 font-medium mb-1">Price per person</p>
          <h3 className="text-5xl font-display font-bold text-brand-orange">{tour.price}</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-black/5">
            <span className="text-brand-brown/60">Availability</span>
            <span className="font-bold text-green-600">After 3PM</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-black/5">
            <span className="text-brand-brown/60">Language</span>
            <span className="font-bold">English</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-black/5">
            <span className="text-brand-brown/60">Transport</span>
            <span className="font-bold">Motorbike</span>
          </div>
        </div>

        <a 
          href={`https://wa.me/84858207201?text=Hi! I want to book the ${tour.title}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-green-500 text-white py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 hover:bg-green-600 transition-all shadow-xl shadow-green-100"
        >
          <Send size={24} />
          Book via WhatsApp
        </a>

        <p className="text-center text-sm text-brand-brown/40">
          Instant confirmation & flexible cancellation
        </p>
      </div>
    </div>
  );
}
