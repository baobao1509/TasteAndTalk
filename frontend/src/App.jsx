import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { APIProvider } from '@vis.gl/react-google-maps';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import SocialFloatingButtons from './components/SocialFloatingButtons';
import Home from './pages/Home';
import TourDetail from './pages/TourDetail';
import { Instagram, Facebook, Youtube, MapPin, Mail, Phone, MessageCircle } from 'lucide-react';

const GOOGLE_MAPS_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';

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

            <footer className="bg-white border-t border-black/5 py-16 px-4">
              <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
                <div className="col-span-2">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center">
                      <img 
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 140 100'%3E%3Cg transform='translate(10, 0)'%3E%3Crect x='0' y='30' width='12' height='5' rx='2.5' fill='%23FFD200'/%3E%3Crect x='8' y='40' width='15' height='5' rx='2.5' fill='%23FFD200'/%3E%3Crect x='4' y='50' width='18' height='5' rx='2.5' fill='%23FFD200'/%3E%3Crect x='12' y='60' width='12' height='5' rx='2.5' fill='%23FFD200'/%3E%3Cpath d='M70 50 L105 25 A40 40 0 1 0 105 75 Z' fill='%23FFD200' stroke='%235D3A1A' stroke-width='3'/%3E%3Ccircle cx='75' cy='35' r='4' fill='%235D3A1A'/%3E%3Cline x1='110' y1='35' x2='125' y2='25' stroke='%235D3A1A' stroke-width='4' stroke-linecap='round'/%3E%3Cline x1='115' y1='50' x2='130' y2='50' stroke='%235D3A1A' stroke-width='4' stroke-linecap='round'/%3E%3Cline x1='110' y1='65' x2='125' y2='75' stroke='%235D3A1A' stroke-width='4' stroke-linecap='round'/%3E%3C/g%3E%3C/svg%3E" 
                        alt="Taste & Talk Logo" 
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="font-display font-bold text-2xl">Taste & Talk <span className="text-brand-orange">Saigon</span></span>
                  </div>
                  <p className="text-brand-brown/60 max-w-sm mb-8">
                    The original street food tour experience in Ho Chi Minh City. Join us for a taste of authentic Vietnam.
                  </p>
                  <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-brand-orange hover:text-white transition-all"><Instagram size={20} /></a>
                    <a href="#" className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-brand-orange hover:text-white transition-all"><Facebook size={20} /></a>
                    <a href="#" className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-brand-orange hover:text-white transition-all"><Youtube size={20} /></a>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold mb-6">Contact Info</h4>
                  <ul className="space-y-4 text-brand-brown/70">
                    <li className="flex items-center gap-3"><MapPin size={18} className="text-brand-orange" /> District 1, Ho Chi Minh City</li>
                    <li className="flex items-center gap-3"><Phone size={18} className="text-brand-orange" /> +84 123 456 789</li>
                    <li className="flex items-center gap-3"><Mail size={18} className="text-brand-orange" /> hello@tntsaigonfoodtour.com</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-6">Quick Links</h4>
                  <ul className="space-y-4 text-brand-brown/70">
                    <li><a href="#" className="hover:text-brand-orange transition-colors">Terms of Service</a></li>
                    <li><a href="#" className="hover:text-brand-orange transition-colors">Privacy Policy</a></li>
                    <li><a href="#reviews" className="hover:text-brand-orange transition-colors">Google Reviews</a></li>
                    <li><a href="#" className="hover:text-brand-orange transition-colors">FAQs</a></li>
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
