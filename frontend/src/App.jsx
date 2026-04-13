import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { APIProvider } from '@vis.gl/react-google-maps';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import SocialFloatingButtons from './components/SocialFloatingButtons';
import Home from './pages/Home';
import TourDetail from './pages/TourDetail';
import { Instagram, Facebook, Youtube, MapPin, Mail, Phone, MessageCircle } from 'lucide-react';

const GOOGLE_MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY || import.meta.env.GOOGLE_MAPS_PLATFORM_KEY || '';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HelmetProvider>
      <APIProvider apiKey={GOOGLE_MAPS_KEY} version="weekly">
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen relative">
            <Navbar />
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tour/:id" element={<TourDetail />} />
            </Routes>

            <SocialFloatingButtons />

            <footer className="bg-white border-t border-black/5 py-8 md:py-12 px-4">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex items-center justify-center">
                      <img 
                        src="https://res.cloudinary.com/dk9kyhox7/image/upload/v1775971559/logo_rmbg_gr0ny1.png" 
                        alt="Taste & Talk Logo" 
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="font-display font-bold text-2xl">Taste&Talk <span className="text-brand-orange">Saigon</span></span>
                  </div>
                  <p className="text-brand-brown font-bold max-w-sm mb-8 text-lg leading-relaxed">
                    Thank you for being here. It means the world to us that you’re considering seeing Saigon through our eyes. We can’t wait to welcome you!
                  </p>
                  <div className="flex gap-4">
                    <a href="https://www.instagram.com/tntsaigon.foodtour?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-brand-orange hover:text-white transition-all"><Instagram size={20} /></a>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold mb-6">Contact Info</h4>
                  <ul className="space-y-4 text-brand-brown/70">
                    <li className="flex items-center gap-3"><MapPin size={18} className="text-brand-orange" /> To Ngoc Van, Ho Chi Minh City</li>
                    <li className="flex items-center gap-3"><Phone size={18} className="text-brand-orange" /> +84 858 207 201</li>
                    <li className="flex items-center gap-3"><Mail size={18} className="text-brand-orange" /> hoaidanpham3003@gmail.com</li>
                  </ul>
                </div>
              </div>
              <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-brand-brown/40">
                <p>© 2026 Taste & Talk Saigon Food Tour. All rights reserved.</p>
                <p>Designed with ❤️ for Saigon Food Lovers</p>
              </div>
            </footer>
          </div>
        </BrowserRouter>
      </APIProvider>
    </HelmetProvider>
  );
}
