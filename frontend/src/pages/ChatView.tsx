import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useQuests } from '../contexts/QuestContext';
import { Quest, WeeklyGoal, CoreCategory, StatTag } from '../components/quest-log/types';
import { useNavigate } from 'react-router-dom';
import { 
  ConversationMessage, 
  getConversationForQuest, 
  generateFollowUpQuest 
} from '../data/completedQuestConversations';

interface ChatMessage {
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  hasQuestsButton?: boolean;
}

// Mock conversation for Li Wei
const liWeiConversation: Array<{text: string; sender: 'user' | 'ai'; delay: number; hasQuestsButton?: boolean}> = [
  { text: "Hi Li Wei! I see you're health-conscious and financially stable. How can I help optimize your financial wellness today?", sender: 'ai', delay: 1000 },
  { text: "Hi, I'm looking to optimize my long-term investment strategy and explore some advanced budgeting techniques.", sender: 'user', delay: 2000 },
  { text: "Welcome! I notice you're quite disciplined with health tracking. How about we bring that same data-driven approach to your finances? I see you already have an emergency fund in place. What specific investment areas would you like to explore?", sender: 'ai', delay: 3000 },
  { text: "I'm interested in tax-efficient investment wrappers and how to balance my portfolio for optimal growth while maintaining some liquidity.", sender: 'user', delay: 3500 },
  { text: "Great focus! Based on your stability indicators, you're well-positioned for tax wrappers like ISAs. I've analyzed your spending patterns and identified potential for £320 monthly additional investments without impacting your lifestyle.", sender: 'ai', delay: 3000 },
  { text: "That's interesting - I hadn't calculated that specific amount. Can you show me how you arrived at that figure?", sender: 'user', delay: 3000 },
  { text: "I noticed your consistent daily expenditure patterns and identified three areas with recurring discretionary spending that fluctuates. When compared against your health activities, you spend less on days with higher activity metrics, suggesting £320 as optimal reallocation while maintaining your wellbeing.", sender: 'ai', delay: 4000 },
  { text: "That's genuinely insightful. I hadn't connected my activity levels to spending patterns. What about some advanced challenges to optimize my finances further?", sender: 'user', delay: 4000 },
  { text: "How about this - I've designed a 30-day no-spend quest customized to your habits. Unlike generic challenges, this adapts to your health metrics: on high-activity days, you'll have slightly different targets based on your historical recovery needs. Would you like to see the framework?", sender: 'ai', delay: 4000 },
  { text: "Yes, please show me the framework. I'm curious how it adapts to my activity metrics.", sender: 'user', delay: 3000 },
  { text: "Here's your personalized 30-day quest framework:\n\n1. Baseline: £0 spending on non-essentials\n2. Dynamic adjustments: On days with 10K+ steps or 45+ min workouts, £15 recovery allowance for health-positive spending\n3. Trend analysis: Weekly correlation reports between financial restraint and sleep quality\n4. Investment automation: Each no-spend day triggers a £12 micro-investment into your chosen growth fund\n5. Data insight: Custom dashboard showing projected annual savings based on adherence patterns\n\nThis framework leverages your existing health discipline to build financial discipline with similar feedback mechanics.", sender: 'ai', delay: 5000 },
  // Add quest setup conversation
  { text: "Would you like me to set up these quests in your Quest Log? This will replace your current quests with the personalized 30-day challenge.", sender: 'ai', delay: 3000 },
  { text: "Yes, please set them up for me.", sender: 'user', delay: 2000 },
  { text: "I've set up the quests in your Quest Log. All 5 components of the framework are now available as actionable quests with appropriate tracking metrics.", sender: 'ai', delay: 3000, hasQuestsButton: true },
];

// Mock conversation for Samira
const samiraConversation: Array<{text: string; sender: 'user' | 'ai'; delay: number; hasQuestsButton?: boolean}> = [
  { text: "Hello Samira! I notice you've been experiencing some anxiety related to work deadlines. How can I help you balance your wellness and finances today?", sender: 'ai', delay: 1000 },
  { text: "Hi, I've been struggling with work stress lately. I keep missing my evening breathing sessions and my anxiety is affecting my spending habits.", sender: 'user', delay: 2500 },
  { text: "I understand. I've analyzed your patterns and noticed you tend to make impulse purchases during high-stress periods. Would you like me to help create a calming routine that also protects your finances?", sender: 'ai', delay: 3000 },
  { text: "Yes, that would be really helpful. I need something that fits into my workday when I'm coding.", sender: 'user', delay: 2500 },
  { text: "I've noticed you skip lunch to meet sprint goals, which leads to afternoon energy crashes. These crashes often coincide with impulse purchasing. Would you like me to suggest a balanced approach?", sender: 'ai', delay: 3500 },
  { text: "Definitely. I hadn't connected those dots before.", sender: 'user', delay: 2000 },
  { text: "Based on your heart rate data, your anxiety peaks between 2-4pm. I can create micro-interventions that integrate with your IDE to remind you to take short breathing breaks. These breaks can reduce both your stress and impulse spending by 47% according to our analysis.", sender: 'ai', delay: 4000 },
  { text: "That sounds perfect. How would these interventions work?", sender: 'user', delay: 2500 },
  { text: "I'll create a three-part system:\n\n1. Budget nudges that appear before lunch delivery orders, showing the impact on your monthly savings\n2. IDE-based 'pause to breathe' prompts when you've been coding intensely for 90+ minutes\n3. Anxiety-spend detection that triggers breathing/stretch nudges when your heart rate elevates while browsing shopping sites\n\nEach component is designed to break the anxiety-spending cycle while respecting your work commitments.", sender: 'ai', delay: 5000 },
  { text: "This is exactly what I need. Can you set these up for me?", sender: 'user', delay: 2500 },
  { text: "I've created wellness-finance quests based on these interventions. You'll find guided breathing exercises, stretch reminders, and mindful spending challenges in your Quest Log now.", sender: 'ai', delay: 3000, hasQuestsButton: true },
];

// Mock conversation for Javier
const javierConversation: Array<{text: string; sender: 'user' | 'ai'; delay: number; hasQuestsButton?: boolean}> = [
  { text: "Hi Javier! I notice you've been balancing studies and work with some challenging sleep patterns. How can I help you manage your academic and financial stress today?", sender: 'ai', delay: 1000 },
  { text: "Hi, I'm finding it hard to keep up with my media studies while working evening shifts. My sleep is suffering, and I'm worried about my finances and grades.", sender: 'user', delay: 2500 },
  { text: "I understand the pressure you're under. I've analyzed your sleep data and notice your REM sleep has dropped below 15%. This affects both academic performance and financial decision-making. Would you like me to help balance these areas?", sender: 'ai', delay: 3500 },
  { text: "Yes please. I need to find a way to improve my sleep while still making enough money for rent and books.", sender: 'user', delay: 2500 },
  { text: "Based on your schedule data, I can see you're prone to all-nighters near term deadlines. These are causing significant sleep debt that takes weeks to recover from. Would you like me to create a personalized plan that balances study, work, and recovery?", sender: 'ai', delay: 4000 },
  { text: "That would be really helpful. I feel like I'm constantly in a cycle of exhaustion and financial worry.", sender: 'user', delay: 2500 },
  { text: "I've noticed your payday and rent due dates create financial stress peaks. Combined with your academic calendar, we can predict high-stress periods. What if I created a system to help manage both academic and financial pressure points?", sender: 'ai', delay: 3500 },
  { text: "That sounds perfect. What would that look like?", sender: 'user', delay: 2000 },
  { text: "I'll set up a three-part approach tailored to your needs:\n\n1. Pre-rent payday check-ins to ensure financial stability before your biggest monthly expense\n2. Sleep-debt aware study scheduling that promotes recovery between intense sessions\n3. Peer accountability through sleep and budget challenges with other students\n\nThe system will include one planned reward per week to maintain motivation while staying within budget constraints.", sender: 'ai', delay: 5000 },
  { text: "This is exactly what I need. Can you set it up for me?", sender: 'user', delay: 2000 },
  { text: "I've created student-focused quests in your Quest Log that balance academic demands, sleep recovery, and financial management. These will help you maintain REM sleep above 20% while meeting your academic and financial goals.", sender: 'ai', delay: 3500, hasQuestsButton: true },
];

