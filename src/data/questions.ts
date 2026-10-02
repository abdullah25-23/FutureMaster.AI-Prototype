import { DimensionKey, EducationLevel, QuestionOption } from '../types';

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
  applicableLevels: EducationLevel[];
}

const o = (id: string, label: string, effects: QuestionOption['effects'], tag?: string): QuestionOption => ({ id, label, effects, tag });

export const questionBank: Question[] = [
  { id: 'exhibition', applicableLevels: ['beginner', 'intermediate'], scenario: 'School Exhibition', emoji: '🏫', prompt: 'Your class is preparing a science exhibition. Which role would you enjoy most?',
    targets: ['technologyInterest', 'creativity', 'communication', 'leadership', 'researchInterest'],
    options: [
      o('a', 'Programming a robot', { technologyInterest: 14, analyticalThinking: 6, handsOnWork: 4 }),
      o('b', 'Designing the poster', { creativity: 14, communication: 4 }),
      o('c', 'Presenting the project', { communication: 14, leadership: 5 }),
      o('d', 'Organizing the team', { leadership: 14, businessInterest: 5, communication: 3 }),
      o('e', 'Researching ideas', { researchInterest: 14, analyticalThinking: 6 }),
    ] },
  { id: 'broken-device', applicableLevels: ['beginner', 'intermediate', 'advanced'], scenario: 'Broken Device', emoji: '🔧', prompt: 'A family device suddenly stops working. What interests you most?',
    targets: ['analyticalThinking', 'handsOnWork', 'technologyInterest', 'creativity'],
    options: [
      o('a', 'Finding the cause', { analyticalThinking: 14, researchInterest: 5 }),
      o('b', 'Trying to repair it', { handsOnWork: 14, technologyInterest: 6 }),
      o('c', 'Learning how it works', { researchInterest: 12, technologyInterest: 8 }),
      o('d', 'Improving its design', { creativity: 12, analyticalThinking: 5, handsOnWork: 4 }),
      o('e', 'Organizing a solution', { leadership: 10, businessInterest: 8 }),
    ] },
  { id: 'group-project', applicableLevels: ['beginner', 'intermediate'], scenario: 'Group Project', emoji: '👥', prompt: 'Your group has a big project. Which role feels most natural?',
    targets: ['analyticalThinking', 'researchInterest', 'creativity', 'communication', 'leadership'],
    options: [
      o('a', 'Technical problem solving', { analyticalThinking: 12, technologyInterest: 8 }),
      o('b', 'Research', { researchInterest: 14, analyticalThinking: 4 }),
      o('c', 'Design', { creativity: 14 }),
      o('d', 'Explaining', { communication: 14, helpingPeople: 5 }),
      o('e', 'Team organization', { leadership: 14, businessInterest: 4 }),
    ] },
  { id: 'area-pick', applicableLevels: ['beginner', 'intermediate', 'advanced'], scenario: 'Areas of Life', emoji: '🌍', prompt: 'Imagine spending a free week learning about one area. Which sounds best?',
    targets: ['helpingPeople', 'technologyInterest', 'businessInterest', 'creativity'],
    options: [
      o('a', 'How the human body and health work', { helpingPeople: 10, researchInterest: 8 }, 'healthcare'),
      o('b', 'How apps and AI are built', { technologyInterest: 14, analyticalThinking: 6 }),
      o('c', 'How businesses start and grow', { businessInterest: 14, leadership: 6 }),
      o('d', 'How stories, art and media are made', { creativity: 14, communication: 6 }),
      o('e', 'How buildings and machines are engineered', { handsOnWork: 10, analyticalThinking: 8 }),
    ] },
  { id: 'hc-1', applicableLevels: ['beginner', 'intermediate', 'advanced'], scenario: 'Healthcare Path', emoji: '🩺', requiresTag: 'healthcare', once: true,
    note: 'You showed interest in healthcare, so we are exploring which parts of it feel like you.',
    prompt: 'Healthcare has many kinds of work. Which part feels most like you?',
    targets: ['helpingPeople', 'researchInterest'],
    options: [
      o('a', 'Treating patients directly', { helpingPeople: 12, handsOnWork: 8 }),
      o('b', 'Understanding how medicines and the body work', { researchInterest: 12, analyticalThinking: 6 }),
      o('c', 'Supporting people\'s minds and wellbeing', { helpingPeople: 12, communication: 8 }),
      o('d', 'I strongly prefer to avoid seeing blood', { helpingPeople: 4 }, 'avoid-blood'),
    ] },
  { id: 'hc-2', applicableLevels: ['beginner', 'intermediate', 'advanced'], scenario: 'Healthcare, Your Way', emoji: '🧬', requiresTag: 'avoid-blood', once: true,
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
  { id: 'weekend-build', applicableLevels: ['beginner'], scenario: 'Free Weekend', emoji: '🛠️', prompt: 'You have a free weekend and a small budget. What would you most like to make?',
    targets: ['creativity', 'handsOnWork', 'technologyInterest'],
    options: [
      o('a', 'A short animated video or comic', { creativity: 14, technologyInterest: 4 }),
      o('b', 'A working model or gadget', { handsOnWork: 14, technologyInterest: 6 }),
      o('c', 'A simple app or game', { technologyInterest: 14, creativity: 6, analyticalThinking: 4 }),
      o('d', 'A fundraiser for a cause', { helpingPeople: 12, leadership: 8 }),
    ] },
  { id: 'volunteer', applicableLevels: ['beginner'], scenario: 'Community Day', emoji: '🤲', prompt: 'Your school is running a community help day. What would you volunteer for?',
    targets: ['helpingPeople', 'communication', 'leadership'],
    options: [
      o('a', 'Teaching younger students', { helpingPeople: 12, communication: 10 }),
      o('b', 'Coordinating volunteers', { leadership: 14, businessInterest: 4 }),
      o('c', 'Setting up equipment and stalls', { handsOnWork: 12 }),
      o('d', 'Surveying what the community needs', { researchInterest: 10, analyticalThinking: 8 }),
    ] },
  { id: 'fair-stall', applicableLevels: ['beginner', 'intermediate'], scenario: 'Fair Stall', emoji: '🛍️', prompt: 'Your class runs a stall at a school fair. What would you take charge of?',
    targets: ['businessInterest', 'leadership', 'communication'],
    options: [
      o('a', 'Deciding prices and tracking money', { businessInterest: 14, analyticalThinking: 6 }),
      o('b', 'Convincing visitors to stop by', { communication: 12, businessInterest: 8 }),
      o('c', 'Designing the stall look', { creativity: 12 }),
      o('d', 'Planning who does what', { leadership: 14 }),
    ] },
  { id: 'mystery', applicableLevels: ['beginner'], scenario: 'Science Mystery', emoji: '🔬', prompt: 'Plants in your school garden keep drying out. What would you do first?',
    targets: ['researchInterest', 'analyticalThinking', 'handsOnWork'],
    options: [
      o('a', 'Test soil, light and water to find a pattern', { researchInterest: 14, analyticalThinking: 8 }),
      o('b', 'Build a simple watering system', { handsOnWork: 12, technologyInterest: 8 }),
      o('c', 'Ask experts and read about it', { researchInterest: 10, communication: 6 }),
      o('d', 'Redesign the garden layout', { creativity: 12, handsOnWork: 4 }),
    ] },
  { id: 'debate', applicableLevels: ['intermediate', 'advanced'], scenario: 'Class Debate', emoji: '🎤', prompt: 'Your class holds a debate on technology in schools. What would you enjoy?',
    targets: ['communication', 'analyticalThinking', 'leadership'],
    options: [
      o('a', 'Speaking for the team', { communication: 14, leadership: 5 }),
      o('b', 'Preparing the strongest facts', { researchInterest: 10, analyticalThinking: 10 }),
      o('c', 'Writing the opening speech', { communication: 10, creativity: 8 }),
      o('d', 'Leading the planning', { leadership: 14 }),
    ] },
  { id: 'puzzle', applicableLevels: ['beginner'], scenario: 'Puzzle Night', emoji: '🧩', prompt: 'A tricky logic puzzle appears. What do you do?',
    targets: ['analyticalThinking', 'technologyInterest'],
    options: [
      o('a', 'Break it into small steps', { analyticalThinking: 14, technologyInterest: 4 }),
      o('b', 'Look for a clever shortcut', { analyticalThinking: 10, creativity: 8 }),
      o('c', 'Work on it together with friends', { communication: 10, leadership: 4 }),
      o('d', 'Write a small program to solve it', { technologyInterest: 14, analyticalThinking: 8 }),
    ] },
  { id: 'poster-story', applicableLevels: ['beginner'], scenario: 'Creative Challenge', emoji: '🎨', prompt: 'You can create anything for the school magazine. What do you pick?',
    targets: ['creativity', 'communication'],
    options: [
      o('a', 'An illustration or design', { creativity: 14 }),
      o('b', 'A story or article', { creativity: 10, communication: 10 }),
      o('c', 'An interactive digital feature', { creativity: 8, technologyInterest: 10 }),
      o('d', 'A survey of student opinions', { researchInterest: 10, analyticalThinking: 6 }),
    ] },

  { id: 'i-projects', applicableLevels: ['intermediate'], scenario: 'Optional Project', emoji: '📁', prompt: 'Your school offers one optional project. Which would you pick?',
    targets: ['technologyInterest', 'researchInterest', 'creativity', 'businessInterest', 'helpingPeople'],
    options: [
      o('a', 'Build a simple computer application', { technologyInterest: 14, analyticalThinking: 6 }),
      o('b', 'Investigate a biology problem', { researchInterest: 12, helpingPeople: 6 }, 'healthcare'),
      o('c', 'Design a creative campaign', { creativity: 14, communication: 6 }),
      o('d', 'Plan a small business idea', { businessInterest: 14, leadership: 6 }),
      o('e', 'Research a social issue', { helpingPeople: 12, researchInterest: 8, communication: 4 }),
    ] },
  { id: 'i-study-time', applicableLevels: ['intermediate'], scenario: 'Extra Study Time', emoji: '⏱️', prompt: 'If you had extra study time this week, what would you spend it on?',
    targets: ['analyticalThinking', 'technologyInterest', 'communication', 'creativity', 'researchInterest'],
    options: [
      o('a', 'Mathematical problem solving', { analyticalThinking: 14, researchInterest: 4 }),
      o('b', 'A science experiment', { researchInterest: 14, handsOnWork: 6 }),
      o('c', 'Computer programming', { technologyInterest: 14, analyticalThinking: 6 }),
      o('d', 'Writing and communication', { communication: 14, creativity: 4 }),
      o('e', 'Creative design', { creativity: 14, handsOnWork: 4 }),
    ] },
  { id: 'i-direction', applicableLevels: ['intermediate'], scenario: 'Study Direction', emoji: '🧭', prompt: 'When thinking about your future study direction, what matters most?',
    targets: ['analyticalThinking', 'researchInterest', 'businessInterest', 'handsOnWork', 'leadership'],
    options: [
      o('a', 'Subjects I enjoy', { researchInterest: 8, creativity: 6 }),
      o('b', 'Subjects I perform well in', { analyticalThinking: 10 }),
      o('c', 'Future career possibilities', { businessInterest: 10, leadership: 6 }),
      o('d', 'Practical activities', { handsOnWork: 12 }),
      o('e', 'Keeping several options open', { communication: 6, leadership: 4 }),
    ] },
  { id: 'i-subject-link', applicableLevels: ['intermediate'], scenario: 'Subject Link', emoji: '📚', prompt: 'Which kind of class task do you look forward to most?',
    targets: ['analyticalThinking', 'handsOnWork', 'communication', 'helpingPeople'],
    options: [
      o('a', 'Solving a hard numerical problem', { analyticalThinking: 14 }),
      o('b', 'A lab practical', { handsOnWork: 12, researchInterest: 8 }),
      o('c', 'A presentation or essay', { communication: 14, creativity: 4 }),
      o('d', 'A group task helping others learn', { helpingPeople: 12, leadership: 6 }),
    ] },
  { id: 'a-compare', applicableLevels: ['advanced'], scenario: 'Comparing Degrees', emoji: '🎓', prompt: 'When comparing degree pathways, what matters most to you?',
    targets: ['researchInterest', 'handsOnWork', 'helpingPeople', 'businessInterest', 'analyticalThinking'],
    options: [
      o('a', 'Subjects I genuinely enjoy', { analyticalThinking: 8, creativity: 6 }),
      o('b', 'Career possibilities', { businessInterest: 12, leadership: 6 }),
      o('c', 'Practical work', { handsOnWork: 14 }),
      o('d', 'Research opportunities', { researchInterest: 14, analyticalThinking: 6 }),
      o('e', 'Helping people', { helpingPeople: 14, communication: 4 }),
    ] },
  { id: 'a-work', applicableLevels: ['advanced'], scenario: 'Future Work', emoji: '💼', prompt: 'Which kind of future work sounds most meaningful?',
    targets: ['researchInterest', 'technologyInterest', 'communication', 'creativity', 'leadership'],
    options: [
      o('a', 'Researching difficult problems', { researchInterest: 14, analyticalThinking: 8 }),
      o('b', 'Building technical systems', { technologyInterest: 14, analyticalThinking: 6 }),
      o('c', 'Working directly with people', { helpingPeople: 12, communication: 10 }),
      o('d', 'Designing creative solutions', { creativity: 14, technologyInterest: 4 }),
      o('e', 'Leading projects', { leadership: 14, businessInterest: 8 }),
    ] },
  { id: 'a-difficult', applicableLevels: ['advanced'], scenario: 'A Difficult Subject', emoji: '🧗', prompt: 'A degree matches your interests, but one required subject feels difficult. What would you do?',
    targets: ['analyticalThinking', 'researchInterest', 'leadership', 'handsOnWork'],
    options: [
      o('a', 'Create an improvement plan', { leadership: 8, analyticalThinking: 8 }),
      o('b', 'Seek guidance', { communication: 10, helpingPeople: 4 }),
      o('c', 'Explore related degrees as well', { researchInterest: 10, analyticalThinking: 4 }),
      o('d', 'Try practical exposure before deciding', { handsOnWork: 12 }),
      o('e', 'Research admission requirements', { researchInterest: 8, businessInterest: 6, analyticalThinking: 6 }),
    ] },
  { id: 'a-environment', applicableLevels: ['advanced'], scenario: 'Learning Environment', emoji: '🏛️', prompt: 'Which learning environment would you thrive in?',
    targets: ['researchInterest', 'technologyInterest', 'handsOnWork', 'helpingPeople', 'businessInterest', 'creativity'],
    options: [
      o('a', 'Laboratory / Research', { researchInterest: 14, analyticalThinking: 6 }),
      o('b', 'Technology Projects', { technologyInterest: 14, analyticalThinking: 6 }),
      o('c', 'Field Work', { handsOnWork: 12, researchInterest: 6 }),
      o('d', 'People-Facing Work', { helpingPeople: 12, communication: 10 }),
      o('e', 'Business / Leadership', { businessInterest: 12, leadership: 12 }),
      o('f', 'Creative Studio', { creativity: 14, communication: 4 }),
    ] },
  { id: 'a-pathway', applicableLevels: ['advanced'], scenario: 'Next-Step Decision', emoji: '🗺️', prompt: 'You are choosing between two good degree options. What helps you decide?',
    targets: ['analyticalThinking', 'communication', 'leadership', 'researchInterest'],
    options: [
      o('a', 'Comparing the subjects in each degree', { analyticalThinking: 12, researchInterest: 6 }),
      o('b', 'Talking to students already in the field', { communication: 12, helpingPeople: 4 }),
      o('c', 'Thinking about where each could lead', { leadership: 8, businessInterest: 8 }),
      o('d', 'Trying a short course or project in each', { handsOnWork: 10, technologyInterest: 6 }),
    ] },
];

export interface QuestionState {
  askedIds: string[];
  tags: string[];
  evidence: Record<DimensionKey, number>;
  dims: Record<DimensionKey, number>;
  lastNote?: string;
  level?: EducationLevel | null;
}

export function pickQuestion(s: QuestionState): { question: Question; note?: string } {
  const lvl = s.level ?? 'beginner';
  const forLevel = questionBank.filter(q => q.applicableLevels.includes(lvl));
  const unasked = forLevel.filter(q => !s.askedIds.includes(q.id));
  const pool = unasked.length ? unasked : forLevel.filter(q => !q.once);
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
