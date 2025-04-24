import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

export interface MasteryTrack {
  name: string;
  category: string;
  progress: number; // 0-100
  questsCompleted: number;
  questsTotal: number;
  unlockable: string;
  milestone?: string;
}

interface MasteryTrackItemProps {
  track: MasteryTrack;
}

export const MasteryTrackItem: React.FC<MasteryTrackItemProps> = ({ track }) => {
  const { theme } = useTheme();
  
  // Helper function for category colors
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'physical': return 'bg-purple-50';
      case 'mental': return 'bg-blue-50';
      case 'emotional': return 'bg-teal-50';
      case 'meta':
      case 'system': 
      default: return 'bg-amber-50';
    }
  };
  
  // Helper function to get text color only
  const getTextColorClass = (category: string) => {
    switch (category) {
      case 'physical': return 'text-purple-900 font-bold';
      case 'mental': return 'text-blue-900 font-bold';
      case 'emotional': return 'text-teal-900 font-bold';
      case 'meta':
      case 'system': 
      default: return 'text-amber-900 font-bold';
    }
  };
  
  // Helper function to get border color
  const getBorderColorClass = (category: string) => {
    switch (category) {
      case 'physical': return 'border-purple-500';
      case 'mental': return 'border-blue-500';
      case 'emotional': return 'border-teal-500';
      case 'meta':
      case 'system': 
      default: return 'border-amber-500';
    }
  };
  
  // Helper function to get background color class
  const getBgColorClass = (category: string) => {
    switch (category) {
      case 'physical': return 'bg-purple-600';
      case 'mental': return 'bg-blue-600';
      case 'emotional': return 'bg-teal-600';
      case 'meta':
      case 'system': 
      default: return 'bg-amber-600';
    }
  };

  return (
    <div className={`p-3 border rounded-lg ${getCategoryColor(track.category)} ${getBorderColorClass(track.category)}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-black text-lg">{track.name}</h3>
        <div className="text-sm">
          <span className="font-bold text-black">{track.questsCompleted}</span>
          <span className="font-semibold text-gray-900">/
            {track.questsTotal} Quests
          </span>
        </div>
      </div>
      
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
        <div 
          className={`h-full ${getBgColorClass(track.category)}`}
          style={{ width: `${track.progress}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between items-center text-sm">
        <div>
          <span className="font-bold text-black">Unlockable: </span>
          <span className="font-semibold text-gray-900">{track.unlockable}</span>
        </div>
        <div className="text-right">
          <span className="font-bold text-black">Progress: </span>
          <span className="font-semibold text-gray-900">{track.progress}%</span>
        </div>
      </div>
      
      {track.progress >= 50 && (
        <div className="mt-2 text-xs bg-gray-900 text-white font-bold px-2 py-1 rounded inline-block">
          {track.progress >= 75 ? 'Almost there!' : 'Good progress'}
        </div>
      )}
      
      {track.milestone && (
        <div className="mt-2 text-xs bg-black text-white font-bold px-2 py-1 rounded inline-block">
          {track.milestone}
        </div>
      )}
    </div>
  );
};

export default MasteryTrackItem; 