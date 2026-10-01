import { useApp } from '../state';
import { activitiesByLevel } from '../data/activities';
import { Bar, C, Card, Pill, Screen } from '../components/ui';

export default function ActivitiesScreen() {
  const { level, completedActivities, nav, back } = useApp();
  const list = activitiesByLevel[level ?? 'beginner'];
  const done = list.filter(x => completedActivities.includes(x.id)).length;

  return (
    <Screen title="Activities" subtitle="Back to dashboard" onBack={back}>
      <Card style={{ marginBottom: 16 }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
          <span style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 14 }}>{done} of {list.length} completed</span>
          <span style={{ fontSize: 12, color: C.sub }}>{Math.round((done / list.length) * 100)}%</span>
        </div>
        <Bar value={(done / list.length) * 100} />
      </Card>
      <div className="flex flex-col" style={{ gap: 12 }}>
        {list.map((a, i) => {
          const ok = completedActivities.includes(a.id);
          return (
            <div key={a.id} className="stagger" style={{ '--i': i } as React.CSSProperties}>
              <Card onClick={() => nav('activity-detail', { activityId: a.id })} selected={ok} accent={C.success}>
                <div className="flex items-start" style={{ gap: 12 }}>
                  <div style={{ width: 46, height: 46, borderRadius: 14, background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{a.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="flex items-center justify-between" style={{ gap: 8 }}>
                      <p style={{ margin: 0, fontFamily: 'Poppins', fontWeight: 600, fontSize: 14 }}>{a.title}</p>
                      <Pill text={ok ? 'Completed ✓' : 'Not started'} color={ok ? C.success : C.sub} />
                    </div>
                    <p style={{ margin: '4px 0 8px', fontSize: 12, color: C.sub, lineHeight: 1.5 }}>{a.description}</p>
                    <div className="flex items-center justify-between">
                      <span style={{ fontSize: 12, color: C.sub }}>⏱ {a.minutes} min</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: C.cyan }}>{ok ? 'Do again' : 'Start'} →</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </Screen>
  );
}
