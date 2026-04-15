// import React, { useEffect, useState } from 'react';
// import { useMapsLibrary } from '@vis.gl/react-google-maps';
// import { Star, User } from 'lucide-react';

// export default function GoogleReviews({ placeId }) {
//   const placesLib = useMapsLibrary('places');
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const mockReviews = [
//     {
//       authorAttribution: { displayName: "Sarah Jenkins", photoURI: "https://picsum.photos/seed/user1/100/100" },
//       rating: 5,
//       text: "This was the highlight of our trip to Vietnam! The food was incredible and our guide was so knowledgeable and friendly.",
//       relativePublishTimeDescription: "2 weeks ago"
//     },
//     {
//       authorAttribution: { displayName: "Marco Rossi", photoURI: "https://picsum.photos/seed/user2/100/100" },
//       rating: 5,
//       text: "Amazing experience. We went to places we never would have found on our own. Highly recommend the night tour!",
//       relativePublishTimeDescription: "1 month ago"
//     },
//     {
//       authorAttribution: { displayName: "Emily Chen", photoURI: "https://picsum.photos/seed/user3/100/100" },
//       rating: 4,
//       text: "Great food and great company. A bit spicy for me but they were very accommodating. Must try!",
//       relativePublishTimeDescription: "3 days ago"
//     }
//   ];

//   useEffect(() => {
//     if (!placesLib || !placeId) {
//       setLoading(false);
//       return;
//     }

//     const fetchReviews = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const place = new placesLib.Place({ id: placeId });
//         await place.fetchFields({ fields: ['reviews', 'rating', 'userRatingCount', 'displayName'] });
        
//         if (place.reviews && place.reviews.length > 0) {
//           setReviews(place.reviews);
//         } else {
//           setError('Google Maps không tìm thấy đánh giá nào cho địa điểm này.');
//         }
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching Google Reviews:', err);
//         const errorMessage = err?.message || JSON.stringify(err);
//         setError(`Lỗi kết nối Google Maps: ${errorMessage}`);
//         setLoading(false);
//       }
//     };

//     fetchReviews();
//   }, [placesLib, placeId]);

//   if (loading) return <div className="py-12 text-center text-brand-brown/40 italic">Loading reviews from Google Maps...</div>;
//   if (error) return <div className="py-12 text-center text-red-400 text-sm">{error}</div>;
//   if (reviews.length === 0) return <div className="py-12 text-center text-brand-brown/40">No reviews found for this location.</div>;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//       {reviews.map((review, index) => (
//         <div 
//           key={index} 
//           className="bg-white border border-black/5 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col h-full"
//         >
//           <div className="flex items-center gap-3 mb-4">
//             <div className="relative">
//               {review.authorAttribution?.photoURI ? (
//                 <img 
//                   src={review.authorAttribution.photoURI} 
//                   alt={review.authorAttribution.displayName} 
//                   className="w-12 h-12 rounded-full object-cover border-2 border-brand-yellow/20"
//                   referrerPolicy="no-referrer"
//                 />
//               ) : (
//                 <div className="w-12 h-12 rounded-full bg-brand-yellow/10 flex items-center justify-center text-brand-brown border-2 border-brand-yellow/20">
//                   <User size={24} />
//                 </div>
//               )}
//               <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm border border-black/5">
//                 <img src="https://www.google.com/favicon.ico" alt="Google" className="w-3 h-3" />
//               </div>
//             </div>
//             <div>
//               <p className="font-bold text-brand-brown leading-tight">{review.authorAttribution?.displayName || 'Google User'}</p>
//               <div className="flex items-center gap-0.5 mt-1">
//                 {[...Array(5)].map((_, i) => (
//                   <Star 
//                     key={i} 
//                     size={14} 
//                     className={i < review.rating ? "fill-brand-yellow text-brand-yellow" : "text-gray-200"} 
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
          
//           <div className="flex-grow">
//             <p className="text-brand-brown/80 text-sm leading-relaxed line-clamp-4">
//               "{review.text}"
//             </p>
//           </div>

//           <div className="mt-4 pt-4 border-t border-black/5 flex items-center justify-between">
//             <span className="text-[10px] text-brand-brown/40 font-bold uppercase tracking-wider">
//               {review.relativePublishTimeDescription}
//             </span>
//             <span className="text-[10px] text-brand-brown/30 font-medium">
//               Verified Review
//             </span>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }










// import React, { useEffect, useRef } from 'react';

// export default function GoogleReviews() {
//   const widgetRef = useRef(null);

//   useEffect(() => {
//     // Clear the container first to avoid duplicates
//     if (widgetRef.current) {
//       widgetRef.current.innerHTML = '';
      
//       // Create the script element
//       const script = document.createElement('script');
//       script.src = 'https://cdn.trustindex.io/loader.js?b9db11668d05341ddf567f27e9e';
//       script.async = true;
//       script.defer = true;
      
//       // Append the script directly into the widget container
//       widgetRef.current.appendChild(script);
//     }
//   }, []);

//   return (
//     <div className="pb-8">
//       {/* Trustindex Widget Container */}
//       {/* We use a ref to target this specific div and inject the script inside it */}
//       <div 
//         ref={widgetRef}
//         className="ti-widget min-h-[400px] flex items-center justify-center bg-white/50 rounded-3xl border border-black/5 overflow-hidden"
//       >
//         <div className="text-center py-20">
//           <div className="animate-pulse flex flex-col items-center">
//             <div className="w-12 h-12 bg-brand-yellow/20 rounded-full mb-4"></div>
//             <p className="text-brand-brown/40 font-bold italic">Kết nối với Trustindex...</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Star, ChevronLeft, ChevronRight, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const AVATAR_COLORS = [
  'bg-[#4285F4]', // Google Blue
  'bg-[#EA4335]', // Google Red
  'bg-[#FBBC05]', // Google Yellow
  'bg-[#34A853]', // Google Green
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-teal-500'
];

