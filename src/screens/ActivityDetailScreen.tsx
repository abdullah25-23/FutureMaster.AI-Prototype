import { useState } from 'react';
import { useApp } from '../state';
import { activitiesByLevel } from '../data/activities';
import { Bar, Btn, C, Card, CheckAnim, Screen } from '../components/ui';

export default function ActivityDetailScreen() {
  const { level, params, completeActivity, nav, back } = useApp();
  const activity = Object.values(activitiesByLevel).flat().find(a => a.id === params.activityId);
  const [step, setStep] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  void level;

  if (!activity) {
    return (
      <Screen title="Activity" onBack={back}>
        <Card style={{ textAlign: 'center' }}>
          <p style={{ margin: '0 0 12px', color: C.sub }}>We could not find this activity.</p>
          <Btn onClick={back}>Back to Activities</Btn>
        </Card>
      </Screen>
    );
  }

  if (finished) {
    return (
      <Screen title={activity.title} onBack={back}>
        <div className="flex flex-col items-center text-center" style={{ paddingTop: 40, gap: 12 }}>
          <CheckAnim size={84} />
          <h2 className="fade-down" style={{ margin: '12px 0 0', fontSize: 22 }}>Activity completed</h2>
          <p style={{ margin: 0, color: C.sub, fontSize: 14 }}>Your interest profile has been updated</p>
          <div style={{ width: '100%', marginTop: 24 }} className="flex flex-col">
            <Btn onClick={back}>Back to Activities</Btn>
            <div style={{ height: 10 }} />
            <Btn variant="ghost" onClick={() => nav('interest-profile')}>View My Interests</Btn>
          </div>
        </div>
      </Screen>
    );
  }

  const total = activity.steps.length;
  const cur = activity.steps[step];
  const last = step === total - 1;
  const next = () => {
    if (pick === null) return;
    if (last) { completeActivity(activity.id); setFinished(true); } else { setStep(step + 1); setPick(null); }
  };

  return (
    <Screen title={activity.title} subtitle={`Step ${step + 1} of ${total}`} onBack={back}
      footer={<Btn disabled={pick === null} onClick={next}>{last ? 'Finish' : 'Next'}</Btn>}>
      <div style={{ marginBottom: 16 }}><Bar value={((step + (pick !== null ? 1 : 0)) / total) * 100} /></div>
      <p key={step} className="fade-down" style={{ margin: '0 0 16px', fontFamily: 'Poppins', fontWeight: 600, fontSize: 16, lineHeight: 1.45 }}>{cur.prompt}</p>
      <div className="flex flex-col" style={{ gap: 10 }}>
        {cur.choices.map((c, i) => (
          <Card key={step + '-' + i} onClick={() => setPick(i)} selected={pick === i}
            style={{ minHeight: 52, background: pick === i ? 'rgba(0,210,255,0.08)' : C.card, fontSize: 14 }}>
            {c}
          </Card>
        ))}
      </div>
      <p style={{ margin: '16px 0 0', fontSize: 12, color: C.muted }}>There are no right or wrong answers here.</p>
    </Screen>
  );
}
