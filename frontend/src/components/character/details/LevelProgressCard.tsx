import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

export interface LevelData {
  level: number;
  xpRequired: number;
  xpCurrent: number;
  perks: string[];
}

interface LevelProgressCardProps {
  levelData: LevelData;
  accentColor?: string;
  strategies?: { label: string; xp: number; color: string }[];
  className?: string;
}

export const LevelProgressCard: React.FC<LevelProgressCardProps> = ({
  levelData,
  accentColor = 'amber',
  strategies,
  className = ''
}) => {
  const { theme } = useTheme();
  
  return (
    <div className={`rounded-lg p-4 border ${theme === 'Light Mode' 
      ? `border-${accentColor}-200 bg-${accentColor}-50` 
      : `border-${accentColor}-500/30 bg-${accentColor}-500/5`
    } ${className}`}>
      <div className="flex items-center mb-2">
        <h2 className="font-bold text-black text-lg">
          Level {levelData.level}
        </h2>
        <div className="ml-auto flex items-center">
          <span className="text-black font-bold">
            {levelData.xpCurrent}
          </span>
          <span className="text-gray-900 font-medium mx-1">/</span>
          <span className="text-gray-900 font-medium">
            {levelData.xpRequired} XP
          </span>
        </div>
      </div>
      
      <div className="h-4 bg-gray-200 rounded-full overflow-hidden mb-4">
        <div 
          className={`h-full bg-gradient-to-r from-${accentColor}-500 to-${accentColor}-600`}
          style={{ width: `${(levelData.xpCurrent / levelData.xpRequired) * 100}%` }}
        ></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`border ${theme === 'Light Mode' 
          ? `border-${accentColor}-200` 
          : `border-${accentColor}-500/20`
        } rounded-lg p-3`}>
          <h3 className="text-black font-bold mb-2">
            Level {levelData.level} Perks
          </h3>
          <ul className="space-y-2">
            {levelData.perks.map((perk, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-black mr-2">⭐</span>
                <span className="text-gray-900 font-medium">{perk}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {strategies && (
          <div className={`border ${theme === 'Light Mode' 
            ? `border-${accentColor}-200` 
            : `border-${accentColor}-500/20`
          } rounded-lg p-3`}>
            <h3 className="text-black font-bold mb-2">
              Level Up Strategy
            </h3>
            <p className="mb-2 text-gray-900 font-medium">Fastest path to Level {levelData.level + 1}:</p>
            <div className="space-y-2 text-sm">
              {strategies.map((strategy, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-gray-900 font-medium">{strategy.label}</span>
                  <span className="text-black font-bold">
                    +{strategy.xp} XP
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LevelProgressCard; 