import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedTeddy({ state }) {
  // Blinking eyes
  const blinkAnimation = {
    scaleY: [1, 0.1, 1],
    transition: { duration: 0.2, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }
  };

  // The short, wavy tail of thread flying in the wind
  const waveAnimation = {
    d: [
      "M 100 150 Q 115 165 100 180 T 110 200",
      "M 100 150 Q 85 165 100 180 T 90 200",
      "M 100 150 Q 115 165 100 180 T 110 200"
    ],
    transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
  };

  const teddyVariants = {
    hidden: { x: -500, rotate: -20, opacity: 0 },
    idle: { 
      x: 0, 
      y: [0, -15, 0],
      rotate: [-3, 3, -3], 
      opacity: 1,
      transition: {
        y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
        rotate: { repeat: Infinity, duration: 5, ease: "easeInOut" }
      }
    },
    analyzing: {
      x: 0,
      y: [0, -20, 0],
      opacity: 1,
      transition: { y: { repeat: Infinity, duration: 0.6, ease: "easeInOut" } }
    },
    results: {
      x: -250, 
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 60, damping: 15 }
    }
  };

  return (
    <motion.div 
      variants={teddyVariants}
      initial="hidden"
      animate={state === 'error' ? 'idle' : state}
      className="relative w-48 h-48 flex flex-col items-center justify-center z-30"
    >
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl overflow-visible">
        {/* Ears */}
        <circle cx="50" cy="50" r="25" fill="#8B4513" />
        <circle cx="150" cy="50" r="25" fill="#8B4513" />
        <circle cx="50" cy="50" r="12" fill="#D2B48C" />
        <circle cx="150" cy="50" r="12" fill="#D2B48C" />
        
        {/* Head */}
        <circle cx="100" cy="90" r="60" fill="#A0522D" />
        
        {/* Snout */}
        <circle cx="100" cy="110" r="25" fill="#D2B48C" />
        <ellipse cx="100" cy="100" rx="8" ry="5" fill="#3E2723" /> 
        
        {/* Smile */}
        <path d="M 85 115 Q 100 130 115 115" stroke="#3E2723" strokeWidth="3" fill="transparent" strokeLinecap="round" />

        {/* Eyes (Animated) */}
        <motion.ellipse animate={blinkAnimation} cx="75" cy="80" rx="6" ry="8" fill="#1A1A1A" />
        <motion.ellipse animate={blinkAnimation} cx="125" cy="80" rx="6" ry="8" fill="#1A1A1A" />

        {/* Paws */}
        <circle cx="65" cy="150" r="18" fill="#8B4513" />
        <circle cx="135" cy="150" r="18" fill="#8B4513" />

        {/* --- The Tied String & Wavy Tail (Under the chin) --- */}
        {/* String wrapping under chin */}
        <path d="M 80 145 Q 100 155 120 145" fill="transparent" stroke="#fdfbf7" strokeWidth="3" strokeLinecap="round" />
        {/* The Knot */}
        <circle cx="100" cy="150" r="4" fill="#fdfbf7" />
        {/* The Flying Tail */}
        <motion.path 
          animate={waveAnimation}
          fill="transparent" 
          stroke="#fdfbf7" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
        />
      </svg>
    </motion.div>
  );
}