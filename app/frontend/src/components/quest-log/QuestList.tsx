import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Quest } from './types';
import QuestItem from './QuestItem';

interface QuestListProps {
  quests: Quest[];
  completeQuest: (id: number) => void;
}

const QuestList: React.FC<QuestListProps> = ({ quests, completeQuest }) => {
  const { getThemeClasses } = useTheme();
  
  return (
    <div className="flex-1 p-6 space-y-4">
      <h2 className={`${getThemeClasses('heading')} ${getThemeClasses('primary')} text-lg mb-2`}>Daily Quests</h2>
      {quests.length === 0 ? (
        <div className={`text-center py-12 ${getThemeClasses('textSecondary')}`}>
          No quests found
        </div>
      ) : (
        quests.map(quest => (
          <QuestItem 
            key={quest.id} 
            quest={quest} 
            completeQuest={completeQuest} 
          />
        ))
      )}
    </div>
  );
};

export default QuestList; 