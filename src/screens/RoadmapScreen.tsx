import { useState } from 'react';
import { useApp } from '../state';
import { Card, C, Chip, Pill, Screen } from '../components/ui';
import { careerAlignment, careerById, careers, PathwayType, readinessFor } from '../data/careers';

type Kind = 'c' | 'n' | 'p';
type Step = [string, string, Kind];
const kindLabel: Record<Kind, string> = { c: 'Common Education Route', n: 'Possible Next Step', p: 'Path Worth Exploring' };
const kindColor: Record<Kind, string> = { c: '#00D2FF', n: '#A78BFA', p: '#00E676' };

const routes: Record<PathwayType, Step[]> = {
  computing: [['Matric', 'Science or Computer Science subjects', 'c'], ['ICS / FSc', 'ICS or FSc Pre-Engineering are common routes', 'c'], ['BS CS / SE / AI / DS', 'Review applicable entry requirements', 'n'], ['Skills / Projects', 'Build small projects and a portfolio', 'p'], ['Internship', 'Practical experience with a team', 'p'], ['Career', 'Roles in computing and technology', 'p']],
  health: [['Matric Science', 'Biology, Chemistry and Physics', 'c'], ['FSc Pre-Medical', 'A common route toward health degrees', 'c'], ['Applicable admission requirements', 'Review entry tests and requirements such as MDCAT where applicable', 'n'], ['MBBS / other health degree', 'Pharm-D, lab technology, physiotherapy and others', 'n'], ['Clinical / practical training', 'Hands-on training during study', 'p'], ['Career', 'Roles in healthcare and health sciences', 'p']],
  engineering: [['Matric Science', 'Mathematics, Physics and Chemistry', 'c'], ['FSc Pre-Engineering', 'A common route toward engineering degrees', 'c'], ['Applicable entry requirements', 'Review tests such as ECAT or NTS where applicable', 'n'], ['BS Engineering program', 'Electrical, Mechanical, Civil and more', 'n'], ['Internship / projects', 'Workshop and industry experience', 'p'], ['Career', 'Roles in engineering and technology', 'p']],
  business: [['Matric', 'Mathematics and English matter across business routes', 'c'], ['FSc / ICS / I.Com', 'Several intermediate groups can lead to business degrees', 'c'], ['BBA or related degree', 'Review applicable entry requirements', 'n'], ['Projects / Leadership', 'Clubs, small ventures, teamwork', 'p'], ['Internship', 'Practical business experience', 'p'], ['Career', 'Roles in business and finance', 'p']],
  design: [['Matric', 'Art, Computer and English subjects', 'c'], ['Intermediate (any group)', 'Many design programs accept different groups', 'c'], ['Portfolio building', 'A portfolio may be part of applicable requirements', 'n'], ['BS Design / Architecture / Media', 'Review applicable entry requirements', 'n'], ['Projects / Internship', 'Real briefs and studio experience', 'p'], ['Career', 'Roles in design and creative industries', 'p']],
  social: [['Matric', 'English, Urdu and Social Studies', 'c'], ['FA / ICS / I.Com / FSc', 'Several intermediate groups can lead here', 'c'], ['BS Social Sciences / Humanities / Law', 'Review applicable entry requirements', 'n'], ['Practical experience', 'Volunteering, internships, research', 'p'], ['Career', 'Roles in people-focused and public fields', 'p']],
  science: [['Matric Science', 'Strong science and Mathematics base', 'c'], ['FSc Pre-Medical / Pre-Engineering', 'Common routes toward science degrees', 'c'], ['BS Natural Sciences or related', 'Review applicable entry requirements', 'n'], ['Lab / Research projects', 'Hands-on investigation', 'p'], ['Career', 'Roles in science and research', 'p']],
  general: [['Matric', 'Build a strong subject base', 'c'], ['Intermediate', 'Choose a group that suits your interests', 'c'], ['Degree or training route', 'Review applicable requirements', 'n'], ['Practical experience', 'Training, projects, internships', 'p'], ['Career', 'Roles in this field', 'p']],
};

