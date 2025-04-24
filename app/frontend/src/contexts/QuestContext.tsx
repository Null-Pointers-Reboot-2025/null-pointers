import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Quest, WeeklyGoal } from '../components/quest-log/types';

// Initial default quests
const defaultQuests: Quest[] = [
  {
    id: 1,
    title: '30-Minute Workout',
    description: 'Complete a 30-minute cardio or strength training session',
    status: 'active',
    difficulty: 'medium',
    xp: 150,
    category: 'physical',
    tags: ['Strength', 'Endurance', 'Discipline']
  },
  {
    id: 2,
    title: 'Stretch Session',
    description: 'Complete a 15-minute stretching routine to improve flexibility',
    status: 'completed',
    difficulty: 'easy',
    xp: 100,
    category: 'physical',
    tags: ['Agility', 'Vitality']
  },
  {
    id: 3,
    title: 'Meditation Practice',
    description: 'Complete a 10-minute guided meditation session',
    status: 'active',
    difficulty: 'easy',
    xp: 100,
    category: 'emotional',
    tags: ['Focus', 'Presence', 'Clarity']
  },
  {
    id: 4,
    title: 'Mindful Eating',
    description: 'Practice mindful eating for one meal today',
    status: 'active',
    difficulty: 'medium',
    xp: 150,
    category: 'emotional',
    tags: ['Discipline', 'Presence', 'Vitality']
  },
  {
    id: 5,
    title: 'Journaling Session',
    description: 'Write in your journal for 15 minutes about today\'s experiences',
    status: 'completed',
    difficulty: 'easy',
    xp: 100,
    category: 'emotional',
    tags: ['Clarity', 'Creativity', 'Resilience']
  },
  {
    id: 6,
    title: 'Coding Challenge',
    description: 'Complete a programming challenge in your chosen language',
    status: 'active',
    difficulty: 'hard',
    xp: 250,
    category: 'mental',
    tags: ['Knowledge', 'Focus', 'Creativity']
  },
  {
    id: 7,
    title: 'Read Technical Article',
    description: 'Read and summarize an article about a new technology',
    status: 'active',
    difficulty: 'medium',
    xp: 150,
    category: 'mental',
    tags: ['Knowledge', 'Focus']
  },
  {
    id: 8,
    title: 'Track All Spending for 1 Day',
    description: 'Record every expense for a full day to gain awareness of spending habits',
    status: 'active',
    difficulty: 'medium',
    xp: 150,
    category: 'finance',
    tags: ['Discipline', 'Clarity']
  },
  {
    id: 9,
    title: 'Delay One Non-essential Purchase',
    description: 'Identify a non-essential purchase and deliberately delay it for 48 hours',
    status: 'active',
    difficulty: 'medium',
    xp: 200,
    category: 'finance',
    tags: ['Resilience', 'Discipline']
  },
  {
    id: 10,
    title: 'Reflect on Emotional Purchase',
    description: 'Write about your last emotional purchase and the feelings that triggered it',
    status: 'active',
    difficulty: 'easy',
    xp: 100,
    category: 'finance',
    tags: ['Clarity', 'Presence']
  },
  {
    id: 11,
    title: 'Digital Detox Hour',
    description: 'Spend one hour without any digital devices',
    status: 'active',
    difficulty: 'medium',
    xp: 150,
    category: 'calm',
    tags: ['Presence', 'Clarity', 'Focus']
  },
  {
    id: 12,
    title: 'Nature Break',
    description: 'Take a 15-minute walk outside focusing on nature',
    status: 'active',
    difficulty: 'easy',
    xp: 100,
    category: 'calm',
    tags: ['Presence', 'Vitality']
  },
  {
    id: 13,
    title: 'Rest Day',
    description: 'Take a complete day off from strenuous physical exercise',
    status: 'active',
    difficulty: 'easy',
    xp: 100,
    category: 'recovery',
    tags: ['Vitality', 'Discipline']
  }
];

