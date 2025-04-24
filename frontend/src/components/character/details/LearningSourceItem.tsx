import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

export interface LearningSource {
  name: string;
  lastUsed: string;
  frequency: string;
  xpGained: number;
}

interface LearningSourceItemProps {
  source: LearningSource;
  accentColor?: string;
}

export const LearningSourceItem: React.FC<LearningSourceItemProps> = ({
  source,
  accentColor = 'blue'
}) => {
  const { theme } = useTheme();
  
  return (
    <div className={`flex justify-between items-center p-3 border ${theme === 'Light Mode' ? 'border-slate-300' : 'border-gray-700'} rounded-lg`}>
      <div>
        <h3 className="font-bold text-black">{source.name}</h3>
        <div className="flex mt-1">
          <span className="text-xs bg-blue-900 text-white font-bold px-2 py-0.5 rounded mr-2">
            {source.frequency}
          </span>
          <span className="text-xs text-black font-medium">
            Last: {new Date(source.lastUsed).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>
      <div className="text-right">
        <div className="text-black font-bold">+{source.xpGained} XP</div>
        <div className="text-xs text-black font-medium">Total gain</div>
      </div>
    </div>
  );
};

export default LearningSourceItem; 