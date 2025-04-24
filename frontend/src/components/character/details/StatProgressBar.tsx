import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

interface StatProgressBarProps {
  value: number;
  maxValue?: number;
  color?: string;
  height?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  gradient?: boolean;
  label?: string;
  valueLabel?: string;
  description?: string;
}

const StatProgressBar: React.FC<StatProgressBarProps> = ({
  value,
  maxValue = 100,
  color = 'blue',
  height = 'sm',
  showValue = true,
  gradient = false,
  label,
  valueLabel,
  description
}) => {
  const { getThemeClasses, theme } = useTheme();
  
  const getBarHeight = () => {
    switch (height) {
      case 'sm': return 'h-2';
      case 'md': return 'h-3';
      case 'lg': return 'h-4';
      default: return 'h-2';
    }
  };
  
  const getBarColor = () => {
    if (gradient) {
      switch (color) {
        case 'purple': return `bg-gradient-to-r from-purple-500 to-purple-600`;
        case 'blue': return `bg-gradient-to-r from-blue-500 to-blue-600`;
        case 'teal': return `bg-gradient-to-r from-teal-500 to-teal-600`;
        case 'amber': return `bg-gradient-to-r from-amber-500 to-amber-600`;
        case 'red': return `bg-gradient-to-r from-red-500 to-red-600`;
        case 'green': return `bg-gradient-to-r from-green-500 to-green-600`;
        default: return `bg-gradient-to-r from-blue-500 to-blue-600`;
      }
    } else {
      switch (color) {
        case 'purple': return theme === 'Light Mode' ? 'bg-purple-400' : 'bg-purple-500';
        case 'blue': return theme === 'Light Mode' ? 'bg-blue-400' : 'bg-blue-500';
        case 'teal': return theme === 'Light Mode' ? 'bg-teal-400' : 'bg-teal-500';
        case 'amber': return theme === 'Light Mode' ? 'bg-amber-400' : 'bg-amber-500';
        case 'red': return theme === 'Light Mode' ? 'bg-red-400' : 'bg-red-500';
        case 'green': return theme === 'Light Mode' ? 'bg-green-400' : 'bg-green-500';
        default: return theme === 'Light Mode' ? 'bg-blue-400' : 'bg-blue-500';
      }
    }
  };
  
  const getBarTextColor = () => {
    switch (color) {
      case 'purple': return 'text-purple-400';
      case 'blue': return 'text-blue-400';
      case 'teal': return 'text-teal-400';
      case 'amber': return 'text-amber-400';
      case 'red': return 'text-red-400';
      case 'green': return 'text-green-400';
      default: return 'text-blue-400';
    }
  };
  
  const percentage = Math.round((value / maxValue) * 100);

  return (
    <div className="space-y-2">
      {(label || showValue) && (
        <div className="flex justify-between items-center">
          {label && (
            <div>
              <h3 className={`${getThemeClasses('heading')} ${getThemeClasses('text')} font-medium`}>{label}</h3>
              {description && <p className={`${getThemeClasses('textSecondary')} text-sm`}>{description}</p>}
            </div>
          )}
          {showValue && (
            <div className="text-right">
              <div className={`${getBarTextColor()} font-medium`}>
                {valueLabel || `${percentage}%`}
              </div>
              {description && !label && <div className={`${getThemeClasses('textSecondary')} text-sm`}>{description}</div>}
            </div>
          )}
        </div>
      )}
      <div className={`${getBarHeight()} ${theme === 'Light Mode' ? 'bg-slate-200' : 'bg-gray-800'} rounded-full overflow-hidden`}>
        <div 
          className={`h-full ${getBarColor()}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StatProgressBar; 