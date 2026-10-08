import { academicEvidence } from './academic';
import { Cluster, DimensionKey, EducationLevel, Fit, InterestDimensions, Readiness, StudentProfile } from '../types';
import { dimensionMeta } from './content';

type Weights = Partial<Record<DimensionKey, number>>;
export type PathwayType = 'computing' | 'health' | 'engineering' | 'business' | 'design' | 'social' | 'science' | 'general';

export interface Career {
  id: string; name: string; icon: string; clusterId: string; blurb: string; weights: Weights;
  reasons: string[]; lessEvidence?: string; whatTheyDo: string; dayToDay: string[]; subjects: string[];
  degrees: string[]; keySubjectsForReadiness: string[]; pathwayType: PathwayType; alternatives: string[];
}

export interface Degree { id: string; name: string; category: string; description: string; subjects: string[]; careers: string[]; relevance: string }

export const degreeCategories = ['Computing', 'Engineering', 'Health Sciences', 'Business', 'Design', 'Social Sciences', 'Natural Sciences', 'Humanities'];

// ---------- helpers ----------
export function weightedFit(weights: Weights, dims: InterestDimensions): number {
  let s = 0, t = 0;
  for (const [k, w] of Object.entries(weights) as [DimensionKey, number][]) { s += (dims[k] ?? 0) * w; t += w; }
  return t ? Math.max(0, Math.min(100, Math.round(s / t))) : 0;
}
export const clusterFit = (c: Cluster, dims: InterestDimensions) => weightedFit(c.weights, dims);
export const careerAlignment = (c: Career, dims: InterestDimensions) => weightedFit(c.weights, dims);
export const fitLabel = (score: number): Fit => (score >= 70 ? 'Strong' : score >= 50 ? 'Good' : 'Emerging');
export const fitColor = (f: Fit) => (f === 'Strong' ? '#00E676' : f === 'Good' ? '#00D2FF' : '#A78BFA');
export const readinessColor = (r: Readiness) => (r === 'On Track' ? '#00E676' : r === 'Building' ? '#00D2FF' : r === 'Needs Improvement' ? '#FFC107' : '#94A3B8');

const band = (v: number): Readiness => (v >= 75 ? 'On Track' : v >= 60 ? 'Building' : 'Needs Improvement');

export function profileReadiness(p: StudentProfile): Readiness {
  const ev = academicEvidence(p);
  if (ev.state === 'awaiting') return 'Result unavailable';
  if (ev.overall === null) return 'Preliminary Readiness';
  return band(ev.overall);
}

/** Average of a career's key subject results from the best available record (falls back to overall). */
export function keyMarksFor(career: Career, p: StudentProfile): { value: number; fromKey: boolean; lowerConfidence: boolean } | null {
  const ev = academicEvidence(p);
  if (ev.overall === null) return null;
  const vals: number[] = [];
  for (const ks of career.keySubjectsForReadiness) {
    for (const r of ev.subjects) {
      const a = r.subject.toLowerCase(), b = ks.toLowerCase();
      if (a === b || a.includes(b) || b.includes(a)) vals.push(r.percentage);
    }
  }
  if (vals.length) return { value: vals.reduce((a, b) => a + b, 0) / vals.length, fromKey: true, lowerConfidence: ev.lowerConfidence };
  return { value: ev.overall, fromKey: false, lowerConfidence: ev.lowerConfidence };
}

export function readinessFor(career: Career, profile: StudentProfile, level: EducationLevel): { readiness: Readiness; summary: string } {
  const subj = career.keySubjectsForReadiness.join(' and ');
  if (level === 'beginner') {
    return { readiness: 'Building', summary: `${subj} may be useful to strengthen as you progress.` };
  }
  const ev = academicEvidence(profile);
  if (ev.state === 'awaiting') return { readiness: 'Result unavailable', summary: 'Your result is still awaiting, so academic readiness is not shown yet. You can add it later.' };
  const m = keyMarksFor(career, profile);
  if (!m) return { readiness: 'Preliminary Readiness', summary: 'Academic information is not available yet. Add your latest academic result for more detailed readiness guidance.' };
  const r = band(m.value);
  const basis = m.fromKey ? `your marks in ${subj}` : 'your overall marks';
  const low = m.lowerConfidence ? ' This uses a current or internal assessment, so treat it as lower confidence.' : '';
  if (level === 'intermediate') {
    const t = r === 'On Track' ? `Based on ${basis}, your early study path looks well aligned.`
      : r === 'Building' ? `Based on ${basis}, you are building a base. Steady practice in ${subj} can help.`
      : `Based on ${basis}, extra practice in ${subj} could open more options later.`;
    return { readiness: r, summary: t + low };
  }
  const t = r === 'On Track' ? `${basis[0].toUpperCase() + basis.slice(1)} suggest you are in a good position to review degree routes in this area.`
    : r === 'Building' ? `${basis[0].toUpperCase() + basis.slice(1)} suggest you are building toward this route. Review the applicable entry requirements and plan targeted preparation.`
    : `${basis[0].toUpperCase() + basis.slice(1)} suggest some degree routes here may need additional preparation. Review applicable entry requirements and consider related pathways too.`;
  return { readiness: r, summary: t + low };
}

// ---------- clusters ----------
const cl = (id: string, name: string, icon: string, color: string, blurb: string, careerIds: string[], weights: Weights): Cluster => ({ id, name, icon, color, blurb, careerIds, weights });

