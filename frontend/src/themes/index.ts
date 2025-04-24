export type Theme = 'System Blue' | 'rpg' | 'Light Mode' | 'Lloyds Bank';

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
  'Lloyds Bank': {
    colors: {
      primary: 'text-green-600',
      secondary: 'text-black',
      background: 'bg-white',
      surface: 'bg-green-500',
      text: 'text-black',
      textSecondary: 'text-black',
      border: 'border-green-600',
      success: 'text-green-600',
      warning: 'text-amber-600',
      error: 'text-red-600'
    },
    fonts: {
      heading: 'font-semibold',
      body: 'font-normal'
    },
    styles: {
      card: 'rounded-lg shadow-sm border border-gray-200',
      button: 'rounded-lg transition-colors border border-green-600 bg-green-600 text-white hover:bg-green-700',
      input: 'rounded-lg border border-gray-300 bg-white',
      progressBar: 'rounded-full shadow-inner bg-gray-100'
    }
  },
  'System Blue': {
    colors: {
      primary: 'text-blue-400',
      secondary: 'text-purple-400',
      background: 'bg-gray-950',
      surface: 'bg-gray-900',
      text: 'text-gray-200',
      textSecondary: 'text-gray-200',
      border: 'border-blue-500/30',
      success: 'text-green-400',
      warning: 'text-yellow-400',
      error: 'text-red-400'
    },
    fonts: {
      heading: 'font-semibold',
      body: 'font-normal'
    },
    styles: {
      card: 'rounded-lg shadow-lg',
      button: 'rounded-lg transition-colors',
      input: 'rounded-lg border',
      progressBar: 'rounded-full'
    }
  },
  rpg: {
    colors: {
      primary: 'text-amber-400',
      secondary: 'text-red-400',
      background: 'bg-stone-950',
      surface: 'bg-stone-900',
      text: 'text-amber-100',
      textSecondary: 'text-amber-100',
      border: 'border-amber-500/30',
      success: 'text-emerald-400',
      warning: 'text-amber-400',
      error: 'text-red-400'
    },
    fonts: {
      heading: 'font-medieval',
      body: 'font-normal'
    },
    styles: {
      card: 'rounded-lg shadow-lg border-2 border-amber-500/20',
      button: 'rounded-lg transition-colors border-2 border-amber-500/20',
      input: 'rounded-lg border-2 border-amber-500/20',
      progressBar: 'rounded-full border-2 border-amber-500/20'
    }
  },
  'Light Mode': {
    colors: {
      primary: 'text-blue-600',
      secondary: 'text-purple-600',
      background: 'bg-slate-50',
      surface: 'bg-white',
      text: 'text-slate-800',
      textSecondary: 'text-slate-800',
      border: 'border-slate-300',
      success: 'text-emerald-600',
      warning: 'text-amber-600',
      error: 'text-red-600'
    },
    fonts: {
      heading: 'font-semibold',
      body: 'font-normal'
    },
    styles: {
      card: 'rounded-lg shadow-sm border border-slate-200',
      button: 'rounded-lg transition-colors border border-slate-200 shadow-sm',
      input: 'rounded-lg border border-slate-300 bg-white',
      progressBar: 'rounded-full shadow-inner bg-slate-100'
    }
  }
};

export const applyTheme = (theme: Theme) => {
  const config = themes[theme];
  
  // Apply theme to root element
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
  
  // Store current theme in data attribute for component access
  root.setAttribute('data-theme', theme);
};
