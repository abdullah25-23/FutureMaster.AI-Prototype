import { useApp } from '../state';
import { Btn, Card, C, Chip, Pill, Screen, SectionTitle } from '../components/ui';
import { careerAlignment, careerById, careers, fitColor, fitLabel, keyMarksFor, PathwayType, readinessColor, readinessFor } from '../data/careers';
import { dimensionMeta } from '../data/content';
import { DimensionKey } from '../types';
import { academicEvidence } from '../data/academic';

const improvements: Record<PathwayType, string[]> = {
  health: ['Strengthen relevant science subjects', 'Review current admission requirements', 'Prepare for required entry assessments'],
  engineering: ['Strengthen Mathematics and Physics', 'Review current admission requirements', 'Prepare for applicable entry tests'],
  computing: ['Strengthen Mathematics and logical thinking', 'Try small programming projects', 'Review current admission requirements'],
  business: ['Strengthen Mathematics and English communication', 'Practise teamwork and presenting ideas', 'Review current admission requirements'],
  design: ['Build a small portfolio of your work', 'Practise drawing and design tools', 'Review applicable portfolio or entry requirements'],
  social: ['Strengthen reading, writing and speaking', 'Read about current social and public topics', 'Review current admission requirements'],
  science: ['Strengthen relevant science and Mathematics subjects', 'Try simple experiments or research tasks', 'Review current admission requirements'],
  general: ['Strengthen the subjects linked to this path', 'Gather information about entry requirements', 'Talk with a teacher or counselor'],
};

