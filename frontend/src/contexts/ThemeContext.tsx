import React, { createContext, useContext } from 'react';
import { Theme, themes } from '../themes';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  getThemeClasses: (component: 'card' | 'button' | 'input' | 'progressBar' | 'text' | 'background' | 'surface' | 'border' | 'primary' | 'textSecondary' | 'heading') => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always use Lloyds Bank theme
  const theme: Theme = 'Lloyds Bank';

  // setTheme is a no-op since we only have one theme
  const setTheme = (_theme: Theme) => {
    // No-op, we always use Lloyds Bank theme
  };

  const getThemeClasses = (component: 'card' | 'button' | 'input' | 'progressBar' | 'text' | 'background' | 'surface' | 'border' | 'primary' | 'textSecondary' | 'heading') => {
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
        return config.colors.text;
      case 'background':
        return config.colors.background;
      case 'surface':
        return config.colors.surface;
      case 'border':
        return config.colors.border;
      case 'primary':
        return config.colors.primary;
      case 'textSecondary':
        return config.colors.textSecondary;
      case 'heading':
        return config.fonts.heading;
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
