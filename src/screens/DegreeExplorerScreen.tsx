import { useState } from 'react';
import { Screen } from '../types';

const C = {
  bg: '#0D1117', card: '#1C1F2E', elevated: '#252A3A',
  border: '#2D3548', text: '#FFFFFF', sub: '#A0AEC0', muted: '#6B7280',
  cyan: '#00D2FF', indigo: '#6366F1', violet: '#7C3AED', success: '#00E676',
};

const categories = ['All', 'Computing', 'Engineering', 'Health Sciences', 'Business', 'Design', 'Social Sciences', 'Natural Sciences'];

const degrees = [
  {
    name: 'BS Computer Science',
    category: 'Computing', icon: '💻', color: '#6366F1',
    desc: 'Covers algorithms, software engineering, AI, and systems design.',
    careers: ['Software Engineer', 'AI Engineer', 'Cybersecurity Analyst', 'Data Scientist'],
    saved: false,
  },
  {
    name: 'BS Software Engineering',
    category: 'Computing', icon: '⚙️', color: '#7C3AED',
    desc: 'Focuses on software development processes, architecture, and quality.',
    careers: ['Software Engineer', 'Systems Architect', 'Product Manager'],
    saved: false,
  },
  {
    name: 'BS Artificial Intelligence',
    category: 'Computing', icon: '🤖', color: '#00D2FF',
    desc: 'Deep focus on machine learning, neural networks, and intelligent systems.',
    careers: ['ML Engineer', 'AI Researcher', 'Data Scientist', 'NLP Engineer'],
    saved: false,
  },
  {
    name: 'BS Data Science',
    category: 'Computing', icon: '📊', color: '#00D2FF',
    desc: 'Combines statistics, programming, and domain knowledge to extract insights.',
    careers: ['Data Analyst', 'Data Scientist', 'Business Intelligence Analyst'],
    saved: true,
  },
  {
    name: 'BE Electrical Engineering',
    category: 'Engineering', icon: '⚡', color: '#FFC107',
    desc: 'Covers circuits, electronics, power systems, and embedded devices.',
    careers: ['Electrical Engineer', 'Electronics Engineer', 'Embedded Systems Developer'],
    saved: false,
  },
  {
    name: 'BS Psychology',
    category: 'Social Sciences', icon: '🧠', color: '#EC4899',
    desc: 'Studies human behaviour, mental processes, and psychological wellbeing.',
    careers: ['Psychologist', 'Counsellor', 'HR Specialist', 'UX Researcher'],
    saved: false,
  },
  {
    name: 'BBA Business Administration',
    category: 'Business', icon: '💼', color: '#FFC107',
    desc: 'Covers management, finance, marketing, and organisational strategy.',
    careers: ['Business Analyst', 'Project Manager', 'Marketing Manager', 'Entrepreneur'],
    saved: false,
  },
  {
    name: 'MBBS Medicine',
    category: 'Health Sciences', icon: '🏥', color: '#FF5252',
    desc: '5-year professional degree leading to a career in medicine and surgery.',
    careers: ['Doctor', 'Surgeon', 'Medical Researcher', 'Specialist Consultant'],
    saved: false,
  },
];

export default function DegreeExplorerScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [savedDegrees, setSavedDegrees] = useState<string[]>(degrees.filter(d => d.saved).map(d => d.name));

  const filtered = activeCategory === 'All' ? degrees : degrees.filter(d => d.category === activeCategory);

  function toggleSave(name: string) {
    setSavedDegrees(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
  }

  return (
    <div className="w-full h-full flex flex-col" style={{ background: C.bg }}>
      <div style={{
        background: 'linear-gradient(160deg, #0D1117 0%, #111525 100%)',
        padding: '48px 20px 16px',
        borderRadius: '0 0 24px 24px',
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate('class1112-dashboard')} style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: '10px', width: '36px', height: '36px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.sub} strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <div>
            <div style={{ fontFamily: 'Inter', fontSize: '10px', color: C.cyan, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '2px' }}>Class 11-12</div>
            <h2 style={{ fontFamily: 'Poppins', fontSize: '18px', fontWeight: 700, color: C.text, margin: 0 }}>Degree Explorer</h2>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              flexShrink: 0, padding: '6px 12px', borderRadius: '20px',
              background: activeCategory === cat ? 'rgba(0,210,255,0.1)' : C.card,
              border: activeCategory === cat ? '1px solid rgba(0,210,255,0.3)' : `1px solid ${C.border}`,
              cursor: 'pointer',
              fontFamily: 'Inter', fontSize: '11px', fontWeight: 600,
              color: activeCategory === cat ? C.cyan : C.muted,
              transition: 'all 0.2s ease',
            }}>{cat}</button>
          ))}
        </div>
      </div>

      <div className="flex-1 mobile-scroll px-4 py-4 flex flex-col gap-3" style={{ paddingBottom: '24px' }}>
        {filtered.map(degree => {
          const isSaved = savedDegrees.includes(degree.name);
          return (
            <div key={degree.name} style={{
              background: C.card, borderRadius: '16px', padding: '15px',
              border: `1px solid ${C.border}`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}>
              <div className="flex items-start gap-3 mb-10px" style={{ marginBottom: '10px' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
                  background: `${degree.color}14`, border: `1px solid ${degree.color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px',
                }}>{degree.icon}</div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 700, color: C.text, margin: '0 0 3px 0' }}>{degree.name}</h4>
                  <span style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 600, background: `${degree.color}12`, color: degree.color, border: `1px solid ${degree.color}20`, borderRadius: '4px', padding: '2px 7px' }}>
                    {degree.category}
                  </span>
                </div>
                <button onClick={() => toggleSave(degree.name)} style={{
                  width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
                  background: isSaved ? 'rgba(99,102,241,0.15)' : C.elevated,
                  border: isSaved ? '1px solid rgba(99,102,241,0.3)' : `1px solid ${C.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                }}>
                  {isSaved
                    ? <svg width="15" height="15" viewBox="0 0 24 24" fill={C.indigo}><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
                    : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
                  }
                </button>
              </div>

              <p style={{ fontFamily: 'Inter', fontSize: '12px', color: C.muted, margin: '0 0 10px 0', lineHeight: '1.5' }}>{degree.desc}</p>

              <div style={{ marginBottom: '10px' }}>
                <div style={{ fontFamily: 'Inter', fontSize: '10px', color: C.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '5px' }}>Related Careers</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {degree.careers.map(c => (
                    <span key={c} style={{ fontFamily: 'Inter', fontSize: '10px', background: C.elevated, color: C.muted, border: `1px solid ${C.border}`, borderRadius: '4px', padding: '2px 7px' }}>→ {c}</span>
                  ))}
                </div>
              </div>

              <button onClick={() => navigate('career-clusters')} style={{
                width: '100%', height: '36px', borderRadius: '10px',
                background: `linear-gradient(135deg, ${degree.color}, #7C3AED)`,
                color: 'white', fontFamily: 'Inter', fontSize: '12px', fontWeight: 600,
                border: 'none', cursor: 'pointer',
              }}>
                Explore Careers in This Field →
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
