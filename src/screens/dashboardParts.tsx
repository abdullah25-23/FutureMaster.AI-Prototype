import { ReactNode } from 'react';
import { useApp } from '../state';
import { C, Card, Bar, SectionTitle, Pill, LockedBox, Chip } from '../components/ui';
import { dimensionMeta } from '../data/content';
import { clusters, clusterFit } from '../data/careers';

export const Section = ({ title, action, onAction, children, i = 0 }: { title: string; action?: string; onAction?: () => void; children: ReactNode; i?: number }) => (
  <section className="stagger" style={{ ['--i' as string]: i }}>
    <SectionTitle action={action} onAction={onAction}>{title}</SectionTitle>
    {children}
  </section>
);

export function ReadyBanner() {
  const { profileReady, nav, currentStageNeedsRefresh } = useApp();
  if (currentStageNeedsRefresh) return (
    <Card onClick={() => nav('assessment')} accent={C.cyan} style={{ borderColor: 'rgba(0,210,255,0.4)' }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: 14, fontFamily: 'Poppins' }}>Quick exploration update</p>
      <p style={{ margin: '4px 0 0', fontSize: 12, color: C.sub, lineHeight: 1.5 }}>Your previous profile has been preserved. Complete a short exploration update so FutureMaster AI can adapt your guidance to your new education stage.</p>
    </Card>
  );
  if (!profileReady) return null;
  return (
    <Card onClick={() => nav('clusters')} accent={C.success} style={{ background: 'linear-gradient(135deg,rgba(0,230,118,0.12),rgba(0,210,255,0.08))', borderColor: 'rgba(0,230,118,0.4)' }}>
      <div className="flex items-center" style={{ gap: 12 }}>
        <span style={{ fontSize: 22 }}>✅</span>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontWeight: 700, fontSize: 14, fontFamily: 'Poppins' }}>Your profile is ready</p>
          <p style={{ margin: '2px 0 0', fontSize: 12, color: C.sub }}>See career areas worth exploring</p>
        </div>
        <span style={{ color: C.cyan }}>→</span>
      </div>
    </Card>
  );
}

