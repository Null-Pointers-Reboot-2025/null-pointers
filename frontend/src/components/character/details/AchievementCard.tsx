import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

export interface AchievementData {
  id: string;
  title: string;
  description: string;
  progress: number;
  xpReward: number;
  unlocked: boolean;
  category: string;
}

interface AchievementCardProps {
  achievement: AchievementData;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const { theme } = useTheme();
  
  // Helper function for category colors
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'physical': return 'text-white bg-purple-800 font-bold';
      case 'mental': return 'text-white bg-blue-800 font-bold';
      case 'emotional': return 'text-white bg-teal-800 font-bold';
      case 'discipline': return 'text-white bg-indigo-800 font-bold';
      case 'meta':
      case 'system': 
      default: return 'text-white bg-amber-800 font-bold';
    }
  };

  return (
    <div className={`p-3 border rounded-lg ${achievement.unlocked 
      ? 'border-green-500/30 bg-green-500/5' 
      : theme === 'Light Mode' ? 'border-slate-300' : 'border-gray-700'
    }`}>
      <div className="flex items-start">
        <div className={`w-10 h-10 ${achievement.unlocked 
          ? 'bg-green-900/30 text-green-400' 
          : theme === 'Light Mode' ? 'bg-slate-200 text-slate-500' : 'bg-gray-800 text-gray-400'
        } rounded-full flex items-center justify-center text-xl mr-3`}>
          {achievement.unlocked ? '🏆' : '🔒'}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-black">
            {achievement.title}
          </h3>
          <p className="text-sm text-gray-900 font-medium mb-2">
            {achievement.description}
          </p>
          
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center">
              <span className={`px-2 py-0.5 rounded text-xs ${getCategoryColor(achievement.category)}`}>
                {achievement.category.charAt(0).toUpperCase() + achievement.category.slice(1)}
              </span>
            </div>
            <div>
              <span className="text-black font-bold">+{achievement.xpReward} XP</span>
            </div>
          </div>
          
          {!achievement.unlocked && (
            <div className="mt-2">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-600"
                  style={{ width: `${achievement.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-black font-medium">
                <span>Progress</span>
                <span>{achievement.progress}%</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AchievementCard; 