import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import StatProgressBar from './StatProgressBar';

interface InsightPoint {
  color?: string;
  label: string;
}

interface MasteryInsightCardProps {
  title: string;
  children?: React.ReactNode;
  accentColor?: string;
  progressValue?: number;
  progressMax?: number;
  progressLabel?: string;
  subtext?: string;
  insights?: InsightPoint[];
}

const MasteryInsightCard: React.FC<MasteryInsightCardProps> = ({
  title,
  children,
  accentColor = 'blue',
  progressValue,
  progressMax,
  progressLabel,
  subtext,
  insights
}) => {
  const { getThemeClasses, theme } = useTheme();
  
  const getAccentTextColor = (color: string) => {
    switch (color) {
      case 'purple': return 'text-purple-700 font-bold';
      case 'blue': return 'text-blue-700 font-bold';
      case 'teal': return 'text-teal-700 font-bold';
      case 'amber': return 'text-amber-700 font-bold';
      case 'red': return 'text-red-700 font-bold';
      case 'green': return 'text-green-700 font-bold';
      default: return 'text-blue-700 font-bold';
    }
  };
  
  const getPointColor = (color?: string) => {
    if (!color) return theme === 'Light Mode' ? 'bg-slate-500' : 'bg-gray-400';
    
    switch (color) {
      case 'purple': return 'bg-purple-500';
      case 'blue': return 'bg-blue-500';
      case 'teal': return 'bg-teal-500';
      case 'amber': return 'bg-amber-500';
      case 'red': return 'bg-red-500';
      case 'green': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className={`p-3 border ${theme === 'Light Mode' ? 'border-slate-300' : 'border-gray-700'} rounded-lg`}>
      <h3 className="text-black font-bold">{title}</h3>
      
      {/* Progress indicator if provided */}
      {progressValue !== undefined && (
        <>
          <p className="text-lg mt-1 font-medium text-gray-900">{progressLabel}</p>
          {progressMax && (
            <>
              <div className={`h-2 ${theme === 'Light Mode' ? 'bg-slate-200' : 'bg-gray-700'} rounded-full overflow-hidden mt-2`}>
                <div 
                  className="h-full bg-gray-900"
                  style={{ width: `${(progressValue / progressMax) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-900 font-medium mt-1">
                {progressValue}/{progressMax} {subtext || 'XP'}
              </p>
            </>
          )}
        </>
      )}
      
      {/* Bullet points if provided */}
      {insights && insights.length > 0 && (
        <div className="text-sm mt-2">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-center mb-1">
              <span className={`w-2 h-2 ${getPointColor(insight.color)} rounded-full mr-2`}></span>
              <span className="text-gray-900 font-medium">{insight.label}</span>
            </div>
          ))}
        </div>
      )}
      
      {/* Any other content */}
      {children}
    </div>
  );
};

export default MasteryInsightCard; 