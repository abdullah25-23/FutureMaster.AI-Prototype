import { useApp } from '../state';
import { Btn, Card, C, Chip, Pill, Screen, SectionTitle } from '../components/ui';
import { careerAlignment, careerById, careers, degrees, fitColor, fitLabel, readinessColor, readinessFor } from '../data/careers';

export default function CareerDetailsScreen() {
  const { params, nav, loadNav, profile, level, dims, profileReady, savedCareers, toggleCareer } = useApp();
  const career = careerById(params.careerId ?? '') ?? careers[0];
  const saved = savedCareers.includes(career.id);
  const fit = fitLabel(careerAlignment(career, dims));
  const r = readinessFor(career, profile, level ?? 'beginner');
  const related = career.degrees.map(id => degrees.find(d => d.id === id)).filter((d): d is NonNullable<typeof d> => !!d);

  const mini = (title: string, label: string, color: string, note: string) => (
    <Card style={{ flex: 1, padding: 14 }}>
      <p style={{ margin: 0, fontSize: 11, color: C.sub, fontWeight: 600 }}>{title}</p>
      <div style={{ margin: '8px 0' }}><Pill text={label} color={color} /></div>
      <p style={{ margin: 0, fontSize: 11, color: C.sub, lineHeight: 1.4 }}>{note}</p>
    </Card>
  );

  return (
    <Screen title="Career Details" footer={
      <div className="flex flex-col" style={{ gap: 8 }}>
        <Btn onClick={() => nav('readiness', { careerId: career.id })}>Check Academic Readiness</Btn>
        <Btn variant="ghost" onClick={() => loadNav('Building your roadmap...', 'roadmap', { careerId: career.id })}>View Roadmap</Btn>
      </div>
    }>
      <div className="fade-down" style={{ textAlign: 'center', padding: '8px 0 18px' }}>
        <div style={{ width: 72, height: 72, margin: '0 auto', borderRadius: 22, background: 'linear-gradient(135deg,rgba(99,102,241,.3),rgba(0,210,255,.2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>{career.icon}</div>
        <h2 style={{ margin: '12px 0 4px', fontSize: 22 }}>{career.name}</h2>
        <p style={{ margin: 0, fontSize: 13, color: C.sub, lineHeight: 1.5 }}>{career.whatTheyDo}</p>
        <button className="pressable" onClick={() => toggleCareer(career.id)} aria-pressed={saved} style={{ marginTop: 12, minHeight: 44, padding: '0 18px', borderRadius: 12, cursor: 'pointer', background: saved ? 'rgba(0,210,255,0.12)' : C.card, border: `1px solid ${saved ? C.cyan : C.border}`, color: saved ? C.cyan : C.text, fontWeight: 600, fontSize: 13 }}>
          {saved ? '★ Saved' : '☆ Save career'}
        </button>
      </div>

      <div className="flex stagger" style={{ gap: 10, marginBottom: 18, '--i': 0 } as React.CSSProperties}>
        {mini('Interest Match', profileReady ? `${fit} fit` : 'Early signal', profileReady ? fitColor(fit) : C.sub, 'Based on what you enjoy')}
        {mini('Academic Readiness', r.readiness, readinessColor(r.readiness), 'Based on your studies')}
      </div>

      <div className="stagger" style={{ '--i': 1, marginBottom: 18 } as React.CSSProperties}>
        <SectionTitle>A day in this career</SectionTitle>
        <Card>
          {career.dayToDay.map(d => (
            <p key={d} style={{ margin: '0 0 6px', fontSize: 13, color: C.sub, lineHeight: 1.5 }}><span style={{ color: C.cyan }}>• </span>{d}</p>
          ))}
        </Card>
      </div>

      <div className="stagger" style={{ '--i': 2, marginBottom: 18 } as React.CSSProperties}>
        <SectionTitle>Relevant subjects</SectionTitle>
        <div className="flex flex-wrap" style={{ gap: 8 }}>{career.subjects.map(s => <Chip key={s} label={s} />)}</div>
      </div>

      <div className="stagger" style={{ '--i': 3 } as React.CSSProperties}>
        <SectionTitle>Related degrees</SectionTitle>
        <div className="flex flex-wrap" style={{ gap: 8 }}>{related.map(d => <Chip key={d.id} label={d.name} />)}</div>
      </div>
    </Screen>
  );
}
