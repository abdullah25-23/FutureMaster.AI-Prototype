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

const careerRoles = [
  { title: 'Backend Engineer', match: 88, icon: '⚙️', color: '#6366F1', tags: ['Python', 'APIs', 'Databases'] },
  { title: 'Data Engineer', match: 76, icon: '🗃️', color: '#00D2FF', tags: ['SQL', 'Pipelines', 'Cloud'] },
  { title: 'ML Engineer', match: 71, icon: '🤖', color: '#7C3AED', tags: ['Python', 'ML', 'Mathematics'] },
];

const skillsSnapshot = [
  { name: 'Python', level: 'Intermediate', color: '#6366F1' },
  { name: 'SQL', level: 'Intermediate', color: '#00D2FF' },
  { name: 'Flutter', level: 'Beginner', color: '#00E676' },
  { name: 'Git', level: 'Intermediate', color: '#FFC107' },
];

const skillGaps = ['Docker', 'Cloud Fundamentals', 'API Security', 'Testing'];

const roadmapSteps = [
  { title: 'Strengthen Python', status: 'done' },
  { title: 'Build REST APIs', status: 'active' },
  { title: 'Learn Docker', status: 'next' },
  { title: 'Cloud Deployment', status: 'pending' },
];

const careerFact = 'Backend engineering commonly involves APIs, databases, authentication, testing and deployment — a broad and in-demand skill set.';

const HamburgerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.sub} strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const statusColor: Record<string, string> = { done: C.success, active: C.indigo, next: C.cyan, pending: C.muted };
const statusLabel: Record<string, string> = { done: 'Completed', active: 'In Progress', next: 'Next', pending: '' };

