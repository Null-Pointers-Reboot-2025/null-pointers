export type Theme = 'Health App';

export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
    accent: string;
    muted: string;
    highlight: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  styles: {
    card: string;
    button: string;
    input: string;
    progressBar: string;
  };
}

export const themes: Record<Theme, ThemeConfig> = {
  'Health App': {
    colors: {
      primary: '#007A33', // Dark Green
      secondary: '#A4DE7C', // Light Green
      background: '#FFFFFF', // White
      surface: '#F0F0F0', // Muted Gray
      text: '#000000', // Black
      textSecondary: '#1A1A1A', // Dark Gray
      border: '#E5E5E5', // Light Gray
      success: '#007A33', // Dark Green
      warning: '#FFA500', // Orange
      error: '#FF3B30', // Red
      accent: '#D2F4C3', // Lighter Green
      muted: '#F0F0F0', // Muted Gray
      highlight: '#BFFF00', // Lime Green
    },
    fonts: {
      heading: 'font-semibold',
      body: 'font-normal'
    },
    styles: {
      card: 'rounded-lg shadow-sm border border-gray-200 bg-white',
      button: 'rounded-lg transition-colors border border-[#007A33] bg-[#007A33] text-white hover:bg-[#006629]',
      input: 'rounded-lg border border-gray-300 bg-white',
      progressBar: 'rounded-full shadow-inner bg-[#F0F0F0]'
    }
  }
};

export const applyTheme = (theme: Theme) => {
  const config = themes[theme];
  
  // Apply theme to root element
  const root = document.documentElement;
  
  // Set CSS variables for the theme colors
  root.style.setProperty('--color-primary', config.colors.primary);
  root.style.setProperty('--color-secondary', config.colors.secondary);
  root.style.setProperty('--color-background', config.colors.background);
  root.style.setProperty('--color-surface', config.colors.surface);
  root.style.setProperty('--color-text', config.colors.text);
  root.style.setProperty('--color-text-secondary', config.colors.textSecondary);
  root.style.setProperty('--color-border', config.colors.border);
  root.style.setProperty('--color-success', config.colors.success);
  root.style.setProperty('--color-warning', config.colors.warning);
  root.style.setProperty('--color-error', config.colors.error);
  root.style.setProperty('--color-accent', config.colors.accent);
  root.style.setProperty('--color-muted', config.colors.muted);
  root.style.setProperty('--color-highlight', config.colors.highlight);
  
  // Store current theme in data attribute for component access
  root.setAttribute('data-theme', theme);
};
