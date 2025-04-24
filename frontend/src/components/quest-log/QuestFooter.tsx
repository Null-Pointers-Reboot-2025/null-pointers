import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Quest } from './types';

interface QuestFooterProps {
  quests: Quest[];
}

const QuestFooter: React.FC<QuestFooterProps> = ({ quests }) => {
  const { getThemeClasses } = useTheme();

  const totalCompletedXP = quests.reduce((total, quest) => 
    total + (quest.status === 'completed' ? quest.xp : 0), 0
  );
  
  const completedCount = quests.filter(q => q.status === 'completed').length;

  return (
    <footer className={`${getThemeClasses('surface')} p-4 pb-8 border-t ${getThemeClasses('border')} flex justify-between items-center`}>
      <span className={getThemeClasses('textSecondary')}>Total XP: {totalCompletedXP}</span>
      <span className="text-black dark:text-black">{completedCount}/{quests.length} Completed</span>
    </footer>
  );
};

export default QuestFooter;
