import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

export interface SystemMetric {
  title: string;
  value: string;
  secondaryText?: string;
  secondaryText2?: string;
  indicatorText?: string;
  indicatorColor?: 'green' | 'blue' | 'red' | 'amber';
  valueClassName?: string;
  subMetrics?: {
    title: string;
    value: string;
    highlight?: boolean;
  }[];
}

interface SystemInsightCardProps {
  metric: SystemMetric;
  accentColor?: string;
}

export const SystemInsightCard: React.FC<SystemInsightCardProps> = ({
  metric,
  accentColor = 'amber'
}) => {
  const { theme } = useTheme();
  
  const getIndicatorClass = (color?: string) => {
    if (!color) return '';
    
    // High contrast alternatives regardless of theme
    switch (color) {
      case 'green': return 'bg-green-900 text-white font-bold';
      case 'blue': return 'bg-blue-900 text-white font-bold';
      case 'red': return 'bg-red-900 text-white font-bold';
      case 'amber': return 'bg-amber-900 text-white font-bold';
      default: return 'bg-blue-900 text-white font-bold';
    }
  };
  
  return (
    <div className={`p-3 border ${theme === 'Light Mode' ? 'border-gray-300' : 'border-gray-700'} rounded-lg`}>
      <h3 className="text-black font-bold">
        {metric.title}
      </h3>
      
      {metric.value && (
        <div className={`flex ${metric.valueClassName?.includes('block') ? 'flex-col' : 'justify-between'} items-${metric.valueClassName?.includes('block') ? 'start' : 'center'} mt-2`}>
          <span className="text-lg font-bold text-gray-900">{metric.value}</span>
          {metric.secondaryText && !metric.valueClassName?.includes('block') && (
            <span className="text-xs font-semibold text-gray-900">
              {metric.secondaryText}
            </span>
          )}
        </div>
      )}
      
      {metric.title === 'Balance Index' && (
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
          <div 
            className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-green-600" 
            style={{ width: `${metric.value.split('/')[0]}%` }}
          ></div>
        </div>
      )}
      
      {metric.secondaryText && !metric.title.includes('Balance') && metric.valueClassName?.includes('block') && (
        <p className="text-xs font-semibold text-gray-900 mt-2">
          {metric.secondaryText}
        </p>
      )}
      
      {metric.indicatorText && (
        <div className="flex mt-2">
          <div className={`px-2 py-0.5 rounded-full ${getIndicatorClass(metric.indicatorColor)} text-xs flex items-center`}>
            <span className="w-1 h-1 bg-white rounded-full mr-1"></span>
            {metric.indicatorText}
          </div>
        </div>
      )}
      
      {metric.subMetrics && metric.subMetrics.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-700">
          {metric.subMetrics.map((subMetric, idx) => (
            <div key={idx} className={idx > 0 ? 'mt-1' : ''}>
              <p className="text-black font-bold text-sm">
                {subMetric.title}:
              </p>
              <p className="text-lg mt-1 font-bold text-gray-900">
                {subMetric.value}
              </p>
              {subMetric.highlight && (
                <div className="text-xs font-bold text-black mt-1">
                  Master level achievements
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SystemInsightCard; 