// Mock conversation for Aisha
const aishaConversation: Array<{text: string; sender: 'user' | 'ai'; delay: number; hasQuestsButton?: boolean}> = [
  { text: "Hello Aisha! I notice you've been experiencing inconsistent sleep patterns and energy levels lately. How can I help you improve your wellbeing today?", sender: 'ai', delay: 1000 },
  { text: "Hi, I've been struggling with poor sleep and low energy. It's affecting my illustration work and making it hard to stay focused during client calls.", sender: 'user', delay: 2500 },
  { text: "I understand. Based on your sleep data, I'm seeing only 10% deep sleep during your 4-6 hour nights, which explains the mental fog. Have you noticed any connection between your daily activity levels and sleep quality?", sender: 'ai', delay: 3500 },
  { text: "Not really, but I know I don't move much during the day. With freelance deadlines, I often forget to get up from my desk. And my variable income makes it hard to commit to fitness subscriptions.", sender: 'user', delay: 3000 },
  { text: "That makes sense. Your data shows around 3,000 steps daily and less than ten minutes of exercise. For freelancers like you, I'd recommend gentle micro-challenges that won't disrupt your workflow rather than expensive subscriptions. Would you like to hear some options?", sender: 'ai', delay: 4000 },
  { text: "Yes please. I need something that fits into my unpredictable schedule and doesn't feel overwhelming.", sender: 'user', delay: 2500 },
  { text: "I've designed a three-part approach specifically for your creative workflow:\n\n1. Hourly micro-movements: 2-minute stand-ups or gentle stretches during work sessions\n2. Personalized audio sleep routines that adapt to your variable bedtime patterns\n3. 'Creative income stability' check-ins with gentle, no-shame reminders for budget tracking\n\nEach component is designed to gradually improve your deep sleep and daily energy without disrupting your creative process.", sender: 'ai', delay: 5000 },
  { text: "That sounds perfect for me. I like that there's nothing extreme—just small changes I can actually maintain.", sender: 'user', delay: 2800 },
  { text: "Exactly. Would you also be interested in a daily check-in about resisting 'craving spends'? I've noticed a pattern where illustrators often make impulse purchases on digital assets or tools during high-stress periods.", sender: 'ai', delay: 3500 },
  { text: "Yes, that's definitely me! I buy brushes and textures when I'm stressed about deadlines or feeling creatively blocked.", sender: 'user', delay: 2500 },
  { text: "I thought that might resonate. I'll include gentle prompts to help you become aware of those moments, without any judgment or shame. The goal is to help you reach 20% deep sleep and improve your daytime focus, while also creating more financial stability with your variable income.", sender: 'ai', delay: 4000 },
  { text: "This sounds exactly like what I need. Can you set it up for me?", sender: 'user', delay: 2000 },
  { text: "I've created gentle micro-challenge quests in your Quest Log designed specifically for your creative freelance lifestyle. These will help improve your deep sleep quality, increase daily movement without disruption, and support financial stability with your variable income.", sender: 'ai', delay: 3500, hasQuestsButton: true },
];

// Mock conversation for Kofi
const kofiConversation: Array<{text: string; sender: 'user' | 'ai'; delay: number; hasQuestsButton?: boolean}> = [
  { text: "Hello Kofi! I notice your HRV trends and resting heart rate suggest you might be experiencing some burnout. How can I help you find better balance today?", sender: 'ai', delay: 1000 },
  { text: "Hi, I've been feeling overwhelmed with back-to-back meetings. Even my weekends are filled with social catch-ups. I'm tracking all my health metrics but can't seem to make time for recovery.", sender: 'user', delay: 2500 },
  { text: "I see that in your data. Your resting heart rate has been trending upward while your HRV is declining. I also notice you have zero mindfulness minutes logged on weekdays. Would you like some strategies that integrate recovery into your existing workflow?", sender: 'ai', delay: 3500 },
  { text: "Yes, but I'm saving for a home deposit with my partner, so I'd prefer not to add another subscription or service. And honestly, I'm so busy I don't see how I can fit anything else in.", sender: 'user', delay: 3000 },
  { text: "I completely understand both constraints. I'm not suggesting any new services or subscriptions. Instead, I'd like to help you identify recovery moments within your existing schedule. Would it be helpful to explore some of those possibilities?", sender: 'ai', delay: 4000 },
  { text: "I guess so, but I'm skeptical. My calendar is already packed, and I need to maintain my performance at work while saving for our home.", sender: 'user', delay: 2500 },
  { text: "That's a valid concern. Let me suggest a gentle approach that respects both your professional commitments and financial goals:\n\n1. Calendar buffer prompts - simple reminders to add 5-minute breaks between meetings when possible\n2. Recovery notifications during your highest stress periods based on your heart rate data\n3. A 'mental recovery budget' that allocates guilt-free spending for wellbeing activities\n\nEach component is designed to work within your existing tools and schedule, while supporting your savings goal.", sender: 'ai', delay: 5000 },
  { text: "The mental recovery budget sounds interesting, though I often feel guilty spending on anything that's not going toward our home deposit. But I doubt the calendar buffers would work - my team books meetings back-to-back.", sender: 'user', delay: 2800 },
  { text: "That guilt is common when saving for important goals. I've analyzed your spending patterns and identified that a sustainable £75 monthly allocation for recovery activities wouldn't impact your savings timeline. As for the calendar buffers, would you be open to trying them for just your self-scheduled meetings initially?", sender: 'ai', delay: 3500 },
  { text: "I could try that for my own meetings, I suppose. What exactly are these recovery notifications you mentioned?", sender: 'user', delay: 2000 },
  { text: "They're gentle reminders that appear when your biometric data indicates elevated stress levels. For example, when your heart rate stays elevated for 45+ minutes, you'd receive a notification suggesting a 2-minute breathing exercise. Think of them as smart breaks based on your actual physiological needs rather than arbitrary timing.", sender: 'ai', delay: 4000 },
  { text: "That does sound helpful, though I'm not sure I'd actually take the breaks when I'm in the middle of work. And what about my existing subscriptions? I already pay for several services I barely use.", sender: 'user', delay: 3000 },
  { text: "That's a great point about existing subscriptions. I noticed you have several unused or underutilized subscriptions. Would you be interested in burnout-linked subscription review prompts? They help evaluate whether your current subscriptions are actually reducing stress or adding to your mental load.", sender: 'ai', delay: 3500 },
  { text: "That makes sense. Sometimes I sign up for things thinking they'll help, but they just become another obligation. What would that look like exactly?", sender: 'user', delay: 2500 },
  { text: "You'd receive a gentle prompt when your burnout metrics remain elevated for several days, suggesting a review of one specific subscription. For example: 'Your sleep quality has been declining for 3 days. Is your premium meditation app providing value, or creating pressure to use it?' The goal is mindful evaluation rather than automatic cancellation.", sender: 'ai', delay: 4000 },
  { text: "OK, I can see how this approach might actually work with my schedule and budget constraints. I'm still not entirely convinced, but I'm willing to give it a try.", sender: 'user', delay: 2500 },
  { text: "I appreciate your willingness to try. The goal is to help you maintain an upward HRV trend for a week and complete just three five-minute breaks weekly, all while respecting your financial goals. Shall I set up these gentle prompts and suggestions as quests for you to try?", sender: 'ai', delay: 3500 },
  { text: "Yes, let's give it a go and see if it actually helps with my burnout.", sender: 'user', delay: 2000 },
  { text: "I've created recovery-focused quests in your Quest Log designed to fit within your busy schedule. These will help improve your HRV trend, integrate mindful recovery moments into your day, and balance wellbeing spending with your savings goals. Remember, even small changes can make a meaningful difference to your recovery.", sender: 'ai', delay: 3500, hasQuestsButton: true },
];

