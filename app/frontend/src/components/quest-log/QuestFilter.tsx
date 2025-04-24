import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { CoreCategory } from '../quest-log/types';

interface QuestFilterProps {
  filter: 'all' | 'active' | 'completed' | CoreCategory;
  setFilter: (filter: 'all' | 'active' | 'completed' | CoreCategory) => void;
}

const QuestFilter: React.FC<QuestFilterProps> = ({ filter, setFilter }) => {
  const { getThemeClasses } = useTheme();

  return (
    <div className={`${getThemeClasses('surface')} p-4 flex flex-wrap justify-center gap-2`}>
      <button 
        onClick={() => setFilter('all')}
        className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-blue-600 text-white' : `${getThemeClasses('surface')} ${getThemeClasses('text')}`}`}
      >
        All Quests
      </button>
      <button 
        onClick={() => setFilter('active')}
        className={`px-4 py-2 rounded-lg ${filter === 'active' ? 'bg-blue-600 text-white' : `${getThemeClasses('surface')} ${getThemeClasses('text')}`}`}
      >
        Active
      </button>
      <button 
        onClick={() => setFilter('completed')}
        className={`px-4 py-2 rounded-lg ${filter === 'completed' ? 'bg-blue-600 text-white' : `${getThemeClasses('surface')} ${getThemeClasses('text')}`}`}
      >
        Completed
      </button>
      <button 
        onClick={() => setFilter('physical')}
        className={`px-4 py-2 rounded-lg ${filter === 'physical' ? 'bg-purple-600 text-white' : `${getThemeClasses('surface')} ${getThemeClasses('text')}`}`}
      >
        Physical
      </button>
      <button 
        onClick={() => setFilter('mental')}
        className={`px-4 py-2 rounded-lg ${filter === 'mental' ? 'bg-blue-600 text-white' : `${getThemeClasses('surface')} ${getThemeClasses('text')}`}`}
      >
        Mental
      </button>
      <button 
        onClick={() => setFilter('emotional')}
        className={`px-4 py-2 rounded-lg ${filter === 'emotional' ? 'bg-teal-600 text-white' : `${getThemeClasses('surface')} ${getThemeClasses('text')}`}`}
      >
        Emotional
      </button>
      <button 
        onClick={() => setFilter('finance')}
        className={`px-4 py-2 rounded-lg ${filter === 'finance' ? 'bg-green-600 text-white' : `${getThemeClasses('surface')} ${getThemeClasses('text')}`}`}
      >
        Finance
      </button>
      <button 
        onClick={() => setFilter('recovery')}
        className={`px-4 py-2 rounded-lg ${filter === 'recovery' ? 'bg-orange-600 text-white' : `${getThemeClasses('surface')} ${getThemeClasses('text')}`}`}
      >
        Recovery
      </button>
      <button 
        onClick={() => setFilter('calm')}
        className={`px-4 py-2 rounded-lg ${filter === 'calm' ? 'bg-indigo-600 text-white' : `${getThemeClasses('surface')} ${getThemeClasses('text')}`}`}
      >
        Calm Mode
      </button>
    </div>
  );
};

export default QuestFilter; 