import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

interface StatTagProps {
  label: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  rounded?: 'full' | 'md' | 'lg';
}

const StatTag: React.FC<StatTagProps> = ({
  label,
  color = 'blue',
  size = 'md',
  className = '',
  rounded = 'md'
}) => {
  const { theme } = useTheme();
  
  const getTagBgColor = () => {
    switch (color) {
      case 'purple':
        return 'bg-purple-800';
      case 'blue':
        return 'bg-blue-800';
      case 'teal':
        return 'bg-teal-800';
      case 'amber':
        return 'bg-amber-800';
      case 'red':
        return 'bg-red-800';
      case 'green':
        return 'bg-green-800';
      default:
        return 'bg-gray-800';
    }
  };

  const getTagTextColor = () => {
    switch (color) {
      case 'purple':
      case 'blue':
      case 'teal':
      case 'amber':
      case 'red':
      case 'green':
      default:
        return 'text-white font-bold';
    }
  };

  const getTagSize = () => {
    switch (size) {
      case 'sm': return 'px-2 py-0.5 text-xs';
      case 'md': return 'px-3 py-1 text-sm';
      case 'lg': return 'px-4 py-1.5 text-base';
      default: return 'px-3 py-1 text-sm';
    }
  };

  const getRoundedClass = () => {
    switch (rounded) {
      case 'full': return 'rounded-full';
      case 'md': return 'rounded-md';
      case 'lg': return 'rounded-lg';
      default: return 'rounded-md';
    }
  };

  return (
    <span 
      className={`inline-block ${getTagSize()} ${getTagBgColor()} ${getTagTextColor()} ${getRoundedClass()} ${className}`}
    >
      {label}
    </span>
  );
};

export default StatTag; 