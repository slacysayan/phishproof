import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Landing from '@/pages/Landing';
import Welcome from '@/pages/Welcome';
import SkillMap from '@/pages/SkillMap';
import GameRound from '@/pages/GameRound';
import Breakdown from '@/pages/Breakdown';
import Results from '@/pages/Results';
import '@/App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/start" element={<Welcome />} />
            <Route path="/map" element={<SkillMap />} />
            <Route path="/lesson/:lessonId" element={<GameRound />} />
            <Route path="/breakdown/:lessonId" element={<Breakdown />} />
            <Route path="/results/:lessonId" element={<Results />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </div>
  );
}

export default App;