export const clusters: Cluster[] = [
  cl('tech', 'Technology & Computing', '💻', '#00D2FF', 'Build software, protect systems and work with data and AI.', ['software-engineer', 'cybersecurity-analyst', 'ai-engineer', 'data-scientist'], { technologyInterest: 3, analyticalThinking: 2, researchInterest: 1 }),
  cl('engineering', 'Engineering & Robotics', '⚙️', '#FB923C', 'Design and build machines, structures and electrical systems.', ['mechanical-engineer', 'electrical-engineer', 'civil-engineer', 'robotics-engineer'], { handsOnWork: 3, analyticalThinking: 2, technologyInterest: 1 }),
  cl('health', 'Medical & Health Sciences', '🩺', '#00E676', 'Care for people and understand the human body and mind.', ['doctor', 'pharmacist', 'psychologist', 'med-lab-scientist'], { helpingPeople: 3, researchInterest: 2, analyticalThinking: 1 }),
  cl('research', 'Research & Data', '🔬', '#7C3AED', 'Investigate questions and find patterns using evidence.', ['research-analyst', 'statistician', 'biotechnologist'], { researchInterest: 3, analyticalThinking: 2 }),
  cl('business', 'Business & Management', '📈', '#F59E0B', 'Start, grow and lead organisations and projects.', ['entrepreneur', 'marketing-manager', 'project-manager'], { businessInterest: 3, leadership: 2, communication: 1 }),
  cl('finance', 'Finance', '💹', '#22C55E', 'Work with money, accounts, markets and financial planning.', ['accountant', 'financial-analyst', 'banker'], { businessInterest: 2, analyticalThinking: 2 }),
  cl('design', 'Arts & Design', '🎨', '#EC4899', 'Turn ideas into visuals, products and spaces.', ['graphic-designer', 'ux-designer', 'architect'], { creativity: 3, handsOnWork: 1, technologyInterest: 1 }),
  cl('media', 'Media & Communication', '🎙️', '#38BDF8', 'Tell stories and share information through words and media.', ['journalist', 'content-creator', 'filmmaker'], { communication: 3, creativity: 2 }),
  cl('education', 'Education', '📚', '#A78BFA', 'Help others learn, grow and find direction.', ['teacher', 'education-counselor'], { helpingPeople: 2, communication: 3, leadership: 1 }),
  cl('law', 'Law & Public Services', '⚖️', '#94A3B8', 'Work with rules, justice and public service.', ['lawyer', 'civil-servant', 'policy-analyst'], { communication: 2, leadership: 2, analyticalThinking: 2 }),
  cl('social', 'Social Sciences', '🌍', '#14B8A6', 'Understand societies, economies and communities.', ['social-worker', 'economist', 'community-development'], { helpingPeople: 2, researchInterest: 2, communication: 1 }),
  cl('natural', 'Natural Sciences', '🧪', '#6366F1', 'Explore physics, chemistry, biology and the Earth.', ['physicist', 'chemist', 'environmental-scientist'], { researchInterest: 3, analyticalThinking: 2, handsOnWork: 1 }),
  cl('agri', 'Agriculture & Environment', '🌱', '#84CC16', 'Care for crops, food systems, wildlife and nature.', ['agricultural-scientist', 'food-technologist', 'wildlife-conservationist'], { handsOnWork: 3, researchInterest: 2, helpingPeople: 1 }),
  cl('aviation', 'Aviation & Hospitality', '✈️', '#F472B6', 'Fly, travel and look after guests and passengers.', ['pilot', 'hospitality-manager', 'tourism-manager'], { leadership: 2, communication: 2, handsOnWork: 1, helpingPeople: 1 }),
  cl('sports', 'Sports & Fitness', '🏅', '#FF7043', 'Coach, train and support healthy, active lives.', ['sports-coach', 'physiotherapist', 'sports-scientist'], { handsOnWork: 3, helpingPeople: 2, leadership: 1 }),
];

// ---------- careers ----------
const phrase: Record<DimensionKey, string> = {
  analyticalThinking: 'You repeatedly enjoyed logical problem solving',
  technologyInterest: 'You showed curiosity about technology and how it works',
  creativity: 'You liked creating and imagining new ideas',
  helpingPeople: 'You enjoyed helping and supporting people',
  leadership: 'You were comfortable taking the lead in group situations',
  communication: 'You liked explaining ideas and talking with others',
  handsOnWork: 'You preferred practical, hands-on activities',
  researchInterest: 'You were curious about finding out how and why things work',
  businessInterest: 'You were interested in building and managing ideas',
};

function mk(id: string, name: string, icon: string, clusterId: string, pathwayType: PathwayType, weights: Weights, blurb: string,
  whatTheyDo: string, dayToDay: string[], subjects: string[], keySubjectsForReadiness: string[], degs: string[], alternatives: string[]): Career {
  const sorted = (Object.entries(weights) as [DimensionKey, number][]).sort((a, b) => b[1] - a[1]).map(e => e[0]);
  const reasons = [...sorted.slice(0, 3).map(k => phrase[k]), `This area often builds on ${subjects.slice(0, 2).join(' and ')}, which you may enjoy exploring`];
  const lessEvidence = sorted[3] ? `Less evidence so far about your ${dimensionMeta[sorted[3]].label.toLowerCase()}. This may change as you explore more.` : undefined;
  return { id, name, icon, clusterId, blurb, weights, reasons, lessEvidence, whatTheyDo, dayToDay, subjects, degrees: degs, keySubjectsForReadiness, pathwayType, alternatives };
}

