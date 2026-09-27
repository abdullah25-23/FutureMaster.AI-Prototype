export type EducationModule = 'class6_8' | 'class9_10' | 'class11_12' | 'university';

export type Screen =
  | 'splash'
  | 'login'
  | 'signup'
  | 'education'
  | 'profile-setup'
  | 'class68-dashboard'
  | 'class910-dashboard'
  | 'class1112-dashboard'
  | 'university-dashboard'
  | 'assessment'
  | 'interest-profile'
  | 'career-clusters'
  | 'career-details'
  | 'roadmap'
  | 'videos'
  | 'profile'
  | 'notifications'
  | 'degree-explorer'
  | 'skills'
  | 'skill-gap'
  | 'subject-guidance';

export interface StudentProfile {
  name: string;
  email: string;
  currentClass: string;
  age: string;
  schoolName: string;
  studyGroup: string;
  favouriteSubjects: string[];
  activities: string[];
  skills: string[];
  semester: string;
  university: string;
  degree: string;
  technologies: string[];
  careerGoal: string;
}

export interface InterestDimensions {
  analyticalThinking: number;
  technologyInterest: number;
  creativity: number;
  helpingPeople: number;
  leadership: number;
  communication: number;
  handsOnWork: number;
  researchInterest: number;
  businessInterest: number;
}

export interface ExplorationProgress {
  questionsAnswered: number;
  profileConfidence: number;
  interestDimensions: InterestDimensions;
}
