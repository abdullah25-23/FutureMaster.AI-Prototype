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

const subjectSuggestions = [
  { label: 'Computer Science', icon: '💻', color: '#6366F1' },
  { label: 'Mathematics', icon: '📐', color: '#00D2FF' },
  { label: 'Physics', icon: '⚡', color: '#7C3AED' },
];

const careerAreas = [
  { label: 'Software Engineering', match: 82, icon: '👨‍💻' },
  { label: 'Data Science', match: 74, icon: '📊' },
  { label: 'Cybersecurity', match: 68, icon: '🔐' },
];

const careerFact = 'Many technology careers use mathematics, logical thinking and problem solving together.';

const HamburgerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.sub} strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

export default function Class910Dashboard({ navigate, explorationProgress, studentProfile }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const confidence = explorationProgress.profileConfidence;
  const answered = explorationProgress.questionsAnswered;

  const progressLabel = confidence < 55 ? 'Your profile is taking shape' : 'Your profile is becoming clearer';

  return (
    <div className="w-full h-full flex flex-col relative" style={{ background: C.bg }}>
      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} module="class9_10" navigate={navigate} currentScreen="class910-dashboard" />

      {/* Top bar */}
      <div style={{
        background: 'linear-gradient(160deg, #0D1117 0%, #111525 60%, #141A2A 100%)',
        padding: '48px 16px 16px',
        borderRadius: '0 0 20px 20px',
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div className="flex items-center justify-between">
          <button onClick={() => setDrawerOpen(true)} style={{
            width: '38px', height: '38px', borderRadius: '12px',
            background: C.card, border: `1px solid ${C.border}`, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <HamburgerIcon />
          </button>
          <div className="flex flex-col items-center">
            <span style={{ fontFamily: 'Poppins', fontSize: '15px', fontWeight: 700, color: C.text }}>FutureMaster AI</span>
            <span style={{ fontFamily: 'Inter', fontSize: '10px', color: C.muted }}>Class 9–10</span>
          </div>
          <button onClick={() => navigate('notifications')} style={{
            width: '38px', height: '38px', borderRadius: '12px',
            background: C.card, border: `1px solid ${C.border}`, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.sub} strokeWidth="2">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
            </svg>
            <div style={{ position: 'absolute', top: '8px', right: '8px', width: '7px', height: '7px', borderRadius: '50%', background: C.cyan, boxShadow: '0 0 6px rgba(0,210,255,0.8)' }} />
          </button>
        </div>
        <div style={{ marginTop: '14px' }}>
          <p style={{ fontFamily: 'Inter', fontSize: '13px', color: C.muted, margin: '0 0 2px 0' }}>Good morning 👋</p>
          <h2 style={{ fontFamily: 'Poppins', fontSize: '22px', fontWeight: 700, color: C.text, margin: '0 0 2px 0' }}>
            {studentProfile.name.split(' ')[0]}!
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: '12px', color: C.cyan, margin: 0 }}>Your journey, personalised by AI ✦</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 mobile-scroll px-4 py-4 flex flex-col gap-4" style={{ paddingBottom: '24px' }}>

        {/* Exploration progress */}
        <div style={{
          background: C.card, borderRadius: '18px', padding: '16px',
          border: '1px solid rgba(99,102,241,0.2)',
          boxShadow: '0 0 20px rgba(99,102,241,0.08)',
        }}>
          <div className="flex items-center justify-between mb-2">
            <div>
              <div style={{ fontFamily: 'Inter', fontSize: '10px', color: C.cyan, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '3px' }}>
                Adaptive Exploration
              </div>
              <h3 style={{ fontFamily: 'Poppins', fontSize: '15px', fontWeight: 700, color: C.text, margin: 0 }}>
                {progressLabel}
              </h3>
            </div>
            <div style={{
              background: 'rgba(0,210,255,0.1)', border: '1px solid rgba(0,210,255,0.2)',
              borderRadius: '10px', padding: '6px 10px',
              fontFamily: 'Poppins', fontSize: '14px', fontWeight: 700, color: C.cyan,
            }}>
              {confidence}%
            </div>
          </div>
          <div style={{ height: '4px', background: C.elevated, borderRadius: '2px', marginBottom: '12px', overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: '2px',
              background: 'linear-gradient(90deg, #6366F1, #00D2FF)',
              width: `${confidence}%`,
              boxShadow: '0 0 8px rgba(0,210,255,0.5)',
            }} />
          </div>
          <div className="flex items-center justify-between">
            <span style={{ fontFamily: 'Inter', fontSize: '11px', color: C.muted }}>{answered} questions answered so far</span>
            <button onClick={() => navigate('assessment')} style={{
              background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
              border: 'none', borderRadius: '10px', padding: '8px 16px',
              fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color: 'white',
              cursor: 'pointer', boxShadow: '0 0 12px rgba(99,102,241,0.35)',
            }}>
              Continue →
            </button>
          </div>
        </div>

        {/* Strongest Interests */}
        <div style={{ background: C.card, borderRadius: '16px', padding: '16px', border: `1px solid ${C.border}` }}>
          <div className="flex items-center justify-between mb-3">
            <h3 style={{ fontFamily: 'Poppins', fontSize: '13px', fontWeight: 700, color: C.text, margin: 0 }}>Your Strongest Interests</h3>
            <button onClick={() => navigate('interest-profile')} style={{ fontFamily: 'Inter', fontSize: '11px', color: C.cyan, background: 'none', border: 'none', cursor: 'pointer' }}>View Full →</button>
          </div>
          {topInterests.map(item => (
            <div key={item.label} className="flex items-center gap-3" style={{ marginBottom: '8px' }}>
              <span style={{ fontFamily: 'Inter', fontSize: '12px', color: C.sub, width: '130px', flexShrink: 0 }}>{item.label}</span>
              <div style={{ flex: 1, height: '6px', background: C.elevated, borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: '3px', background: item.color, width: `${item.value}%` }} />
              </div>
              <span style={{ fontFamily: 'Poppins', fontSize: '12px', fontWeight: 700, color: item.color, width: '30px', textAlign: 'right' }}>{item.value}%</span>
            </div>
          ))}
        </div>

        {/* Subject Guidance */}
        <div style={{ background: C.card, borderRadius: '16px', padding: '16px', border: `1px solid ${C.border}` }}>
          <div className="flex items-center justify-between mb-3">
            <h3 style={{ fontFamily: 'Poppins', fontSize: '13px', fontWeight: 700, color: C.text, margin: 0 }}>Subjects Worth Exploring</h3>
            <button onClick={() => navigate('subject-guidance')} style={{ fontFamily: 'Inter', fontSize: '11px', color: C.cyan, background: 'none', border: 'none', cursor: 'pointer' }}>See Guidance →</button>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {subjectSuggestions.map(s => (
              <div key={s.label} style={{
                flex: 1, padding: '12px 8px', borderRadius: '12px',
                background: `${s.color}10`, border: `1px solid ${s.color}25`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
              }}>
                <span style={{ fontSize: '20px' }}>{s.icon}</span>
                <span style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 600, color: s.color, textAlign: 'center', lineHeight: '1.3' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Career Areas Worth Exploring */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 style={{ fontFamily: 'Poppins', fontSize: '13px', fontWeight: 700, color: C.text, margin: 0 }}>Career Areas Worth Exploring</h3>
            <button onClick={() => navigate('career-clusters')} style={{ fontFamily: 'Inter', fontSize: '11px', color: C.cyan, background: 'none', border: 'none', cursor: 'pointer' }}>See all</button>
          </div>
          <div className="flex flex-col gap-2">
            {careerAreas.map((ca, i) => (
              <button key={ca.label} onClick={() => navigate('career-clusters')} style={{
                background: C.card, borderRadius: '12px', padding: '12px 14px',
                border: i === 0 ? '1px solid rgba(99,102,241,0.3)' : `1px solid ${C.border}`,
                display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer',
              }}>
                <span style={{ fontSize: '22px' }}>{ca.icon}</span>
                <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 500, color: C.text, flex: 1, textAlign: 'left' }}>{ca.label}</span>
                <span style={{ fontFamily: 'Poppins', fontSize: '13px', fontWeight: 700, color: C.cyan }}>{ca.match}%</span>
              </button>
            ))}
          </div>
        </div>

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