export const careers: Career[] = [
  // tech
  mk('software-engineer', 'Software Engineer', '👨‍💻', 'tech', 'computing', { technologyInterest: 3, analyticalThinking: 3, creativity: 1, handsOnWork: 1 }, 'Designs and builds apps, websites and software systems.',
    'Software engineers design, write and test programs that run on phones, computers and the web.', ['Plan features with a team', 'Write and review code', 'Test and fix problems', 'Improve products using feedback'], ['Computer Science', 'Mathematics', 'English'], ['Mathematics', 'Computer Science'], ['cs', 'se'], ['Web Developer', 'Game Developer', 'Data Scientist', 'Information Systems']),
  mk('cybersecurity-analyst', 'Cybersecurity Analyst', '🛡️', 'tech', 'computing', { technologyInterest: 3, analyticalThinking: 3, researchInterest: 1, handsOnWork: 1 }, 'Protects systems and data from digital threats.',
    'Cybersecurity analysts monitor networks, find weaknesses and help organisations keep information safe.', ['Monitor systems for unusual activity', 'Test for weaknesses', 'Write security reports', 'Teach safe digital habits'], ['Computer Science', 'Mathematics', 'Physics'], ['Mathematics', 'Computer Science'], ['cs', 'se'], ['Network Engineer', 'Software Engineer', 'IT Systems Analyst', 'Digital Forensics']),
  mk('ai-engineer', 'AI Engineer', '🤖', 'tech', 'computing', { technologyInterest: 3, analyticalThinking: 3, researchInterest: 2, creativity: 1 }, 'Builds intelligent systems that learn from data.',
    'AI engineers create and test models that can recognise patterns, understand language or make predictions.', ['Prepare and explore data', 'Train and test models', 'Read research papers', 'Work with software teams'], ['Mathematics', 'Computer Science', 'Physics'], ['Mathematics', 'Computer Science'], ['ai', 'cs', 'ds'], ['Data Scientist', 'Software Engineer', 'Robotics Engineer', 'Research Analyst']),
  mk('data-scientist', 'Data Scientist', '📊', 'tech', 'computing', { analyticalThinking: 3, technologyInterest: 2, researchInterest: 2, businessInterest: 1 }, 'Finds useful patterns and answers in data.',
    'Data scientists collect, clean and analyse data so people can make better decisions.', ['Clean and explore data', 'Build charts and models', 'Explain findings', 'Work with teams to solve questions'], ['Mathematics', 'Computer Science', 'Statistics'], ['Mathematics', 'Computer Science'], ['ds', 'cs', 'ai'], ['Statistician', 'AI Engineer', 'Business Analyst', 'Research Analyst']),
  // engineering
  mk('mechanical-engineer', 'Mechanical Engineer', '🔧', 'engineering', 'engineering', { handsOnWork: 3, analyticalThinking: 3, technologyInterest: 1 }, 'Designs machines, engines and mechanical systems.',
    'Mechanical engineers design, build and improve machines and systems that move or produce energy.', ['Sketch and model designs', 'Test prototypes', 'Solve efficiency problems', 'Coordinate with manufacturers'], ['Physics', 'Mathematics', 'Chemistry'], ['Mathematics', 'Physics'], ['eng-mech'], ['Mechatronics Engineer', 'Industrial Engineer', 'Aerospace Engineer', 'Technician Pathways']),
  mk('electrical-engineer', 'Electrical Engineer', '⚡', 'engineering', 'engineering', { analyticalThinking: 3, technologyInterest: 2, handsOnWork: 2 }, 'Works with power, circuits and electronic systems.',
    'Electrical engineers design and maintain systems for electricity, electronics and communication.', ['Design circuits and systems', 'Test equipment', 'Check safety standards', 'Plan power supply'], ['Physics', 'Mathematics', 'Computer Science'], ['Mathematics', 'Physics'], ['eng-elec'], ['Electronics Engineer', 'Telecom Engineer', 'Renewable Energy Technician', 'Computer Engineer']),
  mk('civil-engineer', 'Civil Engineer', '🏗️', 'engineering', 'engineering', { handsOnWork: 3, analyticalThinking: 2, leadership: 1 }, 'Plans and builds roads, bridges and buildings.',
    'Civil engineers plan and oversee the construction of infrastructure that communities depend on.', ['Study sites and plans', 'Calculate loads and materials', 'Visit construction sites', 'Manage project timelines'], ['Mathematics', 'Physics', 'Geography'], ['Mathematics', 'Physics'], ['eng-civil'], ['Architect', 'Construction Manager', 'Urban Planner', 'Surveyor']),
  mk('robotics-engineer', 'Robotics Engineer', '🦾', 'engineering', 'engineering', { technologyInterest: 3, handsOnWork: 3, analyticalThinking: 2, creativity: 1 }, 'Builds robots and automated machines.',
    'Robotics engineers combine mechanics, electronics and programming to create machines that act on their own.', ['Assemble and test robots', 'Write control software', 'Debug sensors and motors', 'Work in mixed teams'], ['Physics', 'Mathematics', 'Computer Science'], ['Mathematics', 'Physics'], ['eng-elec', 'eng-mech', 'ai'], ['Mechatronics Engineer', 'AI Engineer', 'Automation Technician', 'Embedded Systems Developer']),
  // health
  mk('doctor', 'Doctor', '👩‍⚕️', 'health', 'health', { helpingPeople: 3, researchInterest: 2, analyticalThinking: 2, communication: 1 }, 'Diagnoses and treats illness and helps people stay healthy.',
    'Doctors assess patients, diagnose conditions and plan treatment with other healthcare professionals.', ['Talk with and examine patients', 'Review test results', 'Plan treatment', 'Work with a care team'], ['Biology', 'Chemistry', 'Physics'], ['Biology', 'Chemistry'], ['mbbs'], ['Pharmacist', 'Psychologist', 'Medical Laboratory Scientist', 'Biomedical Sciences', 'Public Health', 'Healthcare Technology']),
  mk('pharmacist', 'Pharmacist', '💊', 'health', 'health', { helpingPeople: 2, researchInterest: 2, analyticalThinking: 2, communication: 1 }, 'Provides medicines and advice for safe use.',
    'Pharmacists make sure medicines are safe and correct, and advise patients and healthcare teams.', ['Check prescriptions', 'Advise patients', 'Manage medicine stock', 'Follow safety rules'], ['Chemistry', 'Biology', 'English'], ['Chemistry', 'Biology'], ['pharmd'], ['Medical Laboratory Scientist', 'Biomedical Sciences', 'Clinical Research', 'Public Health']),
  mk('psychologist', 'Psychologist', '🧠', 'health', 'social', { helpingPeople: 3, communication: 2, researchInterest: 2, analyticalThinking: 1 }, 'Studies behaviour and supports mental wellbeing.',
    'Psychologists study how people think, feel and behave, and help them through listening and evidence-based methods.', ['Listen and ask careful questions', 'Use assessments', 'Plan support', 'Keep careful notes'], ['Psychology', 'Biology', 'English'], ['Biology', 'English'], ['psych', 'social'], ['Counselor', 'Social Worker', 'Human Resources', 'Education Counselor']),
  mk('med-lab-scientist', 'Medical Laboratory Scientist', '🧫', 'health', 'health', { researchInterest: 3, analyticalThinking: 2, handsOnWork: 2, helpingPeople: 1 }, 'Runs the tests that help doctors diagnose illness.',
    'Medical laboratory scientists analyse samples to detect disease and monitor treatment.', ['Prepare and test samples', 'Operate lab equipment', 'Record accurate results', 'Follow quality procedures'], ['Biology', 'Chemistry', 'Physics'], ['Biology', 'Chemistry'], ['mlt', 'natural'], ['Biotechnologist', 'Pharmacist', 'Biomedical Sciences', 'Research Analyst']),
  // research
  mk('research-analyst', 'Research Analyst', '🔎', 'research', 'science', { researchInterest: 3, analyticalThinking: 3, communication: 1 }, 'Investigates questions and reports clear findings.',
    'Research analysts gather and examine information to answer questions for organisations.', ['Collect information', 'Compare sources', 'Analyse results', 'Write short reports'], ['Mathematics', 'English', 'Social Studies'], ['Mathematics', 'English'], ['ds', 'social', 'natural'], ['Data Scientist', 'Economist', 'Policy Analyst', 'Statistician']),
  mk('statistician', 'Statistician', '📉', 'research', 'science', { analyticalThinking: 3, researchInterest: 2, technologyInterest: 1 }, 'Uses numbers to find patterns and measure uncertainty.',
    'Statisticians design studies and analyse data to help people draw reliable conclusions.', ['Design surveys and tests', 'Analyse data', 'Build models', 'Explain results'], ['Mathematics', 'Computer Science', 'Statistics'], ['Mathematics'], ['ds', 'natural'], ['Data Scientist', 'Actuary', 'Economist', 'Research Analyst']),
  mk('biotechnologist', 'Biotechnologist', '🧬', 'research', 'science', { researchInterest: 3, handsOnWork: 2, analyticalThinking: 2 }, 'Uses biology to create useful products and solutions.',
    'Biotechnologists use living systems and lab methods to develop medicines, foods and materials.', ['Run lab experiments', 'Record data', 'Study cells and genes', 'Review research'], ['Biology', 'Chemistry', 'Mathematics'], ['Biology', 'Chemistry'], ['natural', 'mlt'], ['Medical Laboratory Scientist', 'Food Technologist', 'Agricultural Scientist', 'Chemist']),
  // business
  mk('entrepreneur', 'Entrepreneur', '🚀', 'business', 'business', { businessInterest: 3, leadership: 3, creativity: 2, communication: 1 }, 'Starts and grows new ventures.',
    'Entrepreneurs spot needs, build products or services and organise people and money to deliver them.', ['Test business ideas', 'Talk to customers', 'Manage budgets', 'Lead a small team'], ['Economics', 'Mathematics', 'English'], ['Mathematics', 'English'], ['bba'], ['Marketing Manager', 'Project Manager', 'Product Manager', 'Business Analyst']),
  mk('marketing-manager', 'Marketing Manager', '📣', 'business', 'business', { communication: 3, businessInterest: 3, creativity: 2 }, 'Helps people discover products and services.',
    'Marketing managers plan how to understand customers and tell the story of a brand.', ['Study customers', 'Plan campaigns', 'Review results', 'Work with designers and writers'], ['English', 'Economics', 'Art'], ['English'], ['bba', 'media'], ['Content Creator', 'Brand Manager', 'Entrepreneur', 'Public Relations']),
  mk('project-manager', 'Project Manager', '🗂️', 'business', 'business', { leadership: 3, communication: 2, businessInterest: 2, analyticalThinking: 1 }, 'Keeps teams organised to finish work on time.',
    'Project managers plan tasks, coordinate people and track progress toward a goal.', ['Plan schedules', 'Run team check-ins', 'Track budgets', 'Solve blockers'], ['Mathematics', 'English', 'Economics'], ['Mathematics', 'English'], ['bba'], ['Operations Manager', 'Entrepreneur', 'Business Analyst', 'Construction Manager']),
  // finance
  mk('accountant', 'Accountant', '🧾', 'finance', 'business', { analyticalThinking: 3, businessInterest: 2 }, 'Records and checks financial information accurately.',
    'Accountants prepare and review financial records so organisations can plan and meet their rules.', ['Record transactions', 'Prepare statements', 'Check accuracy', 'Advise on budgets'], ['Mathematics', 'Accounting', 'Economics'], ['Mathematics', 'Accounting'], ['bba', 'finance'], ['Auditor', 'Financial Analyst', 'Banker', 'Tax Advisor']),
  mk('financial-analyst', 'Financial Analyst', '💹', 'finance', 'business', { analyticalThinking: 3, businessInterest: 3, researchInterest: 1 }, 'Studies financial information to guide decisions.',
    'Financial analysts study markets and company results to help with investment and planning decisions.', ['Analyse reports', 'Build spreadsheets and models', 'Compare options', 'Present recommendations'], ['Mathematics', 'Economics', 'Statistics'], ['Mathematics', 'Economics'], ['finance', 'bba', 'ds'], ['Accountant', 'Economist', 'Banker', 'Data Scientist']),
  mk('banker', 'Banker', '🏦', 'finance', 'business', { businessInterest: 3, communication: 2, analyticalThinking: 2 }, 'Helps people and businesses manage money.',
    'Bankers help customers save, borrow and plan, while following financial rules.', ['Meet customers', 'Review applications', 'Explain products', 'Follow compliance steps'], ['Mathematics', 'Economics', 'English'], ['Mathematics', 'English'], ['finance', 'bba'], ['Accountant', 'Financial Analyst', 'Insurance Specialist', 'Entrepreneur']),
  // design
  mk('graphic-designer', 'Graphic Designer', '🎨', 'design', 'design', { creativity: 3, communication: 1, technologyInterest: 1 }, 'Creates visuals that communicate ideas.',
    'Graphic designers use layout, colour and type to make posters, brands and digital visuals.', ['Sketch concepts', 'Use design software', 'Get client feedback', 'Prepare files for print or screen'], ['Art', 'Computer', 'English'], ['Art'], ['design'], ['UX Designer', 'Illustrator', 'Animator', 'Marketing Specialist']),
  mk('ux-designer', 'UX Designer', '📱', 'design', 'design', { creativity: 3, technologyInterest: 2, helpingPeople: 1, analyticalThinking: 1 }, 'Makes apps and websites easy and pleasant to use.',
    'UX designers study how people use products and design clear, helpful screens.', ['Talk to users', 'Sketch screens', 'Test prototypes', 'Work with developers'], ['Computer', 'Art', 'Psychology'], ['Art', 'Computer Science'], ['design', 'cs'], ['Graphic Designer', 'Software Engineer', 'Product Manager', 'Psychologist']),
  mk('architect', 'Architect', '🏛️', 'design', 'design', { creativity: 3, handsOnWork: 2, analyticalThinking: 2 }, 'Designs buildings and spaces.',
    'Architects design buildings that are useful, safe and pleasant to be in.', ['Sketch and model designs', 'Meet clients', 'Check building rules', 'Coordinate with engineers'], ['Art', 'Mathematics', 'Physics'], ['Mathematics', 'Art'], ['design', 'eng-civil'], ['Interior Designer', 'Civil Engineer', 'Urban Planner', 'Landscape Designer']),
  // media
  mk('journalist', 'Journalist', '📰', 'media', 'social', { communication: 3, researchInterest: 2, leadership: 1 }, 'Finds and shares accurate stories.',
    'Journalists research, interview and write or present stories so people stay informed.', ['Research stories', 'Interview people', 'Write or record reports', 'Check facts'], ['English', 'Urdu', 'Social Studies'], ['English', 'Urdu'], ['media', 'humanities'], ['Content Creator', 'Public Relations', 'Editor', 'Researcher']),
  mk('content-creator', 'Content Creator', '🎬', 'media', 'design', { creativity: 3, communication: 3, technologyInterest: 1 }, 'Makes videos, posts and stories for an audience.',
    'Content creators plan, produce and share media that informs or entertains people online.', ['Plan content', 'Record and edit', 'Study audience feedback', 'Work with brands'], ['English', 'Computer', 'Art'], ['English'], ['media', 'design'], ['Marketing Manager', 'Filmmaker', 'Graphic Designer', 'Journalist']),
  mk('filmmaker', 'Filmmaker', '🎥', 'media', 'design', { creativity: 3, communication: 2, leadership: 1, handsOnWork: 1 }, 'Tells stories through film.',
    'Filmmakers develop ideas into films, working with writers, camera crews and editors.', ['Write or develop scripts', 'Direct or shoot scenes', 'Edit footage', 'Coordinate a crew'], ['English', 'Art', 'Computer'], ['English', 'Art'], ['media', 'design'], ['Content Creator', 'Animator', 'Journalist', 'Photographer']),
  // education
  mk('teacher', 'Teacher', '🍎', 'education', 'social', { communication: 3, helpingPeople: 3, leadership: 1 }, 'Helps students learn and grow.',
    'Teachers plan lessons, explain ideas and support students to reach their potential.', ['Plan lessons', 'Teach and guide', 'Assess progress', 'Talk with parents'], ['English', 'Urdu', 'Any school subject'], ['English'], ['edu', 'humanities'], ['Education Counselor', 'Curriculum Designer', 'Trainer', 'Academic Researcher']),
  mk('education-counselor', 'Education Counselor', '🧭', 'education', 'social', { helpingPeople: 3, communication: 3, analyticalThinking: 1 }, 'Guides students toward suitable study paths.',
    'Education counselors listen to students and help them understand their options.', ['Meet students', 'Review interests and strengths', 'Share study options', 'Follow up on plans'], ['Psychology', 'English', 'Social Studies'], ['English'], ['psych', 'edu', 'social'], ['Teacher', 'Psychologist', 'Social Worker', 'Human Resources']),
  // law
  mk('lawyer', 'Lawyer', '⚖️', 'law', 'social', { communication: 3, analyticalThinking: 2, leadership: 1 }, 'Advises people and speaks for them within the law.',
    'Lawyers explain laws, prepare cases and represent people or organisations.', ['Read and research law', 'Draft documents', 'Advise clients', 'Argue cases in court'], ['English', 'Social Studies', 'Islamiyat'], ['English'], ['llb', 'humanities'], ['Policy Analyst', 'Civil Servant', 'Legal Assistant', 'Journalist']),
  mk('civil-servant', 'Civil Servant', '🏛️', 'law', 'social', { leadership: 3, communication: 2, helpingPeople: 1 }, 'Works in government to serve the public.',
    'Civil servants help plan and deliver public services and policies.', ['Prepare reports', 'Coordinate with offices', 'Handle public issues', 'Apply rules fairly'], ['English', 'Pakistan Studies', 'Social Studies'], ['English'], ['social', 'humanities'], ['Policy Analyst', 'Lawyer', 'Community Development', 'Diplomat']),
  mk('policy-analyst', 'Policy Analyst', '📜', 'law', 'social', { analyticalThinking: 3, researchInterest: 2, communication: 2 }, 'Studies problems and suggests public solutions.',
    'Policy analysts research issues and recommend actions for governments and organisations.', ['Research issues', 'Analyse data', 'Write briefs', 'Present recommendations'], ['English', 'Economics', 'Social Studies'], ['English', 'Mathematics'], ['social', 'humanities'], ['Economist', 'Research Analyst', 'Civil Servant', 'Lawyer']),
  // social
  mk('social-worker', 'Social Worker', '🤝', 'social', 'social', { helpingPeople: 3, communication: 2, leadership: 1 }, 'Supports individuals and families in need.',
    'Social workers help people find support and resources during difficult times.', ['Meet families', 'Assess needs', 'Connect people to services', 'Keep records'], ['Social Studies', 'Psychology', 'English'], ['English'], ['social', 'psych'], ['Psychologist', 'Community Development', 'Counselor', 'Teacher']),
  mk('economist', 'Economist', '🌐', 'social', 'social', { analyticalThinking: 3, researchInterest: 2, businessInterest: 1 }, 'Studies how money, trade and choices shape societies.',
    'Economists use data and theory to understand markets and advise on decisions.', ['Analyse data', 'Build models', 'Write reports', 'Advise decision makers'], ['Mathematics', 'Economics', 'Statistics'], ['Mathematics', 'Economics'], ['social', 'finance', 'ds'], ['Financial Analyst', 'Policy Analyst', 'Statistician', 'Research Analyst']),
  mk('community-development', 'Community Development Officer', '🏘️', 'social', 'social', { helpingPeople: 3, leadership: 2, communication: 2 }, 'Helps communities solve local challenges.',
    'Community development officers work with local groups on projects like education, health and clean water.', ['Meet community members', 'Plan projects', 'Work with partners', 'Track results'], ['Social Studies', 'English', 'Urdu'], ['English'], ['social'], ['Social Worker', 'Civil Servant', 'Teacher', 'Policy Analyst']),
  // natural
  mk('physicist', 'Physicist', '⚛️', 'natural', 'science', { researchInterest: 3, analyticalThinking: 3, technologyInterest: 1 }, 'Explores the basic laws of nature.',
    'Physicists study matter, energy and forces using experiments and mathematics.', ['Design experiments', 'Analyse data', 'Use mathematical models', 'Share findings'], ['Physics', 'Mathematics', 'Computer Science'], ['Physics', 'Mathematics'], ['natural', 'eng-elec'], ['Electrical Engineer', 'Data Scientist', 'Astronomer', 'Teacher']),
  mk('chemist', 'Chemist', '⚗️', 'natural', 'science', { researchInterest: 3, handsOnWork: 2, analyticalThinking: 2 }, 'Studies substances and how they change.',
    'Chemists test and create materials, and study how substances react.', ['Run lab tests', 'Record results', 'Follow safety rules', 'Develop new materials'], ['Chemistry', 'Mathematics', 'Biology'], ['Chemistry', 'Mathematics'], ['natural'], ['Pharmacist', 'Biotechnologist', 'Food Technologist', 'Chemical Engineer']),
  mk('environmental-scientist', 'Environmental Scientist', '🌿', 'natural', 'science', { researchInterest: 3, handsOnWork: 2, helpingPeople: 1 }, 'Studies and protects the natural environment.',
    'Environmental scientists collect data about air, water and land to help protect them.', ['Collect field samples', 'Analyse data', 'Write reports', 'Advise on solutions'], ['Biology', 'Chemistry', 'Geography'], ['Biology', 'Chemistry'], ['natural'], ['Wildlife Conservationist', 'Agricultural Scientist', 'Civil Engineer', 'Public Health']),
  // agri
  mk('agricultural-scientist', 'Agricultural Scientist', '🌾', 'agri', 'science', { handsOnWork: 3, researchInterest: 2, helpingPeople: 1 }, 'Improves crops, soil and farming methods.',
    'Agricultural scientists study how to grow healthy food sustainably.', ['Visit farms and fields', 'Test soil and crops', 'Analyse results', 'Advise farmers'], ['Biology', 'Chemistry', 'Geography'], ['Biology', 'Chemistry'], ['natural'], ['Food Technologist', 'Environmental Scientist', 'Biotechnologist', 'Farm Manager']),
  mk('food-technologist', 'Food Technologist', '🍽️', 'agri', 'science', { researchInterest: 2, handsOnWork: 3, analyticalThinking: 1 }, 'Develops safe, healthy, tasty food products.',
    'Food technologists test and improve food so it is safe, nutritious and consistent.', ['Test recipes', 'Check quality', 'Follow food safety rules', 'Work with production teams'], ['Chemistry', 'Biology', 'Mathematics'], ['Chemistry', 'Biology'], ['natural', 'mlt'], ['Chemist', 'Nutritionist', 'Biotechnologist', 'Agricultural Scientist']),
  mk('wildlife-conservationist', 'Wildlife Conservationist', '🦌', 'agri', 'science', { handsOnWork: 3, researchInterest: 2, helpingPeople: 1 }, 'Protects animals and their habitats.',
    'Conservationists study wildlife and work to protect species and natural places.', ['Observe and record wildlife', 'Work outdoors', 'Plan protection efforts', 'Educate communities'], ['Biology', 'Geography', 'English'], ['Biology'], ['natural'], ['Environmental Scientist', 'Agricultural Scientist', 'Teacher', 'Park Manager']),
  // aviation
  mk('pilot', 'Pilot', '🛩️', 'aviation', 'general', { handsOnWork: 3, analyticalThinking: 2, leadership: 2 }, 'Flies aircraft and keeps passengers safe.',
    'Pilots plan flights, operate aircraft and make careful decisions to keep everyone safe.', ['Check weather and plans', 'Fly the aircraft', 'Communicate with air traffic control', 'Follow safety checks'], ['Physics', 'Mathematics', 'English'], ['Physics', 'Mathematics'], ['eng-mech', 'humanities'], ['Aerospace Engineer', 'Air Traffic Controller', 'Aircraft Technician', 'Cabin Crew']),
  mk('hospitality-manager', 'Hospitality Manager', '🏨', 'aviation', 'business', { leadership: 3, communication: 3, helpingPeople: 2 }, 'Leads teams that look after guests.',
    'Hospitality managers organise hotels, restaurants and events so guests have a good experience.', ['Coordinate staff', 'Handle guest needs', 'Manage budgets', 'Plan events'], ['English', 'Economics', 'Mathematics'], ['English'], ['bba'], ['Tourism Manager', 'Event Planner', 'Entrepreneur', 'Operations Manager']),
  mk('tourism-manager', 'Tourism Manager', '🧳', 'aviation', 'business', { communication: 3, leadership: 2, businessInterest: 2 }, 'Plans trips and promotes places to visit.',
    'Tourism managers design travel experiences and work with local partners.', ['Plan itineraries', 'Work with partners', 'Promote destinations', 'Review feedback'], ['Geography', 'English', 'Social Studies'], ['English'], ['bba', 'humanities'], ['Hospitality Manager', 'Event Planner', 'Marketing Manager', 'Travel Writer']),
  // sports
  mk('sports-coach', 'Sports Coach', '🏆', 'sports', 'general', { leadership: 3, helpingPeople: 2, handsOnWork: 3, communication: 1 }, 'Trains people and teams to improve.',
    'Coaches plan training, teach skills and motivate players.', ['Plan sessions', 'Teach skills', 'Give feedback', 'Support teamwork'], ['Physical Education', 'Biology', 'English'], ['Biology'], ['edu', 'natural'], ['Physiotherapist', 'Sports Scientist', 'Teacher', 'Fitness Trainer']),
  mk('physiotherapist', 'Physiotherapist', '💪', 'sports', 'health', { helpingPeople: 3, handsOnWork: 3, researchInterest: 1 }, 'Helps people recover movement and strength.',
    'Physiotherapists assess injuries and guide exercises that help people move well again.', ['Assess patients', 'Plan exercises', 'Guide recovery', 'Track progress'], ['Biology', 'Chemistry', 'Physics'], ['Biology', 'Chemistry'], ['mlt', 'natural'], ['Sports Scientist', 'Doctor', 'Occupational Therapist', 'Nutritionist']),
  mk('sports-scientist', 'Sports Scientist', '📈', 'sports', 'science', { researchInterest: 3, handsOnWork: 2, analyticalThinking: 2 }, 'Uses science to improve performance and health.',
    'Sports scientists measure and analyse how bodies perform to support athletes.', ['Test performance', 'Analyse data', 'Advise athletes', 'Review research'], ['Biology', 'Physics', 'Mathematics'], ['Biology', 'Mathematics'], ['natural'], ['Physiotherapist', 'Sports Coach', 'Nutritionist', 'Data Scientist']),
];

