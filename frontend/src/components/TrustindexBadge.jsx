import React, { useEffect, useRef } from 'react';

export default function TrustindexBadge() {
  const badgeRef = useRef(null);

  useEffect(() => {
    if (badgeRef.current) {
      // Clear container
      badgeRef.current.innerHTML = '';
      
      // Create script
      const script = document.createElement('script');
      script.src = 'https://cdn.trustindex.io/loader.js?10603f3686723426100636336c8';
      script.async = true;
      script.defer = true;
      
      // Append script
      badgeRef.current.appendChild(script);
    }
  }, []);

  return (
    <div ref={badgeRef} className="ti-badge-wrapper inline-flex items-center justify-center min-h-[40px]">
      {/* Placeholder while loading */}
      <div className="bg-white px-4 py-2 rounded-full shadow-sm flex items-center gap-2 border border-black/5 animate-pulse">
        <div className="w-4 h-4 bg-brand-yellow/20 rounded-full"></div>
        <div className="w-20 h-4 bg-brand-brown/10 rounded-md"></div>
      </div>
    </div>
  );
}
