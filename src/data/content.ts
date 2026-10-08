import { DimensionKey, EducationLevel, Screen } from '../types';

export const levelMeta: Record<EducationLevel, {
  label: string; classes: string; title: string; icon: string; desc: string; accent: string; classList: string[];
}> = {
  beginner: { label: 'Beginner', classes: 'Class 6-8', title: 'Interest Discovery', icon: 'Compass', accent: '#00E676', classList: ['Class 6', 'Class 7', 'Class 8'],
    desc: 'Discover what interests you through simple activities, scenarios and exploration.' },
  intermediate: { label: 'Intermediate', classes: 'Class 9-10', title: 'Subject & Pathway Guidance', icon: 'BookOpen', accent: '#00D2FF', classList: ['Class 9', 'Class 10'],
    desc: 'Connect your interests with subjects and possible future study pathways.' },
  advanced: { label: 'Advanced', classes: 'Class 11-12', title: 'Degree & Career Decision Support', icon: 'GraduationCap', accent: '#A78BFA', classList: ['Class 11 / 1st Year', 'Class 12 / 2nd Year'],
    desc: 'Explore career areas, degree pathways and your academic readiness before making important next-step decisions.' },
};

export const dimensionMeta: Record<DimensionKey, { label: string; color: string }> = {
  analyticalThinking: { label: 'Analytical Thinking', color: '#6366F1' },
  technologyInterest: { label: 'Technology Interest', color: '#00D2FF' },
  creativity: { label: 'Creativity', color: '#EC4899' },
  helpingPeople: { label: 'Helping People', color: '#00E676' },
  leadership: { label: 'Leadership', color: '#FFC107' },
  communication: { label: 'Communication', color: '#38BDF8' },
  handsOnWork: { label: 'Hands-on Work', color: '#FB923C' },
  researchInterest: { label: 'Research Interest', color: '#7C3AED' },
  businessInterest: { label: 'Business / Enterprising', color: '#F59E0B' },
};

export const beginnerSubjects = ['Mathematics', 'General Science', 'Computer', 'English', 'Urdu', 'Social Studies', 'Art', 'Other'];
export const beginnerActivities = [
  { label: 'Building / Making Things', icon: '🧱' }, { label: 'Drawing / Designing', icon: '🎨' },
  { label: 'Reading / Writing', icon: '📖' }, { label: 'Sports / Games', icon: '⚽' },
  { label: 'Helping Others', icon: '🤝' }, { label: 'Problem Solving', icon: '🧩' },
  { label: 'Music / Arts', icon: '🎵' }, { label: 'Coding / Technology', icon: '💻' },
];
export const intermediateGroups = ['Science with Biology', 'Science with Computer Science', 'Arts / Humanities', 'Other'];
export const intermediateSubjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'English', 'Urdu', 'Islamiyat', 'Pakistan Studies', 'Arts / Humanities'];
export const intermediateMarkSubjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];
export const advancedGroups = ['FSc Pre-Medical', 'FSc Pre-Engineering', 'ICS', 'I.Com / Commerce', 'FA / Arts / Humanities', 'Other'];
export const advancedGroupSubjects: Record<string, string[]> = {
  'FSc Pre-Medical': ['Biology', 'Chemistry', 'Physics'],
  'FSc Pre-Engineering': ['Mathematics', 'Physics', 'Chemistry'],
  'ICS': ['Mathematics', 'Computer Science', 'Physics / Statistics'],
  'I.Com / Commerce': ['Accounting', 'Economics', 'Statistics / Business'],
  'FA / Arts / Humanities': ['Psychology', 'Sociology', 'Economics'],
  'Other': ['Subject 1', 'Subject 2', 'Subject 3'],
};
export const futureFieldOptions = ['Computing', 'Engineering', 'Medicine / Healthcare', 'Business', 'Arts / Design', 'Psychology', 'Law', 'Science', 'Other'];

