import React from 'react';
import { motion } from 'framer-motion';

export default function ScoreCircle({ score }) {
  const circumference = 251;
  const strokeDashoffset = circumference - (circumference * score) / 100;

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90">
        <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-neutral-800" />
        <motion.circle 
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" 
          strokeDasharray={circumference}
          className="text-cream" 
        />
      </svg>
      <span className="absolute text-xl font-bold text-cream">{score}%</span>
    </div>
  );
}