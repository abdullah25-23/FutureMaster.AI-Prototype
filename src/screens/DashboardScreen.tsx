import { useApp } from '../state';
import BeginnerDashboard from './BeginnerDashboard';
import IntermediateDashboard from './IntermediateDashboard';
import AdvancedDashboard from './AdvancedDashboard';

export default function DashboardScreen() {
  const { level } = useApp();
  if (level === 'advanced') return <AdvancedDashboard />;
  if (level === 'intermediate') return <IntermediateDashboard />;
  return <BeginnerDashboard />;
}