// Initial default weekly goals
const defaultWeeklyGoals: WeeklyGoal[] = [
  {
    id: 1,
    title: 'Fitness Journey',
    description: 'Complete 3 fitness-related quests this week',
    progress: 33,
    totalXP: 750,
    requiredQuestCount: 3,
    category: 'physical',
    tags: ['Strength', 'Endurance', 'Vitality']
  },
  {
    id: 2,
    title: 'Mindfulness Master',
    description: 'Practice meditation and mindfulness daily',
    progress: 40,
    totalXP: 500,
    requiredQuestCount: 5,
    category: 'emotional',
    tags: ['Presence', 'Clarity', 'Focus']
  },
  {
    id: 3,
    title: 'Learning Path',
    description: 'Dedicate time to learning new skills',
    progress: 0,
    totalXP: 1000,
    requiredQuestCount: 4,
    category: 'mental',
    tags: ['Knowledge', 'Creativity', 'Discipline']
  },
  {
    id: 4,
    title: 'Budget Builder',
    description: 'Create and review your weekly budget',
    progress: 0,
    totalXP: 500,
    requiredQuestCount: 2,
    category: 'finance',
    tags: ['Discipline', 'Clarity', 'Knowledge']
  },
  {
    id: 5,
    title: 'Spend Smarter',
    description: 'Avoid 3 non-essential purchases',
    progress: 0,
    totalXP: 250,
    requiredQuestCount: 3,
    category: 'finance',
    tags: ['Discipline', 'Resilience']
  },
  {
    id: 6,
    title: 'Money Mastery',
    description: 'Read 2 short financial literacy pieces',
    progress: 0,
    totalXP: 750,
    requiredQuestCount: 2,
    category: 'finance',
    tags: ['Knowledge', 'Discipline', 'Focus']
  },
  {
    id: 7,
    title: 'Calm Mind',
    description: 'Complete daily calm mode activities',
    progress: 0,
    totalXP: 350,
    requiredQuestCount: 3,
    category: 'calm',
    tags: ['Presence', 'Clarity', 'Focus']
  }
];

interface QuestContextType {
  quests: Quest[];
  weeklyGoals: WeeklyGoal[];
  setQuests: (quests: Quest[]) => void;
  setWeeklyGoals: (goals: WeeklyGoal[]) => void;
  completeQuest: (id: number) => void;
  addQuest: (quest: Quest) => void;
  resetToDefault: () => void;
  filterBreathingTask: boolean;
  setFilterBreathingTask: (filter: boolean) => void;
}

const QuestContext = createContext<QuestContextType | undefined>(undefined);

export const QuestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [quests, setQuests] = useState<Quest[]>(defaultQuests);
  const [weeklyGoals, setWeeklyGoals] = useState<WeeklyGoal[]>(defaultWeeklyGoals);
  const [filterBreathingTask, setFilterBreathingTask] = useState<boolean>(false);

  // Handle completing a quest
  const completeQuest = (id: number) => {
    setQuests(quests.map(quest => 
      quest.id === id ? { ...quest, status: 'completed' } : quest
    ));
  };

  // Add a new quest
  const addQuest = (newQuest: Quest) => {
    // Ensure the ID is unique
    const questIds = quests.map(q => q.id);
    if (questIds.includes(newQuest.id)) {
      newQuest.id = Math.max(...questIds) + 1;
    }
    
    setQuests([newQuest, ...quests]);
  };

  // Reset to default quests and goals
  const resetToDefault = () => {
    setQuests(defaultQuests);
    setWeeklyGoals(defaultWeeklyGoals);
  };

  // Listen for quest updates from the chat
  useEffect(() => {
    const handleQuestUpdates = (event: CustomEvent) => {
      if (event.detail) {
        const { quests: newQuests, weeklyGoals: newWeeklyGoals } = event.detail;
        
        if (newQuests) setQuests(newQuests);
        if (newWeeklyGoals) setWeeklyGoals(newWeeklyGoals);
      }
    };

    // Check for saved quests in localStorage
    const checkSavedQuests = () => {
      const questsUpdated = localStorage.getItem('questsUpdated');
      
      if (questsUpdated === 'true') {
        const savedQuests = localStorage.getItem('liWeiQuests');
        const savedWeeklyGoals = localStorage.getItem('liWeiWeeklyGoals');
        
        if (savedQuests) {
          setQuests(JSON.parse(savedQuests));
        }
        
        if (savedWeeklyGoals) {
          setWeeklyGoals(JSON.parse(savedWeeklyGoals));
        }
      }
    };

    // Check on mount
    checkSavedQuests();
    
    // Add event listener
    window.addEventListener('questsUpdated', handleQuestUpdates as EventListener);
    
    // Clean up
    return () => {
      window.removeEventListener('questsUpdated', handleQuestUpdates as EventListener);
    };
  }, []);

  return (
    <QuestContext.Provider 
      value={{ 
        quests, 
        weeklyGoals, 
        setQuests, 
        setWeeklyGoals, 
        completeQuest,
        addQuest,
        resetToDefault,
        filterBreathingTask,
        setFilterBreathingTask
      }}
    >
      {children}
    </QuestContext.Provider>
  );
};

export const useQuests = (): QuestContextType => {
  const context = useContext(QuestContext);
  
  if (context === undefined) {
    throw new Error('useQuests must be used within a QuestProvider');
  }
  
  return context;
}; 