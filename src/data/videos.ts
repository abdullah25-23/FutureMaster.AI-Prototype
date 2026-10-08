import { DimensionKey, EducationLevel } from '../types';

export type VideoCategory = 'Day in the Life' | 'Career Reality' | 'Degree to Career' | 'Compare Careers';
export interface Video {
  id: string; title: string; area: string; thumb: string; duration: string; description: string;
  levels: EducationLevel[]; dim: DimensionKey; clusterId?: string; careerIds?: string[]; degreeIds?: string[]; category?: VideoCategory;
}
export type VideoSectionKey = 'interests' | 'related' | 'new';

export const videoSections: { key: VideoSectionKey; title: string }[] = [
  { key: 'interests', title: 'Based on Your Interests' },
  { key: 'related', title: 'Related Areas' },
  { key: 'new', title: 'Explore Something New' },
];
export const videoCategories: VideoCategory[] = ['Day in the Life', 'Career Reality', 'Degree to Career', 'Compare Careers'];

const B: EducationLevel[] = ['beginner']; const I: EducationLevel[] = ['intermediate']; const A: EducationLevel[] = ['advanced'];
const v = (id: string, levels: EducationLevel[], title: string, area: string, thumb: string, duration: string, dim: DimensionKey, description: string,
  extra: Partial<Video> = {}): Video => ({ id, levels, title, area, thumb, duration, dim, description, ...extra });

