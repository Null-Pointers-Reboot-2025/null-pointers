import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import SectionCard from './SectionCard';
import StatTag from './StatTag';

interface Trait {
  name: string;
  color: string;
}

interface TrainingArchetypeCardProps {
  title: string;
  archetype: string;
  description: string;
  traits: Trait[];
  icon?: string;
  accentColor?: string;
}

const TrainingArchetypeCard: React.FC<TrainingArchetypeCardProps> = ({
  title,
  archetype,
  description,
  traits,
  icon = '🏆',
  accentColor = 'purple'
}) => {
  const { getThemeClasses, theme } = useTheme();
  
  const getAccentTextColor = (color: string) => {
    switch (color) {
      case 'purple': return 'text-purple-800 font-extrabold';
      case 'blue': return 'text-blue-800 font-extrabold';
      case 'teal': return 'text-teal-800 font-extrabold';
      case 'amber': return 'text-amber-800 font-extrabold';
      default: return 'text-blue-800 font-extrabold';
    }
  };

  return (
    <SectionCard title={title} accentColor={accentColor}>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-4xl mb-3">{icon}</div>
        <h3 className={`text-xl ${getAccentTextColor(accentColor)} mb-2`}>
          The {archetype}
        </h3>
        <p className="text-center text-black font-medium">
          {description}
        </p>
        <div className="mt-4 mb-4 text-sm">
          {traits.map((trait, index) => (
            <StatTag 
              key={index}
              label={trait.name}
              color={trait.color}
              size="md"
              rounded="full"
              className="mb-2 mr-2"
            />
          ))}
        </div>
      </div>
    </SectionCard>
  );
};

export default TrainingArchetypeCard; 