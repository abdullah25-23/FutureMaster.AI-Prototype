import { Ico } from '../components/Icon';
import { useApp } from '../state';
import { dimensionMeta } from '../data/content';
import { Bar, Btn, C, Card, LockedBox, Screen, SectionTitle } from '../components/ui';

export default function InterestProfileScreen() {
  const { dims, topDims, questionsAnswered, profileConfidence, profileReady, nav, back } = useApp();
  const empty = questionsAnswered === 0;
  const msg = profileConfidence >= 50 ? 'Your profile is becoming clearer.' : 'We are still getting to know you.';

  return (
    <Screen title="My Interests" subtitle="What you enjoy and prefer" onBack={back}>
      {empty && (
        <Card style={{ marginBottom: 16, textAlign: 'center' }}>
          <div style={{ color: C.success }}><Ico e="Sprout" size={34} /></div>
          <p style={{ margin: '8px 0 4px', fontFamily: 'Poppins', fontWeight: 700 }}>Your profile is just starting</p>
          <p style={{ margin: 0, fontSize: 13, color: C.sub, lineHeight: 1.5 }}>Answer a few exploration questions and your interests will begin to appear here.</p>
        </Card>
      )}

      <Card style={{ marginBottom: 16 }}>
        <p style={{ margin: 0, fontSize: 12, color: C.sub, fontWeight: 600 }}>Profile Confidence</p>
        <div className="flex items-end" style={{ gap: 8, margin: '4px 0 10px' }}>
          <span style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 36, lineHeight: 1 }}>{profileConfidence}%</span>
        </div>
        <Bar value={profileConfidence} color={C.cyan} height={10} />
        <p style={{ margin: '10px 0 0', fontSize: 13, color: C.sub }}>{msg}</p>
      </Card>

      <SectionTitle>Interest</SectionTitle>
      <Card style={{ marginBottom: 12 }}>
        {topDims.map(({ key }, i) => {
          const m = dimensionMeta[key]; const v = Math.round(dims[key]);
          return (
            <div key={key} className="stagger" style={{ '--i': i, marginBottom: i === topDims.length - 1 ? 0 : 14 } as React.CSSProperties}>
              <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{m.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: m.color }}>{v}%</span>
              </div>
              <Bar value={v} color={m.color} delay={i * 90} />
            </div>
          );
        })}
      </Card>

      <p style={{ margin: '0 0 6px', fontSize: 12, color: C.sub, lineHeight: 1.5 }}>These are interests and work preferences, not skills.</p>
      <p style={{ margin: '0 0 18px', fontSize: 12, color: C.muted, lineHeight: 1.5 }}>These results represent patterns observed during your exploration and may change as you continue.</p>

      <div className="flex flex-col" style={{ gap: 10 }}>
        <Btn onClick={() => nav('assessment')}>Continue Exploration</Btn>
        {profileReady ? <Btn variant="cyan" onClick={() => nav('clusters')}>Explore Career Areas</Btn> : <LockedBox />}
      </div>
    </Screen>
  );
}