export default function RoadmapScreen() {
  const { params, profile, level, dims, classLabel } = useApp();
  const lv = level ?? 'beginner';
  const fixed = !!params.careerId;
  const top = [...careers].sort((a, b) => careerAlignment(b, dims) - careerAlignment(a, dims))[0];
  const [pick, setPick] = useState<string>(params.careerId ?? top.id);
  const career = careerById(pick) ?? top;
  const popular = ['software-engineer', 'doctor', 'mechanical-engineer', 'entrepreneur', 'graphic-designer', 'psychologist'].map(careerById).filter((c): c is NonNullable<typeof c> => !!c);
  const r = readinessFor(career, profile, lv);

  const route = routes[career.pathwayType];
  const start: Step = lv === 'advanced'
    ? [`${classLabel || 'Class 11-12'} (you are here)`, 'Your current intermediate stage', 'c']
    : [`${classLabel || (lv === 'beginner' ? 'Class 6-8' : 'Class 9-10')} (you are here)`, lv === 'beginner' ? 'Explore subjects and interests' : 'Strengthen your subjects and explore groups', 'c'];
  const steps: Step[] = lv === 'advanced' ? [start, ...route.slice(2)] : [start, ...route];

  return (
    <Screen title="Roadmap" subtitle={career.name}>
      {!fixed && (
        <div style={{ marginBottom: 16 }}>
          <p style={{ margin: '0 0 8px', fontSize: 12, color: C.sub }}>Choose a career to see a possible route</p>
          <div className="flex flex-wrap" style={{ gap: 8 }}>
            {popular.map(c => <Chip key={c.id} icon={c.icon} label={c.name} selected={pick === c.id} onClick={() => setPick(c.id)} />)}
          </div>
        </div>
      )}

      <p style={{ margin: '0 0 16px', fontSize: 12, color: C.sub, lineHeight: 1.5 }}>A possible route, not a fixed plan. Routes vary by institution and change over time, so review current requirements.</p>

      <div key={career.id} style={{ position: 'relative', paddingLeft: 34 }}>
        <div style={{ position: 'absolute', left: 13, top: 8, bottom: 8, width: 2, background: `linear-gradient(${C.cyan},${C.violet})`, transformOrigin: 'top', animation: 'timelineGrow 1s ease both', opacity: 0.6 }} />
        {steps.map(([label, note, kind], i) => (
          <div key={label} className="stagger" style={{ '--i': i, position: 'relative', marginBottom: 12 } as React.CSSProperties}>
            <span style={{ position: 'absolute', left: -28, top: 16, width: 14, height: 14, borderRadius: 7, background: i === 0 ? C.success : kindColor[kind], boxShadow: `0 0 10px ${kindColor[kind]}` }} />
            <Card selected={i === 0} accent={C.success} style={{ padding: 14 }}>
              <Pill text={i === 0 ? 'Where you are' : kindLabel[kind]} color={i === 0 ? C.success : kindColor[kind]} />
              <p style={{ margin: '6px 0 0', fontWeight: 600, fontSize: 14 }}>{label}</p>
              <p style={{ margin: '2px 0 0', fontSize: 12, color: C.sub, lineHeight: 1.45 }}>{note}</p>
            </Card>
          </div>
        ))}
      </div>

      {r.readiness === 'Needs Improvement' && (
        <Card style={{ marginTop: 6, background: '#171B2B', borderStyle: 'dashed' }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>Other routes worth exploring</p>
          <p style={{ margin: '4px 0 8px', fontSize: 12, color: C.sub, lineHeight: 1.5 }}>Some routes here may need extra preparation. You can build up step by step, and related paths can lead to similar work:</p>
          <div className="flex flex-wrap" style={{ gap: 6 }}>{career.alternatives.map(a => <Pill key={a} text={a} color={C.sub} />)}</div>
        </Card>
      )}
    </Screen>
  );
}