export default function ReadinessScreen() {
  const { params, nav, loadNav, profile, level, dims, profileReady } = useApp();
  const career = careerById(params.careerId ?? '') ?? careers[0];
  const lv = level ?? 'beginner';
  const score = careerAlignment(career, dims);
  const fit = fitLabel(score);
  const r = readinessFor(career, profile, lv);
  const key = career.keySubjectsForReadiness.join(' and ');
  const marks = keyMarksFor(career, profile);
  const ev = academicEvidence(profile);
  const pendingLine = ev.state === 'awaiting' ? 'Your academic result is still awaiting, so readiness is shown as unavailable rather than low. You can update it later.' : 'This is a preliminary view. Add your latest academic result for more detailed readiness guidance.';

  const topInterests = (Object.entries(career.weights) as [DimensionKey, number][]).sort((a, b) => b[1] - a[1]).slice(0, 2).map(([k]) => dimensionMeta[k].label.toLowerCase());
  const interestLine = profileReady
    ? `You show ${fit === 'Strong' ? 'strong' : fit === 'Good' ? 'good' : 'early'} interest signals in ${topInterests.join(' and ')}, which connect well with ${career.name.toLowerCase()} work.`
    : `Your early signals touch on ${topInterests.join(' and ')}. They will sharpen as you explore more.`;

  let academicLine: string;
  if (lv === 'beginner') academicLine = `At this stage guidance is general. ${key} may be useful to strengthen as you progress, and there is plenty of time to build.`;
  else if (!marks) academicLine = pendingLine;
  else if (r.readiness === 'On Track') academicLine = lv === 'advanced' ? 'Your current academic performance suggests you are in a good position to review the degree routes for this career.' : 'Your current academic performance looks well aligned with an early study path in this area.';
  else if (r.readiness === 'Building') academicLine = `Your current academic performance suggests you are building toward this path. Extra attention to ${key} could help.`;
  else academicLine = lv === 'advanced' ? 'Your current academic performance suggests that some pathways in this area may require additional preparation.' : `Your current academic performance suggests that more practice in ${key} could open more options later.`;

  const gap = lv === 'beginner' ? 'No marks are used at this stage. Enjoy exploring and building your basics.'
    : !marks ? (ev.state === 'awaiting' ? 'Academic information pending. A gap will be shown once your result is available.' : 'Academic Information Not Available. Add your latest academic result for more detailed readiness guidance.')
    : r.readiness === 'On Track' ? `No major gap is visible right now in ${marks.fromKey ? key : 'your overall results'}. Keep your momentum.`
    : `Your current results in ${marks.fromKey ? key : 'overall studies'} average about ${Math.round(marks.value)}%, compared with a strong base that many routes in this area look for. Applicable entry requirements may vary, so review them.`;

  const alts = career.alternatives;
  const steps = [...improvements[career.pathwayType]];

  return (
    <Screen title="Academic Readiness" subtitle={career.name} footer={<Btn onClick={() => loadNav('Building your roadmap...', 'roadmap', { careerId: career.id })}>View Roadmap</Btn>}>
      <div className="flex" style={{ gap: 10, marginBottom: 16 }}>
        <Card style={{ flex: 1, padding: 14 }}>
          <p style={{ margin: 0, fontSize: 11, color: C.sub, fontWeight: 600 }}>Interest Match</p>
          <div style={{ marginTop: 8 }}><Pill text={profileReady ? fit : 'Early signal'} color={profileReady ? fitColor(fit) : C.sub} /></div>
        </Card>
        <Card style={{ flex: 1, padding: 14 }}>
          <p style={{ margin: 0, fontSize: 11, color: C.sub, fontWeight: 600 }}>Academic Readiness</p>
          <div style={{ marginTop: 8 }}><Pill text={r.readiness} color={readinessColor(r.readiness)} /></div>
          {ev.record && <p style={{ margin: '8px 0 0', fontSize: 10, color: C.muted, lineHeight: 1.4 }}>{ev.state === 'internal' ? 'Current / Internal Assessment (lower confidence)' : ev.record.resultType}</p>}
        </Card>
      </div>

      <div className="stagger" style={{ '--i': 0, marginBottom: 16 } as React.CSSProperties}>
        <Card>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6 }}>{interestLine} {academicLine}</p>
          <p style={{ margin: '8px 0 0', fontSize: 12, color: C.sub, lineHeight: 1.5 }}>Interest and academics are separate. Either one can grow with effort and time.</p>
        </Card>
      </div>

      <div className="stagger" style={{ '--i': 1, marginBottom: 16 } as React.CSSProperties}>
        <SectionTitle>Current Gap</SectionTitle>
        <Card><p style={{ margin: 0, fontSize: 13, color: C.sub, lineHeight: 1.6 }}>{gap}</p></Card>
      </div>

      <div className="stagger" style={{ '--i': 2, marginBottom: 16 } as React.CSSProperties}>
        <SectionTitle>Possible Improvements</SectionTitle>
        <Card>
          {steps.map(s => <p key={s} style={{ margin: '0 0 8px', fontSize: 13, lineHeight: 1.5 }}><span style={{ color: C.cyan }}>→ </span>{s}</p>)}
          {lv === 'advanced' && <p style={{ margin: 0, fontSize: 11, color: C.muted }}>Entry requirements and assessments change, so check the latest information from each institution.</p>}
        </Card>
      </div>

      <div className="stagger" style={{ '--i': 3 } as React.CSSProperties}>
        <SectionTitle>Alternative Related Pathways</SectionTitle>
        <div className="flex flex-wrap" style={{ gap: 8 }}>{alts.map(a => <Chip key={a} label={a} />)}</div>
        <p style={{ margin: '10px 0 0', fontSize: 12, color: C.sub, lineHeight: 1.5 }}>These are paths worth exploring alongside {career.name.toLowerCase()}.</p>
        <button className="pressable" onClick={() => nav('clusters')} style={{ marginTop: 6, background: 'none', border: 'none', color: C.cyan, fontWeight: 600, fontSize: 12, cursor: 'pointer', minHeight: 36, padding: 0 }}>Browse more career areas →</button>
      </div>

      <p style={{ margin: '18px 4px 0', fontSize: 11, color: C.muted, lineHeight: 1.55 }}>
        Academic Readiness is a general preparation indicator based on the information you provide. It does not determine admission eligibility.
        {lv === 'advanced' && ' Admission requirements vary by institution and may change over time.'}
      </p>
    </Screen>
  );
}
