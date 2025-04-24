import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

export interface RecoveryMoment {
  date: string;
  duration: number; // minutes
  activity: string;
  xpGained: number;
}

interface RecoveryMomentItemProps {
  moment: RecoveryMoment;
  accentColor?: string;
}

export const RecoveryMomentItem: React.FC<RecoveryMomentItemProps> = ({
  moment,
  accentColor = 'teal'
}) => {
  const { theme } = useTheme();

  return (
    <div className="p-2 border border-gray-800 rounded-lg flex justify-between items-center bg-white/80">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-teal-800 rounded-full flex items-center justify-center mr-3 text-white font-bold">
          <span className="text-sm">{moment.duration}'</span>
        </div>
        <div>
          <div className="font-bold text-black">{moment.activity}</div>
          <div className="text-xs text-black font-medium">
            {new Date(moment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
        </div>
      </div>
      <div className="text-black font-bold">+{moment.xpGained} XP</div>
    </div>
  );
};

export default RecoveryMomentItem; 