const getAvatarColor = (name) => {
  const charCode = name.charCodeAt(0);
  return AVATAR_COLORS[charCode % AVATAR_COLORS.length];
};

const REVIEWS = [
  { id: 18, author: "Elisa Kaganer", rating: 5, text: "We had the best time with Dan and Hillary on their food tour. Delicious food and an opportunity to see many different parts of Saigon with the company of two great guides. Their English is excellent and they are both very friendly and helpful - even assisting me to book a bus ticket for travel the following day. I’d definitely recommend this tour!!!", date: "1 days ago" },
  { id: 14, author: "עדי ג'ובני", rating: 5, text: "Great experience! 😊 The food tour was very interesting and delicious, everything was perfectly organized. Very worth it — thank you for a wonderful night!", date: "4 days ago" },
  { 
    id: 1, 
    author: "Ashley Hadfield", 
    rating: 5, 
    text: "I cannot speak more fondly of my experience with Hillary & Dan. The food tour felt more like a trip out to the city with a few friends. We were laughing the entire time while trying local delicacies! You must try it!", 
    date: "5 days ago",
    image: "https://res.cloudinary.com/dk9kyhox7/image/upload/v1775923884/e215a0dc-ebff-4f87-99b1-dfff531744ee.png"
  },
  { id: 2, author: "shani schneider", rating: 5, text: "Dan's tour is a high-quality tour with wonderful guides. They took us by motorbike to the most authentic and delicious spots in Ho Chi Minh City. We felt safe the whole time and the food was just incredible. A must-do!", date: "1 week ago" },
  { id: 3, author: "Tamar Kupiec", rating: 5, text: "10/10!! I had an absolutely amazing time!! Thank you!! The guides were so friendly and the food was the best I've had in Vietnam.", date: "1 week ago" },
  { id: 4, author: "Hadar Avital", rating: 5, text: "Perfectly sweet experience. Everything from the pickup to the drop-off was seamless. The food was delicious and the stories shared were very touching.", date: "1 week ago" },
  { id: 5, author: "Lynn Greil", rating: 5, text: "The tour was amazing! One of my most memorable memories in Saigon. Everyone was so friendly and the food was superb (10/10). I loved seeing the city from the back of a motorbike.", date: "1 week ago"},
  { id: 6, author: "ליאורה קפלן", rating: 5, text: "We really loved Dan's tour ❤️ They took us to small and special places in Saigon, where we enjoyed super delicious food and they explained everything so well. It felt like hanging out with friends.", date: "1 week ago" },
  { id: 7, author: "ido cohen", rating: 5, text: "One of the best experiences I've ever had on my trip to Saigon. Nancy, Hillary, and Dan were amazing and very funny. The food was delicious and authentic. Don't miss this!", date: "1 week ago" },
  { id: 8, author: "Tai Suliman", rating: 5, text: "The trip was really fun, everything was explained thoroughly. The food was delicious and the tour was very interesting. The drivers were all funny and kind. 1000/10 🫶", date: "1 week ago" },
  { id: 9, author: "דורם טל", rating: 5, text: "He took me on a private tour, the food was delicious and he was so charming. He even picked me up and dropped me off. Very reasonable price! Highly recommend Dan.", date: "1 week ago" },
  { id: 10, author: "Shira Eldar", rating: 5, text: "We took a tour with Dan and it was wonderful, the food was delicious and the ride with Dan and the other drivers was so much fun!! We learned so much about the local culture.", date: "1 week ago" },
  { id: 11, author: "Nora Truffer", rating: 5, text: "The best experience in Saigon! I loved tasting Vietnamese food at local spots. Dan and the whole team were so friendly and funny. Highly recommend to everyone!", date: "1 week ago" },
  { id: 12, author: "Thompson", rating: 5, text: "BEST FOOD TOUR IN HCMC. Dan and his team not only know the best food spots but are also great to be with. I discovered new dishes and restaurants I would never have found on my own.", date: "1 week ago" },
  { id: 13, author: "clara", rating: 5, text: "The food was amazing! Very local, delicious. Dan, Hillary, Anna, and Nancy were so sweet and even taught us some Vietnamese. Very funny and informative!", date: "1 week ago" },
  { id: 15, author: "Adi Medalia", rating: 5, text: "We took 2 tours through Dan. Motorcycle tours. In a sentence? It was simply stunning! First tour, a food tour that went through the alleys and markets and was simply delicious, local! Interesting, accompanied by explanations and history and really excellent. Second tour - an urban tour. A tour that gave a real experience of Saigon. On the way on a scooter or in a restaurant, we ate and talked about the culture and life and discovered that Dan and the guides with him simply love life and understand the human soul. Simply an experience and highly recommended. We will definitely come back for more next time.", date: "2 weeks ago",image: "https://res.cloudinary.com/dk9kyhox7/image/upload/v1775924513/b8b0c7a4-94fa-48b9-9416-5056061181bd.png" },
  { id: 16, author: "Anna S", rating: 5, text: "Eines meiner Highlights in Ho-Chi-Minh!! Das Essen war fantastisch und alle waren soo nett. Die Fahrten waren sehr sicher. Alles in allem ein super Erlebnis für jeden!", date: "3 weeks ago",image:"https://res.cloudinary.com/dk9kyhox7/image/upload/v1775924705/583ddd59-7294-4953-835c-e2072a4aae56.png" },
  { id: 17, author: "aya", rating: 5, text: "Greatest way to start a trip in Vietnam!We had an absolutely incredible tour, from start to finish Dan and Hillary were awesome - professional, friendly and giving us princess treatment.They easily accommodated our specific dietary restrictions (vegetarian and vegan), making the experience easy and stress free.Highly recommend!!!Dan came with Hillary and they were both absolutely awesome.They accommodated our dietary needs (vegan) easily, throughout the tour we were given a princess treatment it was delightful.", date: "3 weeks ago",image:"https://res.cloudinary.com/dk9kyhox7/image/upload/v1775924992/b9effdcc-4e60-4e76-ab80-5acb37de2754.png" }
];

