import React, { useState } from 'react';
import {
  PageLayout,
  SectionCard,
  LevelProgressCard,
  ProgressHistoryTable,
  JourneyTimeline,
  MasteryTrackItem,
  AchievementCard,
  SystemInsightCard,
  MasterySummary
} from './details';
import { LevelData } from './details/LevelProgressCard';
import { StatHistory } from './details/ProgressHistoryTable';
import { MilestonePoint } from './details/JourneyTimeline';
import { MasteryTrack } from './details/MasteryTrackItem';
import { AchievementData } from './details/AchievementCard';
import { SystemMetric } from './details/SystemInsightCard';

const SystemDetailRefactored: React.FC = () => {
  // Mock data - would come from API/context in real app
  const [statHistory] = useState<StatHistory[]>([
    { period: 'This Week', physical: 72, mental: 65, emotional: 58, overall: 68 },
    { period: 'Last Week', physical: 68, mental: 62, emotional: 55, overall: 65 },
    { period: 'Two Weeks Ago', physical: 63, mental: 60, emotional: 50, overall: 60 },
    { period: 'Three Weeks Ago', physical: 60, mental: 55, emotional: 48, overall: 56 },
    { period: 'One Month Ago', physical: 55, mental: 50, emotional: 45, overall: 52 },
    { period: 'Six Months Ago', physical: 42, mental: 38, emotional: 30, overall: 38 },
    { period: 'One Year Ago', physical: 28, mental: 25, emotional: 20, overall: 25 },
    { period: 'Two Years Ago', physical: 15, mental: 12, emotional: 10, overall: 12 },
    { period: 'Five Years Ago', physical: 5, mental: 3, emotional: 2, overall: 4 },
  ]);
  
  const [achievements] = useState<AchievementData[]>([
    {
      id: 'a1',
      title: 'Perfect Balance',
      description: 'Achieve equal XP in Physical, Mental, and Emotional categories',
      progress: 85,
      xpReward: 500,
      unlocked: false,
      category: 'meta'
    },
    {
      id: 'a2',
      title: 'Consistent Growth',
      description: 'Increase XP in all categories for 4 consecutive weeks',
      progress: 75,
      xpReward: 750,
      unlocked: false,
      category: 'meta'
    },
    {
      id: 'a3',
      title: 'Renaissance User',
      description: 'Complete at least 5 quests in each major category',
      progress: 100,
      xpReward: 1000,
      unlocked: true,
      category: 'meta'
    },
    {
      id: 'a4',
      title: 'Streak Master',
      description: 'Maintain a 14-day streak in any category',
      progress: 100,
      xpReward: 500,
      unlocked: true,
      category: 'discipline'
    },
  ]);
  
  const [levelData] = useState<LevelData>({
    level: 7,
    xpRequired: 8000,
    xpCurrent: 7000,
    perks: [
      'Unlock advanced quest types',
      'Access to custom stat creation',
      'Unlock weekly challenges with 2x XP',
      'Bonus XP for completing quests in weak categories'
    ]
  });
  
  const [masteryTracks] = useState<MasteryTrack[]>([
    {
      name: 'Physical Mastery',
      category: 'physical',
      progress: 63,
      questsCompleted: 15,
      questsTotal: 25,
      unlockable: 'Custom workout templates'
    },
    {
      name: 'Mental Growth',
      category: 'mental',
      progress: 52,
      questsCompleted: 13,
      questsTotal: 25,
      unlockable: 'Knowledge graph visualization'
    },
    {
      name: 'Emotional Balance',
      category: 'emotional',
      progress: 36,
      questsCompleted: 9,
      questsTotal: 25,
      unlockable: 'Advanced mood tracking'
    },
  ]);

  const [journeyMilestones] = useState<MilestonePoint[]>([
    {
      label: 'Start',
      period: '5 Years Ago',
      value: 4,
      description: 'First quest completed'
    },
    {
      label: 'Year 2',
      period: '3 Years Ago',
      value: 12,
      description: 'Daily habit streak'
    },
    {
      label: 'Year 3',
      period: '2 Years Ago',
      value: 25,
      description: 'Cross-skill mastery'
    },
    {
      label: 'Last Year',
      period: '1 Year Ago',
      value: 38,
      description: 'Balanced growth begins'
    },
    {
      label: 'Present',
      period: 'Today',
      value: 68,
      description: 'System mastery emerging',
      isCurrent: true
    }
  ]);

  const [insights] = useState({
    standard: [
      'Your overall growth is steady at ~3% weekly. Physical stats are outpacing other categories - consider balancing with more mental and emotional quests.',
      'Over the past 5 years, you\'ve shown remarkable progress from a baseline of 4% to your current 68% overall rating. Your physical attributes have seen the most consistent growth (+67%), while emotional skills (+56%) have the most potential for improvement.'
    ],
    systemMetrics: [
      {
        title: 'XP Growth Rate',
        value: '+850 XP per week',
        secondaryText: '3.5% increase from last month',
        indicatorText: '3.2% above average',
        indicatorColor: 'blue' as 'blue',
        valueClassName: 'block'
      },
      {
        title: 'Balance Index',
        value: '72/100',
        secondaryText: 'Good',
        secondaryText2: 'Physical slightly overemphasized'
      },
      {
        title: 'Projected Level',
        value: 'Level 10 in 24 days',
        secondaryText: 'Current pace: Level per 18.2 days',
        indicatorText: 'Accelerating',
        indicatorColor: 'green' as 'green',
        valueClassName: 'block',
        subMetrics: [
          {
            title: '5-Year Projection',
            value: 'Level 108',
            highlight: true
          }
        ]
      }
    ] as SystemMetric[]
  });

  const levelUpStrategies = [
    { label: 'Complete "Consistent Growth" achievement', xp: 750, color: 'amber' },
    { label: 'Focus on Emotional category (lowest)', xp: 150, color: 'teal' },
    { label: 'Complete 2 weekly challenges', xp: 200, color: 'blue' }
  ];

  return (
    <PageLayout
      title="System-Level (Meta)"
      icon="🧬"
      iconColor="amber"
    >
      {/* Level Progress */}
      <LevelProgressCard 
        levelData={levelData}
        accentColor="amber"
        strategies={levelUpStrategies}
        className="mb-6"
      />
      
      {/* Progress History */}
      <SectionCard title="Progress History" className="mb-6">
        <ProgressHistoryTable 
          statHistory={statHistory}
          insights={insights.standard}
        />
      </SectionCard>
      
      {/* Journey Timeline */}
      <SectionCard title="The Journey So Far">
        <JourneyTimeline 
          milestones={journeyMilestones}
          accentColor="amber"
          footnote="Your growth has been accelerating - going from linear to exponential in the past year"
          footnoteClassName="mt-4"
        />
      </SectionCard>
      
      {/* Mastery Tracks */}
      <SectionCard title="Mastery Tracks (3/7 Completed)">
        <div className="space-y-4">
          {masteryTracks.map((track, index) => (
            <MasteryTrackItem key={index} track={track} />
          ))}
        </div>
      </SectionCard>
      
      {/* Achievements */}
      <SectionCard title="Achievements">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <AchievementCard key={index} achievement={achievement} />
          ))}
        </div>
      </SectionCard>
      
      {/* Mastery Insights */}
      <MasterySummary 
        accentColor="amber"
        archetypeName="The Architect"
        archetypeQuote="You are building a system of holistic self-improvement, with careful attention to balance and sustainability. Your physical foundation supports your mental pursuits, while your emotional awareness gives depth to both. Continue your path of principled growth, and watch as all aspects of your life advance in harmony."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insights.systemMetrics.map((metric, index) => (
            <SystemInsightCard 
              key={index}
              metric={metric}
              accentColor="amber"
            />
          ))}
        </div>
      </MasterySummary>
    </PageLayout>
  );
};

export default SystemDetailRefactored; 