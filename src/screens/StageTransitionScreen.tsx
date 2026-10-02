import { useApp } from '../state';
import { Btn, C, Card, Screen } from '../components/ui';
import { levelMeta } from '../data/content';
import { EducationLevel } from '../types';

const copy: Partial<Record<EducationLevel, {
  kicker: string; title: string; body: string; kept: string[]; learning: string[]; learnTitle: string;
}>> = {
  beginner: {
    kicker: 'WELCOME TO YOUR NEXT STAGE', title: "You're now entering the Intermediate level.",
    body: "We've kept what we've already learned about your interests. From here, FutureMaster AI will also consider your subjects, academic performance and future study pathways.",
    kept: ['Interest Profile', 'Exploration History', 'Completed Activities', 'Career Areas Explored', 'Previous Responses'],
    learnTitle: "WHAT WE'LL START LEARNING", learning: ['Study Group', 'Favourite Subjects', 'Difficult Subjects', 'Academic Performance', 'Possible Future Fields'],
  },
  intermediate: {
    kicker: 'WELCOME TO THE ADVANCED LEVEL', title: "You're moving closer to important degree and career decisions.",
    body: "We'll keep your previous FutureMaster journey and begin adding more detailed academic, degree and career guidance.",
    kept: ['Interest Profile', 'Exploration History', 'Completed Activities', 'Career Areas Explored', 'Saved Careers', 'Previous Responses'],
    learnTitle: "WHAT WE'LL START ADDING", learning: ['Intermediate study group history', 'Current study group', 'Academic performance', 'Degree interests', 'Career pathway interests', 'Academic Readiness'],
  },
};

const Mini = ({ label, text, sub, color }: { label: string; text: string; sub: string; color: string }) => (
  <Card style={{ flex: 1, padding: 14, borderColor: `${color}55` }}>
    <p style={{ margin: 0, fontSize: 10, fontWeight: 700, letterSpacing: 0.8, color: C.muted }}>{label}</p>
    <p style={{ margin: '6px 0 0', fontFamily: 'Poppins', fontWeight: 700, fontSize: 15, color }}>{text}</p>
    <p style={{ margin: '2px 0 0', fontSize: 11, color: C.sub }}>{sub}</p>
  </Card>
);

export default function StageTransitionScreen() {
  const { transitionFrom, level, go } = useApp();
  const from = transitionFrom ?? 'beginner';
  const c = copy[from] ?? copy.beginner!;
  const prev = levelMeta[from]; const cur = levelMeta[level ?? 'intermediate'];
  const List = ({ items, mark, color }: { items: string[]; mark: string; color: string }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {items.map((x, i) => (
        <div key={x} className="stagger flex items-center" style={{ gap: 10, '--i': i } as React.CSSProperties}>
          <span style={{ color, fontWeight: 700, width: 16 }}>{mark}</span><span style={{ fontSize: 14 }}>{x}</span>
        </div>
      ))}
    </div>
  );
  return (
    <Screen noBack footer={<Btn onClick={() => go('setup')}>Continue My Journey</Btn>}>
      <div style={{ paddingTop: 36 }}>
        <p className="fade-down" style={{ margin: 0, fontSize: 12, fontWeight: 700, letterSpacing: 1.2, color: cur.accent, textAlign: 'center' }}>{c.kicker}</p>
        <h1 style={{ margin: '10px 0 8px', fontSize: 24, textAlign: 'center', lineHeight: 1.25 }}>{c.title}</h1>
        <p style={{ margin: '0 4px 20px', fontSize: 14, color: C.sub, textAlign: 'center', lineHeight: 1.55 }}>{c.body}</p>
        <div className="flex" style={{ gap: 10, marginBottom: 20 }}>
          <Mini label="PREVIOUS LEVEL" text={prev.label} sub={prev.classes} color={prev.accent} />
          <Mini label="CURRENT LEVEL" text={cur.label} sub={cur.classes} color={cur.accent} />
        </div>
        <Card style={{ marginBottom: 14 }}>
          <p style={{ margin: '0 0 12px', fontSize: 11, fontWeight: 700, letterSpacing: 0.8, color: C.success }}>WHAT WE KEPT</p>
          <List items={c.kept} mark="✓" color={C.success} />
        </Card>
        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 11, fontWeight: 700, letterSpacing: 0.8, color: cur.accent }}>{c.learnTitle}</p>
          <List items={c.learning} mark="+" color={cur.accent} />
        </Card>
      </div>
    </Screen>
  );
}