export function HeroCard({ eyebrow, title, text, cta }: { eyebrow: string; title: string; text: string; cta: string }) {
  const { nav } = useApp();
  return (
    <div className="stagger" style={{ ['--i' as string]: 0, borderRadius: 20, padding: 18, background: 'linear-gradient(135deg,#4F46E5,#7C3AED 60%,#0EA5E9)', boxShadow: '0 10px 30px rgba(99,102,241,0.35)' }}>
      <p style={{ margin: 0, fontSize: 11, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)' }}>{eyebrow}</p>
      <h3 style={{ margin: '6px 0 4px', fontSize: 19, fontWeight: 700 }}>{title}</h3>
      <p style={{ margin: '0 0 14px', fontSize: 13, color: 'rgba(255,255,255,0.88)', lineHeight: 1.5 }}>{text}</p>
      <button className="pressable" onClick={() => nav('assessment')} style={{ minHeight: 46, padding: '0 20px', borderRadius: 14, border: 'none', background: '#fff', color: '#4338CA', fontFamily: 'Poppins', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>{cta} →</button>
    </div>
  );
}

export function useSessionHero() {
  const { currentSession, sessionsCompleted, profileReady } = useApp();
  const extra = sessionsCompleted >= 3 && !profileReady;
  return extra ? 'Additional Exploration' : `Exploration Session ${currentSession}`;
}

export function InterestBars({ max, withPct }: { max: number; withPct?: boolean }) {
  const { topDims, questionsAnswered, nav } = useApp();
  if (questionsAnswered === 0) {
    return <Card onClick={() => nav('assessment')}><p style={{ margin: 0, fontSize: 13, color: C.sub, lineHeight: 1.5 }}>Your interests will show up here after your first few answers. Start exploring to see them.</p></Card>;
  }
  return (
    <Card onClick={() => nav('interest-profile')} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {topDims.slice(0, max).map((d, idx) => (
        <div key={d.key}>
          <div className="flex justify-between" style={{ marginBottom: 5 }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>{dimensionMeta[d.key].label}</span>
            {withPct && <span style={{ fontSize: 12, color: C.sub }}>{Math.round(d.value)}%</span>}
          </div>
          <Bar value={d.value} color={dimensionMeta[d.key].color} delay={idx * 120} />
        </div>
      ))}
    </Card>
  );
}

const generalIds = ['tech', 'health', 'design', 'business', 'engineering'];
export function ClusterPreview({ n = 3, withFit }: { n?: number; withFit?: boolean }) {
  const { dims, profileReady, nav } = useApp();
  const list = profileReady
    ? [...clusters].sort((a, b) => clusterFit(b, dims) - clusterFit(a, dims)).slice(0, n)
    : generalIds.map(id => clusters.find(c => c.id === id)).filter(Boolean).slice(0, n) as typeof clusters;
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {list.map((c, idx) => (
          <Card key={c.id} onClick={() => nav('clusters')} style={{ padding: 12 }}>
            <div className="flex items-center stagger" style={{ gap: 12, ['--i' as string]: idx }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: `${c.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{c.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{c.name}</p>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: C.sub, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.blurb}</p>
              </div>
              {profileReady && withFit && <Pill text={`${Math.round(clusterFit(c, dims))}%`} color={c.color} />}
            </div>
          </Card>
        ))}
      </div>
      {!profileReady && <div style={{ marginTop: 10 }}><LockedBox onCta={() => nav('assessment')} /></div>}
    </>
  );
}

export function ActivitiesPreview({ items }: { items: Array<{ icon: string; label: string }> }) {
  const { nav, completedActivities } = useApp();
  return (
    <div className="mobile-scroll-x" style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
      {items.map(a => (
        <Card key={a.label} onClick={() => nav('activities')} style={{ width: 128, flexShrink: 0, padding: 12 }}>
          <div style={{ fontSize: 24 }}>{a.icon}</div>
          <p style={{ margin: '8px 0 0', fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{a.label}</p>
        </Card>
      ))}
      <Card onClick={() => nav('activities')} style={{ width: 110, flexShrink: 0, padding: 12, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <p style={{ margin: 0, fontSize: 12, color: C.cyan, fontWeight: 600 }}>See all →</p>
        <p style={{ margin: '4px 0 0', fontSize: 11, color: C.sub }}>{completedActivities.length} done</p>
      </Card>
    </div>
  );
}

export function VideoCard({ title, text }: { title: string; text: string }) {
  const { nav } = useApp();
  return (
    <Card onClick={() => nav('videos')}>
      <div className="flex items-center" style={{ gap: 12 }}>
        <div style={{ width: 64, height: 48, borderRadius: 12, background: 'linear-gradient(135deg,#00D2FF,#6366F1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z" /></svg>
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{title}</p>
          <p style={{ margin: '2px 0 0', fontSize: 12, color: C.sub, lineHeight: 1.4 }}>{text}</p>
        </div>
      </div>
    </Card>
  );
}

export function ProgressCard({ label = 'Profile confidence', note }: { label?: string; note?: string }) {
  const { nav, sessionsCompleted, profileConfidence, questionsAnswered } = useApp();
  return (
    <Card onClick={() => nav('journey')}>
      <div className="flex justify-between" style={{ marginBottom: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 600 }}>{sessionsCompleted} session{sessionsCompleted === 1 ? '' : 's'} completed</span>
        <span style={{ fontSize: 12, color: C.sub }}>{questionsAnswered} answers</span>
      </div>
      <p style={{ margin: '0 0 6px', fontSize: 12, color: C.sub }}>{label}: {Math.round(profileConfidence)}%</p>
      <Bar value={profileConfidence} />
      {note && <p style={{ margin: '10px 0 0', fontSize: 12, color: C.sub, lineHeight: 1.5 }}>{note}</p>}
    </Card>
  );
}

export const ChipRow = ({ items, onClick, nested }: { items: string[]; onClick?: () => void; nested?: boolean }) => (
  <div className="flex flex-wrap" style={{ gap: 8 }}>{items.map(s => !nested ? <Chip key={s} label={s} onClick={onClick} /> : (
    <span key={s} style={{ minHeight: 40, display: 'inline-flex', alignItems: 'center', padding: '8px 14px', borderRadius: 12, fontFamily: 'Inter', fontSize: 13, fontWeight: 500, border: `1px solid ${C.border}`, background: C.card, color: C.sub }}>{s}</span>
  ))}</div>
);
