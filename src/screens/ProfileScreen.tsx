import { Screen, EducationModule, StudentProfile, ExplorationProgress } from '../types';

const C = {
  bg: '#0D1117', card: '#1C1F2E', elevated: '#252A3A',
  border: '#2D3548', text: '#FFFFFF', sub: '#A0AEC0', muted: '#6B7280',
  cyan: '#00D2FF', indigo: '#6366F1', violet: '#7C3AED',
  success: '#00E676', warning: '#FFC107', error: '#FF5252',
};

const moduleLabelMap: Record<string, string> = {
  class6_8: 'Class 6-8',
  class9_10: 'Class 9-10',
  class11_12: 'Class 11-12',
  university: 'University / BS',
};

function getDashboard(mod: EducationModule | null): Screen {
  if (mod === 'university') return 'university-dashboard';
  if (mod === 'class11_12') return 'class1112-dashboard';
  if (mod === 'class9_10') return 'class910-dashboard';
  return 'class68-dashboard';
}

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
}

interface Props {
  navigate: (s: Screen) => void;
  educationModule: EducationModule | null;
  studentProfile: StudentProfile;
  explorationProgress: ExplorationProgress;
}

export default function ProfileScreen({ navigate, educationModule, studentProfile, explorationProgress }: Props) {
  const moduleLabel = educationModule ? moduleLabelMap[educationModule] : 'Student';
  const initials = getInitials(studentProfile.name || 'Alex Hassan');
  const confidence = explorationProgress.profileConfidence;
  const completionPct = 75;

  const topInterests = Object.entries(explorationProgress.interestDimensions)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([key]) => key.replace(/([A-Z])/g, ' $1').trim());

  const menuItems = [
    { icon: '🧭', label: 'My Exploration', desc: `${explorationProgress.questionsAnswered} questions answered`, color: C.indigo, screen: 'assessment' as Screen },
    { icon: '📊', label: 'My Interest Profile', desc: `${confidence}% confidence`, color: C.violet, screen: 'interest-profile' as Screen },
    { icon: '💼', label: 'Career Clusters', desc: 'Areas worth exploring', color: C.cyan, screen: 'career-clusters' as Screen },
    { icon: '💾', label: 'Saved Careers', desc: '2 careers saved', color: '#00E676', screen: null },
    { icon: '🎬', label: 'Saved Videos', desc: '5 videos saved', color: '#FFC107', screen: null },
    { icon: '🔔', label: 'Notifications', desc: 'Updates & activity', color: '#EC4899', screen: 'notifications' as Screen },
    { icon: '⚙️', label: 'Account Settings', desc: 'Manage your account', color: C.muted, screen: null },
  ];

  return (
    <div className="w-full h-full flex flex-col" style={{ background: C.bg }}>
      <div style={{
        background: 'linear-gradient(160deg, #0D1117 0%, #111525 100%)',
        padding: '48px 20px 20px',
        borderRadius: '0 0 24px 24px',
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(getDashboard(educationModule))} style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: '10px', width: '36px', height: '36px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.sub} strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <h2 style={{ fontFamily: 'Poppins', fontSize: '18px', fontWeight: 700, color: C.text, margin: 0 }}>My Profile</h2>
        </div>

        <div className="flex items-center gap-4">
          <div style={{
            width: '68px', height: '68px', borderRadius: '20px',
            background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Poppins', fontSize: '26px', fontWeight: 700, color: 'white',
            boxShadow: '0 0 20px rgba(99,102,241,0.4)',
            border: '2px solid rgba(99,102,241,0.3)', flexShrink: 0,
          }}>
            {initials}
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontFamily: 'Poppins', fontSize: '19px', fontWeight: 700, color: C.text, margin: '0 0 5px 0' }}>
              {studentProfile.name || 'Alex Hassan'}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, background: 'rgba(0,210,255,0.1)', color: C.cyan, borderRadius: '6px', padding: '3px 8px', border: '1px solid rgba(0,210,255,0.2)' }}>
                {moduleLabel}
              </span>
              {studentProfile.degree && (
                <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, background: 'rgba(99,102,241,0.1)', color: C.indigo, borderRadius: '6px', padding: '3px 8px', border: '1px solid rgba(99,102,241,0.2)' }}>
                  {studentProfile.degree}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Profile completion */}
        <div style={{ marginTop: '14px', background: C.card, borderRadius: '12px', padding: '12px 14px', border: `1px solid ${C.border}` }}>
          <div className="flex items-center justify-between mb-2">
            <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, color: C.sub }}>Profile Completion</span>
            <span style={{ fontFamily: 'Poppins', fontSize: '13px', fontWeight: 700, color: C.cyan }}>{completionPct}%</span>
          </div>
          <div style={{ height: '6px', background: C.elevated, borderRadius: '99px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${completionPct}%`, borderRadius: '99px', background: 'linear-gradient(90deg, #00D2FF, #6366F1)', transition: 'width 0.6s ease' }} />
          </div>
          <p style={{ fontFamily: 'Inter', fontSize: '11px', color: C.muted, margin: '8px 0 0 0' }}>Complete your education details to unlock better recommendations.</p>
        </div>
      </div>

      <div className="flex-1 mobile-scroll px-4 py-4 flex flex-col gap-4" style={{ paddingBottom: '24px' }}>

        {/* Stats row */}
        <div className="flex gap-3">
          {[
            { label: 'Questions', value: String(explorationProgress.questionsAnswered) },
            { label: 'Confidence', value: `${confidence}%` },
            { label: 'Saved', value: '2' },
          ].map(stat => (
            <div key={stat.label} style={{
              flex: 1, background: C.card, border: `1px solid ${C.border}`,
              borderRadius: '12px', padding: '10px 8px', textAlign: 'center',
            }}>
              <div style={{ fontFamily: 'Poppins', fontSize: '19px', fontWeight: 800, color: C.cyan, textShadow: '0 0 12px rgba(0,210,255,0.4)' }}>{stat.value}</div>
              <div style={{ fontFamily: 'Inter', fontSize: '10px', color: C.muted, marginTop: '2px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Top interests */}
        {topInterests.length > 0 && (
          <div style={{ background: C.card, borderRadius: '14px', padding: '14px', border: `1px solid ${C.border}` }}>
            <h3 style={{ fontFamily: 'Poppins', fontSize: '13px', fontWeight: 700, color: C.text, margin: '0 0 10px 0' }}>My Top Interests</h3>
            <div className="flex flex-wrap gap-2">
              {topInterests.map(interest => (
                <span key={interest} style={{
                  fontFamily: 'Inter', fontSize: '12px', fontWeight: 500,
                  background: 'rgba(99,102,241,0.1)', color: C.indigo,
                  borderRadius: '8px', padding: '5px 12px',
                  border: '1px solid rgba(99,102,241,0.2)',
                }}>
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Menu items */}
        <div className="flex flex-col gap-2">
          {menuItems.map(item => (
            <button
              key={item.label}
              onClick={() => item.screen && navigate(item.screen)}
              style={{
                width: '100%', background: C.card, borderRadius: '14px', padding: '13px 14px',
                border: `1px solid ${C.border}`, boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer',
                opacity: item.screen ? 1 : 0.6,
              }}
            >
              <div style={{
                width: '38px', height: '38px', borderRadius: '11px', flexShrink: 0,
                background: `${item.color}12`, border: `1px solid ${item.color}20`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px',
              }}>
                {item.icon}
              </div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: C.text }}>{item.label}</div>
                <div style={{ fontFamily: 'Inter', fontSize: '11px', color: C.muted, marginTop: '1px' }}>{item.desc}</div>
              </div>
              {item.screen && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.border} strokeWidth="2" style={{ flexShrink: 0 }}>
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate('login')}
          style={{
            width: '100%', height: '48px', borderRadius: '14px',
            background: 'rgba(255,82,82,0.08)', border: '1px solid rgba(255,82,82,0.2)',
            fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: C.error,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.error} strokeWidth="2">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
          </svg>
          Sign Out
        </button>
      </div>
    </div>
  );
}
