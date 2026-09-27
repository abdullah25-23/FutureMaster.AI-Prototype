import { useState } from 'react';
import { Screen, EducationModule, StudentProfile, ExplorationProgress } from '../types';
import Drawer from '../components/Drawer';

const C = {
  bg: '#0D1117', card: '#1C1F2E', elevated: '#252A3A',
  border: '#2D3548', text: '#FFFFFF', sub: '#A0AEC0', muted: '#6B7280',
  cyan: '#00D2FF', indigo: '#6366F1', violet: '#7C3AED',
  success: '#00E676', warning: '#FFC107',
};

interface Props {
  navigate: (s: Screen) => void;
  educationModule: EducationModule | null;
  studentProfile: StudentProfile;
  explorationProgress: ExplorationProgress;
}

const topInterests = [
  { label: 'Analytical Thinking', value: 82, color: '#6366F1' },
  { label: 'Technology', value: 77, color: '#00D2FF' },
  { label: 'Research Interest', value: 71, color: '#7C3AED' },
];

const degreeCards = [
  { label: 'BS Computer Science', icon: '💻', color: '#6366F1' },
  { label: 'BS Software Engineering', icon: '⚙️', color: '#00D2FF' },
  { label: 'BS Data Science', icon: '📊', color: '#7C3AED' },
  { label: 'BS Artificial Intelligence', icon: '🤖', color: '#00E676' },
];

const careerAreas = [
  { label: 'Software Engineering', match: 82, icon: '👨‍💻', color: '#6366F1' },
  { label: 'Data Science', match: 74, icon: '📊', color: '#00D2FF' },
  { label: 'Cybersecurity', match: 68, icon: '🔐', color: '#7C3AED' },
];

const careerFact = 'Computer Science can lead to software development, cybersecurity, AI and data careers — each with very different day-to-day work.';

const HamburgerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.sub} strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

