import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';

interface PageLayoutProps {
  title: string;
  icon: string;
  iconColor: string;
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, icon, iconColor, children }) => {
  const { getThemeClasses } = useTheme();
  const navigate = useNavigate();

  const getIconColorClass = (color: string) => {
    switch (color) {
      case 'purple': return 'text-purple-800 font-bold';
      case 'blue': return 'text-blue-800 font-bold';
      case 'teal': return 'text-teal-900 font-bold';
      case 'amber': return 'text-amber-800 font-bold';
      case 'green': return 'text-green-800 font-bold';
      default: return 'text-blue-800 font-bold';
    }
  };

  return (
    <div className={`flex flex-col min-h-screen ${getThemeClasses('background')} ${getThemeClasses('text')} pb-navigation`}>
      {/* Header */}
      <header className={`${getThemeClasses('surface')} p-4 border-b ${getThemeClasses('border')}`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/character')}
              className={`mr-2 ${getThemeClasses('text')} hover:${getThemeClasses('primary')} transition-colors`}
            >
              ←
            </button>
            <div className="flex items-center">
              <span className="text-2xl mr-2">{icon}</span>
              <h1 className={`${getIconColorClass(iconColor)} ${getThemeClasses('heading')} text-xl`}>{title}</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-4 pt-6 max-w-4xl mx-auto w-full">
        {children}
      </div>
    </div>
  );
};

export default PageLayout; 