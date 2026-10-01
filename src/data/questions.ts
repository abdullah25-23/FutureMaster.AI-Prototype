import { DimensionKey, QuestionOption } from '../types';

export interface Question {
  id: string;
  scenario: string;
  emoji: string;
  prompt: string;
  targets: DimensionKey[];
  options: QuestionOption[];
  requiresTag?: string;
  note?: string;
  once?: boolean;
}

const o = (id: string, label: string, effects: QuestionOption['effects'], tag?: string): QuestionOption => ({ id, label, effects, tag });

export const questionBank: Question[] = [
  { id: 'exhibition', scenario: 'School Exhibition', emoji: '🏫', prompt: 'Your class is preparing a science exhibition. Which role would you enjoy most?',
    targets: ['technologyInterest', 'creativity', 'communication', 'leadership', 'researchInterest'],
    options: [
      o('a', 'Programming a robot', { technologyInterest: 14, analyticalThinking: 6, handsOnWork: 4 }),
      o('b', 'Designing the poster', { creativity: 14, communication: 4 }),
      o('c', 'Presenting the project', { communication: 14, leadership: 5 }),
      o('d', 'Organizing the team', { leadership: 14, businessInterest: 5, communication: 3 }),
      o('e', 'Researching ideas', { researchInterest: 14, analyticalThinking: 6 }),
    ] },
  { id: 'broken-device', scenario: 'Broken Device', emoji: '🔧', prompt: 'A family device suddenly stops working. What interests you most?',
    targets: ['analyticalThinking', 'handsOnWork', 'technologyInterest', 'creativity'],
    options: [
      o('a', 'Finding the cause', { analyticalThinking: 14, researchInterest: 5 }),
      o('b', 'Trying to repair it', { handsOnWork: 14, technologyInterest: 6 }),
      o('c', 'Learning how it works', { researchInterest: 12, technologyInterest: 8 }),
      o('d', 'Improving its design', { creativity: 12, analyticalThinking: 5, handsOnWork: 4 }),
      o('e', 'Organizing a solution', { leadership: 10, businessInterest: 8 }),
    ] },
  { id: 'group-project', scenario: 'Group Project', emoji: '👥', prompt: 'Your group has a big project. Which role feels most natural?',
    targets: ['analyticalThinking', 'researchInterest', 'creativity', 'communication', 'leadership'],
    options: [
      o('a', 'Technical problem solving', { analyticalThinking: 12, technologyInterest: 8 }),
      o('b', 'Research', { researchInterest: 14, analyticalThinking: 4 }),
      o('c', 'Design', { creativity: 14 }),
      o('d', 'Explaining', { communication: 14, helpingPeople: 5 }),
      o('e', 'Team organization', { leadership: 14, businessInterest: 4 }),
    ] },
  { id: 'area-pick', scenario: 'Areas of Life', emoji: '🌍', prompt: 'Imagine spending a free week learning about one area. Which sounds best?',
    targets: ['helpingPeople', 'technologyInterest', 'businessInterest', 'creativity'],
    options: [
      o('a', 'How the human body and health work', { helpingPeople: 10, researchInterest: 8 }, 'healthcare'),
      o('b', 'How apps and AI are built', { technologyInterest: 14, analyticalThinking: 6 }),
      o('c', 'How businesses start and grow', { businessInterest: 14, leadership: 6 }),
      o('d', 'How stories, art and media are made', { creativity: 14, communication: 6 }),
      o('e', 'How buildings and machines are engineered', { handsOnWork: 10, analyticalThinking: 8 }),
    ] },
  { id: 'hc-1', scenario: 'Healthcare Path', emoji: '🩺', requiresTag: 'healthcare', once: true,
    note: 'You showed interest in healthcare, so we are exploring which parts of it feel like you.',
    prompt: 'Healthcare has many kinds of work. Which part feels most like you?',
    targets: ['helpingPeople', 'researchInterest'],
    options: [
      o('a', 'Treating patients directly', { helpingPeople: 12, handsOnWork: 8 }),
      o('b', 'Understanding how medicines and the body work', { researchInterest: 12, analyticalThinking: 6 }),
      o('c', 'Supporting people\'s minds and wellbeing', { helpingPeople: 12, communication: 8 }),
      o('d', 'I strongly prefer to avoid seeing blood', { helpingPeople: 4 }, 'avoid-blood'),
    ] },
  { id: 'hc-2', scenario: 'Healthcare, Your Way', emoji: '🧬', requiresTag: 'avoid-blood', once: true,
    note: 'Healthcare is still open to you. One answer never removes a whole field, so here are less hands-on areas.',
    prompt: 'Which of these health-related areas sounds interesting?',
    targets: ['helpingPeople', 'researchInterest', 'technologyInterest'],
    options: [
      o('a', 'Psychology', { helpingPeople: 12, communication: 8 }),
      o('b', 'Pharmacy', { researchInterest: 10, analyticalThinking: 8, helpingPeople: 4 }),
      o('c', 'Nutrition', { helpingPeople: 10, researchInterest: 6 }),
      o('d', 'Medical Research', { researchInterest: 14, analyticalThinking: 6 }),
      o('e', 'Public Health', { helpingPeople: 10, leadership: 6, communication: 4 }),
      o('f', 'Healthcare Technology', { technologyInterest: 12, helpingPeople: 6 }),
      o('g', 'Biomedical Sciences', { researchInterest: 12, technologyInterest: 6 }),
    ] },
  { id: 'weekend-build', scenario: 'Free Weekend', emoji: '🛠️', prompt: 'You have a free weekend and a small budget. What would you most like to make?',
    targets: ['creativity', 'handsOnWork', 'technologyInterest'],
    options: [
      o('a', 'A short animated video or comic', { creativity: 14, technologyInterest: 4 }),
      o('b', 'A working model or gadget', { handsOnWork: 14, technologyInterest: 6 }),
      o('c', 'A simple app or game', { technologyInterest: 14, creativity: 6, analyticalThinking: 4 }),
      o('d', 'A fundraiser for a cause', { helpingPeople: 12, leadership: 8 }),
    ] },
  { id: 'volunteer', scenario: 'Community Day', emoji: '🤲', prompt: 'Your school is running a community help day. What would you volunteer for?',
    targets: ['helpingPeople', 'communication', 'leadership'],
    options: [
      o('a', 'Teaching younger students', { helpingPeople: 12, communication: 10 }),
      o('b', 'Coordinating volunteers', { leadership: 14, businessInterest: 4 }),
      o('c', 'Setting up equipment and stalls', { handsOnWork: 12 }),
      o('d', 'Surveying what the community needs', { researchInterest: 10, analyticalThinking: 8 }),
    ] },
  { id: 'fair-stall', scenario: 'Fair Stall', emoji: '🛍️', prompt: 'Your class runs a stall at a school fair. What would you take charge of?',
    targets: ['businessInterest', 'leadership', 'communication'],
    options: [
      o('a', 'Deciding prices and tracking money', { businessInterest: 14, analyticalThinking: 6 }),
      o('b', 'Convincing visitors to stop by', { communication: 12, businessInterest: 8 }),
      o('c', 'Designing the stall look', { creativity: 12 }),
      o('d', 'Planning who does what', { leadership: 14 }),
    ] },
  { id: 'mystery', scenario: 'Science Mystery', emoji: '🔬', prompt: 'Plants in your school garden keep drying out. What would you do first?',
    targets: ['researchInterest', 'analyticalThinking', 'handsOnWork'],
    options: [
      o('a', 'Test soil, light and water to find a pattern', { researchInterest: 14, analyticalThinking: 8 }),
      o('b', 'Build a simple watering system', { handsOnWork: 12, technologyInterest: 8 }),
      o('c', 'Ask experts and read about it', { researchInterest: 10, communication: 6 }),
      o('d', 'Redesign the garden layout', { creativity: 12, handsOnWork: 4 }),
    ] },
  { id: 'debate', scenario: 'Class Debate', emoji: '🎤', prompt: 'Your class holds a debate on technology in schools. What would you enjoy?',
    targets: ['communication', 'analyticalThinking', 'leadership'],
    options: [
      o('a', 'Speaking for the team', { communication: 14, leadership: 5 }),
      o('b', 'Preparing the strongest facts', { researchInterest: 10, analyticalThinking: 10 }),
      o('c', 'Writing the opening speech', { communication: 10, creativity: 8 }),
      o('d', 'Leading the planning', { leadership: 14 }),
    ] },
  { id: 'puzzle', scenario: 'Puzzle Night', emoji: '🧩', prompt: 'A tricky logic puzzle appears. What do you do?',
    targets: ['analyticalThinking', 'technologyInterest'],
    options: [
      o('a', 'Break it into small steps', { analyticalThinking: 14, technologyInterest: 4 }),
      o('b', 'Look for a clever shortcut', { analyticalThinking: 10, creativity: 8 }),
      o('c', 'Work on it together with friends', { communication: 10, leadership: 4 }),
      o('d', 'Write a small program to solve it', { technologyInterest: 14, analyticalThinking: 8 }),
    ] },
  { id: 'poster-story', scenario: 'Creative Challenge', emoji: '🎨', prompt: 'You can create anything for the school magazine. What do you pick?',
    targets: ['creativity', 'communication'],
    options: [
      o('a', 'An illustration or design', { creativity: 14 }),
      o('b', 'A story or article', { creativity: 10, communication: 10 }),
      o('c', 'An interactive digital feature', { creativity: 8, technologyInterest: 10 }),
      o('d', 'A survey of student opinions', { researchInterest: 10, analyticalThinking: 6 }),
    ] },
];

