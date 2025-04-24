import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import useStatColor from './useStatColor';

interface XpHistoryItemProps {
  date: string;
  stat: string;
  amount: number;
  source: string;
}

const XpHistoryItem: React.FC<XpHistoryItemProps> = ({ date, stat, amount, source }) => {
  const { getThemeClasses, theme } = useTheme();
  const { getStatColor } = useStatColor();
  
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className={`flex justify-between items-center p-2 rounded-lg ${getThemeClasses('surface')} border ${getThemeClasses('border')}`}>
      <div>
        <div className="flex items-center">
          <span className="text-lg font-bold text-black">
            +{amount} {stat} XP
          </span>
        </div>
        <p className="text-gray-900 font-medium text-sm">{source}</p>
      </div>
      <div className="text-gray-900 font-medium text-sm">
        {formatDate(date)}
      </div>
    </div>
  );
};

export default XpHistoryItem; 