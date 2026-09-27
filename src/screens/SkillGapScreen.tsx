import { Screen } from '../types';

const C = {
  bg: '#0D1117', card: '#1C1F2E', elevated: '#252A3A',
  border: '#2D3548', text: '#FFFFFF', sub: '#A0AEC0', muted: '#6B7280',
  cyan: '#00D2FF', indigo: '#6366F1', violet: '#7C3AED',
  success: '#00E676', warning: '#FFC107', error: '#FF5252',
};

const currentSkills = [
  { name: 'Python', level: 'Intermediate' },
  { name: 'SQL', level: 'Intermediate' },
  { name: 'REST APIs', level: 'Beginner' },
  { name: 'Git', level: 'Intermediate' },
];

const growthAreas = [
  { name: 'Docker', priority: 'High', desc: 'Containerisation is core to modern backend workflows' },
  { name: 'Cloud Deployment', priority: 'High', desc: 'AWS / GCP basics are expected at most backend roles' },
  { name: 'Caching (Redis)', priority: 'Medium', desc: 'Performance optimisation for high-traffic systems' },
  { name: 'Testing', priority: 'Medium', desc: 'Unit and integration testing improve code reliability' },
  { name: 'System Design', priority: 'High', desc: 'Required for mid-level and senior interviews' },
];

const priorityColors: Record<string, string> = { High: '#FF5252', Medium: '#FFC107', Low: '#00E676' };

export default function SkillGapScreen({ navigate }: { navigate: (s: Screen) => void }) {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: C.bg }}>
      <div style={{
        background: 'linear-gradient(160deg, #0D1117 0%, #111525 100%)',
        padding: '48px 20px 18px',
        borderRadius: '0 0 24px 24px',
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => navigate('university-dashboard')} style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: '10px', width: '36px', height: '36px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.sub} strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <div>
            <div style={{ fontFamily: 'Inter', fontSize: '10px', color: C.cyan, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '2px' }}>University / BS</div>
            <h2 style={{ fontFamily: 'Poppins', fontSize: '18px', fontWeight: 700, color: C.text, margin: 0 }}>Skill Gap</h2>
          </div>
        </div>
      </div>

      <div className="flex-1 mobile-scroll px-4 py-4 flex flex-col gap-4" style={{ paddingBottom: '24px' }}>

        {/* Target career */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(124,58,237,0.06))',
          border: '1px solid rgba(99,102,241,0.25)',
          borderRadius: '16px', padding: '14px 16px',
          display: 'flex', alignItems: 'center', gap: '12px',
        }}>
          <span style={{ fontSize: '28px' }}>⚙️</span>
          <div>
            <div style={{ fontFamily: 'Inter', fontSize: '10px', color: C.indigo, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '2px' }}>Target Career</div>
            <div style={{ fontFamily: 'Poppins', fontSize: '17px', fontWeight: 700, color: C.text }}>Backend Engineer</div>
          </div>
          <button onClick={() => navigate('career-clusters')} style={{ marginLeft: 'auto', background: 'none', border: '1px solid rgba(99,102,241,0.25)', borderRadius: '8px', padding: '5px 12px', cursor: 'pointer', fontFamily: 'Inter', fontSize: '11px', color: C.indigo, fontWeight: 600 }}>Change</button>
        </div>

        {/* Current skills */}
        <div style={{ background: C.card, borderRadius: '16px', padding: '14px', border: `1px solid ${C.border}` }}>
          <h3 style={{ fontFamily: 'Poppins', fontSize: '13px', fontWeight: 700, color: C.text, margin: '0 0 10px 0' }}>Current Skills</h3>
          <div className="flex flex-col gap-2">
            {currentSkills.map(skill => (
              <div key={skill.name} className="flex items-center gap-3">
                <div style={{
                  width: '20px', height: '20px', borderRadius: '50%',
                  background: 'rgba(0,230,118,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 0 6px rgba(0,230,118,0.2)',
                }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={C.success} strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <span style={{ fontFamily: 'Inter', fontSize: '13px', color: C.text, flex: 1 }}>{skill.name}</span>
                <span style={{ fontFamily: 'Inter', fontSize: '10px', color: C.muted, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: '4px', padding: '2px 7px' }}>{skill.level}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Growth areas */}
        <div>
          <h3 style={{ fontFamily: 'Poppins', fontSize: '13px', fontWeight: 700, color: C.text, margin: '0 0 10px 0' }}>Growth Areas</h3>
          <div className="flex flex-col gap-2.5">
            {growthAreas.map(area => (
              <div key={area.name} style={{
                background: C.card, borderRadius: '14px', padding: '12px 14px',
                border: `1px solid ${C.border}`,
                display: 'flex', alignItems: 'flex-start', gap: '10px',
              }}>
                <div style={{ flex: 1 }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: C.text }}>{area.name}</span>
                    <span style={{
                      fontFamily: 'Inter', fontSize: '9px', fontWeight: 700,
                      background: `${priorityColors[area.priority]}14`,
                      color: priorityColors[area.priority],
                      border: `1px solid ${priorityColors[area.priority]}25`,
                      borderRadius: '4px', padding: '2px 6px',
                    }}>{area.priority}</span>
                  </div>
                  <p style={{ fontFamily: 'Inter', fontSize: '11px', color: C.muted, margin: 0, lineHeight: '1.4' }}>{area.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate('roadmap')}
          style={{
            width: '100%', height: '52px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
            color: 'white', fontFamily: 'Poppins', fontSize: '15px', fontWeight: 600,
            border: 'none', cursor: 'pointer',
            boxShadow: '0 0 24px rgba(99,102,241,0.4)',
          }}
        >
          Build My Roadmap →
        </button>
      </div>
    </div>
  );
}
