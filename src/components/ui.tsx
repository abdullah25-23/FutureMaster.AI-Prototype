import { Ico } from './Icon';
import { CSSProperties, ReactNode, useEffect, useState } from 'react';
import { useApp } from '../state';
import logoFull from '../imports/App_logo_Full-removebg-preview.png';
import logoSymbol from '../imports/Logo-removebg-preview.png';
import logoName from '../imports/Name_-removebg-preview.png';
import logoNameTitle from '../imports/Name_and_Title-removebg-preview.png';

export const C: Record<string, string> & { bg: string } = {
  bg: '#0D1117', card: '#1C1F2E', elevated: '#252A3A', border: '#2D3548',
  text: '#FFFFFF', sub: '#A0AEC0', muted: '#8590A6', cyan: '#00D2FF', indigo: '#6366F1', violet: '#7C3AED',
  success: '#00E676', warning: '#FFC107', error: '#FF5252',
  headerBg: '', cardGrad: '', cardGrad2: '', drawerBg: '', track: '', shadow: '', overlay: '', overlayStrong: '', onAccent: '', disabledBg: '', outer: '', splash: '', dashHeader: '', frameShadow: '',
};

const glow = 'drop-shadow(0 0 10px rgba(0,210,255,0.28))';
// Official brand assets, trimmed to content bounds; width drives size, height stays auto so they are never stretched.
export const BrandFull = ({ width = 280 }: { width?: number }) => <img src={logoFull} alt="FutureMasterAi, Future Starts Here" style={{ width, height: 'auto', filter: glow }} />;
export const BrandSymbol = ({ height = 30 }: { height?: number }) => <img src={logoSymbol} alt="FutureMaster AI" style={{ height, width: 'auto', filter: glow }} />;
export const BrandName = ({ width = 180 }: { width?: number }) => <img src={logoName} alt="FutureMasterAi" style={{ width, height: 'auto', filter: glow }} />;
export const BrandNameTitle = ({ width = 220 }: { width?: number }) => <img src={logoNameTitle} alt="FutureMasterAi, Future Starts Here" style={{ width, height: 'auto', filter: glow }} />;

export function Btn({ children, onClick, disabled, variant = 'primary', style, small }: {
  children: ReactNode; onClick?: () => void; disabled?: boolean; variant?: 'primary' | 'ghost' | 'cyan'; style?: CSSProperties; small?: boolean;
}) {
  const bg = variant === 'primary' ? 'linear-gradient(135deg,#4F46E5,#7C3AED)' : variant === 'cyan' ? 'linear-gradient(135deg,#00D2FF,#6366F1)' : C.card;
  return (
    <button className="pressable" onClick={onClick} disabled={disabled} style={{
      width: '100%', minHeight: small ? 44 : 52, borderRadius: 14, borderWidth: variant === 'ghost' ? 1 : 0, borderStyle: 'solid', borderColor: C.border,
      background: disabled ? C.disabledBg : bg, color: disabled ? C.muted : variant === 'ghost' ? C.text : '#fff', fontFamily: 'Poppins', fontWeight: 600, fontSize: small ? 13 : 15,
      cursor: disabled ? 'not-allowed' : 'pointer', boxShadow: disabled || variant === 'ghost' ? 'none' : '0 6px 20px rgba(99,102,241,0.35)',
      transition: 'background .2s, box-shadow .2s, transform .12s', ...style,
    }}>{children}</button>
  );
}

export function Card({ children, onClick, style, selected, accent = C.cyan }: { children: ReactNode; onClick?: () => void; style?: CSSProperties; selected?: boolean; accent?: string }) {
  const a11y = onClick ? {
    role: 'button' as const, tabIndex: 0,
    onKeyDown: (e: React.KeyboardEvent) => { if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onClick(); } },
  } : {};
  return (
    <div {...a11y} onClick={onClick} className={onClick ? 'pressable' : undefined} style={{
      display: 'block', width: '100%', textAlign: 'left', color: C.text, font: 'inherit',
      background: C.card, borderWidth: 1, borderStyle: 'solid', borderColor: selected ? accent : C.border, borderRadius: 18, padding: 16,
      boxShadow: selected ? `0 0 0 1px ${accent}, 0 0 22px ${accent}40` : C.shadow,
      transform: selected ? 'scale(1.015)' : 'none', cursor: onClick ? 'pointer' : 'default',
      transition: 'border-color .22s, box-shadow .22s, transform .22s', ...style,
    }}>{children}</div>
  );
}