export interface QuestionState {
  askedIds: string[];
  tags: string[];
  evidence: Record<DimensionKey, number>;
  dims: Record<DimensionKey, number>;
  lastNote?: string;
}

export function pickQuestion(s: QuestionState): { question: Question; note?: string } {
  const unasked = questionBank.filter(q => !s.askedIds.includes(q.id));
  const pool = unasked.length ? unasked : questionBank.filter(q => !q.once);
  const branch = pool.find(q => q.requiresTag && s.tags.includes(q.requiresTag));
  if (branch) return { question: branch, note: branch.note };
  const open = pool.filter(q => !q.requiresTag);
  let best = open[0]; let bestScore = -1;
  for (const q of open) {
    const sc = q.targets.reduce((a, d) => a + 1 / (1 + s.evidence[d]), 0) / q.targets.length;
    if (sc > bestScore) { best = q; bestScore = sc; }
  }
  let note: string | undefined;
  const dimEntries = Object.entries(s.dims) as [DimensionKey, number][];
  const high = dimEntries.sort((a, b) => b[1] - a[1])[0];
  const lowTarget = best.targets.slice().sort((a, b) => s.evidence[a] - s.evidence[b])[0];
  if (s.askedIds.length >= 3 && s.evidence[lowTarget] === 0 && high[1] >= 50) {
    note = `Your ${dimLabel(high[0])} pattern is already forming. Next we'll explore ${dimLabel(lowTarget)}, which is still unclear.`;
  }
  return { question: best, note };
}

const labels: Record<DimensionKey, string> = {
  analyticalThinking: 'analytical thinking', technologyInterest: 'technology interest', creativity: 'creativity',
  helpingPeople: 'helping people', leadership: 'leadership', communication: 'communication',
  handsOnWork: 'hands-on work', researchInterest: 'research interest', businessInterest: 'business interest',
};
function dimLabel(d: DimensionKey) { return labels[d]; }
