import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Send } from 'lucide-react';
import GoogleReviews from '../components/GoogleReviews';
import TrustindexBadge from '../components/TrustindexBadge';
import TourHero from '../components/TourDetail/TourHero';
import TourOverview from '../components/TourDetail/TourOverview';
import FoodItems from '../components/TourDetail/FoodItems';
import TourItinerary from '../components/TourDetail/TourItinerary';
import VisualJourney from '../components/TourDetail/VisualJourney';
import TourPolicies from '../components/TourDetail/TourPolicies';
import BookingSidebar from '../components/TourDetail/BookingSidebar';

export default function TourDetail() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [showFloatingBtn, setShowFloatingBtn] = useState(true);
  const bookingBoxRef = useRef(null);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const response = await fetch(`${apiUrl}/api/tours/${id}`);
        if (!response.ok) throw new Error('Tour not found');
        const data = await response.json();
        setTour(data);
      } catch (error) {
        console.error("Error fetching tour:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hide floating button when booking box is visible
        setShowFloatingBtn(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (bookingBoxRef.current) {
      observer.observe(bookingBoxRef.current);
    }

    return () => {
      if (bookingBoxRef.current) {
        observer.unobserve(bookingBoxRef.current);
      }
    };
  }, [loading, tour]);

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    if (showFloatingBtn && isMobile) {
      document.documentElement.style.setProperty('--floating-social-offset', '80px');
    } else {
      document.documentElement.style.setProperty('--floating-social-offset', '0px');
    }
    return () => {
      document.documentElement.style.setProperty('--floating-social-offset', '0px');
    };
  }, [showFloatingBtn]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-orange"></div>
    </div>
  );

  if (!tour) return <div className="pt-32 text-center text-2xl font-bold text-brand-brown">Tour not found</div>;

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const isCustomTour = tour.isCustom || tour.title?.toLowerCase().includes('custom');

  return (
    <div className="min-h-screen pb-24">
      <Helmet>
        <title>{`${tour.title} | Taste & Talk Saigon`}</title>
        <meta name="description" content={tour.description?.substring(0, 160) || "Join our authentic street food tour in Saigon."} />
        <meta property="og:title" content={`${tour.title} | Taste & Talk Saigon`} />
        <meta property="og:description" content={tour.description?.substring(0, 160)} />
        <meta property="og:image" content={tour.heroImage || tour.image} />
        <link rel="canonical" href={`https://tntsaigonfoodtour.com/tour/${id}`} />
      </Helmet>
      <TourHero tour={tour} />

      <div className={`max-w-7xl mx-auto px-4 ${isCustomTour ? 'mt-6' : 'mt-12'} grid lg:grid-cols-3 gap-12`}>
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-12">
          <TourOverview 
            description={tour.description} 
            duration={tour.duration} 
            isCustom={isCustomTour} 
          />
          
          {!isCustomTour && (
            <>
              <FoodItems items={tour.foodItems} />
              <TourItinerary 
                itinerary={tour.itinerary} 
                openAccordion={openAccordion} 
                setOpenAccordion={setOpenAccordion} 
              />
              <VisualJourney itinerary={tour.itinerary} />
              <TourPolicies 
                tour={tour} 
                openAccordion={openAccordion} 
                toggleAccordion={toggleAccordion} 
              />
            </>
          )}
        </div>

        {/* Right Sidebar - Booking */}
        <BookingSidebar tour={tour} bookingBoxRef={bookingBoxRef} />
      </div>

      {/* Google Reviews - Outside the grid for better mobile ordering */}
      <section id="reviews" className="pt-8 md:pt-16 mt-8 md:mt-16 border-t border-black/5">
        <div className="bg-brand-yellow/5 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 border border-brand-yellow/10">
                      <div className="text-center mb-10 md:mb-16 px-4">
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-4 text-brand-dark tracking-tight">
                <span className="inline-block text-left">
                  <span className="block md:inline">They tasted<span className="hidden md:inline">,</span></span>
                  <span className="block md:inline md:ml-4 ml-12 mt-1 md:mt-0">They talked</span>
                </span>
              </h2>
              <p className="text-brand-brown/60 max-w-2xl mx-auto text-base md:text-lg mb-8 leading-relaxed">
                Real feedback from travelers who have explored the streets of Saigon with us.
              </p>
            </div>
          
          <GoogleReviews placeId="ChIJaX_6666666666666666" />
          
            <div className="mt-2 text-center">
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Taste%26Talk+Saigon" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-brand-orange font-bold hover:underline text-lg"
              >
                Read more reviews on Google Maps
              </a>
            </div>
        </div>
      </section>

      {/* Floating WhatsApp Button for Mobile */}
      <AnimatePresence>
        {showFloatingBtn && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 100 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-8 right-8 z-40 lg:hidden"
          >
            <motion.a
              href={`https://wa.me/84858207201?text=Hi! I want to book the ${tour.title}`}
              target="_blank"
              rel="noopener noreferrer"
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex items-center gap-3 px-6 py-3 bg-green-500 text-white rounded-full shadow-2xl shadow-green-500/40"
            >
              <Send size={20} />
              <span className="font-bold whitespace-nowrap text-sm">Book via WhatsApp</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