export function Bar({ value, color = C.cyan, delay = 0, height = 8 }: { value: number; color?: string; delay?: number; height?: number }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(value), 60 + delay); return () => clearTimeout(t); }, [value, delay]);
  return (
    <div style={{ height, borderRadius: height, background: C.track, overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${w}%`, borderRadius: height, background: `linear-gradient(90deg, ${color}, ${color}CC)`, transition: 'width .9s cubic-bezier(.22,.8,.3,1)', boxShadow: `0 0 10px ${color}66` }} />
    </div>
  );
}

export const Chip = ({ label, selected, onClick, icon }: { label: string; selected?: boolean; onClick?: () => void; icon?: string }) => (
  <button className="pressable" onClick={onClick} aria-pressed={selected} style={{
    minHeight: 40, padding: '8px 14px', borderRadius: 12, cursor: 'pointer', fontFamily: 'Inter', fontSize: 13, fontWeight: 500,
    borderWidth: 1, borderStyle: 'solid', borderColor: selected ? C.cyan : C.border, background: selected ? 'rgba(0,210,255,0.12)' : C.card,
    color: selected ? C.cyan : C.sub, transition: 'all .2s',
  }}>{icon && <span style={{ marginRight: 6, display: "inline-flex", verticalAlign: "middle" }}><Ico e={icon} size={14} /></span>}{selected && '✓ '}{label}</button>
);

export const Pill = ({ text, color = C.cyan }: { text: string; color?: string }) => (
  <span style={{ display: 'inline-block', padding: '3px 9px', borderRadius: 8, fontSize: 11, fontWeight: 600, fontFamily: 'Inter', color, background: `${color}1F`, border: `1px solid ${color}40` }}>{text}</span>
);

export const SectionTitle = ({ children, action, onAction }: { children: ReactNode; action?: string; onAction?: () => void }) => (
  <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
    <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: C.text }}>{children}</h3>
    {action && <button onClick={onAction} style={{ background: 'none', border: 'none', color: C.cyan, fontSize: 12, fontWeight: 600, cursor: 'pointer', minHeight: 32 }}>{action}</button>}
  </div>
);

export const Label = ({ children }: { children: ReactNode }) => (
  <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 600, color: C.text, fontFamily: 'Inter' }}>{children}</p>
);

export const Input = (p: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...p} style={{
    width: '100%', height: 48, borderRadius: 12, borderWidth: 1, borderStyle: 'solid', borderColor: C.border, background: C.card, color: C.text,
    padding: '0 14px', fontSize: 14, fontFamily: 'Inter', outline: 'none', ...p.style,
  }} onFocus={e => (e.currentTarget.style.borderColor = C.cyan)} onBlur={e => (e.currentTarget.style.borderColor = C.border)} />
);

export function CheckAnim({ size = 64, color = C.success }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" className="check-pop">
      <circle cx="26" cy="26" r="24" fill={`${color}18`} stroke={color} strokeWidth="2" />
      <path className="check-draw" d="M15 27l8 8 14-16" fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const BackIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.sub} strokeWidth="2.2" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>;

export function Screen({ title, subtitle, children, onBack, right, footer, noBack, pad = true }: {
  title?: string; subtitle?: string; children: ReactNode; onBack?: () => void; right?: ReactNode; footer?: ReactNode; noBack?: boolean; pad?: boolean;
}) {
  const { back } = useApp();
  return (
    <div className="w-full h-full flex flex-col" style={{ background: C.bg }}>
      {title !== undefined && (
        <div style={{ padding: '52px 16px 14px', borderBottom: `1px solid ${C.border}`, background: C.headerBg, flexShrink: 0 }}>
          <div className="flex items-center" style={{ gap: 12 }}>
            {!noBack && (
              <button aria-label="Back" className="pressable" onClick={onBack ?? back} style={{ width: 40, height: 40, borderRadius: 12, background: C.card, border: `1px solid ${C.border}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><BackIcon /></button>
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: C.text, lineHeight: 1.25 }}>{title}</h2>
              {subtitle && <p style={{ margin: '2px 0 0', fontSize: 12, color: C.muted }}>{subtitle}</p>}
            </div>
            {right}
          </div>
        </div>
      )}
      <div className="flex-1 mobile-scroll" style={{ padding: pad ? '16px 16px 40px' : 0 }}>{children}</div>
      {footer && <div style={{ padding: '12px 16px 30px', borderTop: `1px solid ${C.border}`, background: C.bg, flexShrink: 0 }}>{footer}</div>}
    </div>
  );
}

export function LoadingOverlay({ message }: { message: string }) {
  return (
    <div className="modal-fade" style={{ position: 'absolute', inset: 0, zIndex: 90, background: C.overlayStrong, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
      <div className="logo-pulse"><BrandSymbol height={72} /></div>
      <p style={{ margin: 0, color: C.sub, fontSize: 14 }}>{message}</p>
    </div>
  );
}

export function Modal({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  return (
    <div className="modal-fade" onClick={onClose} style={{ position: 'absolute', inset: 0, zIndex: 80, background: C.overlay, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div className="modal-pop" onClick={e => e.stopPropagation()} style={{ width: '100%', background: C.card, border: `1px solid ${C.border}`, borderRadius: 22, padding: 22 }}>{children}</div>
    </div>
  );
}

export const LockedBox = ({ onCta, cta = 'Continue Exploring' }: { onCta?: () => void; cta?: string }) => (
  <Card style={{ background: C.cardGrad2, borderStyle: 'dashed' }}>
    <div className="flex items-start" style={{ gap: 12 }}>
      <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(99,102,241,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.sub} strokeWidth="2" strokeLinecap="round"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 018 0v4" /></svg>
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: 14, fontFamily: 'Poppins' }}>Keep exploring</p>
        <p style={{ margin: '4px 0 0', fontSize: 12, color: C.sub, lineHeight: 1.5 }}>Complete at least 3 exploration sessions to unlock stronger personalized recommendations.</p>
        {onCta && <button onClick={onCta} className="pressable" style={{ marginTop: 10, background: 'none', border: 'none', padding: 0, color: C.cyan, fontWeight: 600, fontSize: 12, cursor: 'pointer', minHeight: 32 }}>{cta} →</button>}
      </div>
    </div>
  </Card>
);