// Mock conversation for Ahmed
const ahmedConversation: Array<{text: string; sender: 'user' | 'ai'; delay: number; hasQuestsButton?: boolean}> = [
  { text: "Hey, good to hear from you.\nIt's 5AM — are you just waking up… or coming home from a long shift?", sender: 'ai', delay: 1000 },
  { text: "...coming off one, yeah.", sender: 'user', delay: 2500 },
  { text: "Brutal. Night shifts hit different. You want to talk, or just zone out with something easy?", sender: 'ai', delay: 3500 },
  { text: "I'm not really sure why I opened this.", sender: 'user', delay: 3000 },
  { text: "Honestly, sometimes just showing up is enough.\nI'm not here to judge or push — just to walk with you a bit, if you want.", sender: 'ai', delay: 4000 },
  { text: "I just… I don't want to share a bunch of personal stuff unless I know where it goes.", sender: 'user', delay: 2800 },
  { text: "Totally fair.\nHere's the short version:\n\nNothing leaves this space unless you choose to share it.\n\nNo bank connections, no tracking, no third parties.\n\nYou stay anonymous unless you decide to log in to save your progress.\n\nI can stay in full private mode — no memory, no tracking. Just a blank slate.", sender: 'ai', delay: 5000 },
  { text: "Yeah. Do that.", sender: 'user', delay: 2800 },
  { text: "Done. You're in incognito mode now.\nIf you ever want to switch later, just say the word.\n\nMind if I ask one gentle question?\nDo you notice your spending shifts a bit after these kinds of nights?", sender: 'ai', delay: 3500 },
  { text: "...maybe. I don't know. I guess I just don't think. I grab food, whatever's easy.", sender: 'user', delay: 2500 },
  { text: "Makes sense. You've already made a hundred decisions during your shift — no surprise you don't want to overthink dinner.\n\nWant to try something simple next time?\nLike:\n\n\"Set aside £5 ahead of time — for a guilt-free treat. Make it your call, not exhaustion's.\"\n\nNo tracking, no guilt. Just ownership.", sender: 'ai', delay: 4000 },
  { text: "That's not the worst idea.\nBut yeah — I still don't want to link anything. Not my bank, not work stuff.", sender: 'user', delay: 3000 },
  { text: "You don't have to.\nWe can keep it abstract — like journaling with XP.\n\"Today felt expensive.\" That counts.", sender: 'ai', delay: 3500 },
  { text: "...okay.\nFine. But I'm still skeptical.", sender: 'user', delay: 2500 },
  { text: "That's not a flaw. That's wisdom.\nSkepticism keeps you safe. I'm not here to break that — just to earn a little trust, one low-pressure win at a time.", sender: 'ai', delay: 4000 },
  { text: "I guess we'll see.", sender: 'user', delay: 2000 },
  { text: "I've updated some simple quests in your Quest Log that respect your privacy preferences. They're designed to help with post-shift decisions without requiring any data sharing.\n\nI'll check in with you tomorrow morning. Get some rest.", sender: 'ai', delay: 3500, hasQuestsButton: true },
];

// Li Wei's financial challenge quests
const liWeiQuests: Quest[] = [
  {
    id: 1,
    title: 'No-Spend Baseline',
    description: 'Maintain £0 spending on non-essential items for the day',
    status: 'active',
    difficulty: 'hard',
    xp: 250,
    category: 'finance',
    tags: ['Discipline', 'Resilience', 'Clarity'] as StatTag[]
  },
  {
    id: 2,
    title: 'Activity-Based Spending Allowance',
    description: 'On high activity days (10K+ steps or 45+ min workouts), utilize £15 recovery allowance for health-positive spending',
    status: 'active',
    difficulty: 'medium',
    xp: 200,
    category: 'finance',
    tags: ['Discipline', 'Vitality', 'Presence'] as StatTag[]
  },
  {
    id: 3,
    title: 'Sleep & Finance Correlation',
    description: 'Record sleep metrics daily and compare with financial restraint patterns',
    status: 'active',
    difficulty: 'medium',
    xp: 150,
    category: 'finance',
    tags: ['Knowledge', 'Clarity', 'Focus'] as StatTag[]
  },
  {
    id: 4,
    title: 'Daily Micro-Investment',
    description: 'Trigger a £12 micro-investment into your growth fund for each successful no-spend day',
    status: 'active',
    difficulty: 'easy',
    xp: 100,
    category: 'finance',
    tags: ['Discipline', 'Knowledge'] as StatTag[]
  },
  {
    id: 5,
    title: 'Financial Data Analysis',
    description: 'Review your dashboard weekly to analyze projected annual savings based on current adherence patterns',
    status: 'active',
    difficulty: 'medium',
    xp: 200,
    category: 'finance',
    tags: ['Knowledge', 'Focus', 'Clarity'] as StatTag[]
  }
];

// Li Wei's weekly goals
const liWeiWeeklyGoals: WeeklyGoal[] = [
  {
    id: 1,
    title: '30-Day No-Spend Challenge',
    description: 'Complete all 5 components of your personalized no-spend challenge',
    progress: 0,
    totalXP: 900,
    requiredQuestCount: 5,
    category: 'finance',
    tags: ['Discipline', 'Knowledge', 'Resilience'] as StatTag[]
  },
  {
    id: 2,
    title: 'Health-Finance Integration',
    description: 'Successfully correlate your health metrics with spending patterns',
    progress: 0,
    totalXP: 750,
    requiredQuestCount: 3,
    category: 'finance',
    tags: ['Knowledge', 'Clarity', 'Vitality'] as StatTag[]
  },
  {
    id: 3,
    title: 'Investment Growth',
    description: 'Accumulate at least £60 in micro-investments this week',
    progress: 0,
    totalXP: 500,
    requiredQuestCount: 5,
    category: 'finance',
    tags: ['Discipline', 'Focus'] as StatTag[]
  }
];

// Samira's wellness-finance quests
const samiraQuests: Quest[] = [
  {
    id: 1,
    title: 'Mindful Lunch Break',
    description: 'Take a 30-minute screen-free lunch break to reduce midday anxiety',
    status: 'active',
    difficulty: 'medium',
    xp: 150,
    category: 'calm',
    tags: ['Vitality', 'Presence', 'Discipline'] as StatTag[]
  },
  {
    id: 2,
    title: 'IDE Breathing Pause',
    description: 'Complete a 2-minute guided breathing exercise when prompted during coding sessions',
    status: 'active',
    difficulty: 'easy',
    xp: 100,
    category: 'calm',
    tags: ['Focus', 'Clarity', 'Presence'] as StatTag[]
  },
  {
    id: 3,
    title: 'Anti-Impulse Stretch',
    description: 'Perform the guided stretch routine before completing any online purchase',
    status: 'active',
    difficulty: 'medium',
    xp: 200,
    category: 'calm',
    tags: ['Discipline', 'Resilience', 'Vitality'] as StatTag[]
  },
  {
    id: 4,
    title: 'Budget-Aware Delivery',
    description: 'Review your monthly budget impact before ordering lunch delivery',
    status: 'active',
    difficulty: 'medium',
    xp: 150,
    category: 'finance',
    tags: ['Discipline', 'Clarity', 'Knowledge'] as StatTag[]
  },
  {
    id: 5,
    title: 'Evening Wind-Down',
    description: 'Complete a 10-minute guided breathing session at 21:00',
    status: 'active',
    difficulty: 'hard',
    xp: 250,
    category: 'calm',
    tags: ['Discipline', 'Presence', 'Clarity'] as StatTag[]
  }
];