export const videos: Video[] = [
  // Beginner: broad awareness, short and friendly
  v('b-robotics', B, 'What Does a Robotics Engineer Do?', 'Engineering & Robotics', '🤖', '2:40', 'technologyInterest', 'A friendly look at how people design, build and test robots.', { clusterId: 'engineering', careerIds: ['mechanical-engineer', 'electrical-engineer'] }),
  v('b-doctor', B, 'A Day in the Life of a Doctor', 'Medical & Health Sciences', '🩺', '3:00', 'helpingPeople', 'Follow a doctor through a typical day and see how they help people.', { clusterId: 'health', careerIds: ['doctor'] }),
  v('b-architect', B, 'How Architects Design Buildings', 'Design & Architecture', '🏛️', '2:50', 'creativity', 'See how an idea on paper becomes a building people can use.', { clusterId: 'design' }),
  v('b-game', B, 'What Does a Game Developer Do?', 'Technology & Computing', '🎮', '2:45', 'technologyInterest', 'Discover how games are imagined, built and tested by a team.', { clusterId: 'tech', careerIds: ['software-engineer'] }),
  v('b-scientist', B, 'Scientists and How They Solve Problems', 'Research & Science', '🔬', '3:10', 'researchInterest', 'How scientists ask questions, test ideas and learn from results.', { clusterId: 'research' }),
  v('b-teacher', B, 'A Day in the Life of a Teacher', 'Education', '📚', '2:30', 'communication', 'What teachers do before, during and after class.', { clusterId: 'education' }),
  v('b-business', B, 'How a Small Shop Becomes a Business', 'Business & Management', '🛍️', '2:55', 'businessInterest', 'A simple story of planning, selling and growing an idea.', { clusterId: 'business', careerIds: ['entrepreneur'] }),
  v('b-pilot', B, 'Behind the Scenes at an Airport', 'Aviation & Hospitality', '✈️', '3:05', 'handsOnWork', 'The many roles that keep planes and passengers moving.', { clusterId: 'aviation' }),

  // Intermediate: fields, subjects, study directions
  v('i-cs', I, 'Careers in Computer Science', 'Technology & Computing', '💻', '4:00', 'technologyInterest', 'Fields in computing and the subjects, like Mathematics and Computer Science, that connect to them.', { clusterId: 'tech', careerIds: ['software-engineer', 'data-scientist'] }),
  v('i-eng', I, 'Engineering Fields Explained', 'Engineering & Robotics', '⚙️', '4:10', 'analyticalThinking', 'Civil, electrical and mechanical engineering, and the subjects each builds on.', { clusterId: 'engineering', careerIds: ['civil-engineer', 'mechanical-engineer', 'electrical-engineer'] }),
  v('i-health', I, 'Healthcare Careers Beyond Becoming a Doctor', 'Medical & Health Sciences', '🧬', '4:20', 'helpingPeople', 'Pharmacy, lab science, psychology and other healthcare paths worth exploring.', { clusterId: 'health', careerIds: ['pharmacist', 'psychologist', 'med-lab-scientist'] }),
  v('i-ics', I, 'What Can You Do After ICS?', 'Study Pathways', '🧭', '4:05', 'technologyInterest', 'Possible directions after ICS, from computing degrees to business and data.', { clusterId: 'tech', degreeIds: ['cs', 'se'] }),
  v('i-premed', I, 'What Can You Do After FSc Pre-Medical?', 'Study Pathways', '🧪', '4:15', 'researchInterest', 'Medical and many related health and science routes after Pre-Medical.', { clusterId: 'health', degreeIds: ['mbbs', 'pharmd', 'mlt'] }),
  v('i-creative', I, 'Creative Careers and Design Fields', 'Arts & Design', '🎨', '3:40', 'creativity', 'Design fields, the subjects that help, and where creative study can lead.', { clusterId: 'design', degreeIds: ['design'] }),
  v('i-business', I, 'Business and Commerce Career Paths', 'Business & Management', '📈', '3:50', 'businessInterest', 'Commerce subjects and the business, finance and management paths connected to them.', { clusterId: 'business', degreeIds: ['bba', 'finance'] }),
  v('i-social', I, 'Careers That Work With People and Society', 'Social Sciences', '🤝', '3:45', 'communication', 'Psychology, law, education and social work, and how subjects connect to them.', { clusterId: 'social' }),

  // Advanced: Day in the Life
  v('a-d-swe', A, 'Day in the Life of a Software Engineer', 'Technology & Computing', '💻', '6:10', 'technologyInterest', 'Stand-ups, code reviews, debugging and shipping: a realistic software team day.', { category: 'Day in the Life', clusterId: 'tech', careerIds: ['software-engineer'] }),
  v('a-d-doctor', A, 'Day in the Life of a Doctor', 'Medical & Health Sciences', '🩺', '6:30', 'helpingPeople', 'Rounds, patients, long hours and teamwork in a typical clinical day.', { category: 'Day in the Life', clusterId: 'health', careerIds: ['doctor'] }),
  v('a-d-pharm', A, 'Day in the Life of a Pharmacist', 'Medical & Health Sciences', '💊', '5:40', 'researchInterest', 'Dispensing, checking prescriptions and advising patients.', { category: 'Day in the Life', clusterId: 'health', careerIds: ['pharmacist'] }),
  v('a-d-psych', A, 'Day in the Life of a Psychologist', 'Medical & Health Sciences', '🧠', '5:50', 'communication', 'Sessions, notes, research and the emotional side of the work.', { category: 'Day in the Life', clusterId: 'health', careerIds: ['psychologist'] }),
  v('a-d-civil', A, 'Day in the Life of a Civil Engineer', 'Engineering & Robotics', '🏗️', '6:00', 'handsOnWork', 'Site visits, drawings, safety checks and coordination.', { category: 'Day in the Life', clusterId: 'engineering', careerIds: ['civil-engineer'] }),
  v('a-d-ds', A, 'Day in the Life of a Data Scientist', 'Research & Data', '📊', '5:55', 'analyticalThinking', 'Cleaning data, building models and explaining results to others.', { category: 'Day in the Life', clusterId: 'tech', careerIds: ['data-scientist'] }),
  v('a-d-cyber', A, 'A Day in Cybersecurity', 'Technology & Computing', '🛡️', '5:45', 'technologyInterest', 'Monitoring systems, investigating alerts and hardening defences.', { category: 'Day in the Life', clusterId: 'tech', careerIds: ['cybersecurity-analyst'] }),
  // Career Reality
  v('a-r-swe', A, 'What Does a Software Engineer Actually Do?', 'Technology & Computing', '⌨️', '7:00', 'technologyInterest', 'Software Engineering: what the work is really like, beyond just writing code.', { category: 'Career Reality', clusterId: 'tech', careerIds: ['software-engineer'], degreeIds: ['se', 'cs'] }),
  v('a-r-mbbs', A, 'What Is Studying MBBS Really Like?', 'Medical & Health Sciences', '🏥', '7:20', 'helpingPeople', 'The years of study, workload and clinical training, explained honestly.', { category: 'Career Reality', clusterId: 'health', careerIds: ['doctor'], degreeIds: ['mbbs'] }),
  v('a-r-psych', A, 'What Does a Psychologist Actually Do?', 'Social Sciences', '🧠', '6:40', 'communication', 'Clinical, counselling, research and organizational roles compared with the popular image.', { category: 'Career Reality', clusterId: 'health', careerIds: ['psychologist'], degreeIds: ['psych'] }),
  v('a-r-civil', A, 'What Does a Civil Engineer Work On?', 'Engineering & Robotics', '🌉', '6:35', 'handsOnWork', 'Roads, buildings, water systems and the planning behind them.', { category: 'Career Reality', clusterId: 'engineering', careerIds: ['civil-engineer'], degreeIds: ['eng-civil'] }),
  v('a-r-ds', A, 'What Does a Data Scientist Do?', 'Research & Data', '📈', '6:50', 'researchInterest', 'Questions, data, modelling and communication: the real mix of tasks.', { category: 'Career Reality', clusterId: 'research', careerIds: ['data-scientist'], degreeIds: ['ds'] }),
  v('a-r-cyber', A, 'Cybersecurity Careers Explained', 'Technology & Computing', '🔐', '6:25', 'technologyInterest', 'Different security roles, what they need and how people enter the field.', { category: 'Career Reality', clusterId: 'tech', careerIds: ['cybersecurity-analyst'] }),
  v('a-r-forensics', A, 'Digital Forensics Explained', 'Technology & Computing', '🔎', '5:30', 'analyticalThinking', 'How investigators recover and examine digital evidence.', { category: 'Career Reality', clusterId: 'tech', careerIds: ['cybersecurity-analyst'] }),
  // Degree to Career
  v('a-g-cs', A, 'Careers After BS Computer Science', 'Computing', '🎓', '6:15', 'technologyInterest', 'BSCS: subjects, careers and what to expect.', { category: 'Degree to Career', clusterId: 'tech', degreeIds: ['cs'] }),
  v('a-g-se', A, 'Careers After BS Software Engineering', 'Computing', '🧩', '6:05', 'technologyInterest', 'How a software engineering degree connects to industry roles.', { category: 'Degree to Career', clusterId: 'tech', degreeIds: ['se'] }),
  v('a-g-bba', A, 'Careers After BBA', 'Business', '💼', '5:50', 'businessInterest', 'Management, marketing, finance and entrepreneurship routes after BBA.', { category: 'Degree to Career', clusterId: 'business', degreeIds: ['bba'] }),
  v('a-g-psych', A, 'Careers After Psychology', 'Social Sciences', '🧠', '5:45', 'communication', 'Clinical, educational, organizational and research routes after a psychology degree.', { category: 'Degree to Career', clusterId: 'health', degreeIds: ['psych'] }),
  v('a-g-eng', A, 'Careers After Engineering Degrees', 'Engineering', '🛠️', '6:20', 'analyticalThinking', 'Civil, electrical and mechanical engineering and the careers that follow.', { category: 'Degree to Career', clusterId: 'engineering', degreeIds: ['eng-civil', 'eng-elec', 'eng-mech'] }),
  v('a-g-health', A, 'Healthcare Degrees and Their Career Paths', 'Health Sciences', '⚕️', '6:30', 'helpingPeople', 'MBBS, Pharm-D, lab science and related degrees compared by path.', { category: 'Degree to Career', clusterId: 'health', degreeIds: ['mbbs', 'pharmd', 'mlt'] }),
  // Compare Careers
  v('a-c-swe-ds', A, 'Software Engineering vs Data Science', 'Technology & Computing', '⚖️', '7:10', 'analyticalThinking', 'Daily work, skills and study routes side by side.', { category: 'Compare Careers', clusterId: 'tech', careerIds: ['software-engineer', 'data-scientist'], degreeIds: ['se', 'ds'] }),
  v('a-c-cs-se', A, 'Computer Science vs Software Engineering', 'Computing', '⚖️', '6:45', 'technologyInterest', 'How the two degrees differ in focus and outcomes.', { category: 'Compare Careers', clusterId: 'tech', degreeIds: ['cs', 'se'] }),
  v('a-c-med-pharm', A, 'Medicine vs Pharmacy', 'Medical & Health Sciences', '⚖️', '7:00', 'helpingPeople', 'Training length, daily work and patient contact compared.', { category: 'Compare Careers', clusterId: 'health', careerIds: ['doctor', 'pharmacist'], degreeIds: ['mbbs', 'pharmd'] }),
  v('a-c-psy', A, 'Psychology vs Psychiatry', 'Medical & Health Sciences', '⚖️', '6:30', 'communication', 'Two different training routes and ways of supporting wellbeing.', { category: 'Compare Careers', clusterId: 'health', careerIds: ['psychologist'], degreeIds: ['psych', 'mbbs'] }),
  v('a-c-civ-arch', A, 'Civil Engineering vs Architecture', 'Engineering & Design', '⚖️', '6:50', 'creativity', 'Technical structure versus design vision, and where they overlap.', { category: 'Compare Careers', clusterId: 'engineering', careerIds: ['civil-engineer'], degreeIds: ['eng-civil', 'design'] }),
  v('a-c-cs-ee', A, 'Computer Science vs Electrical Engineering', 'Computing & Engineering', '⚖️', '6:55', 'technologyInterest', 'Software-first versus hardware-and-systems-first study.', { category: 'Compare Careers', clusterId: 'engineering', careerIds: ['electrical-engineer'], degreeIds: ['cs', 'eng-elec'] }),
  v('a-c-secengineer', A, 'Security Engineer vs Cybersecurity Analyst', 'Technology & Computing', '⚖️', '6:10', 'technologyInterest', 'Building secure systems versus monitoring and responding to threats.', { category: 'Compare Careers', clusterId: 'tech', careerIds: ['cybersecurity-analyst'] }),
  v('a-n-media', A, 'Telling Stories: Careers in Media', 'Media & Communication', '🎬', '5:35', 'creativity', 'Journalism, production and digital media: the work and the study routes.', { category: 'Career Reality', clusterId: 'media' }),
];

