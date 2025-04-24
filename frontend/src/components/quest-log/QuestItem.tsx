import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Quest } from './types';
import { getDifficultyColor, getCategoryColor, getTagColor, getCategoryDisplay } from './questUtils';
import ConfettiEffect from './ConfettiEffect';
import SuccessModal from './SuccessModal';
import { useNavigate } from 'react-router-dom';

interface QuestItemProps {
  quest: Quest;
  completeQuest: (id: number) => void;
}

// Custom category display component
const CategoryDisplay: React.FC<{category: string}> = ({ category }) => {
  if (category === 'emotional') {
    return (
      <div className="text-center">
        <span className="block">Emotional</span>
        <span className="block">Behavioral</span>
      </div>
    );
  }
  
  return <span>{getCategoryDisplay(category)}</span>;
};

const QuestItem: React.FC<QuestItemProps> = ({ quest, completeQuest }) => {
  const { theme, getThemeClasses } = useTheme();
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [completedQuest, setCompletedQuest] = useState<Quest | null>(null);
  const navigate = useNavigate();

  const handleCompleteQuest = () => {
    if (quest.status === 'active') {
      setShowConfetti(true);
      setCompletedQuest(quest);
      completeQuest(quest.id);
    }
  };

  const handleConfettiComplete = () => {
    // Confetti animation has finished
    // The modal is already visible because completedQuest is set
  };

  const handleCloseModal = () => {
    setCompletedQuest(null);
  };

  const handleDiscussQuest = (quest: Quest) => {
    // Store quest in localStorage for persistence across navigation
    localStorage.setItem('pendingQuestDiscussion', JSON.stringify(quest));
    
    // Navigate to the chat page
    navigate('/chat');
    
    // Close the modal
    handleCloseModal();
  };

  return (
    <>
      {showConfetti && <ConfettiEffect onComplete={handleConfettiComplete} />}
      {completedQuest && (
        <SuccessModal 
          quest={completedQuest}
          onClose={handleCloseModal}
          onDiscuss={handleDiscussQuest}
        />
      )}
      <div 
        className={`bg-white border-l-4 ${
          quest.status === 'completed' ? 'border-[#007A33]' : 'border-[#A4DE7C]'
        } ${getThemeClasses('card')} p-4 shadow-md hover:shadow-primary transition-shadow mb-3`}
      >
        <div className="flex items-start">
          <div className="mr-3 mt-1">
            <div 
              onClick={handleCompleteQuest}
              className={`w-5 h-5 rounded border cursor-pointer ${
                quest.status === 'completed' 
                  ? 'bg-[#007A33] border-[#007A33] flex items-center justify-center' 
                  : 'border-[#007A33] hover:bg-[#A4DE7C]/20'
              }`}
            >
              {quest.status === 'completed' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className={`font-semibold text-[#000000] text-lg`}>{quest.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded min-w-[80px] text-center bg-[#FFA500] text-white`}>
                    <CategoryDisplay category={quest.category} />
                  </span>
                </div>
                <p className={`text-[#1A1A1A] mt-1`}>{quest.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {quest.tags.map(tag => (
                    <span key={tag} className={`text-xs px-2 py-0.5 rounded bg-[#BFFF00] text-[#000000]`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4 mt-3 text-sm">
                  <span className={`text-[#007A33] font-medium`}>
                    {quest.difficulty.charAt(0).toUpperCase() + quest.difficulty.slice(1)}
                  </span>
                  <span className="text-[#007A33]">XP: {quest.xp}</span>
                </div>
              </div>
              {quest.status === 'active' && (
                <button 
                  onClick={handleCompleteQuest}
                  className="hidden md:block bg-[#007A33] hover:bg-[#006629] text-white text-sm px-3 py-1 rounded transition-colors"
                >
                  Complete
                </button>
              )}
              {quest.status === 'completed' && (
                <span className={`hidden md:block bg-[#D2F4C3] text-[#007A33] text-sm px-3 py-1 rounded`}>
                  Completed
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestItem; 