// Samira's weekly goals
const samiraWeeklyGoals: WeeklyGoal[] = [
  {
    id: 1,
    title: 'Anxiety Management',
    description: 'Reduce anxiety spikes by 50% through regular breathing exercises',
    progress: 0,
    totalXP: 800,
    requiredQuestCount: 5,
    category: 'calm',
    tags: ['Discipline', 'Presence', 'Vitality'] as StatTag[]
  },
  {
    id: 2,
    title: 'Mindful Spending',
    description: 'Complete pre-purchase breathing exercises to reduce impulse buys',
    progress: 0,
    totalXP: 650,
    requiredQuestCount: 3,
    category: 'finance',
    tags: ['Discipline', 'Clarity', 'Resilience'] as StatTag[]
  },
  {
    id: 3,
    title: 'Workday Balance',
    description: 'Take all scheduled lunch breaks and coding pauses this week',
    progress: 0,
    totalXP: 700,
    requiredQuestCount: 5,
    category: 'calm',
    tags: ['Vitality', 'Discipline', 'Focus'] as StatTag[]
  }
];

// Javier's student-focused quests
const javierQuests: Quest[] = [
  {
    id: 1,
    title: 'Pre-Rent Budget Check',
    description: 'Complete a budget review one week before rent is due to ensure financial stability',
    status: 'active',
    difficulty: 'medium',
    xp: 150,
    category: 'finance',
    tags: ['Discipline', 'Clarity', 'Resilience'] as StatTag[]
  },
  {
    id: 2,
    title: 'Sleep Debt Recovery',
    description: 'Schedule and complete a 9-hour sleep session after high-intensity study periods',
    status: 'active',
    difficulty: 'hard',
    xp: 250,
    category: 'recovery',
    tags: ['Vitality', 'Discipline', 'Resilience'] as StatTag[]
  },
  {
    id: 3,
    title: 'Pomodoro Study Session',
    description: 'Complete four 25-minute focused study sessions with 5-minute breaks in between',
    status: 'active',
    difficulty: 'medium',
    xp: 200,
    category: 'mental',
    tags: ['Focus', 'Discipline', 'Knowledge'] as StatTag[]
  },
  {
    id: 4,
    title: 'Weekly Reward Planning',
    description: 'Schedule one affordable treat per week to maintain motivation while staying in budget',
    status: 'active',
    difficulty: 'easy',
    xp: 100,
    category: 'finance',
    tags: ['Discipline', 'Clarity', 'Vitality'] as StatTag[]
  },
  {
    id: 5,
    title: 'Peer Study Challenge',
    description: 'Join a peer accountability group for a shared study and sleep improvement goal',
    status: 'active',
    difficulty: 'medium',
    xp: 200,
    category: 'mental',
    tags: ['Charisma', 'Knowledge', 'Discipline'] as StatTag[]
  }
];

// Javier's weekly goals
const javierWeeklyGoals: WeeklyGoal[] = [
  {
    id: 1,
    title: 'Sleep Quality Improvement',
    description: 'Maintain REM sleep above 20% through consistent sleep hygiene practices',
    progress: 0,
    totalXP: 800,
    requiredQuestCount: 4,
    category: 'recovery',
    tags: ['Vitality', 'Discipline', 'Focus'] as StatTag[]
  },
  {
    id: 2,
    title: 'Student Budget Balance',
    description: 'Complete financial check-ins and stay within planned budget for the week',
    progress: 0,
    totalXP: 600,
    requiredQuestCount: 3,
    category: 'finance',
    tags: ['Discipline', 'Clarity', 'Knowledge'] as StatTag[]
  },
  {
    id: 3,
    title: 'Academic Productivity',
    description: 'Complete structured study sessions while avoiding all-nighters',
    progress: 0,
    totalXP: 750,
    requiredQuestCount: 4,
    category: 'mental',
    tags: ['Knowledge', 'Focus', 'Discipline'] as StatTag[]
  }
];

// Aisha's gentle micro-challenge quests
const aishaQuests: Quest[] = [
  {
    id: 1,
    title: 'Hourly Stand-Up',
    description: 'Stand and stretch for 2 minutes each hour during work sessions',
    status: 'active',
    difficulty: 'easy',
    xp: 100,
    category: 'physical',
    tags: ['Vitality', 'Discipline', 'Focus'] as StatTag[]
  },
  {
    id: 2,
    title: 'Bedtime Audio Routine',
    description: 'Listen to a personalized 10-minute sleep audio routine before bed',
    status: 'active',
    difficulty: 'medium',
    xp: 150,
    category: 'recovery',
    tags: ['Vitality', 'Presence', 'Clarity'] as StatTag[]
  },
  {
    id: 3,
    title: 'Craving Spend Check-In',
    description: 'Complete a quick reflection before purchasing digital tools or assets',
    status: 'active',
    difficulty: 'medium',
    xp: 200,
    category: 'finance',
    tags: ['Discipline', 'Clarity', 'Knowledge'] as StatTag[]
  },
  {
    id: 4,
    title: 'Client Walk & Talk',
    description: 'Take one client call per week while walking outdoors',
    status: 'active',
    difficulty: 'medium',
    xp: 200,
    category: 'physical',
    tags: ['Vitality', 'Charisma', 'Focus'] as StatTag[]
  },
  {
    id: 5,
    title: 'Creative Income Planning',
    description: 'Schedule 15 minutes on Sundays to review upcoming projects and income projections',
    status: 'active',
    difficulty: 'hard',
    xp: 250,
    category: 'finance',
    tags: ['Knowledge', 'Clarity', 'Discipline'] as StatTag[]
  }
];

// Aisha's weekly goals
const aishaWeeklyGoals: WeeklyGoal[] = [
  {
    id: 1,
    title: 'Deep Sleep Improvement',
    description: 'Increase deep sleep percentage to above 15% through consistent bedtime routines',
    progress: 0,
    totalXP: 700,
    requiredQuestCount: 3,
    category: 'recovery',
    tags: ['Vitality', 'Clarity', 'Focus'] as StatTag[]
  },
  {
    id: 2,
    title: 'Gentle Movement Integration',
    description: 'Complete at least 10 hourly stand-ups and one walking call this week',
    progress: 0,
    totalXP: 600,
    requiredQuestCount: 4,
    category: 'physical',
    tags: ['Vitality', 'Discipline', 'Resilience'] as StatTag[]
  },
  {
    id: 3,
    title: 'Freelance Financial Stability',
    description: 'Complete all craving check-ins and Sunday income planning session',
    progress: 0,
    totalXP: 750,
    requiredQuestCount: 3,
    category: 'finance',
    tags: ['Discipline', 'Knowledge', 'Clarity'] as StatTag[]
  }
];

// Kofi's burnout recovery quests
const kofiQuests: Quest[] = [
  {
    id: 1,
    title: 'Meeting Buffer Zones',
    description: 'Add 5-minute buffers to self-scheduled meetings to create micro-recovery moments',
    status: 'active',
    difficulty: 'medium',
    xp: 150,
    category: 'calm',
    tags: ['Vitality', 'Discipline', 'Focus'] as StatTag[]
  },
  {
    id: 2,
    title: 'Stress Response Pause',
    description: 'Complete a 2-minute guided breathing exercise when prompted during high heart rate periods',
    status: 'active',
    difficulty: 'easy',
    xp: 100,
    category: 'calm',
    tags: ['Vitality', 'Presence', 'Resilience'] as StatTag[]
  },
  {
    id: 3,
    title: 'Mental Recovery Budget',
    description: 'Allocate and spend £75 this month on guilt-free wellbeing activities',
    status: 'active',
    difficulty: 'medium',
    xp: 200,
    category: 'finance',
    tags: ['Discipline', 'Clarity', 'Vitality'] as StatTag[]
  },
  {
    id: 4,
    title: 'Subscription Audit',
    description: 'Review one existing subscription for actual stress-reduction value when prompted',
    status: 'active',
    difficulty: 'hard',
    xp: 250,
    category: 'finance',
    tags: ['Knowledge', 'Clarity', 'Discipline'] as StatTag[]
  },
  {
    id: 5,
    title: 'Weekend Recovery Block',
    description: 'Schedule one 2-hour period of unstructured recovery time each weekend',
    status: 'active',
    difficulty: 'hard',
    xp: 250,
    category: 'calm',
    tags: ['Vitality', 'Presence', 'Resilience'] as StatTag[]
  }
];

