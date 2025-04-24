import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import SectionCard from './SectionCard';

interface MasterySummaryProps {
  title?: string;
  children: React.ReactNode;
  accentColor?: string;
  archetypeName?: string;
  archetypeQuote?: string;
}

const MasterySummary: React.FC<MasterySummaryProps> = ({
  title = 'Mastery Insights',
  children,
  accentColor = 'blue',
  archetypeName,
  archetypeQuote
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
  
  return (
    <SectionCard className="border-2 border-opacity-20" accentColor={accentColor}>
      <h2 className="text-black font-bold text-lg mb-3 flex items-center">
        <span className="text-xl mr-2">⭐️</span> {title}
      </h2>
      
      <div className="space-y-4">
        {children}
        
        {(archetypeName || archetypeQuote) && (
          <div className={`p-4 border ${theme === 'Light Mode' ? `border-${accentColor}-300` : `border-${accentColor}-500/30`} rounded-lg ${theme === 'Light Mode' ? `bg-${accentColor}-50` : `bg-${accentColor}-500/5`} mt-4`}>
            {archetypeName && (
              <h3 className="text-black font-bold text-lg">
                {archetypeName}
              </h3>
            )}
            {archetypeQuote && (
              <p className="mt-2 italic text-gray-900 font-medium">
                "{archetypeQuote}"
              </p>
            )}
          </div>
        )}
      </div>
    </SectionCard>
  );
};

export default MasterySummary; 