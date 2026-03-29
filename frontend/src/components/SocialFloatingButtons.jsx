import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Instagram, Music2 } from 'lucide-react';

const SocialButton = ({ icon: Icon, href, color, delay = 0 }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: 50 }}
      animate={{ 
        opacity: 1, 
        x: 0,
        y: [0, -10, 0],
      }}
      transition={{
        delay,
        y: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 0.5
        }
      }}
      whileHover={{ scale: 1.2, rotate: 10 }}
      className={`flex items-center justify-center w-14 h-14 rounded-full text-white shadow-xl ${color} transition-shadow hover:shadow-2xl`}
    >
      <Icon size={28} />
    </motion.a>
  );
};

export default function SocialFloatingButtons() {
  return (
    <div className="fixed bottom-8 md:bottom-28 right-8 z-40 flex flex-col gap-4 pointer-events-none">
      <div className="pointer-events-auto flex flex-col gap-4">
        <SocialButton 
          icon={MessageCircle} 
          href="https://wa.me/84858207201" 
          color="bg-green-500 shadow-green-500/30" 
          delay={0.1}
        />
        <SocialButton 
          icon={Instagram} 
          href="https://www.instagram.com/tntsaigon.foodtour/" 
          color="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 shadow-purple-500/30" 
          delay={0.2}
        />
        {/* <SocialButton 
          icon={Music2} 
          href="https://tiktok.com/@tasteandtalksaigon" 
          color="bg-black shadow-black/30" 
          delay={0.3}
        /> */}
      </div>
    </div>
  );
}
