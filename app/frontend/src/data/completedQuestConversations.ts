import { Quest } from '../components/quest-log/types';

/**
 * Interface for a conversation message
 */
export interface ConversationMessage {
  text: string;
  sender: 'user' | 'ai';
  delay: number;
  isUserChoice?: boolean;
  choices?: string[];
  isSystemMessage?: boolean;
}

/**
 * Interface for a conversation template
 */
export interface ConversationTemplate {
  initialMessages: ConversationMessage[];
  experiencePositive: ConversationMessage[];
  experienceNegative: ConversationMessage[];
  followUpQuest?: Quest;
}

/**
 * Generic conversation templates based on quest category
 */
export const completedQuestConversations: Record<string, ConversationTemplate> = {
  // Physical category conversations
  physical: {
    initialMessages: [
      {
        text: "How did you find completing this physical activity? Was it challenging or did it feel good?",
        sender: 'ai',
        delay: 1000,
        isUserChoice: true,
        choices: ["It felt great!", "It was quite challenging"]
      }
    ],
    experiencePositive: [
      { text: "It felt great! I actually had more energy afterward.", sender: 'user', delay: 1000 },
      { text: "That's fantastic! Physical activities often create an 'energy paradox' - expending energy to gain more. Your body releases endorphins during exercise which boost mood and energy levels.", sender: 'ai', delay: 2000 },
      { text: "Did you notice any specific changes in your focus or productivity after completing it?", sender: 'ai', delay: 2500, isUserChoice: true, choices: ["Yes, I felt more focused", "Not really"] },
      { text: "Yes, I felt more focused afterward.", sender: 'user', delay: 1000 },
      { text: "That's a common and beneficial effect! Exercise increases blood flow to the brain and promotes the release of brain-derived neurotrophic factor (BDNF), which enhances cognitive function.", sender: 'ai', delay: 2500 },
      { text: "Since you've experienced these benefits, would you like to build on this success with a more challenging physical quest?", sender: 'ai', delay: 2000, isUserChoice: true, choices: ["Yes, I'd like that", "Not right now"] },
      { text: "Yes, I'd like that.", sender: 'user', delay: 1000 },
      { text: "Great! I've created a follow-up quest that builds on what you've accomplished. Check your quest log for '45-Minute Cardio Challenge' - it's designed to extend your endurance while maintaining that positive energy flow you experienced.", sender: 'ai', delay: 3000 }
    ],
    experienceNegative: [
      { text: "It was quite challenging. I found it harder than I expected.", sender: 'user', delay: 1000 },
      { text: "Thank you for sharing that. It's completely normal to find physical activities challenging, especially when starting out or trying something new. The fact that you completed it despite the difficulty shows real commitment.", sender: 'ai', delay: 2500 },
      { text: "What was the most difficult part for you?", sender: 'ai', delay: 2000, isUserChoice: true, choices: ["Getting started", "Keeping energy throughout"] },
      { text: "Getting started was the hardest part.", sender: 'user', delay: 1000 },
      { text: "That's very common! The initial activation energy needed to begin an activity is often the highest hurdle. Research shows that once we're 5 minutes into an activity, our brain's resistance significantly decreases.", sender: 'ai', delay: 2500 },
      { text: "Would you like me to create a quest with a gentler approach that focuses on building a consistent starting routine?", sender: 'ai', delay: 2000, isUserChoice: true, choices: ["Yes, that would help", "No thanks"] },
      { text: "Yes, that would help.", sender: 'user', delay: 1000 },
      { text: "I've added a new quest to your log called 'Micro-Movement Routine'. It focuses on very brief but consistent physical activities that help overcome that initial resistance. The emphasis is on building the habit of starting rather than duration or intensity.", sender: 'ai', delay: 3000 }
    ],
    followUpQuest: {
      id: 101,
      title: '45-Minute Cardio Challenge',
      description: 'Complete a 45-minute cardio session to build endurance and energy levels',
      status: 'active',
      difficulty: 'medium',
      xp: 200,
      category: 'physical',
      tags: ['Endurance', 'Vitality', 'Discipline']
    }
  },

  // Emotional category conversations
  emotional: {
    initialMessages: [
      {
        text: "How did this emotional wellness activity affect you? Did you notice any changes in how you felt afterward?",
        sender: 'ai',
        delay: 1000,
        isUserChoice: true,
        choices: ["I felt more calm and centered", "It was difficult to connect with my emotions"]
      }
    ],
    experiencePositive: [
      { text: "I felt more calm and centered afterward. It helped clear my mind.", sender: 'user', delay: 1000 },
      { text: "That's wonderful to hear! Emotional wellness practices often create that sense of mental clarity. When we give ourselves permission to acknowledge emotions, we reduce the cognitive load of suppressing them.", sender: 'ai', delay: 2500 },
      { text: "Did you find it easier to make decisions after completing this practice?", sender: 'ai', delay: 2000, isUserChoice: true, choices: ["Yes, definitely", "I hadn't noticed"] },
      { text: "Yes, definitely. I felt less conflicted about some choices I needed to make.", sender: 'user', delay: 1000 },
      { text: "That's a powerful benefit! Emotional clarity directly impacts decision-making quality. Studies show that after mindfulness practices, people make more balanced decisions that better align with their values.", sender: 'ai', delay: 2500 },
      { text: "Since you've experienced these benefits, would you be interested in a more immersive emotional wellness challenge?", sender: 'ai', delay: 2000, isUserChoice: true, choices: ["Yes, I'm interested", "Not at this time"] },
      { text: "Yes, I'm interested.", sender: 'user', delay: 1000 },
      { text: "I've created a new quest called 'Emotional Intelligence Journal' that builds on your success. It's a 7-day guided journaling practice that helps identify emotional patterns and develop greater emotional literacy. You'll find it in your quest log!", sender: 'ai', delay: 3000 }
    ],
    experienceNegative: [
      { text: "It was difficult to connect with my emotions. I felt kind of blocked.", sender: 'user', delay: 1000 },
      { text: "Thank you for sharing that honestly. Emotional connection can be challenging, especially in our busy lives. Feeling blocked is actually a common experience and doesn't mean you're doing anything wrong.", sender: 'ai', delay: 2500 },
      { text: "When you attempted the practice, what specifically felt difficult?", sender: 'ai', delay: 2000, isUserChoice: true, choices: ["Identifying what I was feeling", "Making time for reflection"] },
      { text: "Identifying what I was feeling. It was all kind of fuzzy.", sender: 'user', delay: 1000 },
      { text: "That's very insightful. Many people experience emotional granularity challenges - difficulty putting specific labels on emotional states. It's actually a skill that can be developed with practice and the right approach.", sender: 'ai', delay: 2500 },
      { text: "Would you like to try a more structured approach to emotional awareness that might make it easier to identify specific feelings?", sender: 'ai', delay: 2000, isUserChoice: true, choices: ["Yes, please", "No thanks"] },
      { text: "Yes, please.", sender: 'user', delay: 1000 },
      { text: "I've added a quest called 'Emotion Vocabulary Builder' to your log. It provides a structured approach to recognizing emotional states with visual and physical cues. It's designed specifically for those who want to develop more precise emotional awareness.", sender: 'ai', delay: 3000 }
    ],
    followUpQuest: {
      id: 102,
      title: 'Emotional Intelligence Journal',
      description: 'Complete a 7-day guided journaling practice to identify emotional patterns',
      status: 'active',
      difficulty: 'medium',
      xp: 180,
      category: 'emotional',
      tags: ['Clarity', 'Presence', 'Resilience']
    }
  },

  // Finance category conversations  
  finance: {
    initialMessages: [
      {
        text: "How did you find this financial challenge? Did it give you any new insights?",
        sender: 'ai',
        delay: 1000,
        isUserChoice: true,
        choices: ["Yes, it was eye-opening", "It was stressful to track finances"]
      }
    ],
    experiencePositive: [
      { text: "Yes, it was eye-opening. I noticed spending patterns I wasn't aware of before.", sender: 'user', delay: 1000 },
      { text: "That's excellent! Awareness is often the first and most crucial step toward financial wellness. Those patterns can reveal our unconscious financial behaviors and values.", sender: 'ai', delay: 2500 },
      { text: "Did completing this make you feel more in control of your finances?", sender: 'ai', delay: 2000, isUserChoice: true, choices: ["Definitely more in control", "Somewhat, but I need more structure"] },
      { text: "Definitely more in control. I feel empowered to make better decisions now.", sender: 'user', delay: 1000 },
      { text: "That sense of financial empowerment is incredibly valuable! Research shows that financial confidence often leads to better decision-making and reduced financial anxiety, creating a positive cycle.", sender: 'ai', delay: 2500 },
      { text: "Would you like to build on this momentum with a more strategic financial wellness challenge?", sender: 'ai', delay: 2000, isUserChoice: true, choices: ["Yes, I'm ready for more", "Not at this time"] },
      { text: "Yes, I'm ready for more.", sender: 'user', delay: 1000 },
      { text: "Fantastic! I've created a quest called 'Strategic Spending Plan' that builds on your awareness. This quest helps you align your spending with your values and long-term goals. You'll find it in your quest log now.", sender: 'ai', delay: 3000 }
    ],
    experienceNegative: [
      { text: "It was stressful to track finances. I felt anxious looking at the numbers.", sender: 'user', delay: 1000 },
      { text: "Thank you for sharing that. Financial anxiety is actually very common - you're not alone in feeling this way. Money can carry emotional weight for many of us, and that's completely normal.", sender: 'ai', delay: 2500 },
      { text: "What aspect did you find most stressful?", sender: 'ai', delay: 2000, isUserChoice: true, choices: ["Seeing where money was going", "The time it took to track everything"] },
      { text: "Seeing where money was going. Some of my spending habits were uncomfortable to face.", sender: 'user', delay: 1000 },
      { text: "That shows real self-awareness. Confronting our habits can be uncomfortable, but recognizing that discomfort is actually a sign of growth. Financial psychologists call this 'money awareness' - the first step toward healthier financial behaviors.", sender: 'ai', delay: 2800 },
      { text: "Would you be interested in a gentler approach that focuses on positive financial behaviors rather than tracking?", sender: 'ai', delay: 2000, isUserChoice: true, choices: ["Yes, that sounds better", "No thanks"] },
      { text: "Yes, that sounds better.", sender: 'user', delay: 1000 },
      { text: "I've created a quest called 'Positive Money Actions' that takes a completely different approach. Instead of tracking past spending, it focuses on small, positive financial actions each day. This builds confidence and reduces anxiety while still improving financial wellness.", sender: 'ai', delay: 3500 }
    ],
    followUpQuest: {
      id: 103,
      title: 'Strategic Spending Plan',
      description: 'Create a spending plan that aligns with your values and long-term goals',
      status: 'active',
      difficulty: 'hard',
      xp: 250,
      category: 'finance',
      tags: ['Discipline', 'Clarity', 'Knowledge']
    }
  },

  // Mental category conversations
  mental: {
    initialMessages: [
      {
        text: "How did you find this mental challenge? Did it stretch your thinking in helpful ways?",
        sender: 'ai',
        delay: 1000,
        isUserChoice: true,
        choices: ["Yes, it was stimulating", "It was quite demanding"]
      }
    ],
    experiencePositive: [
      { text: "Yes, it was stimulating. I enjoyed the mental exercise.", sender: 'user', delay: 1000 },
      { text: "That's wonderful to hear! Mental challenges can create that positive sense of cognitive engagement often called 'flow' - where we're challenged just enough to feel stimulated but not overwhelmed.", sender: 'ai', delay: 2500 },
      { text: "Did you notice any benefits to your problem-solving in other areas after completing this?", sender: 'ai', delay: 2000, isUserChoice: true, choices: ["Yes, I felt sharper overall", "Not particularly"] },
      { text: "Yes, I felt sharper overall. It seemed to wake up my brain.", sender: 'user', delay: 1000 },
      { text: "That cognitive transfer effect is fascinating! Mental exercises often strengthen neural pathways that benefit multiple cognitive domains - much like how certain physical exercises benefit multiple muscle groups.", sender: 'ai', delay: 2500 },
      { text: "Would you be interested in a more advanced mental challenge that builds on different cognitive skills?", sender: 'ai', delay: 2000, isUserChoice: true, choices: ["Yes, I'd like that", "Not at this time"] },
      { text: "Yes, I'd like that.", sender: 'user', delay: 1000 },
      { text: "Excellent! I've created a new quest called 'Cognitive Connections Challenge' that integrates multiple mental skills in a progressive framework. It's designed to build on your success and create even more neural connectivity. You'll find it in your quest log now.", sender: 'ai', delay: 3000 }
    ],
    experienceNegative: [
      { text: "It was quite demanding. I found it difficult to maintain focus throughout.", sender: 'user', delay: 1000 },
      { text: "Thank you for sharing that honestly. Mental challenges can indeed be demanding, especially in our distraction-filled world. The fact that you completed it despite finding it difficult shows real determination.", sender: 'ai', delay: 2500 },
      { text: "What aspect was most challenging for you?", sender: 'ai', delay: 2000, isUserChoice: true, choices: ["Staying focused", "Understanding the concepts"] },
      { text: "Staying focused. My mind kept wandering to other things.", sender: 'user', delay: 1000 },
      { text: "That's a common experience in our high-stimulation environment. Our attention is constantly pulled in multiple directions. Research shows the average person is distracted every 40 seconds when working at a computer.", sender: 'ai', delay: 2500 },
      { text: "Would you like to try a different approach that incorporates focus-building techniques with mental challenges?", sender: 'ai', delay: 2000, isUserChoice: true, choices: ["Yes, that sounds helpful", "No thanks"] },
      { text: "Yes, that sounds helpful.", sender: 'user', delay: 1000 },
      { text: "I've created a quest called 'Focus-First Mental Challenge' that integrates attention-building practices with cognitive exercises. It starts with shorter, more manageable sessions and gradually builds both focus and mental stamina. You'll find it in your quest log!", sender: 'ai', delay: 3000 }
    ],
    followUpQuest: {
      id: 104,
      title: 'Cognitive Connections Challenge',
      description: 'Complete integrated mental exercises that build multiple cognitive skills',
      status: 'active',
      difficulty: 'hard',
      xp: 220,
      category: 'mental',
      tags: ['Knowledge', 'Focus', 'Creativity']
    }
  },

  // Recovery category conversations
  recovery: {
    initialMessages: [
      {
        text: "How did this recovery activity affect you? Did it help you refresh and restore energy?",
        sender: 'ai',
        delay: 1000,
        isUserChoice: true,
        choices: ["Yes, I feel more restored", "Not as much as I hoped"]
      }
    ],
    experiencePositive: [
      { text: "Yes, I feel more restored. It was exactly what I needed.", sender: 'user', delay: 1000 },
      { text: "That's excellent! Effective recovery is critical but often overlooked in our achievement-focused culture. Your body and mind need this balance between activity and rest.", sender: 'ai', delay: 2500 },
      { text: "Did you notice any changes in your sleep quality after this recovery practice?", sender: 'ai', delay: 2000, isUserChoice: true, choices: ["Yes, I slept better", "I didn't notice a difference"] },
      { text: "Yes, I slept better that night. It felt deeper somehow.", sender: 'user', delay: 1000 },
      { text: "That's a powerful connection! Proper recovery during waking hours has a direct impact on sleep architecture. When we allow our nervous system to downregulate during the day, it creates the conditions for deeper sleep cycles.", sender: 'ai', delay: 2500 },
      { text: "Would you be interested in exploring more structured recovery practices that specifically enhance sleep quality?", sender: 'ai', delay: 2000, isUserChoice: true, choices: ["Yes, I'd like that", "Not right now"] },
      { text: "Yes, I'd like that.", sender: 'user', delay: 1000 },
      { text: "Perfect! I've created a quest called 'Deep Sleep Preparation' that builds on your recovery success. It focuses on evening routines that enhance slow-wave sleep - the most restorative sleep phase. You'll find it in your quest log now!", sender: 'ai', delay: 3000 }
    ],
    experienceNegative: [
      { text: "Not as much as I hoped. I still felt somewhat drained afterward.", sender: 'user', delay: 1000 },
      { text: "Thank you for that honest reflection. Recovery isn't one-size-fits-all, and finding the right approach for your unique system can take some experimentation. The fact that you completed the activity despite not feeling immediate benefits shows commitment.", sender: 'ai', delay: 2800 },
      { text: "What do you think might have limited the effectiveness of this recovery activity for you?", sender: 'ai', delay: 2000, isUserChoice: true, choices: ["My mind was still racing", "The timing wasn't right"] },
      { text: "My mind was still racing. I couldn't really disengage from stress.", sender: 'user', delay: 1000 },
      { text: "That's an insightful observation. Many recovery practices focus on physical rest but don't adequately address cognitive load. For some people, especially those with active minds, cognitive disengagement is actually the more challenging aspect of recovery.", sender: 'ai', delay: 2800 },
      { text: "Would you like to try a recovery approach that specifically targets mental unwinding and thought pattern interruption?", sender: 'ai', delay: 2000, isUserChoice: true, choices: ["Yes, that sounds better", "No thanks"] },
      { text: "Yes, that sounds better.", sender: 'user', delay: 1000 },
      { text: "I've created a quest called 'Cognitive Reset Practice' that focuses specifically on mental unwinding techniques. Unlike traditional relaxation approaches, this quest incorporates pattern-interruption methods that are particularly effective for active minds. You'll find it in your quest log now!", sender: 'ai', delay: 3500 }
    ],
    followUpQuest: {
      id: 105,
      title: 'Deep Sleep Preparation',
      description: 'Complete evening routines designed to enhance slow-wave sleep quality',
      status: 'active',
      difficulty: 'medium',
      xp: 180,
      category: 'recovery',
      tags: ['Vitality', 'Presence', 'Clarity']
    }
  },

  // Calm category conversations
  calm: {
    initialMessages: [
      {
        text: "How did this calm-focused activity affect your stress levels? Did you notice any changes?",
        sender: 'ai',
        delay: 1000,
        isUserChoice: true,
        choices: ["Yes, I feel more balanced", "It was hard to settle my mind"]
      }
    ],
    experiencePositive: [
      { text: "Yes, I feel more balanced. It helped me reset my stress levels.", sender: 'user', delay: 1000 },
      { text: "That's wonderful! Finding that sense of balance is so valuable in our stimulation-heavy world. These practices activate your parasympathetic nervous system - sometimes called 'rest and digest' mode.", sender: 'ai', delay: 2500 },
      { text: "Did you notice any physical changes during or after the practice?", sender: 'ai', delay: 2000, isUserChoice: true, choices: ["Yes, my breathing changed", "Not that I noticed"] },
      { text: "Yes, my breathing changed. It became deeper and slower without me trying.", sender: 'user', delay: 1000 },
      { text: "That's an excellent observation! Breath patterns are directly linked to our nervous system state. That spontaneous shift to deeper, slower breathing is a sign that your body was moving into a parasympathetic dominant state - exactly what these practices aim to achieve.", sender: 'ai', delay: 2800 },
      { text: "Would you be interested in exploring more formal breath-based practices that deepen this calming effect?", sender: 'ai', delay: 2000, isUserChoice: true, choices: ["Yes, I'm interested", "Not at this time"] },
      { text: "Yes, I'm interested.", sender: 'user', delay: 1000 },
      { text: "I've created a quest called 'Breath Regulation Practice' that builds on your natural breathing response. This structured approach helps create an even stronger calming effect through specific breath patterns that signal safety to your nervous system. You'll find it in your quest log now!", sender: 'ai', delay: 3000 }
    ],
    experienceNegative: [
      { text: "It was hard to settle my mind. My thoughts kept racing.", sender: 'user', delay: 1000 },
      { text: "Thank you for sharing that. What you're describing is extremely common, especially when starting practices focused on calm. Our minds are designed to be active, and noticing that activity is actually an important first step - even if it feels challenging.", sender: 'ai', delay: 2800 },
      { text: "What felt most challenging about the experience?", sender: 'ai', delay: 2000, isUserChoice: true, choices: ["Feeling like I was doing it wrong", "Getting frustrated with myself"] },
      { text: "Feeling like I was doing it wrong. Like I should be able to calm my mind more easily.", sender: 'user', delay: 1000 },
      { text: "Many people feel that way, but here's something important: noticing a busy mind doesn't mean you're doing anything wrong. In fact, the moment of noticing is actually the practice working! It's developing awareness, which comes before calm.", sender: 'ai', delay: 2800 },
      { text: "Would you like to try an approach that works differently with a busy mind - one that doesn't try to stop thoughts but relates to them differently?", sender: 'ai', delay: 2000, isUserChoice: true, choices: ["Yes, that sounds better", "No thanks"] },
      { text: "Yes, that sounds better.", sender: 'user', delay: 1000 },
      { text: "I've created a quest called 'Thought Surfing Practice' that takes a completely different approach. Instead of trying to stop thoughts, it teaches you to 'surf' them like waves - acknowledging their presence without getting caught in them. This is often more effective for active minds. You'll find it in your quest log now!", sender: 'ai', delay: 3500 }
    ],
    followUpQuest: {
      id: 106,
      title: 'Breath Regulation Practice',
      description: 'Complete structured breathing exercises to activate the parasympathetic nervous system',
      status: 'active',
      difficulty: 'medium',
      xp: 180,
      category: 'calm',
      tags: ['Presence', 'Clarity', 'Resilience']
    }
  },

  // Default/generic conversation template
  default: {
    initialMessages: [
      {
        text: "How did you find completing this quest? Was it a positive experience?",
        sender: 'ai',
        delay: 1000,
        isUserChoice: true,
        choices: ["Yes, it was great", "It was challenging"]
      }
    ],
    experiencePositive: [
      { text: "Yes, it was great. I found it quite rewarding.", sender: 'user', delay: 1000 },
      { text: "That's wonderful to hear! It's always satisfying when we complete meaningful tasks. The sense of accomplishment activates our brain's reward centers.", sender: 'ai', delay: 2500 },
      { text: "Did you learn anything new about yourself during this process?", sender: 'ai', delay: 2000, isUserChoice: true, choices: ["Yes, I did", "Not really"] },
      { text: "Yes, I did. I realized I'm more capable than I thought.", sender: 'user', delay: 1000 },
      { text: "That's a powerful insight! Self-efficacy - our belief in our own capabilities - often grows when we successfully complete challenges. This creates a positive cycle where each achievement makes us more likely to tackle new challenges.", sender: 'ai', delay: 2800 },
      { text: "Would you like to try a follow-up quest that builds on what you've accomplished?", sender: 'ai', delay: 2000, isUserChoice: true, choices: ["Yes, I'm ready", "Not right now"] },
      { text: "Yes, I'm ready.", sender: 'user', delay: 1000 },
      { text: "Excellent! I've created a new quest called 'Next Level Challenge' that builds on your recent achievement. It's designed to further develop your skills and confidence in this area. You'll find it in your quest log now!", sender: 'ai', delay: 3000 }
    ],
    experienceNegative: [
      { text: "It was challenging. I struggled with parts of it.", sender: 'user', delay: 1000 },
      { text: "Thank you for sharing that honestly. Challenges are where we grow, and recognizing the struggle is actually a sign of self-awareness. The fact that you completed it despite difficulties shows real perseverance.", sender: 'ai', delay: 2800 },
      { text: "What was the most difficult aspect for you?", sender: 'ai', delay: 2000, isUserChoice: true, choices: ["Getting started", "Staying motivated"] },
      { text: "Staying motivated. I almost gave up halfway through.", sender: 'user', delay: 1000 },
      { text: "Yet you persisted - that's tremendous! Motivation naturally fluctuates, and continuing despite that dip shows remarkable grit. Some research suggests that acknowledging motivation challenges actually helps build resilience for future tasks.", sender: 'ai', delay: 2800 },
      { text: "Would you like to try a different approach with a quest designed to build consistent motivation?", sender: 'ai', delay: 2000, isUserChoice: true, choices: ["Yes, please", "No thanks"] },
      { text: "Yes, please.", sender: 'user', delay: 1000 },
      { text: "I've created a quest called 'Motivation Mastery' that focuses on sustainable motivation techniques rather than intensity. It includes smaller milestone celebrations and progress tracking to help maintain momentum. You'll find it in your quest log now!", sender: 'ai', delay: 3000 }
    ],
    followUpQuest: {
      id: 100,
      title: 'Next Level Challenge',
      description: 'Build on your previous achievement with an advanced challenge',
      status: 'active',
      difficulty: 'medium',
      xp: 200,
      category: 'mental',
      tags: ['Focus', 'Discipline', 'Knowledge']
    }
  }
};

