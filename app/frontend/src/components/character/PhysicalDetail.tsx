import React, { useState } from 'react';
import {
  PageLayout,
  SmartFeedbackCard,
  SectionCard,
  XpHistoryItem,
  QuestProgressCard,
  BalanceRatioItem,
  TrainingArchetypeCard,
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

const PhysicalDetail: React.FC = () => {
  // Mock data - would come from API/context in real app
  const [recentXpHistory] = useState<XpHistoryItem[]>([
    { date: '2023-03-28', stat: 'Strength', amount: 100, source: 'Heavy lifting session' },
    { date: '2023-03-27', stat: 'Endurance', amount: 75, source: '5k run' },
    { date: '2023-03-26', stat: 'Strength', amount: 50, source: 'Bodyweight routine' },
    { date: '2023-03-25', stat: 'Vitality', amount: 80, source: '8hr sleep streak' },
    { date: '2023-03-24', stat: 'Agility', amount: 40, source: 'Mobility routine' },
  ]);
  
  const [questHistory] = useState<QuestHistoryItem[]>([
    { stat: 'Strength', completed: 8, total: 10, period: 'this month' },
    { stat: 'Endurance', completed: 5, total: 6, period: 'this month' },
    { stat: 'Agility', completed: 3, total: 5, period: 'this month' },
    { stat: 'Vitality', completed: 12, total: 15, period: 'this month' },
  ]);
  
  const [balanceRatios] = useState({
    strengthToVitality: 0.87, // Ideal is 1:1
    strengthToEndurance: 1.63, // Ideal is 1:1
    enduranceToAgility: 1.6, // Ideal is 2:1
  });
  
  const [trainingArchetype] = useState('Powerbuilder');
  
  const [smartFeedback] = useState(
    'Your strength growth is outpacing your recovery. Consider adding a Vitality quest to balance your development.'
  );

  const handleAddVitalityQuest = () => {
    // Implementation for adding Vitality quest
    console.log('Adding Vitality quest...');
  };

  return (
    <PageLayout
      title="Physical Stats"
      icon="🏋️‍♂️"
      iconColor="purple"
    >
      {/* Smart Feedback */}
      <SmartFeedbackCard
        message={smartFeedback}
        actionLabel="Add Vitality Quest"
        onAction={handleAddVitalityQuest}
        accentColor="purple"
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
      
      {/* Balance Ratios & Training Archetype */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <SectionCard title="Balance Ratios">
          <div className="space-y-4">
            <BalanceRatioItem
              statA="Strength"
              statB="Vitality"
              ratio={balanceRatios.strengthToVitality}
              idealRatio={1}
              warningThreshold={0.2}
              maxDisplayRatio={2}
              feedbackBad="Imbalanced - add Vitality"
            />
            
            <BalanceRatioItem
              statA="Strength"
              statB="Endurance"
              ratio={balanceRatios.strengthToEndurance}
              idealRatio={1}
              warningThreshold={0.5}
              maxDisplayRatio={2}
              feedbackBad="Slight imbalance"
            />
            
            <BalanceRatioItem
              statA="Endurance"
              statB="Agility"
              ratio={balanceRatios.enduranceToAgility}
              idealRatio={2}
              warningThreshold={0.5}
              maxDisplayRatio={3}
              feedbackBad="Approaching ideal 2:1 ratio"
            />
          </div>
        </SectionCard>
        
        <TrainingArchetypeCard
          title="Training Archetype"
          archetype={trainingArchetype}
          description="You train with the intensity of a powerlifter and the consistency of a bodybuilder. Your adaptability makes you capable of both strength and aesthetics."
          traits={[
            { name: 'High Strength', color: 'purple' },
            { name: 'Good Volume', color: 'blue' },
            { name: 'Recovery Focus', color: 'amber' }
          ]}
          accentColor="purple"
        />
      </div>
      
      {/* Mastery Insights */}
      <MasterySummary 
        accentColor="purple"
        archetypeName="The Titan"
        archetypeQuote="You are building the strength of a warrior, the endurance of a traveler, and the vitality of a sage. Your physical prowess grows not just in power, but in sustainable capability."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MasteryInsightCard
            title="Next Milestone"
            accentColor="purple"
            progressValue={650}
            progressMax={1000}
            progressLabel="1000 XP = Level 2 Strength"
          />
          
          <MasteryInsightCard
            title="Passive Perks"
            accentColor="purple"
            progressLabel="+5 bonus XP/day for workout streaks"
            subtext="Unlocked at Level 1 Discipline"
          />
          
          <MasteryInsightCard
            title="Quest Archetypes"
            accentColor="purple"
            insights={[
              { color: 'red', label: 'High-intensity training' },
              { color: 'amber', label: 'Progressive overload' },
              { color: 'green', label: 'Recovery tracking' }
            ]}
          />
        </div>
      </MasterySummary>
    </PageLayout>
  );
};

export default PhysicalDetail; 