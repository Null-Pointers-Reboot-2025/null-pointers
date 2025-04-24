import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

export interface ResilienceTrendData {
  previous: number; // days
  current: number; // days
  improvement: number; // percent
  period: string;
}

interface ResilienceTrendChartProps {
  data: ResilienceTrendData;
}

export const ResilienceTrendChart: React.FC<ResilienceTrendChartProps> = ({ data }) => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center h-52 relative bg-white/80 p-4 rounded-lg border border-gray-800">
      <div className="flex w-full justify-center items-end h-36">
        {/* Previous */}
        <div className="flex flex-col items-center mx-4">
          <div className="text-center text-black font-bold mb-2">
            {data.previous} days
          </div>
          <div className="w-16 bg-red-600 rounded-t-lg" 
               style={{ height: `${(data.previous / 7) * 100}px` }}></div>
          <div className="text-sm text-black font-bold mt-2">Previous</div>
        </div>
        
        {/* Current */}
        <div className="flex flex-col items-center mx-4">
          <div className="text-center text-black font-bold mb-2">
            {data.current} days
          </div>
          <div className="w-16 bg-green-600 rounded-t-lg" 
               style={{ height: `${(data.current / 7) * 100}px` }}></div>
          <div className="text-sm text-black font-bold mt-2">Current</div>
        </div>
      </div>
      
      <p className="text-center mt-4 text-black font-medium">
        Average recovery time reduced by <span className="text-green-800 font-bold">{data.improvement}%</span><br />
        over the last {data.period}
      </p>
    </div>
  );
};

export default ResilienceTrendChart; 