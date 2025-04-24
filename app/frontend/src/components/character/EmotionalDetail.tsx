import React, { useState } from 'react';
import {
  PageLayout,
  SectionCard,
  MoodXpItem,
  JournalInsightCard,
  WeekRhythmCard,
  RecoveryMomentItem,
  ResilienceTrendChart,
  MasteryInsightCard,
  MasterySummary
} from './details';
import { MoodXpItem as MoodXpItemType } from './details/MoodXpItem';
import { JournalEntry } from './details/JournalInsightCard';
import { WeekData } from './details/WeekRhythmCard';
import { RecoveryMoment } from './details/RecoveryMomentItem';
import { ResilienceTrendData } from './details/ResilienceTrendChart';
import { useTheme } from '../../contexts/ThemeContext';

const EmotionalDetailRefactored: React.FC = () => {
  const { theme } = useTheme();
  
  // Mock data - would come from API/context in real app
  const [moodBasedXp] = useState<MoodXpItemType[]>([
    { date: '2023-03-28', stat: 'Resilience', amount: 200, mood: 'low', activity: 'Bounce-back from missed workout' },
    { date: '2023-03-27', stat: 'Clarity', amount: 75, mood: 'medium', activity: 'Reflective journaling' },
    { date: '2023-03-26', stat: 'Presence', amount: 100, mood: 'high', activity: 'Meditation session' },
    { date: '2023-03-25', stat: 'Charisma', amount: 150, mood: 'high', activity: 'Social gathering' },
    { date: '2023-03-24', stat: 'Resilience', amount: 125, mood: 'low', activity: 'Stress management' },
  ]);
  
  const [journalEntries] = useState<JournalEntry[]>([
    { 
      date: '2023-03-28', 
      insight: "I realized today that my emotional response to failure is improving. What used to derail me for days now only affects me for hours.",
      relatedStat: 'Resilience'
    },
    { 
      date: '2023-03-26', 
      insight: "The 10-minute meditation made a surprising difference in my focus for the rest of the day. Small habits, big impact.",
      relatedStat: 'Presence'
    },
    { 
      date: '2023-03-24', 
      insight: "Social battery drains faster when I haven't prepared mentally. Need to build in personal time before events.",
      relatedStat: 'Charisma'
    },
  ]);
  
  const [weekData] = useState<WeekData[]>([
    { weekNumber: 12, startDate: '2023-03-20', endDate: '2023-03-26', status: 'onFire', totalXp: 850, completionRate: 0.85, hasStreak: true },
    { weekNumber: 11, startDate: '2023-03-13', endDate: '2023-03-19', status: 'neutral', totalXp: 600, completionRate: 0.65 },
    { weekNumber: 10, startDate: '2023-03-06', endDate: '2023-03-12', status: 'down', totalXp: 350, completionRate: 0.45 },
    { weekNumber: 9, startDate: '2023-02-27', endDate: '2023-03-05', status: 'neutral', totalXp: 550, completionRate: 0.60 },
    { weekNumber: 8, startDate: '2023-02-20', endDate: '2023-02-26', status: 'onFire', totalXp: 800, completionRate: 0.80, hasStreak: true },
  ]);
  
  const [recoveryMoments] = useState<RecoveryMoment[]>([
    { date: '2023-03-28', duration: 15, activity: 'Meditation', xpGained: 30 },
    { date: '2023-03-27', duration: 30, activity: 'Journaling', xpGained: 45 },
    { date: '2023-03-26', duration: 20, activity: 'Deep breathing', xpGained: 35 },
    { date: '2023-03-25', duration: 45, activity: 'Nature walk', xpGained: 60 },
  ]);
  
  const [resilienceTrend] = useState<ResilienceTrendData>({
    previous: 5, // days
    current: 2, // days
    improvement: 60, // percent
    period: '30 days'
  });

  return (
    <PageLayout
      title="Emotional / Behavioral"
      icon="🧘"
      iconColor="teal"
    >
      {/* Mood-based XP */}
      <SectionCard title="Mood-based XP">
        <div className="space-y-3">
          {moodBasedXp.map((item, index) => (
            <MoodXpItem key={index} item={item} />
          ))}
        </div>
      </SectionCard>
      
      {/* Journal Insights */}
      <SectionCard title="Journal Insights">
        <div className="space-y-4">
          {journalEntries.map((entry, index) => (
            <JournalInsightCard key={index} entry={entry} />
          ))}
        </div>
      </SectionCard>
      
      {/* Weekly Rhythm Tracker */}
      <SectionCard title="Weekly Rhythm Tracker">
        <div className="space-y-3">
          {weekData.map((week, index) => (
            <WeekRhythmCard 
              key={index} 
              weekData={week}
              accentColor="teal"
            />
          ))}
        </div>
      </SectionCard>
      
      {/* Micro-recovery & Resilience Trend */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <SectionCard title="🧘 Micro-recovery Moments">
          <div className="space-y-3">
            {recoveryMoments.map((moment, index) => (
              <RecoveryMomentItem
                key={index}
                moment={moment}
                accentColor="teal"
              />
            ))}
          </div>
        </SectionCard>
        
        <SectionCard title="Resilience Trend">
          <ResilienceTrendChart data={resilienceTrend} />
        </SectionCard>
      </div>
      
      {/* Mastery Insights */}
      <MasterySummary 
        accentColor="teal"
        archetypeName="The Monk"
        archetypeQuote="You are cultivating the presence of a sage and the resilience of a mountain. With each moment of mindful practice, your emotional intelligence grows stronger, allowing you to remain grounded amidst life's challenges."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MasteryInsightCard
            title="Next Milestone"
            accentColor="teal"
            progressValue={550}
            progressMax={750}
            progressLabel="750 XP = Level 2 Resilience"
          />
          
          <MasteryInsightCard
            title="Passive Perks"
            accentColor="teal"
            subtext="Unlocked at Level 1 Presence"
            progressLabel="Emotional recovery boosts also apply to mental stats"
          />
          
          <MasteryInsightCard
            title="Quest Archetypes"
            accentColor="teal"
            insights={[
              { color: 'blue', label: 'Reflection practices' },
              { color: 'teal', label: 'Mindfulness exercises' },
              { color: 'amber', label: 'Social connections' }
            ]}
          />
        </div>
      </MasterySummary>
      
      <div className="mt-4 mb-6 p-3 bg-white/80 border border-gray-800 rounded-lg text-sm">
        <p className="text-black font-bold">
          Even small recovery moments add up! 5-15 minute sessions still earn XP and maintain streaks.
        </p>
      </div>
    </PageLayout>
  );
};

export default EmotionalDetailRefactored; 