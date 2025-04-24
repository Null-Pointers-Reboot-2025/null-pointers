import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { WeeklyGoal } from './types';
import WeeklyGoalItem from './WeeklyGoalItem';

interface WeeklyGoalsSectionProps {
  weeklyGoals: WeeklyGoal[];
  weeklyGoalsExpanded: boolean;
  toggleWeeklyGoals: () => void;
}

const WeeklyGoalsSection: React.FC<WeeklyGoalsSectionProps> = ({ 
  weeklyGoals, 
  weeklyGoalsExpanded, 
  toggleWeeklyGoals 
}) => {
  const { getThemeClasses } = useTheme();

  return (
    <div className={`${getThemeClasses('surface')} border-t ${getThemeClasses('border')}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between p-4">
          <h2 className={`${getThemeClasses('text')} ${getThemeClasses('heading')} text-lg font-bold`}>Weekly Goals</h2>
          <button 
            onClick={toggleWeeklyGoals}
            className={`${getThemeClasses('text')} hover:${getThemeClasses('primary')} transition-colors`}
          >
            {weeklyGoalsExpanded ? '▼' : '▶'}
          </button>
        </div>
        
        {weeklyGoalsExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 pb-4 animate-fadeIn">
            {weeklyGoals.map(goal => (
              <WeeklyGoalItem key={goal.id} goal={goal} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyGoalsSection;
