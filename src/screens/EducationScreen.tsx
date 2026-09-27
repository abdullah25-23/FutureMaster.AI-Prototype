import { useState } from 'react';
import { Screen, EducationModule } from '../types';

const C = {
  bg: '#0D1117', card: '#1C1F2E', elevated: '#252A3A',
  border: '#2D3548', text: '#FFFFFF', sub: '#A0AEC0', muted: '#6B7280',
  cyan: '#00D2FF', indigo: '#6366F1', violet: '#7C3AED',
};

const modules: Array<{
  id: EducationModule;
  label: string;
  sub: string;
  icon: string;
  gradient: string;
  borderColor: string;
}> = [
  {
    id: 'class6_8',
    label: 'Class 6–8',
    sub: 'Discover what interests you',
    icon: '🌱',
    gradient: 'linear-gradient(135deg, rgba(0,210,255,0.12), rgba(0,210,255,0.04))',
    borderColor: 'rgba(0,210,255,0.3)',
  },
  {
    id: 'class9_10',
    label: 'Class 9–10',
    sub: 'Explore subjects and future directions',
    icon: '📚',
    gradient: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(99,102,241,0.04))',
    borderColor: 'rgba(99,102,241,0.3)',
  },
  {
    id: 'class11_12',
    label: 'Class 11–12',
    sub: 'Explore degrees and career pathways',
    icon: '🎓',
    gradient: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(124,58,237,0.04))',
    borderColor: 'rgba(124,58,237,0.3)',
  },
  {
    id: 'university',
    label: 'University / BS',
    sub: 'Build your professional direction',
    icon: '🏛️',
    gradient: 'linear-gradient(135deg, rgba(0,230,118,0.1), rgba(0,230,118,0.03))',
    borderColor: 'rgba(0,230,118,0.25)',
  },
];

export default function EducationScreen({
  navigate,
  setEducationModule,
}: {
  navigate: (s: Screen) => void;
  setEducationModule: (m: EducationModule) => void;
}) {
  const [selected, setSelected] = useState<EducationModule | null>(null);

  function handleContinue() {
    if (!selected) return;
    setEducationModule(selected);
    navigate('profile-setup');
  }

  return (
    <div className="w-full h-full flex flex-col" style={{ background: C.bg }}>
      <div style={{
        background: 'linear-gradient(160deg, #0D1117 0%, #131827 100%)',
        padding: '52px 20px 24px',
        borderRadius: '0 0 24px 24px',
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: 'rgba(0,210,255,0.08)', borderRadius: '8px',
          padding: '4px 10px', marginBottom: '12px',
          border: '1px solid rgba(0,210,255,0.15)',
        }}>
          <span style={{ fontSize: '11px' }}>✦</span>
          <span style={{ fontFamily: 'Inter', fontSize: '10px', color: C.cyan, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase' }}>
            Almost There
          </span>
        </div>
        <h2 style={{ fontFamily: 'Poppins', fontSize: '20px', fontWeight: 700, color: C.text, margin: '0 0 6px 0', lineHeight: '1.3' }}>
          Where are you in your education journey?
        </h2>
        <p style={{ fontFamily: 'Inter', fontSize: '13px', color: C.sub, margin: 0, lineHeight: '1.5' }}>
          We'll personalise FutureMaster AI around your current stage.
        </p>
      </div>

      <div className="flex-1 mobile-scroll px-4 py-4 flex flex-col gap-3" style={{ paddingBottom: '20px' }}>
        {modules.map(mod => {
          const isSelected = selected === mod.id;
          return (
            <button
              key={mod.id}
              onClick={() => setSelected(mod.id)}
              style={{
                width: '100%', padding: '18px 16px', borderRadius: '16px', textAlign: 'left',
                border: isSelected ? `2px solid ${mod.borderColor}` : `1.5px solid ${C.border}`,
                background: isSelected ? mod.gradient : C.card,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px',
                boxShadow: isSelected ? `0 0 20px ${mod.borderColor.replace('0.3', '0.15')}` : '0 2px 8px rgba(0,0,0,0.2)',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{
                width: '52px', height: '52px', borderRadius: '14px', flexShrink: 0,
                background: isSelected ? 'rgba(255,255,255,0.08)' : C.elevated,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px',
              }}>
                {mod.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: 700, color: C.text, marginBottom: '3px' }}>
                  {mod.label}
                </div>
                <div style={{ fontFamily: 'Inter', fontSize: '12px', color: isSelected ? C.sub : C.muted, lineHeight: '1.4' }}>
                  {mod.sub}
                </div>
              </div>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                background: isSelected ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
                border: isSelected ? `1.5px solid rgba(255,255,255,0.3)` : `1px solid ${C.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}>
                {isSelected
                  ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
                }
              </div>
            </button>
          );
        })}

        <div style={{
          background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)',
          borderRadius: '12px', padding: '12px 14px',
          display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '2px',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.indigo} strokeWidth="1.5" style={{ flexShrink: 0, marginTop: '1px' }}>
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 8v4M12 16h.01"/>
          </svg>
          <p style={{ fontFamily: 'Inter', fontSize: '12px', color: C.sub, margin: 0, lineHeight: '1.5' }}>
            This personalises your entire FutureMaster AI experience — activities, career guidance, and recommendations.
          </p>
        </div>

        <div style={{ flex: 1 }} />

        <button
          onClick={handleContinue}
          disabled={!selected}
          style={{
            width: '100%', height: '52px', borderRadius: '14px',
            background: selected ? 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)' : C.elevated,
            color: selected ? 'white' : C.muted,
            fontFamily: 'Poppins', fontSize: '15px', fontWeight: 600,
            border: selected ? 'none' : `1.5px solid ${C.border}`,
            cursor: selected ? 'pointer' : 'not-allowed',
            boxShadow: selected ? '0 0 24px rgba(99,102,241,0.4)' : 'none',
            transition: 'all 0.2s ease',
          }}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