// Kofi's weekly goals
const kofiWeeklyGoals: WeeklyGoal[] = [
  {
    id: 1,
    title: 'HRV Improvement',
    description: 'Maintain an upward HRV trend for 7 consecutive days',
    progress: 0,
    totalXP: 800,
    requiredQuestCount: 4,
    category: 'recovery',
    tags: ['Vitality', 'Discipline', 'Resilience'] as StatTag[]
  },
  {
    id: 2,
    title: 'Guided Break Integration',
    description: 'Complete three 5-minute guided mindfulness breaks this week',
    progress: 0,
    totalXP: 650,
    requiredQuestCount: 3,
    category: 'calm',
    tags: ['Presence', 'Focus', 'Vitality'] as StatTag[]
  },
  {
    id: 3,
    title: 'Financial-Wellbeing Balance',
    description: 'Utilize mental recovery budget while staying on track with savings goal',
    progress: 0,
    totalXP: 700,
    requiredQuestCount: 3,
    category: 'finance',
    tags: ['Clarity', 'Discipline', 'Knowledge'] as StatTag[]
  }
];

// Ahmed's night-shift optimized quests
const ahmedQuests: Quest[] = [
  {
    id: 1,
    title: 'Strategic Nap Timing',
    description: 'Schedule and complete naps at circadian-optimal times based on your current shift pattern',
    status: 'active',
    difficulty: 'hard',
    xp: 250,
    category: 'recovery',
    tags: ['Vitality', 'Discipline', 'Knowledge'] as StatTag[]
  },
  {
    id: 2,
    title: 'Light Exposure Protocol',
    description: 'Follow personalized schedule for daylight exposure, blue-light blocking, and darkness periods',
    status: 'active',
    difficulty: 'medium',
    xp: 200,
    category: 'recovery',
    tags: ['Vitality', 'Discipline', 'Clarity'] as StatTag[]
  },
  {
    id: 3,
    title: 'Shift-Based Budget Planning',
    description: 'Create a financial plan that adapts to regular and overtime pay cycles',
    status: 'active',
    difficulty: 'medium',
    xp: 150,
    category: 'finance',
    tags: ['Knowledge', 'Clarity', 'Discipline'] as StatTag[]
  },
  {
    id: 4,
    title: 'Cognitive Safety Check-In',
    description: 'Complete micro-assessments during high-risk fatigue periods on night shifts',
    status: 'active',
    difficulty: 'medium',
    xp: 200,
    category: 'mental',
    tags: ['Focus', 'Knowledge', 'Clarity'] as StatTag[]
  },
  {
    id: 5,
    title: 'Recovery Day Optimization',
    description: 'Follow structured recovery protocol on days off to maximize regeneration',
    status: 'active',
    difficulty: 'hard',
    xp: 250,
    category: 'recovery',
    tags: ['Vitality', 'Discipline', 'Resilience'] as StatTag[]
  }
];

// Ahmed's weekly goals
const ahmedWeeklyGoals: WeeklyGoal[] = [
  {
    id: 1,
    title: 'Sleep Quality Improvement',
    description: 'Increase rest-day sleep duration to at least 5 hours through optimized protocols',
    progress: 0,
    totalXP: 800,
    requiredQuestCount: 3,
    category: 'recovery',
    tags: ['Vitality', 'Discipline', 'Focus'] as StatTag[]
  },
  {
    id: 2,
    title: 'Shift Error Reduction',
    description: 'Complete all cognitive safety check-ins to minimize fatigue-related errors',
    progress: 0,
    totalXP: 700,
    requiredQuestCount: 3,
    category: 'mental',
    tags: ['Focus', 'Clarity', 'Knowledge'] as StatTag[]
  },
  {
    id: 3,
    title: 'Financial Stability',
    description: 'Implement shift-based budget planning across regular and overtime periods',
    progress: 0,
    totalXP: 650,
    requiredQuestCount: 2,
    category: 'finance',
    tags: ['Discipline', 'Clarity', 'Knowledge'] as StatTag[]
  }
];

