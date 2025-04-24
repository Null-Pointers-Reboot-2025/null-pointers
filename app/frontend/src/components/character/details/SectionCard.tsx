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
      case 'purple': return 'border-purple-300';
      case 'blue': return 'border-blue-300';
      case 'teal': return 'border-teal-300';
      case 'amber': return 'border-amber-300';
      default: return getThemeClasses('border');
    }
  };
  
  const getAccentColorBg = (color?: string) => {
    if (!color || !withAccentBg) return '';
    
    switch (color) {
      case 'purple': return 'bg-purple-50';
      case 'blue': return 'bg-blue-50';
      case 'teal': return 'bg-teal-50';
      case 'amber': return 'bg-amber-50';
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