export const careerById = (id: string): Career | undefined => careers.find(c => c.id === id);

// ---------- degrees ----------
const dg = (id: string, name: string, category: string, description: string, subjects: string[], careerIds: string[], relevance: string): Degree => ({ id, name, category, description, subjects, careers: careerIds, relevance });

export const degrees: Degree[] = [
  dg('cs', 'BS Computer Science', 'Computing', 'Covers programming, algorithms, systems and the theory behind computing.', ['Mathematics', 'Computer Science', 'Physics'], ['software-engineer', 'cybersecurity-analyst', 'ai-engineer', 'data-scientist'], 'A common route toward computing careers. Review applicable entry requirements.'),
  dg('se', 'BS Software Engineering', 'Computing', 'Focuses on designing, building and maintaining software in teams.', ['Mathematics', 'Computer Science'], ['software-engineer', 'cybersecurity-analyst', 'ux-designer'], 'Relevant for people who enjoy building products with others.'),
  dg('ai', 'BS Artificial Intelligence', 'Computing', 'Studies machine learning, data and intelligent systems.', ['Mathematics', 'Computer Science', 'Statistics'], ['ai-engineer', 'data-scientist', 'robotics-engineer'], 'Relevant for strong interest in data, maths and technology.'),
  dg('ds', 'BS Data Science', 'Computing', 'Combines statistics, programming and domain knowledge to learn from data.', ['Mathematics', 'Statistics', 'Computer Science'], ['data-scientist', 'statistician', 'research-analyst', 'economist'], 'Relevant for analytical and research-minded students.'),
  dg('mbbs', 'MBBS', 'Health Sciences', 'A medical degree combining science teaching with clinical training.', ['Biology', 'Chemistry', 'Physics'], ['doctor'], 'A common route for healthcare careers. Entry requirements and assessments should be reviewed.'),
  dg('pharmd', 'Pharm-D', 'Health Sciences', 'Teaches medicines, how they work and how to use them safely.', ['Chemistry', 'Biology'], ['pharmacist'], 'Relevant for interest in medicines and healthcare.'),
  dg('mlt', 'BS Medical Laboratory Technology', 'Health Sciences', 'Trains you in laboratory testing used to diagnose disease.', ['Biology', 'Chemistry'], ['med-lab-scientist', 'physiotherapist', 'food-technologist'], 'A healthcare route with a strong lab and science focus.'),
  dg('psych', 'BS Psychology', 'Social Sciences', 'Studies behaviour, thinking and emotions using research methods.', ['Psychology', 'Biology', 'English'], ['psychologist', 'education-counselor', 'social-worker'], 'Relevant for interest in people and how they think.'),
  dg('bba', 'BBA', 'Business', 'Introduces management, marketing, finance and entrepreneurship.', ['Economics', 'Mathematics', 'English'], ['entrepreneur', 'marketing-manager', 'project-manager', 'hospitality-manager'], 'Relevant for leadership and business interest.'),
  dg('finance', 'BS Accounting & Finance', 'Business', 'Covers accounting, financial markets and analysis.', ['Mathematics', 'Accounting', 'Economics'], ['accountant', 'financial-analyst', 'banker', 'economist'], 'Relevant for careful, numbers-focused students.'),
  dg('eng-elec', 'BS Electrical Engineering (Engineering Programs)', 'Engineering', 'Covers circuits, power, electronics and communication systems.', ['Mathematics', 'Physics'], ['electrical-engineer', 'robotics-engineer', 'physicist'], 'Relevant for technical, hands-on problem solvers. Review applicable entry tests.'),
  dg('eng-mech', 'BS Mechanical Engineering (Engineering Programs)', 'Engineering', 'Covers mechanics, materials, energy and machine design.', ['Mathematics', 'Physics'], ['mechanical-engineer', 'robotics-engineer', 'pilot'], 'Relevant for interest in how machines work.'),
  dg('eng-civil', 'BS Civil Engineering (Engineering Programs)', 'Engineering', 'Covers structures, materials and infrastructure planning.', ['Mathematics', 'Physics'], ['civil-engineer', 'architect'], 'Relevant for interest in building and planning.'),
  dg('design', 'BS Design (Communication / Architecture)', 'Design', 'Develops creative and technical skills in visual design, products or spaces.', ['Art', 'Computer', 'Mathematics'], ['graphic-designer', 'ux-designer', 'architect', 'content-creator', 'filmmaker'], 'Relevant for creative students. A portfolio may be part of applicable requirements.'),
  dg('social', 'BS Social Sciences', 'Social Sciences', 'Studies societies, economics, politics and communities.', ['English', 'Social Studies', 'Economics'], ['social-worker', 'economist', 'policy-analyst', 'civil-servant', 'community-development', 'research-analyst'], 'Relevant for interest in people, systems and research.'),
  dg('llb', 'LLB (Law)', 'Social Sciences', 'Teaches legal systems, reasoning and practice.', ['English', 'Social Studies'], ['lawyer'], 'Relevant for strong communication and reasoning interest. Review applicable requirements.'),
  dg('natural', 'BS Natural Sciences (Physics / Chemistry / Biology)', 'Natural Sciences', 'Builds deep understanding of the natural world through lab work and maths.', ['Physics', 'Chemistry', 'Biology', 'Mathematics'], ['physicist', 'chemist', 'environmental-scientist', 'biotechnologist', 'agricultural-scientist', 'wildlife-conservationist', 'sports-scientist'], 'Relevant for curious, research-minded students.'),
  dg('humanities', 'BS / BA Humanities (English, Media, History)', 'Humanities', 'Develops writing, critical thinking and cultural understanding.', ['English', 'Urdu', 'Social Studies'], ['journalist', 'teacher', 'lawyer', 'tourism-manager', 'civil-servant'], 'Relevant for strong readers, writers and communicators.'),
  dg('media', 'BS Media & Communication', 'Humanities', 'Covers storytelling, journalism, media production and public relations.', ['English', 'Art', 'Computer'], ['journalist', 'content-creator', 'filmmaker', 'marketing-manager'], 'Relevant for creative communicators.'),
  dg('edu', 'BEd / BS Education', 'Humanities', 'Prepares you to teach and support learning.', ['English', 'Psychology', 'Any teaching subject'], ['teacher', 'education-counselor', 'sports-coach'], 'Relevant for people who enjoy helping others learn.'),
];
