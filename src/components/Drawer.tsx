import { EducationModule, Screen } from '../types';

const C = {
  bg: '#0D1117', card: '#1C1F2E', elevated: '#252A3A',
  border: '#2D3548', text: '#FFFFFF', sub: '#A0AEC0', muted: '#6B7280',
  cyan: '#00D2FF', indigo: '#6366F1', violet: '#7C3AED', error: '#FF5252',
};

const moduleLabels: Record<EducationModule, string> = {
  class6_8: 'Class 6–8',
  class9_10: 'Class 9–10',
  class11_12: 'Class 11–12',
  university: 'University / BS',
};

const navItems: Record<EducationModule, Array<{ label: string; icon: string; screen: Screen }>> = {
  class6_8: [
    { label: 'Home', icon: '🏠', screen: 'class68-dashboard' },
    { label: 'Explore Careers', icon: '🔭', screen: 'career-clusters' },
    { label: 'Career Videos', icon: '🎬', screen: 'videos' },
    { label: 'My Interests', icon: '✨', screen: 'interest-profile' },
    { label: 'My Journey', icon: '🗺️', screen: 'assessment' },
    { label: 'Profile', icon: '👤', screen: 'profile' },
  ],
  class9_10: [
    { label: 'Home', icon: '🏠', screen: 'class910-dashboard' },
    { label: 'My Interests', icon: '✨', screen: 'interest-profile' },
    { label: 'Subject Guidance', icon: '📚', screen: 'subject-guidance' },
    { label: 'Explore Careers', icon: '🔭', screen: 'career-clusters' },
    { label: 'Career Videos', icon: '🎬', screen: 'videos' },
    { label: 'Progress', icon: '📊', screen: 'assessment' },
    { label: 'Profile', icon: '👤', screen: 'profile' },
  ],
  class11_12: [
    { label: 'Home', icon: '🏠', screen: 'class1112-dashboard' },
    { label: 'My Interests', icon: '✨', screen: 'interest-profile' },
    { label: 'Degree Explorer', icon: '🎓', screen: 'degree-explorer' },
    { label: 'Career Paths', icon: '🔭', screen: 'career-clusters' },
    { label: 'Roadmap', icon: '🗺️', screen: 'roadmap' },
    { label: 'Career Videos', icon: '🎬', screen: 'videos' },
    { label: 'Progress', icon: '📊', screen: 'assessment' },
    { label: 'Profile', icon: '👤', screen: 'profile' },
  ],
  university: [
    { label: 'Home', icon: '🏠', screen: 'university-dashboard' },
    { label: 'Career Explorer', icon: '🔭', screen: 'career-clusters' },
    { label: 'My Skills', icon: '💡', screen: 'skills' },
    { label: 'Skill Gap', icon: '📈', screen: 'skill-gap' },
    { label: 'Roadmap', icon: '🗺️', screen: 'roadmap' },
    { label: 'Career Videos', icon: '🎬', screen: 'videos' },
    { label: 'Progress', icon: '📊', screen: 'interest-profile' },
    { label: 'Profile', icon: '👤', screen: 'profile' },
  ],
};

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  module: EducationModule;
  navigate: (s: Screen) => void;
  currentScreen?: Screen;
}

export default function Drawer({ isOpen, onClose, module, navigate, currentScreen }: DrawerProps) {
  const items = navItems[module];

  function handleNav(screen: Screen) {
    onClose();
    navigate(screen);
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute', inset: 0, zIndex: 40,
          background: 'rgba(0,0,0,0.65)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.28s ease',
        }}
      />

      {/* Drawer panel */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '285px', zIndex: 50,
        background: 'linear-gradient(160deg, #0F1320 0%, #111827 60%, #0D1117 100%)',
        borderRight: `1px solid ${C.border}`,
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex', flexDirection: 'column',
        boxShadow: isOpen ? '4px 0 32px rgba(0,0,0,0.5)' : 'none',
        overflow: 'hidden',
      }}>
        {/* Glow orb */}
        <div style={{
          position: 'absolute', top: '-40px', left: '-40px',
          width: '160px', height: '160px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Header */}
        <div style={{
          padding: '52px 20px 20px',
          borderBottom: `1px solid ${C.border}`,
          position: 'relative',
        }}>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-10px">
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 12px rgba(99,102,241,0.4)', marginRight: '10px', flexShrink: 0,
              }}>
                <svg width="18" height="18" viewBox="0 0 52 52" fill="none">
                  <circle cx="26" cy="26" r="20" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
                  <circle cx="26" cy="26" r="3" fill="white"/>
                  <path d="M26 6 L30 20 L26 23 L22 20 Z" fill="rgba(255,255,255,0.95)"/>
                  <path d="M46 26 L32 22 L29 26 L32 30 Z" fill="rgba(255,255,255,0.5)"/>
                  <path d="M26 46 L22 32 L26 29 L30 32 Z" fill="rgba(255,255,255,0.5)"/>
                  <path d="M6 26 L20 30 L23 26 L20 22 Z" fill="rgba(255,255,255,0.5)"/>
                </svg>
              </div>
              <div>
                <div style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 700, color: C.text }}>FutureMaster AI</div>
                <div style={{ fontFamily: 'Inter', fontSize: '10px', color: C.muted }}>Student Career Guidance</div>
              </div>
            </div>
            <button onClick={onClose} style={{
              width: '32px', height: '32px', borderRadius: '8px',
              background: 'rgba(255,255,255,0.06)', border: `1px solid ${C.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Module badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(0,210,255,0.08)', border: '1px solid rgba(0,210,255,0.2)',
            borderRadius: '8px', padding: '5px 10px',
          }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: C.cyan, boxShadow: '0 0 6px rgba(0,210,255,0.8)' }} />
            <span style={{ fontFamily: 'Inter', fontSize: '11px', color: C.cyan, fontWeight: 600 }}>
              {moduleLabels[module]}
            </span>
          </div>
        </div>

        {/* Nav items */}
        <div className="flex-1 mobile-scroll py-3 px-3">
          {items.map(item => {
            const isActive = item.screen === currentScreen;
            return (
              <button
                key={item.label}
                onClick={() => handleNav(item.screen)}
                style={{
                  width: '100%', padding: '12px 14px', borderRadius: '12px', textAlign: 'left',
                  display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', marginBottom: '4px',
                  border: isActive ? '1px solid rgba(99,102,241,0.3)' : '1px solid transparent',
                  background: isActive ? 'rgba(99,102,241,0.12)' : 'transparent',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
                onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                <span style={{ fontSize: '18px', width: '24px', textAlign: 'center' }}>{item.icon}</span>
                <span style={{
                  fontFamily: 'Inter', fontSize: '14px', fontWeight: isActive ? 600 : 400,
                  color: isActive ? C.indigo : C.sub,
                }}>
                  {item.label}
                </span>
                {isActive && (
                  <div style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: C.indigo, boxShadow: '0 0 8px rgba(99,102,241,0.7)' }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ padding: '16px', borderTop: `1px solid ${C.border}` }}>
          <button
            onClick={() => handleNav('login')}
            style={{
              width: '100%', height: '44px', borderRadius: '12px',
              background: 'rgba(255,82,82,0.08)', border: '1px solid rgba(255,82,82,0.18)',
              fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: C.error,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.error} strokeWidth="2">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
            </svg>
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}
