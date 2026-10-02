import { ReactNode, useState } from 'react';
import { useApp } from '../state';
import { C, Card, Bar, Chip, Screen, BrandSymbol, Btn, SectionTitle } from '../components/ui';
import { levelMeta, dimensionMeta } from '../data/content';
import { careerById } from '../data/careers';

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between" style={{ minHeight: 40, gap: 12 }}>
    <span style={{ fontSize: 13, color: C.sub }}>{label}</span>
    <span style={{ fontSize: 13, fontWeight: 600, textAlign: 'right' }}>{value}</span>
  </div>
);
const Sec = ({ title, children }: { title: string; children: ReactNode }) => <section><SectionTitle>{title}</SectionTitle>{children}</section>;

export default function ProfileScreen() {
  const { profile, level, classLabel, displayName, sessionsCompleted, questionsAnswered, profileConfidence, topDims, savedCareers, nav, logout } = useApp();
  const [notif, setNotif] = useState(true);
  const initials = displayName.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('') || 'S';
  const meta = level ? levelMeta[level] : null;
  const saved = savedCareers.map(careerById).filter(Boolean);
  return (
    <Screen title="Profile" right={<BrandSymbol height={28} />}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Card style={{ background: 'linear-gradient(135deg,#1C1F2E,#20254A)' }}>
          <div className="flex items-center" style={{ gap: 14 }}>
            <div aria-hidden style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg,#4F46E5,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Poppins', fontWeight: 700, fontSize: 22 }}>{initials}</div>
            <div style={{ minWidth: 0 }}>
              <h3 style={{ margin: 0, fontSize: 18 }}>{displayName}</h3>
              <p style={{ margin: '2px 0 0', fontSize: 12, color: C.sub, overflow: 'hidden', textOverflow: 'ellipsis' }}>{profile.email}</p>
            </div>
          </div>
        </Card>

        <Card>
          <Row label="Current Guidance Level" value={meta ? meta.label : '-'} />
          <Row label="Class" value={classLabel || meta?.classes || '-'} />
          <Row label="School" value={profile.schoolName || 'Not added'} />
          {profile.studyGroup && <Row label="Study Group" value={profile.studyGroup} />}
        </Card>

        <Card onClick={() => nav('journey')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>🗺️ My Journey</span><span style={{ color: C.cyan }}>→</span>
        </Card>

        <Sec title="Favourite Subjects">
          {profile.favouriteSubjects.length ? <div className="flex flex-wrap" style={{ gap: 8 }}>{profile.favouriteSubjects.map(s => <Chip key={s} label={s} />)}</div> : <p style={{ margin: 0, fontSize: 13, color: C.sub }}>None selected yet.</p>}
        </Sec>
        {profile.difficultSubjects.length > 0 && (
          <Sec title="Difficult Subjects"><div className="flex flex-wrap" style={{ gap: 8 }}>{profile.difficultSubjects.map(s => <Chip key={s} label={s} />)}</div></Sec>
        )}

        <Sec title="Exploration Progress">
          <Card>
            <Row label="Sessions completed" value={String(sessionsCompleted)} />
            <Row label="Questions answered" value={String(questionsAnswered)} />
            <p style={{ margin: '6px 0 6px', fontSize: 12, color: C.sub }}>Profile confidence: {Math.round(profileConfidence)}%</p>
            <Bar value={profileConfidence} />
          </Card>
        </Sec>

        <Sec title="Interest Profile">
          <Card onClick={() => nav('interest-profile')} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {questionsAnswered === 0 ? <p style={{ margin: 0, fontSize: 13, color: C.sub }}>Your interests will appear after you start exploring.</p>
              : topDims.slice(0, 3).map((d, i) => (
                <div key={d.key}><p style={{ margin: '0 0 5px', fontSize: 13, fontWeight: 600 }}>{dimensionMeta[d.key].label}</p><Bar value={d.value} color={dimensionMeta[d.key].color} delay={i * 100} /></div>
              ))}
            <span style={{ fontSize: 12, color: C.cyan, fontWeight: 600 }}>View full interest profile →</span>
          </Card>
        </Sec>

        <Sec title="Saved Careers">
          {saved.length === 0 ? <p style={{ margin: 0, fontSize: 13, color: C.sub, lineHeight: 1.5 }}>No saved careers yet. Save careers you want to come back to while exploring.</p> : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {saved.map(c => c && (
                <Card key={c.id} onClick={() => nav('career-details', { careerId: c.id })} style={{ padding: 12 }}>
                  <div className="flex items-center justify-between"><span style={{ fontSize: 14, fontWeight: 600 }}>{c.name}</span><span style={{ color: C.cyan }}>→</span></div>
                </Card>
              ))}
            </div>
          )}
        </Sec>

        <Sec title="Settings">
          <Card>
            <div className="flex items-center justify-between" style={{ minHeight: 44 }}>
              <span style={{ fontSize: 13 }}>Notifications: {notif ? 'On' : 'Off'}</span>
              <button role="switch" aria-checked={notif} aria-label="Notifications" onClick={() => setNotif(v => !v)} style={{ width: 48, height: 28, borderRadius: 14, border: 'none', cursor: 'pointer', background: notif ? C.indigo : C.elevated, position: 'relative', transition: 'background .2s' }}>
                <span style={{ position: 'absolute', top: 3, left: notif ? 23 : 3, width: 22, height: 22, borderRadius: '50%', background: '#fff', transition: 'left .2s' }} />
              </button>
            </div>
            <Row label="Language" value="English" />
          </Card>
        </Sec>

        <Btn variant="ghost" onClick={logout} style={{ color: C.error, borderColor: 'rgba(255,82,82,0.4)' }}>Logout</Btn>
      </div>
    </Screen>
  );
}
