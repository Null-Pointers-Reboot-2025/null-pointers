import React, { useState } from 'react';
import {
  PageLayout,
  SectionCard,
  SmartFeedbackCard,
  XpHistoryItem,
  QuestProgressCard,
  MasteryInsightCard,
  MasterySummary
} from './details';

interface XpHistoryItem {
  date: string;
  stat: string;
  amount: number;
  source: string;
}

interface QuestHistoryItem {
  stat: string;
  completed: number;
  total: number;
  period: string;
}

const FinancialDetail: React.FC = () => {
  // Mock data - would come from API/context in real app
  const [recentXpHistory] = useState<XpHistoryItem[]>([
    { date: '2023-03-28', stat: 'Budgeting', amount: 100, source: 'Planned and stuck to a weekly budget' },
    { date: '2023-03-27', stat: 'Saving', amount: 75, source: 'Added to emergency fund' },
    { date: '2023-03-26', stat: 'Spending Awareness', amount: 50, source: 'Reflected on non-essential purchases' },
    { date: '2023-03-25', stat: 'Financial Literacy', amount: 80, source: 'Completed finance article' },
    { date: '2023-03-24', stat: 'Budgeting', amount: 40, source: 'Reviewed monthly expenses' },
  ]);
  
  const [questHistory] = useState<QuestHistoryItem[]>([
    { stat: 'Budgeting', completed: 8, total: 10, period: 'this month' },
    { stat: 'Saving', completed: 5, total: 6, period: 'this month' },
    { stat: 'Spending Awareness', completed: 3, total: 5, period: 'this month' },
    { stat: 'Financial Literacy', completed: 6, total: 8, period: 'this month' },
  ]);
  
  const [smartFeedback] = useState(
    'Your budgeting skills are improving! Consider adding a Saving quest to boost your emergency fund.'
  );

  const handleAddSavingQuest = () => {
    // Implementation for adding a Saving quest
    console.log('Adding Saving quest...');
  };

  return (
    <PageLayout
      title="Financial Stats"
      icon="💸"
      iconColor="green"
    >
      {/* Smart Feedback */}
      <SmartFeedbackCard
        message={smartFeedback}
        actionLabel="Add Saving Quest"
        onAction={handleAddSavingQuest}
        accentColor="green"
      />
      
      {/* Recent XP History */}
      <SectionCard title="Recent XP History">
        <div className="space-y-3">
          {recentXpHistory.map((item, index) => (
            <XpHistoryItem
              key={index}
              date={item.date}
              stat={item.stat}
              amount={item.amount}
              source={item.source}
            />
          ))}
        </div>
      </SectionCard>
      
      {/* Quest History */}
      <SectionCard title="Quest Completion">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {questHistory.map((item, index) => (
            <QuestProgressCard
              key={index}
              stat={item.stat}
              completed={item.completed}
              total={item.total}
              period={item.period}
            />
          ))}
        </div>
      </SectionCard>
      
      {/* Financial Health Score */}
      <SectionCard title="Financial Health Score">
        <div className="p-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-bold text-black">Overall Financial Health</span>
            <span className="text-sm font-bold text-green-800">65/100</span>
          </div>
          <div className="h-2.5 bg-gray-200 rounded-full">
            <div className="h-2.5 rounded-full bg-green-600" style={{ width: '65%' }}></div>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-bold text-black">Savings Rate</span>
                <span className="text-sm font-bold text-green-800">70/100</span>
              </div>
              <div className="h-2.5 bg-gray-200 rounded-full">
                <div className="h-2.5 rounded-full bg-green-600" style={{ width: '70%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-bold text-black">Budget Adherence</span>
                <span className="text-sm font-bold text-green-800">80/100</span>
              </div>
              <div className="h-2.5 bg-gray-200 rounded-full">
                <div className="h-2.5 rounded-full bg-green-600" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-bold text-black">Spending Awareness</span>
                <span className="text-sm font-bold text-green-800">50/100</span>
              </div>
              <div className="h-2.5 bg-gray-200 rounded-full">
                <div className="h-2.5 rounded-full bg-green-600" style={{ width: '50%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-bold text-black">Financial Knowledge</span>
                <span className="text-sm font-bold text-green-800">60/100</span>
              </div>
              <div className="h-2.5 bg-gray-200 rounded-full">
                <div className="h-2.5 rounded-full bg-green-600" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>
      
      {/* Mastery Insights */}
      <MasterySummary 
        accentColor="green"
        archetypeName="The Steward"
        archetypeQuote="You are building the foundation of financial wisdom, learning to balance today's needs with tomorrow's goals. Your mindful approach to money will yield stability and freedom."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MasteryInsightCard
            title="Next Milestone"
            accentColor="green"
            progressValue={650}
            progressMax={1000}
            progressLabel="1000 XP = Level 2 Budgeting"
          />
          
          <MasteryInsightCard
            title="Passive Perks"
            accentColor="green"
            progressLabel="+5 bonus XP/day for budget tracking streaks"
            subtext="Unlocked at Level 1 Discipline"
          />
          
          <MasteryInsightCard
            title="Quest Archetypes"
            accentColor="green"
            insights={[
              { color: 'green', label: 'Budget planning' },
              { color: 'blue', label: 'Savings goals' },
              { color: 'amber', label: 'Financial education' }
            ]}
          />
        </div>
      </MasterySummary>
    </PageLayout>
  );
};

export default FinancialDetail; 