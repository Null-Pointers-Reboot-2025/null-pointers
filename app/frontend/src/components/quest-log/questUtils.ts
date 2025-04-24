import { StatTag } from './types';

export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy': return 'text-[#007A33]';  // Dark Green
    case 'medium': return 'text-[#FFA500]'; // Orange
    case 'hard': return 'text-[#FF3B30]';   // Red
    default: return 'text-[#1A1A1A]';       // Dark Gray
  }
};

export const getCategoryColor = (category: string) => {
  switch (category) {
    case 'physical': return 'bg-[#007A33] text-white';    // Dark Green
    case 'mental': return 'bg-[#006629] text-white';      // Darker Green
    case 'emotional': return 'bg-[#A4DE7C] text-[#000000]'; // Light Green
    case 'finance': return 'bg-[#FFA500] text-white';      // Orange
    case 'calm': return 'bg-[#D2F4C3] text-[#000000]';     // Lighter Green
    case 'recovery': return 'bg-[#BFFF00] text-[#000000]'; // Lime Green
    default: return 'bg-[#E5E5E5] text-[#000000]';         // Light Gray
  }
};

export const getCategoryDisplay = (category: string) => {
  switch (category) {
    case 'physical': return 'Physical';
    case 'mental': return 'Mental';
    case 'emotional': return 'Emotional';
    case 'finance': return 'Finance';
    case 'calm': return 'Calm';
    case 'recovery': return 'Recovery';
    default: return category.charAt(0).toUpperCase() + category.slice(1);
  }
};

export const getTagColor = (tag: StatTag) => {
  // Group tags by their category and assign appropriate colors
  const physicalTags = ['Strength', 'Endurance', 'Agility', 'Vitality'];
  const mentalTags = ['Focus', 'Discipline', 'Creativity', 'Knowledge'];
  const emotionalTags = ['Resilience', 'Clarity', 'Presence', 'Charisma'];

  if (physicalTags.includes(tag)) {
    return 'bg-[#BFFF00] text-[#000000]';  // Lime Green
  } else if (mentalTags.includes(tag)) {
    return 'bg-[#A4DE7C] text-[#000000]';  // Light Green
  } else if (emotionalTags.includes(tag)) {
    return 'bg-[#D2F4C3] text-[#000000]';  // Lighter Green
  }
  return 'bg-[#E5E5E5] text-[#000000]';    // Light Gray
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-[#007A33] text-white';    // Dark Green
    case 'completed': return 'bg-[#A4DE7C] text-[#000000]'; // Light Green
    case 'failed': return 'bg-[#FF3B30] text-white';    // Red
    default: return 'bg-[#E5E5E5] text-[#000000]';      // Light Gray
  }
};
