
import React, { useState } from 'react';
import SirIsaacGame from '@/components/SirIsaacGame';
import SkillGapAnalyzer from '@/components/SkillGapAnalyzer';
import Navigation from '@/components/Navigation';

const Index = () => {
  const [currentView, setCurrentView] = useState<'game' | 'analyzer'>('game');

  return (
    <div className="relative">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      {currentView === 'game' ? <SirIsaacGame /> : <SkillGapAnalyzer />}
    </div>
  );
};

export default Index;
