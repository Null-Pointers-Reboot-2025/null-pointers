import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

interface SectionCardProps {
  title?: string;
  children: React.ReactNode;
  accentColor?: string;
  withAccentBg?: boolean;
  className?: string;
  marginBottom?: boolean;
}

const SectionCard: React.FC<SectionCardProps> = ({ 
  title, 
  children, 
  accentColor, 
  withAccentBg = false,
  className = '',
  marginBottom = true
}) => {
  const { getThemeClasses, theme } = useTheme();
  
  const getAccentColorBorder = (color?: string) => {
    if (!color) return getThemeClasses('border');
    
    switch (color) {
      case 'purple': return theme === 'Light Mode' ? 'border-purple-300' : 'border-purple-500/30';
      case 'blue': return theme === 'Light Mode' ? 'border-blue-300' : 'border-blue-500/30';
      case 'teal': return theme === 'Light Mode' ? 'border-teal-300' : 'border-teal-500/30';
      case 'amber': return theme === 'Light Mode' ? 'border-amber-300' : 'border-amber-500/30';
      default: return getThemeClasses('border');
    }
  };
  
  const getAccentColorBg = (color?: string) => {
    if (!color || !withAccentBg) return '';
    
    switch (color) {
      case 'purple': return theme === 'Light Mode' ? 'bg-purple-50' : 'bg-purple-500/5';
      case 'blue': return theme === 'Light Mode' ? 'bg-blue-50' : 'bg-blue-500/5';
      case 'teal': return theme === 'Light Mode' ? 'bg-teal-50' : 'bg-teal-500/5';
      case 'amber': return theme === 'Light Mode' ? 'bg-amber-50' : 'bg-amber-500/5';
      default: return '';
    }
  };
  
  const getAccentTextColor = (color?: string) => {
    if (!color) return getThemeClasses('primary');
    
    switch (color) {
      case 'purple': return 'text-purple-700 font-bold';
      case 'blue': return 'text-blue-700 font-bold';
      case 'teal': return 'text-teal-700 font-bold';
      case 'amber': return 'text-amber-700 font-bold';
      case 'green': return 'text-green-700 font-bold';
      default: return getThemeClasses('primary');
    }
  };

  return (
    <div 
      className={`${getThemeClasses('surface')} rounded-lg p-4 border ${getAccentColorBorder(accentColor)} ${getAccentColorBg(accentColor)} ${marginBottom ? 'mb-6' : ''} ${className}`}
    >
      {title && (
        <h2 className="text-black font-bold text-lg mb-3">{title}</h2>
      )}
      {children}
    </div>
  );
};

export default SectionCard; 