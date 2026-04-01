import React, { useRef } from 'react';
import { UploadCloud } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UploadBox({ onUpload }) {
  const fileInputRef = useRef(null);

  return (
    <motion.div 
      animate={{ y: [0, -15, 0] }} 
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      className="flex flex-col items-center w-full max-w-md z-10 relative"
    >
      {/* The Cream Thread */}
      <svg width="40" height="90" className="z-10 overflow-visible mt-[-40px]">
        <path 
          d="M 20 0 Q 35 45 20 90" 
          fill="transparent" 
          stroke="#fdfbf7" 
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      {/* The Knot at the box */}
      <div className="relative z-20 flex flex-col items-center -mt-2 mb-[-10px]">
        <div className="w-4 h-4 bg-[#fdfbf7] rounded-full shadow-md border border-neutral-300"></div>
        <div className="absolute top-2 w-6 flex justify-between">
          <div className="w-1.5 h-3 bg-[#fdfbf7] rotate-[30deg] rounded-full origin-top"></div>
          <div className="w-1.5 h-3 bg-[#fdfbf7] -rotate-[30deg] rounded-full origin-top"></div>
        </div>
      </div>

      {/* The Upload Box */}
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="w-full bg-card border border-neutral-700/50 rounded-[2rem] p-10 flex flex-col items-center justify-center cursor-pointer hover:border-cream/50 transition-colors shadow-2xl relative z-10 overflow-hidden group mt-2"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-dark rounded-full border border-neutral-700/50 shadow-inner"></div>

        <input 
          type="file" 
          accept=".pdf" 
          className="hidden" 
          ref={fileInputRef}
          onChange={onUpload}
        />
        
        <div className="bg-dark p-5 rounded-full mb-4 group-hover:scale-110 group-hover:bg-cream transition-all duration-300">
          <UploadCloud className="w-10 h-10 text-cream group-hover:text-dark transition-colors" />
        </div>
        
        <p className="font-bold text-xl text-cream mb-1">Drop your resume here</p>
        <p className="text-sm text-neutral-400">PDF only, up to 1MB</p>
      </div>
    </motion.div>
  );
}