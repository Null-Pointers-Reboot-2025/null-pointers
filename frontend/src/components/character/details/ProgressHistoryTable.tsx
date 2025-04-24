import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

export interface StatHistory {
  period: string;
  physical: number;
  mental: number;
  emotional: number;
  overall: number;
}

interface ProgressHistoryTableProps {
  statHistory: StatHistory[];
  insights?: string[];
}

export const ProgressHistoryTable: React.FC<ProgressHistoryTableProps> = ({
  statHistory,
  insights = []
}) => {
  const { theme } = useTheme();
  
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-black font-bold text-sm">
              <th className="pb-2 font-medium">Period</th>
              <th className="pb-2 font-medium">Physical</th>
              <th className="pb-2 font-medium">Mental</th>
              <th className="pb-2 font-medium">Emotional</th>
              <th className="pb-2 font-medium">Overall</th>
            </tr>
          </thead>
          <tbody>
            {statHistory.map((period, index) => (
              <tr key={index} className={`border-t ${theme === 'Light Mode' ? 'border-slate-200' : 'border-gray-700'}`}>
                <td className="py-3 pr-4 font-bold text-black">{period.period}</td>
                <td className="py-3 pr-4">
                  <div className="flex items-center">
                    <span className="w-8 font-bold text-purple-900">{period.physical}%</span>
                    <div className={`ml-2 w-16 h-2 ${theme === 'Light Mode' ? 'bg-slate-200' : 'bg-gray-800'} rounded-full overflow-hidden`}>
                      <div 
                        className="h-full bg-purple-700"
                        style={{ width: `${period.physical}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="py-3 pr-4">
                  <div className="flex items-center">
                    <span className="w-8 font-bold text-blue-900">{period.mental}%</span>
                    <div className={`ml-2 w-16 h-2 ${theme === 'Light Mode' ? 'bg-slate-200' : 'bg-gray-800'} rounded-full overflow-hidden`}>
                      <div 
                        className="h-full bg-blue-700"
                        style={{ width: `${period.mental}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="py-3 pr-4">
                  <div className="flex items-center">
                    <span className="w-8 font-bold text-teal-900">{period.emotional}%</span>
                    <div className={`ml-2 w-16 h-2 ${theme === 'Light Mode' ? 'bg-slate-200' : 'bg-gray-800'} rounded-full overflow-hidden`}>
                      <div 
                        className="h-full bg-teal-700"
                        style={{ width: `${period.emotional}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex items-center">
                    <span className="w-8 font-bold text-amber-900">{period.overall}%</span>
                    <div className={`ml-2 w-16 h-2 ${theme === 'Light Mode' ? 'bg-slate-200' : 'bg-gray-800'} rounded-full overflow-hidden`}>
                      <div 
                        className="h-full bg-amber-700"
                        style={{ width: `${period.overall}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {insights.length > 0 && (
        <div className="space-y-3 mt-4">
          {insights.map((insight, index) => (
            <div 
              key={index} 
              className={`p-3 border ${theme === 'Light Mode' 
                ? 'border-slate-300 bg-slate-100' 
                : 'border-gray-700 bg-gray-800/50'
              } rounded-lg`}
            >
              <p className="text-sm">
                <span className="font-bold text-black">
                  {index === 0 ? 'Insight:' : index === 1 ? 'Long-term Analysis:' : `Analysis ${index + 1}:`}
                </span> <span className="text-gray-900 font-semibold">{insight}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgressHistoryTable; 