import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

export interface MilestonePoint {
  label: string;
  period: string;
  value: number;
  description: string;
  isCurrent?: boolean;
}

interface JourneyTimelineProps {
  milestones: MilestonePoint[];
  accentColor?: string;
  footnote?: string;
  footnoteClassName?: string;
}

export const JourneyTimeline: React.FC<JourneyTimelineProps> = ({
  milestones,
  accentColor = 'amber',
  footnote,
  footnoteClassName = ''
}) => {
  const { theme } = useTheme();
  
  if (milestones.length < 2) {
    return <div>Not enough data to display timeline.</div>;
  }
  
  return (
    <div className="relative pt-6 pb-12">
      {/* Timeline line */}
      <div className="absolute left-0 right-0 h-2 top-16 bg-gray-300"></div>
      
      {/* Milestone points */}
      <div className="relative flex justify-between">
        {milestones.map((milestone, index) => (
          <div key={index} className={`flex flex-col items-center w-1/${milestones.length} relative`}>
            <div className="z-10 w-6 h-6 rounded-full bg-white border-2 border-black flex items-center justify-center">
              <div className={`w-2 h-2 rounded-full ${
                milestone.isCurrent ? `bg-red-500` : `bg-blue-500`
              }`}></div>
            </div>
            <div className="text-sm mt-2 text-center">
              <div className="font-bold text-black">
                {milestone.label}
              </div>
              <div className="text-xs font-semibold text-gray-900">
                {milestone.period}
              </div>
              <div className="text-black font-bold mt-1">
                {milestone.value}%
              </div>
            </div>
            <div className="mt-3 text-xs font-semibold text-gray-900 text-center">
              {milestone.description}
            </div>
          </div>
        ))}
      </div>
      
      {/* Growth curve */}
      <div className="relative mt-8 h-16">
        <svg className="w-full h-full" viewBox="0 0 100 30">
          <path 
            d="M0,30 Q10,29 20,25 T40,15 T60,8 T80,4 T100,0" 
            fill="none" 
            stroke={`rgba(${
              accentColor === 'amber' ? '245, 158, 11' : 
              accentColor === 'blue' ? '59, 130, 246' : 
              accentColor === 'teal' ? '20, 184, 166' : 
              accentColor === 'purple' ? '168, 85, 247' : 
              '245, 158, 11'
            }, 0.5)`} 
            strokeWidth="2"
          />
        </svg>
      </div>
      
      {footnote && (
        <div className={`text-sm font-semibold text-gray-900 text-center ${footnoteClassName}`}>
          {footnote}
        </div>
      )}
    </div>
  );
};

export default JourneyTimeline; 