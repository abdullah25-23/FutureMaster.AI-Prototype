import { useApp } from '../state';
import { Card, C, Pill, Screen, SectionTitle } from '../components/ui';
import { weightedFit, fitColor, fitLabel } from '../data/careers';
import { dimensionMeta } from '../data/content';
import { DimensionKey } from '../types';

const subjectWeights: Record<string, { w: Partial<Record<DimensionKey, number>>; why: string }> = {
  Mathematics: { w: { analyticalThinking: 2, technologyInterest: 1 }, why: 'matches your interest in logical problem solving' },
  Physics: { w: { analyticalThinking: 2, handsOnWork: 1, researchInterest: 1 }, why: 'connects to how things work and hands-on thinking' },
  Chemistry: { w: { researchInterest: 2, handsOnWork: 1 }, why: 'fits curiosity about how and why things happen' },
  Biology: { w: { helpingPeople: 2, researchInterest: 1 }, why: 'links to caring for people and understanding life' },
  'Computer Science': { w: { technologyInterest: 2, analyticalThinking: 1 }, why: 'matches your curiosity about technology' },
  English: { w: { communication: 2, leadership: 1 }, why: 'supports communication and sharing ideas' },
  'Arts / Humanities': { w: { creativity: 2, communication: 1, helpingPeople: 1 }, why: 'fits creativity and interest in people and ideas' },
};

const directions = [
  { id: 'ICS', label: 'ICS', w: { technologyInterest: 3, analyticalThinking: 2 }, subs: ['Mathematics', 'Computer Science'], areas: 'Technology & Computing', cluster: 'tech' },
  { id: 'FSc Pre-Engineering', label: 'FSc Pre-Engineering', w: { analyticalThinking: 3, handsOnWork: 2, technologyInterest: 1 }, subs: ['Mathematics', 'Physics'], areas: 'Engineering & Robotics', cluster: 'engineering' },
  { id: 'FSc Pre-Medical', label: 'FSc Pre-Medical', w: { helpingPeople: 3, researchInterest: 2 }, subs: ['Biology', 'Chemistry'], areas: 'Medical & Health Sciences', cluster: 'health' },
  { id: 'Arts / Humanities', label: 'Arts / Humanities', w: { communication: 2, creativity: 2, helpingPeople: 1, leadership: 1 }, subs: ['English', 'Arts / Humanities'], areas: 'Media, Social Sciences and Law', cluster: 'social' },
];

const parse = (s?: string) => { const m = (s ?? '').match(/\d+(\.\d+)?/); return m ? parseFloat(m[0]) : null; };

export default function SubjectGuidanceScreen() {
  const { profile, dims, topDims, nav, profileReady } = useApp();
  const fav = profile.favouriteSubjects, hard = profile.difficultSubjects;
  const marksOf = (s: string) => { const e = Object.entries(profile.subjectMarks).find(([k]) => k.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(k.toLowerCase())); return e ? parse(e[1]) : null; };

  const subjects = Object.entries(subjectWeights).map(([name, d]) => {
    let score = weightedFit(d.w, dims) + (fav.includes(name) ? 10 : 0);
    const notes: string[] = [];
    if (fav.includes(name)) notes.push('one of your favourites');
    if (hard.includes(name)) notes.push('you find it challenging, so steady practice may help');
    const m = marksOf(name);
    if (m !== null && m >= 70) notes.push('your marks here are encouraging');
    return { name, score, why: d.why, notes };
  }).sort((a, b) => b.score - a.score).slice(0, 4);

  const top2 = topDims.slice(0, 2).map(t => dimensionMeta[t.key].label.toLowerCase()).join(' and ');

  return (
    <Screen title="Subject & Pathway Guidance">
      <p style={{ margin: '0 0 16px', fontSize: 13, color: C.sub, lineHeight: 1.5 }}>
        {profileReady ? `Your strongest interests so far are ${top2}. ` : `Early signals point toward ${top2}. `}
        {profile.studyGroup && `You are exploring ${profile.studyGroup}. `}These are ideas to explore, not decisions.
      </p>

      <SectionTitle>Subjects Worth Exploring</SectionTitle>
      {subjects.map((s, i) => (
        <div key={s.name} className="stagger" style={{ '--i': i, marginBottom: 8 } as React.CSSProperties}>
          <Card style={{ padding: 14 }}>
            <p style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>{s.name}</p>
            <p style={{ margin: '3px 0 0', fontSize: 12, color: C.sub, lineHeight: 1.5 }}>
              This {s.why}{s.notes.length ? `; ${s.notes.join('; ')}` : ''}.
            </p>
          </Card>
        </div>
      ))}

      <div style={{ marginTop: 20 }}><SectionTitle>Possible Future Directions</SectionTitle></div>
      {directions.map((d, i) => {
        const fit = fitLabel(weightedFit(d.w, dims));
        const hardOnes = d.subs.filter(s => hard.some(h => h.toLowerCase().includes(s.toLowerCase())));
        const lowMarks = d.subs.filter(s => { const m = marksOf(s); return m !== null && m < 60; });
        const note = hardOnes.length ? `You find ${hardOnes.join(' and ')} challenging. Extra practice there could help if you explore this path.`
          : lowMarks.length ? `Your marks in ${lowMarks.join(' and ')} are still building. There is time to strengthen them.`
          : `Key subjects: ${d.subs.join(' and ')}.`;
        return (
          <div key={d.id} className="stagger" style={{ '--i': i + 4, marginBottom: 10 } as React.CSSProperties}>
            <Card onClick={() => nav('career-list', { clusterId: d.cluster })}>
              <div className="flex items-center justify-between" style={{ gap: 8 }}>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 15, fontFamily: 'Poppins' }}>{d.label}</p>
                <Pill text="Path Worth Exploring" color={C.cyan} />
              </div>
              <p style={{ margin: '6px 0 0', fontSize: 12, color: fitColor(fit), fontWeight: 600 }}>Interest fit hint: {fit}</p>
              <p style={{ margin: '4px 0 0', fontSize: 12, color: C.sub, lineHeight: 1.5 }}>{note}</p>
              <p style={{ margin: '8px 0 0', fontSize: 12, color: C.cyan }}>See career areas: {d.areas} →</p>
            </Card>
          </div>
        );
      })}
    </Screen>
  );
}
