import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { useStatColor } from './useStatColor';

export interface MoodXpItem {
  date: string;
  stat: string;
  amount: number;
  mood: 'low' | 'medium' | 'high';
  activity: string;
}

interface MoodXpItemProps {
  item: MoodXpItem;
}

export const MoodXpItem: React.FC<MoodXpItemProps> = ({ item }) => {
  const { theme } = useTheme();
  const { getStatColor } = useStatColor();
  
  // Helper function for mood color
  const getMoodColor = (mood: 'low' | 'medium' | 'high') => {
    switch (mood) {
      case 'low': return 'bg-red-700 text-white font-bold';
      case 'medium': return 'bg-amber-700 text-white font-bold';
      case 'high': return 'bg-green-800 text-white font-bold';
      default: return 'bg-gray-700 text-white font-bold';
    }
  };
  
  // Get mood label
  const getMoodLabel = (mood: 'low' | 'medium' | 'high') => {
    switch (mood) {
      case 'low': return 'Low Energy';
      case 'medium': return 'Neutral';
      case 'high': return 'High Energy';
      default: return 'Unknown';
    }
  };

  return (
    <div className="p-3 border border-gray-800 rounded-lg flex justify-between items-center bg-white/80">
      <div>
        <div className="flex items-center">
          <span className="text-lg font-bold text-black">
            +{item.amount} {item.stat} XP
          </span>
          <span className={`ml-2 text-xs px-2 py-0.5 rounded ${getMoodColor(item.mood)}`}>
            {getMoodLabel(item.mood)}
          </span>
        </div>
        <p className="text-black font-medium text-sm mt-1">
          {item.activity}
        </p>
      </div>
      <div className="text-black font-bold text-sm">
        {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
      </div>
    </div>
  );
};

export default MoodXpItem; 