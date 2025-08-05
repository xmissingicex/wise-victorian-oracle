
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, Target } from 'lucide-react';

interface NavigationProps {
  currentView: 'game' | 'analyzer';
  onViewChange: (view: 'game' | 'analyzer') => void;
}

const Navigation = ({ currentView, onViewChange }: NavigationProps) => {
  return (
    <div className="fixed top-4 left-4 z-50">
      <div className="flex gap-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-amber-200">
        <Button
          onClick={() => onViewChange('game')}
          variant={currentView === 'game' ? 'default' : 'outline'}
          size="sm"
          className={currentView === 'game' ? 'bg-amber-600 hover:bg-amber-700' : 'border-amber-300 text-amber-700 hover:bg-amber-50'}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Ask Sir Isaac
        </Button>
        <Button
          onClick={() => onViewChange('analyzer')}
          variant={currentView === 'analyzer' ? 'default' : 'outline'}
          size="sm"
          className={currentView === 'analyzer' ? 'bg-amber-600 hover:bg-amber-700' : 'border-amber-300 text-amber-700 hover:bg-amber-50'}
        >
          <Target className="w-4 h-4 mr-2" />
          Skill Analysis
        </Button>
      </div>
    </div>
  );
};

export default Navigation;
