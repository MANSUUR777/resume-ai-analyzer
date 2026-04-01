import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { api } from './utils/api';

import AnimatedTeddy from './components/AnimatedTeddy';
import UploadBox from './components/UploadBox';
import ScoreCircle from './components/ScoreCircle';
import SkillBadge from './components/SkillBadge';

export default function App() {
  const [appState, setAppState] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [results, setResults] = useState(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      setErrorMessage('File exceeds 1MB. The teddy cannot pull something that heavy!');
      setAppState('error');
      setTimeout(() => setAppState('idle'), 4000);
      return;
    }

    setAppState('analyzing');
    const formData = new FormData();
    formData.append('file', file);

    try {
      await new Promise(r => setTimeout(r, 1500));
      const response = await api.post('/analyze', formData);
      setResults(response.data);
      setAppState('results');
    } catch (err) {
      setErrorMessage(err.response?.data?.error || 'Failed to connect to server.');
      setAppState('error');
      setTimeout(() => setAppState('idle'), 4000);
    }
  };

  return (
    // FIX 1: Changed 'overflow-hidden' to 'overflow-x-hidden pb-20' so you can scroll down!
    <div className="min-h-screen bg-dark flex flex-col items-center py-10 overflow-x-hidden px-4 pb-20">
      
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-6 z-10">
        <h1 className="text-4xl font-bold tracking-tight mb-2 text-cream">Resume AI Analyzer</h1>
        <p className="text-neutral-400">Upload your PDF and let Teddy fetch your stack.</p>
      </motion.div>

      {/* Teddy Area */}
      <div className="z-20 flex justify-center w-full">
        <AnimatedTeddy state={appState} />
      </div>

      {/* FIX 2: Removed fixed 'h-96' and replaced with 'min-h-[400px]' so the box can grow */}
      <div className="w-full max-w-2xl flex justify-center z-10 relative min-h-[400px] mt-[-15px]">
        <AnimatePresence mode="wait">
          
          {appState === 'idle' && (
            <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: 20 }} className="w-full max-w-md absolute">
              <UploadBox onUpload={handleFileUpload} />
            </motion.div>
          )}

          {appState === 'analyzing' && (
            <motion.div key="loading" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center absolute">
              
              {/* Taut Thread */}
              <svg width="40" height="90" className="z-10 overflow-visible mb-2 mt-[-40px]">
                <motion.path 
                  animate={{ d: ["M 20 0 L 20 90", "M 20 0 L 18 90", "M 20 0 L 20 90"] }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                  fill="transparent" 
                  stroke="#fdfbf7" 
                  strokeWidth="3"
                  strokeDasharray="8 4" 
                />
              </svg>

              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} className="w-12 h-12 border-4 border-neutral-800 border-t-cream rounded-full mb-4" />
              <p className="text-lg font-medium text-cream">Extracting logic...</p>
            </motion.div>
          )}

          {appState === 'error' && (
            <motion.div key="error" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="w-full max-w-md bg-red-950/30 border border-red-900/50 p-6 rounded-2xl flex items-center space-x-4 absolute top-10">
              <AlertCircle className="w-8 h-8 text-red-500 shrink-0" />
              <p className="text-red-200">{errorMessage}</p>
            </motion.div>
          )}

          {appState === 'results' && results && (
            // FIX 3: Removed 'absolute' from this div so it naturally pushes the page down
            <motion.div key="results" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} className="w-full bg-card p-8 rounded-3xl border border-neutral-800 shadow-2xl mt-8">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-6 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-cream">Analysis Complete</h2>
                  <p className="text-neutral-400">Deterministic Match</p>
                </div>
                <ScoreCircle score={results.score} />
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="flex items-center text-lg font-medium text-green-400 mb-3">
                    <CheckCircle className="w-5 h-5 mr-2" /> Matched Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {results.matched.map(skill => <SkillBadge key={skill} skill={skill} type="match" />)}
                    {results.matched.length === 0 && <span className="text-neutral-500 text-sm">No core skills found.</span>}
                  </div>
                </div>

                <div>
                  <h3 className="flex items-center text-lg font-medium text-red-400 mb-3">
                    <XCircle className="w-5 h-5 mr-2" /> Missing Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {results.missing.map(skill => <SkillBadge key={skill} skill={skill} type="missing" />)}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setAppState('idle')}
                className="mt-8 w-full py-3 bg-cream text-dark rounded-xl font-bold hover:bg-neutral-200 transition-colors"
              >
                Analyze Another Resume
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}