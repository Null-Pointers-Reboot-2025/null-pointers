import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useQuests } from '../contexts/QuestContext';
import {
  QuestHeader,
  QuestFilter,
  QuestList,
  WeeklyGoalsSection,
  QuestFooter,
  CoreCategory,
  animationStyles
} from '../components/quest-log';

const QuestLog: React.FC = () => {
  const { getThemeClasses } = useTheme();
  const { quests, weeklyGoals, completeQuest } = useQuests();

  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | CoreCategory>('all');
  const [weeklyGoalsExpanded, setWeeklyGoalsExpanded] = useState<boolean>(true);

  const filteredQuests = quests.filter(quest => {
    if (filter === 'all') return true;
    if (filter === 'active') return quest.status === 'active';
    if (filter === 'completed') return quest.status === 'completed';
    return quest.category === filter;
  });

  const toggleWeeklyGoals = () => {
    setWeeklyGoalsExpanded(!weeklyGoalsExpanded);
  };

  return (
    <div className={`flex flex-col min-h-screen ${getThemeClasses('background')} ${getThemeClasses('text')} pb-navigation`}>
      {/* Add the styles to the DOM */}
      <style>{animationStyles}</style>

      {/* Header */}
      <QuestHeader />
      
      {/* Quest Filtering */}
      <QuestFilter 
        filter={filter} 
        setFilter={setFilter}
      />
      
      {/* Quest List - Now before Weekly Goals */}
      <QuestList 
        quests={filteredQuests}
        completeQuest={completeQuest}
      />

      {/* Weekly Goals Section - Moved to the bottom */}
      <WeeklyGoalsSection 
        weeklyGoals={weeklyGoals}
        weeklyGoalsExpanded={weeklyGoalsExpanded}
        toggleWeeklyGoals={toggleWeeklyGoals}
      />
      
      {/* Footer */}
      <QuestFooter quests={quests} />
    </div>
  );
};

export default QuestLog; 