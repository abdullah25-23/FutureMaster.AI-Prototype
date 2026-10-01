import { useApp } from '../state';
import { drawerItems } from '../data/content';
import { C, BrandSymbol } from './ui';

export default function Drawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { level, go, logout, levelLabel, classLabel, displayName, screen } = useApp();
  if (!level) return null;
  const items = drawerItems[level];
  const initials = displayName.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

  return (
    <>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, zIndex: 60, background: 'rgba(0,0,0,0.65)', opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none', transition: 'opacity .28s ease' }} />
      <nav aria-label="Main menu" aria-hidden={!open} style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 288, zIndex: 70, display: 'flex', flexDirection: 'column',
        background: 'linear-gradient(160deg,#0F1320,#111827 60%,#0D1117)', borderRight: `1px solid ${C.border}`,
        transform: open ? 'translateX(0)' : 'translateX(-100%)', transition: 'transform .28s cubic-bezier(.4,0,.2,1)',
        boxShadow: open ? '4px 0 32px rgba(0,0,0,0.5)' : 'none', visibility: open ? 'visible' : 'hidden',
      }}>
        <div style={{ padding: '56px 20px 18px', borderBottom: `1px solid ${C.border}` }}>
          <div className="flex items-center" style={{ gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: 'linear-gradient(135deg,#4F46E5,#00D2FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontFamily: 'Poppins', fontSize: 16 }}>{initials}</div>
            <div style={{ minWidth: 0 }}>
              <p style={{ margin: 0, fontWeight: 600, fontFamily: 'Poppins', fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{displayName}</p>
              <p style={{ margin: 0, fontSize: 11, color: C.muted }}>{levelLabel} · {classLabel}</p>
            </div>
          </div>
        </div>
        <div className="flex-1 mobile-scroll" style={{ padding: '12px 12px' }}>
          {items.map(it => {
            const active = it.screen === 'dashboard' ? screen === 'dashboard' : screen === it.screen;
            return (
              <button key={it.label} className="pressable" onClick={() => { onClose(); go(it.screen); }} style={{
                width: '100%', minHeight: 48, display: 'flex', alignItems: 'center', gap: 12, padding: '0 14px', marginBottom: 4, borderRadius: 14, cursor: 'pointer',
                border: `1px solid ${active ? 'rgba(0,210,255,0.35)' : 'transparent'}`, background: active ? 'rgba(99,102,241,0.18)' : 'transparent',
                color: active ? C.text : C.sub, fontFamily: 'Inter', fontSize: 14, fontWeight: active ? 600 : 500, textAlign: 'left',
              }}><span style={{ fontSize: 18, width: 24 }}>{it.icon}</span>{it.label}</button>
            );
          })}
        </div>
        <div style={{ padding: '14px 16px 30px', borderTop: `1px solid ${C.border}` }}>
          <div className="flex items-center" style={{ gap: 10, marginBottom: 12 }}>
            <BrandSymbol height={34} />
            <div>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: C.text }}>{levelLabel}</p>
              <p style={{ margin: 0, fontSize: 11, color: C.muted }}>{classLabel}</p>
            </div>
          </div>
          <button className="pressable" onClick={() => { onClose(); logout(); }} style={{ width: '100%', minHeight: 44, borderRadius: 12, border: '1px solid rgba(255,82,82,0.35)', background: 'rgba(255,82,82,0.08)', color: C.error, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Logout</button>
        </div>
      </nav>
    </>
  );
}
