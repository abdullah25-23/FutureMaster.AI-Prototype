import { useApp } from '../state';
import DashboardShell, { FactCard } from '../components/DashboardShell';
import { beginnerActivities } from '../data/content';
import { Section, ReadyBanner, HeroCard, useSessionHero, InterestBars, ClusterPreview, ActivitiesPreview, VideoCard, ProgressCard } from './dashboardParts';

export default function BeginnerDashboard() {
  const { nav, profileReady, questionsAnswered } = useApp();
  const eyebrow = useSessionHero();
  return (
    <DashboardShell greetingSub={profileReady ? 'Your profile is ready to explore' : "Let's discover what you enjoy"}>
      <ReadyBanner />
      <HeroCard eyebrow={eyebrow} title="Today's Exploration" text={questionsAnswered > 0 ? 'Answer a few more fun questions to learn more about your interests.' : 'Answer a few fun questions to start finding what you enjoy.'} cta="Continue Exploration" />
      <Section i={1} title="Strongest Interests" action="See all" onAction={() => nav('interest-profile')}><InterestBars max={3} /></Section>
      <Section i={2} title="Activities" action="See all" onAction={() => nav('activities')}><ActivitiesPreview items={beginnerActivities.slice(0, 4)} /></Section>
      <Section i={3} title="Explore Careers" action="See all" onAction={() => nav('clusters')}><ClusterPreview n={3} /></Section>
      <Section i={4} title="Career Video" action="More" onAction={() => nav('videos')}><VideoCard title="A day in a career you might enjoy" text="Watch a short video and tell us what you think." /></Section>
      <FactCard />
      <Section i={5} title="My Journey" action="Open" onAction={() => nav('journey')}><ProgressCard label="Profile confidence" /></Section>
    </DashboardShell>
  );
}
