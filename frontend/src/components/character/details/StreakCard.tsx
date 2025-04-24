import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { useStatColor } from './useStatColor';

export interface StreakData {
  stat: string;
  current: number;
  longest: number;
  description: string;
  onFireThreshold?: number;
}

interface StreakCardProps {
  streakData: StreakData;
  accentColor?: string;
  onFireThreshold?: number;
}

export const StreakCard: React.FC<StreakCardProps> = ({
  streakData,
  accentColor = 'blue',
  onFireThreshold = 7
}) => {
  const { theme } = useTheme();
  const { getStatColor } = useStatColor();
  
  // Check if this streak is "on fire"
  const isOnFire = streakData.current >= (streakData.onFireThreshold || onFireThreshold);
  
  // Calculate percentage for progress bar
  const percentage = (streakData.current / streakData.longest) * 100;
  
  return (
    <div 
      className={`p-3 border border-gray-800 rounded-lg ${
        isOnFire 
          ? 'bg-white/70'
          : 'bg-white/50'
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-black">
          {streakData.stat}
        </h3>
        <div>
          <span className={`text-lg font-bold ${isOnFire ? 'text-blue-800' : 'text-black'}`}>
            {streakData.current}
          </span>
          <span className="text-black font-medium text-sm"> / {streakData.longest}</span>
        </div>
      </div>
      
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${isOnFire ? 'bg-blue-600' : 'bg-gray-800'}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      <p className="text-xs text-black font-medium mt-2">
        {streakData.description}
      </p>
      
      {isOnFire && (
        <div className="mt-2 text-xs bg-blue-800 text-white font-bold px-2 py-1 rounded inline-block">
          🔥 On Fire!
        </div>
      )}
    </div>
  );
};

export default StreakCard; 