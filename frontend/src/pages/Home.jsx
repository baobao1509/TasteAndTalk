import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import Hero from '../components/Hero';
import TourCard from '../components/TourCard';
import GoogleReviews from '../components/GoogleReviews';
import { Phone, Instagram, Facebook, Youtube, MapPin, Mail, Star, Play } from 'lucide-react';

export default function Home() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [aboutImageIndex, setAboutImageIndex] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const ABOUT_TEAM_IMAGES = [
    "https://res.cloudinary.com/dk9kyhox7/image/upload/v1775660537/f50bc47b-c8a4-47c8-a9b7-fb11cb93ef85.png",
    "https://res.cloudinary.com/dk9kyhox7/image/upload/v1775660520/114d660e-471d-4954-8332-26777eaf50ec.png",
    "https://res.cloudinary.com/dk9kyhox7/image/upload/v1775660549/44b90aab-1d42-445c-9796-1cc289b2b8dc.png",
    "https://res.cloudinary.com/dk9kyhox7/image/upload/v1775660570/704e81e0-1c66-4e10-ac2c-a4e1cd4950b0.png",
    "https://res.cloudinary.com/dk9kyhox7/image/upload/v1775660589/e8697b2a-baa4-40cf-999c-aaa46f5253dd.png"
  ];

  const ABOUT_FOOD_IMAGES = [
    "https://res.cloudinary.com/dk9kyhox7/image/upload/v1775660832/1f699f24-6046-43a8-8c3c-b3f4761f4c75.png",
    "https://res.cloudinary.com/dk9kyhox7/image/upload/v1775660838/ce25cff2-ad74-4ac2-b2ce-fbe08c4fb731.png",
    "https://res.cloudinary.com/dk9kyhox7/image/upload/v1775661848/a2249f2b-3e2e-45fa-8045-c726781152db.png",
    "https://res.cloudinary.com/dk9kyhox7/image/upload/v1775660763/4dbc6654-1596-41b6-b03d-6501d69a63f4.png",
    "https://res.cloudinary.com/dk9kyhox7/image/upload/v1775660770/b4e7d912-4f9d-4ab5-aeb2-d2418f24af3f.png"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setAboutImageIndex((prev) => (prev + 1) % 5);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchTours = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const response = await fetch(`${apiUrl}/api/tours`, { signal: controller.signal });
        const data = await response.json();
        
        // Sort tours: Signature first, then Plant-based, then others
        const sortedTours = Array.isArray(data) ? [...data].sort((a, b) => {
          const order = ['signature', 'plant-based', 'tailor-made', 'custom'];
          const getOrderIndex = (title) => {
            if (!title) return 99;
            const lowerTitle = title.toLowerCase();
            const index = order.findIndex(keyword => lowerTitle.includes(keyword));
            return index === -1 ? 90 : index; // 90 for other tours, 99 for unknown
          };
          return getOrderIndex(a.title) - getOrderIndex(b.title);
        }) : [];

        setTours(sortedTours);
      } catch (error) {
        console.error("Error fetching tours:", error);
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
        <title>Taste&Talk Saigon | Authentic Street Food Tours in Ho Chi Minh City</title>
        <meta name="description" content="Experience the best street food in Saigon with local guides. Join Taste&Talk Saigon for authentic culinary adventures, hidden gems, and real stories of Vietnam." />
        <meta name="keywords" content="saigon street food tour, ho chi minh city food tour, authentic vietnamese food, local foodie friends, tasteandtalk saigon" />
        <link rel="canonical" href="https://tntsaigonfoodtour.com" />
        
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Taste&Talk Saigon",
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
                <span className="text-brand-orange font-black tracking-[0.2em] text-2xl md:text-3xl">
                  The Taste&Talk experience
                </span>
              </div>
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
                        isCustom={tour.isCustom}
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
        <section id="reviews" className="relative pt-12 md:pt-20 pb-12 md:pb-20 px-4 bg-brand-yellow/5">
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
          
          <div className="w-full relative z-10">
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
                href="https://www.google.com/maps/search/?api=1&query=Taste+and+Talk+Saigon+Food+Tour" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-brand-orange font-bold hover:underline text-sm md:text-base"
              >
                View all reviews on Google Maps
              </a>
            </div>
          </div>
        </section>

        {/* About / Who We Are Section */}
        <section id="about" className="py-6 px-4">
          <div className="max-w-screen-2xl mx-auto bg-brand-dark text-white rounded-section p-4 sm:p-6 md:p-12 lg:p-16 relative overflow-hidden">
            <div className="relative z-10">
              <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-24 items-start">
                <div>
                  <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">
                    The Story behind <span className="text-brand-yellow">Taste&Talk</span>
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="text-white/80 text-lg leading-relaxed">
                      <h3 className="text-brand-yellow font-bold text-xl mb-3">A Collective of Youth and Passion</h3>
                      <p>
                        Taste&Talk is a vibrant collective of dreamers, foodies, and urban explorers aged 20 to 25. Our team is a colorful tapestry of backgrounds: some of us are "Saigon originals," born and raised amidst the echoes of the city’s hidden alleys, while others arrived here for study and work, eventually falling head-over-heels for the city’s chaotic charm. Despite our different origins, we share a single, rhythmic heartbeat—an absolute obsession with Saigon’s local life and its culinary treasures.
                      </p>
                    </div>

                    {isAboutExpanded && (
                      <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="text-white/80 text-lg leading-relaxed space-y-4">
                          <h3 className="text-brand-yellow font-bold text-xl">The Evolution: From the Driver’s Seat to Leading the Way</h3>
                          <p>
                            The name Taste & Talk wasn’t born in a boardroom; it was born on the back of motorbikes and over steaming bowls of street noodles. Three years ago, we started at the very beginning—not as business owners, but as local drivers working for tour companies. We spent countless nights navigating the city's chaotic traffic, learning every hidden shortcut, and ensuring the safety of every guest behind our backs.
                          </p>
                          <p>
                            Through those thousands of kilometers, we didn't just drive; we listened. We moved from being drivers to lead guides, and finally, to creating our own vision. We saw what travelers truly craved: not just a ride, but a genuine connection. Over the last 3 years, we have had the incredible privilege of hosting over 3,000 travelers from every corner of the globe. Today, we take that accumulated expertise—from the grit of the streets to the leadership of a team—to offer you something far more than a standard tour.
                          </p>
                        </div>

                        <div className="text-white/80 text-lg leading-relaxed space-y-4">
                          <h3 className="text-brand-yellow font-bold text-xl">Our Philosophy: The Magic of Connection</h3>
                          <p>
                            At Taste & Talk, we believe that food tastes better when it’s seasoned with laughter and authentic conversation. To us, this has never been just about the food. It’s about the "Real Saigon"—the one you won't find in glossy brochures.
                          </p>
                          <ul className="space-y-4 pl-4 border-l-2 border-brand-yellow/30">
                            <li>
                              <strong className="text-white">The Authentic Taste:</strong> We lead you to the spots where we eat every day—places where the flavors are bold, raw, and haven't been "watered down" for tourists.
                            </li>
                            <li>
                              <strong className="text-white">The Meaningful Talk:</strong> We believe every dish has a history and every street vendor has a soul. We share the untold stories behind the recipes and the genuine lives of the people who make this city breathe.
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}

                    {!isAboutExpanded && (
                      <button 
                        onClick={() => setIsAboutExpanded(true)}
                        className="text-brand-yellow font-bold hover:underline flex items-center gap-2 text-lg group"
                      >
                        Read our full story
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className={`space-y-8 ${!isAboutExpanded ? 'lg:sticky lg:top-24' : ''}`}>
                  <div className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-8">
                    {/* Vertical Video Container */}
                    <div className="aspect-[3/4] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden bg-black relative group shadow-2xl border-2 sm:border-4 border-white/5">
                      {!isPlayingVideo ? (
                        <div 
                          className="w-full h-full cursor-pointer relative"
                          onClick={() => setIsPlayingVideo(true)}
                        >
                          <img 
                            src="https://img.youtube.com/vi/QRTJMS20KIk/maxresdefault.jpg" 
                            alt="Saigon Food Tour Video" 
                            className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" 
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-brand-orange text-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                              <Play size={24} sm:size={28} fill="currentColor" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <iframe
                          className="w-full h-full"
                          src="https://www.youtube.com/embed/QRTJMS20KIk?autoplay=1&rel=0"
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        ></iframe>
                      )}
                    </div>

                    {/* Stacked Images Container */}
                    <div className="flex flex-col gap-3 sm:gap-6 md:gap-8">
                      <div className="flex-1 relative group rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-xl">
                        <AnimatePresence mode="wait">
                          <motion.img 
                            key={aboutImageIndex}
                            src={ABOUT_TEAM_IMAGES[aboutImageIndex]} 
                            alt="Team" 
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 1 }}
                            className="absolute inset-0 w-full h-full object-cover" 
                            referrerPolicy="no-referrer"
                          />
                        </AnimatePresence>
                        <div className="absolute inset-0 rounded-[1.5rem] sm:rounded-[2rem] border-2 border-brand-yellow/20 pointer-events-none"></div>
                      </div>
                      <div className="flex-1 relative group rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-xl">
                        <AnimatePresence mode="wait">
                          <motion.img 
                            key={aboutImageIndex}
                            src={ABOUT_FOOD_IMAGES[aboutImageIndex]} 
                            alt="Food" 
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 1 }}
                            className="absolute inset-0 w-full h-full object-cover" 
                            referrerPolicy="no-referrer"
                          />
                        </AnimatePresence>
                        <div className="absolute inset-0 rounded-[1.5rem] sm:rounded-[2rem] border-2 border-brand-orange/20 pointer-events-none"></div>
                      </div>
                    </div>
                  </div>

                  {isAboutExpanded && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500 pt-8 border-t border-white/10">
                      <div className="text-white/80 text-lg leading-relaxed space-y-4">
                        <h3 className="text-brand-yellow font-bold text-xl">Young, Wild, and Full of Flavor</h3>
                        <p>
                          When you ride with Taste & Talk, you are joining a group of friends who are bursting with energy and a love for life. We bring the high-octane spirit of a 20-something Saigonese to every corner we turn. Our energy is contagious, our smiles are genuine, and our mission is to make sure you feel the vibrant "vibe" of our generation—the one that respects tradition but passionately embraces the future.
                        </p>
                      </div>

                      <div className="text-white/80 text-lg leading-relaxed space-y-4">
                        <h3 className="text-brand-yellow font-bold text-xl">Not Just a Tour, but a Peer-to-Peer Friendship</h3>
                        <p>
                          We don’t want to be "guides and guests." We want to be your local friends. We talk about life, we share our perspectives, and we experience the city’s pulse together as equals. Whether we are sitting on tiny plastic stools in a rain-soaked alley or clinking beer glasses by the canal, the goal is always the same: to Taste the best of Saigon and Talk about the things that matter.
                        </p>
                      </div>

                      <button 
                        onClick={() => setIsAboutExpanded(false)}
                        className="text-brand-yellow font-bold hover:underline flex items-center gap-2 text-lg"
                      >
                        Show less
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-orange/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-yellow/5 blur-[120px] rounded-full"></div>
          </div>
        </section>
      </main>
    </div>
  );
}
