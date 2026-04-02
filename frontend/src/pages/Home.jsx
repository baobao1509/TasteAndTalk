import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import TourCard from '../components/TourCard';
import GoogleReviews from '../components/GoogleReviews';
import TrustindexBadge from '../components/TrustindexBadge';
import { Phone, Instagram, Facebook, Youtube, MapPin, Mail, Star, Play } from 'lucide-react';

export default function Home() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const response = await fetch(`${apiUrl}/api/tours`, { signal: controller.signal });
        const data = await response.json();
        setTours(data);
      } catch (error) {
        console.error("Error fetching tours:", error);
        // If it's a timeout or error, we might want to show some default data
        // but for now we'll just let the UI handle the empty state or error
      } finally {
        clearTimeout(timeoutId);
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
        
        {/* Structured Data for Sitelinks and Brand */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Taste & Talk Saigon",
              "url": "https://tntsaigonfoodtour.com",
              "logo": "https://tntsaigonfoodtour.com/logo.png",
              "sameAs": [
                "https://www.facebook.com/tntsaigonfoodtour",
                "https://www.instagram.com/tntsaigonfoodtour"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+84-123-456-789",
                "contactType": "customer service"
              }
            }
          `}
        </script>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://tntsaigonfoodtour.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://tntsaigonfoodtour.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          `}
        </script>
      </Helmet>
      <main>
        <Hero />

        {/* Featured Tours Section */}
        <section id="tours" className="py-12 px-4 bg-white rounded-section">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
              <div>
                <span className="text-brand-orange font-bold tracking-widest uppercase text-sm">Our Experiences</span>
                <h2 className="text-4xl md:text-5xl font-display font-bold mt-2">Most Popular Food Tours</h2>
              </div>
              <p className="text-brand-brown/60 max-w-md">
                Carefully curated experiences designed to give you a true taste of Saigon's culinary heritage.
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-amber-50/30 rounded-[2.5rem] h-[500px] animate-pulse flex flex-col">
                    <div className="h-64 bg-amber-100/50 rounded-t-[2.5rem]" />
                    <div className="p-8 space-y-4 flex-grow">
                      <div className="h-8 bg-amber-100/50 rounded-xl w-3/4" />
                      <div className="h-4 bg-amber-100/50 rounded-xl w-full" />
                      <div className="h-4 bg-amber-100/50 rounded-xl w-5/6" />
                      <div className="pt-8 flex justify-between">
                        <div className="h-6 bg-amber-100/50 rounded-lg w-20" />
                        <div className="h-6 bg-amber-100/50 rounded-lg w-20" />
                      </div>
                      <div className="pt-8 h-14 bg-amber-100/50 rounded-2xl w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative">
                {Array.isArray(tours) && tours.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                    {tours.map((tour) => (
                      <TourCard 
                        key={tour.id || tour._id}
                        id={tour.id || tour._id}
                        title={tour.title}
                        price={tour.price}
                        duration={tour.duration}
                        groupSize={tour.groupSize}
                        image={tour.heroImage || tour.image}
                        rating={tour.rating}
                        description={tour.description}
                      />
                    ))}
                  </div>
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
        <section id="reviews" className="relative pt-16 pb-16 px-4 bg-brand-yellow/5">
          {/* Soft Gradient Transition from White to Yellow */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-1">
              {/* Trustindex Badge (The small pill button) */}
              <div className="mb-1">
                <TrustindexBadge />
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-2">What Our Foodies Say</h2>
              <p className="text-brand-brown/60 max-w-2xl mx-auto text-sm md:text-base">
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
        <section id="about" className="py-6 px-4">
          <div className="max-w-7xl mx-auto bg-brand-dark text-white rounded-section p-6 md:p-10 relative overflow-hidden">
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
        <section className="py-6 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-display font-bold mb-2">Have Questions? Chat with Us!</h2>
            <p className="text-brand-brown/60 mb-6 text-lg">
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
