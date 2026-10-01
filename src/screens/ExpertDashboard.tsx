import { useApp } from '../state';
import DashboardShell, { FactCard } from '../components/DashboardShell';
import { Card, Bar, Pill, C } from '../components/ui';
import { beginnerActivities } from '../data/content';
import { degrees, profileReadiness } from '../data/careers';
import { Section, ReadyBanner, HeroCard, useSessionHero, InterestBars, ClusterPreview, ActivitiesPreview, VideoCard, ChipRow } from './dashboardParts';

export default function ExpertDashboard() {
  const { nav, profile, profileReady, sessionsCompleted, profileConfidence, questionsAnswered } = useApp();
  const eyebrow = useSessionHero();
  const readiness = profileReadiness(profile);
  const cats = Array.from(new Set(degrees.map(d => d.category))).slice(0, 8);
  const rColor = readiness === 'On Track' ? C.success : readiness === 'Building' ? C.warning : C.error;
  return (
    <DashboardShell greetingSub={profileReady ? 'Profile ready: review career areas and degree fields' : 'Building your interest profile'}>
      <ReadyBanner />
      <HeroCard eyebrow={eyebrow} title="Exploration Progress" text="Further sessions refine the confidence of your interest profile." cta="Continue Exploration" />
      <Section i={1} title="Exploration Progress" action="Details" onAction={() => nav('journey')}>
        <Card onClick={() => nav('journey')}>
          <div className="flex justify-between" style={{ marginBottom: 10 }}>
            <Stat v={String(sessionsCompleted)} l="Sessions" /><Stat v={String(questionsAnswered)} l="Questions answered" /><Stat v={`${Math.round(profileConfidence)}%`} l="Confidence" />
          </div>
          <Bar value={profileConfidence} />
        </Card>
      </Section>
      <Section i={2} title="Current Interest Profile" action="See all" onAction={() => nav('interest-profile')}><InterestBars max={4} withPct /></Section>
      <Section i={3} title="Career Areas" action="See all" onAction={() => nav('clusters')}><ClusterPreview n={3} withFit /></Section>
      <Section i={4} title="Degree Fields" action="Explore" onAction={() => nav('degree-explorer')}><ChipRow items={cats} onClick={() => nav('degree-explorer')} /></Section>
      <Section i={5} title="Academic Readiness Summary" action="Roadmap" onAction={() => nav('roadmap')}>
        <Card onClick={() => nav(profileReady ? 'roadmap' : 'clusters')}>
          <div className="flex items-center justify-between"><span style={{ fontSize: 13, fontWeight: 600 }}>{profile.studyGroup || 'Study group not set'}</span><Pill text={readiness} color={rColor} /></div>
          <p style={{ margin: '8px 0 0', fontSize: 12, color: C.sub, lineHeight: 1.5 }}>
            {profile.overallPercentage ? `Overall result: ${profile.overallPercentage}%. ` : ''}Academic readiness reflects your marks and is separate from interest: a strong interest can be pursued with focused preparation.
          </p>
        </Card>
      </Section>
      <Section i={6} title="Activities" action="See all" onAction={() => nav('activities')}><ActivitiesPreview items={beginnerActivities.slice(0, 4)} /></Section>
      <Section i={7} title="Education Roadmap" action="Open" onAction={() => nav('roadmap')}>
        <Card onClick={() => nav('roadmap')}><p style={{ margin: 0, fontSize: 13, color: C.sub, lineHeight: 1.5 }}>Common education routes from your current study group, with possible next steps to consider.</p></Card>
      </Section>
      <Section i={8} title="Career Videos" action="More" onAction={() => nav('videos')}><VideoCard title="Career paths in focus" text="Short videos matched to your interest profile." /></Section>
      <FactCard />
    </DashboardShell>
  );
}

const Stat = ({ v, l }: { v: string; l: string }) => (
  <div><p style={{ margin: 0, fontSize: 20, fontWeight: 700, fontFamily: 'Poppins' }}>{v}</p><p style={{ margin: 0, fontSize: 11, color: C.sub }}>{l}</p></div>
);