const ChatView: React.FC = () => {
  const { theme, getThemeClasses } = useTheme();
  const { quests, setQuests, setWeeklyGoals, addQuest } = useQuests();
  const navigate = useNavigate();
  const [replyText, setReplyText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      text: 'Welcome to Ascendify! How can I assist you today?', 
      sender: 'ai',
      timestamp: new Date(Date.now() - 60000) // 1 minute ago
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isPlayingMockConversation, setIsPlayingMockConversation] = useState(false);
  const [activeChoices, setActiveChoices] = useState<string[]>([]);
  const [discussingQuest, setDiscussingQuest] = useState<Quest | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Navigate to quests page
  const goToQuestsPage = () => {
    navigate('/quests');
  };

  // Navigate to quests page with breathing task filter
  const goToBreathingTask = () => {
    // Set session storage to indicate we want to filter for the breathing task
    sessionStorage.setItem('showBreathingTask', 'true');
    navigate('/quests');
  };

  // Navigate to quests page for mock user journeys (without filtering)
  const goToQuestsFromMock = () => {
    // No filtering, just navigate to quests page
    navigate('/quests');
  };

  // Handle choice selection from conversation templates
  const handleChoiceSelection = (choice: string) => {
    if (!discussingQuest) return;

    // Add the user's choice as a message
    const userChoice = {
      text: choice,
      sender: 'user' as const,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userChoice]);
    setActiveChoices([]); // Clear choices

    // Get the appropriate conversation template
    const template = getConversationForQuest(discussingQuest);
    
    // Determine which path to follow based on the choice
    const isPositiveResponse = choice.toLowerCase().includes('great') || 
                              choice.toLowerCase().includes('yes') || 
                              choice.toLowerCase().includes('positive') ||
                              choice.toLowerCase().includes('focused') ||
                              choice.toLowerCase().includes('balanced') ||
                              choice.toLowerCase().includes('interested');
    
    // Get the appropriate conversation path
    const experiencePath = isPositiveResponse 
      ? template.experiencePositive 
      : template.experienceNegative;
    
    // Find the current choice node in the conversation path
    const currentChoiceIndex = experiencePath.findIndex(msg => 
      msg.isUserChoice && msg.choices && msg.choices.includes(choice)
    );
    
    if (currentChoiceIndex >= 0) {
      // Get the messages that follow this choice
      const remainingMessages = experiencePath.slice(currentChoiceIndex + 1);
      
      // Play the remaining messages
      playConversationPath(remainingMessages);
    } else {
      // If we can't find the choice in the path (shouldn't happen normally),
      // just continue with the first AI message in the path as a fallback
      const firstAIMessage = experiencePath.find(msg => msg.sender === 'ai');
      if (firstAIMessage) {
        playConversationPath([firstAIMessage]);
      }
    }
  };

  // Play a conversation path
  const playConversationPath = (conversationPath: ConversationMessage[]) => {
    if (conversationPath.length === 0) return;
    
    setIsPlayingMockConversation(true);
    
    // Keep track of which message we're processing
    let currentIndex = 0;
    
    // Process next message in the conversation
    const processNextMessage = async () => {
      // If we've processed all messages, finish the conversation
      if (currentIndex >= conversationPath.length) {
        setIsPlayingMockConversation(false);
        
        // If the last message mentions creating quests, add follow-up quest
        const lastMessage = conversationPath[conversationPath.length - 1];
        if (lastMessage && lastMessage.text.includes('quest') && discussingQuest) {
          const followUpQuest = generateFollowUpQuest(discussingQuest);
          addFollowUpQuest(followUpQuest);
        }
        return;
      }
      
      const msg = conversationPath[currentIndex];
      
      // Skip user messages that are not marked as system messages
      if (msg.sender === 'user' && !msg.isSystemMessage) {
        currentIndex++;
        processNextMessage(); // Process the next message immediately
        return;
      }
      
      // For AI messages, show typing indicator
      if (msg.sender === 'ai') {
        // Show typing indicator
        setIsTyping(true);
        
        // Wait for typing delay (simulate typing)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setIsTyping(false);
        
        // Add the message
        setMessages(prev => [...prev, {
          text: msg.text,
          sender: msg.sender,
          timestamp: new Date()
        }]);
        
        // If this message has choices, activate them and pause conversation
        if (msg.isUserChoice && msg.choices && msg.choices.length > 0) {
          setActiveChoices(msg.choices);
          setIsPlayingMockConversation(false);
          return; // Stop processing messages until user makes a choice
        }
      } else {
        // Add user system message if needed
        setMessages(prev => [...prev, {
          text: msg.text,
          sender: msg.sender,
          timestamp: new Date()
        }]);
      }
      
      // Wait between messages before processing the next one
      currentIndex++;
      setTimeout(processNextMessage, msg.delay || 1000);
    };
    
    // Start processing messages
    processNextMessage();
  };

  // Add a follow-up quest to the user's quest list
  const addFollowUpQuest = (newQuest: Quest) => {
    // Add the new quest using the context method
    addQuest(newQuest);
  };

  // Handle completed quest discussion event
  useEffect(() => {
    const handleDiscussCompletedQuest = (event: CustomEvent) => {
      if (event.detail && event.detail.quest) {
        const completedQuest = event.detail.quest;
        setDiscussingQuest(completedQuest);
        
        // Add a user message about the completed quest
        const userMessage: ChatMessage = {
          text: `I just completed the quest "${completedQuest.title}" and I'd like to discuss it.`,
          sender: 'user',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, userMessage]);
        
        // Get the conversation template for this quest type
        const conversationTemplate = getConversationForQuest(completedQuest);
        
        // Start the initial conversation
        playConversationPath(conversationTemplate.initialMessages);
      }
    };
    
    // Add event listener
    window.addEventListener('discussCompletedQuest', handleDiscussCompletedQuest as EventListener);
    
    // Clean up
    return () => {
      window.removeEventListener('discussCompletedQuest', handleDiscussCompletedQuest as EventListener);
    };
  }, [quests]);

  // Store completed quest details in localStorage to handle page navigation
  useEffect(() => {
    // Check localStorage for pending quest discussion 
    const pendingQuestDiscussion = localStorage.getItem('pendingQuestDiscussion');
    if (pendingQuestDiscussion) {
      try {
        const quest = JSON.parse(pendingQuestDiscussion);
        // Dispatch event to trigger discussion
        const event = new CustomEvent('discussCompletedQuest', { 
          detail: { quest } 
        });
        window.dispatchEvent(event);
        // Clear from storage after processing
        localStorage.removeItem('pendingQuestDiscussion');
      } catch (error) {
        console.error('Error processing pending quest discussion:', error);
      }
    }
  }, []);

  // Scroll to bottom of messages when messages change or typing starts/stops
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };
  
  const sendMessage = () => {
    if (!replyText.trim()) return;

    // Check message triggers
    const trimmedInput = replyText.trim();
    console.log("Message input:", trimmedInput);
    
    // Li Wei trigger
    if (trimmedInput.toLowerCase().includes("li wei") && !isPlayingMockConversation) {
      console.log("Li Wei trigger activated", trimmedInput);
      // Add user message
      const newUserMessage: ChatMessage = {
        text: replyText,
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages([...messages, newUserMessage]);
      setReplyText('');
      
      // Start the Li Wei conversation
      startLiWeiConversation();
      return;
    }
    
    // Samira trigger
    if (trimmedInput.toLowerCase().includes("samira") && !isPlayingMockConversation) {
      console.log("Samira trigger activated", trimmedInput);
      // Add user message
      const newUserMessage: ChatMessage = {
        text: replyText,
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages([...messages, newUserMessage]);
      setReplyText('');
      
      // Start the Samira conversation
      startSamiraConversation();
      return;
    }
    
    // Javier trigger
    if (trimmedInput.toLowerCase().includes("javier") && !isPlayingMockConversation) {
      console.log("Javier trigger activated", trimmedInput);
      // Add user message
      const newUserMessage: ChatMessage = {
        text: replyText,
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages([...messages, newUserMessage]);
      setReplyText('');
      
      // Start the Javier conversation
      startJavierConversation();
      return;
    }
    
    // Aisha trigger
    if (trimmedInput.toLowerCase().includes("aisha") && !isPlayingMockConversation) {
      console.log("Aisha trigger activated", trimmedInput);
      // Add user message
      const newUserMessage: ChatMessage = {
        text: replyText,
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages([...messages, newUserMessage]);
      setReplyText('');
      
      // Start the Aisha conversation
      startAishaConversation();
      return;
    }

    // Kofi trigger
    if (trimmedInput.toLowerCase().includes("kofi") && !isPlayingMockConversation) {
      console.log("Kofi trigger activated", trimmedInput);
      // Add user message
      const newUserMessage: ChatMessage = {
        text: replyText,
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages([...messages, newUserMessage]);
      setReplyText('');
      
      // Start the Kofi conversation
      startKofiConversation();
      return;
    }

    // Ahmed trigger
    if (trimmedInput.toLowerCase().includes("ahmed") && !isPlayingMockConversation) {
      console.log("Ahmed trigger activated", trimmedInput);
      // Add user message
      const newUserMessage: ChatMessage = {
        text: replyText,
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages([...messages, newUserMessage]);
      setReplyText('');
      
      // Start the Ahmed conversation
      startAhmedConversation();
      return;
    }

    // Regular message handling
    const newUserMessage: ChatMessage = {
      text: replyText,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, newUserMessage]);
    setReplyText('');
    
    // Show typing animation
    setIsTyping(true);
    
    // Simulate AI response with delay
    setTimeout(() => {
      const aiResponse: ChatMessage = { 
        text: "I'm your AI assistant. I'm here to help you with your quests and adventures.", 
        sender: 'ai',
        timestamp: new Date()
      };
      setIsTyping(false);
      setMessages(prev => [...prev, aiResponse]);
    }, 2500); // Longer delay to show the animation
  };

  // Start the Li Wei conversation
  const startLiWeiConversation = () => {
    console.log("Starting Li Wei conversation");
    setIsPlayingMockConversation(true);
    
    let currentIndex = 0;
    let cumulativeDelay = 0;
    
    // Process each message in the conversation
    liWeiConversation.forEach((msg, index) => {
      console.log(`Scheduling message ${index}:`, msg.text);
      cumulativeDelay += msg.delay;
      
      setTimeout(() => {
        console.log(`Playing message ${index}:`, msg.text);
        // If it's an AI message, show typing indicator before displaying
        if (msg.sender === 'ai') {
          setIsTyping(true);
          
          // After a "typing" delay, show the message
          setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, {
              text: msg.text,
              sender: msg.sender,
              timestamp: new Date(),
              hasQuestsButton: msg.hasQuestsButton
            }]);
            
            // If this is the last AI message that asks about viewing quests, update the quest data
            if (index === liWeiConversation.length - 1) {
              updateQuestsForLiWei();
            }
          }, 1500); // Typing duration
        } else {
          // User messages appear immediately
          setMessages(prev => [...prev, {
            text: msg.text,
            sender: msg.sender,
            timestamp: new Date()
          }]);
        }
        
        // Check if we're at the end of the conversation
        if (index === liWeiConversation.length - 1) {
          setIsPlayingMockConversation(false);
        }
      }, cumulativeDelay);
    });
  };
  
  // Update the quests and weekly goals for Li Wei
  const updateQuestsForLiWei = () => {
    // Update quests and weekly goals using context
    setQuests(liWeiQuests);
    setWeeklyGoals(liWeiWeeklyGoals);
  };

  // Start the Samira conversation
  const startSamiraConversation = () => {
    console.log("Starting Samira conversation");
    setIsPlayingMockConversation(true);
    
    let cumulativeDelay = 0;
    
    // Process each message in the conversation
    samiraConversation.forEach((msg, index) => {
      console.log(`Scheduling Samira message ${index}:`, msg.text);
      cumulativeDelay += msg.delay;
      
      setTimeout(() => {
        console.log(`Playing Samira message ${index}:`, msg.text);
        // If it's an AI message, show typing indicator before displaying
        if (msg.sender === 'ai') {
          setIsTyping(true);
          
          // After a "typing" delay, show the message
          setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, {
              text: msg.text,
              sender: msg.sender,
              timestamp: new Date(),
              hasQuestsButton: msg.hasQuestsButton
            }]);
            
            // If this is the last AI message, update the quest data
            if (index === samiraConversation.length - 1) {
              updateQuestsForSamira();
            }
          }, 1500); // Typing duration
        } else {
          // User messages appear immediately
          setMessages(prev => [...prev, {
            text: msg.text,
            sender: msg.sender,
            timestamp: new Date()
          }]);
        }
        
        // Check if we're at the end of the conversation
        if (index === samiraConversation.length - 1) {
          setIsPlayingMockConversation(false);
        }
      }, cumulativeDelay);
    });
  };

  // Update the quests and weekly goals for Samira
  const updateQuestsForSamira = () => {
    // Update quests and weekly goals using context
    setQuests(samiraQuests);
    setWeeklyGoals(samiraWeeklyGoals);
  };

  // Start the Javier conversation
  const startJavierConversation = () => {
    console.log("Starting Javier conversation");
    setIsPlayingMockConversation(true);
    
    let cumulativeDelay = 0;
    
    // Process each message in the conversation
    javierConversation.forEach((msg, index) => {
      console.log(`Scheduling Javier message ${index}:`, msg.text);
      cumulativeDelay += msg.delay;
      
      setTimeout(() => {
        console.log(`Playing Javier message ${index}:`, msg.text);
        // If it's an AI message, show typing indicator before displaying
        if (msg.sender === 'ai') {
          setIsTyping(true);
          
          // After a "typing" delay, show the message
          setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, {
              text: msg.text,
              sender: msg.sender,
              timestamp: new Date(),
              hasQuestsButton: msg.hasQuestsButton
            }]);
            
            // If this is the last AI message, update the quest data
            if (index === javierConversation.length - 1) {
              updateQuestsForJavier();
            }
          }, 1500); // Typing duration
        } else {
          // User messages appear immediately
          setMessages(prev => [...prev, {
            text: msg.text,
            sender: msg.sender,
            timestamp: new Date()
          }]);
        }
        
        // Check if we're at the end of the conversation
        if (index === javierConversation.length - 1) {
          setIsPlayingMockConversation(false);
        }
      }, cumulativeDelay);
    });
  };

  // Update the quests and weekly goals for Javier
  const updateQuestsForJavier = () => {
    // Update quests and weekly goals using context
    setQuests(javierQuests);
    setWeeklyGoals(javierWeeklyGoals);
  };

  // Start the Aisha conversation
  const startAishaConversation = () => {
    console.log("Starting Aisha conversation");
    setIsPlayingMockConversation(true);
    
    let cumulativeDelay = 0;
    
    // Process each message in the conversation
    aishaConversation.forEach((msg, index) => {
      console.log(`Scheduling Aisha message ${index}:`, msg.text);
      cumulativeDelay += msg.delay;
      
      setTimeout(() => {
        console.log(`Playing Aisha message ${index}:`, msg.text);
        // If it's an AI message, show typing indicator before displaying
        if (msg.sender === 'ai') {
          setIsTyping(true);
          
          // After a "typing" delay, show the message
          setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, {
              text: msg.text,
              sender: msg.sender,
              timestamp: new Date(),
              hasQuestsButton: msg.hasQuestsButton
            }]);
            
            // If this is the last AI message, update the quest data
            if (index === aishaConversation.length - 1) {
              updateQuestsForAisha();
            }
          }, 1500); // Typing duration
        } else {
          // User messages appear immediately
          setMessages(prev => [...prev, {
            text: msg.text,
            sender: msg.sender,
            timestamp: new Date()
          }]);
        }
        
        // Check if we're at the end of the conversation
        if (index === aishaConversation.length - 1) {
          setIsPlayingMockConversation(false);
        }
      }, cumulativeDelay);
    });
  };

  // Update the quests and weekly goals for Aisha
  const updateQuestsForAisha = () => {
    // Update quests and weekly goals using context
    setQuests(aishaQuests);
    setWeeklyGoals(aishaWeeklyGoals);
  };

  // Start the Kofi conversation
  const startKofiConversation = () => {
    console.log("Starting Kofi conversation");
    setIsPlayingMockConversation(true);
    
    let cumulativeDelay = 0;
    
    // Process each message in the conversation
    kofiConversation.forEach((msg, index) => {
      console.log(`Scheduling Kofi message ${index}:`, msg.text);
      cumulativeDelay += msg.delay;
      
      setTimeout(() => {
        console.log(`Playing Kofi message ${index}:`, msg.text);
        // If it's an AI message, show typing indicator before displaying
        if (msg.sender === 'ai') {
          setIsTyping(true);
          
          // After a "typing" delay, show the message
          setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, {
              text: msg.text,
              sender: msg.sender,
              timestamp: new Date(),
              hasQuestsButton: msg.hasQuestsButton
            }]);
            
            // If this is the last AI message, update the quest data
            if (index === kofiConversation.length - 1) {
              updateQuestsForKofi();
            }
          }, 1500); // Typing duration
        } else {
          // User messages appear immediately
          setMessages(prev => [...prev, {
            text: msg.text,
            sender: msg.sender,
            timestamp: new Date()
          }]);
        }
        
        // Check if we're at the end of the conversation
        if (index === kofiConversation.length - 1) {
          setIsPlayingMockConversation(false);
        }
      }, cumulativeDelay);
    });
  };

  // Update the quests and weekly goals for Kofi
  const updateQuestsForKofi = () => {
    // Update quests and weekly goals using context
    setQuests(kofiQuests);
    setWeeklyGoals(kofiWeeklyGoals);
  };

  // Start the Ahmed conversation
  const startAhmedConversation = () => {
    console.log("Starting Ahmed conversation");
    setIsPlayingMockConversation(true);
    
    let cumulativeDelay = 0;
    
    // Process each message in the conversation
    ahmedConversation.forEach((msg, index) => {
      console.log(`Scheduling Ahmed message ${index}:`, msg.text);
      cumulativeDelay += msg.delay;
      
      setTimeout(() => {
        console.log(`Playing Ahmed message ${index}:`, msg.text);
        // If it's an AI message, show typing indicator before displaying
        if (msg.sender === 'ai') {
          setIsTyping(true);
          
          // After a "typing" delay, show the message
          setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, {
              text: msg.text,
              sender: msg.sender,
              timestamp: new Date(),
              hasQuestsButton: msg.hasQuestsButton
            }]);
            
            // If this is the last AI message, update the quest data
            if (index === ahmedConversation.length - 1) {
              updateQuestsForAhmed();
            }
          }, 1500); // Typing duration
        } else {
          // User messages appear immediately
          setMessages(prev => [...prev, {
            text: msg.text,
            sender: msg.sender,
            timestamp: new Date()
          }]);
        }
        
        // Check if we're at the end of the conversation
        if (index === ahmedConversation.length - 1) {
          setIsPlayingMockConversation(false);
        }
      }, cumulativeDelay);
    });
  };

  // Update the quests and weekly goals for Ahmed
  const updateQuestsForAhmed = () => {
    // Update quests and weekly goals using context
    setQuests(ahmedQuests);
    setWeeklyGoals(ahmedWeeklyGoals);
  };

  // Handle keyboard events for the textarea
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Send message on Enter without Shift (Shift+Enter creates a new line)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent default to avoid new line
      if (replyText.trim()) {
        sendMessage();
      }
    }
  };

  // Format timestamp to display in a readable format
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Render choice buttons if there are active choices
  const renderChoiceButtons = () => {
    if (activeChoices.length > 0) {
      return (
        <div className="flex flex-wrap gap-2 mt-4">
          {activeChoices.map((choice, index) => (
            <button 
              key={index} 
              onClick={() => handleChoiceSelection(choice)}
              className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {choice}
            </button>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderQuestsButton = (message: ChatMessage) => {
    if (message.hasQuestsButton) {
      // Check if this is a breathing exercise message from the help flow
      const isBreathingTask = message.text.includes("breathing exercise") && 
                              sessionStorage.getItem('helpRequest') === 'processed';
      
      return (
        <button
          onClick={isBreathingTask ? goToBreathingTask : goToQuestsFromMock}
          className="mt-2 px-4 py-2 bg-green-100 text-green-700 rounded-md border border-green-300 hover:bg-green-200 transition-colors"
        >
          View Task{isBreathingTask ? "" : "s"}
        </button>
      );
    }
    return null;
  };

  // After the existing useEffect blocks, add a new useEffect for the help request
  useEffect(() => {
    // Check if we have a help request from the home page
    const helpRequest = sessionStorage.getItem('helpRequest');
    
    // Only process if it's a new help request, not one that's already been processed
    if (helpRequest && helpRequest !== 'processed') {
      // Add the user message
      const userMessage: ChatMessage = {
        text: helpRequest,
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Mark as processed instead of clearing completely
      sessionStorage.removeItem('helpRequest');
      sessionStorage.setItem('helpRequest', 'processed');
      
      // Show AI typing indicator
      setIsTyping(true);
      
      // After a short delay, add the AI response with breathing exercise
      setTimeout(() => {
        setIsTyping(false);
        
        const aiResponse: ChatMessage = {
          text: "I'm here for you. Let's start with a short breathing exercise to help you feel more centered. Take a slow deep breath in for 4 counts, hold for 2, and exhale for 6. Let's do this together 3 times.",
          sender: 'ai',
          timestamp: new Date(),
          hasQuestsButton: true // This will show a button to create a task
        };
        
        setMessages(prev => [...prev, aiResponse]);
        
        // Create a breathing exercise quest
        const breathingQuest: Quest = {
          id: Date.now(),
          title: 'Mindful Breathing Exercise',
          description: 'Complete a 3-minute breathing exercise: inhale for 4 counts, hold for 2, exhale for 6. Repeat 3 times.',
          status: 'active',
          difficulty: 'easy',
          xp: 50,
          category: 'calm',
          tags: ['Resilience', 'Presence', 'Vitality'] as StatTag[]
        };
        
        // Add the quest to the user's quests
        addQuest(breathingQuest);
        
        // Store the breathing quest ID to know which one to filter for
        sessionStorage.setItem('breathingQuestId', breathingQuest.id.toString());
      }, 2000);
    }
  }, []);

  return (
    <div className={`flex flex-col h-screen ${getThemeClasses('background')}`}>
      {/* Header */}
      <header className={`${getThemeClasses('surface')} p-4 border-b ${getThemeClasses('border')} text-center`}>
        <h1 className={`text-black ${getThemeClasses('heading')} text-xl`}>Thrive System Chat</h1>
      </header>

      {/* Chat Messages - Adjusted to take available space minus fixed components */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.sender === 'ai' ? 'justify-start' : 'justify-end'} mb-4`}>
            <div className={`max-w-3/4 p-3 rounded-lg ${
              message.sender === 'ai' 
              ? 'bg-gray-100 text-gray-800' 
              : 'bg-green-600 text-white'
            }`}>
              <div className="text-sm">
                {message.text}
              </div>
              <div className="text-xs mt-1 text-right opacity-75">
                {formatTime(message.timestamp)}
              </div>
              {message.sender === 'ai' && renderQuestsButton(message)}
            </div>
          </div>
        ))}
        
        {/* Render choice buttons if available */}
        {renderChoiceButtons()}
        
        {/* Typing Animation */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-blue-600 text-white rounded-lg rounded-bl-none p-3 max-w-[80%]">
              <div className="flex items-end space-x-2 h-6 px-2">
                <div className="typing-dot w-2 h-2 bg-blue-300 rounded-full"></div>
                <div className="typing-dot w-2 h-2 bg-blue-300 rounded-full"></div>
                <div className="typing-dot w-2 h-2 bg-blue-300 rounded-full"></div>
              </div>
            </div>
          </div>
        )}
        
        {/* Invisible div for auto-scrolling */}
        <div ref={messagesEndRef} />
      </div>

      {/* Reply Component */}
      <form onSubmit={handleSendMessage} className={`${getThemeClasses('surface')} border-t ${getThemeClasses('border')} py-6`}>
        <div className="max-w-4xl mx-auto px-4 pb-20">
          <div className="flex items-center mb-2">
            <div className={`w-8 h-8 rounded-full ${getThemeClasses('primary')} flex items-center justify-center mr-2`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <span className={`${getThemeClasses('text')} text-sm font-medium`}>You are replying to Thrive System</span>
          </div>
          <div className={`${getThemeClasses('surface')} rounded-lg p-3 border ${getThemeClasses('border')}`}>
            <textarea 
              ref={textareaRef}
              placeholder={activeChoices.length > 0 ? "Please select an option above..." : "Write your message... (Press Enter to send)"}
              className={`w-full bg-transparent ${getThemeClasses('text')} resize-none outline-none min-h-[60px] placeholder-black`}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping || isPlayingMockConversation || activeChoices.length > 0}
            ></textarea>
            <div className={`flex justify-between items-center mt-2 pt-2 border-t ${getThemeClasses('border')}`}>
              <div className="flex space-x-2">
                <button type="button" className={`p-1 ${getThemeClasses('textSecondary')} hover:${getThemeClasses('primary')} transition-colors`} disabled={activeChoices.length > 0}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button type="button" className={`p-1 ${getThemeClasses('textSecondary')} hover:${getThemeClasses('primary')} transition-colors`} disabled={activeChoices.length > 0}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4a.5.5 0 01-.5-.5v-6.5a.5.5 0 01.5-.5h12a.5.5 0 01.5.5V15a.5.5 0 01-.5.5z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <button 
                type="submit" 
                className={`${
                  isTyping || isPlayingMockConversation || !replyText.trim() || activeChoices.length > 0
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : `${getThemeClasses('primary')} hover:opacity-90`
                } text-black rounded-lg px-4 py-1 text-sm font-medium transition-colors flex items-center`}
                disabled={isTyping || isPlayingMockConversation || !replyText.trim() || activeChoices.length > 0}
              >
                <span>{isTyping ? 'AI Typing...' : (isPlayingMockConversation ? 'Conversation in progress...' : 'Send')}</span>
                {!isTyping && !isPlayingMockConversation && (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-1" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatView;
