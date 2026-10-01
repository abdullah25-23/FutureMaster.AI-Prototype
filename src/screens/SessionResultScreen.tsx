import { useApp, MIN_SESSIONS } from '../state';
import { Bar, Btn, C, Card, CheckAnim, Screen } from '../components/ui';
import { dimensionMeta } from '../data/content';

export default function SessionResultScreen() {
  const { sessionsCompleted: n, topDims, profileConfidence, profileReady, nav, go, loadNav } = useApp();
  const checkpoint = n >= MIN_SESSIONS;
  const title = n > MIN_SESSIONS ? `Additional Exploration ${n} complete` : `Exploration Session ${n} complete`;

  return (
    <Screen noBack title="" footer={
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {checkpoint && profileReady
          ? <Btn variant="cyan" onClick={() => loadNav('Finding career areas worth exploring...', 'clusters')}>Explore Career Areas</Btn>
          : checkpoint
          ? <Btn onClick={() => loadNav('Preparing your next exploration...', 'assessment')}>Continue Exploring</Btn>
          : <Btn onClick={() => nav('interest-profile')}>{n === 1 ? 'See My Interest Profile' : 'View My Interest Profile'}</Btn>}
        <Btn variant="ghost" small onClick={() => go('dashboard')}>Go to Dashboard</Btn>
      </div>}>
      <div style={{ paddingTop: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <CheckAnim size={76} />
        <h1 style={{ margin: '18px 0 6px', fontSize: 22 }}>{title}</h1>
        <p style={{ margin: 0, fontSize: 14, color: C.sub, lineHeight: 1.5 }}>
          {n === 1 ? 'Here is a first look at your Interest Profile (V1). It will become clearer as you keep exploring.' : checkpoint ? 'Readiness check' : 'Your profile just got a little clearer.'}
        </p>
      </div>

      {checkpoint ? (
        <Card style={{ marginTop: 24, borderColor: profileReady ? C.success : C.warning }}>
          <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: profileReady ? C.success : C.warning, textTransform: 'uppercase', letterSpacing: 0.8 }}>{profileReady ? '✓ Profile ready' : 'A few areas still unclear'}</p>
          <p style={{ margin: '8px 0 0', fontSize: 14, lineHeight: 1.55 }}>
            {profileReady ? 'Your profile is clear enough to begin exploring personalized career recommendations.' : "We've learned a lot, but a few areas are still unclear."}
          </p>
          {!profileReady && <p style={{ margin: '8px 0 0', fontSize: 12, color: C.sub }}>Another short round will help. There is no fixed limit; we simply continue until your profile is clear.</p>}
        </Card>
      ) : (
        <p style={{ margin: '20px 4px 0', fontSize: 12, color: C.muted, textAlign: 'center' }}>You'll complete at least 3 short exploration sessions.</p>
      )}

      <Card style={{ marginTop: 18 }}>
        <p style={{ margin: '0 0 12px', fontFamily: 'Poppins', fontWeight: 700, fontSize: 14 }}>{n === 1 ? 'Interest Profile V1' : 'Strongest interests so far'}</p>
        {topDims.slice(0, 3).map((d, i) => (
          <div key={d.key} style={{ marginBottom: 12 }}>
            <div className="flex justify-between" style={{ fontSize: 13, marginBottom: 6 }}><span>{dimensionMeta[d.key].label}</span><span style={{ color: C.sub }}>{d.value}%</span></div>
            <Bar value={d.value} color={dimensionMeta[d.key].color} delay={i * 120} />
          </div>
        ))}
        <div className="flex justify-between" style={{ fontSize: 13, margin: '16px 0 6px' }}><span>Profile Confidence</span><span style={{ color: C.sub }}>{profileConfidence}%</span></div>
        <Bar value={profileConfidence} color={C.indigo} delay={400} />
      </Card>
    </Screen>
  );
}
