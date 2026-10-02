import { EducationLevel } from '../types';

export interface ActivityStep { prompt: string; choices: string[] }
export interface Activity { id: string; icon: string; title: string; description: string; minutes: number; steps: ActivityStep[] }

const a = (id: string, icon: string, title: string, description: string, minutes: number, steps: ActivityStep[]): Activity => ({ id, icon, title, description, minutes, steps });
const s = (prompt: string, ...choices: string[]): ActivityStep => ({ prompt, choices });

export const activitiesByLevel: Record<EducationLevel, Activity[]> = {
  beginner: [
    a('b-logic', '🧩', 'Logic Challenge', 'Solve a few friendly puzzles and notice how you like to think.', 4, [
      s('A pattern goes 2, 4, 8, 16. How would you find the next number?', 'Spot the rule by doubling', 'Try a few guesses and check', 'Draw it out on paper', 'Ask a friend for a hint'),
      s('You find two paths to finish a puzzle. What do you do first?', 'Compare both paths carefully', 'Pick one and adjust as I go', 'Look for a shortcut'),
    ]),
    a('b-creative', '🎨', 'Creative Challenge', 'Imagine and design something new from scratch.', 5, [
      s('Your school wants a new mascot. Where do you start?', 'Sketch lots of ideas', 'Write a story about it', 'Ask classmates what they like', 'Pick colours and shapes first'),
      s('Your idea is almost done. What do you enjoy most?', 'Adding small, fun details', 'Showing it to others', 'Making it work properly'),
    ]),
    a('b-build', '🛠️', 'Build / Design Challenge', 'Plan how you would build a simple bridge from paper.', 5, [
      s('You need a bridge that holds a small book. First step?', 'Test different folds', 'Draw a plan', 'Collect materials and just start', 'Look at real bridges for ideas'),
      s('The bridge bends. What do you do?', 'Figure out where it is weak', 'Add more layers', 'Start again with a new idea'),
    ]),
    a('b-helping', '🤝', 'Helping Others Scenario', 'Think through a situation where a friend needs support.', 4, [
      s('A classmate looks upset after a test. What do you do?', 'Sit with them and listen', 'Offer to study together', 'Tell a teacher kindly', 'Give them space and check later'),
      s('Your class wants to help a local cause. Your role?', 'Organise the team', 'Talk to people about it', 'Make posters or tools', 'Find out what is needed'),
    ]),
    a('b-research', '🔍', 'Research Challenge', 'Be a young investigator and find out how something works.', 5, [
      s('You wonder why plants lean toward light. What do you do?', 'Run a small experiment', 'Read about it', 'Ask a teacher or expert', 'Watch a video on it'),
      s('You found a surprising result. Next?', 'Test it again to be sure', 'Look for more questions', 'Explain it to someone'),
    ]),
  ],
  intermediate: [
    a('i-subject', '📘', 'Subject Challenge', 'See which subject topics keep you curious.', 5, [
      s('Which kind of problem would you pick for homework?', 'A tricky maths puzzle', 'A science experiment write-up', 'A computer programme idea', 'An essay on a current issue'),
      s('What makes a topic worth more of your time?', 'Real-life use', 'Hard to figure out', 'Creative freedom', 'Helps other people'),
    ]),
    a('i-problem', '⚙️', 'Problem Solving', 'Approach a practical problem step by step.', 6, [
      s('The school canteen queue is too long. Your first move?', 'Count and measure the problem', 'Design a new layout', 'Talk to students and staff', 'Suggest a simple app or token system'),
      s('Two solutions are possible. How do you choose?', 'Compare costs and results', 'Choose the one people prefer', 'Try a small test first'),
    ]),
    a('i-career', '💼', 'Career Scenario', 'Step into a day of work and see how it feels to you.', 6, [
      s('You spend a day shadowing a professional. Which would you pick?', 'Engineer on a project site', 'Doctor in a clinic', 'Designer in a studio', 'Manager running a small business'),
      s('What part of that day would you enjoy most?', 'Solving a hard problem', 'Working with people', 'Creating something visible', 'Planning and deciding'),
    ]),
    a('i-creative', '💡', 'Creative Thinking', 'Come up with fresh ideas for an everyday challenge.', 5, [
      s('Design a better school bag. What do you focus on?', 'Smart features', 'Looks and style', 'Comfort for people', 'Low cost for everyone'),
      s('How do you like to develop ideas?', 'Alone with sketches', 'Brainstorm in a group', 'Build a quick model'),
    ]),
    a('i-research', '🔬', 'Research Activity', 'Plan a small investigation and decide how to test it.', 6, [
      s('You want to know if sleep affects test scores. What first?', 'Plan how to collect data', 'Read what others found', 'Ask classmates about habits', 'Form a guess to check'),
      s('Your data looks mixed. What do you do?', 'Look for hidden patterns', 'Collect more data', 'Report it honestly and move on'),
    ]),
  ],
  advanced: [
    a('e-degree', '🎓', 'Degree Scenario', 'Think through a common education route and how it fits your interests.', 7, [
      s('You are comparing two study routes. What matters most to you?', 'Subjects I enjoy', 'Variety of paths afterwards', 'Practical, hands-on learning', 'Research opportunities'),
      s('How would you gather more information?', 'Talk to people in the field', 'Read course outlines', 'Try a short online course', 'Visit an open day'),
    ]),
    a('e-subject', '🧭', 'Subject Decision Activity', 'Weigh up subject choices for the years ahead.', 7, [
      s('You must choose between two strong subjects. What guides you?', 'Which I enjoy studying', 'Which keeps more options open', 'Which suits my likely path', 'Which I understand more deeply'),
      s('If one subject feels harder, what is your approach?', 'Build a steady study plan', 'Get help from a mentor', 'Check if it matters for my goals'),
    ]),
    a('e-career', '💼', 'Career Scenario', 'Consider a realistic work situation and your natural approach.', 7, [
      s('Your team project is behind schedule. What do you do?', 'Re-plan tasks and lead', 'Dig into the root cause', 'Support teammates directly', 'Find a creative workaround'),
      s('What kind of work setting appeals to you?', 'Structured and predictable', 'Fast-moving and varied', 'Independent and focused', 'People-centred'),
    ]),
    a('e-research', '🔬', 'Research Activity', 'Design a simple study and decide how to read the evidence.', 8, [
      s('You are studying whether a new app helps students learn. First step?', 'Define a clear question', 'Review existing studies', 'Design a fair comparison', 'Pick the measurements'),
      s('Results are inconclusive. How do you proceed?', 'Refine the method', 'Gather a bigger sample', 'Share limits openly'),
    ]),
    a('e-problem', '⚙️', 'Problem Solving', 'Work through a multi-step problem with trade-offs.', 8, [
      s('A town needs cleaner transport on a small budget. Your approach?', 'Model the options with data', 'Talk to residents', 'Prototype a pilot', 'Plan funding and partners'),
      s('Which trade-off feels hardest to you?', 'Cost versus quality', 'Speed versus fairness', 'Innovation versus safety'),
    ]),
  ],
};
