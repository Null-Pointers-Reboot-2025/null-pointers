import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

export interface WeekData {
  weekNumber: number;
  startDate: string;
  endDate: string;
  status: 'down' | 'neutral' | 'onFire';
  totalXp: number;
  completionRate: number;
  hasStreak?: boolean;
}

interface WeekRhythmCardProps {
  weekData: WeekData;
  accentColor?: string;
}

export const WeekRhythmCard: React.FC<WeekRhythmCardProps> = ({
  weekData,
  accentColor = 'teal'
}) => {
  const { theme } = useTheme();
  
  // Helper function for week status
  const getWeekStatusColor = (status: 'down' | 'neutral' | 'onFire') => {
    switch (status) {
      case 'down': return 'bg-red-700 text-white font-bold';
      case 'neutral': return 'bg-blue-700 text-white font-bold';
      case 'onFire': return 'bg-green-800 text-white font-bold';
      default: return 'bg-gray-700 text-white font-bold';
    }
  };
  
  // Helper function for week status label
  const getWeekStatusLabel = (status: 'down' | 'neutral' | 'onFire') => {
    switch (status) {
      case 'down': return 'Down Week';
      case 'neutral': return 'Steady';
      case 'onFire': return 'On Fire 🔥';
      default: return 'Unknown';
    }
  };
  
  // Helper function for progress bar colors
  const getProgressBarClass = (status: 'down' | 'neutral' | 'onFire') => {
    switch (status) {
      case 'down': return 'bg-red-600';
      case 'neutral': return 'bg-blue-600';
      case 'onFire': return 'bg-gradient-to-r from-teal-600 to-green-600';
      default: return 'bg-teal-600';
    }
  };

  return (
    <div className="p-3 border border-gray-800 rounded-lg bg-white/80">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center">
            <h3 className="font-bold text-black">Week {weekData.weekNumber}</h3>
            <span className={`ml-2 text-xs px-2 py-0.5 rounded ${getWeekStatusColor(weekData.status)}`}>
              {getWeekStatusLabel(weekData.status)}
            </span>
          </div>
          <p className="text-xs text-black font-medium mt-1">
            {new Date(weekData.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - 
            {new Date(weekData.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-black font-bold">{weekData.totalXp} XP</div>
          <div className="text-xs text-black font-medium">
            {Math.round(weekData.completionRate * 100)}% completion
          </div>
        </div>
      </div>
      
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden mt-3">
        <div 
          className={`h-full ${getProgressBarClass(weekData.status)}`}
          style={{ width: `${weekData.completionRate * 100}%` }}
        ></div>
      </div>
      
      {weekData.hasStreak && (
        <div className="mt-2 text-xs bg-black text-white font-bold px-2 py-1 rounded inline-block">
          Streak: 2+ weeks 🏆
        </div>
      )}
    </div>
  );
};

export default WeekRhythmCard; 