import { useApp } from '../state';
import DashboardShell, { FactCard } from '../components/DashboardShell';
import { Card, C } from '../components/ui';
import { beginnerActivities } from '../data/content';
import { Section, ReadyBanner, HeroCard, useSessionHero, InterestBars, ClusterPreview, ActivitiesPreview, VideoCard, ProgressCard, ChipRow } from './dashboardParts';

const dimSubjects: Record<string, string[]> = {
  analyticalThinking: ['Mathematics', 'Physics'], technologyInterest: ['Computer Science', 'Mathematics'],
  creativity: ['Arts / Humanities', 'English'], helpingPeople: ['Biology', 'Urdu'], leadership: ['Pakistan Studies', 'English'],
  communication: ['English', 'Urdu'], handsOnWork: ['Physics', 'Chemistry'], researchInterest: ['Chemistry', 'Biology'], businessInterest: ['Mathematics', 'English'],
};

export default function IntermediateDashboard() {
  const { nav, profile, topDims, questionsAnswered, profileReady } = useApp();
  const eyebrow = useSessionHero();
  const subjects = Array.from(new Set([
    ...profile.favouriteSubjects,
    ...(questionsAnswered > 0 ? topDims.slice(0, 2).flatMap(d => dimSubjects[d.key]) : []),
  ])).slice(0, 6);
  return (
    <DashboardShell greetingSub={profileReady ? 'Your profile is ready to explore' : 'Understanding your interests and subjects'}>
      <ReadyBanner />
      <HeroCard eyebrow={eyebrow} title="Continue Exploration" text="Each session sharpens your interest profile and the guidance built on it." cta="Continue Exploration" />
      <Section i={1} title="Strongest Interests" action="See all" onAction={() => nav('interest-profile')}><InterestBars max={4} /></Section>
      <Section i={2} title="Subject Guidance" action="Open" onAction={() => nav('subject-guidance')}>
        <Card onClick={() => nav('subject-guidance')}>
          <p style={{ margin: 0, fontSize: 13, color: C.sub, lineHeight: 1.5 }}>{profile.studyGroup ? `Study group: ${profile.studyGroup}. ` : ''}See which subjects connect with your interests and what to consider next.</p>
          {subjects.length > 0 && <>
            <p style={{ margin: '12px 0 8px', fontSize: 12, fontWeight: 600 }}>Subjects Worth Exploring</p>
            <ChipRow items={subjects} onClick={() => nav('subject-guidance')} />
          </>}
        </Card>
      </Section>
      <Section i={3} title="Career Areas" action="See all" onAction={() => nav('clusters')}><ClusterPreview n={3} withFit /></Section>
      <Section i={4} title="Activities" action="See all" onAction={() => nav('activities')}><ActivitiesPreview items={beginnerActivities.slice(0, 4)} /></Section>
      <Section i={5} title="Career Videos" action="More" onAction={() => nav('videos')}><VideoCard title="Careers connected to your interests" text="Short videos selected from your profile." /></Section>
      <FactCard />
      <Section i={6} title="Progress" action="Open" onAction={() => nav('journey')}><ProgressCard /></Section>
    </DashboardShell>
  );
}
