import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const QuestHeader: React.FC = () => {
  const { getThemeClasses } = useTheme();

  return (
    <header className={`${getThemeClasses('surface')} p-4 border-b ${getThemeClasses('border')} text-center`}>
      <h1 className={`text-black dark:text-black ${getThemeClasses('heading')} text-xl`}>FinwiseOS Quest Log</h1>
    </header>
  );
};

export default QuestHeader;
