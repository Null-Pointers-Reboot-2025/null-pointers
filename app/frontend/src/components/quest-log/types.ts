// Define all possible stat tags
export type StatTag = 'Strength' | 'Endurance' | 'Agility' | 'Vitality' | 
                'Focus' | 'Discipline' | 'Creativity' | 'Knowledge' |
                'Resilience' | 'Clarity' | 'Presence' | 'Charisma';

export type CoreCategory = 'physical' | 'mental' | 'emotional' | 'finance' | 'calm' | 'recovery';

export interface Quest {
  id: number;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'failed';
  difficulty: 'easy' | 'medium' | 'hard';
  xp: number;
  category: CoreCategory;
  tags: StatTag[]; // Array of stats that this quest improves
}

export interface WeeklyGoal {
  id: number;
  title: string;
  description: string;
  progress: number;
  totalXP: number;
  requiredQuestCount: number;
  category: CoreCategory;
  tags: StatTag[];
} 