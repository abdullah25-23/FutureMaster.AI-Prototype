import { ReactNode, useState } from 'react';
import { useApp } from '../state';
import { careerFacts } from '../data/content';
import { EducationLevel } from '../types';
import { C, BrandSymbol } from './ui';
import Drawer from './Drawer';

export default function DashboardShell({ children, greetingSub }: { children: ReactNode; greetingSub: string }) {
  const { nav, firstName } = useApp();
  const [open, setOpen] = useState(false);
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const btn = { width: 42, height: 42, borderRadius: 12, background: C.card, border: `1px solid ${C.border}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' as const };
  return (
    <div className="w-full h-full flex flex-col relative" style={{ background: C.bg }}>
      <Drawer open={open} onClose={() => setOpen(false)} />
      <div style={{ background: 'linear-gradient(160deg,#0D1117,#111525 60%,#141A2A)', padding: '50px 16px 16px', borderRadius: '0 0 22px 22px', borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
        <div className="flex items-center justify-between">
          <button aria-label="Open menu" className="pressable" onClick={() => setOpen(true)} style={btn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.sub} strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
          </button>
          <BrandSymbol height={36} />
          <button aria-label="Notifications" className="pressable" onClick={() => nav('notifications')} style={btn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.sub} strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" /></svg>
            <span style={{ position: 'absolute', top: 9, right: 10, width: 8, height: 8, borderRadius: '50%', background: C.cyan, boxShadow: '0 0 6px rgba(0,210,255,0.8)' }} />
          </button>
        </div>
        <div style={{ marginTop: 14 }}>
          <p style={{ margin: 0, fontSize: 13, color: C.muted }}>{greet} 👋</p>
          <h2 style={{ margin: '2px 0 0', fontSize: 22, fontWeight: 700 }}>{firstName}</h2>
          <p style={{ margin: '2px 0 0', fontSize: 12, color: C.sub }}>{greetingSub}</p>
        </div>
      </div>
      <div className="flex-1 mobile-scroll" style={{ padding: '16px 16px 40px', display: 'flex', flexDirection: 'column', gap: 16 }}>{children}</div>
    </div>
  );
}

export function FactCard() {
  const { level, factIndex, nextFact } = useApp();
  return <FactInner level={level!} idx={factIndex} next={nextFact} />;
}
function FactInner({ level, idx, next }: { level: EducationLevel; idx: number; next: () => void }) {
  const facts = careerFacts[level];
  return (
    <div key={idx} className="pop-in" style={{ borderRadius: 18, padding: 16, background: 'linear-gradient(135deg,rgba(0,210,255,0.10),rgba(99,102,241,0.12))', border: '1px solid rgba(0,210,255,0.25)' }}>
      <div className="flex items-center justify-between">
        <span style={{ fontSize: 12, fontWeight: 700, color: C.cyan, fontFamily: 'Poppins' }}>💡 Career Fact</span>
        <button className="pressable" onClick={next} style={{ background: 'none', border: 'none', color: C.sub, fontSize: 12, cursor: 'pointer', minHeight: 32 }}>Another fact ↻</button>
      </div>
      <p style={{ margin: '8px 0 0', fontSize: 13, lineHeight: 1.55, color: C.text }}>{facts[idx % facts.length]}</p>
    </div>
  );
}
