import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

export interface WorkTimeData {
  date: string;
  deepWork: number; // in minutes
  lightTasks: number; // in minutes
}

interface WorkTimeBalanceProps {
  workTimeData: WorkTimeData[];
  accentColor?: string;
}

export const WorkTimeBalance: React.FC<WorkTimeBalanceProps> = ({
  workTimeData,
  accentColor = 'blue'
}) => {
  const { theme } = useTheme();
  
  // Calculate total deep work and light task hours for the week
  const totalDeepWork = workTimeData.reduce((sum, day) => sum + day.deepWork, 0) / 60;
  const totalLightTasks = workTimeData.reduce((sum, day) => sum + day.lightTasks, 0) / 60;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="text-black font-bold">{totalDeepWork.toFixed(1)} hrs</span>
            <span className="text-black font-medium text-sm ml-2">Deep Work</span>
          </div>
          <div>
            <span className="text-black font-medium text-sm mr-2">Light Tasks</span>
            <span className="text-black font-bold">{totalLightTasks.toFixed(1)} hrs</span>
          </div>
        </div>
        
        <div className="h-8 bg-gray-200 rounded-lg overflow-hidden flex">
          <div 
            className="h-full bg-blue-600 flex items-center justify-center text-xs text-white font-bold"
            style={{ width: `${(totalDeepWork / (totalDeepWork + totalLightTasks)) * 100}%` }}
          >
            {Math.round((totalDeepWork / (totalDeepWork + totalLightTasks)) * 100)}%
          </div>
          <div 
            className="h-full bg-gray-600 flex items-center justify-center text-xs text-white font-bold"
            style={{ width: `${(totalLightTasks / (totalDeepWork + totalLightTasks)) * 100}%` }}
          >
            {Math.round((totalLightTasks / (totalDeepWork + totalLightTasks)) * 100)}%
          </div>
        </div>
        
        <p className="text-sm text-black font-medium mt-2">
          Deep work is {totalDeepWork > totalLightTasks ? 'outpacing' : 'behind'} light tasks this week
          {totalDeepWork > totalLightTasks ? ' 👍' : ' - aim for 50/50'}
        </p>
      </div>
      
      <div className="space-y-2">
        {workTimeData.map((day, index) => (
          <div key={index} className="flex items-center">
            <div className="w-24 text-sm text-black font-bold">
              {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
            <div className="flex-1 h-4 bg-gray-200 rounded-lg overflow-hidden flex">
              <div 
                className="h-full bg-blue-600"
                style={{ width: `${(day.deepWork / (day.deepWork + day.lightTasks)) * 100}%` }}
              ></div>
              <div 
                className="h-full bg-gray-600"
                style={{ width: `${(day.lightTasks / (day.deepWork + day.lightTasks)) * 100}%` }}
              ></div>
            </div>
            <div className="w-16 text-right text-xs text-black font-bold">
              {(day.deepWork / 60).toFixed(1)}h
            </div>
          </div>
        ))}
        <div className="flex justify-between pt-1 text-xs text-black font-bold">
          <span>Deep Work</span>
          <span>Light Tasks</span>
        </div>
      </div>
    </div>
  );
};

export default WorkTimeBalance; 