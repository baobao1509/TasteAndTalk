import React, { useEffect, useState } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { Star, User } from 'lucide-react';

export default function GoogleReviews({ placeId }) {
  const placesLib = useMapsLibrary('places');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mockReviews = [
    {
      authorAttribution: { displayName: "Sarah Jenkins", photoURI: "https://picsum.photos/seed/user1/100/100" },
      rating: 5,
      text: "This was the highlight of our trip to Vietnam! The food was incredible and our guide was so knowledgeable and friendly.",
      relativePublishTimeDescription: "2 weeks ago"
    },
    {
      authorAttribution: { displayName: "Marco Rossi", photoURI: "https://picsum.photos/seed/user2/100/100" },
      rating: 5,
      text: "Amazing experience. We went to places we never would have found on our own. Highly recommend the night tour!",
      relativePublishTimeDescription: "1 month ago"
    },
    {
      authorAttribution: { displayName: "Emily Chen", photoURI: "https://picsum.photos/seed/user3/100/100" },
      rating: 4,
      text: "Great food and great company. A bit spicy for me but they were very accommodating. Must try!",
      relativePublishTimeDescription: "3 days ago"
    }
  ];

  useEffect(() => {
    if (!placesLib || !placeId) {
      setLoading(false);
      return;
    }

    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        const place = new placesLib.Place({ id: placeId });
        await place.fetchFields({ fields: ['reviews', 'rating', 'userRatingCount', 'displayName'] });
        
        if (place.reviews && place.reviews.length > 0) {
          setReviews(place.reviews);
        } else {
          setError('Google Maps không tìm thấy đánh giá nào cho địa điểm này.');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching Google Reviews:', err);
        const errorMessage = err?.message || JSON.stringify(err);
        setError(`Lỗi kết nối Google Maps: ${errorMessage}`);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [placesLib, placeId]);

  if (loading) return <div className="py-12 text-center text-brand-brown/40 italic">Loading reviews from Google Maps...</div>;
  if (error) return <div className="py-12 text-center text-red-400 text-sm">{error}</div>;
  if (reviews.length === 0) return <div className="py-12 text-center text-brand-brown/40">No reviews found for this location.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {reviews.map((review, index) => (
        <div 
          key={index} 
          className="bg-white border border-black/5 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col h-full"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              {review.authorAttribution?.photoURI ? (
                <img 
                  src={review.authorAttribution.photoURI} 
                  alt={review.authorAttribution.displayName} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-brand-yellow/20"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-brand-yellow/10 flex items-center justify-center text-brand-brown border-2 border-brand-yellow/20">
                  <User size={24} />
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm border border-black/5">
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-3 h-3" />
              </div>
            </div>
            <div>
              <p className="font-bold text-brand-brown leading-tight">{review.authorAttribution?.displayName || 'Google User'}</p>
              <div className="flex items-center gap-0.5 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    className={i < review.rating ? "fill-brand-yellow text-brand-yellow" : "text-gray-200"} 
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex-grow">
            <p className="text-brand-brown/80 text-sm leading-relaxed line-clamp-4">
              "{review.text}"
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-black/5 flex items-center justify-between">
            <span className="text-[10px] text-brand-brown/40 font-bold uppercase tracking-wider">
              {review.relativePublishTimeDescription}
            </span>
            <span className="text-[10px] text-brand-brown/30 font-medium">
              Verified Review
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
