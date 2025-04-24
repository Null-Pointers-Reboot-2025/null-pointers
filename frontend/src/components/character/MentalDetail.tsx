import React, { useState } from 'react';
import {
  PageLayout,
  SectionCard,
  StreakCard,
  WorkTimeBalance,
  LearningSourceItem,
  StatMultiplierCard,
  MasteryInsightCard,
  MasterySummary
} from './details';
import { StreakData } from './details/StreakCard';
import { WorkTimeData } from './details/WorkTimeBalance';
import { LearningSource } from './details/LearningSourceItem';
import { StatMultiplier } from './details/StatMultiplierCard';

const MentalDetailRefactored: React.FC = () => {
  // Mock data - would come from API/context in real app
  const [streakData] = useState<StreakData[]>([
    { stat: 'Focus', current: 3, longest: 7, description: 'Days of uninterrupted focus sessions' },
    { stat: 'Discipline', current: 14, longest: 21, description: 'Days following morning routine' },
    { stat: 'Creativity', current: 5, longest: 8, description: 'Days with creative output' },
    { stat: 'Knowledge', current: 9, longest: 12, description: 'Days with learning sessions' },
  ]);
  
  const [workTimeData] = useState<WorkTimeData[]>([
    { date: '2023-03-28', deepWork: 120, lightTasks: 180 },
    { date: '2023-03-27', deepWork: 90, lightTasks: 150 },
    { date: '2023-03-26', deepWork: 150, lightTasks: 90 },
    { date: '2023-03-25', deepWork: 60, lightTasks: 210 },
    { date: '2023-03-24', deepWork: 180, lightTasks: 120 },
  ]);
  
  const [learningSources] = useState<LearningSource[]>([
    { name: 'Notion notes', lastUsed: '2023-03-28', frequency: 'Daily', xpGained: 240 },
    { name: 'Duolingo session', lastUsed: '2023-03-28', frequency: 'Daily', xpGained: 180 },
    { name: 'Technical book', lastUsed: '2023-03-27', frequency: 'Weekly', xpGained: 350 },
    { name: 'Online course', lastUsed: '2023-03-25', frequency: 'Weekly', xpGained: 420 },
  ]);
  
  const [statMultiplier] = useState<StatMultiplier>({
    description: 'Doing deep work before 10am gives +10% Focus XP bonus',
    isActive: true,
    activePeriod: 'Morning (6am-10am)'
  });

  const handleToggleMultiplier = () => {
    // In a real app, this would update the state
    console.log('Toggling multiplier');
  };

  return (
    <PageLayout
      title="Mental Stats"
      icon="🧠"
      iconColor="blue"
    >
      {/* Streak Data */}
      <SectionCard title="Streak Data">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {streakData.map((streak, index) => (
            <StreakCard
              key={index}
              streakData={streak}
              accentColor="blue"
              onFireThreshold={7}
            />
          ))}
        </div>
      </SectionCard>
      
      {/* Deep Work vs Light Tasks */}
      <SectionCard title="Deep Work vs Light Tasks">
        <WorkTimeBalance
          workTimeData={workTimeData}
          accentColor="blue"
        />
      </SectionCard>
      
      {/* Learning Sources */}
      <SectionCard title="Learning Sources">
        <div className="space-y-3">
          {learningSources.map((source, index) => (
            <LearningSourceItem
              key={index}
              source={source}
              accentColor="blue"
            />
          ))}
        </div>
      </SectionCard>
      
      {/* Mental Stat Multiplier & Progress Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <StatMultiplierCard
          statMultiplier={statMultiplier}
          accentColor="blue"
          icon="🎯"
          title="Mental Stat Multiplier"
          onToggle={handleToggleMultiplier}
        />
        
        <SectionCard title="Progress Comparison">
          <div className="space-y-4 mt-2">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-bold text-black">Discipline Growth</span>
                <span className="text-sm font-bold text-black">80/100</span>
              </div>
              <div className="h-2.5 bg-gray-200 rounded-full">
                <div className="h-2.5 rounded-full bg-blue-600" style={{ width: '80%' }}></div>
              </div>
              <div className="flex justify-between text-xs mt-1 text-black font-medium">
                <span>Month 1</span>
                <span>Month 2</span>
                <span>Month 3</span>
                <span>Month 4</span>
                <span>Now</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-bold text-black">Creativity Growth</span>
                <span className="text-sm font-bold text-black">45/100</span>
              </div>
              <div className="h-2.5 bg-gray-200 rounded-full">
                <div className="h-2.5 rounded-full bg-blue-600" style={{ width: '45%' }}></div>
              </div>
              <div className="flex justify-between text-xs mt-1 text-black font-medium">
                <span>Month 1</span>
                <span>Month 2</span>
                <span>Month 3</span>
                <span>Month 4</span>
                <span>Now</span>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
      
      {/* Mastery Insights */}
      <MasterySummary 
        accentColor="blue"
        archetypeName="The Scholar"
        archetypeQuote="Your mental prowess grows through organized learning, deep focus sessions, and intentional knowledge acquisition. The strength of your mind reflects in your disciplined approach to growth."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MasteryInsightCard
            title="Focus Insights"
            accentColor="blue"
            progressValue={60}
            progressMax={100}
            progressLabel="60% to next Focus level"
            insights={[
              { color: 'blue', label: 'Deep work is 40% of your total work time' },
              { color: 'amber', label: 'Morning focus is your strongest' },
            ]}
          />
          
          <MasteryInsightCard
            title="Learning Methods"
            accentColor="blue"
            insights={[
              { color: 'blue', label: 'Active recall +20% XP' },
              { color: 'green', label: 'Spaced repetition +15% XP' },
              { color: 'purple', label: 'Teaching others +25% XP' }
            ]}
          />
          
          <MasteryInsightCard
            title="Next Milestone"
            accentColor="blue"
            progressValue={800}
            progressMax={1000}
            progressLabel="1000 XP = Level 2 Knowledge"
            subtext="Unlocks: Study Time Multiplier"
          />
        </div>
      </MasterySummary>
    </PageLayout>
  );
};

export default MentalDetailRefactored; 