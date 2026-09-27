import { useState } from 'react';
import { Screen } from '../types';

const C = {
  bg: '#0D1117', card: '#1C1F2E', elevated: '#252A3A',
  border: '#2D3548', text: '#FFFFFF', sub: '#A0AEC0', muted: '#6B7280',
  cyan: '#00D2FF', indigo: '#6366F1', violet: '#7C3AED', success: '#00E676', warning: '#FFC107',
};

type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

interface Skill { name: string; level: SkillLevel; color: string; }

const levelColors: Record<SkillLevel, string> = {
  Beginner: '#FFC107',
  Intermediate: '#00D2FF',
  Advanced: '#00E676',
};

const suggestedSkills = ['Docker', 'Cloud Fundamentals', 'API Security', 'Testing', 'Redis', 'GraphQL', 'Kubernetes', 'CI/CD'];

const allSkillOptions = ['Python', 'Java', 'C++', 'C#', 'Flutter', 'Web Development', 'SQL', 'Databases', 'Git', 'UI/UX', 'Data Analysis', 'Machine Learning', 'Software Testing', 'REST APIs', 'React', 'Node.js'];

export default function SkillsScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const [skills, setSkills] = useState<Skill[]>([
    { name: 'Python', level: 'Intermediate', color: '#6366F1' },
    { name: 'SQL', level: 'Intermediate', color: '#00D2FF' },
    { name: 'Flutter', level: 'Beginner', color: '#00E676' },
    { name: 'Git', level: 'Intermediate', color: '#FFC107' },
    { name: 'REST APIs', level: 'Beginner', color: '#7C3AED' },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newLevel, setNewLevel] = useState<SkillLevel>('Beginner');
  const [editingIdx, setEditingIdx] = useState<number | null>(null);

  function addSkill() {
    if (!newSkill.trim()) return;
    setSkills(prev => [...prev, { name: newSkill.trim(), level: newLevel, color: C.indigo }]);
    setNewSkill('');
    setShowAdd(false);
  }

  function updateLevel(idx: number, level: SkillLevel) {
    setSkills(prev => prev.map((s, i) => i === idx ? { ...s, level } : s));
    setEditingIdx(null);
  }

  function removeSkill(idx: number) {
    setSkills(prev => prev.filter((_, i) => i !== idx));
  }

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
            <h2 style={{ fontFamily: 'Poppins', fontSize: '18px', fontWeight: 700, color: C.text, margin: 0 }}>My Skills</h2>
          </div>
        </div>
        <p style={{ fontFamily: 'Inter', fontSize: '12px', color: C.muted, margin: '0 0 0 48px' }}>
          Skills you've added — these reflect what you've told us, not verified expertise.
        </p>
      </div>

      <div className="flex-1 mobile-scroll px-4 py-4 flex flex-col gap-4" style={{ paddingBottom: '24px' }}>

        {/* Current skills */}
        <div style={{ background: C.card, borderRadius: '16px', padding: '14px', border: `1px solid ${C.border}` }}>
          <div className="flex items-center justify-between mb-3">
            <h3 style={{ fontFamily: 'Poppins', fontSize: '13px', fontWeight: 700, color: C.text, margin: 0 }}>Skills I Have</h3>
            <button onClick={() => setShowAdd(!showAdd)} style={{
              background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)',
              borderRadius: '8px', padding: '5px 12px', cursor: 'pointer',
              fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, color: C.indigo,
            }}>+ Add Skill</button>
          </div>

          {showAdd && (
            <div style={{ background: C.elevated, borderRadius: '12px', padding: '12px', marginBottom: '12px', border: `1px solid ${C.border}` }}>
              <input
                value={newSkill} onChange={e => setNewSkill(e.target.value)}
                placeholder="e.g. React, Docker, TypeScript"
                style={{
                  width: '100%', height: '44px', borderRadius: '10px',
                  border: `1.5px solid ${C.border}`, background: C.card,
                  padding: '0 12px', fontFamily: 'Inter', fontSize: '13px', color: C.text,
                  outline: 'none', boxSizing: 'border-box', marginBottom: '8px',
                }}
              />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                {(['Beginner', 'Intermediate', 'Advanced'] as SkillLevel[]).map(level => (
                  <button key={level} onClick={() => setNewLevel(level)} style={{
                    padding: '5px 12px', borderRadius: '20px', cursor: 'pointer',
                    border: newLevel === level ? `1.5px solid ${levelColors[level]}` : `1.5px solid ${C.border}`,
                    background: newLevel === level ? `${levelColors[level]}14` : 'transparent',
                    fontFamily: 'Inter', fontSize: '11px', fontWeight: 600,
                    color: newLevel === level ? levelColors[level] : C.muted,
                  }}>{level}</button>
                ))}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                {allSkillOptions.slice(0, 8).map(s => (
                  <button key={s} onClick={() => setNewSkill(s)} style={{
                    padding: '4px 10px', borderRadius: '6px', cursor: 'pointer',
                    background: newSkill === s ? `${C.indigo}14` : C.card,
                    border: newSkill === s ? `1px solid ${C.indigo}` : `1px solid ${C.border}`,
                    fontFamily: 'Inter', fontSize: '11px', color: newSkill === s ? C.indigo : C.muted,
                  }}>{s}</button>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={addSkill} style={{ flex: 1, height: '38px', borderRadius: '10px', background: C.indigo, border: 'none', color: 'white', fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Add</button>
                <button onClick={() => setShowAdd(false)} style={{ height: '38px', borderRadius: '10px', background: 'transparent', border: `1px solid ${C.border}`, color: C.muted, fontFamily: 'Inter', fontSize: '12px', cursor: 'pointer', padding: '0 14px' }}>Cancel</button>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            {skills.map((skill, i) => (
              <div key={skill.name} style={{ background: C.elevated, borderRadius: '10px', padding: '10px 12px', border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: C.text, flex: 1 }}>{skill.name}</span>
                {editingIdx === i ? (
                  <div className="flex gap-1">
                    {(['Beginner', 'Intermediate', 'Advanced'] as SkillLevel[]).map(level => (
                      <button key={level} onClick={() => updateLevel(i, level)} style={{
                        padding: '3px 8px', borderRadius: '5px', cursor: 'pointer',
                        border: `1px solid ${levelColors[level]}30`,
                        background: skill.level === level ? `${levelColors[level]}18` : 'transparent',
                        fontFamily: 'Inter', fontSize: '9px', fontWeight: 600,
                        color: levelColors[level],
                      }}>{level}</button>
                    ))}
                  </div>
                ) : (
                  <button onClick={() => setEditingIdx(i)} style={{
                    padding: '3px 8px', borderRadius: '5px', cursor: 'pointer',
                    border: `1px solid ${levelColors[skill.level]}30`,
                    background: `${levelColors[skill.level]}10`,
                    fontFamily: 'Inter', fontSize: '10px', fontWeight: 600,
                    color: levelColors[skill.level], whiteSpace: 'nowrap',
                  }}>{skill.level}</button>
                )}
                <button onClick={() => removeSkill(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Skills to develop */}
        <div style={{ background: C.card, borderRadius: '16px', padding: '14px', border: `1px solid ${C.border}` }}>
          <div className="flex items-center justify-between mb-3">
            <h3 style={{ fontFamily: 'Poppins', fontSize: '13px', fontWeight: 700, color: C.text, margin: 0 }}>Skills to Develop</h3>
            <button onClick={() => navigate('skill-gap')} style={{ fontFamily: 'Inter', fontSize: '11px', color: C.cyan, background: 'none', border: 'none', cursor: 'pointer' }}>View Skill Gap →</button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
            {suggestedSkills.map(s => (
              <span key={s} style={{
                fontFamily: 'Inter', fontSize: '11px', fontWeight: 500,
                background: 'rgba(255,193,7,0.08)', color: C.warning,
                border: '1px solid rgba(255,193,7,0.2)', borderRadius: '6px', padding: '4px 10px',
              }}>+ {s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
