import { Question } from '../types';

export const QUESTIONS: Question[] = [
  {
    id: 'morning',
    text: "The sun peeks through the curtains. Your alarm rings. What's the first thought that enters your mind?",
    source: "Emotional Exhaustion",
    miniFigureUrl: "https://picsum.photos/seed/morning/64/80",
    choices: [
      { text: "I've got this. Let's see what today brings.", score: 1 },
      { text: "I'm a bit tired, but I'll manage.", score: 2 },
      { text: "I'm dreading the day ahead.", score: 3 },
      { text: "I feel completely drained already.", score: 4 },
      { text: "Not again. I can't face another day of this.", score: 5 }
    ]
  },
  {
    id: 'focus',
    text: "You're in the middle of a task you used to enjoy. How does it feel now?",
    source: "Cognitive Overload",
    miniFigureUrl: "https://picsum.photos/seed/focus/64/80",
    choices: [
      { text: "Engaging. I'm in the flow.", score: 1 },
      { text: "It's okay, but I'm easily distracted.", score: 2 },
      { text: "It feels like a chore now.", score: 3 },
      { text: "I can't concentrate for more than a few minutes.", score: 4 },
      { text: "Like I'm wading through thick mud. Every step is a struggle.", score: 5 }
    ]
  },
  {
    id: 'social',
    text: "A notification pings. A friend wants to catch up. Your reaction?",
    source: "Interpersonal Burnout",
    miniFigureUrl: "https://picsum.photos/seed/social/64/80",
    choices: [
      { text: "I'd love to, or I'll catch them later.", score: 1 },
      { text: "I'll reply when I have more capacity.", score: 2 },
      { text: "I feel slightly annoyed by the interruption.", score: 3 },
      { text: "I'm avoiding everyone right now.", score: 4 },
      { text: "I want to throw my phone across the room. I have nothing left to give.", score: 5 }
    ]
  },
  {
    id: 'success',
    text: "You've just hit a major milestone. You look at the finished work...",
    source: "Depersonalization",
    miniFigureUrl: "https://picsum.photos/seed/success/64/80",
    choices: [
      { text: "I'm proud of what I've achieved.", score: 1 },
      { text: "It's a good result, I suppose.", score: 2 },
      { text: "I'm just glad it's over.", score: 3 },
      { text: "I don't feel anything about it.", score: 4 },
      { text: "It doesn't matter. It's just another thing done. I feel hollow.", score: 5 }
    ]
  },
  {
    id: 'physical',
    text: "Take a moment to scan your body. What do you notice?",
    source: "Somatic Stress",
    miniFigureUrl: "https://picsum.photos/seed/physical/64/80",
    choices: [
      { text: "I feel grounded and relatively relaxed.", score: 1 },
      { text: "A bit of tension, but nothing unusual.", score: 2 },
      { text: "My neck and shoulders feel tight.", score: 3 },
      { text: "I have a persistent headache or stomach ache.", score: 4 },
      { text: "My shoulders are at my ears. My jaw is tight. I feel heavy.", score: 5 }
    ]
  },
  {
    id: 'future',
    text: "You think about your schedule for the next two weeks...",
    source: "Existential Burnout",
    miniFigureUrl: "https://picsum.photos/seed/future/64/80",
    choices: [
      { text: "There are things I'm excited about.", score: 1 },
      { text: "It looks busy, but manageable.", score: 2 },
      { text: "It feels a bit overwhelming.", score: 3 },
      { text: "I'm just trying to survive until the weekend.", score: 4 },
      { text: "It feels like an endless, gray treadmill. There's no light.", score: 5 }
    ]
  }
];
