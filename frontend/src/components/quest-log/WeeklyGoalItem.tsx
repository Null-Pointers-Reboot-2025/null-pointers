import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { WeeklyGoal } from './types';
import { getCategoryColor, getTagColor, getCategoryDisplay } from './questUtils';

interface WeeklyGoalItemProps {
  goal: WeeklyGoal;
}

// Custom category display component
const CategoryDisplay: React.FC<{category: string}> = ({ category }) => {
  if (category === 'emotional') {
    return (
      <div className="text-center">
        <span className="block">Emotional</span>
        <span className="block">Behavioral</span>
      </div>
    );
  }
  
  return <span>{getCategoryDisplay(category)}</span>;
};

const WeeklyGoalItem: React.FC<WeeklyGoalItemProps> = ({ goal }) => {
  const { theme, getThemeClasses } = useTheme();

  return (
    <div 
      className={`${getThemeClasses('surface')} rounded-lg p-4 border ${getThemeClasses('border')}`}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className={`${getThemeClasses('heading')} ${getThemeClasses('text')} text-lg`}>{goal.title}</h3>
            <span className={`text-xs px-2 py-0.5 rounded ${getCategoryColor(goal.category)}`}>
              <CategoryDisplay category={goal.category} />
            </span>
          </div>
          <p className={`${getThemeClasses('text')} text-sm mb-2`}>{goal.description}</p>
          <div className="flex flex-wrap gap-2">
            {goal.tags.map(tag => (
              <span key={tag} className={`text-xs px-2 py-0.5 rounded ${getTagColor(tag)} font-medium`}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="text-right">
          <span className="text-blue-900 dark:text-white text-base font-bold">{goal.totalXP} XP</span>
          <p className={`${getThemeClasses('text')} text-xs`}>{Math.round(goal.progress)}% Complete</p>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className={`w-full ${theme === 'Light Mode' ? 'bg-slate-200' : 'bg-gray-700'} rounded-full h-2.5 mt-2`}>
        <div 
          className="bg-blue-600 h-2.5 rounded-full" 
          style={{ width: `${goal.progress}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between items-center mt-2">
        <span className={`${getThemeClasses('text')} text-xs`}>
          {Math.ceil(goal.requiredQuestCount * (goal.progress / 100))}/{goal.requiredQuestCount} Quests
        </span>
        <span className={`${theme === 'Light Mode' ? 'bg-slate-200 text-slate-700' : 'bg-gray-700 text-white'} text-xs px-2 py-1 rounded font-medium`}>Weekly Goal</span>
      </div>
    </div>
  );
};

export default WeeklyGoalItem;
