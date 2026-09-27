import { useState } from 'react';
import { Screen, EducationModule, StudentProfile, ExplorationProgress } from './types';
import MobileFrame from './components/MobileFrame';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import EducationScreen from './screens/EducationScreen';
import ProfileSetupScreen from './screens/OnboardingScreen';
import Class68Dashboard from './screens/JuniorDashboard';
import Class910Dashboard from './screens/SeniorDashboard';
import Class1112Dashboard from './screens/Class1112Dashboard';
import UniversityDashboard from './screens/UniversityDashboard';
import AssessmentScreen from './screens/AssessmentScreen';
import InterestProfileScreen from './screens/ResultsScreen';
import CareerClustersScreen from './screens/CareerClustersScreen';
import CareerDetailsScreen from './screens/CareerDetailsScreen';
import RoadmapScreen from './screens/RoadmapScreen';
import VideosScreen from './screens/VideosScreen';
import ProfileScreen from './screens/ProfileScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import DegreeExplorerScreen from './screens/DegreeExplorerScreen';
import SkillsScreen from './screens/SkillsScreen';
import SkillGapScreen from './screens/SkillGapScreen';
import SubjectGuidanceScreen from './screens/SubjectGuidanceScreen';

const defaultProfile: StudentProfile = {
  name: 'Alex Hassan', email: '', currentClass: '',
  age: '', schoolName: '', studyGroup: '',
  favouriteSubjects: [], activities: [],
  skills: [], semester: '4th', university: '',
  degree: 'BS Computer Science', technologies: ['Python', 'SQL', 'Flutter', 'Git'],
  careerGoal: '',
};

const defaultProgress: ExplorationProgress = {
  questionsAnswered: 7,
  profileConfidence: 42,
  interestDimensions: {
    analyticalThinking: 82,
    technologyInterest: 77,
    creativity: 45,
    helpingPeople: 38,
    leadership: 52,
    communication: 61,
    handsOnWork: 49,
    researchInterest: 71,
    businessInterest: 33,
  },
};

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [educationModule, setEducationModule] = useState<EducationModule | null>('class9_10');
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(defaultProfile);
  const [explorationProgress] = useState<ExplorationProgress>(defaultProgress);

  function navigate(s: Screen) {
    setScreen(s);
  }

  function updateStudentProfile(partial: Partial<StudentProfile>) {
    setStudentProfile(prev => ({ ...prev, ...partial }));
  }

  const sharedProps = { navigate, educationModule, studentProfile, explorationProgress };

  function renderScreen() {
    switch (screen) {
      case 'splash':
        return <SplashScreen navigate={navigate} />;
      case 'login':
        return <LoginScreen navigate={navigate} />;
      case 'signup':
        return <SignupScreen navigate={navigate} />;
      case 'education':
        return <EducationScreen navigate={navigate} setEducationModule={setEducationModule} />;
      case 'profile-setup':
        return <ProfileSetupScreen navigate={navigate} educationModule={educationModule} updateStudentProfile={updateStudentProfile} />;
      case 'class68-dashboard':
        return <Class68Dashboard {...sharedProps} />;
      case 'class910-dashboard':
        return <Class910Dashboard {...sharedProps} />;
      case 'class1112-dashboard':
        return <Class1112Dashboard {...sharedProps} />;
      case 'university-dashboard':
        return <UniversityDashboard {...sharedProps} />;
      case 'assessment':
        return <AssessmentScreen navigate={navigate} educationModule={educationModule} explorationProgress={explorationProgress} />;
      case 'interest-profile':
        return <InterestProfileScreen navigate={navigate} explorationProgress={explorationProgress} educationModule={educationModule} />;
      case 'career-clusters':
        return <CareerClustersScreen navigate={navigate} educationModule={educationModule} />;
      case 'career-details':
        return <CareerDetailsScreen navigate={navigate} educationModule={educationModule} />;
      case 'roadmap':
        return <RoadmapScreen navigate={navigate} educationModule={educationModule} />;
      case 'videos':
        return <VideosScreen navigate={navigate} educationModule={educationModule} />;
      case 'profile':
        return <ProfileScreen navigate={navigate} educationModule={educationModule} studentProfile={studentProfile} explorationProgress={explorationProgress} />;
      case 'notifications':
        return <NotificationsScreen navigate={navigate} educationModule={educationModule} />;
      case 'degree-explorer':
        return <DegreeExplorerScreen navigate={navigate} />;
      case 'skills':
        return <SkillsScreen navigate={navigate} />;
      case 'skill-gap':
        return <SkillGapScreen navigate={navigate} />;
      case 'subject-guidance':
        return <SubjectGuidanceScreen navigate={navigate} />;
      default:
        return <SplashScreen navigate={navigate} />;
    }
  }

  return (
    <MobileFrame>
      <div className="screen-enter w-full h-full" key={screen}>
        {renderScreen()}
      </div>
    </MobileFrame>
  );
}
