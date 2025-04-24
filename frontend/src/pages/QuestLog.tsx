import React, { useState, useEffect } from 'react';
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
  const [showOnlyBreathingTask, setShowOnlyBreathingTask] = useState<boolean>(false);
  const [breathingQuestId, setBreathingQuestId] = useState<number | null>(null);

  useEffect(() => {
    // Check for breathing task filter flag in session storage
    const shouldShowBreathingTask = sessionStorage.getItem('showBreathingTask');
    const breathingQuestIdStr = sessionStorage.getItem('breathingQuestId');
    
    if (shouldShowBreathingTask === 'true' && breathingQuestIdStr) {
      setShowOnlyBreathingTask(true);
      setBreathingQuestId(parseInt(breathingQuestIdStr, 10));
      
      // Clear the session storage values
      sessionStorage.removeItem('showBreathingTask');
      // Keep the ID in session storage in case they navigate back
    }
  }, []);

  const filteredQuests = quests.filter(quest => {
    // If breathing task filter is active, only show the specific breathing exercise task
    if (showOnlyBreathingTask && breathingQuestId !== null) {
      return quest.id === breathingQuestId;
    }
    
    // Otherwise, apply normal filtering
    if (filter === 'all') return true;
    if (filter === 'active') return quest.status === 'active';
    if (filter === 'completed') return quest.status === 'completed';
    return quest.category === filter;
  });

  const toggleWeeklyGoals = () => {
    setWeeklyGoalsExpanded(!weeklyGoalsExpanded);
  };

  // Function to clear the breathing task filter
  const clearBreathingTaskFilter = () => {
    setShowOnlyBreathingTask(false);
    // Also clear help flow flags
    sessionStorage.removeItem('helpRequest');
    // Keep breathingQuestId for potential future reference
  };

  // Clear help request processed flag when component unmounts
  useEffect(() => {
    return () => {
      // Clean up when navigating away
      sessionStorage.removeItem('helpRequest');
    };
  }, []);

  return (
    <div className={`flex flex-col min-h-screen ${getThemeClasses('background')} ${getThemeClasses('text')} pb-navigation`}>
      {/* Add the styles to the DOM */}
      <style>{animationStyles}</style>

      {/* Header */}
      <QuestHeader />
      
      {/* Show banner if we're filtering for just the breathing task */}
      {showOnlyBreathingTask && (
        <div className="bg-green-100 p-3 mb-4 mx-4 rounded-lg flex justify-between items-center">
          <span className="text-green-800">Showing only your task</span>
          <button 
            onClick={clearBreathingTaskFilter}
            className="px-2 py-1 bg-green-200 text-green-800 rounded hover:bg-green-300 transition-colors text-sm"
          >
            Show All Tasks
          </button>
        </div>
      )}
      
      {/* Quest Filtering - Only show if not filtering for breathing task */}
      {!showOnlyBreathingTask && (
        <QuestFilter 
          filter={filter} 
          setFilter={setFilter}
        />
      )}
      
      {/* Quest List - Now before Weekly Goals */}
      <QuestList 
        quests={filteredQuests}
        completeQuest={completeQuest}
      />

      {/* Weekly Goals Section - Moved to the bottom - Only show if not filtering for breathing task */}
      {!showOnlyBreathingTask && (
        <WeeklyGoalsSection 
          weeklyGoals={weeklyGoals}
          weeklyGoalsExpanded={weeklyGoalsExpanded}
          toggleWeeklyGoals={toggleWeeklyGoals}
        />
      )}
      
      {/* Footer */}
      <QuestFooter quests={quests} />
    </div>
  );
};

export default QuestLog; 