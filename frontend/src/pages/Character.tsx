import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

// Define interfaces for our statistics
interface StatProgress {
  name: string;
  value: number; // 0-100
  description: string;
  xp: number;
}

interface StatCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  stats: StatProgress[];
}

const Character: React.FC = () => {
  const { getThemeClasses, theme } = useTheme();
  // State for character data
  const [categories] = useState<StatCategory[]>([
    {
      id: 'physical',
      name: 'Physical',
      icon: '🏋️‍♂️',
      color: 'purple',
      stats: [
        {
          name: 'Strength',
          value: 65,
          description: 'Lifting, resistance workouts, heavy effort',
          xp: 650
        },
        {
          name: 'Endurance',
          value: 40,
          description: 'Cardio, consistency, long workouts',
          xp: 400
        },
        {
          name: 'Agility',
          value: 25,
          description: 'Mobility, flexibility, speed training',
          xp: 250
        },
        {
          name: 'Vitality',
          value: 75,
          description: 'Sleep, hydration, recovery habits',
          xp: 750
        }
      ]
    },
    {
      id: 'mental',
      name: 'Mental',
      icon: '🧠',
      color: 'blue',
      stats: [
        {
          name: 'Focus',
          value: 60,
          description: 'Deep work, no distractions, mindful attention',
          xp: 600
        },
        {
          name: 'Discipline',
          value: 80,
          description: 'Sticking to routines, completing streaks',
          xp: 800
        },
        {
          name: 'Creativity',
          value: 45,
          description: 'Writing, art, brainstorming, novel solutions',
          xp: 450
        },
        {
          name: 'Knowledge',
          value: 70,
          description: 'Studying, learning, reading, course progression',
          xp: 700
        }
      ]
    },
    {
      id: 'emotional',
      name: 'Emotional / Behavioral',
      icon: '🧘',
      color: 'teal',
      stats: [
        {
          name: 'Resilience',
          value: 55,
          description: 'Bouncing back from missed days, tough check-ins',
          xp: 550
        },
        {
          name: 'Clarity',
          value: 35,
          description: 'Journaling, reflection, mood regulation',
          xp: 350
        },
        {
          name: 'Presence',
          value: 30,
          description: 'Meditation, breathwork, screen-free time',
          xp: 300
        },
        {
          name: 'Charisma',
          value: 50,
          description: 'Social actions, confidence building, speaking practice',
          xp: 500
        }
      ]
    },
    {
      id: 'financial',
      name: 'Financial',
      icon: '💸',
      color: 'green',
      stats: [
        {
          name: 'Budgeting',
          value: 65,
          description: 'Planned and stuck to a weekly budget',
          xp: 650
        },
        {
          name: 'Saving',
          value: 40,
          description: 'Added to emergency fund or micro-savings',
          xp: 400
        },
        {
          name: 'Spending Awareness',
          value: 50,
          description: 'Reflected on non-essential buys',
          xp: 500
        },
        {
          name: 'Financial Literacy',
          value: 30,
          description: 'Learned a finance concept or completed an article',
          xp: 300
        }
      ]
    },
    {
      id: 'system',
      name: 'System-Level (Meta)',
      icon: '🧬',
      color: 'amber',
      stats: [
        {
          name: 'XP',
          value: 68, // Overall XP percentage to next level
          description: 'Global progress across all stats',
          xp: 6800
        },
        {
          name: 'Ascend Level',
          value: 100, // Always full as this is a level indicator, not progress
          description: 'Current tier based on total XP: Level 7',
          xp: 7000
        },
        {
          name: 'Mastery Tracks',
          value: 42,
          description: 'Per-skill questlines progress (3/7 completed)',
          xp: 4200
        }
      ]
    }
  ]);

  // Calculate total XP and level
  const totalXP = categories.reduce(
    (sum, category) => sum + category.stats.reduce((catSum, stat) => catSum + stat.xp, 0),
    0
  );
  
  const level = Math.floor(totalXP / 1000) + 1;
  const xpToNextLevel = level * 1000;
  const currentLevelXP = totalXP % 1000;
  const progressToNextLevel = (currentLevelXP / 1000) * 100;

  // Function to get color class based on category
  const getCategoryColorClass = (color: string) => {
    switch (color) {
      case 'purple': return `${getThemeClasses('primary')} from-purple-500 to-purple-600`;
      case 'blue': return `${getThemeClasses('primary')} from-blue-500 to-blue-600`;
      case 'teal': return `${getThemeClasses('primary')} from-teal-500 to-teal-600`;
      case 'amber': return `${getThemeClasses('primary')} from-amber-500 to-amber-600`;
      case 'green': return `${getThemeClasses('primary')} from-green-500 to-green-600`;
      default: return `${getThemeClasses('primary')} from-blue-500 to-blue-600`;
    }
  };
  
  const getCategoryBgClass = (color: string) => {
    switch (color) {
      case 'purple': return `${getThemeClasses('surface')} border ${getThemeClasses('border')} bg-purple-500/10`;
      case 'blue': return `${getThemeClasses('surface')} border ${getThemeClasses('border')} bg-blue-500/10`;
      case 'teal': return `${getThemeClasses('surface')} border ${getThemeClasses('border')} bg-teal-500/10`;
      case 'amber': return `${getThemeClasses('surface')} border ${getThemeClasses('border')} bg-amber-500/10`;
      case 'green': return `${getThemeClasses('surface')} border ${getThemeClasses('border')} bg-green-500/10`;
      default: return `${getThemeClasses('surface')} border ${getThemeClasses('border')} bg-blue-500/10`;
    }
  };
  
  const getCategoryTextClass = (color: string) => {
    // Check if we're using the Lloyds Bank theme which has a green background
    const isLloydsTheme = theme === 'Lloyds Bank';
    
    switch (color) {
      case 'purple': return `${getThemeClasses('primary')} ${isLloydsTheme ? 'text-purple-900 font-bold' : 'text-purple-500 font-semibold'}`;
      case 'blue': return `${getThemeClasses('primary')} ${isLloydsTheme ? 'text-blue-900 font-bold' : 'text-blue-500 font-semibold'}`;
      case 'teal': return `${getThemeClasses('primary')} ${isLloydsTheme ? 'text-teal-900 font-bold' : 'text-teal-500 font-semibold'}`;
      case 'amber': return `${getThemeClasses('primary')} ${isLloydsTheme ? 'text-amber-900 font-bold' : 'text-amber-500 font-semibold'}`;
      case 'green': return `${getThemeClasses('primary')} ${isLloydsTheme ? 'text-emerald-900 font-bold' : 'text-green-500 font-semibold'}`;
      default: return `${getThemeClasses('primary')} ${isLloydsTheme ? 'text-blue-900 font-bold' : 'text-blue-500 font-semibold'}`;
    }
  };

  return (
    <div className={`flex flex-col min-h-screen ${getThemeClasses('background')} ${getThemeClasses('text')} pb-navigation`}>
      {/* Header */}
      <header className={`${getThemeClasses('surface')} p-4 border-b ${getThemeClasses('border')}`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className={`${theme === 'Lloyds Bank' ? 'text-black' : getThemeClasses('primary')} ${getThemeClasses('heading')} text-xl font-bold`}>Character Stats</h1>
          <div className="flex items-center space-x-1">
            <span className={`${theme === 'Lloyds Bank' ? 'text-black' : getThemeClasses('primary')} ${getThemeClasses('heading')} text-lg font-bold`}>Lv.{level}</span>
            <div className={`w-16 h-4 ${theme === 'Light Mode' ? 'bg-slate-200' : 'bg-gray-800'} rounded-full overflow-hidden ml-2`}>
              <div 
                className={`h-full bg-gradient-to-r ${getThemeClasses('primary')} from-amber-500 to-amber-400`}
                style={{ width: `${progressToNextLevel}%` }}
              ></div>
            </div>
            <span className={`text-xs ${theme === 'Lloyds Bank' ? 'text-black font-semibold' : getThemeClasses('textSecondary')}`}>{currentLevelXP}/{xpToNextLevel}XP</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-4 pt-6 max-w-4xl mx-auto w-full">
        {/* Character Summary Card */}
        <div className={`${getThemeClasses('surface')} rounded-lg shadow-lg p-4 mb-6 border ${getThemeClasses('border')}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-16 h-16 rounded-full ${getThemeClasses('primary')} flex items-center justify-center text-2xl`}>
                👤
              </div>
              <div className="ml-4">
                <h2 className={`${theme === 'Lloyds Bank' ? 'text-black' : getThemeClasses('text')} ${getThemeClasses('heading')} text-xl font-bold`}>Your Character</h2>
                <p className={`${theme === 'Lloyds Bank' ? 'text-black font-semibold' : getThemeClasses('textSecondary')}`}>Total XP: {totalXP}</p>
              </div>
            </div>
            <div className="text-right">
              <div className={`${theme === 'Lloyds Bank' ? 'text-black font-semibold' : getThemeClasses('textSecondary')} text-sm mb-1`}>Overall Progress</div>
              <div className={`w-40 h-3 ${theme === 'Light Mode' ? 'bg-slate-200' : 'bg-gray-800'} rounded-full overflow-hidden`}>
                <div 
                  className={`h-full bg-gradient-to-r ${getThemeClasses('primary')} from-blue-600 to-purple-600`}
                  style={{ width: `${Math.round(totalXP / 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Stat Categories */}
        <div className="space-y-6 mb-6">
          {categories.map(category => (
            <div key={category.id} className={`${getThemeClasses('surface')} rounded-lg shadow-lg border ${getThemeClasses('border')} overflow-hidden`}>
              {/* Category Header */}
              <div className={`p-4 ${getCategoryBgClass(category.color)} flex items-center justify-between`}>
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{category.icon}</span>
                  <h2 className={`${theme === 'Lloyds Bank' ? 'text-black' : getCategoryTextClass(category.color)} ${getThemeClasses('heading')} font-bold`}>{category.name}</h2>
                </div>
                <Link to={`/character/${category.id}`} className="bg-gray-900 text-white px-3 py-1.5 rounded-md hover:bg-gray-800 font-bold text-sm flex items-center transition-colors duration-200 shadow-md">
                  View Details
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
              
              {/* Stats List */}
              <div className="p-4 space-y-4">
                {category.stats.map(stat => (
                  <div key={stat.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className={`${theme === 'Lloyds Bank' ? 'text-black' : getThemeClasses('text')} ${getThemeClasses('heading')} font-medium`}>{stat.name}</h3>
                        <p className={`${theme === 'Lloyds Bank' ? 'text-black' : getThemeClasses('textSecondary')} text-sm`}>{stat.description}</p>
                      </div>
                      <div className="text-right">
                        <div className={`${theme === 'Lloyds Bank' ? 'text-black font-bold' : getThemeClasses('text')} font-medium`}>{stat.value}%</div>
                        <div className={`${theme === 'Lloyds Bank' ? 'text-black font-semibold' : getThemeClasses('textSecondary')} text-sm`}>{stat.xp} XP</div>
                      </div>
                    </div>
                    <div className={`h-2 ${theme === 'Light Mode' ? 'bg-slate-200' : 'bg-gray-800'} rounded-full overflow-hidden`}>
                      <div 
                        className={`h-full bg-gradient-to-r ${getCategoryColorClass(category.color)}`}
                        style={{ width: `${stat.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Character;
