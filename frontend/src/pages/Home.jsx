import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import TourCard from '../components/TourCard';
import GoogleReviews from '../components/GoogleReviews';
import { Phone, Instagram, Facebook, Youtube, MapPin, Mail, Star, Play } from 'lucide-react';

export default function Home() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch('/api/tours');
        const data = await response.json();
        setTours(data);
      } catch (error) {
        console.error("Error fetching tours:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Taste & Talk Saigon | Authentic Street Food Tours in Ho Chi Minh City</title>
        <meta name="description" content="Experience the best street food in Saigon with local guides. Join Taste & Talk Saigon for authentic culinary adventures, hidden gems, and real stories of Vietnam." />
        <meta name="keywords" content="saigon street food tour, ho chi minh city food tour, authentic vietnamese food, local foodie friends, taste and talk saigon" />
        <link rel="canonical" href="https://tntsaigonfoodtour.com" />
      </Helmet>
      <main>
        <Hero />

        {/* Featured Tours Section */}
        <section id="tours" className="py-24 px-4 bg-white rounded-section">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <span className="text-brand-orange font-bold tracking-widest uppercase text-sm">Our Experiences</span>
                <h2 className="text-4xl md:text-5xl font-display font-bold mt-2">Most Popular Food Tours</h2>
              </div>
              <p className="text-brand-brown/60 max-w-md">
                Carefully curated experiences designed to give you a true taste of Saigon's culinary heritage.
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-orange"></div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.isArray(tours) ? (
                  tours.map((tour) => (
                    <TourCard 
                      key={tour.id || tour._id} 
                      id={tour.id}
                      title={tour.title}
                      price={tour.price}
                      duration={tour.duration}
                      groupSize={tour.groupSize}
                      image={tour.heroImage || tour.image}
                      rating={tour.rating}
                      description={tour.description}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-10 bg-red-50 rounded-xl">
                    <p className="text-red-500 font-bold">Không thể tải danh sách tour. Vui lòng kiểm tra cấu hình Database.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Google Reviews Section */}
        <section id="reviews" className="relative pt-32 pb-24 px-4 bg-brand-yellow/5">
          {/* Soft Gradient Transition from White to Yellow */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-4">
                <Star size={16} className="fill-brand-yellow text-brand-yellow" />
                <span className="text-sm font-bold">4.9/5 on Google Maps</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">What Our Foodies Say</h2>
              <p className="text-brand-brown/60 max-w-2xl mx-auto">
                Real feedback from travelers who have explored the streets of Saigon with us.
              </p>
            </div>

            {/* Replace with your actual Google Place ID */}
            <GoogleReviews placeId="ChIJaX_6666666666666666" />
            
            <div className="mt-12 text-center">
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Taste+and+Talk+Saigon+Food+Tour" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-brand-orange font-bold hover:underline"
              >
                View all reviews on Google Maps
              </a>
            </div>
          </div>
        </section>

        {/* About / Who We Are Section */}
        <section id="about" className="py-24 px-4">
          <div className="max-w-7xl mx-auto bg-brand-dark text-white rounded-section p-8 md:p-20 relative overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
                    We are <span className="text-brand-yellow">Taste & Talk</span>, Your Local Foodie Friends
                  </h2>
                  <p className="text-white/70 text-lg mb-8 leading-relaxed">
                    Founded by a group of passionate locals who love Saigon and its food. Our mission is simple: to show you the side of Saigon that tourists rarely see. No tourist traps, just real food and real stories.
                  </p>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-4xl font-bold text-brand-yellow mb-2">5k+</p>
                      <p className="text-sm text-white/50 uppercase tracking-wider">Guests Hosted</p>
                    </div>
                    <div>
                      <p className="text-4xl font-bold text-brand-yellow mb-2">100%</p>
                      <p className="text-sm text-white/50 uppercase tracking-wider">Local Guides</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="aspect-video rounded-3xl overflow-hidden bg-black relative group cursor-pointer shadow-2xl">
                    <img src="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" alt="Saigon Food Tour Video" className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-brand-orange text-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                        <Play size={24} fill="currentColor" />
                      </div>
                    </div>
                    <a 
                      href="https://youtube.com/watch?v=dQw4w9WgXcQ" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="absolute inset-0"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <img src="https://picsum.photos/seed/team1/400/500" alt="Team" className="rounded-3xl w-full h-48 object-cover rotate-2" />
                    <img src="https://picsum.photos/seed/team2/400/500" alt="Food" className="rounded-3xl w-full h-48 object-cover -rotate-2" />
                  </div>
                </div>
              </div>
            
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/20 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-yellow/10 blur-[120px] rounded-full"></div>
          </div>
        </section>

        {/* Call to Action / WhatsApp */}
        <section className="py-24 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-display font-bold mb-6">Have Questions? Chat with Us!</h2>
            <p className="text-brand-brown/60 mb-10 text-lg">
              We're here to help you plan the perfect food adventure. Message us on WhatsApp for instant support.
            </p>
            <a 
              href="https://wa.me/84123456789" 
              className="inline-flex items-center gap-3 bg-green-500 text-white px-10 py-5 rounded-[2rem] font-bold text-xl hover:scale-105 transition-transform shadow-2xl shadow-green-200"
            >
              <Phone size={24} />
              Message on WhatsApp
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
