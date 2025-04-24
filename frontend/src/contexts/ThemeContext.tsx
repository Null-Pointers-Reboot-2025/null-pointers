import React, { createContext, useContext, useEffect } from 'react';
import { Theme, themes, applyTheme } from '../themes';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  getThemeClasses: (component: 'card' | 'button' | 'input' | 'progressBar' | 'text' | 'background' | 'surface' | 'border' | 'primary' | 'textSecondary' | 'heading' | 'accent' | 'muted' | 'highlight') => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use Health App theme
  const theme: Theme = 'Health App';

  // Apply theme when the component mounts
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // setTheme is a no-op since we only have one theme
  const setTheme = (_theme: Theme) => {
    // No-op, we always use Health App theme
  };

  const getThemeClasses = (component: 'card' | 'button' | 'input' | 'progressBar' | 'text' | 'background' | 'surface' | 'border' | 'primary' | 'textSecondary' | 'heading' | 'accent' | 'muted' | 'highlight') => {
    const config = themes[theme];
    switch (component) {
      case 'card':
        return config.styles.card;
      case 'button':
        return config.styles.button;
      case 'input':
        return config.styles.input;
      case 'progressBar':
        return config.styles.progressBar;
      case 'text':
        return 'text-[#000000]';
      case 'background':
        return 'bg-white';
      case 'surface':
        return 'bg-[#F0F0F0]';
      case 'border':
        return 'border-[#E5E5E5]';
      case 'primary':
        return 'text-[#007A33]';
      case 'textSecondary':
        return 'text-[#1A1A1A]';
      case 'heading':
        return config.fonts.heading;
      case 'accent':
        return 'bg-[#D2F4C3]';
      case 'muted':
        return 'bg-[#F0F0F0]';
      case 'highlight':
        return 'bg-[#BFFF00]';
      default:
        return '';
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, getThemeClasses }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
