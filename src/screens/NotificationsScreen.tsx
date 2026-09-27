import { Screen, EducationModule } from '../types';

const C = {
  bg: '#0D1117', card: '#1C1F2E', elevated: '#252A3A',
  border: '#2D3548', text: '#FFFFFF', sub: '#A0AEC0', muted: '#6B7280',
  cyan: '#00D2FF', indigo: '#6366F1', violet: '#7C3AED',
  success: '#00E676', warning: '#FFC107',
};

const notifications = [
  {
    icon: '📊',
    title: 'Interest Profile Updated',
    desc: 'Your profile has grown — Technology Interest and Analytical Thinking are now your strongest dimensions.',
    time: '2 min ago', unread: true, color: '#6366F1',
  },
  {
    icon: '🔍',
    title: 'New Career Area Worth Exploring',
    desc: 'Based on your recent activity, Cybersecurity may be a strong match. Explore the cluster.',
    time: '45 min ago', unread: true, color: '#7C3AED',
  },
  {
    icon: '🎬',
    title: 'New Video Selected For You',
    desc: '"AI & Machine Learning: Careers of the Future" was added based on your latest exploration.',
    time: '2h ago', unread: true, color: '#00D2FF',
  },
  {
    icon: '🗺️',
    title: 'Roadmap Updated',
    desc: 'Your Software Engineer roadmap has new milestones and learning resources.',
    time: '1d ago', unread: false, color: '#FFC107',
  },
  {
    icon: '🧭',
    title: 'Exploration Activity Completed',
    desc: 'You answered 7 questions. Your profile confidence is now at 42%. Keep going.',
    time: '2d ago', unread: false, color: '#00E676',
  },
  {
    icon: '💡',
    title: 'Career Fact of the Day',
    desc: 'Pakistan needs 100,000+ software engineers by 2030 — technology careers are growing fast.',
    time: '3d ago', unread: false, color: '#6B7280',
  },
];

function getDashboard(mod: EducationModule | null): Screen {
  if (mod === 'university') return 'university-dashboard';
  if (mod === 'class11_12') return 'class1112-dashboard';
  if (mod === 'class9_10') return 'class910-dashboard';
  return 'class68-dashboard';
}

interface Props {
  navigate: (s: Screen) => void;
  educationModule: EducationModule | null;
}

export default function NotificationsScreen({ navigate, educationModule }: Props) {
  const unread = notifications.filter(n => n.unread);
  const read = notifications.filter(n => !n.unread);

  return (
    <div className="w-full h-full flex flex-col" style={{ background: C.bg }}>
      <div style={{
        background: 'linear-gradient(160deg, #0D1117 0%, #111525 100%)',
        padding: '48px 20px 20px',
        borderRadius: '0 0 24px 24px',
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(getDashboard(educationModule))} style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: '10px', width: '36px', height: '36px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.sub} strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <div>
            <h2 style={{ fontFamily: 'Poppins', fontSize: '20px', fontWeight: 700, color: C.text, margin: 0 }}>Notifications</h2>
            <p style={{ fontFamily: 'Inter', fontSize: '12px', color: C.cyan, margin: 0, marginTop: '2px' }}>
              {unread.length} unread
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 mobile-scroll px-4 py-4 flex flex-col gap-2.5" style={{ paddingBottom: '24px' }}>
        <h3 style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 600, color: C.muted, margin: '0 0 4px 0', letterSpacing: '1px', textTransform: 'uppercase' }}>
          New
        </h3>
        {unread.map((notif, i) => (
          <div key={i} style={{
            background: C.card, borderRadius: '14px', padding: '14px',
            border: `1px solid ${notif.color}25`,
            boxShadow: `0 0 12px ${notif.color}10, 0 2px 8px rgba(0,0,0,0.2)`,
            display: 'flex', gap: '12px', alignItems: 'flex-start',
          }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '12px', flexShrink: 0,
              background: `${notif.color}12`, border: `1px solid ${notif.color}20`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px',
            }}>
              {notif.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div className="flex items-center justify-between mb-1">
                <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: C.text }}>{notif.title}</span>
                <div style={{
                  width: '8px', height: '8px', borderRadius: '50%', background: notif.color, flexShrink: 0,
                  boxShadow: `0 0 6px ${notif.color}`,
                }} />
              </div>
              <p style={{ fontFamily: 'Inter', fontSize: '12px', color: C.sub, margin: '0 0 4px 0', lineHeight: '1.4' }}>
                {notif.desc}
              </p>
              <span style={{ fontFamily: 'Inter', fontSize: '10px', color: C.muted }}>{notif.time}</span>
            </div>
          </div>
        ))}

        <h3 style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 600, color: C.muted, margin: '8px 0 4px 0', letterSpacing: '1px', textTransform: 'uppercase' }}>
          Earlier
        </h3>
        {read.map((notif, i) => (
          <div key={i} style={{
            background: C.card, borderRadius: '14px', padding: '14px',
            border: `1px solid ${C.border}`, boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            display: 'flex', gap: '12px', alignItems: 'flex-start', opacity: 0.65,
          }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '12px', flexShrink: 0,
              background: C.elevated, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px',
            }}>
              {notif.icon}
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: C.sub, display: 'block', marginBottom: '3px' }}>{notif.title}</span>
              <p style={{ fontFamily: 'Inter', fontSize: '12px', color: C.muted, margin: '0 0 4px 0', lineHeight: '1.4' }}>
                {notif.desc}
              </p>
              <span style={{ fontFamily: 'Inter', fontSize: '10px', color: C.muted }}>{notif.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