export const careerFacts: Record<EducationLevel, string[]> = {
  beginner: [
    'Robotics engineers can create machines used in hospitals, factories and space exploration.',
    'Architects combine creativity, mathematics and problem solving.',
    'Game designers use storytelling, art and logic together.',
  ],
  intermediate: [
    'Many technology careers combine mathematics, logical thinking and creativity.',
    'Healthcare includes many careers beyond becoming a doctor.',
    'Data scientists often work with ideas from statistics, computing and the subject they study.',
  ],
  advanced: [
    'Computer Science can lead to software development, cybersecurity, AI and data careers.',
    'Psychology can lead to careers in mental health, research, education and organizations.',
    'Many engineering fields overlap with computing, design and management.',
  ],
};

export interface NotificationItem { id: string; icon: string; title: string; body: string; time: string; screen: Screen; unread?: boolean }
export const notificationItems: NotificationItem[] = [
  { id: 'n1', icon: '✨', title: 'Interest Profile Updated', body: 'Your latest answers refined your interest patterns.', time: '2m ago', screen: 'interest-profile', unread: true },
  { id: 'n2', icon: '🧭', title: 'New Career Area Worth Exploring', body: 'Research & Data matches patterns from your exploration.', time: '1h ago', screen: 'clusters', unread: true },
  { id: 'n3', icon: '🎬', title: 'New Career Video Selected', body: 'A short video based on your interests is ready to watch.', time: '3h ago', screen: 'videos', unread: true },
  { id: 'n4', icon: '✅', title: 'Exploration Activity Completed', body: 'Nice work finishing your last activity.', time: 'Yesterday', screen: 'activities' },
  { id: 'n5', icon: '🗺️', title: 'Roadmap Updated', body: 'Your education roadmap now reflects your latest profile.', time: 'Yesterday', screen: 'roadmap' },
  { id: 'n6', icon: '🔄', title: 'Additional Exploration Ready', body: 'A new exploration session is ready whenever you are.', time: '2 days ago', screen: 'assessment' },
  { id: 'n7', icon: '📈', title: 'Profile Becoming Clearer', body: 'Each session helps FutureMaster AI understand you better.', time: '3 days ago', screen: 'journey' },
];

export const drawerItems: Record<EducationLevel, Array<{ label: string; icon: string; screen: Screen }>> = {
  beginner: [
    { label: 'Home', icon: 'Home', screen: 'dashboard' },
    { label: 'Explore Careers', icon: 'Compass', screen: 'clusters' },
    { label: 'Activities', icon: 'ClipboardCheck', screen: 'activities' },
    { label: 'Career Videos', icon: 'PlayCircle', screen: 'videos' },
    { label: 'My Interests', icon: 'Sparkles', screen: 'interest-profile' },
    { label: 'My Journey', icon: 'TrendingUp', screen: 'journey' },
    { label: 'Profile', icon: 'User', screen: 'profile' },
  ],
  intermediate: [
    { label: 'Home', icon: 'Home', screen: 'dashboard' },
    { label: 'My Interests', icon: 'Sparkles', screen: 'interest-profile' },
    { label: 'Subject & Pathway Guidance', icon: 'BookOpen', screen: 'subject-guidance' },
    { label: 'Activities', icon: 'ClipboardCheck', screen: 'activities' },
    { label: 'Explore Careers', icon: 'Compass', screen: 'clusters' },
    { label: 'Career Videos', icon: 'PlayCircle', screen: 'videos' },
    { label: 'My Journey', icon: 'TrendingUp', screen: 'journey' },
    { label: 'Profile', icon: 'User', screen: 'profile' },
  ],
  advanced: [
    { label: 'Home', icon: 'Home', screen: 'dashboard' },
    { label: 'My Interests', icon: 'Sparkles', screen: 'interest-profile' },
    { label: 'Degree Explorer', icon: 'GraduationCap', screen: 'degree-explorer' },
    { label: 'Career Paths', icon: 'Compass', screen: 'clusters' },
    { label: 'Activities', icon: 'ClipboardCheck', screen: 'activities' },
    { label: 'Career Videos', icon: 'PlayCircle', screen: 'videos' },
    { label: 'Roadmap', icon: 'Route', screen: 'roadmap' },
    { label: 'My Journey', icon: 'TrendingUp', screen: 'journey' },
    { label: 'Profile', icon: 'User', screen: 'profile' },
  ],
};
