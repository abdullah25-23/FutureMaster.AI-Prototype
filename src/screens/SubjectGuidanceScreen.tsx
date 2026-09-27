import { Screen } from '../types';

const C = {
  bg: '#0D1117', card: '#1C1F2E', elevated: '#252A3A',
  border: '#2D3548', text: '#FFFFFF', sub: '#A0AEC0', muted: '#6B7280',
  cyan: '#00D2FF', indigo: '#6366F1', violet: '#7C3AED', success: '#00E676',
};

const topInterests = ['Technology', 'Analytical Thinking', 'Research Interest'];

const subjectRecommendations = [
  { name: 'Computer Science', icon: '💻', color: '#6366F1', reason: 'Directly aligns with your technology interest and analytical thinking' },
  { name: 'Mathematics', icon: '📐', color: '#00D2FF', reason: 'Supports logical and analytical development across fields' },
  { name: 'Physics', icon: '⚡', color: '#7C3AED', reason: 'Builds problem-solving skills valued in technology and engineering' },
];

const futureDirections = [
  { label: 'ICS (Computer Science)', color: '#6366F1', icon: '💻', strength: 'Strong Match', desc: 'Leads to computing, software, and AI careers' },
  { label: 'FSc Pre-Engineering', color: '#7C3AED', icon: '⚙️', strength: 'Good Match', desc: 'Leads to engineering, physics-based careers' },
  { label: 'FSc Pre-Medical', color: '#FF5252', icon: '🏥', strength: 'Worth Exploring', desc: 'Leads to medicine, pharmacy, health sciences' },
  { label: 'Arts / Humanities', color: '#EC4899', icon: '📖', strength: 'Worth Exploring', desc: 'Leads to psychology, law, social sciences' },
];

export default function SubjectGuidanceScreen({ navigate }: { navigate: (s: Screen) => void }) {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: C.bg }}>
      <div style={{
        background: 'linear-gradient(160deg, #0D1117 0%, #111525 100%)',
        padding: '48px 20px 18px',
        borderRadius: '0 0 24px 24px',
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => navigate('class910-dashboard')} style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: '10px', width: '36px', height: '36px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.sub} strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <div>
            <div style={{ fontFamily: 'Inter', fontSize: '10px', color: C.cyan, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '2px' }}>Class 9-10</div>
            <h2 style={{ fontFamily: 'Poppins', fontSize: '18px', fontWeight: 700, color: C.text, margin: 0 }}>Subject Guidance</h2>
          </div>
        </div>
      </div>

      <div className="flex-1 mobile-scroll px-4 py-4 flex flex-col gap-4" style={{ paddingBottom: '24px' }}>

        {/* Current interest profile */}
        <div style={{ background: C.card, borderRadius: '14px', padding: '14px', border: `1px solid ${C.border}` }}>
          <div style={{ fontFamily: 'Inter', fontSize: '10px', color: C.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>Based on Your Current Profile</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {topInterests.map(interest => (
              <span key={interest} style={{
                fontFamily: 'Inter', fontSize: '11px', fontWeight: 600,
                background: 'rgba(0,210,255,0.1)', color: C.cyan,
                border: '1px solid rgba(0,210,255,0.2)', borderRadius: '6px', padding: '4px 10px',
              }}>{interest}</span>
            ))}
          </div>
        </div>

        {/* Subjects worth exploring */}
        <div>
          <h3 style={{ fontFamily: 'Poppins', fontSize: '13px', fontWeight: 700, color: C.text, margin: '0 0 10px 0' }}>Subjects Worth Exploring</h3>
          <div className="flex flex-col gap-3">
            {subjectRecommendations.map(subject => (
              <div key={subject.name} style={{
                background: C.card, borderRadius: '14px', padding: '14px',
                border: `1px solid ${subject.color}25`,
                boxShadow: `0 0 10px ${subject.color}10`,
              }}>
                <div className="flex items-center gap-10px" style={{ gap: '10px', marginBottom: '6px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: `${subject.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0,
                  }}>{subject.icon}</div>
                  <span style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 700, color: subject.color }}>{subject.name}</span>
                </div>
                <p style={{ fontFamily: 'Inter', fontSize: '11px', color: C.muted, margin: 0, lineHeight: '1.5' }}>{subject.reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Possible future directions */}
        <div>
          <h3 style={{ fontFamily: 'Poppins', fontSize: '13px', fontWeight: 700, color: C.text, margin: '0 0 10px 0' }}>Possible Future Directions</h3>
          <div className="flex flex-col gap-2.5">
            {futureDirections.map(dir => (
              <div key={dir.label} style={{
                background: C.card, borderRadius: '14px', padding: '13px 14px',
                border: `1px solid ${C.border}`,
                display: 'flex', alignItems: 'center', gap: '12px',
              }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${dir.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{dir.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: C.text, marginBottom: '2px' }}>{dir.label}</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '11px', color: C.muted }}>{dir.desc}</div>
                </div>
                <span style={{
                  fontFamily: 'Inter', fontSize: '9px', fontWeight: 700,
                  background: `${dir.color}12`, color: dir.color,
                  border: `1px solid ${dir.color}20`, borderRadius: '5px', padding: '3px 7px',
                  flexShrink: 0, whiteSpace: 'nowrap',
                }}>{dir.strength}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{
          background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.15)',
          borderRadius: '12px', padding: '12px 14px',
          display: 'flex', alignItems: 'flex-start', gap: '10px',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.indigo} strokeWidth="1.5" style={{ flexShrink: 0, marginTop: '1px' }}>
            <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
          </svg>
          <p style={{ fontFamily: 'Inter', fontSize: '11px', color: C.muted, margin: 0, lineHeight: '1.6' }}>
            Subject guidance is based on your current interests and should also be considered with your academic performance, available school options, and personal goals. These are paths worth exploring — not instructions to follow.
          </p>
        </div>

        <button
          onClick={() => navigate('career-clusters')}
          style={{
            width: '100%', height: '50px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
            color: 'white', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 600,
            border: 'none', cursor: 'pointer',
            boxShadow: '0 0 20px rgba(99,102,241,0.35)',
          }}
        >
          Explore Career Paths →
        </button>
      </div>
    </div>
  );
}
