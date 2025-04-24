import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import SectionCard from './SectionCard';

interface SmartFeedbackCardProps {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  accentColor?: string;
  icon?: string;
}

const SmartFeedbackCard: React.FC<SmartFeedbackCardProps> = ({ 
  message, 
  actionLabel, 
  onAction, 
  accentColor = 'blue',
  icon = '🧠'
}) => {
  const { getThemeClasses, theme } = useTheme();
  
  const getAccentTextColor = (color: string) => {
    switch (color) {
      case 'purple': return 'text-purple-700 font-bold';
      case 'blue': return 'text-blue-700 font-bold';
      case 'teal': return 'text-teal-700 font-bold';
      case 'amber': return 'text-amber-700 font-bold';
      case 'green': return 'text-green-700 font-bold';
      default: return 'text-blue-700 font-bold';
    }
  };
  
  const getButtonBgColor = (color: string) => {
    // Use a higher contrast background regardless of theme
    return 'bg-gray-900 hover:bg-gray-800';
  };
  
  const getButtonTextColor = (color: string) => {
    // Use white text for high contrast regardless of theme
    return 'text-white font-bold';
  };

  return (
    <SectionCard accentColor={accentColor} withAccentBg={true}>
      <div className="flex">
        <div className="text-2xl mr-3">{icon}</div>
        <div>
          <h2 className="text-black font-bold text-lg mb-1">Smart Feedback</h2>
          <p className="text-gray-900 font-medium">{message}</p>
          
          {actionLabel && onAction && (
            <button 
              onClick={onAction}
              className="mt-3 px-4 py-2 bg-black text-white font-bold rounded-lg text-sm transition-colors hover:bg-gray-800"
            >
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    </SectionCard>
  );
};

export default SmartFeedbackCard; 