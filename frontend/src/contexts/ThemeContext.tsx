import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme, themes } from '../themes';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  getThemeClasses: (component: 'card' | 'button' | 'input' | 'progressBar' | 'text' | 'background' | 'surface' | 'border' | 'primary' | 'textSecondary' | 'heading') => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme && themes[savedTheme] ? savedTheme : 'Lloyds Bank';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const config = themes[theme];
    const root = document.documentElement;
    
    // Remove any existing theme classes
    root.classList.remove(
      'bg-gray-950', 'bg-stone-950', 'bg-slate-50',
      'text-gray-200', 'text-amber-100', 'text-slate-800',
      'font-medieval'
    );
    
    // Apply new theme classes
    root.classList.add(
      config.colors.background,
      config.colors.text,
      config.fonts.body
    );
    
    root.setAttribute('data-theme', theme);
  }, [theme]);

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