export default function Class1112Dashboard({ navigate, explorationProgress, studentProfile }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const confidence = explorationProgress.profileConfidence;

  return (
    <div className="w-full h-full flex flex-col relative" style={{ background: C.bg }}>
      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} module="class11_12" navigate={navigate} currentScreen="class1112-dashboard" />

      {/* Top bar */}
      <div style={{
        background: 'linear-gradient(160deg, #0D1117 0%, #111525 60%, #141A2A 100%)',
        padding: '48px 16px 16px',
        borderRadius: '0 0 20px 20px',
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div className="flex items-center justify-between">
          <button onClick={() => setDrawerOpen(true)} style={{ width: '38px', height: '38px', borderRadius: '12px', background: C.card, border: `1px solid ${C.border}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <HamburgerIcon />
          </button>
          <div className="flex flex-col items-center">
            <span style={{ fontFamily: 'Poppins', fontSize: '15px', fontWeight: 700, color: C.text }}>FutureMaster AI</span>
            <span style={{ fontFamily: 'Inter', fontSize: '10px', color: C.muted }}>Class 11–12</span>
          </div>
          <button onClick={() => navigate('notifications')} style={{ width: '38px', height: '38px', borderRadius: '12px', background: C.card, border: `1px solid ${C.border}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.sub} strokeWidth="2">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
            </svg>
            <div style={{ position: 'absolute', top: '8px', right: '8px', width: '7px', height: '7px', borderRadius: '50%', background: C.cyan }} />
          </button>
        </div>
        <div style={{ marginTop: '14px' }}>
          <p style={{ fontFamily: 'Inter', fontSize: '13px', color: C.muted, margin: '0 0 2px 0' }}>Welcome back 👋</p>
          <h2 style={{ fontFamily: 'Poppins', fontSize: '22px', fontWeight: 700, color: C.text, margin: 0 }}>{studentProfile.name.split(' ')[0]}!</h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 mobile-scroll px-4 py-4 flex flex-col gap-4" style={{ paddingBottom: '24px' }}>

        {/* Exploration progress */}
        <div style={{
          borderRadius: '18px', padding: '16px',
          background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(99,102,241,0.08))',
          border: '1px solid rgba(124,58,237,0.25)',
          boxShadow: '0 0 20px rgba(124,58,237,0.1)',
        }}>
          <div className="flex items-center justify-between mb-1">
            <div style={{ fontFamily: 'Inter', fontSize: '10px', color: C.violet, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Exploration Progress</div>
            <span style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 700, color: C.violet }}>{confidence}%</span>
          </div>
          <div style={{ height: '4px', background: 'rgba(124,58,237,0.2)', borderRadius: '2px', marginBottom: '10px', overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: '2px', background: C.violet, width: `${confidence}%`, boxShadow: '0 0 8px rgba(124,58,237,0.5)' }} />
          </div>
          <div className="flex items-center justify-between">
            <span style={{ fontFamily: 'Inter', fontSize: '11px', color: C.sub }}>Your profile is becoming clearer</span>
            <button onClick={() => navigate('assessment')} style={{ background: C.violet, border: 'none', borderRadius: '8px', padding: '6px 14px', fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, color: 'white', cursor: 'pointer' }}>Continue →</button>
          </div>
        </div>

        {/* Interest Profile */}
        <div style={{ background: C.card, borderRadius: '16px', padding: '16px', border: `1px solid ${C.border}` }}>
          <div className="flex items-center justify-between mb-3">
            <h3 style={{ fontFamily: 'Poppins', fontSize: '13px', fontWeight: 700, color: C.text, margin: 0 }}>Current Interest Profile</h3>
            <button onClick={() => navigate('interest-profile')} style={{ fontFamily: 'Inter', fontSize: '11px', color: C.cyan, background: 'none', border: 'none', cursor: 'pointer' }}>View Full →</button>
          </div>
          {topInterests.map(item => (
            <div key={item.label} className="flex items-center gap-3" style={{ marginBottom: '8px' }}>
              <span style={{ fontFamily: 'Inter', fontSize: '12px', color: C.sub, width: '140px', flexShrink: 0 }}>{item.label}</span>
              <div style={{ flex: 1, height: '6px', background: C.elevated, borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: '3px', background: item.color, width: `${item.value}%`, boxShadow: `0 0 6px ${item.color}60` }} />
              </div>
              <span style={{ fontFamily: 'Poppins', fontSize: '12px', fontWeight: 700, color: item.color, width: '30px', textAlign: 'right' }}>{item.value}%</span>
            </div>
          ))}
        </div>

        {/* Degree Fields */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 style={{ fontFamily: 'Poppins', fontSize: '13px', fontWeight: 700, color: C.text, margin: 0 }}>Degree Fields Worth Exploring</h3>
            <button onClick={() => navigate('degree-explorer')} style={{ fontFamily: 'Inter', fontSize: '11px', color: C.cyan, background: 'none', border: 'none', cursor: 'pointer' }}>Explore All</button>
          </div>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {degreeCards.map(d => (
              <button key={d.label} onClick={() => navigate('degree-explorer')} style={{
                flexShrink: 0, width: '110px', padding: '14px 10px', borderRadius: '14px',
                background: C.card, border: `1px solid ${d.color}25`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer',
              }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: `${d.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>{d.icon}</div>
                <span style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 600, color: C.sub, textAlign: 'center', lineHeight: '1.3' }}>{d.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Career Areas */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 style={{ fontFamily: 'Poppins', fontSize: '13px', fontWeight: 700, color: C.text, margin: 0 }}>Career Areas Worth Exploring</h3>
            <button onClick={() => navigate('career-clusters')} style={{ fontFamily: 'Inter', fontSize: '11px', color: C.cyan, background: 'none', border: 'none', cursor: 'pointer' }}>See all</button>
          </div>
          <div className="flex flex-col gap-2">
            {careerAreas.map((ca, i) => (
              <button key={ca.label} onClick={() => navigate('career-clusters')} style={{
                background: C.card, borderRadius: '12px', padding: '12px 14px',
                border: i === 0 ? `1px solid ${ca.color}35` : `1px solid ${C.border}`,
                display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer',
                boxShadow: i === 0 ? `0 0 12px ${ca.color}15` : 'none',
              }}>
                <span style={{ fontSize: '20px' }}>{ca.icon}</span>
                <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 500, color: C.text, flex: 1, textAlign: 'left' }}>{ca.label}</span>
                <span style={{ fontFamily: 'Poppins', fontSize: '12px', fontWeight: 700, color: ca.color }}>{ca.match}%</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.border} strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            ))}
          </div>
        </div>

        {/* Education Roadmap preview */}
        <button onClick={() => navigate('roadmap')} style={{
          width: '100%', padding: '14px 16px', borderRadius: '14px', cursor: 'pointer',
          background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(124,58,237,0.08))',
          border: '1px solid rgba(99,102,241,0.2)',
          display: 'flex', alignItems: 'center', gap: '12px',
        }}>
          <span style={{ fontSize: '22px' }}>🗺️</span>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ fontFamily: 'Poppins', fontSize: '13px', fontWeight: 600, color: C.text }}>Education Roadmap</div>
            <div style={{ fontFamily: 'Inter', fontSize: '11px', color: C.muted }}>View possible paths worth exploring</div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.indigo} strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>

        {/* Career Fact */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(0,210,255,0.06), rgba(99,102,241,0.06))',
          border: '1px solid rgba(0,210,255,0.15)',
          borderRadius: '16px', padding: '14px 16px',
          display: 'flex', alignItems: 'flex-start', gap: '12px',
        }}>
          <span style={{ fontSize: '22px', flexShrink: 0 }}>💡</span>
          <div>
            <div style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 600, color: C.cyan, letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '4px' }}>Career Fact</div>
            <p style={{ fontFamily: 'Inter', fontSize: '12px', color: C.sub, margin: 0, lineHeight: '1.5' }}>{careerFact}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
