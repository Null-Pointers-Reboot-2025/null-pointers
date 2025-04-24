import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { useStatColor } from './useStatColor';

export interface JournalEntry {
  date: string;
  insight: string;
  relatedStat: string;
}

interface JournalInsightCardProps {
  entry: JournalEntry;
}

export const JournalInsightCard: React.FC<JournalInsightCardProps> = ({ entry }) => {
  const { theme } = useTheme();
  const { getStatColor } = useStatColor();
  
  // Get background and text colors for stat badge based on the related stat
  const getStatBadgeClasses = (stat: string) => {
    return `bg-${getStatColorName(stat)}-800 text-white font-bold`;
  };
  
  // Get color name based on stat
  const getStatColorName = (stat: string) => {
    switch (stat) {
      case 'Resilience': return 'blue';
      case 'Clarity': return 'purple';
      case 'Presence': return 'teal';
      case 'Charisma': return 'amber';
      default: return 'teal';
    }
  };

  return (
    <div className="p-4 border border-gray-800 rounded-lg bg-white/80">
      <div className="flex justify-between items-start mb-2">
        <span className={`px-2 py-0.5 rounded text-xs ${getStatBadgeClasses(entry.relatedStat)}`}>
          {entry.relatedStat}
        </span>
        <span className="text-xs text-black font-bold">
          {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
      </div>
      <p className="italic text-black font-medium border-l-2 border-gray-900 pl-3">
        "{entry.insight}"
      </p>
    </div>
  );
};

export default JournalInsightCard; 