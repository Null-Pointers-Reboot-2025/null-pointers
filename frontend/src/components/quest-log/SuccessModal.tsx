import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Quest } from './types';

interface SuccessModalProps {
  quest: Quest | null;
  onClose: () => void;
  onDiscuss: (quest: Quest) => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ quest, onClose, onDiscuss }) => {
  const { getThemeClasses } = useTheme();

  if (!quest) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div className={`${getThemeClasses('surface')} ${getThemeClasses('card')} max-w-md w-full p-6 rounded-lg shadow-xl animate-scaleIn`}>
        <div className="text-center">
          <div className="mb-4 animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className={`text-xl font-bold mb-2 ${getThemeClasses('heading')}`}>
            Congratulations!
          </h3>
          <p className={`mb-4 ${getThemeClasses('text')}`}>
            You have successfully completed the quest: <span className="font-semibold">{quest.title}</span>
          </p>
          <p className={`mb-6 ${getThemeClasses('textSecondary')}`}>
            Do you want to talk about your success or challenges with completing this task?
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => onDiscuss(quest)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors"
            >
              Yes
            </button>
            <button
              onClick={onClose}
              className={`px-4 py-2 ${getThemeClasses('button')} rounded transition-colors`}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal; 