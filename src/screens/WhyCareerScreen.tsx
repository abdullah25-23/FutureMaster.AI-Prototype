import { Ico } from '../components/Icon';
import { useApp } from '../state';
import { Btn, Card, C, Screen } from '../components/ui';
import { careerById, careers } from '../data/careers';

export default function WhyCareerScreen() {
  const { params, nav, profileReady } = useApp();
  const career = careerById(params.careerId ?? '') ?? careers[0];

  return (
    <Screen title="Why this career appeared" footer={<Btn onClick={() => nav('career-details', { careerId: career.id, clusterId: career.clusterId })}>See Career Details</Btn>}>
      <div className="fade-down flex items-center" style={{ gap: 12, marginBottom: 18 }}>
        <div style={{ width: 52, height: 52, borderRadius: 16, background: 'rgba(99,102,241,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.indigo }}><Ico e={career.icon} size={26} /></div>
        <div>
          <h3 style={{ margin: 0, fontSize: 18 }}>{career.name}</h3>
          <p style={{ margin: '2px 0 0', fontSize: 12, color: C.sub }}>Here is what pointed us here</p>
        </div>
      </div>

      <Card>
        {career.reasons.map((r, i) => (
          <div key={i} className="stagger flex items-start" style={{ '--i': i, gap: 10, padding: '10px 0', borderBottom: i < career.reasons.length - 1 ? `1px solid ${C.border}` : 'none' } as React.CSSProperties}>
            <span style={{ width: 22, height: 22, borderRadius: 11, background: 'rgba(0,230,118,0.15)', color: C.success, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>✓</span>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5 }}>{r}</p>
          </div>
        ))}
      </Card>

      {career.lessEvidence && (
        <div className="stagger" style={{ '--i': 5, marginTop: 14 } as React.CSSProperties}>
          <Card style={{ background: '#171B2B', borderStyle: 'dashed' }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>Less evidence currently</p>
            <p style={{ margin: '4px 0 0', fontSize: 12, color: C.sub, lineHeight: 1.5 }}>{career.lessEvidence} This is not a reason to rule the career out. It just means we are still learning more about you.</p>
          </Card>
        </div>
      )}

      {!profileReady && (
        <p className="stagger" style={{ '--i': 6, marginTop: 14, fontSize: 12, color: C.sub, lineHeight: 1.5 } as React.CSSProperties}>
          These are early signals from your exploration so far. They will become clearer as you complete more sessions.
        </p>
      )}
    </Screen>
  );
}