export const ratingLabels: Record<number, string> = { 1: 'Not interested', 2: 'Slightly interested', 3: 'Somewhat interested', 4: 'Interested', 5: 'Very interested' };

export const videoById = (id?: string) => videos.find(x => x.id === id);

export function videosForLevel(level: EducationLevel | null, dims: Record<DimensionKey, number>): Record<VideoSectionKey, Video[]> {
  const pool = videos.filter(x => x.levels.includes(level ?? 'beginner'));
  const ranked = pool.slice().sort((a, b) => dims[b.dim] - dims[a.dim]);
  const total = ranked.length;
  const big = total > 12;
  const nI = big ? 4 : 3; const nN = big ? 3 : 3; const nR = big ? 3 : 3;
  const fresh = ranked.slice(nI + nR).reverse().slice(0, nN);
  const interests = ranked.slice(0, nI);
  const related = ranked.slice(nI, nI + nR);
  return { interests, related, new: fresh };
}

export function relatedVideosForCareer(careerId: string, clusterId: string, level: EducationLevel | null): Video[] {
  const direct = videos.filter(x => x.careerIds?.includes(careerId));
  const pref = direct.filter(x => x.levels.includes(level ?? 'beginner'));
  const list = pref.length ? pref : direct.length ? direct : videos.filter(x => x.clusterId === clusterId && x.levels.includes(level ?? 'beginner'));
  return list.slice(0, 3);
}

export const relatedVideoForDegree = (degreeId: string) => videos.find(x => x.degreeIds?.includes(degreeId) && x.levels.includes('advanced'));
