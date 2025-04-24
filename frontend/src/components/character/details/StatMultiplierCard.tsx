import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

export interface StatMultiplier {
  description: string;
  isActive: boolean;
  activePeriod: string;
}

interface StatMultiplierCardProps {
  statMultiplier: StatMultiplier;
  accentColor?: string;
  icon?: string;
  title?: string;
  onToggle?: () => void;
}

export const StatMultiplierCard: React.FC<StatMultiplierCardProps> = ({
  statMultiplier,
  accentColor = 'blue',
  icon = '🎯',
  title = 'Mental Stat Multiplier',
  onToggle
}) => {
  const { theme } = useTheme();
  
  return (
    <div className="rounded-lg p-4 border border-gray-900 bg-white/70">
      <h2 className="text-black font-bold text-lg mb-3 flex items-center">
        <span className="text-xl mr-2">{icon}</span> {title}
      </h2>
      
      <div className="p-3 rounded-lg bg-blue-100 mb-4">
        <p className="text-lg text-blue-900 font-bold">
          {statMultiplier.description}
        </p>
      </div>
      
      <div className="flex justify-between items-center">
        <div>
          <div className={`w-12 h-6 rounded-full ${statMultiplier.isActive 
            ? 'bg-blue-900' 
            : 'bg-gray-300'
          } relative cursor-pointer`}
            onClick={onToggle}
          >
            <div 
              className={`absolute w-5 h-5 rounded-full ${
                statMultiplier.isActive 
                  ? 'bg-white' 
                  : 'bg-gray-100'
              } top-0.5 transition-all ${
                statMultiplier.isActive ? 'left-6' : 'left-0.5'
              }`}
            ></div>
          </div>
          <div className="mt-1 text-xs text-black font-medium">
            {statMultiplier.isActive ? 'Active during: ' : 'Inactive'} 
            {statMultiplier.isActive && statMultiplier.activePeriod}
          </div>
        </div>
        
        <div className={`text-xs font-bold ${
          statMultiplier.isActive
            ? 'text-blue-900'
            : 'text-gray-500'
        }`}>
          {statMultiplier.isActive ? 'ACTIVE' : 'INACTIVE'}
        </div>
      </div>
    </div>
  );
};

export default StatMultiplierCard; 