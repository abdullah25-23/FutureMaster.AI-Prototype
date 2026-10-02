export type EducationLevel = 'beginner' | 'intermediate' | 'advanced';

export type Screen =
  | 'splash' | 'login' | 'signup' | 'level' | 'setup' | 'intro'
  | 'assessment' | 'session-result' | 'interest-profile' | 'dashboard'
  | 'activities' | 'activity-detail' | 'journey'
  | 'clusters' | 'career-list' | 'why-career' | 'career-details' | 'readiness'
  | 'subject-guidance' | 'degree-explorer' | 'roadmap'
  | 'videos' | 'video-feedback' | 'profile' | 'notifications' | 'stage-transition';

export interface NavParams {
  clusterId?: string;
  careerId?: string;
  activityId?: string;
  videoId?: string;
}

export interface StudentProfile {
  name: string;
  email: string;
  educationLevel: EducationLevel | null;
  currentClass: string;
  age: string;
  schoolName: string;
  studyGroup: string;
  favouriteSubjects: string[];
  difficultSubjects: string[];
  subjectMarks: Record<string, string>;
  overallPercentage: string;
  futureIdeas: '' | 'yes' | 'unsure' | 'not-yet';
  futureFields: string[];
  activities: string[];
  careerGoal: string;
}

export type DimensionKey =
  | 'analyticalThinking' | 'technologyInterest' | 'creativity' | 'helpingPeople'
  | 'leadership' | 'communication' | 'handsOnWork' | 'researchInterest' | 'businessInterest';

export type InterestDimensions = Record<DimensionKey, number>;

export interface Cluster {
  id: string;
  name: string;
  icon: string;
  color: string;
  blurb: string;
  careerIds: string[];
  weights: Partial<Record<DimensionKey, number>>;
}

export type Fit = 'Strong' | 'Good' | 'Emerging';
export type Readiness = 'On Track' | 'Building' | 'Needs Improvement';

export interface QuestionOption {
  id: string;
  label: string;
  effects: Partial<Record<DimensionKey, number>>;
  tag?: string;
}