export default function UniversityDashboard({ navigate, explorationProgress, studentProfile }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="w-full h-full flex flex-col relative" style={{ background: C.bg }}>
      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} module="university" navigate={navigate} currentScreen="university-dashboard" />

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
            <span style={{ fontFamily: 'Inter', fontSize: '10px', color: C.muted }}>University / BS</span>
          </div>
          <button onClick={() => navigate('notifications')} style={{ width: '38px', height: '38px', borderRadius: '12px', background: C.card, border: `1px solid ${C.border}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.sub} strokeWidth="2">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
            </svg>
            <div style={{ position: 'absolute', top: '8px', right: '8px', width: '7px', height: '7px', borderRadius: '50%', background: C.cyan }} />
          </button>
        </div>
        <div style={{ marginTop: '14px' }}>
          <p style={{ fontFamily: 'Inter', fontSize: '13px', color: C.muted, margin: '0 0 2px 0' }}>Good morning 👋</p>
          <h2 style={{ fontFamily: 'Poppins', fontSize: '22px', fontWeight: 700, color: C.text, margin: '0 0 2px 0' }}>
            {studentProfile.name.split(' ')[0]}!
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: '11px', color: C.cyan, margin: 0 }}>
            {studentProfile.degree || 'BS Computer Science'} · {studentProfile.semester || '4th'} Semester
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 mobile-scroll px-4 py-4 flex flex-col gap-4" style={{ paddingBottom: '24px' }}>

        {/* Career Direction */}
        <div style={{
          borderRadius: '18px', padding: '16px',
          background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 60%, #2563EB 100%)',
          boxShadow: '0 0 28px rgba(99,102,241,0.35)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: '-10px', top: '-10px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
          <div style={{ fontFamily: 'Inter', fontSize: '10px', color: 'rgba(255,255,255,0.7)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '4px' }}>
            Career Direction
          </div>
          <h3 style={{ fontFamily: 'Poppins', fontSize: '17px', fontWeight: 700, color: 'white', margin: '0 0 4px 0' }}>Backend Engineering</h3>
          <p style={{ fontFamily: 'Inter', fontSize: '11px', color: 'rgba(255,255,255,0.6)', margin: '0 0 12px 0' }}>Based on your skills and exploration so far</p>
          <button onClick={() => navigate('career-clusters')} style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px', padding: '8px 14px', cursor: 'pointer', fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color: 'white' }}>
            Explore Other Directions →
          </button>
        </div>

        {/* Career Roles Worth Exploring */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 style={{ fontFamily: 'Poppins', fontSize: '13px', fontWeight: 700, color: C.text, margin: 0 }}>Career Roles Worth Exploring</h3>
            <button onClick={() => navigate('career-clusters')} style={{ fontFamily: 'Inter', fontSize: '11px', color: C.cyan, background: 'none', border: 'none', cursor: 'pointer' }}>See all</button>
          </div>
          <div className="flex flex-col gap-2">
            {careerRoles.map((role, i) => (
              <button key={role.title} onClick={() => navigate('career-details')} style={{
                background: C.card, borderRadius: '14px', padding: '12px 14px',
                border: i === 0 ? `1px solid ${role.color}35` : `1px solid ${C.border}`,
                display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer',
                boxShadow: i === 0 ? `0 0 14px ${role.color}15` : 'none',
              }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: `${role.color}14`, border: `1px solid ${role.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{role.icon}</div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: C.text, display: 'block', marginBottom: '3px' }}>{role.title}</span>
                  <div className="flex gap-1.5">
                    {role.tags.map(t => <span key={t} style={{ fontFamily: 'Inter', fontSize: '9px', background: C.elevated, color: C.muted, borderRadius: '4px', padding: '2px 6px' }}>{t}</span>)}
                  </div>
                </div>
                <span style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 700, color: role.color }}>{role.match}%</span>
              </button>
            ))}
          </div>
        </div>

        {/* Current Skills snapshot */}
        <div style={{ background: C.card, borderRadius: '16px', padding: '14px', border: `1px solid ${C.border}` }}>
          <div className="flex items-center justify-between mb-2">
            <h3 style={{ fontFamily: 'Poppins', fontSize: '13px', fontWeight: 700, color: C.text, margin: 0 }}>My Skills</h3>
            <button onClick={() => navigate('skills')} style={{ fontFamily: 'Inter', fontSize: '11px', color: C.cyan, background: 'none', border: 'none', cursor: 'pointer' }}>Manage →</button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {skillsSnapshot.map(s => (
              <span key={s.name} style={{
                fontFamily: 'Inter', fontSize: '11px', fontWeight: 600,
                background: `${s.color}12`, color: s.color,
                border: `1px solid ${s.color}25`, borderRadius: '6px', padding: '4px 10px',
              }}>
                {s.name} · <span style={{ fontWeight: 400, color: C.muted }}>{s.level}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Skill Gaps */}
        <div style={{ background: C.card, borderRadius: '16px', padding: '14px', border: `1px solid ${C.border}` }}>
          <div className="flex items-center justify-between mb-2">
            <h3 style={{ fontFamily: 'Poppins', fontSize: '13px', fontWeight: 700, color: C.text, margin: 0 }}>Skill Gaps to Explore</h3>
            <button onClick={() => navigate('skill-gap')} style={{ fontFamily: 'Inter', fontSize: '11px', color: C.cyan, background: 'none', border: 'none', cursor: 'pointer' }}>View Gap →</button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {skillGaps.map(s => (
              <span key={s} style={{
                fontFamily: 'Inter', fontSize: '11px', fontWeight: 500,
                background: 'rgba(255,193,7,0.08)', color: C.warning,
                border: '1px solid rgba(255,193,7,0.2)', borderRadius: '6px', padding: '4px 10px',
              }}>
                + {s}
              </span>
            ))}
          </div>
        </div>

        {/* Learning Roadmap preview */}
        <div style={{ background: C.card, borderRadius: '16px', padding: '14px', border: `1px solid ${C.border}` }}>
          <div className="flex items-center justify-between mb-3">
            <h3 style={{ fontFamily: 'Poppins', fontSize: '13px', fontWeight: 700, color: C.text, margin: 0 }}>Learning Roadmap</h3>
            <button onClick={() => navigate('roadmap')} style={{ fontFamily: 'Inter', fontSize: '11px', color: C.cyan, background: 'none', border: 'none', cursor: 'pointer' }}>Full Roadmap →</button>
          </div>
          <div className="flex flex-col gap-2">
            {roadmapSteps.map(step => {
              const color = statusColor[step.status];
              return (
                <div key={step.title} className="flex items-center gap-3">
                  <div style={{
                    width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                    background: step.status === 'pending' ? C.elevated : `${color}20`,
                    border: `1.5px solid ${step.status === 'pending' ? C.border : color}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: step.status !== 'pending' ? `0 0 6px ${color}40` : 'none',
                  }}>
                    {step.status === 'done' && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>}
                    {step.status === 'active' && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: color }} />}
                  </div>
                  <span style={{ fontFamily: 'Inter', fontSize: '12px', flex: 1, color: step.status === 'pending' ? C.muted : C.sub, textDecoration: step.status === 'done' ? 'line-through' : 'none' }}>{step.title}</span>
                  {statusLabel[step.status] && (
                    <span style={{ fontFamily: 'Inter', fontSize: '10px', color, fontWeight: 600 }}>{statusLabel[step.status]}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Secondary: Resume / Interview tips */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ flex: 1, padding: '12px', borderRadius: '14px', background: C.card, border: `1px solid ${C.border}`, cursor: 'pointer' }}>
            <div style={{ fontSize: '20px', marginBottom: '5px' }}>📄</div>
            <div style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, color: C.sub }}>Resume Tips</div>
          </button>
          <button style={{ flex: 1, padding: '12px', borderRadius: '14px', background: C.card, border: `1px solid ${C.border}`, cursor: 'pointer' }}>
            <div style={{ fontSize: '20px', marginBottom: '5px' }}>💬</div>
            <div style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, color: C.sub }}>Interview Prep</div>
          </button>
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
