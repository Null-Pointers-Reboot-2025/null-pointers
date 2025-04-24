import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import useStatColor from './useStatColor';

interface QuestProgressCardProps {
  stat: string;
  completed: number;
  total: number;
  period: string;
}

const QuestProgressCard: React.FC<QuestProgressCardProps> = ({ stat, completed, total, period }) => {
  const { getThemeClasses, theme } = useTheme();
  const { getStatColor } = useStatColor();
  
  const progressPercentage = (completed / total) * 100;
  const isGoodProgress = completed / total >= 0.7;

  return (
    <div className={`p-3 border ${theme === 'Light Mode' ? 'border-slate-300' : 'border-gray-700'} rounded-lg`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-black font-bold">{stat}</h3>
        <span className="font-bold text-black">
          {completed}/{total}
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${getStatColor(stat, 'bg')}`}
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-900 font-medium mt-1">
        {period}
      </p>
    </div>
  );
};

export default QuestProgressCard; 