function ReviewModal({ review, onClose }) {
  if (!review) return null;

  return createPortal(
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white w-full max-w-2xl max-h-[85vh] rounded-[2rem] md:rounded-[2.5rem] overflow-y-auto shadow-2xl relative"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 md:right-6 md:top-6 p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors z-20"
        >
          <X size={20} className="md:w-6 md:h-6" />
        </button>

        <div className="p-6 md:p-12">
          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center font-bold text-white text-xl md:text-2xl shadow-sm flex-shrink-0 ${getAvatarColor(review.author)}`}>
              {review.author[0].toUpperCase()}
            </div>
            <div>
              <h3 className="font-bold text-xl md:text-2xl text-[#1a73e8] leading-tight">{review.author}</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex text-[#fbbc04]">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} className="md:w-5 md:h-5" fill="currentColor" stroke="none" />)}
                </div>
                <img 
                  src="https://www.svgrepo.com/show/355037/google.svg" 
                  alt="Google" 
                  className="w-4 h-4 md:w-5 md:h-5"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {review.image && (
              <div className="w-full md:w-48 h-48 md:h-48 flex-shrink-0">
                <img 
                  src={review.image} 
                  alt="Review" 
                  className="w-full h-full object-cover rounded-2xl md:rounded-3xl shadow-md"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
            <div className="flex-1">
              <p className="text-brand-brown text-base md:text-lg leading-relaxed whitespace-pre-wrap">
                {review.text}
              </p>
              <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-black/5 flex justify-between items-center">
                <span className="text-gray-400 text-sm font-medium">{review.date}</span>
                <span className="text-[#1a73e8] font-bold text-xs md:text-sm">Verified Review</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

function DesktopCard({ review, onReadFull }) {
  return (
    <motion.div
      whileHover={{ y: -6, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
      className="bg-white p-6 lg:p-8 rounded-[2rem] shadow-sm border border-black/5 hover:border-brand-orange/20 transition-all flex flex-col h-full min-h-[280px]"
    >
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-white text-xl flex-shrink-0 shadow-sm ${getAvatarColor(review.author)}`}>
            {review.author[0].toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="font-bold text-[#1a73e8] text-xl leading-tight truncate">{review.author}</div>
            <div className="flex items-center gap-1 mt-1.5">
              <div className="flex text-[#fbbc04]">
                {[...Array(review.rating)].map((_, i) => <Star key={i} size={18} fill="currentColor" stroke="none" />)}
              </div>
            </div>
          </div>
        </div>
        <img 
          src="https://www.svgrepo.com/show/355037/google.svg" 
          alt="Google" 
          className="w-6 h-6"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="flex gap-5 items-start flex-1">
        {review.image && (
          <div className="w-24 h-24 flex-shrink-0">
            <img 
              src={review.image} 
              alt="Review" 
              className="w-full h-full object-cover rounded-2xl shadow-sm"
              referrerPolicy="no-referrer"
            />
          </div>
        )}
        <div className="flex-1">
          <p className="text-brand-brown/90 text-base md:text-[17px] leading-relaxed line-clamp-6">
            {review.text}
          </p>
          <button 
            onClick={() => onReadFull(review)}
            className="text-[#1a73e8] font-bold text-base mt-3 hover:underline block"
          >
            Read more
          </button>
        </div>
      </div>

      <div className="flex justify-end mt-6 pt-4 border-t border-black/5">
        <span className="text-sm text-gray-400 font-medium">{review.date}</span>
      </div>
    </motion.div>
  );
}

