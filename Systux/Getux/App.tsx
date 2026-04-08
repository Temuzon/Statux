import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { ModulePage } from './components/ModulePage';
import { Module } from './constants';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  return (
    <div className="bg-bg-pure min-h-screen selection:bg-accent-primary selection:text-bg-pure">
      <AnimatePresence mode="wait">
        {!selectedModule ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <LandingPage onSelectModule={setSelectedModule} />
          </motion.div>
        ) : (
          <motion.div
            key="module"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <ModulePage 
              module={selectedModule} 
              onBack={() => {
                setSelectedModule(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
