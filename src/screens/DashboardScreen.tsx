import { useApp } from '../state';
import BeginnerDashboard from './BeginnerDashboard';
import IntermediateDashboard from './IntermediateDashboard';
import ExpertDashboard from './ExpertDashboard';

export default function DashboardScreen() {
  const { level } = useApp();
  if (level === 'expert') return <ExpertDashboard />;
  if (level === 'intermediate') return <IntermediateDashboard />;
  return <BeginnerDashboard />;
}
