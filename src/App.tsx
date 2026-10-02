import { AppProvider, useApp } from './state';
import MobileFrame from './components/MobileFrame';
import { LoadingOverlay } from './components/ui';
import { Screen } from './types';
import { ComponentType } from 'react';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import LevelScreen from './screens/LevelScreen';
import SetupScreen from './screens/SetupScreen';
import IntroScreen from './screens/IntroScreen';
import AssessmentScreen from './screens/AssessmentScreen';
import SessionResultScreen from './screens/SessionResultScreen';
import InterestProfileScreen from './screens/InterestProfileScreen';
import DashboardScreen from './screens/DashboardScreen';
import ActivitiesScreen from './screens/ActivitiesScreen';
import ActivityDetailScreen from './screens/ActivityDetailScreen';
import JourneyScreen from './screens/JourneyScreen';
import ClustersScreen from './screens/ClustersScreen';
import CareerListScreen from './screens/CareerListScreen';
import WhyCareerScreen from './screens/WhyCareerScreen';
import CareerDetailsScreen from './screens/CareerDetailsScreen';
import ReadinessScreen from './screens/ReadinessScreen';
import SubjectGuidanceScreen from './screens/SubjectGuidanceScreen';
import DegreeExplorerScreen from './screens/DegreeExplorerScreen';
import RoadmapScreen from './screens/RoadmapScreen';
import VideosScreen from './screens/VideosScreen';
import VideoFeedbackScreen from './screens/VideoFeedbackScreen';
import ProfileScreen from './screens/ProfileScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import StageTransitionScreen from './screens/StageTransitionScreen';

const screens: Record<Screen, ComponentType> = {
  splash: SplashScreen, login: LoginScreen, signup: SignupScreen, level: LevelScreen, setup: SetupScreen, intro: IntroScreen,
  assessment: AssessmentScreen, 'session-result': SessionResultScreen, 'interest-profile': InterestProfileScreen, dashboard: DashboardScreen,
  activities: ActivitiesScreen, 'activity-detail': ActivityDetailScreen, journey: JourneyScreen,
  clusters: ClustersScreen, 'career-list': CareerListScreen, 'why-career': WhyCareerScreen, 'career-details': CareerDetailsScreen,
  readiness: ReadinessScreen, 'subject-guidance': SubjectGuidanceScreen, 'degree-explorer': DegreeExplorerScreen, roadmap: RoadmapScreen,
  videos: VideosScreen, 'video-feedback': VideoFeedbackScreen, profile: ProfileScreen, notifications: NotificationsScreen, 'stage-transition': StageTransitionScreen,
};

function Router() {
  const { screen, params, loading } = useApp();
  const Current = screens[screen];
  return (
    <>
      <div className="screen-enter w-full h-full" key={screen + JSON.stringify(params)}><Current /></div>
      {loading && <LoadingOverlay message={loading} />}
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MobileFrame><Router /></MobileFrame>
    </AppProvider>
  );
}
