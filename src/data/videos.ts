export interface Video {
  id: string; title: string; area: string; thumb: string; duration: string;
  section: 'interests' | 'related' | 'new'; description: string; clusterId?: string;
}

export const videoSections: { key: Video['section']; title: string }[] = [
  { key: 'interests', title: 'Based on Your Interests' },
  { key: 'related', title: 'Related Areas' },
  { key: 'new', title: 'Explore Something New' },
];

export const videos: Video[] = [
  { id: 'v-tech', title: 'A Day in Software Development', area: 'Technology & Computing', thumb: '💻', duration: '3:20', section: 'interests', clusterId: 'tech', description: 'A look at the kinds of tasks people in software teams work on, from planning to testing.' },
  { id: 'v-eng', title: 'How Engineers Build Things', area: 'Engineering & Robotics', thumb: '⚙️', duration: '4:05', section: 'interests', clusterId: 'engineering', description: 'An overview of how engineers plan, test and improve designs.' },
  { id: 'v-data', title: 'Finding Patterns in Data', area: 'Research & Data', thumb: '📊', duration: '3:45', section: 'interests', clusterId: 'research', description: 'See how researchers ask questions and look for patterns in information.' },
  { id: 'v-health', title: 'Inside a Healthcare Team', area: 'Medical & Health Sciences', thumb: '🩺', duration: '4:10', section: 'related', clusterId: 'health', description: 'Different roles that work together to support people\'s health.' },
  { id: 'v-business', title: 'Starting and Running a Small Business', area: 'Business & Management', thumb: '📈', duration: '3:30', section: 'related', clusterId: 'business', description: 'A simple introduction to planning, selling and managing a team.' },
  { id: 'v-design', title: 'From Sketch to Finished Design', area: 'Arts & Design', thumb: '🎨', duration: '3:15', section: 'related', clusterId: 'design', description: 'How designers move from first ideas to a finished piece.' },
  { id: 'v-agri', title: 'Caring for Land and Environment', area: 'Agriculture & Environment', thumb: '🌱', duration: '3:50', section: 'new', clusterId: 'agri', description: 'An introduction to work that looks after crops, water and nature.' },
  { id: 'v-aviation', title: 'Behind the Scenes at an Airport', area: 'Aviation & Hospitality', thumb: '✈️', duration: '4:00', section: 'new', clusterId: 'aviation', description: 'The many roles that keep travel and guest services running.' },
  { id: 'v-media', title: 'Telling Stories Through Media', area: 'Media & Communication', thumb: '🎬', duration: '3:25', section: 'new', clusterId: 'media', description: 'How people plan, create and share stories with an audience.' },
];

export const ratingLabels: Record<number, string> = { 1: 'Not for me', 2: 'Slightly interesting', 3: 'Interesting', 4: 'Very interesting' };
