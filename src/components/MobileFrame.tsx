import { ReactNode } from 'react';

export default function MobileFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #050709 0%, #0D1117 50%, #0A0D16 100%)' }}>
      <div className="relative overflow-hidden" style={{ width: 390, height: 844, borderRadius: 44, background: '#0D1117', flexShrink: 0,
        boxShadow: '0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(99,102,241,0.15), 0 0 60px rgba(99,102,241,0.06)' }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-[95]" style={{ width: 126, height: 37, background: '#0D1117', borderRadius: '0 0 20px 20px' }} />
        <div className="absolute top-0 left-0 right-0 z-[94] flex items-center justify-between px-8 pt-3 pointer-events-none" style={{ height: 44 }}>
          <span style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 600, color: 'white' }}>9:41</span>
          <div className="flex items-center gap-1.5">
            <svg width="17" height="12" viewBox="0 0 17 12" fill="white"><rect x="0" y="3" width="3" height="9" rx="1" opacity="0.35" /><rect x="4.5" y="2" width="3" height="10" rx="1" opacity="0.6" /><rect x="9" y="0" width="3" height="12" rx="1" opacity="0.8" /><rect x="13.5" y="0" width="3" height="12" rx="1" /></svg>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="white" strokeOpacity="0.3" /><rect x="2" y="2" width="16" height="8" rx="2" fill="white" /><path d="M23 4v4a2 2 0 000-4z" fill="white" fillOpacity="0.4" /></svg>
          </div>
        </div>
        <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: 44 }}>{children}</div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-[95] pointer-events-none" style={{ width: 134, height: 5, background: 'rgba(255,255,255,0.2)', borderRadius: 3 }} />
      </div>
    </div>
  );
}
