import { Screen, EducationModule } from '../types';

const C = {
  bg: '#0D1117', card: '#1C1F2E', elevated: '#252A3A',
  border: '#2D3548', text: '#FFFFFF', sub: '#A0AEC0', muted: '#6B7280',
  cyan: '#00D2FF', indigo: '#6366F1', violet: '#7C3AED',
  success: '#00E676', warning: '#FFC107', error: '#FF5252',
};

interface Props {
  navigate: (s: Screen) => void;
  educationModule: EducationModule | null;
}

const clusters = [
  {
    id: 'tech',
    label: 'Technology & Computing',
    icon: '💻',
    color: '#6366F1',
    desc: 'Software, AI, cybersecurity, and data systems',
    careers: ['Software Engineer', 'AI Engineer', 'Cybersecurity Analyst', 'Data Scientist'],
    matchScore: 82,
  },
  {
    id: 'engineering',
    label: 'Engineering & Robotics',
    icon: '⚙️',
    color: '#7C3AED',
    desc: 'Building, designing, and automating physical systems',
    careers: ['Mechanical Engineer', 'Electrical Engineer', 'Robotics Engineer', 'Civil Engineer'],
    matchScore: 64,
  },
  {
    id: 'research',
    label: 'Research & Data',
    icon: '🔬',
    color: '#00D2FF',
    desc: 'Analysing, discovering, and making sense of information',
    careers: ['Data Analyst', 'Research Scientist', 'Statistician', 'Economist'],
    matchScore: 71,
  },
  {
    id: 'business',
    label: 'Business & Management',
    icon: '💼',
    color: '#FFC107',
    desc: 'Strategy, leadership, finance, and entrepreneurship',
    careers: ['Business Analyst', 'Product Manager', 'Financial Analyst', 'Entrepreneur'],
    matchScore: 33,
  },
  {
    id: 'healthcare',
    label: 'Healthcare & Medicine',
    icon: '🏥',
    color: '#FF5252',
    desc: 'Patient care, medical research, and health systems',
    careers: ['Doctor (MBBS)', 'Pharmacist', 'Medical Researcher', 'Health Informatics'],
    matchScore: 38,
  },
  {
    id: 'creative',
    label: 'Creative Fields',
    icon: '🎨',
    color: '#EC4899',
    desc: 'Design, media, arts, and user experience',
    careers: ['UI/UX Designer', 'Graphic Designer', 'Animator', 'Content Strategist'],
    matchScore: 45,
  },
  {
    id: 'social',
    label: 'Social Sciences',
    icon: '🧠',
    color: '#00E676',
    desc: 'Psychology, sociology, education, and community work',
    careers: ['Psychologist', 'Social Worker', 'Teacher', 'HR Specialist'],
    matchScore: 38,
  },
];

function getDashboard(mod: EducationModule | null): Screen {
  if (mod === 'class6_8') return 'class68-dashboard';
  if (mod === 'class9_10') return 'class910-dashboard';
  if (mod === 'class11_12') return 'class1112-dashboard';
  return 'university-dashboard';
}

export default function CareerClustersScreen({ navigate, educationModule }: Props) {
  const sorted = [...clusters].sort((a, b) => b.matchScore - a.matchScore);

  return (
    <div className="w-full h-full flex flex-col" style={{ background: C.bg }}>
      <div style={{
        background: 'linear-gradient(160deg, #0D1117 0%, #111525 100%)',
        padding: '48px 20px 18px',
        borderRadius: '0 0 24px 24px',
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div className="flex items-center gap-3 mb-2">
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
            <div style={{ fontFamily: 'Inter', fontSize: '10px', color: C.cyan, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '2px' }}>Career Exploration</div>
            <h2 style={{ fontFamily: 'Poppins', fontSize: '18px', fontWeight: 700, color: C.text, margin: 0 }}>Career Clusters</h2>
          </div>
        </div>
        <p style={{ fontFamily: 'Inter', fontSize: '12px', color: C.muted, margin: 0, paddingLeft: '48px' }}>
          Ordered by match with your current interest profile.
        </p>
      </div>

      <div className="flex-1 mobile-scroll px-4 py-4 flex flex-col gap-3" style={{ paddingBottom: '24px' }}>

        <div style={{
          background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)',
          borderRadius: '10px', padding: '10px 12px',
          fontFamily: 'Inter', fontSize: '11px', color: C.muted, lineHeight: '1.5',
        }}>
          ✦ Recommendations may change as you continue exploring. We show clusters across all areas — including ones that may surprise you.
        </div>

        {sorted.map((cluster, i) => (
          <button
            key={cluster.id}
            onClick={() => navigate('career-details')}
            style={{
              width: '100%', background: C.card, borderRadius: '16px', padding: '16px',
              border: i === 0 ? `1px solid ${cluster.color}35` : `1px solid ${C.border}`,
              cursor: 'pointer', textAlign: 'left',
              boxShadow: i === 0 ? `0 0 16px ${cluster.color}12, 0 4px 12px rgba(0,0,0,0.3)` : '0 2px 8px rgba(0,0,0,0.2)',
              transition: 'all 0.2s ease',
            }}
          >
            <div className="flex items-start gap-12px" style={{ gap: '12px', marginBottom: '10px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '14px', flexShrink: 0,
                background: `${cluster.color}14`, border: `1px solid ${cluster.color}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px',
              }}>
                {cluster.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div className="flex items-center justify-between">
                  <span style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 700, color: C.text }}>{cluster.label}</span>
                  <span style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 800, color: cluster.color }}>{cluster.matchScore}%</span>
                </div>
                <p style={{ fontFamily: 'Inter', fontSize: '11px', color: C.muted, margin: '3px 0 0 0' }}>{cluster.desc}</p>
              </div>
            </div>

            {/* Careers list */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {cluster.careers.map(career => (
                <span key={career} style={{
                  fontFamily: 'Inter', fontSize: '10px', fontWeight: 600,
                  background: C.elevated, color: C.muted,
                  border: `1px solid ${C.border}`, borderRadius: '4px', padding: '3px 8px',
                }}>
                  → {career}
                </span>
              ))}
            </div>

            {/* Match bar */}
            <div style={{ marginTop: '10px', height: '3px', background: C.elevated, borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: '2px', background: cluster.color,
                width: `${cluster.matchScore}%`, boxShadow: `0 0 6px ${cluster.color}60`,
              }} />
            </div>
          </button>
        ))}

        <p style={{ fontFamily: 'Inter', fontSize: '11px', color: C.muted, textAlign: 'center', marginTop: '4px', lineHeight: '1.5' }}>
          Match percentages are based on your current interest profile and will update as you continue exploring.
        </p>
      </div>
    </div>
  );
}