function MobileCard({ review, onReadFull }) {
  return (
    <div className="w-full bg-white rounded-[2rem] border border-black/5 shadow-sm p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg flex-shrink-0 ${getAvatarColor(review.author)}`}>
            {review.author[0].toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="font-bold text-[#1a73e8] text-lg truncate">{review.author}</div>
            <div className="flex items-center gap-1 mt-0.5">
              <div className="flex text-[#fbbc04]">
                {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" stroke="none" />)}
              </div>
            </div>
          </div>
        </div>
        <img 
          src="https://www.svgrepo.com/show/355037/google.svg" 
          alt="Google" 
          className="w-5 h-5"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="flex gap-4 items-start">
        {review.image && (
          <div className="w-24 h-24 flex-shrink-0">
            <img 
              src={review.image} 
              alt="Review" 
              className="w-full h-full object-cover rounded-2xl shadow-sm"
              referrerPolicy="no-referrer"
            />
          </div>
        )}
        <div className="flex-1">
          <p className="text-brand-brown/90 text-[15px] leading-relaxed line-clamp-3">
            {review.text}
          </p>
          <button 
            onClick={() => onReadFull(review)}
            className="text-[#1a73e8] font-bold text-sm mt-2 hover:underline block"
          >
            Read more
          </button>
        </div>
      </div>

      <div className="flex justify-end pt-3 border-t border-black/5">
        <span className="text-xs text-gray-400 font-medium">{review.date}</span>
      </div>
    </div>
  );
}

export default function GoogleReviews() {
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    if (selectedReview) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [selectedReview]);

  return (
    <div className="pt-4 md:pt-10 pb-4 px-4 md:px-6 overflow-hidden">
      <div className="w-full">

        {/* DESKTOP & MOBILE (Unified Expandable Grid) */}
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {REVIEWS.slice(0, visibleCount).map(r => (
              <div key={r.id} className="hidden md:block">
                <DesktopCard review={r} onReadFull={setSelectedReview} />
              </div>
            ))}
            {REVIEWS.slice(0, visibleCount).map(r => (
              <div key={r.id} className="md:hidden">
                <MobileCard review={r} onReadFull={setSelectedReview} />
              </div>
            ))}
          </div>
          
          {visibleCount < Math.min(REVIEWS.length, 17) && (
            <div className="flex justify-center mt-4">
              <button 
                onClick={() => setVisibleCount(prev => Math.min(prev + 3, 17))}
                className="flex items-center justify-center gap-2 text-[#1a73e8] font-bold text-lg py-2 hover:underline transition-all group"
              >
                Read more reviews 
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {selectedReview && (
          <ReviewModal 
            review={selectedReview} 
            onClose={() => setSelectedReview(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

