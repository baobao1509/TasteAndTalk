import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Send } from 'lucide-react';
import GoogleReviews from '../components/GoogleReviews';
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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-orange"></div>
    </div>
  );

  if (!tour) return <div className="pt-32 text-center text-2xl font-bold text-brand-brown">Tour not found</div>;

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

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

      <div className="max-w-7xl mx-auto px-4 mt-12 grid lg:grid-cols-3 gap-12">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-16">
          <TourOverview description={tour.description} />
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
        </div>

        {/* Right Sidebar - Booking */}
        <BookingSidebar tour={tour} bookingBoxRef={bookingBoxRef} />
      </div>

      {/* Google Reviews - Outside the grid for better mobile ordering */}
      <section id="reviews" className="pt-16 mt-16 border-t border-black/5">
        <div className="bg-brand-yellow/5 rounded-[3rem] p-8 md:p-12 border border-brand-yellow/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-6 h-6" />
                <h2 className="text-3xl font-display font-bold">Google Reviews</h2>
              </div>
              <p className="text-brand-brown/60">What our guests are saying about this tour</p>
            </div>
            <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl shadow-sm border border-black/5">
              <div>
                <div className="flex items-center gap-1 text-brand-yellow">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-current" />)}
                </div>
              </div>
              <div className="w-px h-10 bg-black/5" />
              <div className="flex items-center gap-2">
                <span className="text-3xl font-display font-bold text-brand-brown">4.9</span>
                <span className="text-brand-brown/40 text-sm">/ 5</span>
              </div>
            </div>
          </div>
          
          <GoogleReviews placeId="ChIJ-yncs6K8sScRdwRAcb2K35k" />
          
          <div className="mt-12 text-center">
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Taste&Talk+Saigon" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-brand-brown/60 hover:text-brand-orange font-bold text-sm transition-colors"
            >
              View all reviews on Google Maps
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
            className="fixed bottom-8 right-8 z-40 lg:hidden"
          >
            <motion.a
              href={`https://wa.me/84123456789?text=Hi! I want to book the ${tour.title}`}
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
              className="flex items-center gap-3 px-6 py-4 bg-green-500 text-white rounded-full shadow-2xl shadow-green-500/40"
            >
              <Send size={24} />
              <span className="font-bold whitespace-nowrap">Book via WhatsApp</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
