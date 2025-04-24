import { StatTag } from './types';

export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy': return 'text-green-400';
    case 'medium': return 'text-yellow-400';
    case 'hard': return 'text-red-400';
    default: return 'text-gray-400';
  }
};

export const getCategoryColor = (category: string) => {
  switch (category) {
    case 'physical': return 'bg-purple-700 text-white';
    case 'mental': return 'bg-blue-700 text-white';
    case 'emotional': return 'bg-teal-700 text-white';
    case 'finance': return 'bg-emerald-700 text-white';
    case 'calm': return 'bg-sky-700 text-white';
    case 'recovery': return 'bg-amber-700 text-white';
    default: return 'bg-gray-700 text-white';
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
    return 'bg-purple-700 text-white';
  } else if (mentalTags.includes(tag)) {
    return 'bg-blue-700 text-white';
  } else if (emotionalTags.includes(tag)) {
    return 'bg-teal-700 text-white';
  }
  return 'bg-gray-700 text-white';
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-blue-600 text-white';
    case 'completed': return 'bg-green-600 text-white';
    case 'failed': return 'bg-red-600 text-white';
    default: return 'bg-gray-600 text-white';
  }
};
