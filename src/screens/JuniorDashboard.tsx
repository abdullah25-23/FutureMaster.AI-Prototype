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

const careerVideos = [
  { title: 'What do Robotics Engineers actually do?', field: 'Engineering', thumb: '🤖', duration: '7:12' },
  { title: 'A day in the life of a Game Developer', field: 'Technology', thumb: '🎮', duration: '9:30' },
];

const careerFact = 'Robotics engineers can build machines used in hospitals, factories and even space exploration.';

const topInterests = [
  { label: 'Analytical Thinking', value: 82, color: '#6366F1' },
  { label: 'Technology', value: 77, color: '#00D2FF' },
  { label: 'Research Interest', value: 71, color: '#7C3AED' },
];

const exploreItems = [
  { label: 'Architecture', icon: '🏛️', color: '#FFC107' },
  { label: 'Psychology', icon: '🧠', color: '#EC4899' },
  { label: 'Marine Biology', icon: '🌊', color: '#00D2FF' },
];

const HamburgerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.sub} strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

export default function Class68Dashboard({ navigate, explorationProgress, studentProfile }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const confidence = explorationProgress.profileConfidence;
  const answered = explorationProgress.questionsAnswered;

  const progressLabel = confidence < 30
    ? 'Getting to know you'
    : confidence < 55
    ? 'Your profile is taking shape'
    : confidence < 75
    ? 'Your profile is becoming clearer'
    : 'Your interests are well-defined';

  return (
    <div className="w-full h-full flex flex-col relative" style={{ background: C.bg }}>
      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} module="class6_8" navigate={navigate} currentScreen="class68-dashboard" />

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
            <span style={{ fontFamily: 'Inter', fontSize: '10px', color: C.muted }}>Class 6–8</span>
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
          <h2 style={{ fontFamily: 'Poppins', fontSize: '22px', fontWeight: 700, color: C.text, margin: 0 }}>
            {studentProfile.name.split(' ')[0]}!
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 mobile-scroll px-4 py-4 flex flex-col gap-4" style={{ paddingBottom: '24px' }}>

        {/* Today's Exploration card */}
        <div style={{
          borderRadius: '20px', padding: '18px',
          background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 55%, #2563EB 100%)',
          boxShadow: '0 0 28px rgba(99,102,241,0.35), 0 8px 24px rgba(0,0,0,0.4)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: '-15px', top: '-15px', width: '90px', height: '90px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(255,255,255,0.12)', borderRadius: '8px', padding: '3px 9px', marginBottom: '8px',
          }}>
            <span style={{ fontSize: '10px' }}>✦</span>
            <span style={{ fontFamily: 'Inter', fontSize: '10px', color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>Today's Exploration</span>
          </div>
          <h3 style={{ fontFamily: 'Poppins', fontSize: '15px', fontWeight: 700, color: 'white', margin: '0 0 4px 0', lineHeight: '1.4' }}>
            Build a simple solution and discover whether you enjoy logic and creativity.
          </h3>
          <p style={{ fontFamily: 'Inter', fontSize: '11px', color: 'rgba(255,255,255,0.6)', margin: '0 0 12px 0' }}>
            {progressLabel}
          </p>
          {/* Progress bar */}
          <div style={{ height: '4px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px', marginBottom: '12px', overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: '2px',
              background: 'rgba(255,255,255,0.7)',
              width: `${confidence}%`,
              transition: 'width 0.5s ease',
            }} />
          </div>
          <div className="flex items-center justify-between">
            <span style={{ fontFamily: 'Inter', fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>
              {answered} questions answered
            </span>
            <button onClick={() => navigate('assessment')} style={{
              background: 'white', border: 'none', borderRadius: '10px',
              padding: '8px 16px', cursor: 'pointer',
              fontFamily: 'Poppins', fontSize: '12px', fontWeight: 700, color: '#4F46E5',
            }}>
              Continue →
            </button>
          </div>
        </div>

        {/* Strongest Interests */}
        <div style={{ background: C.card, borderRadius: '16px', padding: '16px', border: `1px solid ${C.border}` }}>
          <div className="flex items-center justify-between mb-12px">
            <h3 style={{ fontFamily: 'Poppins', fontSize: '13px', fontWeight: 700, color: C.text, margin: 0 }}>Your Strongest Interests</h3>
            <button onClick={() => navigate('interest-profile')} style={{ fontFamily: 'Inter', fontSize: '11px', color: C.cyan, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
              View Full →
            </button>
          </div>
          <div className="flex flex-col gap-2" style={{ marginTop: '12px' }}>
            {topInterests.map(item => (
              <div key={item.label} className="flex items-center gap-3">
                <span style={{ fontFamily: 'Inter', fontSize: '12px', color: C.sub, width: '130px', flexShrink: 0 }}>{item.label}</span>
                <div style={{ flex: 1, height: '6px', background: C.elevated, borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: '3px', background: item.color, width: `${item.value}%`, boxShadow: `0 0 6px ${item.color}60` }} />
                </div>
                <span style={{ fontFamily: 'Poppins', fontSize: '12px', fontWeight: 700, color: item.color, width: '30px', textAlign: 'right' }}>{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Explore Something New */}
        <div>
          <h3 style={{ fontFamily: 'Poppins', fontSize: '13px', fontWeight: 700, color: C.text, margin: '0 0 10px 0' }}>Explore Something New</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            {exploreItems.map(item => (
              <button key={item.label} onClick={() => navigate('career-clusters')} style={{
                flex: 1, padding: '14px 8px', borderRadius: '14px', cursor: 'pointer',
                background: C.card, border: `1px solid ${C.border}`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
              }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '12px',
                  background: `${item.color}14`, border: `1px solid ${item.color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px',
                }}>{item.icon}</div>
                <span style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 600, color: C.sub, textAlign: 'center' }}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recommended Career Video */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 style={{ fontFamily: 'Poppins', fontSize: '13px', fontWeight: 700, color: C.text, margin: 0 }}>Career Videos</h3>
            <button onClick={() => navigate('videos')} style={{ fontFamily: 'Inter', fontSize: '11px', color: C.cyan, background: 'none', border: 'none', cursor: 'pointer' }}>See all</button>
          </div>
          <div className="flex flex-col gap-2">
            {careerVideos.map(v => (
              <div key={v.title} style={{
                background: C.card, borderRadius: '14px', padding: '12px',
                border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: '12px',
              }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '12px', flexShrink: 0,
                  background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px',
                }}>{v.thumb}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color: C.text, margin: '0 0 3px 0', lineHeight: '1.4' }}>{v.title}</p>
                  <div className="flex items-center gap-2">
                    <span style={{ fontFamily: 'Inter', fontSize: '10px', color: C.cyan, background: 'rgba(0,210,255,0.1)', borderRadius: '4px', padding: '1px 6px', fontWeight: 600 }}>{v.field}</span>
                    <span style={{ fontFamily: 'Inter', fontSize: '10px', color: C.muted }}>{v.duration}</span>
                  </div>
                </div>
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill={C.indigo}><path d="M5 3l14 9-14 9V3z"/></svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Career Fact of the Day */}
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