/**
 * Function to get a category-appropriate conversation or fall back to default
 */
export const getConversationForQuest = (quest: Quest): ConversationTemplate => {
  const categoryTemplate = completedQuestConversations[quest.category];
  return categoryTemplate || completedQuestConversations.default;
};

/**
 * Generate follow-up quests based on the completed quest
 */
export const generateFollowUpQuest = (quest: Quest): Quest => {
  const template = getConversationForQuest(quest);
  
  if (template.followUpQuest) {
    // Clone and customize the template quest
    const followUpQuest = {
      ...template.followUpQuest,
      id: Date.now(), // Ensure unique ID
      category: quest.category, // Match the category of the completed quest
    };
    
    // If we're using a template from a different category, update the title
    if (template !== completedQuestConversations[quest.category]) {
      followUpQuest.title = `${followUpQuest.title} (${quest.category.charAt(0).toUpperCase() + quest.category.slice(1)})`;
    }
    
    return followUpQuest;
  }
  
  // Fallback: Create a generic follow-up quest
  return {
    id: Date.now(),
    title: `Advanced ${quest.category.charAt(0).toUpperCase() + quest.category.slice(1)} Challenge`,
    description: `Build on your success with ${quest.title} through this advanced challenge`,
    status: 'active',
    difficulty: quest.difficulty === 'easy' ? 'medium' : 'hard',
    xp: quest.xp + 50,
    category: quest.category,
    tags: quest.tags
  };
}; 