import { useTheme } from '../../../contexts/ThemeContext';

type ColorType = 'text' | 'bg' | 'border' | 'gradient';

export const useStatColor = () => {
  const { theme } = useTheme();

  /**
   * Get color class for a given stat
   * @param stat Stat name (e.g. 'Strength', 'Focus', etc.)
   * @param type Type of color (text, background, border, gradient)
   * @param intensity Optional intensity level for the color
   */
  const getStatColor = (stat: string, type: ColorType = 'text', intensity?: number) => {
    let color = '';
    
    // Determine base color based on stat
    switch (stat.toLowerCase()) {
      // Physical stats
      case 'strength':
        color = 'red';
        break;
      case 'endurance':
        color = 'blue';
        break;
      case 'agility':
        color = 'green';
        break;
      case 'vitality':
        color = 'amber';
        break;
      
      // Mental stats
      case 'focus':
        color = 'blue';
        break;
      case 'discipline':
        color = 'indigo';
        break;
      case 'creativity':
        color = 'pink';
        break;
      case 'knowledge':
        color = 'blue';
        break;
      
      // Emotional stats
      case 'resilience':
        color = 'blue';
        break;
      case 'clarity':
        color = 'purple';
        break;
      case 'presence':
        color = 'teal';
        break;
      case 'charisma':
        color = 'amber';
        break;
      
      // Meta stats
      case 'xp':
      case 'ascend level':
      case 'mastery tracks':
        color = 'amber';
        break;
      
      default:
        color = 'blue';
    }
    
    // Apply the color to the correct type of class
    switch (type) {
      case 'text':
        return `text-${color}-700 font-bold`;
      
      case 'bg':
        return `bg-${color}-600`;
      
      case 'border':
        return `border-${color}-700`;
      
      case 'gradient':
        return `from-${color}-600 to-${color}-700`;
      
      default:
        return `text-${color}-700 font-bold`;
    }
  };

  return { getStatColor };
};

export default useStatColor; 