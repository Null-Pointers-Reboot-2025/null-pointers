import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

interface BalanceRatioItemProps {
  statA: string;
  statB: string;
  ratio: number;
  idealRatio?: number;
  warningThreshold?: number;
  maxDisplayRatio?: number;
  feedbackGood?: string;
  feedbackBad?: string;
}

const BalanceRatioItem: React.FC<BalanceRatioItemProps> = ({
  statA,
  statB,
  ratio,
  idealRatio = 1,
  warningThreshold = 0.2,
  maxDisplayRatio = 2,
  feedbackGood = 'Good balance',
  feedbackBad
}) => {
  const { getThemeClasses, theme } = useTheme();
  
  const isImbalanced = Math.abs(ratio - idealRatio) > warningThreshold;
  
  // Determine which stat needs attention if imbalanced
  const getImbalanceMessage = () => {
    if (!isImbalanced) return feedbackGood;
    
    if (!feedbackBad) {
      if (ratio > idealRatio) {
        return `Imbalanced - add ${statB}`;
      } else {
        return `Imbalanced - add ${statA}`;
      }
    }
    
    return feedbackBad;
  };
  
  // Color based on balance status
  const getStatusColor = () => {
    if (!isImbalanced) {
      return 'bg-green-600';
    } else if (Math.abs(ratio - idealRatio) > warningThreshold * 2) {
      return 'bg-red-600';
    } else {
      return 'bg-amber-600';
    }
  };
  
  // Text color for the ratio
  const getTextColor = () => {
    if (!isImbalanced) {
      return 'text-black font-bold';
    } else if (Math.abs(ratio - idealRatio) > warningThreshold * 2) {
      return 'text-black font-bold';
    } else {
      return 'text-black font-bold';
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-black font-bold">{statA} : {statB}</span>
        <span className={getTextColor()}>
          {ratio.toFixed(1)} : 1
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${getStatusColor()}`}
          style={{ width: `${Math.min(ratio / maxDisplayRatio, 1) * 100}%` }}
        ></div>
      </div>
      <p className="text-xs text-black font-bold mt-1">
        {getImbalanceMessage()}
      </p>
    </div>
  );
};

export default BalanceRatioItem; 